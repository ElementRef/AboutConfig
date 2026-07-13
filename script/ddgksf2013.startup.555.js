// 2026/7/14 05:59:53 https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/ddgksf2013.startup.555.js
let obj=JSON.parse($response.body);obj.data=obj.data.filter(t=>t.layout!=="advert_self"),obj.data.forEach(t=>{t.list=t.list.filter(a=>a.type!==3)}),$done({body:JSON.stringify(obj)});
