// 2026/6/15 06:16:04 https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/ddgksf2013.startup.qidian.js
var obj=JSON.parse($response.body);const propertiesToDelete=["ads2","adSource2","third"];for(const o of propertiesToDelete)obj.data?.[o]&&(obj.data[o]={});$done({body:JSON.stringify(obj)});
