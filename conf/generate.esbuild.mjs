import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const RESOURCES = {
  '510004015.wps.office.js':
    'https://raw.githubusercontent.com/510004015/Quantumult_X/Remote/Premium/WPSOffice.js',
  'app2smile.qidian.js':
    'https://raw.githubusercontent.com/app2smile/rules/master/js/qidian.js',
  'app2smile.qq.news.js':
    'https://raw.githubusercontent.com/app2smile/rules/master/js/qq-news.js',
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
  'chxm1023.vsco.js':
    'https://raw.githubusercontent.com/chxm1023/Rewrite/main/vsco.js',
  'ddgksf2013.amap.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/amap.js',
  'ddgksf2013.amdc.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/amdc.js',
  'ddgksf2013.bilibili.js': 'https://ddgksf2013.top/scripts/bilibili.ads.js',
  'ddgksf2013.bybutter.js':
    'https://raw.githubusercontent.com/ddgksf2013/dev/main/BybutterProCrack.js',
  'ddgksf2013.cai.niao.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/cainiao_json.js',
  'ddgksf2013.cai.yun.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/caiyun_json.js',
  'ddgksf2013.caixin.js':
    'https://raw.githubusercontent.com/ddgksf2013/dev/main/CaiXinZhouKanProCrack.js',
  'ddgksf2013.clarity.js':
    'https://raw.githubusercontent.com/ddgksf2013/dev/main/ClarityProCrack.js',
  'ddgksf2013.cloud.music.js':
    'https://gist.githubusercontent.com/ddgksf2013/4f53b7c6083678df25fecc8ff68b52c4/raw/netease.adblock.js',
  'ddgksf2013.meitu.xiuxiu.js':
    'https://raw.githubusercontent.com/ddgksf2013/dev/main/MeiTuXiuXiuProCrack.js',
  'ddgksf2013.red.book.js': 'https://ddgksf2013.top/scripts/redbook.ads.js',
  'ddgksf2013.server.info.pure.js':
    'https://ddgksf2013.top/scripts/server-info-pure.js',
  'ddgksf2013.startup.12306.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/12306.js',
  'ddgksf2013.startup.coolapk.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/coolapk.js',
  'ddgksf2013.startup.iqiyi.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/iqiyi_open_ads.js',
  'ddgksf2013.startup.jd.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/jd_json.js',
  'ddgksf2013.startup.sf.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/shunfeng_json.js',
  'ddgksf2013.startup.umetrip.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/hanglvzongheng.js',
  'ddgksf2013.startup.v2ex.js': 'https://ddgksf2013.top/scripts/v2ex.ads.js',
  'ddgksf2013.weibo.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/weibo_json.js',
  'ddgksf2013.ximalaya.js':
    'https://raw.githubusercontent.com/ddgksf2013/Scripts/master/ximalaya_json.js',
  'ddgksf2013.zhihu.js': 'https://ddgksf2013.top/scripts/zhihu.ads.js',
  'fmz200.baidu.lib.js':
    'https://raw.githubusercontent.com/fmz200/wool_scripts/main/Scripts/baidu/baiduLib.js',
  'fmz200.emby.js':
    'https://raw.githubusercontent.com/fmz200/wool_scripts/main/Scripts/emby/unlock2.js',
  'gjwj666.xingtu.js':
    'https://raw.githubusercontent.com/gjwj666/qx/main/XT.js',
  'kop.xiao.ip.api.js':
    'https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/IP_API.js',
  'kop.xiao.resource.parser.js':
    'https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/resource-parser.js',
  'kop.xiao.streaming.ui.check.js':
    'https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/streaming-ui-check.js',
  'maasea.youtube.response.js':
    'https://raw.githubusercontent.com/Maasea/sgmodule/master/Script/Youtube/youtube.response.js',
  'peng.ym.sub.store.js':
    'https://raw.githubusercontent.com/sub-store-org/Sub-Store/release/sub-store.no-bundle.js',
  'yqc007.video.fusion.js':
    'https://raw.githubusercontent.com/yqc007/QuantumultX/master/VideoFusionVipCrack.js',
  'zheye.zhihu.js':
    'https://gist.githubusercontent.com/blackmatrix7/f5f780d0f56b319b6ad9848fd080bb18/raw/zheye.min.js',
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
  } catch ({ message }) {
    console.error(message);
    throw new Error(message);
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
