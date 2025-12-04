// 2025/12/5 05:23:13 https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/ddgksf2013.startup.sf.js
if($request.url.indexOf("app/ad/queryInfoFlow")!=-1){var ddgksf2013=JSON.parse($response.body);ddgksf2013.obj=Object.values(ddgksf2013.obj).filter(e=>e.adverId==2833),$done({body:JSON.stringify(ddgksf2013)})}
