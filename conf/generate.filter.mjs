import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const RESOURCES = {
  APPLESMIXTURE: {
    FILENAME: 'element.ref.apples.mixture.ini',
    SRC: [
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Apple/Apple.list',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.apples.custom.ini'
    ],
    MAPFN: mapMixture
  },
  DIRECTMIXTURE: {
    FILENAME: 'element.ref.direct.mixture.ini',
    SRC: [
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/12306/12306.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/AliPay/AliPay.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Lan/Lan.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/WeChat/WeChat.list',
      'https://raw.githubusercontent.com/missuo/ASN-China/main/ASN.China.list',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.direct.custom.ini'
    ],
    MAPFN: mapMixture
  },
  GLOBALMIXTURE: {
    FILENAME: 'element.ref.global.mixture.ini',
    SRC: [
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Binance/Binance.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Bing/Bing.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Crypto/Crypto.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/GitHub/GitHub.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Microsoft/Microsoft.list',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.global.custom.ini'
    ],
    MAPFN: mapMixture
  },
  OPENAIMIXTURE: {
    FILENAME: 'element.ref.openai.mixture.ini',
    SRC: [
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Claude/Claude.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Copilot/Copilot.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Gemini/Gemini.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/OpenAI/OpenAI.list',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.openai.custom.ini'
    ],
    MAPFN: mapMixture
  },
  REJECTMIXTURE: {
    FILENAME: 'element.ref.reject.mixture.ini',
    SRC: [
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Hijacking/Hijacking.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Marketing/Marketing.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Privacy/Privacy.list',
      'https://raw.githubusercontent.com/Cats-Team/AdRules/main/qx.conf',
      'https://raw.githubusercontent.com/fmz200/wool_scripts/main/QuantumultX/filter/fenliu.list',
      'https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/QuantumultX/rule/Adblock4limbo.list',
      'https://raw.githubusercontent.com/privacy-protection-tools/anti-AD/master/anti-ad-surge.txt',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.reject.custom.ini'
    ],
    MAPFN: mapMixture
  },
  REJECTDOHOSTS: {
    FILENAME: 'element.ref.reject.dohosts.ini',
    SRC: [
      'https://raw.githubusercontent.com/badmojr/1Hosts/master/Pro/hosts.win',
      'https://raw.githubusercontent.com/damengzhu/banad/main/hosts.txt',
      'https://raw.githubusercontent.com/FiltersHeroes/KADhosts/master/KADhosts.txt',
      'https://raw.githubusercontent.com/hagezi/dns-blocklists/main/hosts/pro.txt',
      'https://raw.githubusercontent.com/hoshsadiq/adblock-nocoin-list/master/hosts.txt',
      'https://raw.githubusercontent.com/jdlingyu/ad-wars/master/hosts',
      'https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts'
    ],
    MAPFN: mapDoHosts
  },
  REJECTPUREIPS: {
    FILENAME: 'element.ref.reject.pureips.ini',
    SRC: [
      'https://blocklist.greensnow.co/greensnow.txt',
      'https://cinsscore.com/list/ci-badguys.txt',
      'https://lists.blocklist.de/lists/all.txt',
      'https://raw.githubusercontent.com/firehol/blocklist-ipsets/master/firehol_level1.netset',
      'https://raw.githubusercontent.com/firehol/blocklist-ipsets/master/stopforumspam_7d.ipset'
    ],
    MAPFN: mapPrueIPS
  },
  STREAMMIXTURE: {
    FILENAME: 'element.ref.stream.mixture.ini',
    SRC: [
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/AmazonPrimeVideo/AmazonPrimeVideo.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Disney/Disney.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Emby/Emby.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Fox/Fox.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/HBO/HBO.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Hulu/Hulu.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Netflix/Netflix.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Pandora/Pandora.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/PandoraTV/PandoraTV.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Qobuz/Qobuz.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/SoundCloud/SoundCloud.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Spotify/Spotify.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/TIDAL/TIDAL.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Vimeo/Vimeo.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/YouTube/YouTube.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/YouTubeMusic/YouTubeMusic.list',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.stream.custom.ini'
    ],
    MAPFN: mapMixture
  },
  TIKTOKMIXTURE: {
    FILENAME: 'element.ref.tiktok.mixture.ini',
    SRC: [
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/TikTok/TikTok.list',
      'https://raw.githubusercontent.com/Semporia/TikTok-Unlock/master/Quantumult-X/TikTok.list',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.tiktok.custom.ini'
    ],
    MAPFN: mapMixture
  }
};
(async () => {
  for await (const key of Object.keys(RESOURCES)) {
    console.log(`>>> ${key}`.padEnd(36), '开始处理 <<<'.padStart(12));
    const RAW = await getResourses(RESOURCES[key]);
    const RES = combineResourses(RAW);
    await writeResourses2File(RES);
    console.log(`>>> ${key}`.padEnd(36), '处理完成 <<<'.padStart(12));
  }
})();
async function getResourses({ FILENAME, SRC, MAPFN }) {
  /**
   * {
   *    'a.txt': [...rules]
   *    'b.txt': [...rules]
   *    'c.txt': [...rules]
   *    ...
   * }
   */
  const RAW = Object.create(null);
  try {
    for (const src of SRC) {
      const key = src.split('/').at(-1);
      const res = await fetch(src, {
        method: 'GET',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
          'Content-Type': 'text/plain'
        }
      });
      if (res.ok) {
        const text = await res.text();
        RAW[key] = text
          .split('\n')
          .map(MAPFN)
          .filter(text => text.length !== 0);
      }
    }
  } catch (error) {
    console.error(error);
  }
  return {
    FILENAME,
    RAW
  };
}
function mapMixture(text) {
  const textTemp = text.trim();
  let textPure = (textTemp.split(',')[1] || '').replace(/\/\/.*/gim, '').trim();
  if (textPure.endsWith('.ingest.sentry.io')) {
    /**
     * 123456789.ingest.sentry.io
     * asdfghjkl.ingest.sentry.io
     * 保留 ingest.sentry.io 即可
     */
    textPure = 'ingest.sentry.io';
  }
  // Quantumult X 似乎不支持 DOMAIN|RULE-SET/PROCESS-NAME
  if (textTemp.startsWith('.')) {
    return `HOST-SUFFIX,${textTemp.substring(1)}`;
  } else if (textTemp.startsWith('+.')) {
    return `HOST-SUFFIX,${textTemp.substring(2)}`;
  } else if (textTemp.toUpperCase().startsWith('USER-AGENT,')) {
    return `USER-AGENT,${textPure}`;
  } else if (
    textTemp.toUpperCase().startsWith('HOST,') ||
    textTemp.toUpperCase().startsWith('DOMAIN,')
  ) {
    return `HOST,${textPure}`;
  } else if (
    textTemp.toUpperCase().startsWith('HOST-SUFFIX,') ||
    textTemp.toUpperCase().startsWith('DOMAIN-SUFFIX,')
  ) {
    // REJECT 时会导致‘字节跳动’相关网站图片显示异常
    if (textPure === 'byteimg.com') {
      return '';
    }
    return `HOST-SUFFIX,${textPure}`;
  } else if (
    textTemp.toUpperCase().startsWith('HOST-KEYWORD,') ||
    textTemp.toUpperCase().startsWith('DOMAIN-KEYWORD,')
  ) {
    // REJECT 时会导致‘火山引擎’相关网站图片显示异常
    if (textPure === 'volc') {
      return '';
    }
    return `HOST-KEYWORD,${textPure}`;
  } else if (
    textTemp.toUpperCase().startsWith('HOST-WILDCARD,') ||
    textTemp.toUpperCase().startsWith('DOMAIN-WILDCARD,')
  ) {
    return `HOST-WILDCARD,${textPure}`;
  } else if (textTemp.toUpperCase().startsWith('IP-ASN,')) {
    return `IP-ASN,${textPure}`;
  } else if (textTemp.toUpperCase().startsWith('IP-CIDR,')) {
    return `IP-CIDR,${textPure}`;
  } else if (
    textTemp.toUpperCase().startsWith('IP-CIDR6,') ||
    textTemp.toUpperCase().startsWith('IP6-CIDR,')
  ) {
    return `IP6-CIDR,${textPure}`;
  } else {
    return '';
  }
}
function mapPrueIPS(text) {
  const textTemp = text.trim();
  if (
    (textTemp.includes(':') && !textTemp.includes('/')) ||
    textTemp.startsWith('#') ||
    textTemp.startsWith(';')
  ) {
    return '';
  }
  return textTemp;
}
function mapDoHosts(text) {
  const textTemp = text?.trim();
  const [, last] = textTemp?.split(' ');
  const lastTemp = last?.trim() || undefined;
  const white = [
    '0.0.0.0',
    'broadcasthost',
    'ip6-allhosts',
    'ip6-allnodes',
    'ip6-allrouters',
    'ip6-localhost',
    'ip6-loopback',
    'ip6-mcastprefix',
    'local',
    'localhost.localdomain',
    'localhost'
  ];
  if (
    (!textTemp.startsWith('0.0.0.0 ') &&
      !textTemp.startsWith('0.0.0.1 ') &&
      !textTemp.startsWith('127.0.0.1 ') &&
      !textTemp.startsWith('255.255.255.255 ') &&
      !textTemp.startsWith('fe80::1') &&
      !textTemp.startsWith('ff00::0') &&
      !textTemp.startsWith('ff02::1') &&
      !textTemp.startsWith('ff02::2') &&
      !textTemp.startsWith('ff02::3')) ||
    white.includes(lastTemp) ||
    lastTemp === undefined
  ) {
    return '';
  }
  return `0.0.0.0 ${lastTemp}`;
}
function combineResourses({ FILENAME, RAW }) {
  const park = Object.create(null);
  const temp = Object.create(null);
  Object.keys(RAW).forEach(key => {
    console.log(
      `    ${key}`.padEnd(36),
      RAW[key].length.toString().padStart(12)
    );
    RAW[key].forEach(rule => {
      if (rule.includes(',')) {
        const [, domainORip] = rule.split(',');
        if (!park[domainORip]) {
          park[domainORip] = domainORip;
          temp[rule] = rule;
        } else {
          /**
           * 有重复的域名，但不一定有重复的规则
           * HOST,safebrowsing.urlsec.qq.com
           * HOST-SUFFIX,safebrowsing.urlsec.qq.com
           * 保留一个即可
           */
        }
      } else {
        temp[rule] = rule;
      }
    });
  });
  const RES = Object.keys(temp).sort();
  console.log(`    ${FILENAME}`.padEnd(36), RES.length.toString().padStart(12));
  return {
    FILENAME,
    RES
  };
}
async function writeResourses2File({ FILENAME, RES }) {
  try {
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
  } catch (error) {
    console.error(error);
  }
}
