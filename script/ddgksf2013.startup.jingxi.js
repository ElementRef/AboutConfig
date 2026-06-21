// 2026/6/22 06:16:24 https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/ddgksf2013.startup.jingxi.js
let obj=JSON.parse($response.body);/^https?:\/\/api\.m\.jd\.com\/api\?functionId=delivery_show/.test($request.url)&&(obj.data.materialList.startTime=36674768e5,obj.data.materialList.endTime=36679088e5);$done({body:JSON.stringify(obj)});
