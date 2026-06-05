// 2026/6/6 06:17:38 https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/ddgksf2013.startup.ithome.js
var obj=JSON.parse($response.body);obj.data.list=Object.values(obj.data.list).filter(e=>e.feedContent.flag!=2),$done({body:JSON.stringify(obj)});
