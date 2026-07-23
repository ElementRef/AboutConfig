// 2026/7/23 15:10:40 https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/ddgksf2013.startup.baishi.tv.js
var obj=JSON.parse($response.body);obj.dt.data=Object.values(obj.dt.data).filter(e=>e.jumpTypeString.indexOf("广告")===-1),$done({body:JSON.stringify(obj)});
