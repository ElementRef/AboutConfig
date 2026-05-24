// 2026/5/24 10:11:19 https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/ddgksf2013.startup.ithome.js
var obj=JSON.parse($response.body);obj.data.list=Object.values(obj.data.list).filter(e=>e.feedContent.flag!=2),$done({body:JSON.stringify(obj)});
