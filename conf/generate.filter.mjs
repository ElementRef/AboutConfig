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
  '.myqcloud.com': 'myqcloud.com',
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
  'a.munters.': 'a.munters',
  'a.perfumesclub.': 'a.perfumesclub',
  'a.weareknitters.': 'a.weareknitters',
  'a8.www.': 'a8.www',
  'a8clk.cart.': 'a8clk.cart',
  'a8clk.cv.': 'a8clk.cv',
  'a8clk.shop.': 'a8clk.shop',
  'a8clk.www.': 'a8clk.www',
  'a8cv.store.': 'a8cv.store',
  'a8cv.www.': 'a8cv.www',
  'aa-metrics.': 'aa-metrics',
  'aa.dyson.': 'aa.dyson',
  'ablink.email.': 'ablink.email',
  'ablink.info.': 'ablink.info',
  'ablink.mail.': 'ablink.mail',
  'ablink.marketing.': 'ablink.marketing',
  'ablink.news.': 'ablink.news',
  'act-on-marketing.': 'act-on-marketing',
  'ad.kissanime.': 'ad.kissanime',
  'ad.kisscartoon.': 'ad.kisscartoon',
  'adobe.autoscout24.': 'adobe.autoscout24',
  'adobeanalytics.': 'adobeanalytics',
  'adobemetrics.yellohvillage.': 'adobemetrics.yellohvillage',
  'adobetarget.yellohvillage.': 'adobetarget.yellohvillage',
  'ads.tripod.': 'ads.tripod',
  'adserver.janes.': 'adserver.janes',
  'adtarget.fcbarcelona.': 'adtarget.fcbarcelona',
  'adtd.douglas.': 'adtd.douglas',
  'adtd.parfumdreams.': 'adtd.parfumdreams',
  'affiliate.lentiamo.': 'affiliate.lentiamo',
  'ainu.intel.': 'ainu.intel',
  'aiq-in.': 'aiq-in',
  'analytics.cartoonnetwork.': 'analytics.cartoonnetwork',
  'analytics.cyrillus.': 'analytics.cyrillus',
  'analytics.komoder.': 'analytics.komoder',
  'analytics.metro.': 'analytics.metro',
  'analytics.midas.': 'analytics.midas',
  'analytics.nordea.': 'analytics.nordea',
  'analytics.pipelife.': 'analytics.pipelife',
  'analytics.saketos.': 'analytics.saketos',
  'analytics.sixt.': 'analytics.sixt',
  'analytics.tnt-tv.': 'analytics.tnt-tv',
  'analytics.tntsports.': 'analytics.tntsports',
  'analytics.wienerberger.': 'analytics.wienerberger',
  'anmeldung.promatis.': 'anmeldung.promatis',
  'answers.teradata.': 'answers.teradata',
  'app-test.': 'app-test',
  'application.ricoh.': 'application.ricoh',
  'asd.bauhaus.': 'asd.bauhaus',
  'ask.antalis.': 'ask.antalis',
  'att.trk.': 'att.trk',
  'br.ac.': 'br.ac',
  'btaconnect.americanexpress.': 'btaconnect.americanexpress',
  'btaenrolment.americanexpress.': 'btaenrolment.americanexpress',
  'click-eu-v4.': 'click-eu-v4',
  'click-v4.': 'click-v4',
  'click.easycosmetic.': 'click.easycosmetic',
  'click.email.': 'click.email',
  'click.mail.': 'click.mail',
  'cname-aa.': 'cname-aa',
  'cname-ade.': 'cname-ade',
  'collect.calvinklein.': 'collect.calvinklein',
  'collector-pxebumdlwe.': 'collector-pxebumdlwe',
  'collector-pxrf8vapwa.': 'collector-pxrf8vapwa',
  'collector.betway.': 'collector.betway',
  'cookies.jll.': 'cookies.jll',
  'cztexz.cashbackdeals.': 'cztexz.cashbackdeals',
  'cztexz.ladycashback.': 'cztexz.ladycashback',
  'da.hornbach.': 'da.hornbach',
  'data-nl.': 'data-nl',
  'data-ssl.stepstone.': 'data-ssl.stepstone',
  'data.campaigns.': 'data.campaigns',
  'data.comunicaciones.': 'data.comunicaciones',
  'data.customermail.': 'data.customermail',
  'data.decathlon.': 'data.decathlon',
  'data.em.': 'data.em',
  'data.fans.': 'data.fans',
  'data.hinweis.': 'data.hinweis',
  'data.iviskin.': 'data.iviskin',
  'data.loyality.': 'data.loyality',
  'data.mistat.': 'data.mistat',
  'data.mktg.': 'data.mktg',
  'data.stepstone.': 'data.stepstone',
  'data.umfrage.': 'data.umfrage',
  'data.vertrag.': 'data.vertrag',
  'dc.stenaline.': 'dc.stenaline',
  'dcs.esprit.': 'dcs.esprit',
  'dhpjhrud.aktivvinter.': 'dhpjhrud.aktivvinter',
  'dhpjhrud.aktivwinter.': 'dhpjhrud.aktivwinter',
  'di.ifolor.': 'di.ifolor',
  'dialogue.mazda.': 'dialogue.mazda',
  'digital.adt.': 'digital.adt',
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
  'dl-test.': 'dl-test',
  'dogo.intel.': 'dogo.intel',
  'e.gettyimages.': 'e.gettyimages',
  'ea.greenweez.': 'ea.greenweez',
  'ea.millet-mountain.': 'ea.millet-mountain',
  'ea.vente-unique.': 'ea.vente-unique',
  'ebis-tracking.': 'ebis-tracking',
  'ed.emp-shop.': 'ed.emp-shop',
  'ed.emp.': 'ed.emp',
  'eloqua.pearsonvue.': 'eloqua.pearsonvue',
  'elq.mouser.': 'elq.mouser',
  'elq.scanningpens.': 'elq.scanningpens',
  'elqtrk.intel.': 'elqtrk.intel',
  'elqtrk.morningstar.': 'elqtrk.morningstar',
  'email-am.jll.': 'email-am.jll',
  'email-ap.jll.': 'email-ap.jll',
  'email-cm.jll.': 'email-cm.jll',
  'email-em.jll.': 'email-em.jll',
  'email.everyonesocial.': 'email.everyonesocial',
  'engage.3m.': 'engage.3m',
  'et.electronic4you.': 'et.electronic4you',
  'etracker.louis-moto.': 'etracker.louis-moto',
  'etracker.louis.': 'etracker.louis',
  'eulerian.tgv-europe.': 'eulerian.tgv-europe',
  'events.just-eat.': 'events.just-eat',
  'filter-eu.': 'filter-eu',
  'fpa-cdn.': 'fpa-cdn',
  'fpa-events.': 'fpa-events',
  'gcwubi.happypancake.': 'gcwubi.happypancake',
  'get-staging.': 'get-staging',
  'get-test.': 'get-test',
  'get.ukg.': 'get.ukg',
  'gfdlnadm.georgjensen-damask.': 'gfdlnadm.georgjensen-damask',
  'go-test.': 'go-test',
  'go.hager.': 'go.hager',
  'gss.skatepro.': 'gss.skatepro',
  'gtm.bricoflor.': 'gtm.bricoflor',
  'gtm.elithair.': 'gtm.elithair',
  'gtm.neckermann-nordic.': 'gtm.neckermann-nordic',
  'gtm.proff.': 'gtm.proff',
  'gtm.villavilla.': 'gtm.villavilla',
  'hinfogzi.sinful.': 'hinfogzi.sinful',
  'hiuplq.flashscore.': 'hiuplq.flashscore',
  'hm.baidu.com.': 'hm.baidu.com',
  'images.campaign.': 'images.campaign',
  'images.connect.': 'images.connect',
  'images.demand.': 'images.demand',
  'images.e.': 'images.e',
  'images.engage.': 'images.engage',
  'images.info.': 'images.info',
  'images.learn.': 'images.learn',
  'images.mailaway.': 'images.mailaway',
  'images.marketing.': 'images.marketing',
  'img.foodspring.': 'img.foodspring',
  'info.lexisnexis.': 'info.lexisnexis',
  'itkdlu.howrse.': 'itkdlu.howrse',
  'itservices.ricoh.': 'itservices.ricoh',
  'jdgtgb.': 'jdgtgb',
  'k.brandalley.': 'k.brandalley',
  'k.laredoute.': 'k.laredoute',
  'k.voyageursdumonde.': 'k.voyageursdumonde',
  'kitxllaf.mecindo.': 'kitxllaf.mecindo',
  'kkznoe.autouncle.': 'kkznoe.autouncle',
  'krcurxzl.soundboks.': 'krcurxzl.soundboks',
  'link-test.': 'link-test',
  'links-dev.': 'links-dev',
  'links.commercialemails.': 'links.commercialemails',
  'links.e.': 'links.e',
  'links.info.': 'links.info',
  'links.justfab.': 'links.justfab',
  'live-eu.': 'live-eu',
  'load.a.': 'load.a',
  'load.analy.': 'load.analy',
  'load.analytics.': 'load.analytics',
  'load.bct1.': 'load.bct1',
  'load.d.': 'load.d',
  'load.dt.': 'load.dt',
  'load.eua.trailerplus.': 'load.eua.trailerplus',
  'load.f1.': 'load.f1',
  'load.gegevens.': 'load.gegevens',
  'load.gspwicky.': 'load.gspwicky',
  'load.gtm.': 'load.gtm',
  'load.innovation.': 'load.innovation',
  'load.krcurxzl.': 'load.krcurxzl',
  'load.mtgs.': 'load.mtgs',
  'load.s.': 'load.s',
  'load.server.': 'load.server',
  'load.serverside.': 'load.serverside',
  'load.sgtm.': 'load.sgtm',
  'load.side.': 'load.side',
  'load.somos.': 'load.somos',
  'load.ss.': 'load.ss',
  'load.ssgtm.': 'load.ssgtm',
  'load.sst.': 'load.sst',
  'load.sstm.': 'load.sstm',
  'load.stape.': 'load.stape',
  'load.stsv.': 'load.stsv',
  'load.swm.': 'load.swm',
  'lpbhnv.': 'lpbhnv',
  'ltsveh.wetteronline.': 'ltsveh.wetteronline',
  'lu9xve2c97l898gjjxv4.': 'lu9xve2c97l898gjjxv4',
  'mail.dolce-gusto.': 'mail.dolce-gusto',
  'marketing.net.': 'marketing.net',
  'mds.ricoh.': 'mds.ricoh',
  'meta-events.': 'meta-events',
  'metric.nissan.': 'metric.nissan',
  'metric.volkswagen.': 'metric.volkswagen',
  'metrics.americanairlines.': 'metrics.americanairlines',
  'metrics.bbva.': 'metrics.bbva',
  'metrics.citibank.': 'metrics.citibank',
  'metrics.egencia.': 'metrics.egencia',
  'metrics.ionos.': 'metrics.ionos',
  'metrics.lululemon.': 'metrics.lululemon',
  'metrics.nissan.': 'metrics.nissan',
  'metrics.timberland.': 'metrics.timberland',
  'metrics.vodafone.': 'metrics.vodafone',
  'metrics.vwfs.': 'metrics.vwfs',
  'mi.miliboo.': 'mi.miliboo',
  'my.11teamsports.': 'my.11teamsports',
  'my.top4fitness.': 'my.top4fitness',
  'my.top4football.': 'my.top4football',
  'my.top4running.': 'my.top4running',
  'my.weplaybasketball.': 'my.weplaybasketball',
  'my.weplayhandball.': 'my.weplayhandball',
  'my.weplayvolleyball.': 'my.weplayvolleyball',
  'net.jumia.': 'net.jumia',
  'omt.dm.': 'omt.dm',
  'onlineshop.ricoh.': 'onlineshop.ricoh',
  'origin.www.': 'origin.www',
  'ot.obi.': 'ot.obi',
  'otr.kaspersky.': 'otr.kaspersky',
  'pages.comunicaciones.': 'pages.comunicaciones',
  'pbox.photobox.': 'pbox.photobox',
  'rechenschieber.transfermarkt.': 'rechenschieber.transfermarkt',
  'rtb-apac-v4.': 'rtb-apac-v4',
  'rtb-apac.': 'rtb-apac',
  'rtb-eu-v4.': 'rtb-eu-v4',
  'rtb-eu.': 'rtb-eu',
  'rtb-useast-v4.': 'rtb-useast-v4',
  'rtb-useast.': 'rtb-useast',
  'rtb-uswest-v4.': 'rtb-uswest-v4',
  'rtb-uswest.': 'rtb-uswest',
  'rtb2-useast.': 'rtb2-useast',
  'rtk.trk.': 'rtk.trk',
  'sa.adidas.': 'sa.adidas',
  'saa.dyson.': 'saa.dyson',
  'sanalytics.boomerangtv.': 'sanalytics.boomerangtv',
  'sanalytics.cartoonito.': 'sanalytics.cartoonito',
  'sanalytics.cartoonnetwork.': 'sanalytics.cartoonnetwork',
  'sanl.footlocker.': 'sanl.footlocker',
  'scookies-adobe.': 'scookies-adobe',
  'secureanalytics.avis.': 'secureanalytics.avis',
  'secureanalytics.budget.': 'secureanalytics.budget',
  'securecookies.dustin.': 'securecookies.dustin',
  'securecookies.dustinhome.': 'securecookies.dustinhome',
  'securecookiesdustininfo.dustin.': 'securecookiesdustininfo.dustinhome',
  'securecookiesdustininfo.dustinhome.': 'securecookiesdustininfo.dustinhome',
  'securetags.esri.': 'securetags.esri',
  'simg.interhome.': 'simg.interhome',
  'smetrics.alfalaval.': 'smetrics.alfalaval',
  'smetrics.bayer.': 'smetrics.bayer',
  'smetrics.bbva.': 'smetrics.bbva',
  'smetrics.boehringer-ingelheim.': 'smetrics.boehringer-ingelheim',
  'smetrics.casino.': 'smetrics.casino',
  'smetrics.kone.': 'smetrics.kone',
  'smetrics.marketing.': 'smetrics.marketing',
  'smetrics.msccruises.': 'smetrics.msccruises',
  'smetrics.pwc.': 'smetrics.pwc',
  'smetrics.schindler.': 'smetrics.schindler',
  'smetrics.sony.': 'smetrics.sony',
  'smetrics.viega.': 'smetrics.viega',
  'ss.coloreurope.': 'ss.coloreurope',
  'ss.thecozysheep.': 'ss.thecozysheep',
  'ssa.eurosport.': 'ssa.eurosport',
  'ssa.tameson.': 'ssa.tameson',
  'ssc.nick.': 'ssc.nick',
  'ssc.nickelodeon.': 'ssc.nickelodeon',
  'ssl.o.': 'ssl.o',
  'sslanalytics.sixt.': 'sslanalytics.sixt',
  'sst.notbranded.': 'sst.notbranded',
  'sst.onedirect.': 'sst.onedirect',
  'sstats.fishersci.': 'sstats.fishersci',
  'sstats.seat.': 'sstats.seat',
  'sstats.tiffany.': 'sstats.tiffany',
  'stape.euroelectronics.': 'stape.euroelectronics',
  'starget.intel.': 'starget.intel',
  'stats.tena.': 'stats.tena',
  'stats.tork.': 'stats.tork',
  'stbg.stanbicbank.': 'stbg.stanbicbank',
  'stbg.standardbank.': 'stbg.standardbank',
  'strack.concur.': 'strack.concur',
  'sw88.24kitchen.': 'sw88.24kitchen',
  'sw88.disney.': 'sw88.disney',
  'sw88.shopdisney.': 'sw88.shopdisney',
  'swa.millesima.': 'swa.millesima',
  'swasc.kaufland.': 'swasc.kaufland',
  't.antalis.': 't.antalis',
  't.dilling.': 't.dilling',
  't.locasun.': 't.locasun',
  'tags.calvinklein.': 'tags.calvinklein',
  'target.footlocker.': 'target.footlocker',
  'target.pwc.': 'target.pwc',
  'target.sunlife.': 'target.sunlife',
  'target.vwfs.': 'target.vwfs',
  'tccd.douglas.': 'tccd.douglas',
  'tealm-c.': 'tealm-c',
  'tidy.intel.': 'tidy.intel',
  'tk.airfrance.': 'tk.airfrance',
  'tk.santevet.': 'tk.santevet',
  'tk.tikamoon.': 'tk.tikamoon',
  'tq-eu.': 'tq-eu',
  'tr.btobquotes.': 'tr.btobquotes',
  'tr.clients.': 'tr.clients',
  'tr.communication.': 'tr.communication',
  'tr.emailing.': 'tr.emailing',
  'tr.gestion.': 'tr.gestion',
  'tr.info.': 'tr.info',
  'tr.information.': 'tr.information',
  'tr.infos.': 'tr.infos',
  'tr.newsletter.': 'tr.newsletter',
  'tr.notification-gdpr.': 'tr.notification-gdpr',
  'tr.notification.': 'tr.notification',
  'tr.serviceclient.': 'tr.serviceclient',
  'tracking.janssenmedicalcloud.': 'tracking.janssenmedicalcloud',
  'tracking.ssab.': 'tracking.ssab',
  'tracking.stihl.': 'tracking.stihl',
  'trail.thomsonreuters.': 'trail.thomsonreuters',
  'trck.info.': 'trck.info',
  'trkcmb.business.': 'trkcmb.business',
  'trkgbm.business.': 'trkgbm.business',
  'trkhinv.business.': 'trkhinv.business',
  'trksvg.business.': 'trksvg.business',
  'tttd.douglas.': 'tttd.douglas',
  'tttd.parfumdreams.': 'tttd.parfumdreams',
  'twjobq.sixt.': 'twjobq.sixt',
  'uat1-dc.': 'uat1-dc',
  'ugdcxl.timeout.': 'ugdcxl.timeout',
  'wct.softonic.': 'wct.softonic',
  'web.care.': 'web.care',
  'web.e.': 'web.e',
  'web.mapp.': 'web.mapp',
  'web.sensilab.': 'web.sensilab',
  'web.slimjoy.': 'web.slimjoy',
  'web.tummytox.': 'web.tummytox',
  'win-rtb2-useast.': 'win-rtb2-useast',
  'www91.intel.': 'www91.intel',
  'x-eu.': 'x-eu',
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
  'static-s.iqiyi.com': 'static-s.iqiyi.com', // 爱奇艺静态资源
  'staticsns.cdn.bcebos.com': 'staticsns.cdn.bcebos.com', // 百度静态资源
  'umami.is': 'umami.is' // Umami 官网
};
const RESOURCES = {
  REJECTMIXTURE: {
    FILENAME: 'element.ref.reject.mixture.ini',
    SRC: [
      'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyPrivacy.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ZhihuAds/ZhihuAds.list',
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
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Reddit/Reddit.list',
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
  } else if (
    /^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^::([\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){2}:([\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^:((:[\da-fA-F]{1,4}){1,6}|:)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$|^([\da-fA-F]{1,4}:){6}:(\/([1-9]?\d|(1([0-1]\d|2[0-8]))))?$/gim.test(
      textTemp
    )
  ) {
    if (MIXTUREWHITELIST[textTemp]) {
      return '';
    }
    return `IP6-CIDR,${textTemp}`;
  } else {
    return '';
  }
}
