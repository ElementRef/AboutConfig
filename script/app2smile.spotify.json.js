// https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/app2smile.spotify.json.js
(()=>{var o=$request.url;o.includes("platform=iphone")&&(o=o.replace(/platform=iphone/,"platform=ipad"));$done({url:o});})();
