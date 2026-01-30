import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const MIXTUREBLOCKLIST = {
  '.0.0.cn': '0.0.cn',
  '.000nethost.com': '000nethost.com',
  '.0937jyg.com': '0937jyg.com',
  '.102.112.2o7.net': '102.112.2o7.net',
  '.102.122.207.net': '102.122.207.net',
  '.51y5.net': '51y5.net',
  '.52896368.com': '52896368.com',
  '.5clo0xmbf.com': '5clo0xmbf.com',
  '.79j68qav2.com': '79j68qav2.com',
  '.8pv9vvi9b.com': '8pv9vvi9b.com',
  '.actonservice.com': 'actonservice.com',
  '.ad.xiaomi.com': 'ad.xiaomi.com',
  '.agoracalyce.net': 'agoracalyce.net',
  '.agvisorpro.com': 'agvisorpro.com',
  '.ahacdn.me': 'ahacdn.me',
  '.almosafer.com': 'almosafer.com',
  '.aomg5bzv7.com': 'aomg5bzv7.com',
  '.apps.iocnt.de': 'apps.iocnt.de',
  '.atianqi.com': 'atianqi.com',
  '.bravenet.com': 'bravenet.com',
  '.carte-gr.total.fr': 'carte-gr.total.fr',
  '.cjmadobe.com': 'cjmadobe.com',
  '.cosmicnewspulse.com': 'cosmicnewspulse.com',
  '.demoamericas275.adobe.com': 'demoamericas275.adobe.com',
  '.doubleclick.net': 'doubleclick.net',
  '.downloadlink.icu': 'downloadlink.icu',
  '.duckdns.org': 'duckdns.org',
  '.e.kuaishou.com': 'e.kuaishou.com',
  '.elemis.com': 'elemis.com',
  '.eloquademos.com': 'eloquademos.com',
  '.espmp-agfr.net': 'espmp-agfr.net',
  '.espmp-aufr.net': 'espmp-aufr.net',
  '.espmp-cufr.net': 'espmp-cufr.net',
  '.espmp-nifr.net': 'espmp-nifr.net',
  '.espmp-pofr.net': 'espmp-pofr.net',
  '.fdj.fr': 'fdj.fr',
  '.flourishpath.online': 'flourishpath.online',
  '.focalink.com': 'focalink.com',
  '.getui.com': 'getui.com',
  '.globalsources.com': 'globalsources.com',
  '.headlines.pw': 'headlines.pw',
  '.hello.spriggy.com.au': 'hello.spriggy.com.au',
  '.herokuapp.com': 'herokuapp.com',
  '.heytapmobile.com': 'heytapmobile.com',
  '.hipages.com.au': 'hipages.com.au',
  '.hubcloud.com.cn': 'hubcloud.com.cn',
  '.igexin.com': 'igexin.com',
  '.imrworldwide.com': 'imrworldwide.com',
  '.information.maileva.com': 'information.maileva.com',
  '.infura-ipfs.io': 'infura-ipfs.io',
  '.innocreed.com': 'innocreed.com',
  '.innovatedating.com': 'innovatedating.com',
  '.intellitxt.com': 'intellitxt.com',
  '.ipfs.dweb.link': 'ipfs.dweb.link',
  '.ipfs.flk-ipfs.xyz': 'ipfs.flk-ipfs.xyz',
  '.jinghuaqitb.com': 'jinghuaqitb.com',
  '.jmooreassoc.com': 'jmooreassoc.com',
  '.kimhasa.com': 'kimhasa.com',
  '.l5eamr17d.com': 'l5eamr17d.com',
  '.linodeusercontent.com': 'linodeusercontent.com',
  '.llnw.net': 'llnw.net',
  '.msecnd.net': 'msecnd.net',
  '.musical.ly': 'musical.ly',
  '.nespresso.com': 'nespresso.com',
  '.net.easyjet.com': 'net.easyjet.com',
  '.net.iberostar.com': 'net.iberostar.com',
  '.net.mydays.de': 'net.mydays.de',
  '.notice.spriggy.com.au': 'notice.spriggy.com.au',
  '.offermatica.com': 'offermatica.com',
  '.ohhmyoffers.com': 'ohhmyoffers.com',
  '.omniture.com': 'omniture.com',
  '.onion': 'onion',
  '.ott.cibntv.com': 'ott.cibntv.com',
  '.ott.cibntv.net': 'ott.cibntv.net',
  '.p2l.info': 'p2l.info',
  '.pandasuite.com': 'pandasuite.com',
  '.pop6.com': 'pop6.com',
  '.pstatp.com': 'pstatp.com',
  '.rsc.cdn77.org': 'rsc.cdn77.org',
  '.s.joyn.de': 's.joyn.de',
  '.safebrowsing.apple': 'safebrowsing.apple',
  '.sanvello.com': 'sanvello.com',
  '.sextracker.be': 'sextracker.be',
  '.siemensplmevents.com': 'siemensplmevents.com',
  '.skyscanner.com': 'skyscanner.com',
  '.skyscanner.net': 'skyscanner.net',
  '.snssdk.com': 'snssdk.com',
  '.stats.esomniture.com': 'stats.esomniture.com',
  '.stuff.co.nz': 'stuff.co.nz',
  '.swrve.com': 'swrve.com',
  '.tajawal.com': 'tajawal.com',
  '.themoneytizer.com': 'themoneytizer.com',
  '.tntdrama.com': 'tntdrama.com',
  '.treknew.fun': 'treknew.fun',
  '.u3.ucweb.com': 'u3.ucweb.com',
  '.umeng.com': 'umeng.com',
  '.umengcloud.com': 'umengcloud.com',
  '.ut.taobao.com': 'ut.taobao.com',
  '.videostrip.com': 'videostrip.com',
  '.viglink.com': 'viglink.com',
  '.web-marketing.ai': 'web-marketing.ai',
  '.weebly.com': 'weebly.com',
  '.wolterskluwer.com': 'wolterskluwer.com',
  '.y2sysv81v.com': 'y2sysv81v.com',
  '.yinzcam.com': 'yinzcam.com',
  '.z00yy6tg2.com': 'z00yy6tg2.com',
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
  'dii1.bitiba.': 'dii1.bitiba',
  'dii1.zooplus.': 'dii1.zooplus',
  'dii2.bitiba.': 'dii2.bitiba',
  'dii2.zoohit.': 'dii2.zoohit',
  'dii2.zooplus.': 'dii2.zooplus',
  'dii3.bitiba.': 'dii3.bitiba',
  'dii3.zoohit.': 'dii3.zoohit',
  'dii3.zooplus.': 'dii3.zooplus',
  'dii4.bitiba.': 'dii4.bitiba',
  'dii4.zoohit.': 'dii4.zoohit',
  'dii4.zooplus.': 'dii4.zooplus',
  'email-am.jll.': 'email-am.jll',
  'email-ap.jll.': 'email-ap.jll',
  'email-cm.jll.': 'email-cm.jll',
  'email-em.jll.': 'email-em.jll',
  'rtb-useast-v4.': 'rtb-useast-v4',
  'rtb-useast.': 'rtb-useast',
  'rtb-uswest-v4.': 'rtb-uswest-v4',
  'rtb-uswest.': 'rtb-uswest',
  't.antalis.': 't.antalis',
  't.dilling.': 't.dilling',
  't.locasun.': 't.locasun',
  'xml-eu-v4.': 'xml-eu-v4',
  'xml-eu.': 'xml-eu',
  'xml-v4.': 'xml-v4'
};
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
  'sdkapp.uve.weibo.com': 'sdkapp.uve.weibo.com', // 微博重写处理
  'static-s.iqiyi.com': 'static-s.iqiyi.com', // 爱奇艺静态资源
  'staticsns.cdn.bcebos.com': 'staticsns.cdn.bcebos.com', // 百度静态资源
  'umami.is': 'umami.is', // Umami 官网
  'weibointl.api.weibo.cn': 'weibointl.api.weibo.cn', // 微博重写处理
  'optimus-ads.amap.com': 'optimus-ads.amap.com' // 高德地图重写处理
};
const RESOURCES = {
  REJECTMIXTURE: {
    FILENAME: 'element.ref.reject.mixture.ini',
    SRC: [
      'https://loon.103516.xyz/Rule/PCDN.lsr',
      'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyPrivacy.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rewrite/QuantumultX/BlockHTTPDNS/BlockHTTPDNS.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ZhihuAds/ZhihuAds.list',
      'https://raw.githubusercontent.com/Cats-Team/AdRules/main/qx.conf',
      'https://raw.githubusercontent.com/ConnersHua/RuleGo/master/Surge/Ruleset/Extra/Reject/Advertising.list',
      'https://raw.githubusercontent.com/ConnersHua/RuleGo/master/Surge/Ruleset/Extra/Reject/Malicious.list',
      'https://raw.githubusercontent.com/ConnersHua/RuleGo/master/Surge/Ruleset/Extra/Reject/Tracking.list',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.reject.custom.ini',
      'https://raw.githubusercontent.com/firehol/blocklist-ipsets/master/firehol_level1.netset',
      'https://raw.githubusercontent.com/fmz200/wool_scripts/main/Loon/rule/rejectAd.list',
      'https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Filter/AdBlock.list',
      'https://raw.githubusercontent.com/GMOogway/shadowrocket-rules/master/sr_reject_list.module',
      'https://raw.githubusercontent.com/Johnshall/Shadowrocket-ADBlock-Rules-Forever/release/sr_ad_only.conf',
      'https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/QuantumultX/rule/Adblock4limbo.list',
      'https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/QuantumultX/rule/BanAD.list',
      'https://raw.githubusercontent.com/Loyalsoldier/geoip/release/surge/ad.txt',
      'https://raw.githubusercontent.com/privacy-protection-tools/anti-AD/master/anti-ad-surge.txt',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/ip/reject.conf',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/non_ip/my_reject.conf',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/non_ip/reject-no-drop.conf',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/non_ip/reject.conf',
      'https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-QuantumultX.list',
      'https://raw.githubusercontent.com/uselibrary/PCDN/main/pcdn.list',
      'https://raw.githubusercontent.com/VirgilClyne/GetSomeFries/main/ruleset/HTTPDNS.Block.list'
    ],
    MAPFN: mapMixture
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
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Lan/Lan.list',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.direct.custom.ini',
      'https://raw.githubusercontent.com/Loyalsoldier/geoip/release/surge/cn.txt',
      'https://raw.githubusercontent.com/Loyalsoldier/geoip/release/surge/private.txt',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/ip/lan.conf'
    ],
    MAPFN: mapMixture
  },
  GLOBALMIXTURE: {
    FILENAME: 'element.ref.global.mixture.ini',
    SRC: [
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Adobe/Adobe.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Docker/Docker.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Google/Google.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Instagram/Instagram.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/LinkedIn/LinkedIn.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Reddit/Reddit.list',
      'https://raw.githubusercontent.com/Coldvvater/Mononoke/master/Surge/Rules/AppleProxy.list',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.global.custom.ini',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/ip/telegram_asn.conf',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/non_ip/microsoft.conf'
    ],
    MAPFN: mapMixture
  },
  OPENAIMIXTURE: {
    FILENAME: 'element.ref.openai.mixture.ini',
    SRC: [
      'https://loon.103516.xyz/Rule/AI.lsr',
      'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/AI.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Anthropic/Anthropic.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/BardAI/BardAI.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Claude/Claude.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Copilot/Copilot.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Gemini/Gemini.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/OpenAI/OpenAI.list',
      'https://raw.githubusercontent.com/Coldvvater/Mononoke/master/Surge/Rules/AI.list',
      'https://raw.githubusercontent.com/ConnersHua/RuleGo/master/Surge/Ruleset/Extra/AI.list',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.openai.custom.ini',
      'https://raw.githubusercontent.com/fmz200/wool_scripts/main/Loon/rule/AI.list',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/non_ip/ai.conf'
    ],
    MAPFN: mapMixture
  },
  STREAMMIXTURE: {
    FILENAME: 'element.ref.stream.mixture.ini',
    SRC: [
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/AppleMedia/AppleMedia.list',
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
      value: `# ${new Date().toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai'
      })} https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/${FILENAME}\n`
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
  for (const src of SRC) {
    try {
      const keyArr = src.split('/');
      const key = `${keyArr.at(-3)}/${keyArr.at(-2)}/${keyArr.at(-1)}`
        .replace(/\?.+/gim, '')
        .replace(/^\//gim, '');
      const headers = {
        'Accept-Language': 'en-US',
        'Content-Type': 'text/plain',
        'User-Agent': 'Loon/649 CFNetwork/1492.0.1 Darwin/23.3.0'
      };
      if (
        src.startsWith('https://patch-diff.githubusercontent.com') ||
        src.startsWith('https://avatars.githubusercontent.com') ||
        src.startsWith('https://camo.githubusercontent.com') ||
        src.startsWith('https://gist.githubusercontent.com') ||
        src.startsWith('https://raw.githubusercontent.com') ||
        src.startsWith('https://github.githubassets.com') ||
        src.startsWith('https://api.github.com') ||
        src.startsWith('https://github.com')
      ) {
        headers.Authorization = `Bearer ${process.env.GH_TOKEN}`;
      }
      const res = await fetch(src, {
        method: 'GET',
        cache: 'no-store',
        credentials: 'include',
        headers
      });
      if (res.ok) {
        const text = await res.text();
        RAW[key] = text
          .split('\n')
          .map(str => MAPFN(str, FILENAME))
          .filter(text => text.length !== 0);
        RAW[key].forEach(item => {
          const temp = item.split(',')[1]?.trim();
          const { length: dotAmount } = [...temp.matchAll(/\./gim)]; // 域名中·的个数
          if (!globalThis[`${FILENAME}${dotAmount}`]) {
            globalThis[`${FILENAME}${dotAmount}`] = {};
          }
          globalThis[`${FILENAME}${dotAmount}`][temp] = temp;
        });
      } else {
        console.error(`    ${key}`.padEnd(96), `加载失败 >>>`.padStart(12));
      }
    } catch ({ message }) {
      console.error(message);
      throw new Error(src);
    }
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
function generateRule(textPure = '') {
  const blockList = Object.entries(MIXTUREBLOCKLIST);
  for (let index = 0; index < blockList.length; index++) {
    const [key, value] = blockList[index];
    const matcher = key.startsWith('.')
      ? String.prototype.endsWith
      : String.prototype.startsWith;
    const rule = key.startsWith('.') ? 'HOST-SUFFIX' : 'HOST-KEYWORD';
    if (matcher.call(textPure, key)) {
      return `${rule},${value}`;
    }
  }
  return '';
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
    textPure.startsWith('"^ht') ||
    textPure.endsWith('.arpa') ||
    textTemp.startsWith('||') ||
    textTemp.startsWith('! ') ||
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
  const rule = generateRule(textPure);
  if (rule) {
    return rule;
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
    textPure.includes('^') ||
    textPure.includes('$') ||
    textPure.includes('?') ||
    textPure.includes('[') ||
    textPure.includes(']') ||
    textPure.includes('!') ||
    textPure.includes('+')
  ) {
    return `URL-REGEX,${textPure}`;
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
  } else if (captialTextTemp.startsWith('URL-REGEX,')) {
    return `URL-REGEX,${textPure}`;
  } else if (captialTextTemp.startsWith('IP-ASN,')) {
    return `IP-ASN,${textPure},no-resolve`;
  } else if (captialTextTemp.startsWith('IP-CIDR,')) {
    if (textPure.includes(':')) {
      return '';
    }
    return `IP-CIDR,${textPure},no-resolve`;
  } else if (
    captialTextTemp.startsWith('IP-CIDR6,') ||
    captialTextTemp.startsWith('IP6-CIDR,')
  ) {
    return `IP6-CIDR,${textPure},no-resolve`;
  } else if (captialTextTemp.startsWith('PROCESS-NAME,')) {
    return `PROCESS-NAME,${textPure}`;
  } else if (/^(\d|\.)+(\/){1}(\d){1,2}/gim.test(textTemp)) {
    const [pureIP] = /^(\d|\.)+(\/){1}(\d){1,2}/gim.exec(textTemp);
    // 霍尔一级
    if (MIXTUREWHITELIST[pureIP]) {
      return '';
    }
    return `IP-CIDR,${pureIP},no-resolve`;
  } else if (
    /^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^::([\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){2}:([\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^:((:[\da-fA-F]{1,4}){1,6}|:)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){6}:(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$/gim.test(
      textTemp
    )
  ) {
    if (MIXTUREWHITELIST[textTemp]) {
      return '';
    }
    return `IP6-CIDR,${textTemp},no-resolve`;
  } else {
    return '';
  }
}
