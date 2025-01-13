import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
let MIXTUREWHITELIST = {
  '10.0.0.0/8': '10.0.0.0/8', // 软件内置规则
  '127.0.0.0/8': '127.0.0.0/8', // 软件内置规则
  '172.16.0.0/12': '172.16.0.0/12', // 软件内置规则
  '192.0.0.0/16': '192.0.0.0/16', // 软件内置规则
  '224.0.0.0/24': '224.0.0.0/24', // 软件内置规则
  'byteimg.com': 'byteimg.com', // 字节静态资源
  'click.discord.com': 'click.discord.com', // Discord 验证码
  'parallels.cn': 'parallels.cn', // Parallels 官网
  'parallels.com': 'parallels.com', // Parallels 官网
  's.weibo.com': 's.weibo.com', // 微博静态资源
  'static-s.iqiyi.com': 'static-s.iqiyi.com', // 爱奇艺静态资源
  'staticsns.cdn.bcebos.com': 'staticsns.cdn.bcebos.com', // 百度静态资源
  'umami.is': 'umami.is', // Umani 官网
  volc: 'volc' // 火山引擎
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
let RESOURCES = {
  REJECTMIXTURE: {
    FILENAME: 'element.ref.reject.mixture.ini',
    SRC: [
      'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyPrivacy.list',
      'https://raw.githubusercontent.com/Cats-Team/AdRules/main/qx.conf',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.reject.custom.ini',
      'https://raw.githubusercontent.com/firehol/blocklist-ipsets/master/firehol_level1.netset',
      'https://raw.githubusercontent.com/fmz200/wool_scripts/main/QuantumultX/filter/fenliu.list',
      'https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Filter/AdBlock.list',
      'https://raw.githubusercontent.com/GMOogway/shadowrocket-rules/master/sr_reject_list.module',
      'https://raw.githubusercontent.com/Johnshall/Shadowrocket-ADBlock-Rules-Forever/release/sr_ad_only.conf',
      'https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/QuantumultX/rule/Adblock4limbo.list',
      'https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/QuantumultX/rule/BanAD.list',
      'https://raw.githubusercontent.com/privacy-protection-tools/anti-AD/master/anti-ad-surge.txt',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/ip/reject.conf',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/non_ip/my_reject.conf',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/non_ip/reject.conf',
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
            const { length: dotAmount } = [...temp.matchAll(/\./gim)];
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
function mapMixture(text = '') {
  const textTemp = text.replace(/ /gim, '');
  const textPure = (textTemp.split(',')[1] || '')
    .replace(/^\.|\.$/gim, '')
    .replace(/\/\/.*/gim, '')
    .trim();
  // 删除注释
  if (
    textTemp.includes('acl4.ssr') ||
    textTemp.includes('skk.moe') ||
    textTemp.includes('sukkaw') ||
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
  // 随机域名
  if (textPure.endsWith('.14f9a8b353.com')) {
    return 'HOST-SUFFIX,14f9a8b353.com';
  }
  if (textPure.endsWith('.34gwl8v1a.com')) {
    return 'HOST-SUFFIX,34gwl8v1a.com';
  }
  if (textPure.endsWith('.4puuqeh41.com')) {
    return 'HOST-SUFFIX,4puuqeh41.com';
  }
  if (textPure.endsWith('.5clo0xmbf.com')) {
    return 'HOST-SUFFIX,5clo0xmbf.com';
  }
  if (textPure.endsWith('.79j68qav2.com')) {
    return 'HOST-SUFFIX,79j68qav2.com';
  }
  if (textPure.endsWith('.81bc9fc749.com')) {
    return 'HOST-SUFFIX,81bc9fc749.com';
  }
  if (textPure.endsWith('.833enmhob.com')) {
    return 'HOST-SUFFIX,833enmhob.com';
  }
  if (textPure.endsWith('.935ft4j96.com')) {
    return 'HOST-SUFFIX,935ft4j96.com';
  }
  if (textPure.endsWith('.9bdf800214.com')) {
    return 'HOST-SUFFIX,9bdf800214.com';
  }
  if (textPure.endsWith('.c0636e54f1.com')) {
    return 'HOST-SUFFIX,c0636e54f1.com';
  }
  if (textPure.endsWith('.f19893fb1c.com')) {
    return 'HOST-SUFFIX,f19893fb1c.com';
  }
  if (textPure.endsWith('.f2f4b08b25.com')) {
    return 'HOST-SUFFIX,f2f4b08b25.com';
  }
  if (textPure.endsWith('.f89532811f.com')) {
    return 'HOST-SUFFIX,f89532811f.com';
  }
  if (textPure.endsWith('.k3718qw08.com')) {
    return 'HOST-SUFFIX,k3718qw08.com';
  }
  if (textPure.endsWith('.l5eamr17d.com')) {
    return 'HOST-SUFFIX,l5eamr17d.com';
  }
  if (textPure.endsWith('.ogrt80r65.com')) {
    return 'HOST-SUFFIX,ogrt80r65.com';
  }
  if (textPure.endsWith('.url25fatm.com')) {
    return 'HOST-SUFFIX,url25fatm.com';
  }
  // 正经域名
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
  if (textPure.endsWith('.ahacdn.me')) {
    return 'HOST-SUFFIX,ahacdn.me';
  }
  if (textPure.endsWith('.almosafer.com')) {
    return 'HOST-SUFFIX,almosafer.com';
  }
  if (textPure.endsWith('.apps.iocnt.de')) {
    return 'HOST-SUFFIX,apps.iocnt.de';
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
  if (textPure.endsWith('.downloadlink.icu')) {
    return 'HOST-SUFFIX,downloadlink.icu';
  }
  if (textPure.endsWith('.e.kuaishou.com')) {
    return 'HOST-SUFFIX,e.kuaishou.com';
  }
  if (textPure.endsWith('.fdj.fr')) {
    return 'HOST-SUFFIX,fdj.fr';
  }
  if (textPure.endsWith('.focalink.com')) {
    return 'HOST-SUFFIX,focalink.com';
  }
  if (textPure.endsWith('.getui.com')) {
    return 'HOST-SUFFIX,getui.com';
  }
  if (textPure.endsWith('.hello.spriggy.com.au')) {
    return 'HOST-SUFFIX,hello.spriggy.com.au';
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
  if (textPure.endsWith('.imrworldwide.com')) {
    return 'HOST-SUFFIX,imrworldwide.com';
  }
  if (textPure.endsWith('.innovatedating.com')) {
    return 'HOST-SUFFIX,innovatedating.com';
  }
  if (textPure.endsWith('.ipfs.dweb.link')) {
    return 'HOST-SUFFIX,ipfs.dweb.link';
  }
  if (textPure.endsWith('.ipfs.flk-ipfs.xyz')) {
    return 'HOST-SUFFIX,ipfs.flk-ipfs.xyz';
  }
  if (textPure.endsWith('.linodeusercontent.com')) {
    return 'HOST-SUFFIX,linodeusercontent.com';
  }
  if (textPure.endsWith('.msecnd.net')) {
    return 'HOST-SUFFIX,msecnd.net';
  }
  if (textPure.endsWith('.musical.ly')) {
    return 'HOST-SUFFIX,musical.ly';
  }
  if (textPure.endsWith('.nespresso.com')) {
    return 'HOST-SUFFIX,nespresso.com';
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
  if (textPure.endsWith('.ott.cibntv.com')) {
    return 'HOST-SUFFIX,ott.cibntv.net';
  }
  if (textPure.endsWith('.pandasuite.com')) {
    return 'HOST-SUFFIX,pandasuite.com';
  }
  if (textPure.endsWith('.p2l.info')) {
    return 'HOST-SUFFIX,p2l.info';
  }
  if (textPure.endsWith('.pstatp.com')) {
    return 'HOST-SUFFIX,pstatp.com';
  }
  if (textPure.endsWith('.r2.dev')) {
    return 'HOST-SUFFIX,r2.dev';
  }
  if (textPure.endsWith('.rsc.cdn77.org')) {
    return 'HOST-SUFFIX,rsc.cdn77.org';
  }
  if (textPure.endsWith('.sanvello.com')) {
    return 'HOST-SUFFIX,sanvello.com';
  }
  if (textPure.endsWith('.sextracker.be')) {
    return 'HOST-SUFFIX,sextracker.be';
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
  if (textPure.endsWith('.viglink.com')) {
    return 'HOST-SUFFIX,viglink.com';
  }
  if (textPure.endsWith('.yinzcam.com')) {
    return 'HOST-SUFFIX,yinzcam.com';
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
function combineResourses({ FILENAME, RAW }) {
  const temp = Object.create(null);
  Object.keys(RAW).forEach(key => {
    console.log(
      `    ${key}`.padEnd(96),
      RAW[key].length.toString().padStart(12)
    );
    RAW[key].forEach(rule => {
      if (rule.includes(',')) {
        // 工具规则
        const [, domainORip] = rule.split(',');
        const { length: dotAmount } = [...domainORip.matchAll(/\./gim)];
        const lastLevelDomain = domainORip.split('.').splice(1).join('.');
        if (FILENAME === 'element.ref.reject.mixture.ini') {
          if (!globalThis?.[`${FILENAME}${dotAmount - 1}`]?.[lastLevelDomain]) {
            temp[rule] = rule;
          }
        } else {
          if (
            !globalThis?.[`${FILENAME}${dotAmount - 1}`]?.[lastLevelDomain] &&
            !globalThis?.[`element.ref.reject.mixture.ini${dotAmount - 1}`]?.[
              lastLevelDomain
            ] &&
            !globalThis?.[`element.ref.reject.mixture.ini${dotAmount}`]?.[
              domainORip
            ]
          ) {
            temp[rule] = rule;
          }
        }
      } else {
        // HOST 规则
        temp[rule] = rule;
      }
    });
  });
  const RES = Object.keys(temp).sort();
  console.log(`    ${FILENAME}`.padEnd(96), RES.length.toString().padStart(12));
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
  } catch ({ message }) {
    console.error(message);
    throw new Error(message);
  }
}
