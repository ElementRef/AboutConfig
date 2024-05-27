// https://raw.githubusercontent.com/ddgksf2013/Scripts/master/redbook_json.js
let e = $response.body;
if (e) {
  switch (!0) {
    case /api\/sns\/v\d\/note\/widgets/.test($request.url):
      try {
        let t = JSON.parse(e),
          a = ['goods_card_v2', 'note_next_step'];
        for (let e of a) t.data?.[e] && delete t.data[e];
        e = JSON.stringify(t);
      } catch (e) {}
      break;
    case /api\/sns\/v\d\/note\/redtube/.test($request.url):
      try {
        let t = JSON.parse(e);
        for (let e of t.data.items)
          e.related_goods_num && (e.related_goods_num = 0),
            e.has_related_goods && (e.has_related_goods = !1),
            e.media_save_config &&
              (e.media_save_config = {
                disable_save: !1,
                disable_watermark: !0,
                disable_weibo_cover: !0
              }),
            e.share_info &&
              (e.share_info.function_entries = [
                { type: 'video_download' },
                { type: 'generate_image' },
                { type: 'copy_link' },
                { type: 'native_voice' },
                { type: 'video_speed' },
                { type: 'dislike' },
                { type: 'report' },
                { type: 'video_feedback' }
              ]);
        e = JSON.stringify(t);
      } catch (e) {}
      break;
    case /api\/sns\/v\d\/note\/videofeed/.test($request.url):
      try {
        let t = JSON.parse(e);
        for (let e of t.data)
          e.related_goods_num && (e.related_goods_num = 0),
            e.has_related_goods && (e.has_related_goods = !1),
            e.media_save_config &&
              (e.media_save_config = {
                disable_save: !1,
                disable_watermark: !0,
                disable_weibo_cover: !0
              }),
            e.share_info &&
              (e.share_info.function_entries = [
                { type: 'video_download' },
                { type: 'generate_image' },
                { type: 'copy_link' },
                { type: 'native_voice' },
                { type: 'video_speed' },
                { type: 'dislike' },
                { type: 'report' },
                { type: 'video_feedback' }
              ]);
        e = JSON.stringify(t);
      } catch (e) {}
      break;
    case /api\/sns\/v\d\/note\/feed/.test($request.url):
      try {
        let t = JSON.parse(e);
        for (let e of t.data)
          if (
            (e.related_goods_num && (e.related_goods_num = 0),
            e.has_related_goods && (e.has_related_goods = !1),
            e.note_list)
          )
            for (let t of e.note_list)
              t.media_save_config = {
                disable_save: !1,
                disable_watermark: !0,
                disable_weibo_cover: !0
              };
        e = JSON.stringify(t);
      } catch (e) {}
      break;
    case /api\/sns\/v\d\/homefeed\/categories\?/.test($request.url):
      try {
        let t = JSON.parse(e);
        (t.data.categories = t.data.categories.filter(
          e => !('homefeed.shop' == e.oid || 'homefeed.live' == e.oid)
        )),
          (e = JSON.stringify(t));
      } catch (e) {}
      break;
    case /api\/sns\/v\d\/search\/hint/.test($request.url):
      try {
        let t = JSON.parse(e);
        t.data?.hint_words &&
          (t.data.hint_words = [
            {
              title: '搜索笔记',
              type: 'firstEnterOther#itemCfRecWord#搜索笔记#1',
              search_word: '搜索笔记'
            }
          ]),
          (e = JSON.stringify(t));
      } catch (e) {}
      break;
    case /api\/sns\/v\d\/search\/hot_list/.test($request.url):
      try {
        let t = JSON.parse(e);
        (t.data = {
          scene: '',
          title: '',
          items: [],
          host: '',
          background_color: {},
          word_request_id: ''
        }),
          (e = JSON.stringify(t));
      } catch (e) {}
      break;
    case /api\/sns\/v\d\/search\/trending/.test($request.url):
      try {
        let t = JSON.parse(e);
        (t.data = { title: '', queries: [], type: '', word_request_id: '' }),
          (e = JSON.stringify(t));
      } catch (e) {}
      break;
    case /api\/sns\/v\d\/system_service\/splash_config/.test($request.url):
      try {
        let t = JSON.parse(e);
        t.data.ads_groups.forEach(e => {
          (e.start_time = '2208963661'),
            (e.end_time = '2209050061'),
            e.ads &&
              e.ads.forEach(e => {
                (e.start_time = '2208963661'), (e.end_time = '2209050061');
              });
        }),
          (e = JSON.stringify(t));
      } catch (e) {}
      break;
    case /api\/sns\/v\d\/homefeed\?/.test($request.url):
      try {
        let t = JSON.parse(e);
        (t.data = t.data.filter(e => !e.is_ads)), (e = JSON.stringify(t));
      } catch (e) {}
      break;
    case /api\/sns\/v\d\/system_service\/config\?/.test($request.url):
      try {
        let t = JSON.parse(e),
          a = [
            'store',
            'splash',
            'loading_img',
            'app_theme',
            'cmt_words',
            'highlight_tab'
          ];
        for (let e of a) t.data?.[e] && delete t.data[e];
        e = JSON.stringify(t);
      } catch (e) {}
      break;
    default:
      $done({});
  }
  $done({ body: e });
} else $done({});
