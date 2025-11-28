// 2025/11/29 05:19:49 https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/ddgksf2013.startup.jd.js
var puimCea1=JSON.parse($response.body);$request.url.indexOf("hotWords")!==-1&&(puimCea1.hotwords={},puimCea1.tabs={},delete puimCea1.abver);$request.url.indexOf("hotSearchTerms")!==-1&&(puimCea1.topData.data={},puimCea1.data={});$done({body:JSON.stringify(puimCea1)});
