import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const RESOURCES = [
  'https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/main/robots.txt',
  'https://raw.githubusercontent.com/honojs/middleware/main/packages/ua-blocker/src/generated.ts',
  'https://raw.githubusercontent.com/tinaponting/ai-robots-scrapers/main/ROBOTS-HTACCESSTOUSE.txt'
];
(async () => {
  const LIST = [];
  await Promise.all(RESOURCES.map(SRC => getResourses(SRC, LIST)));
  const RES = await handleList(LIST);
  await writeResourses2File({
    FILENAME: 'element.ref.anti.ai.robots.ini',
    RES
  });
})();
async function getResourses(SRC, LIST = []) {
  try {
    console.log(
      `>>> ${SRC.split('/').reverse()[0]}`.padEnd(92),
      '开始下载 <<<'.padStart(12)
    );
    const headers = {
      'Accept-Language': 'en-US',
      'Content-Type': 'text/plain',
      'User-Agent': 'mihomo/1.19.29'
    };
    if (
      SRC.startsWith('https://patch-diff.githubusercontent.com') ||
      SRC.startsWith('https://avatars.githubusercontent.com') ||
      SRC.startsWith('https://camo.githubusercontent.com') ||
      SRC.startsWith('https://gist.githubusercontent.com') ||
      SRC.startsWith('https://raw.githubusercontent.com') ||
      SRC.startsWith('https://github.githubassets.com') ||
      SRC.startsWith('https://api.github.com') ||
      SRC.startsWith('https://github.com')
    ) {
      headers.Authorization = `Bearer ${process.env.GH_TOKEN}`;
    }
    const RES = await fetch(SRC, {
      method: 'GET',
      cache: 'no-store',
      credentials: 'include',
      headers
    });
    if (RES.ok) {
      const text = await RES.text();
      text.split('\n').forEach(rule => {
        if (rule) {
          LIST.push(rule.trim());
        }
      });
      console.log(
        `>>> ${SRC.split('/').reverse()[0]}`.padEnd(92),
        '下载完成 <<<'.padStart(12)
      );
    } else {
      console.error(
        `>>> ${SRC.split('/').reverse()[0]}`.padEnd(92),
        '下载失败 >>>'.padStart(12)
      );
    }
  } catch (error) {
    throw error;
  }
}
async function handleList(LIST) {
  return new Promise((resolve, reject) => {
    try {
      const RAW = [];
      LIST.forEach(rule => {
        const lowerRule = rule ? rule.toLowerCase().trim() : '';
        const ruleValue = lowerRule.startsWith('user-agent:')
          ? rule.replace(/^user-agent:\s*/i, '').trim()
          : '';
        if (ruleValue && ruleValue !== '*') {
          RAW.push(`User-agent: ${ruleValue}`);
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
    console.log(`>>> ${FILENAME}`.padEnd(92), '开始写入 <<<'.padStart(12));
    const scriptPath = fileURLToPath(import.meta.url);
    const temp = {
      value: `# ${new Date().toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai'
      })} https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/${FILENAME}\n`
    };
    const park = {};
    RES.forEach(item => {
      park[item.trim()] = item.trim();
    });
    Object.values(park).forEach(rule => {
      temp.value = temp.value + rule + '\n';
    });
    temp.value =
      temp.value + 'Content-Signal: search=no, ai-input=no, ai-train=no' + '\n';
    temp.value = temp.value + 'Disallow: /' + '\n';
    await writeFile(
      resolve(dirname(scriptPath), `../filter/${FILENAME}`),
      temp.value
    );
    console.log(`>>> ${FILENAME}`.padEnd(92), '写入完成 <<<'.padStart(12));
  } catch (error) {
    console.error(`>>> ${FILENAME}`.padEnd(92), '写入失败 >>>'.padStart(12));
    throw error;
  }
}
