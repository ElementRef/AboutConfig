import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const RESOURCES = {
  'app2smile.baidu.map.js':
    'https://raw.githubusercontent.com/app2smile/rules/master/js/baidumap.js',
  'app2smile.qidian.js':
    'https://raw.githubusercontent.com/app2smile/rules/master/js/qidian.js',
  'app2smile.qq.news.js':
    'https://raw.githubusercontent.com/app2smile/rules/master/js/qq-news.js',
  'app2smile.spotify.header.js':
    'https://raw.githubusercontent.com/app2smile/rules/master/js/spotify-qx-header.js',
  'app2smile.spotify.json.js':
    'https://raw.githubusercontent.com/app2smile/rules/master/js/spotify-json.js',
  'app2smile.spotify.proto.js':
    'https://raw.githubusercontent.com/app2smile/rules/master/js/spotify-proto.js',
  'app2smile.tieba.json.js':
    'https://raw.githubusercontent.com/app2smile/rules/master/js/tieba-json.js',
  'app2smile.tieba.proto.js':
    'https://raw.githubusercontent.com/app2smile/rules/master/js/tieba-proto.js',
  'bili.universe.adblock.request.js':
    'https://github.com/BiliUniverse/ADBlock/releases/latest/download/request.bundle.js',
  'bili.universe.adblock.response.js':
    'https://github.com/BiliUniverse/ADBlock/releases/latest/download/response.bundle.js',
  'bili.universe.enhanced.response.js':
    'https://github.com/BiliUniverse/Enhanced/releases/latest/download/response.bundle.js',
  'chavyleung.box.js':
    'https://raw.githubusercontent.com/chavyleung/scripts/master/chavy.box.js',
  'ddgksf2013.amap.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/amap.js',
  'ddgksf2013.amdc.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/amdc.js',
  'ddgksf2013.cai.niao.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/cainiao_json.js',
  'ddgksf2013.cai.yun.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/caiyun_json.js',
  'ddgksf2013.cloud.music.js':
    'https://gist.githubusercontent.com/ddgksf2013/4f53b7c6083678df25fecc8ff68b52c4/raw/netease.adblock.js',
  'ddgksf2013.red.book.js': 'https://ddgksf2013.top/scripts/redbook.ads.js',
  'ddgksf2013.server.info.pure.js':
    'https://ddgksf2013.top/scripts/server-info-pure.js',
  'ddgksf2013.smzdm.json.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/smzdm_json.js',
  'ddgksf2013.startup.12306.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/12306.js',
  'ddgksf2013.startup.123pan.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/123pan.js',
  'ddgksf2013.startup.555.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/555Ad.js',
  'ddgksf2013.startup.abchina.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/abchina.js',
  'ddgksf2013.startup.ahfs.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/ahfs.js',
  'ddgksf2013.startup.baishi.tv.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/baishitv.js',
  'ddgksf2013.startup.caixin.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/caixinads.js',
  'ddgksf2013.startup.coolapk.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/coolapk.js',
  'ddgksf2013.startup.dict.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/dict.js',
  // 文件中只包含了 JSON 数据，会被 esbuild 的 tree-shaking=true 完全优化掉
  'ddgksf2013.startup.dong.qiu.di.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/dongqiudi.js',
  'ddgksf2013.startup.fly.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/fly.js',
  'ddgksf2013.startup.hang.lv.zong.heng.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/hanglvzongheng.js',
  'ddgksf2013.startup.iqiyi.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/iqiyi_open_ads.js',
  'ddgksf2013.startup.ithome.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/ithome.js',
  'ddgksf2013.startup.jd.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/jd_json.js',
  'ddgksf2013.startup.jingxi.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/startup.js',
  'ddgksf2013.startup.ping.an.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/pinganads.js',
  'ddgksf2013.startup.pupu.market.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/pupumarket.js',
  'ddgksf2013.startup.qidian.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/qidian.js',
  'ddgksf2013.startup.quark.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/quark.js',
  'ddgksf2013.startup.sf.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/shunfeng_json.js',
  'ddgksf2013.startup.stay.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/stay.js',
  'ddgksf2013.startup.zhihu.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/zhihu_openads.js',
  'ddgksf2013.weibo.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/weibo_json.js',
  'ddgksf2013.ximalaya.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/ximalaya_json.js',
  'ddgksf2013.zhihu.js': 'https://ddgksf2013.top/scripts/zhihu.ads.js',
  'kop.xiao.ip.api.js':
    'https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/IP_API.js',
  'kop.xiao.resource.parser.js':
    'https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/resource-parser.js',
  'kop.xiao.streaming.ui.check.js':
    'https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/streaming-ui-check.js',
  'maasea.youtube.response.js':
    'https://raw.githubusercontent.com/Maasea/sgmodule/master/Script/Youtube/youtube.response.js',
  'nobyda.google.captcha.js':
    'https://raw.githubusercontent.com/NobyDa/Script/master/Surge/JS/Google_CAPTCHA.js',
  'sub.store.org.0.js':
    'https://github.com/sub-store-org/Sub-Store/releases/latest/download/sub-store-0.min.js',
  'sub.store.org.1.js':
    'https://github.com/sub-store-org/Sub-Store/releases/latest/download/sub-store-1.min.js',
  'sub.store.org.cron.sync.artifacts.js':
    'https://github.com/sub-store-org/Sub-Store/releases/latest/download/cron-sync-artifacts.min.js',
  'zirawell.ddxq.js':
    'https://raw.githubusercontent.com/zirawell/R-Store/main/Res/Scripts/AntiAd/ddxq.js',
  'zzpiglet.wechat.110.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/weixin110.js'
};
(async () => {
  await Promise.all(
    Object.entries(RESOURCES).map(
      async ([FILENAME, SRC]) => await getResoursesToLocal({ FILENAME, SRC })
    )
  );
  const PATH = fileURLToPath(import.meta.url);
  const TMPPATH = resolve(dirname(PATH), `../tmp`);
  const TMPFILES = await readdir(TMPPATH);
  await Promise.all(
    TMPFILES.map(async TMPFILE => await useESBuildToScriptDir(TMPFILE))
  );
})();
async function getResoursesToLocal({ FILENAME, SRC }) {
  try {
    console.log(`>>> ${FILENAME}`.padEnd(96), '开始下载 <<<'.padStart(12));
    const headers = {
      'Accept-Language': 'en-US',
      'Content-Type': 'text/plain',
      'User-Agent': 'Surge macOS/1663'
    };
    if (
      SRC.startsWith('https://patch-diff.githubusercontent.com') ||
      SRC.startsWith('https://avatars.githubusercontent.com') ||
      SRC.startsWith('https://camo.githubusercontent.com') ||
      SRC.startsWith('https://gist.githubusercontent.com') ||
      SRC.startsWith('https://raw.githubusercontent.com') ||
      SRC.startsWith('https://github.githubassets.com') ||
      SRC.startsWith('https://api.github.com') ||
      SRC.startsWith('https://github.com')
    ) {
      headers.Authorization = `Bearer ${process.env.GH_TOKEN}`;
    }
    const RES = await fetch(SRC, {
      method: 'GET',
      cache: 'no-store',
      credentials: 'include',
      headers
    });
    if (RES.ok) {
      const TEXT = await RES.text();
      const PATH = fileURLToPath(import.meta.url);
      const TMPPATH = resolve(dirname(PATH), `../tmp`);
      const TMPISEXIST = existsSync(TMPPATH);
      if (!TMPISEXIST) {
        await mkdir(TMPPATH, { recursive: true });
      }
      await writeFile(resolve(TMPPATH, `./${FILENAME}`), TEXT);
      console.log(`>>> ${FILENAME}`.padEnd(96), '下载完成 <<<'.padStart(12));
    } else {
      console.error(`>>> ${FILENAME}`.padEnd(96), '下载失败 >>>'.padStart(12));
    }
  } catch (error) {
    throw error;
  }
}
async function useESBuildToScriptDir(TMPFILE) {
  return new Promise((resolveFn, rejectFn) => {
    console.log(`>>> ${TMPFILE}`.padEnd(96), '开始压缩 <<<'.padStart(12));
    const DIRNAME = dirname(fileURLToPath(import.meta.url));
    const SCRIPTPATH = resolve(DIRNAME, `../script`);
    const TMPFILEPATH = resolve(DIRNAME, `../tmp/${TMPFILE}`);
    const ESBUILDSPAWN = spawn(`esbuild`, [
      `${TMPFILEPATH}`,
      '--allow-overwrite',
      '--drop:console',
      '--drop:debugger',
      '--legal-comments=none',
      '--minify',
      '--tree-shaking=true',
      `--banner:js=// ${new Date().toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai'
      })} https://raw.githubusercontent.com/ElementRef/AboutConfig/main/script/${TMPFILE}`,
      `--outdir=${SCRIPTPATH}`
    ]);
    ESBUILDSPAWN.on('close', code => {
      console.log(`>>> ${TMPFILE}`.padEnd(96), '压缩完成 <<<'.padStart(12));
      resolveFn(code);
    });
    ESBUILDSPAWN.on('error', error => {
      console.error(`>>> ${TMPFILE}`.padEnd(96), '压缩失败 >>>'.padStart(12));
      rejectFn(error);
    });
  });
}
