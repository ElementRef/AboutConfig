// 2026/5/29 06:41:48 https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/ddgksf2013.startup.pupu.market.js
var obj=JSON.parse($response.body);obj.data&&(obj.data=Object.values(obj.data).filter(t=>!(t.position_type==320||t.position_type==710||t.position_type==50))),$done({body:JSON.stringify(obj)});
