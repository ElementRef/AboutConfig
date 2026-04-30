// 2026/4/30 19:35:45 https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/ddgksf2013.startup.zhihu.js
var body=$response.body.replace(/img_play_duration\\":\d+/g,'img_play_duration":0').replace(/launch_timeout\\":\d+/g,'launch_timeout":0');$done({body});
