// https://raw.githubusercontent.com/ddgksf2013/Scripts/master/v2ex.js
var n = $response.body.replace(
  /<head>/,
  '<head>\n    <style>\n      .sidebar_units,\n      .sidebar_compliance,\n      div[class^="wwads-"]{\n        display: none !important;\n      }\n    </style>'
);
$done({ body: n });
