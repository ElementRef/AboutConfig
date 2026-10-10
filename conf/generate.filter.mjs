import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const MIXTUREBLOCKLIST = {
  // '.cc': 'cc',      部分静态资源托管
  // '.mobi': 'mobi',  叮咚买菜加载失败
  // '.site': 'site', LaunchOS 激活失效
  '.ga': 'ga',
  '.gq': 'gq',
  '.tk': 'tk',

  '.bid': 'bid',
  '.biz': 'biz',
  '.cfd': 'cfd',
  '.fit': 'fit',
  '.icu': 'icu',
  '.lol': 'lol',
  '.mom': 'mom',
  '.mov': 'mov',
  '.pet': 'pet',
  '.rip': 'rip',
  '.sbs': 'sbs',
  '.win': 'win',
  '.xin': 'xin',
  '.xyz': 'xyz',
  '.zip': 'zip',

  '.beer': 'beer',
  '.bond': 'bond',
  '.buzz': 'buzz',
  '.club': 'club',
  '.cyou': 'cyou',
  '.help': 'help',
  '.live': 'live',
  '.qpon': 'qpon',
  '.rest': 'rest',
  '.shop': 'shop',
  '.work': 'work',

  '.codes': 'codes',
  '.space': 'space',
  '.world': 'world',

  '.0.0.cn': '0.0.cn',
  '.fdj.fr': 'fdj.fr',
  '.online': 'online',
  '.racing': 'racing',

  '.207.net': '207.net',
  '.2o7.net': '2o7.net',
  '.monster': 'monster',
  '.website': 'website',

  '.vpn.com': 'vpn.com',

  '.51y5.net': '51y5.net',
  '.7eer.net': '7eer.net',
  '.axf8.net': 'axf8.net',
  '.en25.com': 'en25.com',
  '.llnw.net': 'llnw.net',
  '.p2l.info': 'p2l.info',
  '.pop6.com': 'pop6.com',

  '.ahacdn.me': 'ahacdn.me',
  '.getui.com': 'getui.com',
  '.s.joyn.de': 's.joyn.de',
  '.swrve.com': 'swrve.com',
  '.umeng.com': 'umeng.com',

  '.98kk89.com': '98kk89.com',
  '.act‑on.com': 'act‑on.com',
  '.adjust.com': 'adjust.com',
  '.appboy.com': 'appboy.com',
  '.elemis.com': 'elemis.com',
  '.eloqua.com': 'eloqua.com',
  '.igexin.com': 'igexin.com',
  '.msecnd.net': 'msecnd.net',
  '.musical.ly': 'musical.ly',
  '.pardot.com': 'pardot.com',
  '.pstatp.com': 'pstatp.com',
  '.snssdk.com': 'snssdk.com',
  '.weebly.com': 'weebly.com',

  '.0937jyg.com': '0937jyg.com',
  '.5054399.com': '5054399.com',
  '.atianqi.com': 'atianqi.com',
  '.duckdns.org': 'duckdns.org',
  '.kimhasa.com': 'kimhasa.com',
  '.marketo.net': 'marketo.net',
  '.mktoweb.com': 'mktoweb.com',
  '.net.rewe.de': 'net.rewe.de',
  '.stuff.co.nz': 'stuff.co.nz',
  '.tajawal.com': 'tajawal.com',
  '.treknew.fun': 'treknew.fun',
  '.viglink.com': 'viglink.com',
  '.yinzcam.com': 'yinzcam.com',
  '.zhzy999.net': 'zhzy999.net',

  '.52896368.com': '52896368.com',
  '.bravenet.com': 'bravenet.com',
  '.cjmadobe.com': 'cjmadobe.com',
  '.focalink.com': 'focalink.com',
  '.headlines.pw': 'headlines.pw',
  '.omniture.com': 'omniture.com',
  '.sanvello.com': 'sanvello.com',
  '.tntdrama.com': 'tntdrama.com',
  '.u3.ucweb.com': 'u3.ucweb.com',

  '.5clo0xmbf.com': '5clo0xmbf.com',
  '.79j68qav2.com': '79j68qav2.com',
  '.8pv9vvi9b.com': '8pv9vvi9b.com',
  '.aomg5bzv7.com': 'aomg5bzv7.com',
  '.bhzje7ua9.com': 'bhzje7ua9.com',
  '.l5eamr17d.com': 'l5eamr17d.com',
  '.y2sysv81v.com': 'y2sysv81v.com',
  '.z00yy6tg2.com': 'z00yy6tg2.com',

  '.ad.xiaomi.com': 'ad.xiaomi.com',
  '.ajo.adobe.com': 'ajo.adobe.com',
  '.almosafer.com': 'almosafer.com',
  '.apps.iocnt.de': 'apps.iocnt.de',
  '.herokuapp.com': 'herokuapp.com',
  '.innocreed.com': 'innocreed.com',
  '.nespresso.com': 'nespresso.com',
  '.net.anwalt.de': 'net.anwalt.de',
  '.net.mydays.de': 'net.mydays.de',
  '.rsc.cdn77.org': 'rsc.cdn77.org',
  '.sextracker.be': 'sextracker.be',
  '.t.antalis.com': 't.antalis.com',
  '.ut.taobao.com': 'ut.taobao.com',

  '.000nethost.com': '000nethost.com',
  '.agvisorpro.com': 'agvisorpro.com',
  '.e.kuaishou.com': 'e.kuaishou.com',
  '.espmp-agfr.net': 'espmp-agfr.net',
  '.espmp-aufr.net': 'espmp-aufr.net',
  '.espmp-cufr.net': 'espmp-cufr.net',
  '.espmp-nifr.net': 'espmp-nifr.net',
  '.espmp-pofr.net': 'espmp-pofr.net',
  '.hipages.com.au': 'hipages.com.au',
  '.hs‑scripts.com': 'hs‑scripts.com',
  '.id05196219.com': 'id05196219.com',
  '.infura-ipfs.io': 'infura-ipfs.io',
  '.intellitxt.com': 'intellitxt.com',
  '.ipfs.dweb.link': 'ipfs.dweb.link',
  '.ott.cibntv.com': 'ott.cibntv.com',
  '.ott.cibntv.net': 'ott.cibntv.net',
  '.pandasuite.com': 'pandasuite.com',
  '.skyscanner.com': 'skyscanner.com',
  '.skyscanner.net': 'skyscanner.net',
  '.umengcloud.com': 'umengcloud.com',
  '.videostrip.com': 'videostrip.com',

  '.agoracalyce.net': 'agoracalyce.net',
  '.doubleclick.net': 'doubleclick.net',
  '.eloquademos.com': 'eloquademos.com',
  '.hubcloud.com.cn': 'hubcloud.com.cn',
  '.jinghuaqitb.com': 'jinghuaqitb.com',
  '.jmooreassoc.com': 'jmooreassoc.com',
  '.net.easyjet.com': 'net.easyjet.com',
  '.offermatica.com': 'offermatica.com',
  '.ohhmyoffers.com': 'ohhmyoffers.com',

  '.actonservice.com': 'actonservice.com',
  '.downloadlink.icu': 'downloadlink.icu',
  '.heytapmobile.com': 'heytapmobile.com',
  '.hs‑analytics.net': 'hs‑analytics.net',
  '.imrworldwide.com': 'imrworldwide.com',
  '.web-marketing.ai': 'web-marketing.ai',

  '.carte-gr.total.fr': 'carte-gr.total.fr',
  '.globalsources.com': 'globalsources.com',
  '.ipfs.flk-ipfs.xyz': 'ipfs.flk-ipfs.xyz',
  '.net.iberostar.com': 'net.iberostar.com',
  '.themoneytizer.com': 'themoneytizer.com',
  '.wolterskluwer.com': 'wolterskluwer.com',

  '.innovatedating.com': 'innovatedating.com',
  '.safebrowsing.apple': 'safebrowsing.apple',

  '.cosmicnewspulse.com': 'cosmicnewspulse.com',
  '.flourishpath.online': 'flourishpath.online',

  '.hello.spriggy.com.au': 'hello.spriggy.com.au',
  '.siemensplmevents.com': 'siemensplmevents.com',
  '.stats.esomniture.com': 'stats.esomniture.com',

  '.linodeusercontent.com': 'linodeusercontent.com',
  '.notice.spriggy.com.au': 'notice.spriggy.com.au',
  /**
   * 记得关闭分流优化！！！
   * 域名前缀，找最大特征，避免误杀
   * HOST-KEYWORD 优先级较低，会出现逃逸问题
   * 所以，只能避开主流公司会使用的「规则前缀」
   * 比如，访问 a.munters.apple.com 时
   * HOST-SUFFIX,apple.com 存在直连策略中
   * a.munters.apple.com 会因为 HOST-KEYWORD 优先级太低
   * 导致 a.munters.apple.com 被匹配为直连策略，导致拦截失效
   * 但是，似乎 Surge|Quantumult X|Clash 的策略优先级都不太一样
   */
  'dii1.zooplus.': 'dii1.zooplus.',
  'dii2.zooplus.': 'dii2.zooplus.',
  'dii3.zooplus.': 'dii3.zooplus.',
  'dii4.zooplus.': 'dii4.zooplus.',
  'email-am.jll.': 'email-am.jll.',
  'email-ap.jll.': 'email-ap.jll.',
  'email-cm.jll.': 'email-cm.jll.',
  'email-em.jll.': 'email-em.jll.',

  'dii1.bitiba.': 'dii1.bitiba.',
  'dii2.bitiba.': 'dii2.bitiba.',
  'dii3.bitiba.': 'dii3.bitiba.',
  'dii4.bitiba.': 'dii4.bitiba.',
  'dii1.zoohit.': 'dii1.zoohit.',
  'dii2.zoohit.': 'dii2.zoohit.',
  'dii3.zoohit.': 'dii3.zoohit.',
  'dii4.zoohit.': 'dii4.zoohit.',

  'affiliate.': 'affiliate.',
  't.antalis.': 't.antalis.',
  't.dilling.': 't.dilling.',
  't.locasun.': 't.locasun.',

  'web.mapp.': 'web.mapp.',
  'web.news.': 'web.news.',
  'webcontr.': 'webcontr.',

  'www0.': 'www0.',
  'www1.': 'www1.',
  'www2.': 'www2.',
  'www3.': 'www3.',
  'www4.': 'www4.',
  'www5.': 'www5.',
  'www6.': 'www6.',
  'www7.': 'www7.',
  'www8.': 'www8.',
  'www9.': 'www9.',

  '.academyofconsciousleadership.': '.academyofconsciousleadership.',
  '.celebratevitamins.': '.celebratevitamins.',
  '.autoscout24.': '.autoscout24.',
  '.execute-api.': '.execute-api.',
  '.goldfishss.': '.goldfishss.',
  '.onofficeom.': '.onofficeom.',
  '.cos.': '.cos.',
  '.trk.': '.trk.',
  '.www.': '.www.',
  '.a1.': '.a1.',
  '.a8.': '.a8.',
  '.aa.': '.aa.',
  '.z0.': '.z0.',

  'tr.notification-gdpr.': 'tr.notification-gdpr.',
  'target.footlocker.': 'target.footlocker.',

  'tags.calvinklein.': 'tags.calvinklein.',
  'tr.communication.': 'tr.communication.',
  'tr.serviceclient.': 'tr.serviceclient.',
  'track.msadcenter.': 'track.msadcenter.',

  'images.response.': 'images.response.',
  'thegreatesthits.': 'thegreatesthits.',
  'tr.recouvrement.': 'tr.recouvrement.',

  'rechenschieber.': 'rechenschieber.',
  'tr.devisminute-': 'tr.devisminute-',
  'tr.information.': 'tr.information.',
  'welcome.item24.': 'welcome.item24.',

  'securemetrics.': 'securemetrics.',
  'ss.tacklebait.': 'ss.tacklebait.',
  'strack.concur.': 'strack.concur.',
  'tr.newsletter.': 'tr.newsletter.',

  'app.response.': 'app.response.',
  'load.metrics.': 'load.metrics.',
  'seniorliving.': 'seniorliving.',
  'tetd.douglas.': 'tetd.douglas.',
  'tk.airfrance.': 'tk.airfrance.',
  'web.sensilab.': 'web.sensilab.',
  'webanalytics.': 'webanalytics.',

  'advertising.': 'advertising.',
  'images.info.': 'images.info.',
  'information.': 'information.',
  'load.server.': 'load.server.',
  'meta-events.': 'meta-events.',
  'serverstape.': 'serverstape.',
  'syndication.': 'syndication.',
  'target.vwfs.': 'target.vwfs.',
  'tr.emailing.': 'tr.emailing.',
  'trackingssl.': 'trackingssl.',

  'affiliates.': 'affiliates.',
  'ainu.intel.': 'ainu.intel.',
  'has-ticket.': 'has-ticket.',
  'innovation.': 'innovation.',
  'oascentral.': 'oascentral.',
  'securetags.': 'securetags.',
  'serverside.': 'serverside.',
  'spoluprace.': 'spoluprace.',
  'statistics.': 'statistics.',
  'statistiek.': 'statistiek.',
  'tagmanager.': 'tagmanager.',
  'target.pwc.': 'target.pwc.',
  'tr.contact.': 'tr.contact.',
  'tr.gestion.': 'tr.gestion.',
  'tr.welcome.': 'tr.welcome.',

  'collector.': 'collector.',
  'gtmserver.': 'gtmserver.',
  'gtmserver.': 'gtmserver.',
  'images.go.': 'images.go.',
  'internalt.': 'internalt.',
  'jfdfvprfq.': 'jfdfvprfq.',
  'load.data.': 'load.data.',
  'load.dwga.': 'load.dwga.',
  'load.sgtm.': 'load.sgtm.',
  'marketing.': 'marketing.',
  'plausible.': 'plausible.',
  's.tectake.': 's.tectake.',
  'sa.adidas.': 'sa.adidas.',
  'saa.dyson.': 'saa.dyson.',
  'servergtm.': 'servergtm.',
  'solutions.': 'solutions.',
  'somniture.': 'somniture.',
  'startrekk.': 'startrekk.',
  'statistik.': 'statistik.',
  'telemetry.': 'telemetry.',
  'tracking1.': 'tracking1.',
  'tracking2.': 'tracking2.',
  'tracklabs.': 'tracklabs.',
  'web.email.': 'web.email.',
  'yerbalist.': 'yerbalist.',

  'activate.': 'activate.',
  'adserver.': 'adserver.',
  'api.blog.': 'api.blog.',
  'app.info.': 'app.info.',
  'appleapp.': 'appleapp.',
  'boutique.': 'boutique.',
  'images.e.': 'images.e.',
  'insights.': 'insights.',
  'load.api.': 'load.api.',
  'load.ggl.': 'load.ggl.',
  'load.gtm.': 'load.gtm.',
  'load.sst.': 'load.sst.',
  'partneri.': 'partneri.',
  'redtrack.': 'redtrack.',
  's.oticon.': 's.oticon.',
  'servidor.': 'servidor.',
  'smetrics.': 'smetrics.',
  'soloqmyl.': 'soloqmyl.',
  'stat-ssl.': 'stat-ssl.',
  'tr.email.': 'tr.email.',
  'tr.infos.': 'tr.infos.',
  'tracking.': 'tracking.',
  'ucjmncxp.': 'ucjmncxp.',
  'webstats.': 'webstats.',

  'ads-api.': 'ads-api.',
  'adserve.': 'adserve.',
  'answers.': 'answers.',
  'cookies.': 'cookies.',
  'httpdns.': 'httpdns.',
  'insight.': 'insight.',
  'knfssst.': 'knfssst.',
  'load.ss.': 'load.ss.',
  'measure.': 'measure.',
  'metrics.': 'metrics.',
  'repdata.': 'repdata.',
  'smetric.': 'smetric.',
  'stapeio.': 'stapeio.',
  'tagging.': 'tagging.',
  'tealm-c.': 'tealm-c.',
  'tr.info.': 'tr.info.',
  'tr.mail.': 'tr.mail.',
  'tr.news.': 'tr.news.',
  'tracker.': 'tracker.',
  'trkhinv.': 'trkhinv.',
  'webstat.': 'webstat.',

  'app.go.': 'app.go.',
  'data.a.': 'data.a.',
  'elqtrk.': 'elqtrk.',
  'hiuplq.': 'hiuplq.',
  'jdgtgb.': 'jdgtgb.',
  'load.a.': 'load.a.',
  'load.d.': 'load.d.',
  'load.s.': 'load.s.',
  'load.t.': 'load.t.',
  'logger.': 'logger.',
  'lpbhnv.': 'lpbhnv.',
  'metric.': 'metric.',
  'reklam.': 'reklam.',
  'sstgtm.': 'sstgtm.',
  'strack.': 'strack.',
  'sxjfhh.': 'sxjfhh.',
  'todeye.': 'todeye.',
  'tongji.': 'tongji.',
  'trckng.': 'trckng.',
  'trkcmb.': 'trkcmb.',
  'turaco.': 'turaco.',
  'veqvek.': 'veqvek.',
  'wbtrkk.': 'wbtrkk.',
  'xrnyhc.': 'xrnyhc.',
  'ydtzzw.': 'ydtzzw.',
  'ywrcqa.': 'ywrcqa.',

  '5xxvm.': '5xxvm.',
  'adsrv.': 'adsrv.',
  'affil.': 'affil.',
  'gcirm.': 'gcirm.',
  'gtmss.': 'gtmss.',
  'gtmss.': 'gtmss.',
  'links.': 'links.',
  'neoss.': 'neoss.',
  'somni.': 'somni.',
  'ssdda.': 'ssdda.',
  'ssl.o.': 'ssl.o.',
  'stape.': 'stape.',
  'stats.': 'stats.',
  'track.': 'track.',

  'adtd.': 'adtd.',
  'gtms.': 'gtms.',
  'info.': 'info.',
  'link.': 'link.',
  'mktg.': 'mktg.',
  'rsst.': 'rsst.',
  'rtrk.': 'rtrk.',
  'sanl.': 'sanl.',
  'sgtm.': 'sgtm.',
  'skbx.': 'skbx.',
  'stbg.': 'stbg.',
  'sw88.': 'sw88.',
  'tatu.': 'tatu.',
  'tccd.': 'tccd.',
  'tdep.': 'tdep.',
  'tptd.': 'tptd.',
  'trck.': 'trck.',
  'tttd.': 'tttd.',
  'tvtd.': 'tvtd.',
  'utiq.': 'utiq.',
  'wctr.': 'wctr.',
  'wdss.': 'wdss.',
  'wttd.': 'wttd.',

  'abc.': 'abc.',
  'ggl.': 'ggl.',
  'gss.': 'gss.',
  'gtm.': 'gtm.',
  't-s.': 't-s.',
  'tr1.': 'tr1.',
  'trk.': 'trk.',
  'tss.': 'tss.',
  'ttt.': 'ttt.',
  'w88.': 'w88.',

  'click-eu-v4.': 'click-eu-v4.',
  'click-v4.': 'click-v4.',

  'rtb-useast-v4.': 'rtb-useast-v4.',
  'rtb-uswest-v4.': 'rtb-uswest-v4.',
  'rtb-apac-v4.': 'rtb-apac-v4.',
  'rtb-apac.': 'rtb-apac.',
  'rtb2-useast.': 'rtb2-useast.',
  'rtb2-uswest.': 'rtb2-uswest.',
  'rtb-useast.': 'rtb-useast.',
  'rtb-uswest.': 'rtb-uswest.',
  'rtb-eu-v4.': 'rtb-eu-v4.',
  'rtb-eu.': 'rtb-eu.',

  'adbsmetrics.': 'adbsmetrics.',
  'adbmetrics.': 'adbmetrics.',
  'analytics.': 'analytics.',
  'ablink.': 'ablink.',
  'adebis.': 'adebis.',
  'a8clk.': 'a8clk.',
  'a8cv.': 'a8cv.',

  'xml-eu-v4.': 'xml-eu-v4.',
  'xml-eu.': 'xml-eu.',
  'xml-v4.': 'xml-v4.',

  'analytics-': 'analytics-',
  'tracking-': 'tracking-',
  'tr.news-': 'tr.news-',
  'tracker-': 'tracker-',
  'test-': 'test-',
  'xn--': 'xn--'
};
const MIXTUREWHITELIST = {
  // 重写处理
  'weibointl.api.weibo.cn': 'weibointl.api.weibo.cn',
  'sdkapp.uve.weibo.com': 'sdkapp.uve.weibo.com',
  // 官网网站
  'umami.is': 'umami.is'
};
const RESOURCES = {
  REJECTMIXTURE: {
    FILENAME: 'element.ref.reject.mixture.ini',
    SRC: [
      '../temp/Block_HTTPDNS.txt',
      '../temp/BlockAdvertisers.txt',
      '../temp/Remove_Ads_By_Kelee.txt',
      'https://loon.103516.xyz/Rule/PCDN.lsr',
      'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyPrivacy.list',
      'https://raw.githubusercontent.com/app2smile/rules/master/rule/bilibili-ad-qx.list',
      'https://raw.githubusercontent.com/app2smile/rules/master/rule/tieba-ad-qx.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rewrite/QuantumultX/BlockHTTPDNS/BlockHTTPDNS.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ZhihuAds/ZhihuAds.list',
      'https://raw.githubusercontent.com/Cats-Team/AdRules/main/qx.conf',
      'https://raw.githubusercontent.com/ConnersHua/RuleGo/master/Surge/Ruleset/Extra/Reject/Advertising.list',
      'https://raw.githubusercontent.com/ConnersHua/RuleGo/master/Surge/Ruleset/Extra/Reject/Malicious.list',
      'https://raw.githubusercontent.com/ConnersHua/RuleGo/master/Surge/Ruleset/Extra/Reject/Tracking.list',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.reject.customs.ini',
      'https://raw.githubusercontent.com/firehol/blocklist-ipsets/master/firehol_level1.netset',
      'https://raw.githubusercontent.com/fmz200/wool_scripts/main/Loon/rule/rejectAd.list',
      'https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Filter/AdBlock.list',
      'https://raw.githubusercontent.com/GMOogway/shadowrocket-rules/master/sr_reject_list.module',
      'https://raw.githubusercontent.com/ishowshu/qx/main/filter/pdd.snippet',
      'https://raw.githubusercontent.com/Johnshall/Shadowrocket-ADBlock-Rules-Forever/release/sr_ad_only.conf',
      'https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/QuantumultX/rule/Adblock4limbo.list',
      'https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/QuantumultX/rule/BanAD.list',
      'https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/reject.txt',
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
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.apples.customs.ini',
      'https://raw.githubusercontent.com/QuixoticHeart/rule-set/ruleset/quantumultx/apple-cn.list',
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
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.direct.customs.ini',
      'https://raw.githubusercontent.com/Loyalsoldier/geoip/release/surge/cn.txt',
      'https://raw.githubusercontent.com/Loyalsoldier/geoip/release/surge/private.txt',
      'https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/private.txt',
      'https://raw.githubusercontent.com/QuixoticHeart/rule-set/ruleset/quantumultx/microsoft-cn.list',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/ip/lan.conf'
    ],
    MAPFN: mapMixture
  },
  GLOBALMIXTURE: {
    FILENAME: 'element.ref.global.mixture.ini',
    SRC: [
      '../temp/Prevent_DNS_Leaks.txt',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Adobe/Adobe.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Docker/Docker.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/GitHub/GitHub.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Google/Google.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Instagram/Instagram.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/LinkedIn/LinkedIn.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Reddit/Reddit.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Twitter/Twitter.list',
      'https://raw.githubusercontent.com/Coldvvater/Mononoke/master/Surge/Rules/AppleProxy.list',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.global.customs.ini',
      'https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/telegramcidr.txt',
      'https://raw.githubusercontent.com/QuixoticHeart/rule-set/ruleset/quantumultx/apns.list',
      'https://raw.githubusercontent.com/QuixoticHeart/rule-set/ruleset/quantumultx/apple-proxy.list',
      'https://raw.githubusercontent.com/QuixoticHeart/rule-set/ruleset/quantumultx/microsoft.list',
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
      'https://raw.githubusercontent.com/ddgksf2013/Filter/master/AppleIntelligence.list',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.openai.customs.ini',
      'https://raw.githubusercontent.com/fmz200/wool_scripts/main/Loon/rule/AI.list',
      'https://raw.githubusercontent.com/QuixoticHeart/rule-set/ruleset/quantumultx/ai.list',
      'https://raw.githubusercontent.com/SukkaW/Surge/master/Source/non_ip/ai.conf',
      'https://raw.githubusercontent.com/viewer12/OverseasAI.list/main/rule/QuantumultX/OverseasAI/OverseasAI.list'
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
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.stream.customs.ini',
      'https://raw.githubusercontent.com/QuixoticHeart/rule-set/ruleset/quantumultx/apple-tv.list',
      'https://ruleset.skk.moe/List/ip/stream.conf',
      'https://ruleset.skk.moe/List/non_ip/stream.conf'
    ],
    MAPFN: mapMixture
  },
  TIKTOKMIXTURE: {
    FILENAME: 'element.ref.tiktok.mixture.ini',
    SRC: [
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/TikTok/TikTok.list',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.tiktok.customs.ini',
      'https://raw.githubusercontent.com/Semporia/TikTok-Unlock/master/Quantumult-X/TikTok.list'
    ],
    MAPFN: mapMixture
  }
};
(async () => {
  for await (const key of Object.keys(RESOURCES)) {
    console.log(`>>> ${key}`.padEnd(92), '开始处理 <<<'.padStart(12));
    const RAW = await getResourses(RESOURCES[key]);
    const RES = combineResourses(RAW);
    await writeResourses2File(RES);
    console.log(`>>> ${key}`.padEnd(92), '处理完成 <<<'.padStart(12));
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
  } catch (error) {
    throw error;
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
        'User-Agent': 'Loon/3.5.0 (iPhone17,1; iOS 26.5.2)'
      };
      if (
        src.startsWith('https://release-assets.githubusercontent.com') ||
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
      let res = null;
      if (src.startsWith('https://')) {
        res = await fetch(src, {
          method: 'GET',
          cache: 'no-store',
          credentials: 'include',
          headers
        });
      } else {
        const filePath = resolve(dirname(fileURLToPath(import.meta.url)), src);
        const fileContent = await readFile(filePath, 'utf8');
        res = new Response(fileContent);
      }
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
        console.error(`    ${key}`.padEnd(92), `加载失败 >>>`.padStart(12));
      }
    } catch (error) {
      throw error;
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
      `    ${key}`.padEnd(92),
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
  const RES = Object.keys(RAWRULE).sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );
  console.log(`    ${FILENAME}`.padEnd(92), RES.length.toString().padStart(12));
  return {
    FILENAME,
    RES
  };
}
function generateRule(textPure = '') {
  const blockList = Object.entries(MIXTUREBLOCKLIST);
  for (let index = 0; index < blockList.length; index++) {
    const [key, value] = blockList[index];
    const matcher =
      key.endsWith('.') || key.endsWith('-')
        ? String.prototype.includes
        : String.prototype.endsWith;
    const rule =
      key.endsWith('.') || key.endsWith('-') ? 'HOST-KEYWORD' : 'HOST-SUFFIX';
    if (matcher.call(textPure, key)) {
      return `${rule},${value}`;
    }
  }
  return '';
}
function mapMixture(text = '') {
  const textTemp = text.replace(/#.*/gim, '').replace(/ /gim, '').trim();
  const textPure = (textTemp.split(',')[1] || '')
    .replace(/^\.|\.$/gim, '')
    .replace(/\/\/.*/gim, '')
    .trim();
  // 删除注释
  if (
    textPure.startsWith('"^ht') ||
    textPure.endsWith('.arpa') ||
    textTemp.includes('-NO-DROP') ||
    textTemp.includes('acl4.ssr') ||
    textTemp.includes('skk.moe') ||
    textTemp.includes('sukkaw') ||
    textTemp.startsWith('||') ||
    textTemp.startsWith('! ') ||
    textTemp.startsWith('#') ||
    textTemp.startsWith('/') ||
    textTemp.startsWith('[') ||
    textTemp.startsWith(';') ||
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
    // 经过转换，URL-REGEX 似乎不被支持
    return '';
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
    // 经过转换，URL-REGEX 似乎不被支持
    return '';
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
