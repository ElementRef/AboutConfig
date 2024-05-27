// https://raw.githubusercontent.com/ddgksf2013/Scripts/master/cainiao_json.js
var t = JSON.parse($response.body);
if (
  -1 !=
  $request.url.indexOf('mtop.cainiao.nbpresentation.protocol.homepage.get.cn')
)
  t.data?.result?.dataList?.length > 0 &&
    (t.data.result.dataList = t.data.result.dataList.filter(
      t => !('big_banner_area_v870' == t.type || 'todo_list_v860' == t.type)
    ));
else if (
  -1 !=
  $request.url.indexOf('mtop.cainiao.nbpresentation.homepage.merge.get.cn')
)
  for (let a = 0; a < 4; a++) {
    let e = `mtop.cainiao.nbpresentation.protocol.homepage.get.cn@${a}`;
    t.data?.[e]?.data?.result?.dataList?.length > 0 &&
      (t.data[e].data.result.dataList = t.data[e].data.result.dataList.filter(
        t => !('big_banner_area_v870' == t.type || 'todo_list_v860' == t.type)
      ));
  }
else
  -1 != $request.url.indexOf('mtop.cainiao.guoguo.nbnetflow.ads.mshow')
    ? (t.data[1308] && delete t.data[1308], t.data[1275] && delete t.data[1275])
    : -1 != $request.url.indexOf('mtop.cainiao.guoguo.nbnetflow.ads.index.cn')
    ? t.data?.result && (t.data.result = [{}])
    : -1 != $request.url.indexOf('mtop.cainiao.adkeyword') &&
      t.data?.result?.adHotKeywords &&
      (t.data.result.adHotKeywords = []);
var a = JSON.stringify(t);
$done({ body: a });
