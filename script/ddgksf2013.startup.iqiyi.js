// https://raw.githubusercontent.com/ddgksf2013/Scripts/master/iqiyi_open_ads.js
let e = JSON.parse($response.body);
delete e.adSlots, $done({ body: JSON.stringify(e) });
