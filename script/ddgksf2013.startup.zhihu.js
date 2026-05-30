// 2026/5/31 06:03:03 https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/ddgksf2013.startup.zhihu.js
var body=$response.body.replace(/img_play_duration\\":\d+/g,'img_play_duration":0').replace(/launch_timeout\\":\d+/g,'launch_timeout":0');$done({body});
