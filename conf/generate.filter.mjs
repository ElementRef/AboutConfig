import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const MIXTUREWHITELIST = {
  '10.0.0.0/8': '10.0.0.0/8', // 软件内置规则
  '127.0.0.0/8': '127.0.0.0/8', // 软件内置规则
  '172.16.0.0/12': '172.16.0.0/12', // 软件内置规则
  '192.0.0.0/16': '192.0.0.0/16', // 软件内置规则
  '224.0.0.0/24': '224.0.0.0/24', // 软件内置规则
  'browserleaks.com': 'browserleaks.com', // DNS 泄露检测
  'byteimg.com': 'byteimg.com', // 字节静态资源
  'click.discord.com': 'click.discord.com', // Discord 验证码
  'ipleak.net': 'ipleak.net', // DNS 泄露检测
  'juejin.cn': 'juejin.cn', // 掘金官网
  'parallels.cn': 'parallels.cn', // Parallels 官网
  'parallels.com': 'parallels.com', // Parallels 官网
  's.weibo.com': 's.weibo.com', // 微博静态资源
  'static-s.iqiyi.com': 'static-s.iqiyi.com', // 爱奇艺静态资源
  'staticsns.cdn.bcebos.com': 'staticsns.cdn.bcebos.com', // 百度静态资源
  'umami.is': 'umami.is' // Umami 官网
};
const HOSTWHITELIST = {
  '0.0.0.0': '0.0.0.0',
  'ip6-allhosts': 'ip6-allhosts',
  'ip6-allnodes': 'p6-allnodes',
  'ip6-allrouters': 'ip6-allrouters',
  'ip6-localhost ip6-loopback': 'ip6-localhost ip6-loopback',
  'ip6-localhost': 'ip6-localhost',
  'ip6-loopback': 'ip6-loopback',
  'ip6-mcastprefix': 'ip6-mcastprefix',
  'localhost.localdomain': 'localhost.localdomain',
  broadcasthost: 'broadcasthost',
  local: 'local',
  localhost: 'localhost'
};
const RESOURCES = {
  REJECTMIXTURE: {
    FILENAME: 'element.ref.reject.mixture.ini',
    SRC: [
      'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyPrivacy.list',
      'https://raw.githubusercontent.com/Cats-Team/AdRules/main/qx.conf',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.reject.custom.ini',
      'https://raw.githubusercontent.com/firehol/blocklist-ipsets/master/firehol_level1.netset',
      'https://raw.githubusercontent.com/fmz200/wool_scripts/main/Loon/rule/rejectAd.list',
      'https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Filter/AdBlock.list',
      'https://raw.githubusercontent.com/GMOogway/shadowrocket-rules/master/sr_reject_list.module',
      'https://raw.githubusercontent.com/Johnshall/Shadowrocket-ADBlock-Rules-Forever/release/sr_ad_only.conf',
      'https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/QuantumultX/rule/Adblock4limbo.list',
      'https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/QuantumultX/rule/BanAD.list',
      'https://raw.githubusercontent.com/privacy-protection-tools/anti-AD/master/anti-ad-surge.txt',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/ip/reject.conf',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/non_ip/my_reject.conf',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/non_ip/reject.conf',
      'https://raw.githubusercontent.com/uselibrary/PCDN/main/pcdn.list',
      'https://raw.githubusercontent.com/VirgilClyne/GetSomeFries/main/ruleset/HTTPDNS.Block.list'
    ],
    MAPFN: mapMixture
  },
  REJECTDOHOSTS: {
    FILENAME: 'element.ref.reject.dohosts.ini',
    SRC: [
      'https://a.dove.isdumb.one/list.txt',
      'https://hblock.molinero.dev/hosts',
      'https://malware-filter.gitlab.io/malware-filter/urlhaus-filter-hosts.txt',
      'https://raw.githubusercontent.com/badmojr/1Hosts/master/Pro/hosts.win',
      'https://raw.githubusercontent.com/crazy-max/WindowsSpyBlocker/master/data/hosts/extra.txt',
      'https://raw.githubusercontent.com/crazy-max/WindowsSpyBlocker/master/data/hosts/spy.txt',
      'https://raw.githubusercontent.com/crazy-max/WindowsSpyBlocker/master/data/hosts/update.txt',
      'https://raw.githubusercontent.com/damengzhu/banad/main/hosts.txt',
      'https://raw.githubusercontent.com/durablenapkin/scamblocklist/master/hosts.txt',
      'https://raw.githubusercontent.com/FiltersHeroes/KADhosts/master/KADhosts.txt',
      'https://raw.githubusercontent.com/hagezi/dns-blocklists/main/hosts/pro.txt',
      'https://raw.githubusercontent.com/hoshsadiq/adblock-nocoin-list/master/hosts.txt',
      'https://raw.githubusercontent.com/hululu1068/AdGuard-Rule/main/rule/hosts.txt',
      'https://raw.githubusercontent.com/jdlingyu/ad-wars/master/hosts',
      'https://raw.githubusercontent.com/jerryn70/GoodbyeAds/master/Hosts/GoodbyeAds.txt',
      'https://raw.githubusercontent.com/neodevpro/neodevhost/master/host',
      'https://raw.githubusercontent.com/Sinfonietta/hostfiles/master/gambling-hosts',
      'https://raw.githubusercontent.com/Sinfonietta/hostfiles/master/pornography-hosts',
      'https://raw.githubusercontent.com/Sinfonietta/hostfiles/master/snuff-hosts',
      'https://raw.githubusercontent.com/Sinfonietta/hostfiles/master/social-hosts',
      'https://raw.githubusercontent.com/StevenBlack/hosts/master/alternates/fakenews-gambling-porn-social/hosts',
      'https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-hosts.txt',
      'https://raw.githubusercontent.com/tiuxo/hosts/master/ads',
      'https://raw.githubusercontent.com/tiuxo/hosts/master/porn',
      'https://raw.githubusercontent.com/yous/YousList/master/hosts.txt',
      'https://someonewhocares.org/hosts/zero/hosts',
      'https://winhelp2002.mvps.org/hosts.txt'
    ],
    MAPFN: mapDoHosts
  },
  APPLESMIXTURE: {
    FILENAME: 'element.ref.apples.mixture.ini',
    SRC: [
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Apple/Apple.list',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.apples.custom.ini',
      'https://raw.githubusercontent.com/sooyaaabo/Loon/main/Rule/Apple.list',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/ip/apple_services.conf',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/non_ip/apple_cn.conf',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/non_ip/apple_services.conf'
    ],
    MAPFN: mapMixture
  },
  DIRECTMIXTURE: {
    FILENAME: 'element.ref.direct.mixture.ini',
    SRC: [
      'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/LocalAreaNetwork.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/AliPay/AliPay.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Jetbrains/Jetbrains.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Lan/Lan.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/WeChat/WeChat.list',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.direct.custom.ini',
      'https://raw.githubusercontent.com/missuo/ASN-China/main/ASN.China.list',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/ip/lan.conf'
    ],
    MAPFN: mapMixture
  },
  GLOBALMIXTURE: {
    FILENAME: 'element.ref.global.mixture.ini',
    SRC: [
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Adobe/Adobe.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Docker/Docker.list',
      'https://raw.githubusercontent.com/Coldvvater/Mononoke/master/Surge/Rules/AppleProxyService.list',
      'https://raw.githubusercontent.com/ConnersHua/RuleGo/master/Surge/Ruleset/Proxy.list',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.global.custom.ini',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/ip/telegram_asn.conf',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/non_ip/microsoft.conf'
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
      'https://raw.githubusercontent.com/Coldvvater/Mononoke/master/Surge/Rules/AI.list',
      'https://raw.githubusercontent.com/ConnersHua/RuleGo/master/Surge/Ruleset/Extra/AI.list',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.openai.custom.ini',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/non_ip/ai.conf'
    ],
    MAPFN: mapMixture
  },
  STREAMMIXTURE: {
    FILENAME: 'element.ref.stream.mixture.ini',
    SRC: [
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Netflix/Netflix.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Spotify/Spotify.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Vimeo/Vimeo.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/YouTube/YouTube.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/YouTubeMusic/YouTubeMusic.list',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.stream.custom.ini',
      'https://ruleset.skk.moe/List/ip/stream.conf',
      'https://ruleset.skk.moe/List/non_ip/stream.conf'
    ],
    MAPFN: mapMixture
  },
  TIKTOKMIXTURE: {
    FILENAME: 'element.ref.tiktok.mixture.ini',
    SRC: [
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/TikTok/TikTok.list',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.tiktok.custom.ini',
      'https://raw.githubusercontent.com/Semporia/TikTok-Unlock/master/Quantumult-X/TikTok.list'
    ],
    MAPFN: mapMixture
  }
};
(async () => {
  for await (const key of Object.keys(RESOURCES)) {
    console.log(`>>> ${key}`.padEnd(96), '开始处理 <<<'.padStart(12));
    const RAW = await getResourses(RESOURCES[key]);
    const RES = combineResourses(RAW);
    await writeResourses2File(RES);
    console.log(`>>> ${key}`.padEnd(96), '处理完成 <<<'.padStart(12));
  }
})();
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
  } catch ({ message }) {
    console.error(message);
    throw new Error(message);
  }
}
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
      const keyArr = src.split('/');
      const key = `${keyArr.at(-3)}/${keyArr.at(-2)}/${keyArr.at(-1)}`
        .replace(/\?.+/gim, '')
        .replace(/^\//gim, '');
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
          .map(str => MAPFN(str, FILENAME))
          .filter(text => text.length !== 0);
        if (MAPFN !== mapDoHosts) {
          RAW[key].forEach(item => {
            const temp = item.split(',')[1]?.trim();
            const { length: dotAmount } = [...temp.matchAll(/\./gim)]; // 域名中·的个数
            if (!globalThis[`${FILENAME}${dotAmount}`]) {
              globalThis[`${FILENAME}${dotAmount}`] = {};
            }
            globalThis[`${FILENAME}${dotAmount}`][temp] = temp;
          });
        }
      } else {
        console.error(`    ${key}`.padEnd(96), `加载失败 >>>`.padStart(12));
      }
    }
  } catch ({ message }) {
    console.error(message);
    throw new Error(message);
  }
  return {
    FILENAME,
    RAW
  };
}
function combineResourses({ FILENAME, RAW }) {
  let RAWARR = [];
  let RAWPARK = Object.create(null);
  let RAWRULE = Object.create(null);
  let REJECTFILENAME = 'element.ref.reject.mixture.ini';
  Object.keys(RAW).forEach(key => {
    console.log(
      `    ${key}`.padEnd(96),
      RAW[key].length.toString().padStart(12)
    );
    RAWARR = RAWARR.concat(RAW[key]);
  });
  RAWARR.forEach(rule => {
    if (rule.includes(',')) {
      const [, domainORip] = rule.split(',');
      const { length: dotAmount } = [...domainORip.matchAll(/\./gim)];
      const lastLevelDomain = domainORip.split('.').splice(1).join('.');
      if (
        FILENAME === REJECTFILENAME &&
        !globalThis?.[`${FILENAME}${dotAmount - 1}`]?.[lastLevelDomain] &&
        !RAWPARK[domainORip]
      ) {
        RAWPARK[domainORip] = domainORip;
        RAWRULE[rule] = rule;
      }
      if (
        FILENAME !== REJECTFILENAME &&
        !globalThis?.[`${REJECTFILENAME}${dotAmount - 1}`]?.[lastLevelDomain] &&
        !globalThis?.[`${REJECTFILENAME}${dotAmount}`]?.[domainORip] &&
        !globalThis?.[`${FILENAME}${dotAmount - 1}`]?.[lastLevelDomain] &&
        !RAWPARK[domainORip]
      ) {
        RAWPARK[domainORip] = domainORip;
        RAWRULE[rule] = rule;
      }
    } else {
      RAWRULE[rule] = rule;
    }
  });
  const RES = Object.keys(RAWRULE).sort();
  console.log(`    ${FILENAME}`.padEnd(96), RES.length.toString().padStart(12));
  return {
    FILENAME,
    RES
  };
}
function mapDoHosts(text) {
  const textTemp = text?.trim();
  const lastTemp = textTemp?.split(' ')?.at(-1)?.trim() || undefined;
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
    lastTemp === undefined ||
    HOSTWHITELIST[lastTemp]
  ) {
    return '';
  }
  return `0.0.0.0 ${lastTemp}`;
}
function mapMixture(text = '') {
  const textTemp = text.replace(/ /gim, '');
  const textPure = (textTemp.split(',')[1] || '')
    .replace(/^\.|\.$/gim, '')
    .replace(/\/\/.*/gim, '')
    .trim();
  // 删除注释
  if (
    textTemp.includes('-NO-DROP') ||
    textTemp.includes('acl4.ssr') ||
    textTemp.includes('skk.moe') ||
    textTemp.includes('sukkaw') ||
    textPure.endsWith('.arpa') ||
    textTemp.startsWith(';') ||
    textTemp.startsWith('[') ||
    textTemp.startsWith('/') ||
    textTemp.startsWith('#') ||
    textTemp === ''
  ) {
    return '';
  }
  // /^,[w]{+}\./gim 存在误杀
  if (
    /^,[w]{3}\./gim.test(`,${textPure}`) &&
    [...textPure.matchAll(/\./gim)].length > 1
  ) {
    return `HOST-SUFFIX,${textPure.replace(/^[w]{3}\./gim, '')}`;
  }
  // 域名后缀
  if (textPure.endsWith('.000nethost.com')) {
    return 'HOST-SUFFIX,000nethost.com';
  }
  if (textPure.endsWith('.102.112.2o7.net')) {
    return 'HOST-SUFFIX,102.112.2o7.net';
  }
  if (textPure.endsWith('.51y5.net')) {
    return 'HOST-SUFFIX,51y5.net';
  }
  if (textPure.endsWith('.actonservice.com')) {
    return 'HOST-SUFFIX,actonservice.com';
  }
  if (textPure.endsWith('.ad.xiaomi.com')) {
    return 'HOST-SUFFIX,ad.xiaomi.com';
  }
  if (textPure.endsWith('.agoracalyce.net')) {
    return 'HOST-SUFFIX,agoracalyce.net';
  }
  if (textPure.endsWith('.agvisorpro.com')) {
    return 'HOST-SUFFIX,agvisorpro.com';
  }
  if (textPure.endsWith('.ahacdn.me')) {
    return 'HOST-SUFFIX,ahacdn.me';
  }
  if (textPure.endsWith('.almosafer.com')) {
    return 'HOST-SUFFIX,almosafer.com';
  }
  if (textPure.endsWith('.apps.iocnt.de')) {
    return 'HOST-SUFFIX,apps.iocnt.de';
  }
  if (textPure.endsWith('.atianqi.com')) {
    return 'HOST-SUFFIX,atianqi.com';
  }
  if (textPure.endsWith('.bravenet.com')) {
    return 'HOST-SUFFIX,bravenet.com';
  }
  if (textPure.endsWith('.carte-gr.total.fr')) {
    return 'HOST-SUFFIX,carte-gr.total.fr';
  }
  if (textPure.endsWith('.cosmicnewspulse.com')) {
    return 'HOST-SUFFIX,cosmicnewspulse.com';
  }
  if (textPure.endsWith('.demoamericas275.adobe.com')) {
    return 'HOST-SUFFIX,demoamericas275.adobe.com';
  }
  if (textPure.endsWith('.doubleclick.net')) {
    return 'HOST-SUFFIX,doubleclick.net';
  }
  if (textPure.endsWith('.downloadlink.icu')) {
    return 'HOST-SUFFIX,downloadlink.icu';
  }
  if (textPure.endsWith('.duckdns.org')) {
    return 'HOST-SUFFIX,duckdns.org';
  }
  if (textPure.endsWith('.elemis.com')) {
    return 'HOST-SUFFIX,elemis.com';
  }
  if (textPure.endsWith('.eloquademos.com')) {
    return 'HOST-SUFFIX,eloquademos.com';
  }
  if (textPure.endsWith('.espmp-agfr.net')) {
    return 'HOST-SUFFIX,espmp-agfr.net';
  }
  if (textPure.endsWith('.espmp-aufr.net')) {
    return 'HOST-SUFFIX,espmp-aufr.net';
  }
  if (textPure.endsWith('.espmp-cufr.net')) {
    return 'HOST-SUFFIX,espmp-cufr.net';
  }
  if (textPure.endsWith('.espmp-nifr.net')) {
    return 'HOST-SUFFIX,espmp-nifr.net';
  }
  if (textPure.endsWith('.espmp-pofr.net')) {
    return 'HOST-SUFFIX,espmp-pofr.net';
  }
  if (textPure.endsWith('.e.kuaishou.com')) {
    return 'HOST-SUFFIX,e.kuaishou.com';
  }
  if (textPure.endsWith('.fdj.fr')) {
    return 'HOST-SUFFIX,fdj.fr';
  }
  if (textPure.endsWith('.flourishpath.online')) {
    return 'HOST-SUFFIX,flourishpath.online';
  }
  if (textPure.endsWith('.focalink.com')) {
    return 'HOST-SUFFIX,focalink.com';
  }
  if (textPure.endsWith('.getui.com')) {
    return 'HOST-SUFFIX,getui.com';
  }
  if (textPure.endsWith('.globalsources.com')) {
    return 'HOST-SUFFIX,globalsources.com';
  }
  if (textPure.endsWith('.headlines.pw')) {
    return 'HOST-SUFFIX,headlines.pw';
  }
  if (textPure.endsWith('.hello.spriggy.com.au')) {
    return 'HOST-SUFFIX,hello.spriggy.com.au';
  }
  if (textPure.endsWith('.herokuapp.com')) {
    return 'HOST-SUFFIX,herokuapp.com';
  }
  if (textPure.endsWith('.heytapmobile.com')) {
    return 'HOST-SUFFIX,heytapmobile.com';
  }
  if (textPure.endsWith('.hipages.com.au')) {
    return 'HOST-SUFFIX,hipages.com.au';
  }
  if (textPure.endsWith('.hubcloud.com.cn')) {
    return 'HOST-SUFFIX,hubcloud.com.cn';
  }
  if (textPure.endsWith('.igexin.com')) {
    return 'HOST-SUFFIX,igexin.com';
  }
  if (textPure.endsWith('.imrworldwide.com')) {
    return 'HOST-SUFFIX,imrworldwide.com';
  }
  if (textPure.endsWith('.information.maileva.com')) {
    return 'HOST-SUFFIX,information.maileva.com';
  }
  if (textPure.endsWith('.innovatedating.com')) {
    return 'HOST-SUFFIX,innovatedating.com';
  }
  if (textPure.endsWith('.intellitxt.com')) {
    return 'HOST-SUFFIX,intellitxt.com';
  }
  if (textPure.endsWith('.ipfs.dweb.link')) {
    return 'HOST-SUFFIX,ipfs.dweb.link';
  }
  if (textPure.endsWith('.ipfs.flk-ipfs.xyz')) {
    return 'HOST-SUFFIX,ipfs.flk-ipfs.xyz';
  }
  if (textPure.endsWith('.jinghuaqitb.com')) {
    return 'HOST-SUFFIX,jinghuaqitb.com';
  }
  if (textPure.endsWith('.jmooreassoc.com')) {
    return 'HOST-SUFFIX,jmooreassoc.com';
  }
  if (textPure.endsWith('.kimhasa.com')) {
    return 'HOST-SUFFIX,kimhasa.com';
  }
  if (textPure.endsWith('.linodeusercontent.com')) {
    return 'HOST-SUFFIX,linodeusercontent.com';
  }
  if (textPure.endsWith('.llnw.net')) {
    return 'HOST-SUFFIX,llnw.net';
  }
  if (textPure.endsWith('.msecnd.net')) {
    return 'HOST-SUFFIX,msecnd.net';
  }
  if (textPure.endsWith('.musical.ly')) {
    return 'HOST-SUFFIX,musical.ly';
  }
  if (textPure.endsWith('.myqcloud.com')) {
    return 'HOST-SUFFIX,myqcloud.com';
  }
  if (textPure.endsWith('.nespresso.com')) {
    return 'HOST-SUFFIX,nespresso.com';
  }
  if (textPure.endsWith('.net.easyjet.com')) {
    return 'HOST-SUFFIX,net.easyjet.com';
  }
  if (textPure.endsWith('.net.iberostar.com')) {
    return 'HOST-SUFFIX,net.iberostar.com';
  }
  if (textPure.endsWith('.net.mydays.de')) {
    return 'HOST-SUFFIX,net.mydays.de';
  }
  if (textPure.endsWith('.notice.spriggy.com.au')) {
    return 'HOST-SUFFIX,notice.spriggy.com.au';
  }
  if (textPure.endsWith('.offermatica.com')) {
    return 'HOST-SUFFIX,offermatica.com';
  }
  if (textPure.endsWith('.ohhmyoffers.com')) {
    return 'HOST-SUFFIX,ohhmyoffers.com';
  }
  if (textPure.endsWith('.omniture.com')) {
    return 'HOST-SUFFIX,omniture.com';
  }
  if (textPure.endsWith('.onion')) {
    return 'HOST-SUFFIX,onion';
  }
  if (textPure.endsWith('.ott.cibntv.com')) {
    return 'HOST-SUFFIX,ott.cibntv.net';
  }
  if (textPure.endsWith('.pandasuite.com')) {
    return 'HOST-SUFFIX,pandasuite.com';
  }
  if (textPure.endsWith('.p2l.info')) {
    return 'HOST-SUFFIX,p2l.info';
  }
  if (textPure.endsWith('.pop6.com')) {
    return 'HOST-SUFFIX,pop6.com';
  }
  if (textPure.endsWith('.pstatp.com')) {
    return 'HOST-SUFFIX,pstatp.com';
  }
  if (textPure.endsWith('.rsc.cdn77.org')) {
    return 'HOST-SUFFIX,rsc.cdn77.org';
  }
  if (textPure.endsWith('.s.joyn.de')) {
    return 'HOST-SUFFIX,s.joyn.de';
  }
  if (textPure.endsWith('.sanvello.com')) {
    return 'HOST-SUFFIX,sanvello.com';
  }
  if (textPure.endsWith('.sextracker.be')) {
    return 'HOST-SUFFIX,sextracker.be';
  }
  if (textPure.endsWith('.siemensplmevents.com')) {
    return 'HOST-SUFFIX,siemensplmevents.com';
  }
  if (textPure.endsWith('.skyscanner.com')) {
    return 'HOST-SUFFIX,skyscanner.com';
  }
  if (textPure.endsWith('.skyscanner.net')) {
    return 'HOST-SUFFIX,skyscanner.net';
  }
  if (textPure.endsWith('.stats.esomniture.com')) {
    return 'HOST-SUFFIX,stats.esomniture.com';
  }
  if (textPure.endsWith('.stuff.co.nz')) {
    return 'HOST-SUFFIX,stuff.co.nz';
  }
  if (textPure.endsWith('.swrve.com')) {
    return 'HOST-SUFFIX,swrve.com';
  }
  if (textPure.endsWith('.tajawal.com')) {
    return 'HOST-SUFFIX,tajawal.com';
  }
  if (textPure.endsWith('.themoneytizer.com')) {
    return 'HOST-SUFFIX,themoneytizer.com';
  }
  if (textPure.endsWith('.tntdrama.com')) {
    return 'HOST-SUFFIX,tntdrama.com';
  }
  if (textPure.endsWith('.treknew.fun')) {
    return 'HOST-SUFFIX,treknew.fun';
  }
  if (textPure.endsWith('.umengcloud.com')) {
    return 'HOST-SUFFIX,umengcloud.com';
  }
  if (textPure.endsWith('.umeng.com')) {
    return 'HOST-SUFFIX,umeng.com';
  }
  if (textPure.endsWith('.u3.ucweb.com')) {
    return 'HOST-SUFFIX,u3.ucweb.com';
  }
  if (textPure.endsWith('.ut.taobao.com')) {
    return 'HOST-SUFFIX,ut.taobao.com';
  }
  if (textPure.endsWith('.videostrip.com')) {
    return 'HOST-SUFFIX,videostrip.com';
  }
  if (textPure.endsWith('.viglink.com')) {
    return 'HOST-SUFFIX,viglink.com';
  }
  if (textPure.endsWith('.web-marketing.ai')) {
    return 'HOST-SUFFIX,web-marketing.ai';
  }
  if (textPure.endsWith('.weebly.com')) {
    return 'HOST-SUFFIX,weebly.com';
  }
  if (textPure.endsWith('.wolterskluwer.com')) {
    return 'HOST-SUFFIX,wolterskluwer.com';
  }
  if (textPure.endsWith('.yinzcam.com')) {
    return 'HOST-SUFFIX,yinzcam.com';
  }
  /**
   * 域名前缀，找最大特征，避免误杀
   * HOST-KEYWORD 优先级较低，会出现逃逸问题
   * 所以，只能避开主流公司会使用的「规则前缀」
   * 比如，访问 a.munters.apple.com 时
   * HOST-SUFFIX,apple.com 存在直连策略中
   * a.munters.apple.com 会因为 HOST-KEYWORD 优先级太低
   * 导致 a.munters.apple.com 被匹配为直连策略，导致拦截失效
   * 但是，似乎 Surge|Quantumult X|Clash 的策略优先级都不太一样
   */
  if (textPure.startsWith('a.munters.')) {
    return 'HOST-KEYWORD,a.munters';
  }
  if (textPure.startsWith('a.perfumesclub.')) {
    return 'HOST-KEYWORD,a.perfumesclub';
  }
  if (textPure.startsWith('a.weareknitters.')) {
    return 'HOST-KEYWORD,a.weareknitters';
  }
  if (textPure.startsWith('a8.www.')) {
    return 'HOST-KEYWORD,a8.www';
  }
  if (textPure.startsWith('a8clk.cart.')) {
    return 'HOST-KEYWORD,a8clk.cart';
  }
  if (textPure.startsWith('a8clk.cv.')) {
    return 'HOST-KEYWORD,a8clk.cv';
  }
  if (textPure.startsWith('a8clk.shop.')) {
    return 'HOST-KEYWORD,a8clk.shop';
  }
  if (textPure.startsWith('a8clk.www.')) {
    return 'HOST-KEYWORD,a8clk.www';
  }
  if (textPure.startsWith('a8cv.store.')) {
    return 'HOST-KEYWORD,a8cv.store';
  }
  if (textPure.startsWith('a8cv.www.')) {
    return 'HOST-KEYWORD,a8cv.www';
  }
  if (textPure.startsWith('aa-metrics.')) {
    return 'HOST-KEYWORD,aa-metrics';
  }
  if (textPure.startsWith('aa.dyson.')) {
    return 'HOST-KEYWORD,aa.dyson';
  }
  if (textPure.startsWith('ablink.email.')) {
    return 'HOST-KEYWORD,ablink.email';
  }
  if (textPure.startsWith('ablink.info.')) {
    return 'HOST-KEYWORD,ablink.info';
  }
  if (textPure.startsWith('ablink.mail.')) {
    return 'HOST-KEYWORD,ablink.mail';
  }
  if (textPure.startsWith('ablink.marketing.')) {
    return 'HOST-KEYWORD,ablink.marketing';
  }
  if (textPure.startsWith('ablink.news.')) {
    return 'HOST-KEYWORD,ablink.news';
  }
  if (textPure.startsWith('act-on-marketing.')) {
    return 'HOST-KEYWORD,act-on-marketing';
  }
  if (textPure.startsWith('ad.kissanime.')) {
    return 'HOST-KEYWORD,ad.kissanime';
  }
  if (textPure.startsWith('ad.kisscartoon.')) {
    return 'HOST-KEYWORD,ad.kisscartoon';
  }
  if (textPure.startsWith('adobe.autoscout24.')) {
    return 'HOST-KEYWORD,adobe.autoscout24';
  }
  if (textPure.startsWith('adobeanalytics.')) {
    return 'HOST-KEYWORD,adobeanalytics';
  }
  if (textPure.startsWith('adobemetrics.yellohvillage.')) {
    return 'HOST-KEYWORD,adobemetrics.yellohvillage';
  }
  if (textPure.startsWith('adobetarget.yellohvillage.')) {
    return 'HOST-KEYWORD,adobetarget.yellohvillage';
  }
  if (textPure.startsWith('ads.tripod.')) {
    return 'HOST-KEYWORD,ads.tripod';
  }
  if (textPure.startsWith('adserver.janes.')) {
    return 'HOST-KEYWORD,adserver.janes';
  }
  if (textPure.startsWith('adtarget.fcbarcelona.')) {
    return 'HOST-KEYWORD,adtarget.fcbarcelona';
  }
  if (textPure.startsWith('adtd.douglas.')) {
    return 'HOST-KEYWORD,adtd.douglas';
  }
  if (textPure.startsWith('adtd.parfumdreams.')) {
    return 'HOST-KEYWORD,adtd.parfumdreams';
  }
  if (textPure.startsWith('affiliate.lentiamo.')) {
    return 'HOST-KEYWORD,affiliate.lentiamo';
  }
  if (textPure.startsWith('ainu.intel.')) {
    return 'HOST-KEYWORD,ainu.intel';
  }
  if (textPure.startsWith('aiq-in.')) {
    return 'HOST-KEYWORD,aiq-in';
  }
  if (textPure.startsWith('analytics.cartoonnetwork.')) {
    return 'HOST-KEYWORD,analytics.cartoonnetwork';
  }
  if (textPure.startsWith('analytics.cyrillus.')) {
    return 'HOST-KEYWORD,analytics.cyrillus';
  }
  if (textPure.startsWith('analytics.komoder.')) {
    return 'HOST-KEYWORD,analytics.komoder';
  }
  if (textPure.startsWith('analytics.metro.')) {
    return 'HOST-KEYWORD,analytics.metro';
  }
  if (textPure.startsWith('analytics.midas.')) {
    return 'HOST-KEYWORD,analytics.midas';
  }
  if (textPure.startsWith('analytics.nordea.')) {
    return 'HOST-KEYWORD,analytics.nordea';
  }
  if (textPure.startsWith('analytics.pipelife.')) {
    return 'HOST-KEYWORD,analytics.pipelife';
  }
  if (textPure.startsWith('analytics.saketos.')) {
    return 'HOST-KEYWORD,analytics.saketos';
  }
  if (textPure.startsWith('analytics.sixt.')) {
    return 'HOST-KEYWORD,analytics.sixt';
  }
  if (textPure.startsWith('analytics.tnt-tv.')) {
    return 'HOST-KEYWORD,analytics.tnt-tv';
  }
  if (textPure.startsWith('analytics.tntsports.')) {
    return 'HOST-KEYWORD,analytics.tntsports';
  }
  if (textPure.startsWith('analytics.wienerberger.')) {
    return 'HOST-KEYWORD,analytics.wienerberger';
  }
  if (textPure.startsWith('anmeldung.promatis.')) {
    return 'HOST-KEYWORD,anmeldung.promatis';
  }
  if (textPure.startsWith('answers.teradata.')) {
    return 'HOST-KEYWORD,answers.teradata';
  }
  if (textPure.startsWith('app-test.')) {
    return 'HOST-KEYWORD,app-test';
  }
  if (textPure.startsWith('application.ricoh.')) {
    return 'HOST-KEYWORD,application.ricoh';
  }
  if (textPure.startsWith('asd.bauhaus.')) {
    return 'HOST-KEYWORD,asd.bauhaus';
  }
  if (textPure.startsWith('ask.antalis.')) {
    return 'HOST-KEYWORD,ask.antalis';
  }
  if (textPure.startsWith('att.trk.')) {
    return 'HOST-KEYWORD,att.trk';
  }
  if (textPure.startsWith('br.ac.')) {
    return 'HOST-KEYWORD,br.ac';
  }
  if (textPure.startsWith('btaconnect.americanexpress.')) {
    return 'HOST-KEYWORD,btaconnect.americanexpress';
  }
  if (textPure.startsWith('btaenrolment.americanexpress.')) {
    return 'HOST-KEYWORD,btaenrolment.americanexpress';
  }
  if (textPure.startsWith('click-eu-v4.')) {
    return 'HOST-KEYWORD,click-eu-v4';
  }
  if (textPure.startsWith('click-v4.')) {
    return 'HOST-KEYWORD,click-v4';
  }
  if (textPure.startsWith('click.easycosmetic.')) {
    return 'HOST-KEYWORD,click.easycosmetic';
  }
  if (textPure.startsWith('click.email.')) {
    return 'HOST-KEYWORD,click.email';
  }
  if (textPure.startsWith('click.mail.')) {
    return 'HOST-KEYWORD,click.mail';
  }
  if (textPure.startsWith('cname-aa.')) {
    return 'HOST-KEYWORD,cname-aa';
  }
  if (textPure.startsWith('cname-ade.')) {
    return 'HOST-KEYWORD,cname-ade';
  }
  if (textPure.startsWith('collect.calvinklein.')) {
    return 'HOST-KEYWORD,collect.calvinklein';
  }
  if (textPure.startsWith('collector-pxebumdlwe.')) {
    return 'HOST-KEYWORD,collector-pxebumdlwe';
  }
  if (textPure.startsWith('collector-pxrf8vapwa.')) {
    return 'HOST-KEYWORD,collector-pxrf8vapwa';
  }
  if (textPure.startsWith('collector.betway.')) {
    return 'HOST-KEYWORD,collector.betway';
  }
  if (textPure.startsWith('cookies.jll.')) {
    return 'HOST-KEYWORD,cookies.jll';
  }
  if (textPure.startsWith('cztexz.cashbackdeals.')) {
    return 'HOST-KEYWORD,cztexz.cashbackdeals';
  }
  if (textPure.startsWith('cztexz.ladycashback.')) {
    return 'HOST-KEYWORD,cztexz.ladycashback';
  }
  if (textPure.startsWith('da.hornbach.')) {
    return 'HOST-KEYWORD,da.hornbach';
  }
  if (textPure.startsWith('data-8abe5cc617.')) {
    return 'HOST-KEYWORD,data-8abe5cc617';
  }
  if (textPure.startsWith('data-99329e3cb2.')) {
    return 'HOST-KEYWORD,data-99329e3cb2';
  }
  if (textPure.startsWith('data-9dc3fcd9b4.')) {
    return 'HOST-KEYWORD,data-9dc3fcd9b4';
  }
  if (textPure.startsWith('data-ae99031d75.')) {
    return 'HOST-KEYWORD,data-ae99031d75';
  }
  if (textPure.startsWith('data-b389eff81a.')) {
    return 'HOST-KEYWORD,data-b389eff81a';
  }
  if (textPure.startsWith('data-c849cc593c.')) {
    return 'HOST-KEYWORD,data-c849cc593c';
  }
  if (textPure.startsWith('data-ce326d00f8.')) {
    return 'HOST-KEYWORD,data-ce326d00f8';
  }
  if (textPure.startsWith('data-ce326d00f8.')) {
    return 'HOST-KEYWORD,data-ce326d00f8';
  }
  if (textPure.startsWith('data-dd659348c3.')) {
    return 'HOST-KEYWORD,data-dd659348c3';
  }
  if (textPure.startsWith('data-e54efb31a3.')) {
    return 'HOST-KEYWORD,data-e54efb31a3';
  }
  if (textPure.startsWith('data-02011e6008.')) {
    return 'HOST-KEYWORD,data-02011e6008';
  }
  if (textPure.startsWith('data-0420d605d9.')) {
    return 'HOST-KEYWORD,data-0420d605d9';
  }
  if (textPure.startsWith('data-043610b415.')) {
    return 'HOST-KEYWORD,data-043610b415';
  }
  if (textPure.startsWith('data-09d76f48f8.')) {
    return 'HOST-KEYWORD,data-09d76f48f8';
  }
  if (textPure.startsWith('data-11c63b1cbc.')) {
    return 'HOST-KEYWORD,data-11c63b1cbc';
  }
  if (textPure.startsWith('data-1381d79962.')) {
    return 'HOST-KEYWORD,data-1381d79962';
  }
  if (textPure.startsWith('data-143ac31e30.')) {
    return 'HOST-KEYWORD,data-143ac31e30';
  }
  if (textPure.startsWith('data-16d7ec9a30.')) {
    return 'HOST-KEYWORD,data-16d7ec9a30';
  }
  if (textPure.startsWith('data-1818d50639.')) {
    return 'HOST-KEYWORD,data-1818d50639';
  }
  if (textPure.startsWith('data-1842699cc4.')) {
    return 'HOST-KEYWORD,data-1842699cc4';
  }
  if (textPure.startsWith('data-1865901ce0.')) {
    return 'HOST-KEYWORD,data-1865901ce0';
  }
  if (textPure.startsWith('data-191b2429e8.')) {
    return 'HOST-KEYWORD,data-191b2429e8';
  }
  if (textPure.startsWith('data-1b32532ce1.')) {
    return 'HOST-KEYWORD,data-1b32532ce1';
  }
  if (textPure.startsWith('data-1c0a3d83e3.')) {
    return 'HOST-KEYWORD,data-1c0a3d83e3';
  }
  if (textPure.startsWith('data-1fbcf6d7f5.')) {
    return 'HOST-KEYWORD,data-1fbcf6d7f5';
  }
  if (textPure.startsWith('data-207a822be2.')) {
    return 'HOST-KEYWORD,data-207a822be2';
  }
  if (textPure.startsWith('data-2732fcab6f.')) {
    return 'HOST-KEYWORD,data-2732fcab6f';
  }
  if (textPure.startsWith('data-2bfd5a7f39.')) {
    return 'HOST-KEYWORD,data-2bfd5a7f39';
  }
  if (textPure.startsWith('data-2d86fd41e0.')) {
    return 'HOST-KEYWORD,data-2d86fd41e0';
  }
  if (textPure.startsWith('data-2f2ec12966.')) {
    return 'HOST-KEYWORD,data-2f2ec12966';
  }
  if (textPure.startsWith('data-367bcf5bd6.')) {
    return 'HOST-KEYWORD,data-367bcf5bd6';
  }
  if (textPure.startsWith('data-39822b659f.')) {
    return 'HOST-KEYWORD,data-39822b659f';
  }
  if (textPure.startsWith('data-3b1647c072.')) {
    return 'HOST-KEYWORD,data-3b1647c072';
  }
  if (textPure.startsWith('data-3d30b366ad.')) {
    return 'HOST-KEYWORD,data-3d30b366ad';
  }
  if (textPure.startsWith('data-40370dcf13.')) {
    return 'HOST-KEYWORD,data-40370dcf13';
  }
  if (textPure.startsWith('data-407c1ec0f8.')) {
    return 'HOST-KEYWORD,data-407c1ec0f8';
  }
  if (textPure.startsWith('data-44a005f23c.')) {
    return 'HOST-KEYWORD,data-44a005f23c';
  }
  if (textPure.startsWith('data-460b866870.')) {
    return 'HOST-KEYWORD,data-460b866870';
  }
  if (textPure.startsWith('data-47ee1b0882.')) {
    return 'HOST-KEYWORD,data-47ee1b0882';
  }
  if (textPure.startsWith('data-497ecca600.')) {
    return 'HOST-KEYWORD,data-497ecca600';
  }
  if (textPure.startsWith('data-4ede7e9c86.')) {
    return 'HOST-KEYWORD,data-4ede7e9c86';
  }
  if (textPure.startsWith('data-4f77096dc0.')) {
    return 'HOST-KEYWORD,data-4f77096dc0';
  }
  if (textPure.startsWith('data-512cafb4f7.')) {
    return 'HOST-KEYWORD,data-512cafb4f7';
  }
  if (textPure.startsWith('data-5492b7d422.')) {
    return 'HOST-KEYWORD,data-5492b7d422';
  }
  if (textPure.startsWith('data-5a078ffbef.')) {
    return 'HOST-KEYWORD,data-5a078ffbef';
  }
  if (textPure.startsWith('data-5d621ddc78.')) {
    return 'HOST-KEYWORD,data-5d621ddc78';
  }
  if (textPure.startsWith('data-60d896f23d.')) {
    return 'HOST-KEYWORD,data-60d896f23d';
  }
  if (textPure.startsWith('data-614d3891ff.')) {
    return 'HOST-KEYWORD,data-614d3891ff';
  }
  if (textPure.startsWith('data-62e93c650b.')) {
    return 'HOST-KEYWORD,data-62e93c650b';
  }
  if (textPure.startsWith('data-67f17c94f0.')) {
    return 'HOST-KEYWORD,data-67f17c94f0';
  }
  if (textPure.startsWith('data-6dde45f576.')) {
    return 'HOST-KEYWORD,data-6dde45f576';
  }
  if (textPure.startsWith('data-7023b17a38.')) {
    return 'HOST-KEYWORD,data-7023b17a38';
  }
  if (textPure.startsWith('data-707aff899d.')) {
    return 'HOST-KEYWORD,data-707aff899d';
  }
  if (textPure.startsWith('data-7462ea72ec.')) {
    return 'HOST-KEYWORD,data-7462ea72ec';
  }
  if (textPure.startsWith('data-79b61f918a.')) {
    return 'HOST-KEYWORD,data-79b61f918a';
  }
  if (textPure.startsWith('data-7f59e1721b.')) {
    return 'HOST-KEYWORD,data-7f59e1721b';
  }
  if (textPure.startsWith('data-83d91ea519.')) {
    return 'HOST-KEYWORD,data-83d91ea519';
  }
  if (textPure.startsWith('data-84a0f3455d.')) {
    return 'HOST-KEYWORD,data-84a0f3455d';
  }
  if (textPure.startsWith('data-8522662a32.')) {
    return 'HOST-KEYWORD,data-8522662a32';
  }
  if (textPure.startsWith('data-861bbf2127.')) {
    return 'HOST-KEYWORD,data-861bbf2127';
  }
  if (textPure.startsWith('data-8ec206415a.')) {
    return 'HOST-KEYWORD,data-8ec206415a';
  }
  if (textPure.startsWith('data-908fd409d9.')) {
    return 'HOST-KEYWORD,data-908fd409d9';
  }
  if (textPure.startsWith('data-90cb6242e4.')) {
    return 'HOST-KEYWORD,data-90cb6242e4';
  }
  if (textPure.startsWith('data-96d64cb150.')) {
    return 'HOST-KEYWORD,data-96d64cb150';
  }
  if (textPure.startsWith('data-9c9d7ad92f.')) {
    return 'HOST-KEYWORD,data-9c9d7ad92f';
  }
  if (textPure.startsWith('data-9d5ca866eb.')) {
    return 'HOST-KEYWORD,data-9d5ca866eb';
  }
  if (textPure.startsWith('data-a01a8a1ba4.')) {
    return 'HOST-KEYWORD,data-a01a8a1ba4';
  }
  if (textPure.startsWith('data-a4e945dbeb.')) {
    return 'HOST-KEYWORD,data-a4e945dbeb';
  }
  if (textPure.startsWith('data-a7deba18e8.')) {
    return 'HOST-KEYWORD,data-a7deba18e8';
  }
  if (textPure.startsWith('data-a98482617b.')) {
    return 'HOST-KEYWORD,data-a98482617b';
  }
  if (textPure.startsWith('data-aae7bdcec6.')) {
    return 'HOST-KEYWORD,data-aae7bdcec6';
  }
  if (textPure.startsWith('data-ae81bed93b.')) {
    return 'HOST-KEYWORD,data-ae81bed93b';
  }
  if (textPure.startsWith('data-b7d0b4217b.')) {
    return 'HOST-KEYWORD,data-b7d0b4217b';
  }
  if (textPure.startsWith('data-b80f3dd5d8.')) {
    return 'HOST-KEYWORD,data-b80f3dd5d8';
  }
  if (textPure.startsWith('data-b8587f1b76.')) {
    return 'HOST-KEYWORD,data-b8587f1b76';
  }
  if (textPure.startsWith('data-b8f9ef66dc.')) {
    return 'HOST-KEYWORD,data-b8f9ef66dc';
  }
  if (textPure.startsWith('data-bb21a2f11b.')) {
    return 'HOST-KEYWORD,data-bb21a2f11b';
  }
  if (textPure.startsWith('data-c0c484e9be.')) {
    return 'HOST-KEYWORD,data-c0c484e9be';
  }
  if (textPure.startsWith('data-c53e1346fa.')) {
    return 'HOST-KEYWORD,data-c53e1346fa';
  }
  if (textPure.startsWith('data-c5740f79ff.')) {
    return 'HOST-KEYWORD,data-c5740f79ff';
  }
  if (textPure.startsWith('data-c5925d7d99.')) {
    return 'HOST-KEYWORD,data-c5925d7d99';
  }
  if (textPure.startsWith('data-cd0b4bd19f.')) {
    return 'HOST-KEYWORD,data-cd0b4bd19f';
  }
  if (textPure.startsWith('data-cf8fd9b799.')) {
    return 'HOST-KEYWORD,data-cf8fd9b799';
  }
  if (textPure.startsWith('data-d4db30a18b.')) {
    return 'HOST-KEYWORD,data-d4db30a18b';
  }
  if (textPure.startsWith('data-d4ecb517ab.')) {
    return 'HOST-KEYWORD,data-d4ecb517ab';
  }
  if (textPure.startsWith('data-deb04a4388.')) {
    return 'HOST-KEYWORD,data-deb04a4388';
  }
  if (textPure.startsWith('data-e4997adf31.')) {
    return 'HOST-KEYWORD,data-e4997adf31';
  }
  if (textPure.startsWith('data-e9439b5f81.')) {
    return 'HOST-KEYWORD,data-e9439b5f81';
  }
  if (textPure.startsWith('data-ed1ee98a6c.')) {
    return 'HOST-KEYWORD,data-ed1ee98a6c';
  }
  if (textPure.startsWith('data-f1c47705fc.')) {
    return 'HOST-KEYWORD,data-f1c47705fc';
  }
  if (textPure.startsWith('data-f1e447fbcf.')) {
    return 'HOST-KEYWORD,data-f1e447fbcf';
  }
  if (textPure.startsWith('data-f59db3288b.')) {
    return 'HOST-KEYWORD,data-f59db3288b';
  }
  if (textPure.startsWith('data-f62d7c5cdb.')) {
    return 'HOST-KEYWORD,data-f62d7c5cdb';
  }
  if (textPure.startsWith('data-fa2d848059.')) {
    return 'HOST-KEYWORD,data-fa2d848059';
  }
  if (textPure.startsWith('data-fa59f9f6b5.')) {
    return 'HOST-KEYWORD,data-fa59f9f6b5';
  }
  if (textPure.startsWith('data-fb37a1e7c3.')) {
    return 'HOST-KEYWORD,data-fb37a1e7c3';
  }
  if (textPure.startsWith('data-fbb8842b89.')) {
    return 'HOST-KEYWORD,data-fbb8842b89';
  }
  if (textPure.startsWith('data-fc03a8828d.')) {
    return 'HOST-KEYWORD,data-fc03a8828d';
  }
  if (textPure.startsWith('data-fd53e9bda6.')) {
    return 'HOST-KEYWORD,data-fd53e9bda6';
  }
  if (textPure.startsWith('data-fdf4690b14.')) {
    return 'HOST-KEYWORD,data-fdf4690b14';
  }
  if (textPure.startsWith('data-fdbbf15b66.')) {
    return 'HOST-KEYWORD,data-fdbbf15b66';
  }
  if (textPure.startsWith('data-nl.')) {
    return 'HOST-KEYWORD,data-nl';
  }
  if (textPure.startsWith('data-ssl.stepstone.')) {
    return 'HOST-KEYWORD,data-ssl.stepstone';
  }
  if (textPure.startsWith('data.campaigns.')) {
    return 'HOST-KEYWORD,data.campaigns';
  }
  if (textPure.startsWith('data.comunicaciones.')) {
    return 'HOST-KEYWORD,data.comunicaciones';
  }
  if (textPure.startsWith('data.customermail.')) {
    return 'HOST-KEYWORD,data.customermail';
  }
  if (textPure.startsWith('data.decathlon.')) {
    return 'HOST-KEYWORD,data.decathlon';
  }
  if (textPure.startsWith('data.em.')) {
    return 'HOST-KEYWORD,data.em';
  }
  if (textPure.startsWith('data.fans.')) {
    return 'HOST-KEYWORD,data.fans';
  }
  if (textPure.startsWith('data.hinweis.')) {
    return 'HOST-KEYWORD,data.hinweis';
  }
  if (textPure.startsWith('data.iviskin.')) {
    return 'HOST-KEYWORD,data.iviskin';
  }
  if (textPure.startsWith('data.loyality.')) {
    return 'HOST-KEYWORD,data.loyality';
  }
  if (textPure.startsWith('data.mistat.')) {
    return 'HOST-KEYWORD,data.mistat';
  }
  if (textPure.startsWith('data.mktg.')) {
    return 'HOST-KEYWORD,data.mktg';
  }
  if (textPure.startsWith('data.stepstone.')) {
    return 'HOST-KEYWORD,data.stepstone';
  }
  if (textPure.startsWith('data.umfrage.')) {
    return 'HOST-KEYWORD,data.umfrage';
  }
  if (textPure.startsWith('data.vertrag.')) {
    return 'HOST-KEYWORD,data.vertrag';
  }
  if (textPure.startsWith('dc.stenaline.')) {
    return 'HOST-KEYWORD,dc.stenaline';
  }
  if (textPure.startsWith('dcs.esprit.')) {
    return 'HOST-KEYWORD,dcs.esprit';
  }
  if (textPure.startsWith('dhpjhrud.aktivvinter.')) {
    return 'HOST-KEYWORD,dhpjhrud.aktivvinter';
  }
  if (textPure.startsWith('dhpjhrud.aktivwinter.')) {
    return 'HOST-KEYWORD,dhpjhrud.aktivwinter';
  }
  if (textPure.startsWith('di.ifolor.')) {
    return 'HOST-KEYWORD,di.ifolor';
  }
  if (textPure.startsWith('dialogue.mazda.')) {
    return 'HOST-KEYWORD,dialogue.mazda';
  }
  if (textPure.startsWith('digital.adt.')) {
    return 'HOST-KEYWORD,digital.adt';
  }
  if (textPure.startsWith('dii1.bitiba.')) {
    return 'HOST-KEYWORD,dii1.bitiba';
  }
  if (textPure.startsWith('dii1.zooplus.')) {
    return 'HOST-KEYWORD,dii1.zooplus';
  }
  if (textPure.startsWith('dii2.bitiba.')) {
    return 'HOST-KEYWORD,dii2.bitiba';
  }
  if (textPure.startsWith('dii2.zoohit.')) {
    return 'HOST-KEYWORD,dii2.zoohit';
  }
  if (textPure.startsWith('dii2.zooplus.')) {
    return 'HOST-KEYWORD,dii2.zooplus';
  }
  if (textPure.startsWith('dii3.bitiba.')) {
    return 'HOST-KEYWORD,dii3.bitiba';
  }
  if (textPure.startsWith('dii3.zoohit.')) {
    return 'HOST-KEYWORD,dii3.zoohit';
  }
  if (textPure.startsWith('dii3.zooplus.')) {
    return 'HOST-KEYWORD,dii3.zooplus';
  }
  if (textPure.startsWith('dii4.bitiba.')) {
    return 'HOST-KEYWORD,dii4.bitiba';
  }
  if (textPure.startsWith('dii4.zoohit.')) {
    return 'HOST-KEYWORD,dii4.zoohit';
  }
  if (textPure.startsWith('dii4.zooplus.')) {
    return 'HOST-KEYWORD,dii4.zooplus';
  }
  if (textPure.startsWith('dl-test.')) {
    return 'HOST-KEYWORD,dl-test';
  }
  if (textPure.startsWith('e.gettyimages.')) {
    return 'HOST-KEYWORD,e.gettyimages';
  }
  if (textPure.startsWith('ea.greenweez.')) {
    return 'HOST-KEYWORD,ea.greenweez';
  }
  if (textPure.startsWith('ea.millet-mountain.')) {
    return 'HOST-KEYWORD,ea.millet-mountain';
  }
  if (textPure.startsWith('ea.vente-unique.')) {
    return 'HOST-KEYWORD,ea.vente-unique';
  }
  if (textPure.startsWith('ebis-tracking.')) {
    return 'HOST-KEYWORD,ebis-tracking';
  }
  if (textPure.startsWith('ed.emp.')) {
    return 'HOST-KEYWORD,ed.emp';
  }
  if (textPure.startsWith('ed.emp-shop.')) {
    return 'HOST-KEYWORD,ed.emp-shop';
  }
  if (textPure.startsWith('eloqua.pearsonvue.')) {
    return 'HOST-KEYWORD,eloqua.pearsonvue';
  }
  if (textPure.startsWith('elq.mouser.')) {
    return 'HOST-KEYWORD,elq.mouser';
  }
  if (textPure.startsWith('elq.scanningpens.')) {
    return 'HOST-KEYWORD,elq.scanningpens';
  }
  if (textPure.startsWith('elqtrk.intel.')) {
    return 'HOST-KEYWORD,elqtrk.intel';
  }
  if (textPure.startsWith('elqtrk.morningstar.')) {
    return 'HOST-KEYWORD,elqtrk.morningstar';
  }
  if (textPure.startsWith('email-am.jll.')) {
    return 'HOST-KEYWORD,email-am.jll';
  }
  if (textPure.startsWith('email-ap.jll.')) {
    return 'HOST-KEYWORD,email-ap.jll';
  }
  if (textPure.startsWith('email-cm.jll.')) {
    return 'HOST-KEYWORD,email-cm.jll';
  }
  if (textPure.startsWith('email-em.jll.')) {
    return 'HOST-KEYWORD,email-em.jll';
  }
  if (textPure.startsWith('email.everyonesocial.')) {
    return 'HOST-KEYWORD,email.everyonesocial';
  }
  if (textPure.startsWith('engage.3m.')) {
    return 'HOST-KEYWORD,engage.3m';
  }
  if (textPure.startsWith('etracker.louis-moto.')) {
    return 'HOST-KEYWORD,etracker.louis-moto';
  }
  if (textPure.startsWith('etracker.louis.')) {
    return 'HOST-KEYWORD,etracker.louis';
  }
  if (textPure.startsWith('et.electronic4you.')) {
    return 'HOST-KEYWORD,et.electronic4you';
  }
  if (textPure.startsWith('eulerian.tgv-europe.')) {
    return 'HOST-KEYWORD,eulerian.tgv-europe';
  }
  if (textPure.startsWith('events.just-eat.')) {
    return 'HOST-KEYWORD,events.just-eat';
  }
  if (textPure.startsWith('filter-eu.')) {
    return 'HOST-KEYWORD,filter-eu';
  }
  if (textPure.startsWith('fpa-cdn.')) {
    return 'HOST-KEYWORD,fpa-cdn';
  }
  if (textPure.startsWith('fpa-events.')) {
    return 'HOST-KEYWORD,fpa-events';
  }
  if (textPure.startsWith('gcwubi.happypancake.')) {
    return 'HOST-KEYWORD,gcwubi.happypancake';
  }
  if (textPure.startsWith('get-staging.')) {
    return 'HOST-KEYWORD,get-staging';
  }
  if (textPure.startsWith('get-test.')) {
    return 'HOST-KEYWORD,get-test';
  }
  if (textPure.startsWith('get.ukg.')) {
    return 'HOST-KEYWORD,get.ukg';
  }
  if (textPure.startsWith('gfdlnadm.georgjensen-damask.')) {
    return 'HOST-KEYWORD,gfdlnadm.georgjensen-damask';
  }
  if (textPure.startsWith('go-test.')) {
    return 'HOST-KEYWORD,go-test';
  }
  if (textPure.startsWith('go.hager.')) {
    return 'HOST-KEYWORD,go.hager';
  }
  if (textPure.startsWith('gss.skatepro.')) {
    return 'HOST-KEYWORD,gss.skatepro';
  }
  if (textPure.startsWith('gtm.bricoflor.')) {
    return 'HOST-KEYWORD,gtm.bricoflor';
  }
  if (textPure.startsWith('gtm.elithair.')) {
    return 'HOST-KEYWORD,gtm.elithair';
  }
  if (textPure.startsWith('gtm.neckermann-nordic.')) {
    return 'HOST-KEYWORD,gtm.neckermann-nordic';
  }
  if (textPure.startsWith('gtm.proff.')) {
    return 'HOST-KEYWORD,gtm.proff';
  }
  if (textPure.startsWith('gtm.villavilla.')) {
    return 'HOST-KEYWORD,gtm.villavilla';
  }
  if (textPure.startsWith('hinfogzi.sinful.')) {
    return 'HOST-KEYWORD,hinfogzi.sinful';
  }
  if (textPure.startsWith('hiuplq.flashscore.')) {
    return 'HOST-KEYWORD,hiuplq.flashscore';
  }
  if (textPure.startsWith('hm.baidu.com.')) {
    return 'HOST-KEYWORD,hm.baidu.com';
  }
  if (textPure.startsWith('images.campaign.')) {
    return 'HOST-KEYWORD,images.campaign';
  }
  if (textPure.startsWith('images.connect.')) {
    return 'HOST-KEYWORD,images.connect';
  }
  if (textPure.startsWith('images.demand.')) {
    return 'HOST-KEYWORD,images.demand';
  }
  if (textPure.startsWith('images.e.')) {
    return 'HOST-KEYWORD,images.e';
  }
  if (textPure.startsWith('images.engage.')) {
    return 'HOST-KEYWORD,images.engage';
  }
  if (textPure.startsWith('images.info.')) {
    return 'HOST-KEYWORD,images.info';
  }
  if (textPure.startsWith('images.learn.')) {
    return 'HOST-KEYWORD,images.learn';
  }
  if (textPure.startsWith('images.mailaway.')) {
    return 'HOST-KEYWORD,images.mailaway';
  }
  if (textPure.startsWith('images.marketing.')) {
    return 'HOST-KEYWORD,images.marketing';
  }
  if (textPure.startsWith('img.foodspring.')) {
    return 'HOST-KEYWORD,img.foodspring';
  }
  if (textPure.startsWith('info.lexisnexis.')) {
    return 'HOST-KEYWORD,info.lexisnexis';
  }
  if (textPure.startsWith('itkdlu.howrse.')) {
    return 'HOST-KEYWORD,itkdlu.howrse';
  }
  if (textPure.startsWith('itservices.ricoh.')) {
    return 'HOST-KEYWORD,itservices.ricoh';
  }
  if (textPure.startsWith('jdgtgb.')) {
    return 'HOST-KEYWORD,jdgtgb';
  }
  if (textPure.startsWith('k.brandalley.')) {
    return 'HOST-KEYWORD,k.brandalley';
  }
  if (textPure.startsWith('k.laredoute.')) {
    return 'HOST-KEYWORD,k.laredoute';
  }
  if (textPure.startsWith('k.voyageursdumonde.')) {
    return 'HOST-KEYWORD,k.voyageursdumonde';
  }
  if (textPure.startsWith('kitxllaf.mecindo.')) {
    return 'HOST-KEYWORD,kitxllaf.mecindo';
  }
  if (textPure.startsWith('kkznoe.autouncle.')) {
    return 'HOST-KEYWORD,kkznoe.autouncle';
  }
  if (textPure.startsWith('krcurxzl.soundboks.')) {
    return 'HOST-KEYWORD,krcurxzl.soundboks';
  }
  if (textPure.startsWith('link-test.')) {
    return 'HOST-KEYWORD,link-test';
  }
  if (textPure.startsWith('links-dev.')) {
    return 'HOST-KEYWORD,links-dev';
  }
  if (textPure.startsWith('links.commercialemails.')) {
    return 'HOST-KEYWORD,links.commercialemails';
  }
  if (textPure.startsWith('links.e.')) {
    return 'HOST-KEYWORD,links.e';
  }
  if (textPure.startsWith('links.info.')) {
    return 'HOST-KEYWORD,links.info';
  }
  if (textPure.startsWith('links.justfab.')) {
    return 'HOST-KEYWORD,links.justfab';
  }
  if (textPure.startsWith('live-eu.')) {
    return 'HOST-KEYWORD,live-eu';
  }
  if (textPure.startsWith('load.a.')) {
    return 'HOST-KEYWORD,load.a';
  }
  if (textPure.startsWith('load.analy.')) {
    return 'HOST-KEYWORD,load.analy';
  }
  if (textPure.startsWith('load.analytics.')) {
    return 'HOST-KEYWORD,load.analytics';
  }
  if (textPure.startsWith('load.bct1.')) {
    return 'HOST-KEYWORD,load.bct1';
  }
  if (textPure.startsWith('load.d.')) {
    return 'HOST-KEYWORD,load.d';
  }
  if (textPure.startsWith('load.dt.')) {
    return 'HOST-KEYWORD,load.dt';
  }
  if (textPure.startsWith('load.eua.trailerplus.')) {
    return 'HOST-KEYWORD,load.eua.trailerplus';
  }
  if (textPure.startsWith('load.f1.')) {
    return 'HOST-KEYWORD,load.f1';
  }
  if (textPure.startsWith('load.g.')) {
    return 'HOST-KEYWORD,load.g';
  }
  if (textPure.startsWith('load.gegevens.')) {
    return 'HOST-KEYWORD,load.gegevens';
  }
  if (textPure.startsWith('load.gspwicky.')) {
    return 'HOST-KEYWORD,load.gspwicky';
  }
  if (textPure.startsWith('load.gtm.')) {
    return 'HOST-KEYWORD,load.gtm';
  }
  if (textPure.startsWith('load.innovation.')) {
    return 'HOST-KEYWORD,load.innovation';
  }
  if (textPure.startsWith('load.krcurxzl.')) {
    return 'HOST-KEYWORD,load.krcurxzl';
  }
  if (textPure.startsWith('load.mtgs.')) {
    return 'HOST-KEYWORD,load.mtgs';
  }
  if (textPure.startsWith('load.s.')) {
    return 'HOST-KEYWORD,load.s';
  }
  if (textPure.startsWith('load.server.')) {
    return 'HOST-KEYWORD,load.server';
  }
  if (textPure.startsWith('load.serverside.')) {
    return 'HOST-KEYWORD,load.serverside';
  }
  if (textPure.startsWith('load.sgtm.')) {
    return 'HOST-KEYWORD,load.sgtm';
  }
  if (textPure.startsWith('load.side.')) {
    return 'HOST-KEYWORD,load.side';
  }
  if (textPure.startsWith('load.somos.')) {
    return 'HOST-KEYWORD,load.somos';
  }
  if (textPure.startsWith('load.ss.')) {
    return 'HOST-KEYWORD,load.ss';
  }
  if (textPure.startsWith('load.ssgtm.')) {
    return 'HOST-KEYWORD,load.ssgtm';
  }
  if (textPure.startsWith('load.sst.')) {
    return 'HOST-KEYWORD,load.sst';
  }
  if (textPure.startsWith('load.sstm.')) {
    return 'HOST-KEYWORD,load.sstm';
  }
  if (textPure.startsWith('load.stape.')) {
    return 'HOST-KEYWORD,load.stape';
  }
  if (textPure.startsWith('load.stsv.')) {
    return 'HOST-KEYWORD,load.stsv';
  }
  if (textPure.startsWith('load.swm.')) {
    return 'HOST-KEYWORD,load.swm';
  }
  if (textPure.startsWith('lpbhnv.')) {
    return 'HOST-KEYWORD,lpbhnv';
  }
  if (textPure.startsWith('ltsveh.wetteronline.')) {
    return 'HOST-KEYWORD,ltsveh.wetteronline';
  }
  if (textPure.startsWith('lu9xve2c97l898gjjxv4.')) {
    return 'HOST-KEYWORD,lu9xve2c97l898gjjxv4';
  }
  if (textPure.startsWith('mail.dolce-gusto.')) {
    return 'HOST-KEYWORD,mail.dolce-gusto';
  }
  if (textPure.startsWith('marketing.net.')) {
    return 'HOST-KEYWORD,marketing.net';
  }
  if (textPure.startsWith('mds.ricoh.')) {
    return 'HOST-KEYWORD,mds.ricoh';
  }
  if (textPure.startsWith('meta-events.')) {
    return 'HOST-KEYWORD,meta-events';
  }
  if (textPure.startsWith('metric.nissan.')) {
    return 'HOST-KEYWORD,metric.nissan';
  }
  if (textPure.startsWith('metric.volkswagen.')) {
    return 'HOST-KEYWORD,metric.volkswagen';
  }
  if (textPure.startsWith('metrics.americanairlines.')) {
    return 'HOST-KEYWORD,metrics.americanairlines';
  }
  if (textPure.startsWith('metrics.bbva.')) {
    return 'HOST-KEYWORD,metrics.bbva';
  }
  if (textPure.startsWith('metrics.citibank.')) {
    return 'HOST-KEYWORD,metrics.citibank';
  }
  if (textPure.startsWith('metrics.egencia.')) {
    return 'HOST-KEYWORD,metrics.egencia';
  }
  if (textPure.startsWith('metrics.ionos.')) {
    return 'HOST-KEYWORD,metrics.ionos';
  }
  if (textPure.startsWith('metrics.lululemon.')) {
    return 'HOST-KEYWORD,metrics.lululemon';
  }
  if (textPure.startsWith('metrics.nissan.')) {
    return 'HOST-KEYWORD,metrics.nissan';
  }
  if (textPure.startsWith('metrics.timberland.')) {
    return 'HOST-KEYWORD,metrics.timberland';
  }
  if (textPure.startsWith('metrics.vodafone.')) {
    return 'HOST-KEYWORD,metrics.vodafone';
  }
  if (textPure.startsWith('metrics.vwfs.')) {
    return 'HOST-KEYWORD,metrics.vwfs';
  }
  if (textPure.startsWith('mi.miliboo.')) {
    return 'HOST-KEYWORD,mi.miliboo';
  }
  if (textPure.startsWith('my.11teamsports.')) {
    return 'HOST-KEYWORD,my.11teamsports';
  }
  if (textPure.startsWith('my.top4fitness.')) {
    return 'HOST-KEYWORD,my.top4fitness';
  }
  if (textPure.startsWith('my.top4football.')) {
    return 'HOST-KEYWORD,my.top4football';
  }
  if (textPure.startsWith('my.top4running.')) {
    return 'HOST-KEYWORD,my.top4running';
  }
  if (textPure.startsWith('my.weplaybasketball.')) {
    return 'HOST-KEYWORD,my.weplaybasketball';
  }
  if (textPure.startsWith('my.weplayhandball.')) {
    return 'HOST-KEYWORD,my.weplayhandball';
  }
  if (textPure.startsWith('my.weplayvolleyball.')) {
    return 'HOST-KEYWORD,my.weplayvolleyball';
  }
  if (textPure.startsWith('net.jumia.')) {
    return 'HOST-KEYWORD,net.jumia';
  }
  if (textPure.startsWith('omt.dm.')) {
    return 'HOST-KEYWORD,omt.dm';
  }
  if (textPure.startsWith('onlineshop.ricoh.')) {
    return 'HOST-KEYWORD,onlineshop.ricoh';
  }
  if (textPure.startsWith('origin.www.')) {
    return 'HOST-KEYWORD,origin.www';
  }
  if (textPure.startsWith('ot.obi.')) {
    return 'HOST-KEYWORD,ot.obi';
  }
  if (textPure.startsWith('otr.kaspersky.')) {
    return 'HOST-KEYWORD,otr.kaspersky';
  }
  if (textPure.startsWith('pages.comunicaciones.')) {
    return 'HOST-KEYWORD,pages.comunicaciones';
  }
  if (textPure.startsWith('pbox.photobox.')) {
    return 'HOST-KEYWORD,pbox.photobox';
  }
  if (textPure.startsWith('rechenschieber.transfermarkt.')) {
    return 'HOST-KEYWORD,rechenschieber.transfermarkt';
  }
  if (textPure.startsWith('rtb-apac-v4.')) {
    return 'HOST-KEYWORD,rtb-apac-v4';
  }
  if (textPure.startsWith('rtb-apac.')) {
    return 'HOST-KEYWORD,rtb-apac';
  }
  if (textPure.startsWith('rtb-eu.')) {
    return 'HOST-KEYWORD,rtb-eu';
  }
  if (textPure.startsWith('rtb-eu-v4.')) {
    return 'HOST-KEYWORD,rtb-eu-v4';
  }
  if (textPure.startsWith('rtb-useast-v4.')) {
    return 'HOST-KEYWORD,rtb-useast-v4';
  }
  if (textPure.startsWith('rtb-useast.')) {
    return 'HOST-KEYWORD,rtb-useast';
  }
  if (textPure.startsWith('rtb-uswest.')) {
    return 'HOST-KEYWORD,rtb-uswest';
  }
  if (textPure.startsWith('rtb-uswest-v4.')) {
    return 'HOST-KEYWORD,rtb-uswest-v4';
  }
  if (textPure.startsWith('rtb2-useast.')) {
    return 'HOST-KEYWORD,rtb2-useast';
  }
  if (textPure.startsWith('rtk.trk.')) {
    return 'HOST-KEYWORD,rtk.trk';
  }
  if (textPure.startsWith('sa.adidas.')) {
    return 'HOST-KEYWORD,sa.adidas';
  }
  if (textPure.startsWith('saa.dyson.')) {
    return 'HOST-KEYWORD,saa.dyson';
  }
  if (textPure.startsWith('sanalytics.boomerangtv.')) {
    return 'HOST-KEYWORD,sanalytics.boomerangtv';
  }
  if (textPure.startsWith('sanalytics.cartoonito.')) {
    return 'HOST-KEYWORD,sanalytics.cartoonito';
  }
  if (textPure.startsWith('sanalytics.cartoonnetwork.')) {
    return 'HOST-KEYWORD,sanalytics.cartoonnetwork';
  }
  if (textPure.startsWith('sanl.footlocker.')) {
    return 'HOST-KEYWORD,sanl.footlocker';
  }
  if (textPure.startsWith('scookies-adobe.')) {
    return 'HOST-KEYWORD,scookies-adobe';
  }
  if (textPure.startsWith('secureanalytics.avis.')) {
    return 'HOST-KEYWORD,secureanalytics.avis';
  }
  if (textPure.startsWith('secureanalytics.budget.')) {
    return 'HOST-KEYWORD,secureanalytics.budget';
  }
  if (textPure.startsWith('securecookies.dustin.')) {
    return 'HOST-KEYWORD,securecookies.dustin';
  }
  if (textPure.startsWith('securecookies.dustinhome.')) {
    return 'HOST-KEYWORD,securecookies.dustinhome';
  }
  if (textPure.startsWith('securecookiesdustininfo.dustin.')) {
    return 'HOST-KEYWORD,securecookiesdustininfo.dustin';
  }
  if (textPure.startsWith('securecookiesdustininfo.dustinhome.')) {
    return 'HOST-KEYWORD,securecookiesdustininfo.dustinhome';
  }
  if (textPure.startsWith('securetags.esri.')) {
    return 'HOST-KEYWORD,securetags.esri';
  }
  if (textPure.startsWith('smetrics.alfalaval.')) {
    return 'HOST-KEYWORD,smetrics.alfalaval';
  }
  if (textPure.startsWith('smetrics.bayer.')) {
    return 'HOST-KEYWORD,smetrics.bayer';
  }
  if (textPure.startsWith('smetrics.bbva.')) {
    return 'HOST-KEYWORD,smetrics.bbva';
  }
  if (textPure.startsWith('smetrics.casino.')) {
    return 'HOST-KEYWORD,smetrics.casino';
  }
  if (textPure.startsWith('smetrics.boehringer-ingelheim.')) {
    return 'HOST-KEYWORD,smetrics.boehringer-ingelheim';
  }
  if (textPure.startsWith('smetrics.kone.')) {
    return 'HOST-KEYWORD,smetrics.kone';
  }
  if (textPure.startsWith('smetrics.marketing.')) {
    return 'HOST-KEYWORD,smetrics.marketing';
  }
  if (textPure.startsWith('smetrics.msccruises.')) {
    return 'HOST-KEYWORD,smetrics.msccruises';
  }
  if (textPure.startsWith('smetrics.pwc.')) {
    return 'HOST-KEYWORD,smetrics.pwc';
  }
  if (textPure.startsWith('smetrics.schindler.')) {
    return 'HOST-KEYWORD,smetrics.schindler';
  }
  if (textPure.startsWith('smetrics.sony.')) {
    return 'HOST-KEYWORD,smetrics.sony';
  }
  if (textPure.startsWith('smetrics.viega.')) {
    return 'HOST-KEYWORD,smetrics.viega';
  }
  if (textPure.startsWith('ss.coloreurope.')) {
    return 'HOST-KEYWORD,ss.coloreurope';
  }
  if (textPure.startsWith('ss.thecozysheep.')) {
    return 'HOST-KEYWORD,ss.thecozysheep';
  }
  if (textPure.startsWith('ssa.eurosport.')) {
    return 'HOST-KEYWORD,ssa.eurosport';
  }
  if (textPure.startsWith('ssa.tameson.')) {
    return 'HOST-KEYWORD,ssa.tameson';
  }
  if (textPure.startsWith('ssc.nick.')) {
    return 'HOST-KEYWORD,ssc.nick';
  }
  if (textPure.startsWith('ssc.nickelodeon.')) {
    return 'HOST-KEYWORD,ssc.nickelodeon';
  }
  if (textPure.startsWith('ssl.o.')) {
    return 'HOST-KEYWORD,ssl.o';
  }
  if (textPure.startsWith('sst.notbranded.')) {
    return 'HOST-KEYWORD,sst.notbranded';
  }
  if (textPure.startsWith('sst.onedirect.')) {
    return 'HOST-KEYWORD,sst.onedirect';
  }
  if (textPure.startsWith('sstats.fishersci.')) {
    return 'HOST-KEYWORD,sstats.fishersci';
  }
  if (textPure.startsWith('sstats.seat.')) {
    return 'HOST-KEYWORD,sstats.seat';
  }
  if (textPure.startsWith('sstats.tiffany.')) {
    return 'HOST-KEYWORD,sstats.tiffany';
  }
  if (textPure.startsWith('starget.intel.')) {
    return 'HOST-KEYWORD,starget.intel';
  }
  if (textPure.startsWith('stats.tena.')) {
    return 'HOST-KEYWORD,stats.tena';
  }
  if (textPure.startsWith('stats.tork.')) {
    return 'HOST-KEYWORD,stats.tork';
  }
  if (textPure.startsWith('stbg.stanbicbank.')) {
    return 'HOST-KEYWORD,stbg.stanbicbank';
  }
  if (textPure.startsWith('stbg.standardbank.')) {
    return 'HOST-KEYWORD,stbg.standardbank';
  }
  if (textPure.startsWith('strack.concur.')) {
    return 'HOST-KEYWORD,strack.concur';
  }
  if (textPure.startsWith('sw88.24kitchen.')) {
    return 'HOST-KEYWORD,sw88.24kitchen';
  }
  if (textPure.startsWith('sw88.disney.')) {
    return 'HOST-KEYWORD,sw88.disney';
  }
  if (textPure.startsWith('swasc.kaufland.')) {
    return 'HOST-KEYWORD,swasc.kaufland';
  }
  if (textPure.startsWith('t-s.')) {
    return 'HOST-KEYWORD,t-s';
  }
  if (textPure.startsWith('t.antalis.')) {
    return 'HOST-KEYWORD,t.antalis';
  }
  if (textPure.startsWith('t.dilling.')) {
    return 'HOST-KEYWORD,t.dilling';
  }
  if (textPure.startsWith('t.locasun.')) {
    return 'HOST-KEYWORD,t.locasun';
  }
  if (textPure.startsWith('tags.calvinklein.')) {
    return 'HOST-KEYWORD,tags.calvinklein';
  }
  if (textPure.startsWith('tracking.janssenmedicalcloud.')) {
    return 'HOST-KEYWORD,tracking.janssenmedicalcloud';
  }
  if (textPure.startsWith('tracking.ssab.')) {
    return 'HOST-KEYWORD,tracking.ssab';
  }
  if (textPure.startsWith('tracking.stihl.')) {
    return 'HOST-KEYWORD,tracking.stihl';
  }
  if (textPure.startsWith('target.footlocker.')) {
    return 'HOST-KEYWORD,target.footlocker';
  }
  if (textPure.startsWith('target.pwc.')) {
    return 'HOST-KEYWORD,target.pwc';
  }
  if (textPure.startsWith('target.sunlife.')) {
    return 'HOST-KEYWORD,target.sunlife';
  }
  if (textPure.startsWith('target.vwfs.')) {
    return 'HOST-KEYWORD,target.vwfs';
  }
  if (textPure.startsWith('tccd.douglas.')) {
    return 'HOST-KEYWORD,tccd.douglas';
  }
  if (textPure.startsWith('tealm-c.')) {
    return 'HOST-KEYWORD,tealm-c';
  }
  if (textPure.startsWith('tidy.intel.')) {
    return 'HOST-KEYWORD,tidy.intel';
  }
  if (textPure.startsWith('tk.airfrance.')) {
    return 'HOST-KEYWORD,tk.airfrance';
  }
  if (textPure.startsWith('tk.santevet.')) {
    return 'HOST-KEYWORD,tk.santevet';
  }
  if (textPure.startsWith('tk.tikamoon.')) {
    return 'HOST-KEYWORD,tk.tikamoon';
  }
  if (textPure.startsWith('tq-eu.')) {
    return 'HOST-KEYWORD,tq-eu';
  }
  if (textPure.startsWith('tr.btobquotes.')) {
    return 'HOST-KEYWORD,tr.btobquotes';
  }
  if (textPure.startsWith('tr.clients.')) {
    return 'HOST-KEYWORD,tr.clients';
  }
  if (textPure.startsWith('tr.communication.')) {
    return 'HOST-KEYWORD,tr.communication';
  }
  if (textPure.startsWith('tr.emailing.')) {
    return 'HOST-KEYWORD,tr.emailing';
  }
  if (textPure.startsWith('tr.gestion.')) {
    return 'HOST-KEYWORD,tr.gestion';
  }
  if (textPure.startsWith('tr.information.')) {
    return 'HOST-KEYWORD,tr.information';
  }
  if (textPure.startsWith('tr.info.')) {
    return 'HOST-KEYWORD,tr.info';
  }
  if (textPure.startsWith('tr.infos.')) {
    return 'HOST-KEYWORD,tr.infos';
  }
  if (textPure.startsWith('tr.notification-gdpr.')) {
    return 'HOST-KEYWORD,tr.notification-gdpr';
  }
  if (textPure.startsWith('tr.notification.')) {
    return 'HOST-KEYWORD,tr.notification';
  }
  if (textPure.startsWith('tr.serviceclient.')) {
    return 'HOST-KEYWORD,tr.serviceclient';
  }
  if (textPure.startsWith('trail.thomsonreuters.')) {
    return 'HOST-KEYWORD,trail.thomsonreuters';
  }
  if (textPure.startsWith('trck.info.')) {
    return 'HOST-KEYWORD,trck.info';
  }
  if (textPure.startsWith('trkcmb.business.')) {
    return 'HOST-KEYWORD,trkcmb.business';
  }
  if (textPure.startsWith('trkgbm.business.')) {
    return 'HOST-KEYWORD,trkgbm.business';
  }
  if (textPure.startsWith('trkhinv.business.')) {
    return 'HOST-KEYWORD,trkhinv.business';
  }
  if (textPure.startsWith('trksvg.business.')) {
    return 'HOST-KEYWORD,trksvg.business';
  }
  if (textPure.startsWith('tttd.douglas.')) {
    return 'HOST-KEYWORD,tttd.douglas';
  }
  if (textPure.startsWith('tttd.parfumdreams.')) {
    return 'HOST-KEYWORD,tttd.parfumdreams';
  }
  if (textPure.startsWith('twjobq.sixt.')) {
    return 'HOST-KEYWORD,twjobq.sixt';
  }
  if (textPure.startsWith('uat1-dc.')) {
    return 'HOST-KEYWORD,uat1-dc';
  }
  if (textPure.startsWith('ugdcxl.timeout.')) {
    return 'HOST-KEYWORD,ugdcxl.timeout';
  }
  if (textPure.startsWith('wct.softonic.')) {
    return 'HOST-KEYWORD,wct.softonic';
  }
  if (textPure.startsWith('web.care.')) {
    return 'HOST-KEYWORD,web.care';
  }
  if (textPure.startsWith('web.e.')) {
    return 'HOST-KEYWORD,web.e';
  }
  if (textPure.startsWith('web.mapp.')) {
    return 'HOST-KEYWORD,web.mapp';
  }
  if (textPure.startsWith('web.tummytox.')) {
    return 'HOST-KEYWORD,web.tummytox';
  }
  if (textPure.startsWith('web.slimjoy.')) {
    return 'HOST-KEYWORD,web.slimjoy';
  }
  if (textPure.startsWith('web.sensilab.')) {
    return 'HOST-KEYWORD,web.sensilab';
  }
  if (textPure.startsWith('win-rtb2-useast.')) {
    return 'HOST-KEYWORD,win-rtb2-useast';
  }
  if (textPure.startsWith('www91.intel.')) {
    return 'HOST-KEYWORD,www91.intel';
  }
  if (textPure.startsWith('x-eu.')) {
    return 'HOST-KEYWORD,x-eu';
  }
  if (textPure.startsWith('xml-eu-v4.')) {
    return 'HOST-KEYWORD,xml-eu-v4';
  }
  if (textPure.startsWith('xml-eu.')) {
    return 'HOST-KEYWORD,xml-eu';
  }
  if (textPure.startsWith('xml-v4.')) {
    return 'HOST-KEYWORD,xml-v4';
  }
  // Quantumult X 似乎不支持 DOMAIN-SET/RULE-SET/PROCESS-NAME/URL-REGEX
  const captialTextTemp = textTemp.toUpperCase();
  if (textTemp.startsWith('.')) {
    return `HOST-SUFFIX,${textTemp.substring(1)}`;
  } else if (textTemp.startsWith('+.')) {
    return `HOST-SUFFIX,${textTemp.substring(2)}`;
  } else if (captialTextTemp.startsWith('USER-AGENT,')) {
    return `USER-AGENT,${textPure}`;
  } else if (textPure.includes('*')) {
    // 必须放在 USER-AGENT 之后，其他规则判断之前
    return `HOST-WILDCARD,${textPure}`;
  } else if (
    captialTextTemp.startsWith('HOST,') ||
    captialTextTemp.startsWith('DOMAIN,')
  ) {
    // REJECT 时会导致相关网站异常
    if (MIXTUREWHITELIST[textPure]) {
      return '';
    }
    return `HOST,${textPure}`;
  } else if (
    captialTextTemp.startsWith('HOST-SUFFIX,') ||
    captialTextTemp.startsWith('DOMAIN-SUFFIX,')
  ) {
    // REJECT 时会导致相关网站异常
    if (MIXTUREWHITELIST[textPure]) {
      return '';
    }
    return `HOST-SUFFIX,${textPure}`;
  } else if (
    captialTextTemp.startsWith('HOST-KEYWORD,') ||
    captialTextTemp.startsWith('DOMAIN-KEYWORD,')
  ) {
    // REJECT 时会导致相关网站异常
    if (MIXTUREWHITELIST[textPure]) {
      return '';
    }
    return `HOST-KEYWORD,${textPure}`;
  } else if (
    captialTextTemp.startsWith('HOST-WILDCARD,') ||
    captialTextTemp.startsWith('DOMAIN-WILDCARD,')
  ) {
    return `HOST-WILDCARD,${textPure}`;
  } else if (captialTextTemp.startsWith('IP-ASN,')) {
    return `IP-ASN,${textPure}`;
  } else if (captialTextTemp.startsWith('IP-CIDR,')) {
    return `IP-CIDR,${textPure}`;
  } else if (
    captialTextTemp.startsWith('IP-CIDR6,') ||
    captialTextTemp.startsWith('IP6-CIDR,')
  ) {
    return `IP6-CIDR,${textPure}`;
  } else if (captialTextTemp.startsWith('PROCESS-NAME,')) {
    return `PROCESS-NAME,${textPure}`;
  } else if (/^(\d|\.)+(\/){1}(\d){1,2}/gim.test(textTemp)) {
    const [pureIP] = /^(\d|\.)+(\/){1}(\d){1,2}/gim.exec(textTemp);
    // 霍尔一级
    if (MIXTUREWHITELIST[pureIP]) {
      return '';
    }
    return `IP-CIDR,${pureIP}`;
  } else if (/\S*:+\S*\/{1}/gim.test(textTemp)) {
    /**
     * IPv6 + Mask 正则，性能比较差
     * ^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^::([\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){2}:([\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^:((:[\da-fA-F]{1,4}){1,6}|:)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){6}:(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$
     */
    if (MIXTUREWHITELIST[textTemp]) {
      return '';
    }
    return `IP6-CIDR,${textTemp}`;
  } else {
    return '';
  }
}
