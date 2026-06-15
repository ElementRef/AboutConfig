// 2026/6/16 07:03:50 https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/ddgksf2013.startup.ithome.js
var obj=JSON.parse($response.body);obj.data.list=Object.values(obj.data.list).filter(e=>e.feedContent.flag!=2),$done({body:JSON.stringify(obj)});
