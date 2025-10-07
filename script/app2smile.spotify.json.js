// Tue Oct 07 2025 21:18:42 GMT+0000 (Coordinated Universal Time) https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/app2smile.spotify.json.js
let url=$request.url;url.includes("com:443")&&(url=url.replace(/com:443/,"com"));url.includes("platform=iphone")&&(url=url.replace(/platform=iphone/,"platform=ipad"));$done({url});
