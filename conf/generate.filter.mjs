import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const MIXTUREBLOCKLIST = {
  // '.cc': 'cc', 部分静态资源托管
  '.ga': 'ga',
  '.gq': 'gq',
  '.tk': 'tk',

  '.bid': 'bid',
  '.biz': 'biz',
  '.cfd': 'cfd',
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
  // '.mobi': 'mobi', 叮咚买菜加载失败
  '.qpon': 'qpon',
  '.rest': 'rest',
  '.shop': 'shop',
  '.site': 'site',
  '.work': 'work',

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

  '.51y5.net': '51y5.net',
  '.7eer.net': '7eer.net',
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

  '.012dadaa06.com': '012dadaa06.com',
  '.0214217ebc.com': '0214217ebc.com',
  '.02672653a1.com': '02672653a1.com',
  '.03c4e4cc73.com': '03c4e4cc73.com',
  '.04b9055b2a.com': '04b9055b2a.com',
  '.04e8c7346f.com': '04e8c7346f.com',
  '.05f3b6b187.com': '05f3b6b187.com',
  '.065b6e69b5.com': '065b6e69b5.com',
  '.0737ebd153.com': '0737ebd153.com',
  '.07a243cfe3.com': '07a243cfe3.com',
  '.07a243cfe3.com': '07a243cfe3.com',
  '.08082c0ad5.com': '08082c0ad5.com',
  '.0a57f6bbfd.com': '0a57f6bbfd.com',
  '.0c174010e1.com': '0c174010e1.com',
  '.0cf7482770.com': '0cf7482770.com',
  '.0e4a4c9e4e.com': '0e4a4c9e4e.com',
  '.0ed35fac92.com': '0ed35fac92.com',
  '.0fbee846c6.com': '0fbee846c6.com',
  '.1270533dea.com': '1270533dea.com',
  '.12a2101ae7.com': '12a2101ae7.com',
  '.1338f95c76.com': '1338f95c76.com',
  '.134df17ee1.com': '134df17ee1.com',
  '.13b1e60d7e.com': '13b1e60d7e.com',
  '.1426ab7568.com': '1426ab7568.com',
  '.171c856581.com': '171c856581.com',
  '.18df009b06.com': '18df009b06.com',
  '.1c3139f0ca.com': '1c3139f0ca.com',
  '.1f26db4741.com': '1f26db4741.com',
  '.1f2c6ca393.com': '1f2c6ca393.com',
  '.1fd9bb65c7.com': '1fd9bb65c7.com',
  '.20590def33.com': '20590def33.com',
  '.2156f5cc76.com': '2156f5cc76.com',
  '.21b95312a1.com': '21b95312a1.com',
  '.21c69b70bc.com': '21c69b70bc.com',
  '.223001ca2c.com': '223001ca2c.com',
  '.23f30d7ca1.com': '23f30d7ca1.com',
  '.2533555ba6.com': '2533555ba6.com',
  '.26a840907b.com': '26a840907b.com',
  '.27ec4b6fcf.com': '27ec4b6fcf.com',
  '.28c15cf09c.com': '28c15cf09c.com',
  '.28dafd89fb.com': '28dafd89fb.com',
  '.2c8eb505eb.com': '2c8eb505eb.com',
  '.2e3f31faae.com': '2e3f31faae.com',
  '.2f6dc696ee.com': '2f6dc696ee.com',
  '.30c69e6975.com': '30c69e6975.com',
  '.30e7ff2c41.com': '30e7ff2c41.com',
  '.30ea3091fb.com': '30ea3091fb.com',
  '.331f7bf198.com': '331f7bf198.com',
  '.3387b76be8.com': '3387b76be8.com',
  '.339fee097c.com': '339fee097c.com',
  '.33cd95e164.com': '33cd95e164.com',
  '.34b1c2d6f9.com': '34b1c2d6f9.com',
  '.35c82e35f3.com': '35c82e35f3.com',
  '.36a1652b0f.com': '36a1652b0f.com',
  '.36a7b00c00.com': '36a7b00c00.com',
  '.37bf116186.com': '37bf116186.com',
  '.381a8b362e.com': '381a8b362e.com',
  '.38a6848c49.com': '38a6848c49.com',
  '.396d8aaa17.com': '396d8aaa17.com',
  '.399a0014f6.com': '399a0014f6.com',
  '.3a1ebd5d26.com': '3a1ebd5d26.com',
  '.3b8e4eb36d.com': '3b8e4eb36d.com',
  '.3b9d481d08.com': '3b9d481d08.com',
  '.3bfff8a34d.com': '3bfff8a34d.com',
  '.3d6a6c3707.com': '3d6a6c3707.com',
  '.3d721db5a7.com': '3d721db5a7.com',
  '.3e0d59c264.com': '3e0d59c264.com',
  '.3f38ffbdb5.com': '3f38ffbdb5.com',
  '.3f56937492.com': '3f56937492.com',
  '.415f764d57.com': '415f764d57.com',
  '.41e67cacf7.com': '41e67cacf7.com',
  '.43201617eb.com': '43201617eb.com',
  '.43a0e1ae69.com': '43a0e1ae69.com',
  '.448176042f.com': '448176042f.com',
  '.4498a6bb1e.com': '4498a6bb1e.com',
  '.44cd912290.com': '44cd912290.com',
  '.4514559af9.com': '4514559af9.com',
  '.453f8e0630.com': '453f8e0630.com',
  '.47757e9455.com': '47757e9455.com',
  '.47ae11ce2f.com': '47ae11ce2f.com',
  '.48727e9a60.com': '48727e9a60.com',
  '.48cd631c5c.com': '48cd631c5c.com',
  '.48f39e1095.com': '48f39e1095.com',
  '.4920b177cb.com': '4920b177cb.com',
  '.4a1dcfa305.com': '4a1dcfa305.com',
  '.4b0541a1c9.com': '4b0541a1c9.com',
  '.4b1eec4734.com': '4b1eec4734.com',
  '.4bc588417b.com': '4bc588417b.com',
  '.4c4a520279.com': '4c4a520279.com',
  '.4f1e5419a2.com': '4f1e5419a2.com',
  '.4f9fbf3477.com': '4f9fbf3477.com',
  '.51fb350e23.com': '51fb350e23.com',
  '.52cd1a4545.com': '52cd1a4545.com',
  '.540484935e.com': '540484935e.com',
  '.540729f005.com': '540729f005.com',
  '.548f23e472.com': '548f23e472.com',
  '.54a73dbcb6.com': '54a73dbcb6.com',
  '.56ac3c29f3.com': '56ac3c29f3.com',
  '.57fafe08ba.com': '57fafe08ba.com',
  '.5813e74b18.com': '5813e74b18.com',
  '.5852e7a452.com': '5852e7a452.com',
  '.5a5751fd6a.com': '5a5751fd6a.com',
  '.5b4c971817.com': '5b4c971817.com',
  '.5c2b54416a.com': '5c2b54416a.com',
  '.5c384e999a.com': '5c384e999a.com',
  '.5cd9ca94fb.com': '5cd9ca94fb.com',
  '.5d4d1bb29b.com': '5d4d1bb29b.com',
  '.5dede791d0.com': '5dede791d0.com',
  '.5e14ab617d.com': '5e14ab617d.com',
  '.5e3d5f480f.com': '5e3d5f480f.com',
  '.5ea748c035.com': '5ea748c035.com',
  '.5ec1d56c09.com': '5ec1d56c09.com',
  '.602e8edafd.com': '602e8edafd.com',
  '.60e9de5082.com': '60e9de5082.com',
  '.60ecf22b99.com': '60ecf22b99.com',
  '.61fe2d132b.com': '61fe2d132b.com',
  '.634263882b.com': '634263882b.com',
  '.638e922b9c.com': '638e922b9c.com',
  '.63b3c3ecc2.com': '63b3c3ecc2.com',
  '.64236b1b40.com': '64236b1b40.com',
  '.64980aaffd.com': '64980aaffd.com',
  '.65ae01603e.com': '65ae01603e.com',
  '.660d588959.com': '660d588959.com',
  '.680e6a23f1.com': '680e6a23f1.com',
  '.685ba1f62e.com': '685ba1f62e.com',
  '.689fe98d0d.com': '689fe98d0d.com',
  '.6957b6e1fc.com': '6957b6e1fc.com',
  '.69b22afb80.com': '69b22afb80.com',
  '.69c3736082.com': '69c3736082.com',
  '.6a3c31f670.com': '6a3c31f670.com',
  '.6a7eac2034.com': '6a7eac2034.com',
  '.6ad4e650c2.com': '6ad4e650c2.com',
  '.6b8381c695.com': '6b8381c695.com',
  '.6cde8b5544.com': '6cde8b5544.com',
  '.6d1e5b5068.com': '6d1e5b5068.com',
  '.6dbc7ad876.com': '6dbc7ad876.com',
  '.6dca8ddc4d.com': '6dca8ddc4d.com',
  '.6e64d84de7.com': '6e64d84de7.com',
  '.6ff38f6d1b.com': '6ff38f6d1b.com',
  '.7416e71cb8.com': '7416e71cb8.com',
  '.75fcdb0acb.com': '75fcdb0acb.com',
  '.760a131226.com': '760a131226.com',
  '.7878ba0587.com': '7878ba0587.com',
  '.7898a9d175.com': '7898a9d175.com',
  '.790e74d0c5.com': '790e74d0c5.com',
  '.794bbcc998.com': '794bbcc998.com',
  '.79fb811d53.com': '79fb811d53.com',
  '.7a28c1843f.com': '7a28c1843f.com',
  '.7c1569a605.com': '7c1569a605.com',
  '.7d2f96eee0.com': '7d2f96eee0.com',
  '.7d7a497317.com': '7d7a497317.com',
  '.7d909fb540.com': '7d909fb540.com',
  '.7fa28aad94.com': '7fa28aad94.com',
  '.7fae5b3e9c.com': '7fae5b3e9c.com',
  '.82067251a6.com': '82067251a6.com',
  '.8231e5c33a.com': '8231e5c33a.com',
  '.83c6db1e10.com': '83c6db1e10.com',
  '.841eda195c.com': '841eda195c.com',
  '.847ab3dcab.com': '847ab3dcab.com',
  '.856d79ad49.com': '856d79ad49.com',
  '.880a6212c5.com': '880a6212c5.com',
  '.8af0229830.com': '8af0229830.com',
  '.8b023d788d.com': '8b023d788d.com',
  '.8c0afb75cd.com': '8c0afb75cd.com',
  '.8dc714cafe.com': '8dc714cafe.com',
  '.8e111120ff.com': '8e111120ff.com',
  '.8fb13633f6.com': '8fb13633f6.com',
  '.900f3c4717.com': '900f3c4717.com',
  '.92ab2d5ac3.com': '92ab2d5ac3.com',
  '.9334fb3562.com': '9334fb3562.com',
  '.9365e2dd1f.com': '9365e2dd1f.com',
  '.944ef08b40.com': '944ef08b40.com',
  '.95625cabb9.com': '95625cabb9.com',
  '.9579ae0d4a.com': '9579ae0d4a.com',
  '.95ce9fb0ff.com': '95ce9fb0ff.com',
  '.97f477047f.com': '97f477047f.com',
  '.98ab3242f8.com': '98ab3242f8.com',
  '.9a57160d5c.com': '9a57160d5c.com',
  '.9a8f641701.com': '9a8f641701.com',
  '.9b6aa87a81.com': '9b6aa87a81.com',
  '.9f91b59591.com': '9f91b59591.com',
  '.a02e31b105.com': 'a02e31b105.com',
  '.a06c9a4dd7.com': 'a06c9a4dd7.com',
  '.a07ccac956.com': 'a07ccac956.com',
  '.a0948db4ee.com': 'a0948db4ee.com',
  '.a0d1e378d8.com': 'a0d1e378d8.com',
  '.a0d3dd0c89.com': 'a0d3dd0c89.com',
  '.a23debcead.com': 'a23debcead.com',
  '.a27fac55e0.com': 'a27fac55e0.com',
  '.a2e5b82fea.com': 'a2e5b82fea.com',
  '.a41ffeba4a.com': 'a41ffeba4a.com',
  '.a567dda4c2.com': 'a567dda4c2.com',
  '.a61bc11442.com': 'a61bc11442.com',
  '.a8659ff8d6.com': 'a8659ff8d6.com',
  '.a8ca394de0.com': 'a8ca394de0.com',
  '.a910d264c4.com': 'a910d264c4.com',
  '.a94a20f718.com': 'a94a20f718.com',
  '.a9684972c2.com': 'a9684972c2.com',
  '.aaee5b74e1.com': 'aaee5b74e1.com',
  '.ab0c2e9694.com': 'ab0c2e9694.com',
  '.abb030d6a7.com': 'abb030d6a7.com',
  '.ac359edaf2.com': 'ac359edaf2.com',
  '.ad42309dd4.com': 'ad42309dd4.com',
  '.aff15e203a.com': 'aff15e203a.com',
  '.b0e81fb2f1.com': 'b0e81fb2f1.com',
  '.b0f01ce38a.com': 'b0f01ce38a.com',
  '.b0ff04e647.com': 'b0ff04e647.com',
  '.b173280abe.com': 'b173280abe.com',
  '.b1733e915d.com': 'b1733e915d.com',
  '.b27d2d191d.com': 'b27d2d191d.com',
  '.b29b70e3ca.com': 'b29b70e3ca.com',
  '.b40d52efb7.com': 'b40d52efb7.com',
  '.b4a03471a7.com': 'b4a03471a7.com',
  '.b73f89c4ab.com': 'b73f89c4ab.com',
  '.b8763ae795.com': 'b8763ae795.com',
  '.b8bd2d84d4.com': 'b8bd2d84d4.com',
  '.c09cc9353f.com': 'c09cc9353f.com',
  '.c11a6baa3f.com': 'c11a6baa3f.com',
  '.c33fd93ed8.com': 'c33fd93ed8.com',
  '.c40e234db8.com': 'c40e234db8.com',
  '.c501fc4637.com': 'c501fc4637.com',
  '.c6073077cc.com': 'c6073077cc.com',
  '.c63b91ca50.com': 'c63b91ca50.com',
  '.c7f39565a8.com': 'c7f39565a8.com',
  '.c84c10fe3d.com': 'c84c10fe3d.com',
  '.c8841fd6e9.com': 'c8841fd6e9.com',
  '.c8aae076f1.com': 'c8aae076f1.com',
  '.c922d888f7.com': 'c922d888f7.com',
  '.caf44f3d39.com': 'caf44f3d39.com',
  '.cb60ba1dce.com': 'cb60ba1dce.com',
  '.cbfb239585.com': 'cbfb239585.com',
  '.cbfb239585.com': 'cbfb239585.com',
  '.cd6b9b5aa4.com': 'cd6b9b5aa4.com',
  '.cda84af905.com': 'cda84af905.com',
  '.cea95c1acd.com': 'cea95c1acd.com',
  '.ced8c68532.com': 'ced8c68532.com',
  '.cf20334dc1.com': 'cf20334dc1.com',
  '.cf25ba90cc.com': 'cf25ba90cc.com',
  '.cf6fae15c3.com': 'cf6fae15c3.com',
  '.cfabf1ef11.com': 'cfabf1ef11.com',
  '.d033093f1f.com': 'd033093f1f.com',
  '.d1e223a9f2.com': 'd1e223a9f2.com',
  '.d1f6bb22dc.com': 'd1f6bb22dc.com',
  '.d29776df3a.com': 'd29776df3a.com',
  '.d333f13060.com': 'd333f13060.com',
  '.d3c6339ed7.com': 'd3c6339ed7.com',
  '.d3d30ac9d4.com': 'd3d30ac9d4.com',
  '.d4bd4c34af.com': 'd4bd4c34af.com',
  '.d57b6d1e63.com': 'd57b6d1e63.com',
  '.d591f0b765.com': 'd591f0b765.com',
  '.d77155313b.com': 'd77155313b.com',
  '.d79dcdbf0a.com': 'd79dcdbf0a.com',
  '.da1b05834d.com': 'da1b05834d.com',
  '.dba1bc1fdf.com': 'dba1bc1fdf.com',
  '.dd268fdaa5.com': 'dd268fdaa5.com',
  '.dd795a9d50.com': 'dd795a9d50.com',
  '.dec0c1a14f.com': 'dec0c1a14f.com',
  '.dec1daff38.com': 'dec1daff38.com',
  '.e230ae5c2b.com': 'e230ae5c2b.com',
  '.e25b585b36.com': 'e25b585b36.com',
  '.e2d8db7931.com': 'e2d8db7931.com',
  '.e336cd5f3c.com': 'e336cd5f3c.com',
  '.e3a9997095.com': 'e3a9997095.com',
  '.e3eb6c71e7.com': 'e3eb6c71e7.com',
  '.e452be28aa.com': 'e452be28aa.com',
  '.e55a2001b9.com': 'e55a2001b9.com',
  '.e5a0add388.com': 'e5a0add388.com',
  '.e5ad8b54ee.com': 'e5ad8b54ee.com',
  '.e608df03d6.com': 'e608df03d6.com',
  '.e69c935570.com': 'e69c935570.com',
  '.e6c84e5378.com': 'e6c84e5378.com',
  '.e7d783f480.com': 'e7d783f480.com',
  '.e918781f38.com': 'e918781f38.com',
  '.ea32481d6e.com': 'ea32481d6e.com',
  '.eda4dc1ffe.com': 'eda4dc1ffe.com',
  '.ee30f51e20.com': 'ee30f51e20.com',
  '.eeb201e6da.com': 'eeb201e6da.com',
  '.f014b13156.com': 'f014b13156.com',
  '.f07a0277a7.com': 'f07a0277a7.com',
  '.f29c4af968.com': 'f29c4af968.com',
  '.f4cd8a8bf0.com': 'f4cd8a8bf0.com',
  '.f8d348c0aa.com': 'f8d348c0aa.com',
  '.f9fd639740.com': 'f9fd639740.com',
  '.fa29c88413.com': 'fa29c88413.com',
  '.faeaeeaafa.com': 'faeaeeaafa.com',
  '.fb53d9afaf.com': 'fb53d9afaf.com',
  '.fef49e81cc.com': 'fef49e81cc.com',
  '.ff35f7a0b5.com': 'ff35f7a0b5.com',

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

  'webcontr.': 'webcontr.',
  'web.mapp.': 'web.mapp.',
  'web.news.': 'web.news.',

  '.celebratevitamins.': '.celebratevitamins.',
  '.autoscout24.': '.autoscout24.',
  '.onofficeom.': '.onofficeom.',
  '.www.': '.www.',
  '.xn--': '.xn--',

  'welcome.item24.': 'welcome.item24.',
  'strack.concur.': 'strack.concur.',
  'web.sensilab.': 'web.sensilab.',
  'webanalytics.': 'webanalytics.',

  'rtb-useast-v4.': 'rtb-useast-v4.',
  'rtb-uswest-v4.': 'rtb-uswest-v4.',
  'rtb-apac-v4.': 'rtb-apac-v4.',
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

  '5xxvm.': '5xxvm.'
};
const MIXTUREWHITELIST = {
  // 静态资源
  'byteimg.com': 'byteimg.com',
  's.weibo.com': 's.weibo.com',
  // 重写处理
  'optimus-ads.amap.com': 'optimus-ads.amap.com',
  'sdkapp.uve.weibo.com': 'sdkapp.uve.weibo.com',
  'weibointl.api.weibo.cn': 'weibointl.api.weibo.cn',
  // 泄露检测
  'browserleaks.com': 'browserleaks.com',
  'ipleak.net': 'ipleak.net',
  // 官网网站
  'juejin.cn': 'juejin.cn',
  'umami.is': 'umami.is'
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
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.apples.custom.ini',
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
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.direct.custom.ini',
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
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Adobe/Adobe.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Docker/Docker.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/GitHub/GitHub.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Google/Google.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Instagram/Instagram.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/LinkedIn/LinkedIn.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Reddit/Reddit.list',
      'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Twitter/Twitter.list',
      'https://raw.githubusercontent.com/Coldvvater/Mononoke/master/Surge/Rules/AppleProxy.list',
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.global.custom.ini',
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
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.openai.custom.ini',
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
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.stream.custom.ini',
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
      'https://raw.githubusercontent.com/ElementRef/AboutConfig/main/filter/element.ref.tiktok.custom.ini',
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
    const matcher = key.endsWith('.')
      ? String.prototype.includes
      : String.prototype.endsWith;
    const rule = key.endsWith('.') ? 'HOST-KEYWORD' : 'HOST-SUFFIX';
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
