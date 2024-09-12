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
      `>>> ${SRC.split('/').reverse()[0]}`.padEnd(48),
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
        `>>> ${SRC.split('/').reverse()[0]}`.padEnd(48),
        '下载完成 <<<'.padStart(12)
      );
    } else {
      console.log(
        `>>> ${SRC.split('/').reverse()[0]}`.padEnd(48),
        '下载失败 <<<'.padStart(12)
      );
    }
  } catch (error) {
    console.error(error);
  }
}
async function handleList(LIST) {
  return new Promise((resolve, reject) => {
    try {
      const RAW = [];
      LIST.forEach(rule => {
        if (rule && !rule.startsWith('#') && !rule.endsWith('.js')) {
          RAW.push(rule.replace(/, /gim, '').replace(/ = /gim, '=').trim());
        }
      });
      resolve([...new Set(RAW)]);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}
async function writeResourses2File({ FILENAME, COMMENT, RES }) {
  try {
    console.log(`>>> ${FILENAME}`.padEnd(48), '开始写入 <<<'.padStart(12));
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
    console.log(`>>> ${FILENAME}`.padEnd(48), '写入完成 <<<'.padStart(12));
  } catch (error) {
    console.log(`>>> ${FILENAME}`.padEnd(48), '写入失败 <<<'.padStart(12));
    console.error(error);
  }
}
