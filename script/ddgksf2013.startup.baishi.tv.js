// 2026/6/5 06:22:49 https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/ddgksf2013.startup.baishi.tv.js
var obj=JSON.parse($response.body);obj.dt.data=Object.values(obj.dt.data).filter(e=>e.jumpTypeString.indexOf("\u5E7F\u544A")===-1),$done({body:JSON.stringify(obj)});
