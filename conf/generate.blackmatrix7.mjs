import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const RESOURCES = {
  'blackmatrix7.rewrite.conf':
    'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rewrite/QuantumultX/Advertising/Advertising.conf'
};
const HOSTNAME = {
  '*.githubusercontent.com': '*.githubusercontent.com'
};
const RULES = {
  '^https?://*.githubusercontent.com/ url request-header Accept-Language:.+ request-header $1Accept-Language: en-us$2':
    '^https?://*.githubusercontent.com/ url request-header Accept-Language:.+ request-header $1Accept-Language: en-us$2'
};
(async () => {
  for await (const key of Object.keys(RESOURCES)) {
    await getResourses(RESOURCES[key], HOSTNAME, RULES);
  }
  await writeResourses2File({
    FILENAME: 'blackmatrix7.rewrite.conf',
    HOSTNAME,
    RULES
  });
})();
async function getResourses(SRC, HOSTNAME = {}, RULES = {}) {
  try {
    console.log(
      `>>> ${SRC.split('/').reverse()[0]}`.padEnd(96),
      '开始下载 <<<'.padStart(12)
    );
    const headers = {
      'Accept-Language': 'en-US',
      'Content-Type': 'text/plain',
      'User-Agent': 'QuantumultX/843'
    };
    if (
      SRC.startsWith('https://patch-diff.githubusercontent.com') ||
      SRC.startsWith('https://avatars.githubusercontent.com') ||
      SRC.startsWith('https://camo.githubusercontent.com') ||
      SRC.startsWith('https://gist.githubusercontent.com') ||
      SRC.startsWith('https://raw.githubusercontent.com') ||
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
        const pureRule = rule?.trim() || '';
        if (
          !pureRule ||
          pureRule?.startsWith(';') ||
          pureRule?.startsWith('#') ||
          pureRule?.endsWith('.js') ||
          pureRule?.endsWith('.json') ||
          pureRule?.includes('script-')
        ) {
          // 舍弃脚本与注释
        } else if (pureRule?.toLowerCase()?.startsWith('hostname')) {
          // 处理 HOSTNAME
          const pureHostName = pureRule
            .replace(/, /gim, '')
            .replace(/ = /gim, '=')
            .trim()
            .substring(9)
            .split(',');
          pureHostName.forEach(hostname => {
            const lowerHostName = hostname.toLowerCase();
            HOSTNAME[lowerHostName] = lowerHostName;
          });
        } else {
          // 处理 RULES
          RULES[pureRule] = pureRule;
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
async function writeResourses2File({ FILENAME, HOSTNAME, RULES }) {
  try {
    console.log(`>>> ${FILENAME}`.padEnd(96), '开始写入 <<<'.padStart(12));
    const scriptPath = fileURLToPath(import.meta.url);
    const hostname = {
      value: 'hostname='
    };
    const temp = {
      value:
        '# https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rewrite/QuantumultX/Advertising/Advertising.conf\n'
    };
    Object.keys(HOSTNAME)
      .sort()
      .forEach(v => {
        hostname.value = `${hostname.value}${v},`;
      });
    hostname.value = hostname.value.slice(0, -1);
    temp.value = temp.value + hostname.value + '\n';
    Object.keys(RULES)
      .sort()
      .forEach(rule => {
        temp.value = temp.value + rule + '\n';
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
