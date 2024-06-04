// https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/app2smile.spotify.json.js
let url=$request.url;url.includes("platform=iphone")&&(url=url.replace(/platform=iphone/,"platform=ipad"));$done({url});
