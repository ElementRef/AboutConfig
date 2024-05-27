// https://raw.githubusercontent.com/ddgksf2013/dev/main/MeiTuXiuXiuProCrack.js
var e,
  t,
  o = 'jsjiami.com.v6',
  i = [
    o,
    'RlMewok=',
    'c8Kuw55OZULCgsK0w6jDsA==',
    '5YSa5L2O5Y2K5aKS6bCC5ou46K+c',
    'WMKiw6dXH8OVw7NTw4TCh13DnsKAwohtM8O4IBcDd8OcwonDiB1DX8Oqw7jCtcK1b8K9aUbDkQMSTsKvVRA8FcOpPQJqThx3wr3DnQ==',
    'wrXDoC/Ckk7ChCcuw5NnMsK5TMKMMsKwwoZXwrfDlCzChyrDmgxMNlPDn8OHw5DCmMO2wqDDpSDCrkJvwqXDo2wow5jDqcOaUyscW8ORw6Q=',
    'QwhofcK7N2TCjEE=',
    'fEnDgA==',
    'HzfDmV8Gw7wK',
    'wr7CvkIcQMKZw73CoRXDkcOdwr8=',
    'w7fCrsOoWcOE',
    'jZsjkiamiz.cnLTuonBYmyYn.YzXv6LS=='
  ];
function n(e, t) {
  e = ~~'0x'.concat(e.slice(1));
  var o = i[e];
  if (void 0 === n.YMrrji) {
    function a(e, t) {
      for (
        var o, i = [], n = 0, r = '', a = '', c = 0, _ = (e = atob(e)).length;
        c < _;
        c++
      )
        a += '%' + ('00' + e.charCodeAt(c).toString(16)).slice(-2);
      e = decodeURIComponent(a);
      for (var d = 0; d < 256; d++) i[d] = d;
      for (d = 0; d < 256; d++)
        (n = (n + i[d] + t.charCodeAt(d % t.length)) % 256),
          (o = i[d]),
          (i[d] = i[n]),
          (i[n] = o);
      (d = 0), (n = 0);
      for (var s = 0; s < e.length; s++)
        (n = (n + i[(d = (d + 1) % 256)]) % 256),
          (o = i[d]),
          (i[d] = i[n]),
          (i[n] = o),
          (r += String.fromCharCode(e.charCodeAt(s) ^ i[(i[d] + i[n]) % 256]));
      return r;
    }
    !(function () {
      var e =
        'undefined' != typeof window
          ? window
          : 'object' == typeof process &&
            'function' == typeof require &&
            'object' == typeof global
          ? global
          : this;
      e.atob ||
        (e.atob = function (e) {
          for (
            var t, o, i = String(e).replace(/=+$/, ''), n = 0, r = 0, a = '';
            (o = i.charAt(r++));
            ~o && ((t = n % 4 ? 64 * t + o : o), n++ % 4)
              ? (a += String.fromCharCode(255 & (t >> ((-2 * n) & 6))))
              : 0
          )
            o =
              'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.indexOf(
                o
              );
          return a;
        });
    })(),
      (n.KLvxDc = a),
      (n.IdSUJJ = {}),
      (n.YMrrji = !0);
  }
  var r = n.IdSUJJ[e];
  return (
    void 0 === r
      ? (void 0 === n.mqGiLd && (n.mqGiLd = !0),
        (o = n.KLvxDc(o, t)),
        (n.IdSUJJ[e] = o))
      : (o = r),
    o
  );
}
if (
  ((e = i),
  (t = 436),
  (function (t, o, i, n, r, a) {
    var c = 'shift',
      _ = 'push';
    if ((o >>= 8) < t) {
      for (; --t; )
        (n = e[c]()),
          o === t
            ? ((o = n), (i = e.pop()))
            : o && i.replace(/[ZkznLTunBYyYnYzXLS=]/g, '') === o && e[_](n);
      e[_](e[c]());
    }
  })(++t, 111616),
  i && 436 ^ i.length,
  -1 != $request[n('‫0', 'fkQN')][n('‫1', '6uVX')](n('‫2', '2(O(')))
) {
  var r = JSON[n('‫3', 'exs2')]($response[n('‮4', 'EOzX')]);
  (r.data = {
    uid: 99999999,
    mt_num: 0,
    type: 0,
    screen_name: n('‮5', 'XEzq'),
    core: !1,
    avatar_url: '',
    gender: '',
    birthday: 999,
    country_id: 0,
    province_id: 0,
    city_id: 0,
    fan_count: 6,
    follower_count: 4,
    feed_favorites_count: 0,
    video_favorites_count: 0,
    favorites_count: 0,
    desc: '',
    create_time: 1625709682,
    last_update_time: 0,
    is_invited: 0,
    landmark_count: '0',
    landmark_ranking: '0',
    have_unlock_landmark: 0,
    friendship_status: 0,
    feed_count: 0,
    feed_like_count: 0,
    magazine_count: 0,
    in_blacklist: 0,
    age: 13,
    constellation: n('‫6', '6uVX'),
    identity_type: 0,
    identity_status: 0,
    identity_desc: '',
    identity_time: 0,
    portal_type: 0,
    portal_icon: '',
    portal_url: '',
    background_url: 'https://xximg1.meitudata.com/6531090533496652803.jpeg',
    is_preset: 0,
    be_like_count: 0,
    be_favorites_count: 0,
    pendants: [],
    pendants_content: [],
    level: 0,
    show_producer_level: 2,
    template_feed_count: 0,
    is_live: 0,
    has_permission: 0,
    has_shop_permission: 0,
    is_authorize: 1,
    card_item: [],
    identity_card: '',
    s: 1,
    vip_type: 3,
    is_valid_user: 1,
    is_expire: 0,
    valid_time: 4641350722,
    identity_new_status: 0,
    identity_schema: n('‮7', 'fyX$'),
    show_shopping_cart: 0,
    free_trial: 1,
    topic_favorite_count: 0,
    video_template_feed_count: 0,
    vip_icon: n('‫8', 'Q&JQ')
  }),
    $done({ body: JSON[n('‮9', 'Y5gV')](r) });
} else $done({});
o = 'jsjiami.com.v6';
