const RESOURCES = [
  'https://danny0838.github.io/content-farm-terminator/files/blocklist-ublacklist/bad-cloners.txt',
  'https://danny0838.github.io/content-farm-terminator/files/blocklist-ublacklist/content-farms.txt',
  'https://danny0838.github.io/content-farm-terminator/files/blocklist-ublacklist/extra-content-farms.txt',
  'https://danny0838.github.io/content-farm-terminator/files/blocklist-ublacklist/fake-news.txt',
  'https://danny0838.github.io/content-farm-terminator/files/blocklist-ublacklist/nearly-content-farms.txt',
  'https://danny0838.github.io/content-farm-terminator/files/blocklist-ublacklist/scam-sites.txt',
  'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.ublock.custom.ini'
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
      `>>> ${SRC.split('/').reverse()[0]}`.padEnd(36),
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
        `>>> ${SRC.split('/').reverse()[0]}`.padEnd(36),
        '下载完成 <<<'.padStart(12)
      );
    } else {
      console.log(
        `>>> ${SRC.split('/').reverse()[0]}`.padEnd(36),
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
        if (rule && !rule.startsWith('#')) {
          RAW.push(rule.replace(/\#(\W|\w|\s)+/gim, '').trim());
        }
      });
      resolve([...new Set(RAW)]);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}
async function writeResourses2File({ FILENAME, RES }) {
  try {
    console.log(`>>> ${FILENAME}`.padEnd(36), '开始写入 <<<'.padStart(12));
    const scriptPath = fileURLToPath(import.meta.url);
    const temp = {
      value: `# https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/${FILENAME}\n`
    };
    RES.forEach(item => {
      temp.value = temp.value + item + '\n';
    });
    await writeFile(
      resolve(dirname(scriptPath), `../filter/${FILENAME}`),
      temp.value
    );
    console.log(`>>> ${FILENAME}`.padEnd(36), '写入完成 <<<'.padStart(12));
  } catch (error) {
    console.log(`>>> ${FILENAME}`.padEnd(36), '写入失败 <<<'.padStart(12));
    console.error(error);
  }
}
