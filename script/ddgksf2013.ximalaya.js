// https://raw.githubusercontent.com/ddgksf2013/Scripts/master/ximalaya_json.js
let e = $response.body;
if (e) {
  switch (!0) {
    case /discovery-category\/customCategories/.test($request.url):
      try {
        let t = JSON.parse(e);
        t.customCategoryList &&
          (t.customCategoryList = t.customCategoryList.filter(
            e =>
              ('recommend' == e.itemType ||
                'template_category' == e.itemType ||
                'single_category' == e.itemType) &&
              1005 !== e.categoryId
          )),
          t.defaultTabList &&
            (t.defaultTabList = t.defaultTabList.filter(
              e =>
                ('recommend' == e.itemType ||
                  'template_category' == e.itemType ||
                  'single_category' == e.itemType) &&
                1005 !== e.categoryId
            )),
          (e = JSON.stringify(t));
      } catch (e) {}
      break;
    case /discovery-category\/v\d\/category/.test($request.url):
      try {
        let t = JSON.parse(e);
        t.focusImages &&
          t.focusImages.data &&
          (t.focusImages.data = t.focusImages.data.filter(
            e => -1 != e.realLink.indexOf('open') && !e.isAd
          )),
          (e = JSON.stringify(t));
      } catch (e) {}
      break;
    case /focus-mobile\/focusPic/.test($request.url):
      try {
        let t = JSON.parse(e);
        t.header &&
          t.header.length <= 1 &&
          (t.header[0].item.list[0].data = t.header[0].item.list[0].data.filter(
            e => -1 != e.realLink.indexOf('open') && !e.isAd
          )),
          (e = JSON.stringify(t));
      } catch (e) {}
      break;
    case /discovery-feed\/v\d\/mix/.test($request.url):
      try {
        let t = JSON.parse(e);
        2 == t.header?.length && delete t.header[0],
          (t.body = t.body.filter(
            e =>
              !(
                e.item?.adInfo ||
                'mix_ad' == e.item?.moduleType ||
                'bigCard' == e.displayClass
              )
          )),
          (e = JSON.stringify(t));
      } catch (e) {}
      break;
    case /mobile-user\/v\d\/homePage/.test($request.url):
      try {
        let t = new Set([210, 213, 215]),
          a = JSON.parse(e);
        if (a.data.serviceModule.entrances) {
          let e = a.data.serviceModule.entrances.filter(e => t.has(e.id));
          a.data.serviceModule.entrances = e;
        }
        e = JSON.stringify(a);
      } catch (e) {}
      break;
    default:
      $done({});
  }
  $done({ body: e });
} else $done({});
