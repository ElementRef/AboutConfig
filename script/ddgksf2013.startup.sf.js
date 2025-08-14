// Thu Aug 14 2025 10:36:18 GMT+0000 (Coordinated Universal Time) https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/ddgksf2013.startup.sf.js
if($request.url.indexOf("app/ad/queryInfoFlow")!=-1){var ddgksf2013=JSON.parse($response.body);ddgksf2013.obj=Object.values(ddgksf2013.obj).filter(e=>e.adverId==2833),$done({body:JSON.stringify(ddgksf2013)})}
