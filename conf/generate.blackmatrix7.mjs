import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
(async () => {
  const RESOURCES =
    'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rewrite/QuantumultX/Advertising/Advertising.conf';
  const CONTENT = [];
  await getResourses(RESOURCES, CONTENT);
  const RES = await handleList(CONTENT);
  await writeResourses2File({
    FILENAME: 'blackmatrix7.rewrite.conf',
    COMMENT: RESOURCES,
    RES
  });
})();
async function getResourses(SRC, LIST = []) {
  try {
    console.log(
      `>>> ${SRC.split('/').reverse()[0]}`.padEnd(96),
      '开始下载 <<<'.padStart(12)
    );
    const RES = await fetch(SRC, {
      method: 'GET',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {
        'Content-Type': 'text/plain'
      }
    });
    if (RES.ok) {
      const text = await RES.text();
      text.split('\n').forEach(rule => {
        if (rule) {
          LIST.push(rule.trim());
        }
      });
      console.log(
        `>>> ${SRC.split('/').reverse()[0]}`.padEnd(96),
        '下载完成 <<<'.padStart(12)
      );
    } else {
      console.error(
        `>>> ${SRC.split('/').reverse()[0]}`.padEnd(96),
        '下载失败 >>>'.padStart(12)
      );
    }
  } catch ({ message }) {
    console.error(message);
    throw new Error(message);
  }
}
async function handleList(LIST) {
  return new Promise((resolve, reject) => {
    try {
      const RAW = [];
      const HOST = [];
      LIST.forEach(rule => {
        if (rule && !rule.startsWith('#')) {
          if (rule.toLowerCase().startsWith('host')) {
            HOST.push(rule.replace(/, /gim, '').replace(/ = /gim, '=').trim());
          } else if (!rule.endsWith('.js')) {
            RAW.push(rule.trim());
          }
        }
      });
      resolve([[...HOST], ...new Set(RAW)]);
    } catch (error) {
      reject(error);
    }
  });
}
async function writeResourses2File({ FILENAME, COMMENT, RES }) {
  try {
    console.log(`>>> ${FILENAME}`.padEnd(96), '开始写入 <<<'.padStart(12));
    const scriptPath = fileURLToPath(import.meta.url);
    const temp = {
      value: `# ${COMMENT}\n`
    };
    RES.forEach(item => {
      if (item) {
        temp.value = temp.value + item + '\n';
      } else {
        // 这种规则没什么用
      }
    });
    await writeFile(
      resolve(dirname(scriptPath), `../rewrite/${FILENAME}`),
      temp.value
    );
    console.log(`>>> ${FILENAME}`.padEnd(96), '写入完成 <<<'.padStart(12));
  } catch ({ message }) {
    console.error(`>>> ${FILENAME}`.padEnd(96), '写入失败 >>>'.padStart(12));
    throw new Error(message);
  }
}
