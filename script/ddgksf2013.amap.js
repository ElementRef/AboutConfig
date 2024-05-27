// https://raw.githubusercontent.com/ddgksf2013/Scripts/master/amap.js
var e = JSON.parse($response.body);
if (-1 != $request.url.indexOf('valueadded/alimama/splash_screen')) {
  if (e.data && e.data.ad)
    for (let a of e.data.ad)
      (a.set.setting.display_time = 0),
        (a.creative[0].start_time = 2240150400),
        (a.creative[0].end_time = 2240150400);
  $done({ body: JSON.stringify(e) });
} else if (-1 != $request.url.indexOf('faas/amap-navigation/main-page'))
  e.data?.cardList &&
    (e.data.cardList = Object.values(e.data.cardList).filter(
      e => 'LoginCard' == e.dataType || 'FrequentLocation' == e.dataType
    )),
    e.data?.pull3?.msgs && (e.data.pull3.msgs = []),
    e.data?.business_position && (e.data.business_position = []),
    e.data?.mapBizList && (e.data.mapBizList = []),
    $done({ body: JSON.stringify(e) });
else if (-1 != $request.url.indexOf('profile/index/node'))
  delete e.data.tipData,
    e.data?.cardList &&
      (e.data.cardList = Object.values(e.data.cardList).filter(
        e => 'MyOrderCard' == e.dataType || 'GdRecommendCard' == e.dataType
      )),
    $done({ body: JSON.stringify(e) });
else if (-1 != $request.url.indexOf('new_hotword'))
  e.data?.header_hotword && (e.data.header_hotword = []),
    $done({ body: JSON.stringify(e) });
else if (-1 != $request.url.indexOf('ws/promotion-web/resource')) {
  let a = ['icon', 'banner', 'tips', 'popup', 'bubble', 'other'];
  for (let t of a) e.data?.[t] && (e.data[t] = []);
  $done({ body: JSON.stringify(e) });
} else if (-1 != $request.url.indexOf('ws/msgbox/pull'))
  e.msgs && (e.msgs = []),
    e.pull3?.msgs && (e.pull3.msgs = []),
    $done({ body: JSON.stringify(e) });
else if (-1 != $request.url.indexOf('ws/message/notice/list'))
  e.data?.noticeList && (e.data.noticeList = []),
    $done({ body: JSON.stringify(e) });
else if (-1 != $request.url.indexOf('ws/shield/frogserver/aocs')) {
  for (let a of [
    'gd_notch_logo',
    'home_business_position_config',
    'his_input_tip',
    'operation_layer'
  ])
    e.data?.[a] && (e.data[a] = { status: 1, version: '', value: '' });
  $done({ body: JSON.stringify(e) });
} else if (-1 != $request.url.indexOf('search/nearbyrec_smart')) {
  let a = [
    'coupon',
    'scene',
    'activity',
    'commodity_rec',
    'operation_activity'
  ];
  e.data &&
    (a.forEach(a => {
      delete e.data[a];
    }),
    e.data.modules &&
      (e.data.modules = e.data.modules.filter(e => !a.includes(e)))),
    $done({ body: JSON.stringify(e) });
} else $done({});
