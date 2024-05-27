// https://raw.githubusercontent.com/app2smile/rules/master/js/spotify-json.js
let e = $request.url;
e.includes('platform=iphone') &&
  (e = e.replace(/platform=iphone/, 'platform=ipad')),
  $done({ url: e });
