// https://raw.githubusercontent.com/ddgksf2013/Scripts/master/coolapk.js
if (-1 != $request.url.indexOf('replyList'))
  (e = JSON.parse($response.body)).data.length &&
    (e.data = e.data.filter(e => e.id)),
    $done({ body: JSON.stringify(e) });
else if (-1 != $request.url.indexOf('main/init')) {
  (e = JSON.parse($response.body)).data.length &&
    (e.data = e.data.filter(e => !(945 == e.entityId || 6390 == e.entityId))),
    $done({ body: JSON.stringify(e) });
} else if (-1 != $request.url.indexOf('indexV8')) {
  ((e = JSON.parse($response.body)).data = e.data.filter(
    e =>
      !(
        'sponsorCard' == e.entityTemplate ||
        8639 == e.entityId ||
        29349 == e.entityId ||
        33006 == e.entityId ||
        32557 == e.entityId ||
        -1 != e.title.indexOf('值得买') ||
        -1 != e.title.indexOf('红包')
      )
  )),
    $done({ body: JSON.stringify(e) });
} else if (-1 != $request.url.indexOf('dataList')) {
  ((e = JSON.parse($response.body)).data = e.data.filter(
    e =>
      !('sponsorCard' == e.entityTemplate || -1 != e.title.indexOf('精选配件'))
  )),
    $done({ body: JSON.stringify(e) });
} else if (-1 != $request.url.indexOf('detail')) {
  var e = JSON.parse($response.body);
  e.data?.hotReplyRows?.length &&
    (e.data.hotReplyRows = e.data.hotReplyRows.filter(e => e.id)),
    e.data?.topReplyRows?.length &&
      (e.data.topReplyRows = e.data.topReplyRows.filter(e => e.id)),
    e.data?.include_goods_ids && (e.data.include_goods_ids = []),
    e.data?.include_goods && (e.data.include_goods = []),
    e.data?.detailSponsorCard && (e.data.detailSponsorCard = []),
    $done({ body: JSON.stringify(e) });
} else $done($response);
