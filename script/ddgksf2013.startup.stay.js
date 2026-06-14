// 2026/6/15 06:16:04 https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/ddgksf2013.startup.stay.js
let ddgksf2013=JSON.parse($response.body);ddgksf2013.biz&&(ddgksf2013.biz=Object.values(ddgksf2013.biz).filter(e=>e.type!="promoted"));$done({body:JSON.stringify(ddgksf2013)});
