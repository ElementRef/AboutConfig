// 2026/7/3 06:10:37 https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/ddgksf2013.startup.caixin.js
var body=$response.body.replace(/sday":"[^"]*"/g,'sday":"2029-12-01 00:00:00"').replace(/eday":"[^"]*"/g,'eday":"2029-12-30 00:00:00"').replace(/intval":\d/g,'intval":0');$done({body});
