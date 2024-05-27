// https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Rewrite/bstar.js
let e = $request.body;
(e = e.replace(/&sim_code=\d+/, '&sim_code=51503')),
  (e = e.replace(/&locale=zh_CN/, '&locale=zh_PH')),
  (e = e.replace(/&s_locale=zh-Hans_[A-Z]{2}/, '&s_locale=zh-Hans_PH')),
  $done({ body: e });
