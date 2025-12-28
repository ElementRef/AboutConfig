// 2025/12/29 05:22:05 https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/ddgksf2013.startup.v2ex.js
var body=$response.body.replace(/<head>/,`<head>
    <style>
      .sidebar_units,
      .sidebar_compliance,
      div[class^="wwads-"]{
        display: none !important;
      }
    </style>`);$done({body});
