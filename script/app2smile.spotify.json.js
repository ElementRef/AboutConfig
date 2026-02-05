// 2026/2/6 05:34:19 https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/app2smile.spotify.json.js
let url=$request.url;url.includes("com:443")&&(url=url.replace(/com:443/,"com"));url.includes("platform=iphone")&&(url=url.replace(/platform=iphone/,"platform=ipad"));$done({url});
