// https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/ddgksf2013.startup.sf.js
(()=>{$request.url.indexOf("app/ad/queryInfoFlow")!=-1&&(e=JSON.parse($response.body),e.obj=Object.values(e.obj).filter(r=>r.adverId==2833),$done({body:JSON.stringify(e)}));var e;})();
