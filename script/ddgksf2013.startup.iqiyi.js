// https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/ddgksf2013.startup.iqiyi.js
let obj=JSON.parse($response.body);delete obj.adSlots,$done({body:JSON.stringify(obj)});
