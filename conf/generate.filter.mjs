import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
let MAINREJECTDEEPDOMAINLIST = {}; // 给 !REJECTMIXTURE 驱虫
let MAINREJECTDOMAINLIST = {}; // 给 REJECTMIXTURE 驱虫
let IPWHITELIST = {
  '10.0.0.0/8': '10.0.0.0/8',
  '127.0.0.0/8': '127.0.0.0/8',
  '172.16.0.0/12': '172.16.0.0/12',
  '192.0.0.0/16': '192.0.0.0/16',
  '224.0.0.0/24': '224.0.0.0/24'
};
let RESOURCES = {
  REJECTMIXTURE: {
    FILENAME: 'element.ref.reject.mixture.ini',
    SRC: [
      'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanAD.list',
      'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyList.list',
      'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyListChina.list',
      'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyPrivacy.list',
      'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanProgramAD.list',
      'https://raw.githubusercontent.com/Cats-Team/AdRules/main/qx.conf',
      'https://raw.githubusercontent.com/firehol/blocklist-ipsets/master/firehol_level1.netset',
      'https://raw.githubusercontent.com/fmz200/wool_scripts/main/QuantumultX/filter/fenliu.list',
      'https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Filter/AdBlock.list',
      'https://raw.githubusercontent.com/GMOogway/shadowrocket-rules/master/sr_reject_list.module',
      'https://raw.githubusercontent.com/Johnshall/Shadowrocket-ADBlock-Rules-Forever/release/sr_ad_only.conf',
      'https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/QuantumultX/rule/Adblock4limbo.list',
      'https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/QuantumultX/rule/BanAD.list',
      'https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/reject.txt',
      'https://raw.githubusercontent.com/PBH-BTN/BTN-Collected-Rules/main/combine/all.txt',
      'https://raw.githubusercontent.com/privacy-protection-tools/anti-AD/master/anti-ad-surge.txt',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/ip/reject.conf',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/non_ip/my_reject.conf',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/non_ip/reject.conf',
      'https://raw.githubusercontent.com/VirgilClyne/GetSomeFries/main/ruleset/HTTPDNS.Block.list',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.reject.custom.ini'
    ],
    MAPFN: mapMixture
  },
  REJECTDOHOSTS: {
    FILENAME: 'element.ref.reject.dohosts.ini',
    SRC: [
      'https://hblock.molinero.dev/hosts',
      'https://malware-filter.gitlab.io/malware-filter/urlhaus-filter-hosts.txt',
      'https://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts',
      'https://raw.githubusercontent.com/badmojr/1Hosts/master/Pro/hosts.win',
      'https://raw.githubusercontent.com/damengzhu/banad/main/hosts.txt',
      'https://raw.githubusercontent.com/durablenapkin/scamblocklist/master/hosts.txt',
      'https://raw.githubusercontent.com/FiltersHeroes/KADhosts/master/KADhosts.txt',
      'https://raw.githubusercontent.com/hagezi/dns-blocklists/main/hosts/pro.txt',
      'https://raw.githubusercontent.com/hoshsadiq/adblock-nocoin-list/master/hosts.txt',
      'https://raw.githubusercontent.com/jdlingyu/ad-wars/master/hosts',
      'https://raw.githubusercontent.com/jerryn70/GoodbyeAds/master/Hosts/GoodbyeAds.txt',
      'https://raw.githubusercontent.com/Sinfonietta/hostfiles/master/gambling-hosts',
      'https://raw.githubusercontent.com/Sinfonietta/hostfiles/master/pornography-hosts',
      'https://raw.githubusercontent.com/Sinfonietta/hostfiles/master/snuff-hosts',
      'https://raw.githubusercontent.com/Sinfonietta/hostfiles/master/social-hosts',
      'https://raw.githubusercontent.com/StevenBlack/hosts/master/alternates/fakenews-gambling-porn-social/hosts',
      'https://raw.githubusercontent.com/tiuxo/hosts/master/ads',
      'https://raw.githubusercontent.com/tiuxo/hosts/master/porn',
      'https://raw.githubusercontent.com/yous/YousList/master/hosts.txt',
      'https://someonewhocares.org/hosts/zero/hosts',
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
      'https://malware-filter.gitlab.io/malware-filter/urlhaus-filter-dnscrypt-blocked-ips.txt',
      'https://raw.githubusercontent.com/firehol/blocklist-ipsets/master/stopforumspam_7d.ipset'
    ],
    MAPFN: mapPrueIPS
  },
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
      'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/LocalAreaNetwork.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/AliPay/AliPay.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Lan/Lan.list',
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
      'https://raw.githubusercontent.com/Coldvvater/Mononoke/master/Surge/Rules/AppleProxyService.list',
      'https://raw.githubusercontent.com/ConnersHua/RuleGo/master/Surge/Ruleset/Proxy.list',
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
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/non_ip/ai.conf',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.openai.custom.ini'
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
        if (FILENAME === 'element.ref.reject.mixture.ini') {
          // 向 MAINREJECTDOMAINLIST 中添加数据
          RAW[key].forEach(item => {
            const temp = item.split(',')[1].trim();
            if ([...temp.matchAll(/\./gim)].length === 1) {
              MAINREJECTDOMAINLIST[temp] = temp;
            }
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
  return MAPFN === mapMixture
    ? {
        FILENAME,
        RAW
      }
    : {
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
  if (textPure.includes('sukkaw.skk.moe') || textPure.includes('acl4.ssr')) {
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
  if (textPure.endsWith('.51y5.net')) {
    return 'HOST-SUFFIX,51y5.net';
  }
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
    // REJECT 时会导致相关网站异常
    if (textPure === 'staticsns.cdn.bcebos.com') {
      return '';
    }
    return `HOST,${textPure}`;
  } else if (
    textTemp.toUpperCase().startsWith('HOST-SUFFIX,') ||
    textTemp.toUpperCase().startsWith('DOMAIN-SUFFIX,')
  ) {
    // REJECT 时会导致相关网站异常
    if (
      textPure === 'byteimg.com' ||
      textPure === 's.weibo.com' ||
      textPure === 'static-s.iqiyi.com'
    ) {
      return '';
    }
    return `HOST-SUFFIX,${textPure}`;
  } else if (
    textTemp.toUpperCase().startsWith('HOST-KEYWORD,') ||
    textTemp.toUpperCase().startsWith('DOMAIN-KEYWORD,')
  ) {
    // REJECT 时会导致相关网站异常
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
  } else if (textTemp.toUpperCase().startsWith('PROCESS-NAME,')) {
    return `PROCESS-NAME,${textPure}`;
  } else if (/^(\d|\.)+(\/){1}(\d){1,2}$/gim.test(textTemp)) {
    // 霍尔一级
    if (IPWHITELIST[textTemp]) {
      return '';
    }
    return `IP-CIDR,${textTemp}`;
  } else if (/\S*:+\S*\/{1}/gim.test(textTemp)) {
    /**
     * IPv6 + mask 正则
     * ^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^::([\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){2}:([\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^:((:[\da-fA-F]{1,4}){1,6}|:)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){6}:(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$
     */
    if (IPWHITELIST[textTemp]) {
      return '';
    }
    return `IP6-CIDR,${textTemp}`;
  } else {
    return '';
  }
}
function mapPrueIPS(text) {
  const textTemp = text.trim();
  if (
    (textTemp.includes(':') && !textTemp.includes('/')) ||
    textTemp.startsWith('#') ||
    textTemp.startsWith(';') ||
    textTemp.startsWith('<') ||
    textTemp.endsWith('>')
  ) {
    return '';
  }
  return textTemp;
}
function mapDoHosts(text) {
  const textTemp = text?.trim();
  const [, last] = textTemp?.split(' ');
  const lastTemp = last?.trim() || undefined;
  const white = {
    '0.0.0.0': '0.0.0.0',
    'ip6-allhosts': 'ip6-allhosts',
    'ip6-allnodes': 'p6-allnodes',
    'ip6-allrouters': 'ip6-allrouters',
    'ip6-localhost': 'ip6-localhost',
    'ip6-loopback': 'ip6-loopback',
    'ip6-mcastprefix': 'ip6-mcastprefix',
    'localhost.localdomain': 'localhost.localdomain',
    broadcasthost: 'broadcasthost',
    local: 'local',
    localhost: 'localhost'
  };
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
    white[lastTemp]
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
      `    ${key}`.padEnd(96),
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
        if (FILENAME === 'element.ref.reject.mixture.ini') {
          if (
            (domainORule === 'HOST' ||
              domainORule === 'HOST-SUFFIX' ||
              domainORule === 'HOST-KEYWORD' ||
              domainORule === 'HOST-WILDCARD') &&
            [...domainORip.matchAll(/\./gim)].length > 1
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
            if (!MAINREJECTDOMAINLIST[MainInDomainORip] && !park[domainORip]) {
              MAINREJECTDEEPDOMAINLIST[domainORip] = domainORip;
              park[domainORip] = domainORip;
              temp[rule] = rule;
            }
          } else if (!park[domainORip]) {
            MAINREJECTDEEPDOMAINLIST[domainORip] = domainORip;
            park[domainORip] = domainORip;
            temp[rule] = rule;
          }
        } else {
          if (!park[domainORip] && !MAINREJECTDEEPDOMAINLIST[domainORip]) {
            park[domainORip] = domainORip;
            temp[rule] = rule;
          }
        }
      } else {
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
