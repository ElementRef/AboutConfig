// Thu Jun 12 2025 21:21:46 GMT+0000 (Coordinated Universal Time) https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/app2smile.spotify.json.js
let url=$request.url;url.includes("platform=iphone")&&(url=url.replace(/platform=iphone/,"platform=ipad"));$done({url});
