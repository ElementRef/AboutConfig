// https://raw.githubusercontent.com/ddgksf2013/Scripts/master/hanglvzongheng.js
var e = $request.headers.rpid || $request.headers.Rpid;
e.includes('10000012') || e.includes('1000019')
  ? $done({ status: 'HTTP/1.1 404 Not Found' })
  : $done({});
