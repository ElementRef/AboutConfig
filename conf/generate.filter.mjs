import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const MAINREJECTDOMAINLIST = [];
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
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/AliPay/AliPay.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Lan/Lan.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/SteamCN/SteamCN.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/WeChat/WeChat.list',
      'https://raw.githubusercontent.com/missuo/ASN-China/main/ASN.China.list',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/ip/lan.conf',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.direct.custom.ini'
    ],
    MAPFN: mapMixture
  },
  GLOBALMIXTURE: {
    FILENAME: 'element.ref.global.mixture.ini',
    SRC: [
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Adobe/Adobe.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Bing/Bing.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/GitHub/GitHub.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Instagram/Instagram.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Microsoft/Microsoft.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Steam/Steam.list',
      'https://raw.githubusercontent.com/Coldvvater/Mononoke/master/Surge/Rules/AppleProxyService.list',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/ip/telegram_asn.conf',
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
      'https://raw.githubusercontent.com/Coldvvater/Mononoke/master/Surge/Rules/AI.list',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.openai.custom.ini'
    ],
    MAPFN: mapMixture
  },
  REJECTMIXTURE: {
    FILENAME: 'element.ref.reject.mixture.ini',
    SRC: [
      // 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Advertising/Advertising.list',
      // 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Marketing/Marketing.list',
      'https://raw.githubusercontent.com/Cats-Team/AdRules/main/qx.conf',
      // 'https://raw.githubusercontent.com/ConnersHua/RuleGo/master/Surge/Ruleset/Extra/Reject/Advertising.list',
      // 'https://raw.githubusercontent.com/ConnersHua/RuleGo/master/Surge/Ruleset/Extra/Reject/Malicious.list',
      // 'https://raw.githubusercontent.com/ConnersHua/RuleGo/master/Surge/Ruleset/Extra/Reject/Tracking.list',
      // 'https://raw.githubusercontent.com/deezertidal/QuantumultX-Rewrite/master/rule/AntiAD.list',
      'https://raw.githubusercontent.com/fmz200/wool_scripts/main/QuantumultX/filter/fenliu.list',
      // 'https://raw.githubusercontent.com/GMOogway/shadowrocket-rules/master/sr_reject_list.module',
      // 'https://raw.githubusercontent.com/Johnshall/Shadowrocket-ADBlock-Rules-Forever/release/sr_ad_only.conf',
      'https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/QuantumultX/rule/Adblock4limbo.list',
      'https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/QuantumultX/rule/BanAD.list',
      // 'https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/reject.txt',
      // 'https://raw.githubusercontent.com/Moli-X/Resources/main/Filter/ADBlack.list',
      'https://raw.githubusercontent.com/privacy-protection-tools/anti-AD/master/anti-ad-surge.txt',
      // 'https://raw.githubusercontent.com/RuCu6/QuanX/main/Rules/MyBlockAds.list',
      // 'https://raw.githubusercontent.com/RuCu6/QuanX/main/Rules/PornAds.list',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/ip/reject.conf',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/non_ip/my_reject.conf',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/non_ip/reject.conf',
      'https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-QuantumultX.list',
      // 'https://raw.githubusercontent.com/xiaomaoJT/QxScript/main/filter/AdAway-surge.list',
      // 'https://raw.githubusercontent.com/xiaomaoJT/QxScript/main/filter/AdBlock-surge.list',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.reject.custom.ini'
    ],
    MAPFN: mapMixture
  },
  REJECTDOHOSTS: {
    FILENAME: 'element.ref.reject.dohosts.ini',
    SRC: [
      'https://pgl.yoyo.org/adservers/serverlist.php?showintro=0;hostformat=hosts',
      'https://raw.githubusercontent.com/badmojr/1Hosts/master/Pro/hosts.win',
      'https://raw.githubusercontent.com/damengzhu/banad/main/hosts.txt',
      'https://raw.githubusercontent.com/FiltersHeroes/KADhosts/master/KADhosts.txt',
      'https://raw.githubusercontent.com/hagezi/dns-blocklists/main/hosts/pro.txt',
      'https://raw.githubusercontent.com/hoshsadiq/adblock-nocoin-list/master/hosts.txt',
      'https://raw.githubusercontent.com/jdlingyu/ad-wars/master/hosts',
      'https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts',
      'https://someonewhocares.org/hosts/hosts',
      'https://winhelp2002.mvps.org/hosts.txt'
    ],
    MAPFN: mapDoHosts
  },
  REJECTPUREIPS: {
    FILENAME: 'element.ref.reject.pureips.ini',
    SRC: [
      'https://blocklist.greensnow.co/greensnow.txt',
      'https://cinsscore.com/list/ci-badguys.txt',
      'https://lists.blocklist.de/lists/all.txt',
      'https://pgl.yoyo.org/adservers/iplist.php?format=&showintro=0',
      'https://raw.githubusercontent.com/firehol/blocklist-ipsets/master/firehol_level1.netset',
      'https://raw.githubusercontent.com/firehol/blocklist-ipsets/master/stopforumspam_7d.ipset'
    ],
    MAPFN: mapPrueIPS
  },
  STREAMMIXTURE: {
    FILENAME: 'element.ref.stream.mixture.ini',
    SRC: [
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Netflix/Netflix.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Spotify/Spotify.list',
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
    console.log(`>>> ${key}`.padEnd(48), '开始处理 <<<'.padStart(12));
    const RAW = await getResourses(RESOURCES[key]);
    const RES = combineResourses(RAW);
    await writeResourses2File(RES);
    console.log(`>>> ${key}`.padEnd(48), '处理完成 <<<'.padStart(12));
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
      const key = `${keyArr.at(-2)}/${keyArr.at(-1)}`.replace(/\?.+/gim, '');
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
      }
    }
  } catch (error) {
    console.error(error);
  }
  return MAPFN === mapMixture
    ? {
        MAINREJECTDOMAINLIST,
        FILENAME,
        RAW
      }
    : {
        FILENAME,
        RAW
      };
}
function mapMixture(text = '', FILENAME = '') {
  const textTemp = text.replace(/ /gim, '');
  const textPure = (textTemp.split(',')[1] || '')
    .replace(/\/\/.*/gim, '')
    .trim();
  // 删除 HOST,10.10.34.34 之类的规则
  if (
    /^(\d|\.)+$/gim.test(textPure) &&
    !(
      textTemp.toUpperCase().startsWith('IP-ASN,') ||
      textTemp.toUpperCase().startsWith('IP-CIDR,') ||
      textTemp.toUpperCase().startsWith('IP-CIDR6,') ||
      textTemp.toUpperCase().startsWith('IP6-CIDR,')
    )
  ) {
    return '';
  }
  // 删除注释
  if (textPure.includes('sukkaw.skk.moe')) {
    return '';
  }
  // /^,[w]{+}\./gim 存在误杀
  if (
    /^,[w]{3}\./gim.test(`,${textPure}`) &&
    [...textPure.matchAll(/\./gim)].length > 1
  ) {
    return `HOST-SUFFIX,${textPure.replace(/^[w]{3}\./gim, '')}`;
  }
  // HOST-KEYWORD 优先级过低，导致拦截失败，弃用
  // if (textPure.startsWith('a8clk.')) {
  //   return 'HOST-KEYWORD,a8clk';
  // }
  // if (textPure.startsWith('a8cv.')) {
  //   return 'HOST-KEYWORD,a8cv';
  // }
  // if (textPure.startsWith('adobeanalytics.')) {
  //   return 'HOST-KEYWORD,adobeanalytics';
  // }
  // if (textPure.startsWith('ads.')) {
  //   return 'HOST-KEYWORD,ads';
  // }
  // if (textPure.startsWith('advertising.')) {
  //   return 'HOST-KEYWORD,advertising';
  // }
  // if (textPure.startsWith('affil.')) {
  //   return 'HOST-KEYWORD,affil';
  // }
  // if (textPure.startsWith('ainu.intel.')) {
  //   return 'HOST-KEYWORD,ainu.intel';
  // }
  // if (textPure.startsWith('analytics.')) {
  //   return 'HOST-KEYWORD,analytics';
  // }
  // if (textPure.startsWith('att.trk.')) {
  //   return 'HOST-KEYWORD,att.trk';
  // }
  // if (textPure.startsWith('data.comunicaciones.')) {
  //   return 'HOST-KEYWORD,data.comunicaciones';
  // }
  // if (textPure.startsWith('data.customermail.')) {
  //   return 'HOST-KEYWORD,data.customermail';
  // }
  // if (textPure.startsWith('data.decathlon.')) {
  //   return 'HOST-KEYWORD,data.decathlon';
  // }
  // if (textPure.startsWith('email.everyonesocial.')) {
  //   return 'HOST-KEYWORD,email.everyonesocial';
  // }
  // if (textPure.startsWith('images.info.')) {
  //   return 'HOST-KEYWORD,images.info';
  // }
  // if (textPure.startsWith('metrics.')) {
  //   return 'HOST-KEYWORD,metrics';
  // }
  // if (textPure.startsWith('mobileads.')) {
  //   return 'HOST-KEYWORD,mobileads';
  // }
  // if (textPure.startsWith('openads.')) {
  //   return 'HOST-KEYWORD,openads';
  // }
  // if (textPure.startsWith('phpads.')) {
  //   return 'HOST-KEYWORD,phpads';
  // }
  // if (textPure.startsWith('sanalytics.')) {
  //   return 'HOST-KEYWORD,sanalytics';
  // }
  // if (textPure.startsWith('secureanalytics.')) {
  //   return 'HOST-KEYWORD,secureanalytics';
  // }
  // if (textPure.startsWith('sslanalytics.')) {
  //   return 'HOST-KEYWORD,sslanalytics';
  // }
  // if (textPure.startsWith('swebanalytics.')) {
  //   return 'HOST-KEYWORD,swebanalytics';
  // }
  // if (textPure.startsWith('uads.')) {
  //   return 'HOST-KEYWORD,uads';
  // }
  // if (textPure.startsWith('unityads.')) {
  //   return 'HOST-KEYWORD,unityads';
  // }
  // if (textPure.startsWith('webads.')) {
  //   return 'HOST-KEYWORD,webads';
  // }
  // if (textPure.startsWith('webanalytics.')) {
  //   return 'HOST-KEYWORD,webanalytics';
  // }
  // if (textPure.startsWith('ywrcqa.')) {
  //   return 'HOST-KEYWORD,ywrcqa';
  // }
  // if (textPure.includes('.academyofconsciousleadership.')) {
  //   return 'HOST-KEYWORD,academyofconsciousleadership';
  // }
  // if (textPure.includes('.adscience.')) {
  //   return 'HOST-KEYWORD,adscience';
  // }
  // if (textPure.includes('.adtech.')) {
  //   return 'HOST-KEYWORD,adtech';
  // }
  // if (textPure.includes('.americanexpress.')) {
  //   return 'HOST-KEYWORD,americanexpress';
  // }
  // if (textPure.includes('.antalis.')) {
  //   return 'HOST-KEYWORD,antalis';
  // }
  // if (textPure.includes('.autoscout24.')) {
  //   return 'HOST-KEYWORD,autoscout24';
  // }
  // if (textPure.includes('.exads.')) {
  //   return 'HOST-KEYWORD,exads';
  // }
  // if (textPure.includes('.ingest.sentry.')) {
  //   return 'HOST-KEYWORD,ingest.sentry';
  // }
  // if (textPure.includes('.net.jumia.')) {
  //   return 'HOST-KEYWORD,net.jumia';
  // }
  // if (textPure.includes('.ricoh.')) {
  //   return 'HOST-KEYWORD,ricoh';
  // }
  // if (textPure.includes('.theacademyforconsciousleadership.')) {
  //   return 'HOST-KEYWORD,theacademyforconsciousleadership';
  // }
  // if (textPure.includes('.weareknitters.')) {
  //   return 'HOST-KEYWORD,weareknitters';
  // }
  if (textPure.endsWith('.actonservice.com')) {
    return 'HOST-SUFFIX,actonservice.com';
  }
  if (textPure.endsWith('.ahacdn.me')) {
    return 'HOST-SUFFIX,ahacdn.me';
  }
  if (textPure.endsWith('.almosafer.com')) {
    return 'HOST-SUFFIX,almosafer.com';
  }
  if (textPure.endsWith('.cosmicnewspulse.com')) {
    return 'HOST-SUFFIX,cosmicnewspulse.com';
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
  if (textPure.endsWith('.hipages.com.au')) {
    return 'HOST-SUFFIX,hipages.com.au';
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
  if (textPure.endsWith('.isnssdk.com')) {
    return 'HOST-SUFFIX,isnssdk.com';
  }
  if (textPure.endsWith('.k3718qw08.com')) {
    return 'HOST-SUFFIX,k3718qw08.com';
  }
  if (textPure.endsWith('.l5eamr17d.com')) {
    return 'HOST-SUFFIX,l5eamr17d.com';
  }
  if (textPure.endsWith('.linodeusercontent.com')) {
    return 'HOST-SUFFIX,linodeusercontent.com';
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
  if (textPure.endsWith('.ogrt80r65.com')) {
    return 'HOST-SUFFIX,ogrt80r65.com';
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
  if (textPure.endsWith('.rsc.cdn77.org')) {
    return 'HOST-SUFFIX,rsc.cdn77.org';
  }
  if (textPure.endsWith('.sanvello.com')) {
    return 'HOST-SUFFIX,sanvello.com';
  }
  if (textPure.endsWith('.skyscanner.com')) {
    return 'HOST-SUFFIX,skyscanner.com';
  }
  if (textPure.endsWith('.skyscanner.net')) {
    return 'HOST-SUFFIX,skyscanner.net';
  }
  if (textPure.endsWith('.snssdk.com')) {
    return 'HOST-SUFFIX,snssdk.com';
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
  if (textPure.endsWith('.34gwl8v1a.com')) {
    return 'HOST-SUFFIX,34gwl8v1a.com';
  }
  if (textPure.endsWith('.4puuqeh41.com')) {
    return 'HOST-SUFFIX,4puuqeh41.com';
  }
  if (textPure.endsWith('.5clo0xmbf.com')) {
    return 'HOST-SUFFIX,5clo0xmbf.com';
  }
  if (textPure.endsWith('.51y5.net')) {
    return 'HOST-SUFFIX,51y5.net';
  }
  if (textPure.endsWith('.79j68qav2.com')) {
    return 'HOST-SUFFIX,79j68qav2.com';
  }
  if (textPure.endsWith('.833enmhob.com')) {
    return 'HOST-SUFFIX,833enmhob.com';
  }
  // Quantumult X 似乎不支持 DOMAIN-SET/RULE-SET/PROCESS-NAME
  if (textTemp.startsWith('.')) {
    return `HOST-SUFFIX,${textTemp.substring(1)}`;
  } else if (textTemp.startsWith('+.')) {
    return `HOST-SUFFIX,${textTemp.substring(2)}`;
  } else if (textTemp.toUpperCase().startsWith('USER-AGENT,')) {
    return `USER-AGENT,${textPure}`;
  } else if (textPure.includes('*')) {
    // 必须放在 USER-AGENT 之后，其他规则判断之前
    return `HOST-WILDCARD,${textPure}`;
  } else if (
    textTemp.toUpperCase().startsWith('HOST,') ||
    textTemp.toUpperCase().startsWith('DOMAIN,')
  ) {
    // REJECT 时会导致‘百度网盘’相关网站图片显示异常
    if (textPure === 'staticsns.cdn.bcebos.com') {
      return '';
    }
    return `HOST,${textPure}`;
  } else if (
    textTemp.toUpperCase().startsWith('HOST-SUFFIX,') ||
    textTemp.toUpperCase().startsWith('DOMAIN-SUFFIX,')
  ) {
    // REJECT 时会导致相关网站图片显示异常
    if (
      textPure === 'byteimg.com' ||
      textPure === 'bytedance.com' ||
      textPure === 'weworkremotely.com'
    ) {
      return '';
    }
    /**
     * 只对 element.ref.reject.mixture.ini 做优化
     * 收集规则里已有的主域名
     */
    if (
      FILENAME === 'element.ref.reject.mixture.ini' &&
      [...textPure.matchAll(/\./gim)].length === 1
    ) {
      if (!MAINREJECTDOMAINLIST.includes(textPure)) {
        MAINREJECTDOMAINLIST.push(textPure);
      }
      return `HOST-SUFFIX,${textPure}`;
    }
    return `HOST-SUFFIX,${textPure}`;
  } else if (
    textTemp.toUpperCase().startsWith('HOST-KEYWORD,') ||
    textTemp.toUpperCase().startsWith('DOMAIN-KEYWORD,')
  ) {
    // 会导致‘微博搜索｜火山引擎’相关网站异常
    if (textPure === 's.weibo.com' || textPure === 'volc') {
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
  } else if (textTemp.toUpperCase().startsWith('PROCESS-NAME,')) {
    return `PROCESS-NAME,${textPure}`;
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
function combineResourses({ MAINREJECTDOMAINLIST = undefined, FILENAME, RAW }) {
  const park = Object.create(null);
  const temp = Object.create(null);
  Object.keys(RAW).forEach(key => {
    console.log(
      `    ${key}`.padEnd(48),
      RAW[key].length.toString().padStart(12)
    );
    RAW[key].forEach(rule => {
      if (rule.includes(',')) {
        const [domainORule, domainORip] = rule.split(',');
        /**
         * 只对 element.ref.reject.mixture.ini 做优化
         * 如果 domainORip 的主域名存在于收集的列表里
         * 就剔除出去
         */
        if (
          MAINREJECTDOMAINLIST &&
          [...domainORip.matchAll(/\./gim)].length > 1 &&
          FILENAME === 'element.ref.reject.mixture.ini' &&
          (domainORule === 'HOST' ||
            domainORule === 'HOST-SUFFIX' ||
            domainORule === 'HOST-KEYWORD' ||
            domainORule === 'HOST-WILDCARD')
        ) {
          /**
           * 有重复的【主】域名，但不一定有重复的规则
           * HOST,123.urlsec.qq.com
           * HOST-SUFFIX,qq.com
           * 保留 qq.com 即可
           */
          const MainInDomainORip = domainORip
            .split('.')
            .reverse()
            .slice(0, 2)
            .reverse()
            .join('.');
          if (
            !MAINREJECTDOMAINLIST.includes(MainInDomainORip) &&
            !park[domainORip]
          ) {
            park[domainORip] = domainORip;
            temp[rule] = rule;
          }
        } else if (!park[domainORip]) {
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
  console.log(`    ${FILENAME}`.padEnd(48), RES.length.toString().padStart(12));
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
