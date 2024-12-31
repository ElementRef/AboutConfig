import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const RESOURCES = [
  'https://danny0838.github.io/content-farm-terminator/files/blocklist-ublacklist/bad-cloners.txt',
  'https://danny0838.github.io/content-farm-terminator/files/blocklist-ublacklist/content-farms.txt',
  'https://danny0838.github.io/content-farm-terminator/files/blocklist-ublacklist/extra-content-farms.txt',
  'https://danny0838.github.io/content-farm-terminator/files/blocklist-ublacklist/fake-news.txt',
  'https://danny0838.github.io/content-farm-terminator/files/blocklist-ublacklist/scam-sites.txt',
  'https://raw.githubusercontent.com/eallion/uBlacklist-subscription-compilation/main/uBlacklist.txt',
  'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.ublock.custom.ini',
  'https://raw.githubusercontent.com/laylavish/uBlockOrigin-HUGE-AI-Blocklist/main/list_uBlacklist.txt',
  'https://raw.githubusercontent.com/obgnail/chinese-internet-is-dead/master/blocklist.txt'
];
(async () => {
  const LIST = [];
  await Promise.all(RESOURCES.map(SRC => getResourses(SRC, LIST)));
  const RES = await handleList(LIST);
  await writeResourses2File({
    FILENAME: 'element.ref.ublock.mixture.ini',
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
      LIST.forEach(rule => {
        if (rule && !rule.startsWith('#')) {
          RAW.push(rule.replace(/\#(\W|\w|\s)+/gim, '').trim());
        }
      });
      resolve([...new Set(RAW)].sort());
    } catch (error) {
      reject(error);
    }
  });
}
async function writeResourses2File({ FILENAME, RES }) {
  try {
    console.log(`>>> ${FILENAME}`.padEnd(96), '开始写入 <<<'.padStart(12));
    const scriptPath = fileURLToPath(import.meta.url);
    const temp = {
      value: `# https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/${FILENAME}\n`
    };
    const park = {};
    RES.forEach(item => {
      if (item.startsWith('*://')) {
        const rough = item.replace('*://www.', '*://*.');
        if (!rough.endsWith('/*')) {
          const rule = rough.split('#').at(0).trim();
          park[rule] = rule;
        } else {
          park[rough.trim()] = rough.trim();
        }
      } else if (item.startsWith('title/')) {
        // 规则不够精准
        // park[item.trim()] = item.trim();
      } else {
        // 规则没什么用
      }
    });
    Object.values(park).forEach(rule => {
      temp.value = temp.value + rule + '\n';
    });
    await writeFile(
      resolve(dirname(scriptPath), `../filter/${FILENAME}`),
      temp.value
    );
    console.log(`>>> ${FILENAME}`.padEnd(96), '写入完成 <<<'.padStart(12));
  } catch ({ message }) {
    console.error(`>>> ${FILENAME}`.padEnd(96), '写入失败 >>>'.padStart(12));
    throw new Error(message);
  }
}
