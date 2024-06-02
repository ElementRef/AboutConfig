// https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/ddgksf2013.startup.jd.js
(()=>{var x=JSON.parse($response.body);$request.url.indexOf("hotWords")!==-1&&(x.hotwords={},x.tabs={},delete x.abver);$request.url.indexOf("hotSearchTerms")!==-1&&(x.topData.data={},x.data={});$done({body:JSON.stringify(x)});})();
