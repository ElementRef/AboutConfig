// https://raw.githubusercontent.com/ddgksf2013/Scripts/master/12306.js
var e = JSON.parse($request.body),
  a = {};
'0007' == e.placementNo
  ? ((a.materialsList = [
      { billMaterialsId: '6491', filePath: 'ddgksf2013', creativeType: 1 }
    ]),
    (a.advertParam = { skipTime: 1 }),
    (a.code = '00'))
  : (a =
      'G0054' == e.placementNo
        ? { code: '00', materialsList: [{}] }
        : { code: '00', message: '无广告返回' }),
  $done({ body: JSON.stringify(a) });
