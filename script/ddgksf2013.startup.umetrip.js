// 2026/2/17 05:33:28 https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/ddgksf2013.startup.umetrip.js
var ua=$request.headers.rpid||$request.headers.Rpid;ua.includes("10000012")||ua.includes("1000019")?$done({status:"HTTP/1.1 404 Not Found"}):$done({});
