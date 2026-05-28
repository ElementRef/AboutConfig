// 2026/5/29 06:41:48 https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/ddgksf2013.startup.baishi.tv.js
var obj=JSON.parse($response.body);obj.dt.data=Object.values(obj.dt.data).filter(e=>e.jumpTypeString.indexOf("\u5E7F\u544A")===-1),$done({body:JSON.stringify(obj)});
