// 2026/3/22 05:29:46 https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/ddgksf2013.startup.umetrip.js
var ua=$request.headers.rpid||$request.headers.Rpid;ua.includes("10000012")||ua.includes("1000019")?$done({status:"HTTP/1.1 404 Not Found"}):$done({});
