// 2026/7/7 09:19:20 https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/ddgksf2013.startup.baishi.tv.js
var obj=JSON.parse($response.body);obj.dt.data=Object.values(obj.dt.data).filter(e=>e.jumpTypeString.indexOf("广告")===-1),$done({body:JSON.stringify(obj)});
