// 2026/3/5 05:38:40 https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/ddgksf2013.startup.umetrip.js
var ua=$request.headers.rpid||$request.headers.Rpid;ua.includes("10000012")||ua.includes("1000019")?$done({status:"HTTP/1.1 404 Not Found"}):$done({});
