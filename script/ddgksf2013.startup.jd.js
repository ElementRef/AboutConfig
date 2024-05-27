// https://raw.githubusercontent.com/ddgksf2013/Scripts/master/jd_json.js
var e = JSON.parse($response.body);
-1 !== $request.url.indexOf('hotWords') &&
  ((e.hotwords = {}), (e.tabs = {}), delete e.abver),
  -1 !== $request.url.indexOf('hotSearchTerms') &&
    ((e.topData.data = {}), (e.data = {})),
  $done({ body: JSON.stringify(e) });
