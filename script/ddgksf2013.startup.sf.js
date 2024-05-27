// https://raw.githubusercontent.com/ddgksf2013/Scripts/master/shunfeng_json.js
if (-1 != $request.url.indexOf('app/ad/queryInfoFlow')) {
  var e = JSON.parse($response.body);
  (e.obj = Object.values(e.obj).filter(e => 2833 == e.adverId)),
    $done({ body: JSON.stringify(e) });
}
