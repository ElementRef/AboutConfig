// https://raw.githubusercontent.com/Maasea/sgmodule/master/Script/Youtube/dist/youtube.response.beta.js
(() => {
  function e(e, t) {
    if (!e) throw new Error(t);
  }
  !(function (e) {
    function t() {}
    function n() {}
    var s = String.fromCharCode,
      a = {}.toString,
      r = a.call(e.SharedArrayBuffer),
      i = a(),
      o = e.Uint8Array,
      l = o || Array,
      u = o ? ArrayBuffer : l,
      c =
        u.isView ||
        function (e) {
          return e && 'length' in e;
        },
      d = a.call(u.prototype);
    u = n.prototype;
    var m = e.TextEncoder,
      f = new (o ? Uint16Array : l)(32);
    (t.prototype.decode = function (e) {
      if (!c(e)) {
        var t = a.call(e);
        if (t !== d && t !== r && t !== i)
          throw TypeError(
            "Failed to execute 'decode' on 'TextDecoder': The provided value is not of type '(ArrayBuffer or ArrayBufferView)'"
          );
        e = o ? new l(e) : e || [];
      }
      for (
        var n,
          u,
          m,
          p = (t = ''),
          g = 0,
          h = 0 | e.length,
          y = (h - 32) | 0,
          k = 0,
          T = 0,
          b = 0,
          w = -1;
        g < h;

      ) {
        for (
          n = g <= y ? 32 : (h - g) | 0;
          b < n;
          g = (g + 1) | 0, b = (b + 1) | 0
        ) {
          switch ((u = 255 & e[g]) >> 4) {
            case 15:
              if ((m = 255 & e[(g = (g + 1) | 0)]) >> 6 != 2 || 247 < u) {
                g = (g - 1) | 0;
                break;
              }
              (k = ((7 & u) << 6) | (63 & m)), (T = 5), (u = 256);
            case 14:
              (k <<= 6),
                (k |=
                  ((15 & u) << 6) | (63 & (m = 255 & e[(g = (g + 1) | 0)]))),
                (T = m >> 6 == 2 ? (T + 4) | 0 : 24),
                (u = (u + 256) & 768);
            case 13:
            case 12:
              (k <<= 6),
                (k |=
                  ((31 & u) << 6) | (63 & (m = 255 & e[(g = (g + 1) | 0)]))),
                (T = (T + 7) | 0),
                g < h && m >> 6 == 2 && k >> T && 1114112 > k
                  ? ((u = k),
                    0 <= (k = (k - 65536) | 0) &&
                      ((w = (55296 + (k >> 10)) | 0),
                      (u = (56320 + (1023 & k)) | 0),
                      31 > b
                        ? ((f[b] = w), (b = (b + 1) | 0), (w = -1))
                        : ((m = w), (w = u), (u = m))))
                  : ((g = (g - (u >>= 8) - 1) | 0), (u = 65533)),
                (k = T = 0),
                (n = g <= y ? 32 : (h - g) | 0);
            default:
              f[b] = u;
              continue;
            case 11:
            case 10:
            case 9:
            case 8:
          }
          f[b] = 65533;
        }
        if (
          ((p += s(
            f[0],
            f[1],
            f[2],
            f[3],
            f[4],
            f[5],
            f[6],
            f[7],
            f[8],
            f[9],
            f[10],
            f[11],
            f[12],
            f[13],
            f[14],
            f[15],
            f[16],
            f[17],
            f[18],
            f[19],
            f[20],
            f[21],
            f[22],
            f[23],
            f[24],
            f[25],
            f[26],
            f[27],
            f[28],
            f[29],
            f[30],
            f[31]
          )),
          32 > b && (p = p.slice(0, (b - 32) | 0)),
          g < h)
        ) {
          if (((f[0] = w), (b = ~w >>> 31), (w = -1), p.length < t.length))
            continue;
        } else -1 !== w && (p += s(w));
        (t += p), (p = '');
      }
      return t;
    }),
      (u.encode = function (e) {
        var t,
          n = 0 | (e = void 0 === e ? '' : '' + e).length,
          s = new l((8 + (n << 1)) | 0),
          a = 0,
          r = !o;
        for (t = 0; t < n; t = (t + 1) | 0, a = (a + 1) | 0) {
          var i = 0 | e.charCodeAt(t);
          if (127 >= i) s[a] = i;
          else {
            if (2047 >= i) s[a] = 192 | (i >> 6);
            else {
              e: {
                if (55296 <= i)
                  if (56319 >= i) {
                    var u = 0 | e.charCodeAt((t = (t + 1) | 0));
                    if (56320 <= u && 57343 >= u) {
                      if (65535 < (i = ((i << 10) + u - 56613888) | 0)) {
                        (s[a] = 240 | (i >> 18)),
                          (s[(a = (a + 1) | 0)] = 128 | ((i >> 12) & 63)),
                          (s[(a = (a + 1) | 0)] = 128 | ((i >> 6) & 63)),
                          (s[(a = (a + 1) | 0)] = 128 | (63 & i));
                        continue;
                      }
                      break e;
                    }
                    i = 65533;
                  } else 57343 >= i && (i = 65533);
                !r &&
                  t << 1 < a &&
                  t << 1 < ((a - 7) | 0) &&
                  ((r = !0), (u = new l(3 * n)).set(s), (s = u));
              }
              (s[a] = 224 | (i >> 12)),
                (s[(a = (a + 1) | 0)] = 128 | ((i >> 6) & 63));
            }
            s[(a = (a + 1) | 0)] = 128 | (63 & i);
          }
        }
        return o ? s.subarray(0, a) : s.slice(0, a);
      }),
      m || ((e.TextDecoder = t), (e.TextEncoder = n));
  })(globalThis);
  var t = 34028234663852886e22,
    n = -34028234663852886e22,
    s = 4294967295,
    a = 2147483647,
    r = -2147483648;
  function i(e) {
    if ('number' != typeof e) throw new Error('invalid int 32: ' + typeof e);
    if (!Number.isInteger(e) || e > a || e < r)
      throw new Error('invalid int 32: ' + e);
  }
  function o(e) {
    if ('number' != typeof e) throw new Error('invalid uint 32: ' + typeof e);
    if (!Number.isInteger(e) || e > s || e < 0)
      throw new Error('invalid uint 32: ' + e);
  }
  function l(e) {
    if ('number' != typeof e) throw new Error('invalid float 32: ' + typeof e);
    if (Number.isFinite(e) && (e > t || e < n))
      throw new Error('invalid float 32: ' + e);
  }
  var u = Symbol('@bufbuild/protobuf/enum-type');
  function c(t) {
    let n = t[u];
    return e(n, 'missing enum type on enum object'), n;
  }
  function d(e, t, n, s) {
    e[u] = m(
      t,
      n.map(t => ({ no: t.no, name: t.name, localName: e[t.no] })),
      s
    );
  }
  function m(e, t, n) {
    let s = Object.create(null),
      a = Object.create(null),
      r = [];
    for (let e of t) {
      let t = p(e);
      r.push(t), (s[e.name] = t), (a[e.no] = t);
    }
    return {
      typeName: e,
      values: r,
      findName: e => s[e],
      findNumber: e => a[e]
    };
  }
  function f(e, t, n) {
    let s = {};
    for (let e of t) {
      let t = p(e);
      (s[t.localName] = t.no), (s[t.no] = t.localName);
    }
    return d(s, e, t, n), s;
  }
  function p(e) {
    return 'localName' in e
      ? e
      : Object.assign(Object.assign({}, e), { localName: e.name });
  }
  var g,
    h,
    y,
    k = class {
      equals(e) {
        return this.getType().runtime.util.equals(this.getType(), this, e);
      }
      clone() {
        return this.getType().runtime.util.clone(this);
      }
      fromBinary(e, t) {
        let n = this.getType().runtime.bin,
          s = n.makeReadOptions(t);
        return n.readMessage(this, s.readerFactory(e), e.byteLength, s), this;
      }
      fromJson(e, t) {
        let n = this.getType(),
          s = n.runtime.json,
          a = s.makeReadOptions(t);
        return s.readMessage(n, e, a, this), this;
      }
      fromJsonString(e, t) {
        let n;
        try {
          n = JSON.parse(e);
        } catch (e) {
          throw new Error(
            `cannot decode ${this.getType().typeName} from JSON: ${
              e instanceof Error ? e.message : String(e)
            }`
          );
        }
        return this.fromJson(n, t);
      }
      toBinary(e) {
        let t = this.getType().runtime.bin,
          n = t.makeWriteOptions(e),
          s = n.writerFactory();
        return t.writeMessage(this, s, n), s.finish();
      }
      toJson(e) {
        let t = this.getType().runtime.json,
          n = t.makeWriteOptions(e);
        return t.writeMessage(this, n);
      }
      toJsonString(e) {
        var t;
        let n = this.toJson(e);
        return JSON.stringify(
          n,
          null,
          null !== (t = e?.prettySpaces) && void 0 !== t ? t : 0
        );
      }
      toJSON() {
        return this.toJson({ emitDefaultValues: !0 });
      }
      getType() {
        return Object.getPrototypeOf(this).constructor;
      }
    };
  function T() {
    let e = 0,
      t = 0;
    for (let n = 0; n < 28; n += 7) {
      let s = this.buf[this.pos++];
      if (((e |= (127 & s) << n), !(128 & s)))
        return this.assertBounds(), [e, t];
    }
    let n = this.buf[this.pos++];
    if (((e |= (15 & n) << 28), (t = (112 & n) >> 4), !(128 & n)))
      return this.assertBounds(), [e, t];
    for (let n = 3; n <= 31; n += 7) {
      let s = this.buf[this.pos++];
      if (((t |= (127 & s) << n), !(128 & s)))
        return this.assertBounds(), [e, t];
    }
    throw new Error('invalid varint');
  }
  function b(e, t, n) {
    for (let s = 0; s < 28; s += 7) {
      let a = e >>> s,
        r = !(!(a >>> 7) && 0 == t),
        i = 255 & (r ? 128 | a : a);
      if ((n.push(i), !r)) return;
    }
    let s = ((e >>> 28) & 15) | ((7 & t) << 4),
      a = !!(t >> 3);
    if ((n.push(255 & (a ? 128 | s : s)), a)) {
      for (let e = 3; e < 31; e += 7) {
        let s = t >>> e,
          a = !!(s >>> 7),
          r = 255 & (a ? 128 | s : s);
        if ((n.push(r), !a)) return;
      }
      n.push((t >>> 31) & 1);
    }
  }
  ((h = g || (g = {}))[(h.DOUBLE = 1)] = 'DOUBLE'),
    (h[(h.FLOAT = 2)] = 'FLOAT'),
    (h[(h.INT64 = 3)] = 'INT64'),
    (h[(h.UINT64 = 4)] = 'UINT64'),
    (h[(h.INT32 = 5)] = 'INT32'),
    (h[(h.FIXED64 = 6)] = 'FIXED64'),
    (h[(h.FIXED32 = 7)] = 'FIXED32'),
    (h[(h.BOOL = 8)] = 'BOOL'),
    (h[(h.STRING = 9)] = 'STRING'),
    (h[(h.BYTES = 12)] = 'BYTES'),
    (h[(h.UINT32 = 13)] = 'UINT32'),
    (h[(h.SFIXED32 = 15)] = 'SFIXED32'),
    (h[(h.SFIXED64 = 16)] = 'SFIXED64'),
    (h[(h.SINT32 = 17)] = 'SINT32'),
    (h[(h.SINT64 = 18)] = 'SINT64'),
    (function (e) {
      (e[(e.BIGINT = 0)] = 'BIGINT'), (e[(e.STRING = 1)] = 'STRING');
    })(y || (y = {}));
  var w = 4294967296;
  function N(e) {
    let t = '-' === e[0];
    t && (e = e.slice(1));
    let n = 1e6,
      s = 0,
      a = 0;
    function r(t, r) {
      let i = Number(e.slice(t, r));
      (a *= n), (s = s * n + i), s >= w && ((a += (s / w) | 0), (s %= w));
    }
    return r(-24, -18), r(-18, -12), r(-12, -6), r(-6), t ? v(s, a) : F(s, a);
  }
  function I(e, t) {
    if (
      (({ lo: e, hi: t } = (function (e, t) {
        return { lo: e >>> 0, hi: t >>> 0 };
      })(e, t)),
      t <= 2097151)
    )
      return String(w * t + e);
    let n = 16777215 & ((e >>> 24) | (t << 8)),
      s = (t >> 16) & 65535,
      a = (16777215 & e) + 6777216 * n + 6710656 * s,
      r = n + 8147497 * s,
      i = 2 * s,
      o = 1e7;
    return (
      a >= o && ((r += Math.floor(a / o)), (a %= o)),
      r >= o && ((i += Math.floor(r / o)), (r %= o)),
      i.toString() + S(r) + S(a)
    );
  }
  function F(e, t) {
    return { lo: 0 | e, hi: 0 | t };
  }
  function v(e, t) {
    return (t = ~t), e ? (e = 1 + ~e) : (t += 1), F(e, t);
  }
  var S = e => {
    let t = String(e);
    return '0000000'.slice(t.length) + t;
  };
  function E(e, t) {
    if (e >= 0) {
      for (; e > 127; ) t.push((127 & e) | 128), (e >>>= 7);
      t.push(e);
    } else {
      for (let n = 0; n < 9; n++) t.push((127 & e) | 128), (e >>= 7);
      t.push(1);
    }
  }
  function B() {
    let e = this.buf[this.pos++],
      t = 127 & e;
    if (!(128 & e)) return this.assertBounds(), t;
    if (((e = this.buf[this.pos++]), (t |= (127 & e) << 7), !(128 & e)))
      return this.assertBounds(), t;
    if (((e = this.buf[this.pos++]), (t |= (127 & e) << 14), !(128 & e)))
      return this.assertBounds(), t;
    if (((e = this.buf[this.pos++]), (t |= (127 & e) << 21), !(128 & e)))
      return this.assertBounds(), t;
    (e = this.buf[this.pos++]), (t |= (15 & e) << 28);
    for (let t = 5; 128 & e && t < 10; t++) e = this.buf[this.pos++];
    if (128 & e) throw new Error('invalid varint');
    return this.assertBounds(), t >>> 0;
  }
  var O,
    M = (function () {
      let t = new DataView(new ArrayBuffer(8));
      if (
        'function' == typeof BigInt &&
        'function' == typeof t.getBigInt64 &&
        'function' == typeof t.getBigUint64 &&
        'function' == typeof t.setBigInt64 &&
        'function' == typeof t.setBigUint64 &&
        ('object' != typeof process ||
          'object' != typeof process.env ||
          '1' !== process.env.BUF_BIGINT_DISABLE)
      ) {
        let e = BigInt('-9223372036854775808'),
          n = BigInt('9223372036854775807'),
          s = BigInt('0'),
          a = BigInt('18446744073709551615');
        return {
          zero: BigInt(0),
          supported: !0,
          parse(t) {
            let s = 'bigint' == typeof t ? t : BigInt(t);
            if (s > n || s < e) throw new Error(`int64 invalid: ${t}`);
            return s;
          },
          uParse(e) {
            let t = 'bigint' == typeof e ? e : BigInt(e);
            if (t > a || t < s) throw new Error(`uint64 invalid: ${e}`);
            return t;
          },
          enc(e) {
            return (
              t.setBigInt64(0, this.parse(e), !0),
              { lo: t.getInt32(0, !0), hi: t.getInt32(4, !0) }
            );
          },
          uEnc(e) {
            return (
              t.setBigInt64(0, this.uParse(e), !0),
              { lo: t.getInt32(0, !0), hi: t.getInt32(4, !0) }
            );
          },
          dec: (e, n) => (
            t.setInt32(0, e, !0), t.setInt32(4, n, !0), t.getBigInt64(0, !0)
          ),
          uDec: (e, n) => (
            t.setInt32(0, e, !0), t.setInt32(4, n, !0), t.getBigUint64(0, !0)
          )
        };
      }
      let n = t => e(/^-?[0-9]+$/.test(t), `int64 invalid: ${t}`),
        s = t => e(/^[0-9]+$/.test(t), `uint64 invalid: ${t}`);
      return {
        zero: '0',
        supported: !1,
        parse: e => ('string' != typeof e && (e = e.toString()), n(e), e),
        uParse: e => ('string' != typeof e && (e = e.toString()), s(e), e),
        enc: e => ('string' != typeof e && (e = e.toString()), n(e), N(e)),
        uEnc: e => ('string' != typeof e && (e = e.toString()), s(e), N(e)),
        dec: (e, t) =>
          (function (e, t) {
            let n = F(e, t),
              s = 2147483648 & n.hi;
            s && (n = v(n.lo, n.hi));
            let a = I(n.lo, n.hi);
            return s ? '-' + a : a;
          })(e, t),
        uDec: (e, t) => I(e, t)
      };
    })();
  !(function (e) {
    (e[(e.Varint = 0)] = 'Varint'),
      (e[(e.Bit64 = 1)] = 'Bit64'),
      (e[(e.LengthDelimited = 2)] = 'LengthDelimited'),
      (e[(e.StartGroup = 3)] = 'StartGroup'),
      (e[(e.EndGroup = 4)] = 'EndGroup'),
      (e[(e.Bit32 = 5)] = 'Bit32');
  })(O || (O = {}));
  var A = class {
      constructor(e) {
        (this.stack = []),
          (this.textEncoder = e ?? new TextEncoder()),
          (this.chunks = []),
          (this.buf = []);
      }
      finish() {
        this.chunks.push(new Uint8Array(this.buf));
        let e = 0;
        for (let t = 0; t < this.chunks.length; t++) e += this.chunks[t].length;
        let t = new Uint8Array(e),
          n = 0;
        for (let e = 0; e < this.chunks.length; e++)
          t.set(this.chunks[e], n), (n += this.chunks[e].length);
        return (this.chunks = []), t;
      }
      fork() {
        return (
          this.stack.push({ chunks: this.chunks, buf: this.buf }),
          (this.chunks = []),
          (this.buf = []),
          this
        );
      }
      join() {
        let e = this.finish(),
          t = this.stack.pop();
        if (!t) throw new Error('invalid state, fork stack empty');
        return (
          (this.chunks = t.chunks),
          (this.buf = t.buf),
          this.uint32(e.byteLength),
          this.raw(e)
        );
      }
      tag(e, t) {
        return this.uint32(((e << 3) | t) >>> 0);
      }
      raw(e) {
        return (
          this.buf.length &&
            (this.chunks.push(new Uint8Array(this.buf)), (this.buf = [])),
          this.chunks.push(e),
          this
        );
      }
      uint32(e) {
        for (o(e); e > 127; ) this.buf.push((127 & e) | 128), (e >>>= 7);
        return this.buf.push(e), this;
      }
      int32(e) {
        return i(e), E(e, this.buf), this;
      }
      bool(e) {
        return this.buf.push(e ? 1 : 0), this;
      }
      bytes(e) {
        return this.uint32(e.byteLength), this.raw(e);
      }
      string(e) {
        let t = this.textEncoder.encode(e);
        return this.uint32(t.byteLength), this.raw(t);
      }
      float(e) {
        l(e);
        let t = new Uint8Array(4);
        return new DataView(t.buffer).setFloat32(0, e, !0), this.raw(t);
      }
      double(e) {
        let t = new Uint8Array(8);
        return new DataView(t.buffer).setFloat64(0, e, !0), this.raw(t);
      }
      fixed32(e) {
        o(e);
        let t = new Uint8Array(4);
        return new DataView(t.buffer).setUint32(0, e, !0), this.raw(t);
      }
      sfixed32(e) {
        i(e);
        let t = new Uint8Array(4);
        return new DataView(t.buffer).setInt32(0, e, !0), this.raw(t);
      }
      sint32(e) {
        return i(e), E((e = ((e << 1) ^ (e >> 31)) >>> 0), this.buf), this;
      }
      sfixed64(e) {
        let t = new Uint8Array(8),
          n = new DataView(t.buffer),
          s = M.enc(e);
        return n.setInt32(0, s.lo, !0), n.setInt32(4, s.hi, !0), this.raw(t);
      }
      fixed64(e) {
        let t = new Uint8Array(8),
          n = new DataView(t.buffer),
          s = M.uEnc(e);
        return n.setInt32(0, s.lo, !0), n.setInt32(4, s.hi, !0), this.raw(t);
      }
      int64(e) {
        let t = M.enc(e);
        return b(t.lo, t.hi, this.buf), this;
      }
      sint64(e) {
        let t = M.enc(e),
          n = t.hi >> 31;
        return (
          b((t.lo << 1) ^ n, ((t.hi << 1) | (t.lo >>> 31)) ^ n, this.buf), this
        );
      }
      uint64(e) {
        let t = M.uEnc(e);
        return b(t.lo, t.hi, this.buf), this;
      }
    },
    U = class {
      constructor(e, t) {
        (this.varint64 = T),
          (this.uint32 = B),
          (this.buf = e),
          (this.len = e.length),
          (this.pos = 0),
          (this.view = new DataView(e.buffer, e.byteOffset, e.byteLength)),
          (this.textDecoder = t ?? new TextDecoder());
      }
      tag() {
        let e = this.uint32(),
          t = e >>> 3,
          n = 7 & e;
        if (t <= 0 || n < 0 || n > 5)
          throw new Error('illegal tag: field no ' + t + ' wire type ' + n);
        return [t, n];
      }
      skip(e) {
        let t = this.pos;
        switch (e) {
          case O.Varint:
            for (; 128 & this.buf[this.pos++]; );
            break;
          case O.Bit64:
            this.pos += 4;
          case O.Bit32:
            this.pos += 4;
            break;
          case O.LengthDelimited:
            let t = this.uint32();
            this.pos += t;
            break;
          case O.StartGroup:
            let n;
            for (; (n = this.tag()[1]) !== O.EndGroup; ) this.skip(n);
            break;
          default:
            throw new Error('cant skip wire type ' + e);
        }
        return this.assertBounds(), this.buf.subarray(t, this.pos);
      }
      assertBounds() {
        if (this.pos > this.len) throw new RangeError('premature EOF');
      }
      int32() {
        return 0 | this.uint32();
      }
      sint32() {
        let e = this.uint32();
        return (e >>> 1) ^ -(1 & e);
      }
      int64() {
        return M.dec(...this.varint64());
      }
      uint64() {
        return M.uDec(...this.varint64());
      }
      sint64() {
        let [e, t] = this.varint64(),
          n = -(1 & e);
        return (
          (e = ((e >>> 1) | ((1 & t) << 31)) ^ n),
          (t = (t >>> 1) ^ n),
          M.dec(e, t)
        );
      }
      bool() {
        let [e, t] = this.varint64();
        return 0 !== e || 0 !== t;
      }
      fixed32() {
        return this.view.getUint32((this.pos += 4) - 4, !0);
      }
      sfixed32() {
        return this.view.getInt32((this.pos += 4) - 4, !0);
      }
      fixed64() {
        return M.uDec(this.sfixed32(), this.sfixed32());
      }
      sfixed64() {
        return M.dec(this.sfixed32(), this.sfixed32());
      }
      float() {
        return this.view.getFloat32((this.pos += 4) - 4, !0);
      }
      double() {
        return this.view.getFloat64((this.pos += 8) - 8, !0);
      }
      bytes() {
        let e = this.uint32(),
          t = this.pos;
        return (
          (this.pos += e), this.assertBounds(), this.buf.subarray(t, t + e)
        );
      }
      string() {
        return this.textDecoder.decode(this.bytes());
      }
    };
  function x(e, t, n) {
    if (t === n) return !0;
    if (e == g.BYTES) {
      if (
        !(
          t instanceof Uint8Array &&
          n instanceof Uint8Array &&
          t.length === n.length
        )
      )
        return !1;
      for (let e = 0; e < t.length; e++) if (t[e] !== n[e]) return !1;
      return !0;
    }
    switch (e) {
      case g.UINT64:
      case g.FIXED64:
      case g.INT64:
      case g.SFIXED64:
      case g.SINT64:
        return t == n;
    }
    return !1;
  }
  function $(e, t) {
    switch (e) {
      case g.BOOL:
        return !1;
      case g.UINT64:
      case g.FIXED64:
      case g.INT64:
      case g.SFIXED64:
      case g.SINT64:
        return 0 == t ? M.zero : '0';
      case g.DOUBLE:
      case g.FLOAT:
        return 0;
      case g.BYTES:
        return new Uint8Array(0);
      case g.STRING:
        return '';
      default:
        return 0;
    }
  }
  function D(e, t) {
    let n = void 0 === t,
      s = O.Varint,
      a = 0 === t;
    switch (e) {
      case g.STRING:
        (a = n || !t.length), (s = O.LengthDelimited);
        break;
      case g.BOOL:
        a = !1 === t;
        break;
      case g.DOUBLE:
        s = O.Bit64;
        break;
      case g.FLOAT:
        s = O.Bit32;
        break;
      case g.INT64:
      case g.UINT64:
        a = n || 0 == t;
        break;
      case g.FIXED64:
        (a = n || 0 == t), (s = O.Bit64);
        break;
      case g.BYTES:
        (a = n || !t.byteLength), (s = O.LengthDelimited);
        break;
      case g.FIXED32:
      case g.SFIXED32:
        s = O.Bit32;
        break;
      case g.SFIXED64:
        (a = n || 0 == t), (s = O.Bit64);
        break;
      case g.SINT64:
        a = n || 0 == t;
    }
    return [s, g[e].toLowerCase(), n || a];
  }
  function j(e) {
    let t = e.field.localName,
      n = Object.create(null);
    return (
      (n[t] = (function (e) {
        let t = e.field;
        if (t.repeated) return [];
        if (void 0 !== t.default) return t.default;
        switch (t.kind) {
          case 'enum':
            return t.T.values[0].no;
          case 'scalar':
            return $(t.T, t.L);
          case 'message':
            let e = t.T,
              n = new e();
            return e.fieldWrapper ? e.fieldWrapper.unwrapField(n) : n;
          case 'map':
            throw 'map fields are not allowed to be extensions';
        }
      })(e)),
      [n, () => n[t]]
    );
  }
  function L(e, t) {
    return t instanceof k || !e.fieldWrapper ? t : e.fieldWrapper.wrapField(t);
  }
  g.DOUBLE,
    g.FLOAT,
    g.INT64,
    g.UINT64,
    g.INT32,
    g.UINT32,
    g.BOOL,
    g.STRING,
    g.BYTES;
  var P = Symbol('@bufbuild/protobuf/unknown-fields'),
    V = { readUnknownFields: !0, readerFactory: e => new U(e) },
    R = { writeUnknownFields: !0, writerFactory: () => new A() };
  function C(e) {
    return e ? Object.assign(Object.assign({}, V), e) : V;
  }
  function J(e) {
    return e ? Object.assign(Object.assign({}, R), e) : R;
  }
  function G(e, t, n, s, a) {
    let { repeated: r, localName: i } = n;
    switch (
      (n.oneof &&
        ((e = e[n.oneof.localName]).case != i && delete e.value,
        (e.case = i),
        (i = 'value')),
      n.kind)
    ) {
      case 'scalar':
      case 'enum':
        let o = 'enum' == n.kind ? g.INT32 : n.T,
          l = Y;
        if (('scalar' == n.kind && n.L > 0 && (l = _), r)) {
          let n = e[i];
          if (s == O.LengthDelimited && o != g.STRING && o != g.BYTES) {
            let e = t.uint32() + t.pos;
            for (; t.pos < e; ) n.push(l(t, o));
          } else n.push(l(t, o));
        } else e[i] = l(t, o);
        break;
      case 'message':
        let u = n.T;
        r
          ? e[i].push(X(t, new u(), a, n))
          : e[i] instanceof k
          ? X(t, e[i], a, n)
          : ((e[i] = X(t, new u(), a, n)),
            u.fieldWrapper &&
              !n.oneof &&
              !n.repeated &&
              (e[i] = u.fieldWrapper.unwrapField(e[i])));
        break;
      case 'map':
        let [c, d] = (function (e, t, n) {
          let s,
            a,
            r = t.uint32(),
            i = t.pos + r;
          for (; t.pos < i; ) {
            let [r] = t.tag();
            switch (r) {
              case 1:
                s = Y(t, e.K);
                break;
              case 2:
                switch (e.V.kind) {
                  case 'scalar':
                    a = Y(t, e.V.T);
                    break;
                  case 'enum':
                    a = t.int32();
                    break;
                  case 'message':
                    a = X(t, new e.V.T(), n, void 0);
                }
            }
          }
          if (void 0 === s) {
            let t = $(e.K, y.BIGINT);
            s = e.K == g.BOOL ? t.toString() : t;
          }
          if (
            ('string' != typeof s && 'number' != typeof s && (s = s.toString()),
            void 0 === a)
          )
            switch (e.V.kind) {
              case 'scalar':
                a = $(e.V.T, y.BIGINT);
                break;
              case 'enum':
                a = 0;
                break;
              case 'message':
                a = new e.V.T();
            }
          return [s, a];
        })(n, t, a);
        e[i][c] = d;
    }
  }
  function X(e, t, n, s) {
    let a = t.getType().runtime.bin,
      r = s?.delimited;
    return a.readMessage(t, e, r ? s?.no : e.uint32(), n, r), t;
  }
  function _(e, t) {
    let n = Y(e, t);
    return 'bigint' == typeof n ? n.toString() : n;
  }
  function Y(e, t) {
    switch (t) {
      case g.STRING:
        return e.string();
      case g.BOOL:
        return e.bool();
      case g.DOUBLE:
        return e.double();
      case g.FLOAT:
        return e.float();
      case g.INT32:
        return e.int32();
      case g.INT64:
        return e.int64();
      case g.UINT64:
        return e.uint64();
      case g.FIXED64:
        return e.fixed64();
      case g.BYTES:
        return e.bytes();
      case g.FIXED32:
        return e.fixed32();
      case g.SFIXED32:
        return e.sfixed32();
      case g.SFIXED64:
        return e.sfixed64();
      case g.SINT64:
        return e.sint64();
      case g.UINT32:
        return e.uint32();
      case g.SINT32:
        return e.sint32();
    }
  }
  function q(t, n, s, a, r) {
    t.tag(s.no, O.LengthDelimited), t.fork();
    let i = a;
    switch (s.K) {
      case g.INT32:
      case g.FIXED32:
      case g.UINT32:
      case g.SFIXED32:
      case g.SINT32:
        i = Number.parseInt(a);
        break;
      case g.BOOL:
        e('true' == a || 'false' == a), (i = 'true' == a);
    }
    switch ((z(t, s.K, 1, i, !0), s.V.kind)) {
      case 'scalar':
        z(t, s.V.T, 2, r, !0);
        break;
      case 'enum':
        z(t, g.INT32, 2, r, !0);
        break;
      case 'message':
        t.tag(2, O.LengthDelimited).bytes(r.toBinary(n));
    }
    t.join();
  }
  function W(e, t, n, s) {
    let a = L(n.T, s);
    n?.delimited
      ? e.tag(n.no, O.StartGroup).raw(a.toBinary(t)).tag(n.no, O.EndGroup)
      : e.tag(n.no, O.LengthDelimited).bytes(a.toBinary(t));
  }
  function z(e, t, n, s, a) {
    let [r, i, o] = D(t, s);
    (!o || a) && e.tag(n, r)[i](s);
  }
  function K(e, t, n, s) {
    let a = e.repeated;
    switch (e.kind) {
      case 'scalar':
      case 'enum':
        let r = 'enum' == e.kind ? g.INT32 : e.T;
        if (a)
          if (e.packed)
            !(function (e, t, n, s) {
              if (!s.length) return;
              e.tag(n, O.LengthDelimited).fork();
              let [, a] = D(t);
              for (let t = 0; t < s.length; t++) e[a](s[t]);
              e.join();
            })(n, r, e.no, t);
          else for (let s of t) z(n, r, e.no, s, !0);
        else void 0 !== t && z(n, r, e.no, t, !!e.oneof || e.opt);
        break;
      case 'message':
        if (a) for (let a of t) W(n, s, e, a);
        else void 0 !== t && W(n, s, e, t);
        break;
      case 'map':
        for (let [a, r] of Object.entries(t)) q(n, s, e, a, r);
    }
  }
  var H =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split(
        ''
      ),
    Q = [];
  for (let e = 0; e < H.length; e++) Q[H[e].charCodeAt(0)] = e;
  (Q['-'.charCodeAt(0)] = H.indexOf('+')),
    (Q['_'.charCodeAt(0)] = H.indexOf('/'));
  var Z = {
    dec(e) {
      let t = (3 * e.length) / 4;
      '=' == e[e.length - 2] ? (t -= 2) : '=' == e[e.length - 1] && (t -= 1);
      let n,
        s = new Uint8Array(t),
        a = 0,
        r = 0,
        i = 0;
      for (let t = 0; t < e.length; t++) {
        if (((n = Q[e.charCodeAt(t)]), void 0 === n))
          switch (e[t]) {
            case '=':
              r = 0;
            case '\n':
            case '\r':
            case '\t':
            case ' ':
              continue;
            default:
              throw Error('invalid base64 string.');
          }
        switch (r) {
          case 0:
            (i = n), (r = 1);
            break;
          case 1:
            (s[a++] = (i << 2) | ((48 & n) >> 4)), (i = n), (r = 2);
            break;
          case 2:
            (s[a++] = ((15 & i) << 4) | ((60 & n) >> 2)), (i = n), (r = 3);
            break;
          case 3:
            (s[a++] = ((3 & i) << 6) | n), (r = 0);
        }
      }
      if (1 == r) throw Error('invalid base64 string.');
      return s.subarray(0, a);
    },
    enc(e) {
      let t,
        n = '',
        s = 0,
        a = 0;
      for (let r = 0; r < e.length; r++)
        switch (((t = e[r]), s)) {
          case 0:
            (n += H[t >> 2]), (a = (3 & t) << 4), (s = 1);
            break;
          case 1:
            (n += H[a | (t >> 4)]), (a = (15 & t) << 2), (s = 2);
            break;
          case 2:
            (n += H[a | (t >> 6)]), (n += H[63 & t]), (s = 0);
        }
      return s && ((n += H[a]), (n += '='), 1 == s && (n += '=')), n;
    }
  };
  function ee(e, t, n) {
    se(t, e);
    let s = t.runtime.bin.makeReadOptions(n),
      a = (function (e, t) {
        if (!t.repeated && ('enum' == t.kind || 'scalar' == t.kind)) {
          for (let n = e.length - 1; n >= 0; --n)
            if (e[n].no == t.no) return [e[n]];
          return [];
        }
        return e.filter(e => e.no === t.no);
      })(e.getType().runtime.bin.listUnknownFields(e), t.field),
      [r, i] = j(t);
    for (let e of a)
      t.runtime.bin.readField(
        r,
        s.readerFactory(e.data),
        t.field,
        e.wireType,
        s
      );
    return i();
  }
  function te(e, t, n, s) {
    se(t, e);
    let a = t.runtime.bin.makeReadOptions(s),
      r = t.runtime.bin.makeWriteOptions(s);
    if (ne(e, t)) {
      let n = e
        .getType()
        .runtime.bin.listUnknownFields(e)
        .filter(e => e.no != t.field.no);
      e.getType().runtime.bin.discardUnknownFields(e);
      for (let t of n)
        e.getType().runtime.bin.onUnknownField(e, t.no, t.wireType, t.data);
    }
    let i = r.writerFactory(),
      o = t.field;
    !o.opt &&
      !o.repeated &&
      ('enum' == o.kind || 'scalar' == o.kind) &&
      (o = Object.assign(Object.assign({}, t.field), { opt: !0 })),
      t.runtime.bin.writeField(o, n, i, r);
    let l = a.readerFactory(i.finish());
    for (; l.pos < l.len; ) {
      let [t, n] = l.tag(),
        s = l.skip(n);
      e.getType().runtime.bin.onUnknownField(e, t, n, s);
    }
  }
  function ne(e, t) {
    let n = e.getType();
    return (
      t.extendee.typeName === n.typeName &&
      !!n.runtime.bin.listUnknownFields(e).find(e => e.no == t.field.no)
    );
  }
  function se(t, n) {
    e(
      t.extendee.typeName == n.getType().typeName,
      `extension ${t.typeName} can only be applied to message ${t.extendee.typeName}`
    );
  }
  var ae = { ignoreUnknownFields: !1 },
    re = {
      emitDefaultValues: !1,
      enumAsInteger: !1,
      useProtoFieldName: !1,
      prettySpaces: 0
    };
  function ie(e) {
    return e ? Object.assign(Object.assign({}, ae), e) : ae;
  }
  function oe(e) {
    return e ? Object.assign(Object.assign({}, re), e) : re;
  }
  function le(e) {
    if (null === e) return 'null';
    switch (typeof e) {
      case 'object':
        return Array.isArray(e) ? 'array' : 'object';
      case 'string':
        return e.length > 100 ? 'string' : `"${e.split('"').join('\\"')}"`;
      default:
        return String(e);
    }
  }
  function ue(e, t, n, s, a, r) {
    let i = n.localName;
    if (n.oneof) {
      if (null === t && 'scalar' == n.kind) return;
      (e = e[n.oneof.localName] = { case: i }), (i = 'value');
    }
    if (n.repeated) {
      if (null === t) return;
      if (!Array.isArray(t))
        throw new Error(
          `cannot decode field ${a.typeName}.${n.name} from JSON: ${le(t)}`
        );
      let r = e[i];
      for (let e of t) {
        if (null === e)
          throw new Error(
            `cannot decode field ${a.typeName}.${n.name} from JSON: ${le(e)}`
          );
        let t;
        switch (n.kind) {
          case 'message':
            t = n.T.fromJson(e, s);
            break;
          case 'enum':
            if (((t = de(n.T, e, s.ignoreUnknownFields, !0)), void 0 === t))
              continue;
            break;
          case 'scalar':
            try {
              t = ce(n.T, e, n.L, !0);
            } catch (t) {
              let s = `cannot decode field ${a.typeName}.${
                n.name
              } from JSON: ${le(e)}`;
              throw (
                (t instanceof Error &&
                  t.message.length > 0 &&
                  (s += `: ${t.message}`),
                new Error(s))
              );
            }
        }
        r.push(t);
      }
    } else if ('map' == n.kind) {
      if (null === t) return;
      if ('object' != typeof t || Array.isArray(t))
        throw new Error(
          `cannot decode field ${a.typeName}.${n.name} from JSON: ${le(t)}`
        );
      let r = e[i];
      for (let [e, i] of Object.entries(t)) {
        if (null === i)
          throw new Error(
            `cannot decode field ${a.typeName}.${n.name} from JSON: map value null`
          );
        let o;
        switch (n.V.kind) {
          case 'message':
            o = n.V.T.fromJson(i, s);
            break;
          case 'enum':
            if (((o = de(n.V.T, i, s.ignoreUnknownFields, !0)), void 0 === o))
              continue;
            break;
          case 'scalar':
            try {
              o = ce(n.V.T, i, y.BIGINT, !0);
            } catch (e) {
              let s = `cannot decode map value for field ${a.typeName}.${
                n.name
              } from JSON: ${le(t)}`;
              throw (
                (e instanceof Error &&
                  e.message.length > 0 &&
                  (s += `: ${e.message}`),
                new Error(s))
              );
            }
        }
        try {
          r[
            ce(
              n.K,
              n.K == g.BOOL ? 'true' == e || ('false' != e && e) : e,
              y.BIGINT,
              !0
            ).toString()
          ] = o;
        } catch (e) {
          let s = `cannot decode map key for field ${a.typeName}.${
            n.name
          } from JSON: ${le(t)}`;
          throw (
            (e instanceof Error &&
              e.message.length > 0 &&
              (s += `: ${e.message}`),
            new Error(s))
          );
        }
      }
    } else
      switch (n.kind) {
        case 'message':
          let o = n.T;
          if (null === t && 'google.protobuf.Value' != o.typeName) {
            if (n.oneof)
              throw new Error(
                `cannot decode field ${a.typeName}.${n.name} from JSON: null is invalid for oneof field`
              );
            return;
          }
          e[i] instanceof k
            ? e[i].fromJson(t, s)
            : ((e[i] = o.fromJson(t, s)),
              o.fieldWrapper &&
                !n.oneof &&
                (e[i] = o.fieldWrapper.unwrapField(e[i])));
          break;
        case 'enum':
          let l = de(n.T, t, s.ignoreUnknownFields, r);
          void 0 !== l && (e[i] = l);
          break;
        case 'scalar':
          try {
            e[i] = ce(n.T, t, n.L, r);
          } catch (e) {
            let s = `cannot decode field ${a.typeName}.${
              n.name
            } from JSON: ${le(t)}`;
            throw (
              (e instanceof Error &&
                e.message.length > 0 &&
                (s += `: ${e.message}`),
              new Error(s))
            );
          }
      }
  }
  function ce(e, t, n, s) {
    switch (e) {
      case g.DOUBLE:
      case g.FLOAT:
        if (null === t) return s ? 0 : void 0;
        if ('NaN' === t) return Number.NaN;
        if ('Infinity' === t) return Number.POSITIVE_INFINITY;
        if ('-Infinity' === t) return Number.NEGATIVE_INFINITY;
        if (
          '' === t ||
          ('string' == typeof t && t.trim().length !== t.length) ||
          ('string' != typeof t && 'number' != typeof t)
        )
          break;
        let a = Number(t);
        if (Number.isNaN(a) || !Number.isFinite(a)) break;
        return e == g.FLOAT && l(a), a;
      case g.INT32:
      case g.FIXED32:
      case g.SFIXED32:
      case g.SINT32:
      case g.UINT32:
        if (null === t) return s ? 0 : void 0;
        let r;
        if (
          ('number' == typeof t
            ? (r = t)
            : 'string' == typeof t &&
              t.length > 0 &&
              t.trim().length === t.length &&
              (r = Number(t)),
          void 0 === r)
        )
          break;
        return e == g.UINT32 ? o(r) : i(r), r;
      case g.INT64:
      case g.SFIXED64:
      case g.SINT64:
        if (null === t) return s ? M.zero : void 0;
        if ('number' != typeof t && 'string' != typeof t) break;
        let u = M.parse(t);
        return n ? u.toString() : u;
      case g.FIXED64:
      case g.UINT64:
        if (null === t) return s ? M.zero : void 0;
        if ('number' != typeof t && 'string' != typeof t) break;
        let c = M.uParse(t);
        return n ? c.toString() : c;
      case g.BOOL:
        if (null === t) return !s && void 0;
        if ('boolean' != typeof t) break;
        return t;
      case g.STRING:
        if (null === t) return s ? '' : void 0;
        if ('string' != typeof t) break;
        try {
          encodeURIComponent(t);
        } catch {
          throw new Error('invalid UTF8');
        }
        return t;
      case g.BYTES:
        if (null === t) return s ? new Uint8Array(0) : void 0;
        if ('' === t) return new Uint8Array(0);
        if ('string' != typeof t) break;
        return Z.dec(t);
    }
    throw new Error();
  }
  function de(e, t, n, s) {
    if (null === t) return s ? e.values[0].no : void 0;
    switch (typeof t) {
      case 'number':
        if (Number.isInteger(t)) return t;
        break;
      case 'string':
        let s = e.findName(t);
        if (s || n) return s?.no;
    }
    throw new Error(`cannot decode enum ${e.typeName} from JSON: ${le(t)}`);
  }
  function me(e, t, n, s) {
    var a;
    if (void 0 === t) return t;
    if (!n && e.values[0].no === t) return;
    if (s) return t;
    if ('google.protobuf.NullValue' == e.typeName) return null;
    let r = e.findNumber(t);
    return null !== (a = r?.name) && void 0 !== a ? a : t;
  }
  function fe(t, n, s) {
    if (void 0 !== n)
      switch (t) {
        case g.INT32:
        case g.SFIXED32:
        case g.SINT32:
        case g.FIXED32:
        case g.UINT32:
          return e('number' == typeof n), 0 != n || s ? n : void 0;
        case g.FLOAT:
        case g.DOUBLE:
          return (
            e('number' == typeof n),
            Number.isNaN(n)
              ? 'NaN'
              : n === Number.POSITIVE_INFINITY
              ? 'Infinity'
              : n === Number.NEGATIVE_INFINITY
              ? '-Infinity'
              : 0 !== n || s
              ? n
              : void 0
          );
        case g.STRING:
          return e('string' == typeof n), n.length > 0 || s ? n : void 0;
        case g.BOOL:
          return e('boolean' == typeof n), n || s ? n : void 0;
        case g.UINT64:
        case g.FIXED64:
        case g.INT64:
        case g.SFIXED64:
        case g.SINT64:
          return (
            e(
              'bigint' == typeof n ||
                'string' == typeof n ||
                'number' == typeof n
            ),
            s || 0 != n ? n.toString(10) : void 0
          );
        case g.BYTES:
          return (
            e(n instanceof Uint8Array),
            s || n.byteLength > 0 ? Z.enc(n) : void 0
          );
      }
  }
  function pe(e) {
    if (void 0 === e) return e;
    if (e instanceof k) return e.clone();
    if (e instanceof Uint8Array) {
      let t = new Uint8Array(e.byteLength);
      return t.set(e), t;
    }
    return e;
  }
  function ge(e) {
    return e instanceof Uint8Array ? e : new Uint8Array(e);
  }
  var he = class {
    constructor(e, t) {
      (this._fields = e), (this._normalizer = t);
    }
    findJsonName(e) {
      if (!this.jsonNames) {
        let e = {};
        for (let t of this.list()) e[t.jsonName] = e[t.name] = t;
        this.jsonNames = e;
      }
      return this.jsonNames[e];
    }
    find(e) {
      if (!this.numbers) {
        let e = {};
        for (let t of this.list()) e[t.no] = t;
        this.numbers = e;
      }
      return this.numbers[e];
    }
    list() {
      return this.all || (this.all = this._normalizer(this._fields)), this.all;
    }
    byNumber() {
      return (
        this.numbersAsc ||
          (this.numbersAsc = this.list()
            .concat()
            .sort((e, t) => e.no - t.no)),
        this.numbersAsc
      );
    }
    byMember() {
      if (!this.members) {
        this.members = [];
        let e,
          t = this.members;
        for (let n of this.list())
          n.oneof ? n.oneof !== e && ((e = n.oneof), t.push(e)) : t.push(n);
      }
      return this.members;
    }
  };
  function ye(e, t) {
    let n = Te(e);
    return t ? n : Fe(Ie(n));
  }
  var ke = Te;
  function Te(e) {
    let t = !1,
      n = [];
    for (let s = 0; s < e.length; s++) {
      let a = e.charAt(s);
      switch (a) {
        case '_':
          t = !0;
          break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          n.push(a), (t = !1);
          break;
        default:
          t && ((t = !1), (a = a.toUpperCase())), n.push(a);
      }
    }
    return n.join('');
  }
  var be = new Set(['constructor', 'toString', 'toJSON', 'valueOf']),
    we = new Set([
      'getType',
      'clone',
      'equals',
      'fromBinary',
      'fromJson',
      'fromJsonString',
      'toBinary',
      'toJson',
      'toJsonString',
      'toObject'
    ]),
    Ne = e => `${e}$`,
    Ie = e => (we.has(e) ? Ne(e) : e),
    Fe = e => (be.has(e) ? Ne(e) : e),
    ve = class {
      constructor(e) {
        (this.kind = 'oneof'),
          (this.repeated = !1),
          (this.packed = !1),
          (this.opt = !1),
          (this.default = void 0),
          (this.fields = []),
          (this.name = e),
          (this.localName = (function (e) {
            return ye(e, !1);
          })(e));
      }
      addField(t) {
        e(t.oneof === this, `field ${t.name} not one of ${this.name}`),
          this.fields.push(t);
      }
      findField(e) {
        if (!this._lookup) {
          this._lookup = Object.create(null);
          for (let e = 0; e < this.fields.length; e++)
            this._lookup[this.fields[e].localName] = this.fields[e];
        }
        return this._lookup[e];
      }
    },
    Se = (function (e, t, n, s) {
      return {
        syntax: e,
        json: t,
        bin: n,
        util: s,
        makeMessageType(e, t, n) {
          return (function (e, t, n, s) {
            var a;
            let r =
                null !== (a = s?.localName) && void 0 !== a
                  ? a
                  : t.substring(t.lastIndexOf('.') + 1),
              i = {
                [r]: function (t) {
                  e.util.initFields(this), e.util.initPartial(t, this);
                }
              }[r];
            return (
              Object.setPrototypeOf(i.prototype, new k()),
              Object.assign(i, {
                runtime: e,
                typeName: t,
                fields: e.util.newFieldList(n),
                fromBinary: (e, t) => new i().fromBinary(e, t),
                fromJson: (e, t) => new i().fromJson(e, t),
                fromJsonString: (e, t) => new i().fromJsonString(e, t),
                equals: (t, n) => e.util.equals(i, t, n)
              }),
              i
            );
          })(this, e, t, n);
        },
        makeEnum: f,
        makeEnumType: m,
        getEnumType: c,
        makeExtension(e, t, n) {
          return (function (e, t, n, s) {
            let a;
            return {
              typeName: t,
              extendee: n,
              get field() {
                if (!a) {
                  let n = 'function' == typeof s ? s() : s;
                  (n.name = t.split('.').pop()),
                    (n.jsonName = `[${t}]`),
                    (a = e.util.newFieldList([n]).list()[0]);
                }
                return a;
              },
              runtime: e
            };
          })(this, e, t, n);
        }
      };
    })(
      'proto3',
      (function (e, t) {
        let n = t(me, fe);
        return {
          makeReadOptions: ie,
          makeWriteOptions: oe,
          readMessage(t, n, s, a) {
            if (null == n || Array.isArray(n) || 'object' != typeof n)
              throw new Error(
                `cannot decode message ${t.typeName} from JSON: ${le(n)}`
              );
            a = a ?? new t();
            let r = new Map(),
              i = s.typeRegistry;
            for (let [o, l] of Object.entries(n)) {
              let n = t.fields.findJsonName(o);
              if (n) {
                if (n.oneof) {
                  if (null === l && 'scalar' == n.kind) continue;
                  let e = r.get(n.oneof);
                  if (void 0 !== e)
                    throw new Error(
                      `cannot decode message ${t.typeName} from JSON: multiple keys for oneof "${n.oneof.name}" present: "${e}", "${o}"`
                    );
                  r.set(n.oneof, o);
                }
                ue(a, l, n, s, t, e);
              } else {
                let e = !1;
                if (i?.findExtension && o.startsWith('[') && o.endsWith(']')) {
                  let n = i.findExtension(o.substring(1, o.length - 1));
                  if (n && n.extendee.typeName == t.typeName) {
                    e = !0;
                    let [t, r] = j(n);
                    ue(t, l, n.field, s, n, !0), te(a, n, r(), s);
                  }
                }
                if (!e && !s.ignoreUnknownFields)
                  throw new Error(
                    `cannot decode message ${t.typeName} from JSON: key "${o}" is unknown`
                  );
              }
            }
            return a;
          },
          writeMessage(e, t) {
            let s,
              a = e.getType(),
              r = {};
            try {
              for (let i of a.fields.byMember()) {
                let a;
                if ('oneof' == i.kind) {
                  let r = e[i.localName];
                  if (void 0 === r.value) continue;
                  if (((s = i.findField(r.case)), !s))
                    throw 'oneof case not found: ' + r.case;
                  a = n(s, r.value, t);
                } else (s = i), (a = n(s, e[s.localName], t));
                void 0 !== a &&
                  (r[t.useProtoFieldName ? s.name : s.jsonName] = a);
              }
              let i = t.typeRegistry;
              if (i?.findExtensionFor)
                for (let s of a.runtime.bin.listUnknownFields(e)) {
                  let o = i.findExtensionFor(a.typeName, s.no);
                  if (o && ne(e, o)) {
                    let s = ee(e, o, t),
                      a = n(o.field, s, t);
                    void 0 !== a && (r[o.field.jsonName] = a);
                  }
                }
            } catch (e) {
              let t = s
                  ? `cannot encode field ${a.typeName}.${s.name} to JSON`
                  : `cannot encode message ${a.typeName} to JSON`,
                n = e instanceof Error ? e.message : String(e);
              throw new Error(t + (n.length > 0 ? `: ${n}` : ''));
            }
            return r;
          },
          readScalar: (t, n, s) => ce(t, n, s, e),
          writeScalar: fe,
          debug: le
        };
      })(
        !0,
        (t, n) =>
          function (s, a, r) {
            if ('map' == s.kind) {
              let i = {};
              switch (s.V.kind) {
                case 'scalar':
                  for (let [t, r] of Object.entries(a)) {
                    let a = n(s.V.T, r, !0);
                    e(void 0 !== a), (i[t.toString()] = a);
                  }
                  break;
                case 'message':
                  for (let [e, t] of Object.entries(a))
                    i[e.toString()] = t.toJson(r);
                  break;
                case 'enum':
                  let o = s.V.T;
                  for (let [n, s] of Object.entries(a)) {
                    e(void 0 === s || 'number' == typeof s);
                    let a = t(o, s, !0, r.enumAsInteger);
                    e(void 0 !== a), (i[n.toString()] = a);
                  }
              }
              return r.emitDefaultValues || Object.keys(i).length > 0
                ? i
                : void 0;
            }
            if (s.repeated) {
              let e = [];
              switch (s.kind) {
                case 'scalar':
                  for (let t = 0; t < a.length; t++) e.push(n(s.T, a[t], !0));
                  break;
                case 'enum':
                  for (let n = 0; n < a.length; n++)
                    e.push(t(s.T, a[n], !0, r.enumAsInteger));
                  break;
                case 'message':
                  for (let t = 0; t < a.length; t++) e.push(a[t].toJson(r));
              }
              return r.emitDefaultValues || e.length > 0 ? e : void 0;
            }
            if (void 0 !== a)
              switch (s.kind) {
                case 'scalar':
                  return n(s.T, a, !!s.oneof || s.opt || r.emitDefaultValues);
                case 'enum':
                  return t(
                    s.T,
                    a,
                    !!s.oneof || s.opt || r.emitDefaultValues,
                    r.enumAsInteger
                  );
                case 'message':
                  return L(s.T, a).toJson(r);
              }
          }
      ),
      Object.assign(
        Object.assign(
          {},
          {
            makeReadOptions: C,
            makeWriteOptions: J,
            listUnknownFields(e) {
              var t;
              return null !== (t = e[P]) && void 0 !== t ? t : [];
            },
            discardUnknownFields(e) {
              delete e[P];
            },
            writeUnknownFields(e, t) {
              let n = e[P];
              if (n) for (let e of n) t.tag(e.no, e.wireType).raw(e.data);
            },
            onUnknownField(e, t, n, s) {
              let a = e;
              Array.isArray(a[P]) || (a[P] = []),
                a[P].push({ no: t, wireType: n, data: s });
            },
            readMessage(e, t, n, s, a) {
              let r,
                i,
                o = e.getType(),
                l = a ? t.len : t.pos + n;
              for (; t.pos < l && (([r, i] = t.tag()), i != O.EndGroup); ) {
                let n = o.fields.find(r);
                if (n) G(e, t, n, i, s);
                else {
                  let n = t.skip(i);
                  s.readUnknownFields && this.onUnknownField(e, r, i, n);
                }
              }
              if (a && (i != O.EndGroup || r !== n))
                throw new Error('invalid end group tag');
            },
            readField: G
          }
        ),
        {
          writeField: K,
          writeMessage(e, t, n) {
            let s = e.getType();
            for (let a of s.fields.byNumber()) {
              let s,
                r = a.localName;
              if (a.oneof) {
                let t = e[a.oneof.localName];
                if (t.case !== r) continue;
                s = t.value;
              } else s = e[r];
              K(a, s, t, n);
            }
            return n.writeUnknownFields && this.writeUnknownFields(e, t), t;
          }
        }
      ),
      Object.assign(
        Object.assign(
          {},
          {
            setEnumType: d,
            initPartial(e, t) {
              if (void 0 === e) return;
              let n = t.getType();
              for (let s of n.fields.byMember()) {
                let n = s.localName,
                  a = t,
                  r = e;
                if (void 0 !== r[n])
                  switch (s.kind) {
                    case 'oneof':
                      let e = r[n].case;
                      if (void 0 === e) continue;
                      let t = s.findField(e),
                        i = r[n].value;
                      !t || 'message' != t.kind || i instanceof t.T
                        ? t &&
                          'scalar' === t.kind &&
                          t.T === g.BYTES &&
                          (i = ge(i))
                        : (i = new t.T(i)),
                        (a[n] = { case: e, value: i });
                      break;
                    case 'scalar':
                    case 'enum':
                      let o = r[n];
                      s.T === g.BYTES && (o = s.repeated ? o.map(ge) : ge(o)),
                        (a[n] = o);
                      break;
                    case 'map':
                      switch (s.V.kind) {
                        case 'scalar':
                        case 'enum':
                          if (s.V.T === g.BYTES)
                            for (let [e, t] of Object.entries(r[n]))
                              a[n][e] = ge(t);
                          else Object.assign(a[n], r[n]);
                          break;
                        case 'message':
                          let e = s.V.T;
                          for (let t of Object.keys(r[n])) {
                            let s = r[n][t];
                            e.fieldWrapper || (s = new e(s)), (a[n][t] = s);
                          }
                      }
                      break;
                    case 'message':
                      let l = s.T;
                      if (s.repeated)
                        a[n] = r[n].map(e => (e instanceof l ? e : new l(e)));
                      else if (void 0 !== r[n]) {
                        let e = r[n];
                        l.fieldWrapper
                          ? 'google.protobuf.BytesValue' === l.typeName
                            ? (a[n] = ge(e))
                            : (a[n] = e)
                          : (a[n] = e instanceof l ? e : new l(e));
                      }
                  }
              }
            },
            equals: (e, t, n) =>
              t === n ||
              (!(!t || !n) &&
                e.fields.byMember().every(e => {
                  let s = t[e.localName],
                    a = n[e.localName];
                  if (e.repeated) {
                    if (s.length !== a.length) return !1;
                    switch (e.kind) {
                      case 'message':
                        return s.every((t, n) => e.T.equals(t, a[n]));
                      case 'scalar':
                        return s.every((t, n) => x(e.T, t, a[n]));
                      case 'enum':
                        return s.every((e, t) => x(g.INT32, e, a[t]));
                    }
                    throw new Error(`repeated cannot contain ${e.kind}`);
                  }
                  switch (e.kind) {
                    case 'message':
                      return e.T.equals(s, a);
                    case 'enum':
                      return x(g.INT32, s, a);
                    case 'scalar':
                      return x(e.T, s, a);
                    case 'oneof':
                      if (s.case !== a.case) return !1;
                      let t = e.findField(s.case);
                      if (void 0 === t) return !0;
                      switch (t.kind) {
                        case 'message':
                          return t.T.equals(s.value, a.value);
                        case 'enum':
                          return x(g.INT32, s.value, a.value);
                        case 'scalar':
                          return x(t.T, s.value, a.value);
                      }
                      throw new Error(`oneof cannot contain ${t.kind}`);
                    case 'map':
                      let n = Object.keys(s).concat(Object.keys(a));
                      switch (e.V.kind) {
                        case 'message':
                          let t = e.V.T;
                          return n.every(e => t.equals(s[e], a[e]));
                        case 'enum':
                          return n.every(e => x(g.INT32, s[e], a[e]));
                        case 'scalar':
                          let r = e.V.T;
                          return n.every(e => x(r, s[e], a[e]));
                      }
                  }
                })),
            clone(e) {
              let t = e.getType(),
                n = new t(),
                s = n;
              for (let n of t.fields.byMember()) {
                let t,
                  a = e[n.localName];
                if (n.repeated) t = a.map(pe);
                else if ('map' == n.kind) {
                  t = s[n.localName];
                  for (let [e, n] of Object.entries(a)) t[e] = pe(n);
                } else
                  t =
                    'oneof' == n.kind
                      ? n.findField(a.case)
                        ? { case: a.case, value: pe(a.value) }
                        : { case: void 0 }
                      : pe(a);
                s[n.localName] = t;
              }
              return n;
            }
          }
        ),
        {
          newFieldList: e => new he(e, Ee),
          initFields(e) {
            for (let t of e.getType().fields.byMember()) {
              if (t.opt) continue;
              let n = t.localName,
                s = e;
              if (t.repeated) s[n] = [];
              else
                switch (t.kind) {
                  case 'oneof':
                    s[n] = { case: void 0 };
                    break;
                  case 'enum':
                    s[n] = 0;
                    break;
                  case 'map':
                    s[n] = {};
                    break;
                  case 'scalar':
                    s[n] = $(t.T, t.L);
                }
            }
          }
        }
      )
    );
  function Ee(e) {
    var t, n, s, a;
    let r,
      i = [];
    for (let o of 'function' == typeof e ? e() : e) {
      let e = o;
      if (
        ((e.localName = ye(o.name, void 0 !== o.oneof)),
        (e.jsonName =
          null !== (t = o.jsonName) && void 0 !== t ? t : ke(o.name)),
        (e.repeated = null !== (n = o.repeated) && void 0 !== n && n),
        'scalar' == o.kind &&
          (e.L = null !== (s = o.L) && void 0 !== s ? s : y.BIGINT),
        void 0 !== o.oneof)
      ) {
        let t = 'string' == typeof o.oneof ? o.oneof : o.oneof.name;
        (!r || r.name != t) && (r = new ve(t)), (e.oneof = r), r.addField(e);
      }
      'message' == o.kind && (e.delimited = !1),
        (e.packed =
          null !== (a = o.packed) && void 0 !== a
            ? a
            : 'enum' == o.kind ||
              ('scalar' == o.kind && o.T != g.BYTES && o.T != g.STRING)),
        i.push(e);
    }
    return i;
  }
  Se.makeMessageType('youtube.request.Request', () => [
    { no: 1, name: 'context', kind: 'message', T: Be },
    { no: 2, name: 'browseId', kind: 'scalar', T: 9 }
  ]);
  var Be = Se.makeMessageType('youtube.request.Context', () => [
      { no: 9, name: 'adSignalsInfo', kind: 'message', T: Oe }
    ]),
    Oe = Se.makeMessageType('youtube.request.AdSignalsInfo', () => [
      { no: 1, name: 'params', kind: 'message', T: Me, repeated: !0 }
    ]),
    Me = Se.makeMessageType('youtube.request.Params', () => [
      { no: 1, name: 'key', kind: 'scalar', T: 9 },
      { no: 2, name: 'value', kind: 'scalar', T: 9 }
    ]),
    Ae = Se.makeMessageType('youtube.response.Browse', () => [
      { no: 1, name: 'responseContext', kind: 'message', T: Ue },
      { no: 9, name: 'n1F9', kind: 'message', T: $e },
      { no: 10, name: 'n1F10', kind: 'message', T: De }
    ]),
    Ue = Se.makeMessageType('youtube.response.ResponseContext', () => [
      {
        no: 6,
        name: 'serviceTrackingParams',
        kind: 'message',
        T: xe,
        repeated: !0
      }
    ]),
    xe = Se.makeMessageType('youtube.response.ServiceTrackingParams', () => [
      { no: 1, name: 'service', kind: 'scalar', T: 5 },
      { no: 2, name: 'params', kind: 'message', T: Me, repeated: !0 }
    ]),
    $e = Se.makeMessageType('youtube.response.n1F9', () => [
      { no: 58173949, name: 'm2F58173949', kind: 'message', T: je },
      { no: 153515154, name: 'n6F153515154', kind: 'message', T: We },
      { no: 49399797, name: 'n2F49399797', kind: 'message', T: Ve }
    ]),
    De = Se.makeMessageType('youtube.response.n1F10', () => [
      { no: 49399797, name: 'n2F49399797', kind: 'message', T: Ve }
    ]),
    je = Se.makeMessageType('youtube.response.m2F58173949', () => [
      { no: 1, name: 'm3F1', kind: 'message', T: Le, repeated: !0 }
    ]),
    Le = Se.makeMessageType('youtube.response.m3F1', () => [
      { no: 58174010, name: 'm4F58174010', kind: 'message', T: Pe }
    ]),
    Pe = Se.makeMessageType('youtube.response.m4F58174010', () => [
      { no: 4, name: 'n1F10', kind: 'message', T: De }
    ]),
    Ve = Se.makeMessageType('youtube.response.n2F49399797', () => [
      { no: 1, name: 'n3F1', kind: 'message', T: Re, repeated: !0 }
    ]),
    Re = Se.makeMessageType('youtube.response.n3F1', () => [
      { no: 50195462, name: 'n4F50195462', kind: 'message', T: Ce },
      { no: 51845067, name: 'n4F51845067', kind: 'message', T: Je },
      { no: 221496734, name: 'm4F221496734', kind: 'message', T: Ge }
    ]),
    Ce = Se.makeMessageType('youtube.response.n4F50195462', () => [
      { no: 1, name: 'n5F1', kind: 'message', T: Xe, repeated: !0 }
    ]),
    Je = Se.makeMessageType('youtube.response.n4F51845067', () => [
      { no: 5, name: 'n5F5', kind: 'message', T: Ye }
    ]),
    Ge = Se.makeMessageType('youtube.response.n4F221496734', () => [
      { no: 3, name: 'n5F3', kind: 'message', T: _e },
      { no: 10, name: 'n5F10', kind: 'message', T: He }
    ]),
    Xe = Se.makeMessageType('youtube.response.n5F1', () => [
      { no: 153515154, name: 'n6F153515154', kind: 'message', T: We }
    ]),
    _e = Se.makeMessageType('youtube.response.n5F3', () => [
      { no: 1, name: 'n6F1', kind: 'message', T: qe }
    ]),
    Ye = Se.makeMessageType('youtube.response.n5F5', () => [
      { no: 51431404, name: 'n6F51431404', kind: 'message', T: ze }
    ]),
    qe = Se.makeMessageType('youtube.response.n6F1', () => [
      { no: 1, name: 'staticLyric', kind: 'scalar', T: 9 }
    ]),
    We = Se.makeMessageType('youtube.response.n6F153515154', () => [
      { no: 172660663, name: 'n7F172660663', kind: 'message', T: Ke }
    ]),
    ze = Se.makeMessageType('youtube.response.n6F51431404', () => [
      { no: 1, name: 'n5F1', kind: 'message', T: Xe, repeated: !0 }
    ]),
    Ke = Se.makeMessageType('youtube.response.n7F172660663', () => [
      { no: 1, name: 'n8F1', kind: 'message', T: Qe },
      { no: 2, name: 'n8F2', kind: 'message', T: Ze },
      { no: 3, name: 'n8F3', kind: 'message', T: et }
    ]),
    He = Se.makeMessageType('youtube.response.n5F10', () => [
      { no: 1, name: 'origin', kind: 'message', T: tt }
    ]),
    Qe = Se.makeMessageType('youtube.response.n8F1', () => [
      { no: 168777401, name: 'n9F168777401', kind: 'message', T: nt }
    ]),
    Ze = Se.makeMessageType('youtube.response.n8F2', () => [
      { no: 183314536, name: 'n9F183314536', kind: 'message', T: st }
    ]),
    et = Se.makeMessageType('youtube.response.n8F3', () => [
      { no: 1, name: 'n8F1', kind: 'message', T: Qe },
      { no: 2, name: 'n8F2', kind: 'message', T: Ze }
    ]),
    tt = Se.makeMessageType('youtube.response.Origin', () => [
      { no: 1, name: 'originText', kind: 'scalar', T: 9 }
    ]),
    nt = Se.makeMessageType('youtube.response.n9F168777401', () => [
      { no: 3, name: 'n10F3', kind: 'message', T: at },
      { no: 5, name: 'n10F5', kind: 'message', T: rt }
    ]),
    st = Se.makeMessageType('youtube.response.n9F183314536', () => [
      { no: 1, name: 'type', kind: 'scalar', T: 9 }
    ]),
    at = Se.makeMessageType('youtube.response.n10F3', () => [
      { no: 172035250, name: 'n11F172035250', kind: 'message', T: ut }
    ]),
    rt = Se.makeMessageType('youtube.response.n10F5', () => [
      { no: 465160965, name: 'n11F465160965', kind: 'message', T: it }
    ]),
    it = Se.makeMessageType('youtube.response.n11F465160965', () => [
      { no: 4, name: 'n12F4', kind: 'message', T: ot }
    ]),
    ot = Se.makeMessageType('youtube.response.n12F4', () => [
      { no: 1, name: 'n13F1', kind: 'message', T: lt, repeated: !0 },
      { no: 2, name: 'originText', kind: 'scalar', T: 9 }
    ]),
    lt = Se.makeMessageType('youtube.response.n13F1', () => [
      { no: 1, name: 'f1', kind: 'scalar', T: 9 }
    ]),
    ut = Se.makeMessageType('youtube.response.n11F172035250', () => [
      { no: 1, name: 'type', kind: 'scalar', T: 9 }
    ]),
    ct = Se.makeMessageType('youtube.response.Next', () => [
      { no: 7, name: 'a1F7', kind: 'message', T: dt },
      { no: 8, name: 'a1F8', kind: 'message', T: mt }
    ]),
    dt = Se.makeMessageType('youtube.response.a1F7', () => [
      { no: 51779735, name: 'a2F51779735', kind: 'message', T: bt },
      { no: 125354411, name: 'musicPlayRender', kind: 'message', T: ft }
    ]),
    mt = Se.makeMessageType('youtube.response.a1F8', () => [
      { no: 49399797, name: 'n2F49399797', kind: 'message', T: Ve }
    ]),
    ft = Se.makeMessageType('youtube.response.MusicPlayRender', () => [
      { no: 7, name: 'bottomRender', kind: 'message', T: pt }
    ]),
    pt = Se.makeMessageType('youtube.response.BottomRender', () => [
      { no: 91700600, name: 'sectionTab', kind: 'message', T: gt }
    ]),
    gt = Se.makeMessageType('youtube.response.SectionTab', () => [
      { no: 1, name: 'items', kind: 'message', T: ht, repeated: !0 }
    ]),
    ht = Se.makeMessageType('youtube.response.Item', () => [
      { no: 58174010, name: 'tab', kind: 'message', T: yt }
    ]),
    yt = Se.makeMessageType('youtube.response.Tab', () => [
      { no: 1, name: 'info', kind: 'message', T: kt },
      { no: 2, name: 'name', kind: 'scalar', T: 9 }
    ]),
    kt = Se.makeMessageType('youtube.response.Info', () => [
      { no: 48687626, name: 'BrowseInfo', kind: 'message', T: Tt }
    ]),
    Tt = Se.makeMessageType('youtube.response.BrowseInfo', () => [
      { no: 2, name: 'browseId', kind: 'scalar', T: 9 }
    ]),
    bt = Se.makeMessageType('youtube.response.a2F51779735', () => [
      { no: 1, name: 'a3F1', kind: 'message', T: wt }
    ]),
    wt = Se.makeMessageType('youtube.response.a3F1', () => [
      { no: 49399797, name: 'n2F49399797', kind: 'message', T: Ve }
    ]),
    Nt = Se.makeMessageType('youtube.response.Search', () => [
      { no: 4, name: 's1F4', kind: 'message', T: It },
      { no: 7, name: 's1F7', kind: 'message', T: Ft }
    ]),
    It = Se.makeMessageType('youtube.response.s1F4', () => [
      { no: 49399797, name: 'n2F49399797', kind: 'message', T: Ve }
    ]),
    Ft = Se.makeMessageType('youtube.response.s1F7', () => [
      { no: 50195462, name: 'n4F50195462', kind: 'message', T: Ce },
      { no: 49399797, name: 'n2F49399797', kind: 'message', T: Ve }
    ]),
    vt = Se.makeMessageType('youtube.response.Shorts', () => [
      { no: 2, name: 'entries', kind: 'message', T: St, repeated: !0 }
    ]),
    St = Se.makeMessageType('youtube.response.Entry', () => [
      { no: 1, name: 'command', kind: 'message', T: Et }
    ]),
    Et = Se.makeMessageType('youtube.response.Command', () => [
      { no: 139608561, name: 'reelWatchEndpoint', kind: 'message', T: Bt }
    ]),
    Bt = Se.makeMessageType('youtube.response.ReelWatchEndpoint', () => [
      { no: 8, name: 'overlay', kind: 'message', T: Ot }
    ]),
    Ot = Se.makeMessageType('youtube.response.Overlay', () => [
      {
        no: 139970731,
        name: 'reelPlayerOverlayRenderer',
        kind: 'message',
        T: Mt
      }
    ]),
    Mt = Se.makeMessageType(
      'youtube.response.ReelPlayerOverlayRenderer',
      () => [{ no: 12, name: 'style', kind: 'scalar', T: 5 }]
    ),
    At = Se.makeMessageType('youtube.response.Guide', () => [
      { no: 4, name: 'guideItem4', kind: 'message', T: Ut, repeated: !0 },
      { no: 6, name: 'guideItem6', kind: 'message', T: Ut, repeated: !0 }
    ]),
    Ut = Se.makeMessageType('youtube.response.GuideItem', () => [
      { no: 117866661, name: 'guideSectionRenderer', kind: 'message', T: xt }
    ]),
    xt = Se.makeMessageType('youtube.response.GuideSectionRenderer', () => [
      { no: 1, name: 'rendererItems', kind: 'message', T: $t, repeated: !0 }
    ]),
    $t = Se.makeMessageType('youtube.response.RendererItem', () => [
      { no: 318370163, name: 'iconRender', kind: 'message', T: Dt },
      { no: 117501096, name: 'labelRender', kind: 'message', T: Dt }
    ]),
    Dt = Se.makeMessageType('youtube.response.guideEntryRenderer', () => [
      { no: 1, name: 'browseId', kind: 'scalar', T: 9 }
    ]),
    jt = Se.makeMessageType('youtube.response.Player', () => [
      { no: 7, name: 'adPlacements', kind: 'message', T: Lt, repeated: !0 },
      { no: 2, name: 'playabilityStatus', kind: 'message', T: Vt },
      { no: 10, name: 'captions', kind: 'message', T: Xt }
    ]),
    Lt = Se.makeMessageType('youtube.response.AdPlacement', () => [
      { no: 84813246, name: 'adPlacementRenderer', kind: 'message', T: Pt }
    ]),
    Pt = Se.makeMessageType('youtube.response.AdPlacementRenderer', () => [
      { no: 4, name: 'params', kind: 'scalar', T: 9 }
    ]),
    Vt = Se.makeMessageType('youtube.response.PlayabilityStatus', () => [
      { no: 21, name: 'pipAbility', kind: 'message', T: Rt },
      { no: 11, name: 'backgroundAbility', kind: 'message', T: Ct }
    ]),
    Rt = Se.makeMessageType('youtube.response.PIPAbility', () => [
      { no: 151635310, name: 'piplayer', kind: 'message', T: Jt }
    ]),
    Ct = Se.makeMessageType('youtube.response.BackgroundAbility', () => [
      { no: 64657230, name: 'backgroundPlayer', kind: 'message', T: Gt }
    ]),
    Jt = Se.makeMessageType('youtube.response.PIPlayer', () => [
      { no: 1, name: 'active', kind: 'scalar', T: 8 }
    ]),
    Gt = Se.makeMessageType('youtube.response.BackgroundPlayer', () => [
      { no: 1, name: 'active', kind: 'scalar', T: 8 }
    ]),
    Xt = Se.makeMessageType('youtube.response.Captions', () => [
      {
        no: 51621377,
        name: 'playerCaptionsTracklistRenderer',
        kind: 'message',
        T: _t
      }
    ]),
    _t = Se.makeMessageType(
      'youtube.response.PlayerCaptionsTracklistRenderer',
      () => [
        { no: 1, name: 'captionTracks', kind: 'message', T: Yt, repeated: !0 },
        { no: 2, name: 'audioTracks', kind: 'message', T: qt, repeated: !0 },
        {
          no: 3,
          name: 'translationLanguages',
          kind: 'message',
          T: Wt,
          repeated: !0
        },
        {
          no: 4,
          name: 'defaultAudioTrackIndex',
          kind: 'scalar',
          T: 5,
          opt: !0
        },
        {
          no: 6,
          name: 'defaultCaptionTrackIndex',
          kind: 'scalar',
          T: 5,
          opt: !0
        }
      ]
    ),
    Yt = Se.makeMessageType('youtube.response.CaptionTrack', () => [
      { no: 1, name: 'baseUrl', kind: 'scalar', T: 9 },
      { no: 2, name: 'name', kind: 'message', T: zt },
      { no: 3, name: 'vssId', kind: 'scalar', T: 9 },
      { no: 4, name: 'languageCode', kind: 'scalar', T: 9 },
      { no: 5, name: 'kind', kind: 'scalar', T: 9, opt: !0 },
      { no: 6, name: 'rtl', kind: 'scalar', T: 8, opt: !0 },
      { no: 7, name: 'isTranslatable', kind: 'scalar', T: 8 }
    ]),
    qt = Se.makeMessageType('youtube.response.AudioTrack', () => [
      {
        no: 2,
        name: 'captionTrackIndices',
        kind: 'scalar',
        T: 5,
        repeated: !0,
        packed: !1
      },
      {
        no: 3,
        name: 'defaultCaptionTrackIndex',
        kind: 'scalar',
        T: 5,
        opt: !0
      },
      { no: 4, name: 'forcedCaptionTrackIndex', kind: 'scalar', T: 5, opt: !0 },
      { no: 5, name: 'visibility', kind: 'scalar', T: 5, opt: !0 },
      { no: 6, name: 'hasDefaultTrack', kind: 'scalar', T: 8, opt: !0 },
      { no: 7, name: 'hasForcedTrack', kind: 'scalar', T: 8, opt: !0 },
      { no: 8, name: 'audioTrackId', kind: 'scalar', T: 9, opt: !0 },
      { no: 11, name: 'captionsInitialState', kind: 'scalar', T: 5, opt: !0 }
    ]),
    Wt = Se.makeMessageType('youtube.response.TranslationLanguage', () => [
      { no: 1, name: 'languageCode', kind: 'scalar', T: 9 },
      { no: 2, name: 'languageName', kind: 'message', T: zt }
    ]),
    zt = Se.makeMessageType('youtube.response.Name', () => [
      { no: 1, name: 'runs', kind: 'message', T: Kt, repeated: !0 }
    ]),
    Kt = Se.makeMessageType(
      'youtube.response.Name.Runs',
      () => [{ no: 1, name: 'text', kind: 'scalar', T: 9 }],
      { localName: 'Name_Runs' }
    ),
    Ht = Se.makeMessageType('youtube.response.Setting', () => [
      { no: 6, name: 'settingItems', kind: 'message', T: Qt, repeated: !0 },
      { no: 10, name: 'trackingParams', kind: 'message', T: Zt }
    ]),
    Qt = Se.makeMessageType('youtube.response.SettingItem', () => [
      {
        no: 88478200,
        name: 'settingCategoryEntryRenderer',
        kind: 'message',
        T: tn
      },
      {
        no: 66930374,
        name: 'settingCategoryCollectionRenderer',
        kind: 'message',
        T: nn
      }
    ]),
    Zt = Se.makeMessageType('youtube.response.TrackingParams', () => [
      { no: 1, name: 'f1', kind: 'scalar', T: 5 },
      { no: 2, name: 'f2', kind: 'scalar', T: 5 },
      { no: 3, name: 'f3', kind: 'scalar', T: 5 },
      { no: 4, name: 'timeInfo', kind: 'message', T: en }
    ]),
    en = Se.makeMessageType('youtube.response.TimeInfo', () => [
      { no: 1, name: 'timestamp', kind: 'scalar', T: 4, L: 1 },
      { no: 2, name: 'f2', kind: 'scalar', T: 7 },
      { no: 3, name: 'f3', kind: 'scalar', T: 7 }
    ]),
    tn = Se.makeMessageType(
      'youtube.response.SettingCategoryEntryRenderer',
      () => [
        { no: 2, name: 'f2', kind: 'scalar', T: 5 },
        { no: 3, name: 'f3', kind: 'scalar', T: 5 },
        { no: 5, name: 'trackingParams', kind: 'message', T: Zt },
        { no: 6, name: 'f6', kind: 'scalar', T: 5 },
        { no: 7, name: 'f7', kind: 'scalar', T: 5 },
        { no: 8, name: 'f8', kind: 'scalar', T: 5 },
        { no: 9, name: 'f9', kind: 'scalar', T: 5 },
        { no: 10, name: 'f10', kind: 'scalar', T: 5 },
        { no: 12, name: 'f12', kind: 'scalar', T: 5 }
      ]
    ),
    nn = Se.makeMessageType(
      'youtube.response.SettingCategoryCollectionRenderer',
      () => [
        { no: 3, name: 'subSettings', kind: 'message', T: sn, repeated: !0 },
        { no: 4, name: 'categoryId', kind: 'scalar', T: 5 }
      ]
    ),
    sn = Se.makeMessageType('youtube.response.SubSetting', () => [
      { no: 61331416, name: 'settingBooleanRenderer', kind: 'message', T: an }
    ]),
    an = Se.makeMessageType('youtube.response.SettingBooleanRenderer', () => [
      { no: 5, name: 'enableServiceEndpoint', kind: 'message', T: rn },
      { no: 6, name: 'disableServiceEndpoint', kind: 'message', T: rn },
      { no: 13, name: 'clickTrackingParams', kind: 'message', T: Zt },
      { no: 15, name: 'itemId', kind: 'scalar', T: 5 }
    ]),
    rn = Se.makeMessageType('youtube.response.ServiceEndpoint', () => [
      { no: 2, name: 'trackingParams', kind: 'message', T: Zt },
      { no: 81212182, name: 'setClientSettingEndpoint', kind: 'message', T: on }
    ]),
    on = Se.makeMessageType('youtube.response.SetClientSettingEndpoint', () => [
      { no: 1, name: 'settingDatas', kind: 'message', T: ln }
    ]),
    ln = Se.makeMessageType('youtube.response.SettingDatas', () => [
      { no: 1, name: 'clientSettingEnum', kind: 'message', T: un },
      { no: 3, name: 'boolValue', kind: 'scalar', T: 8 }
    ]),
    un = Se.makeMessageType('youtube.response.ClientSettingEnum', () => [
      { no: 1, name: 'item', kind: 'scalar', T: 5 }
    ]),
    cn = class {
      constructor(e, t, n) {
        (this._times = new Map()),
          (this.name = e ?? ''),
          (this.debug = n?.debug ?? !1),
          e && this.log(`${e} Start`),
          (this.className = t ?? ''),
          this.init();
      }
      static getInstance(e, t) {
        let n = typeof $task < 'u' ? 'QuanX' : 'Surge';
        return (
          cn.instances[n] || (cn.instances[n] = cn.classNames[n](e, n, t)),
          cn.instances[n]
        );
      }
      createProxy(e) {
        return new Proxy(e, { get: this.getFn, set: this.setFn });
      }
      getFn(e, t, n) {
        return e[t];
      }
      setFn(e, t, n, s) {
        return (e[t] = n), !0;
      }
      getJSON(e, t = {}) {
        let n = this.getVal(e);
        return n ? JSON.parse(n) : t;
      }
      setJSON(e, t) {
        this.setVal(JSON.stringify(e), t);
      }
      msg(e = this.name, t = '', n = '', s) {}
      log(e) {
        this.debug && 'object' == typeof e && (e = JSON.stringify(e));
      }
      timeStart(e) {
        (this._times = this._times || {}), (this._times[e] = Date.now());
      }
      timeEnd(e) {
        if (this._times?.has(e)) {
          let t = Date.now() - this._times[e];
          this.log(`${e}: ${t}ms`), this._times.delete(e);
        } else this.log(`Timer with label ${e} does not exist.`);
      }
      exit() {
        $done({});
      }
      reject() {
        $done();
      }
    },
    dn = cn;
  (dn.instances = {}),
    (dn.classNames = {
      QuanX: (e, t, n) => new gn(e, t, n),
      Surge: (e, t, n) => new fn(e, t, n)
    });
  var mn = class extends dn {
      getFn(e, t, n) {
        let s = mn.clientAdapter[t] || t;
        return super.getFn(e, s, n);
      }
      setFn(e, t, n, s) {
        let a = mn.clientAdapter[t] || t;
        return super.setFn(e, a, n, s);
      }
      init() {
        try {
          (this.request = this.createProxy($request)),
            (this.response = this.createProxy($response));
        } catch (e) {
          this.log(e.toString());
        }
      }
      getVal(e) {
        return $persistentStore.read(e);
      }
      setVal(e, t) {
        $persistentStore.write(e, t);
      }
      msg(e = this.name, t = '', n = '', s) {
        $notification.post(e, t, n, { url: s ?? '' });
      }
      async fetch(e) {
        return await new Promise((t, n) => {
          let { method: s, body: a, bodyBytes: r, ...i } = e,
            o = r ?? a,
            l = o instanceof Uint8Array;
          $httpClient[s.toLowerCase()](
            { ...i, body: o, 'binary-mode': l },
            (e, s, a) => {
              e && n(e);
              let r = l ? 'bodyBytes' : 'body';
              t({
                status: s.status || s.statusCode,
                headers: s.headers,
                [r]: a
              });
            }
          );
        });
      }
      done(e) {
        let t,
          n,
          s = e.response ?? e;
        s.bodyBytes
          ? ((t = s.bodyBytes),
            delete s.bodyBytes,
            (n = { ...e }),
            n.response ? (n.response.body = t) : (n.body = t))
          : (n = e),
          $done(n);
      }
    },
    fn = mn;
  fn.clientAdapter = { bodyBytes: 'body' };
  var pn = class extends dn {
      static transferBodyBytes(e, t) {
        return e instanceof ArrayBuffer
          ? 'Uint8Array' === t
            ? new Uint8Array(e)
            : e
          : e instanceof Uint8Array && 'ArrayBuffer' === t
          ? e.buffer.slice(e.byteOffset, e.byteLength + e.byteOffset)
          : e;
      }
      init() {
        try {
          (this.request = this.createProxy($request)),
            (this.response = this.createProxy($response));
        } catch (e) {
          this.log(e.toString());
        }
      }
      getFn(e, t, n) {
        let s = pn.clientAdapter[t] || t,
          a = super.getFn(e, s, n);
        return (
          'bodyBytes' === t && (a = pn.transferBodyBytes(a, 'Uint8Array')), a
        );
      }
      setFn(e, t, n, s) {
        let a = pn.clientAdapter[t] || t,
          r = n;
        return (
          'bodyBytes' === t && (r = pn.transferBodyBytes(r, 'Uint8Array')),
          super.setFn(e, a, r, s)
        );
      }
      getVal(e) {
        return $prefs.valueForKey(e)?.replace(/\0/g, '');
      }
      setVal(e, t) {
        $prefs.setValueForKey(e, t);
      }
      msg(e = this.name, t = '', n = '', s) {
        $notify(e, t, n, { 'open-url': s ?? '' });
      }
      async fetch(e) {
        return await new Promise(t => {
          let n = { url: '', method: 'GET' };
          for (let [t, s] of Object.entries(e))
            'id' === t
              ? (n.sessionIndex = s)
              : 'bodyBytes' === t
              ? (n.bodyBytes = pn.transferBodyBytes(s, 'ArrayBuffer'))
              : (n[t] = s);
          e.bodyBytes && delete n.body,
            $task.fetch(n).then(e => {
              let n = { status: 200, headers: {} };
              for (let [t, s] of Object.entries(e))
                'sessionIndex' === t
                  ? (n.id = s)
                  : 'bodyBytes' === t
                  ? (n.bodyBytes = pn.transferBodyBytes(s, 'Uint8Array'))
                  : 'statusCode' === t
                  ? (n.status = s)
                  : (n[t] = s);
              t(n);
            });
        });
      }
      done(e) {
        let t = e.response ?? e,
          n = {};
        for (let [e, s] of Object.entries(t))
          'status' === e
            ? (n.status = `HTTP/1.1 ${s}`)
            : 'bodyBytes' === e
            ? (n.bodyBytes = pn.transferBodyBytes(s, 'ArrayBuffer'))
            : (n[e] = s);
        $done(n);
      }
    },
    gn = pn;
  gn.clientAdapter = { id: 'sessionIndex', status: 'statusCode' };
  var hn = dn.getInstance('YouTube', { debug: !1 }),
    yn = class {
      constructor(e, t) {
        (this.decoder = new TextDecoder('utf-8', { fatal: !1, ignoreBOM: !0 })),
          hn.log(t),
          (this.msgType = e),
          Object.assign(
            this,
            hn.getJSON('YouTubeAdvertiseInfo', {
              whiteNo: [],
              blackNo: [],
              whiteEml: [],
              blackEml: ['cell_divider.eml']
            })
          );
      }
      fromBinary(e) {
        return (this.message = this.msgType.fromBinary(e)), this;
      }
      toBinary() {
        return this.message.toBinary();
      }
      listUnknownFields(e) {
        return e.getType().runtime.bin.listUnknownFields(e);
      }
      save() {
        if (this.needSave) {
          hn.log('Update Config');
          let e = {
            whiteNo: this.whiteNo,
            blackNo: this.blackNo,
            whiteEml: this.whiteEml,
            blackEml: this.blackEml
          };
          hn.setJSON(e, 'YouTubeAdvertiseInfo');
        }
      }
      done(e) {
        this.save();
        let t = e.bodyBytes;
        this.needProcess && (t = this.toBinary()),
          (e.headers['Content-Encoding'] = 'identity'),
          (e.headers['Content-Length'] = (t?.length ?? 0)?.toString()),
          hn.done({ response: { ...e, bodyBytes: t } });
      }
      doneResponse() {
        this.save(),
          this.needProcess && hn.done({ bodyBytes: this.toBinary() }),
          hn.exit();
      }
      iterate(e = {}, t, n) {
        let s = 'object' == typeof e ? [e] : [];
        for (; s.length; ) {
          let e = s.pop(),
            a = Object.keys(e);
          if ('symbol' == typeof t)
            for (let a of Object.getOwnPropertySymbols(e))
              if (a.description === t.description) {
                n(e, s);
                break;
              }
          for (let r of a)
            r === t ? n(e, s) : 'object' == typeof e[r] && s.push(e[r]);
        }
      }
      isAdvertise(e) {
        let t = this.listUnknownFields(e)[0],
          n = t ? this.handleFieldNo(t) : this.handleFieldEml(e);
        return n && (this.needProcess = !0), n;
      }
      handleFieldNo(e) {
        let t = e.no;
        if (this.whiteNo.includes(t)) return !1;
        if (this.blackNo.includes(t)) return !0;
        let n = this.decoder.decode(e.data).includes('pagead');
        return (
          n ? this.blackNo.push(t) : this.whiteNo.push(t),
          (this.needSave = !0),
          n
        );
      }
      handleFieldEml(e) {
        let t = !1,
          n = !0,
          s = '';
        return (
          this.iterate(e, 'type', (e, a) => {
            (s = e.type.split('|')[0]),
              this.whiteEml.includes(s)
                ? (t = !1)
                : this.blackEml.includes(s) || /shorts(?!_pivot_item)/.test(s)
                ? (t = !0)
                : (n = !1),
              (a.length = 0);
          }),
          n ||
            (this.iterate(
              e,
              Symbol.for('@bufbuild/protobuf/unknown-fields'),
              (e, n) => {
                let s = this.listUnknownFields(e);
                for (let e of s)
                  if (
                    e.data.length > 1e3 &&
                    ((t = this.decoder.decode(e.data).includes('pagead')), t)
                  ) {
                    n.length = 0;
                    break;
                  }
              }
            ),
            t ? this.blackEml.push(s) : this.whiteEml.push(s),
            (this.needSave = !0)),
          t
        );
      }
    };
  function kn(e, t) {
    let n;
    for (let s = 0; s < t.length - 2; s += 3)
      (n = t.charAt(s + 2)),
        (n = n >= 'a' ? n.charCodeAt(0) - 87 : Number(n)),
        (n = '+' == t.charAt(s + 1) ? e >>> n : e << n),
        (e = '+' == t.charAt(s) ? (e + n) & 4294967295 : e ^ n);
    return e;
  }
  function Tn(e) {
    return `https://translate.google.com/translate_a/single?client=gtx&sl=auto&tl=zh-CN&hl=zh-CN&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&source=bh&ssel=0&tsel=0&kc=1&tk=${(function (
      e
    ) {
      let t, n, s;
      for (t = [], n = 0, s = 0; s < e.length; s++) {
        let a = e.charCodeAt(s);
        128 > a
          ? (t[n++] = a)
          : (2048 > a
              ? (t[n++] = (a >> 6) | 192)
              : (55296 == (64512 & a) &&
                s + 1 < e.length &&
                56320 == (64512 & e.charCodeAt(s + 1))
                  ? ((a =
                      65536 + ((1023 & a) << 10) + (1023 & e.charCodeAt(++s))),
                    (t[n++] = (a >> 18) | 240),
                    (t[n++] = ((a >> 12) & 63) | 128))
                  : (t[n++] = (a >> 12) | 224),
                (t[n++] = ((a >> 6) & 63) | 128)),
            (t[n++] = (63 & a) | 128));
      }
      for (e = 406644, n = 0; n < t.length; n++) e = kn((e += t[n]), '+-a^+6');
      return (
        (e = kn(e, '+-3^+b+-f')),
        0 > (e ^= 3293161072) && (e = 2147483648 + (2147483647 & e)),
        (e %= 1e6).toString() + '.' + (406644 ^ e)
      );
    })(e)}&q=${encodeURIComponent(e)}`;
  }
  var bn = class extends yn {
      constructor(e = Ae, t = 'Browse') {
        super(e, t);
      }
      pure() {
        return (
          this.iterate(this.message, 'n5F1', e => {
            for (let t = e.n5F1?.length - 1; t >= 0; t--)
              this.isAdvertise(e.n5F1[t]) && e.n5F1.splice(t, 1);
          }),
          this.getBrowseId().startsWith('MPLYt') && (this.needTranslate = !0),
          this
        );
      }
      getBrowseId() {
        let e = '';
        return (
          this.iterate(this.message?.responseContext, 'key', (t, n) => {
            'browse_id' === t.key && ((e = t.value), (n.length = 0));
          }),
          e
        );
      }
      async translate() {
        let e,
          t = '',
          n = !1;
        if (
          (this.iterate(this.message, 'n13F1', (s, a) => {
            (e = s),
              (t = s.n13F1.map(e => e.f1).join('\n')),
              (n = !0),
              (a.length = 0);
          }),
          n ||
            this.iterate(this.message, 'staticLyric', (s, a) => {
              (e = s), (t = s.staticLyric), (a.length = 0), (n = !0);
            }),
          !n)
        )
          return;
        let s = Tn(t),
          a = await hn.fetch({ method: 'GET', url: s });
        if (200 === a.status && a.body) {
          let t = JSON.parse(a.body),
            n = ' & Translated by Google',
            s = t[2].includes('zh');
          e.staticLyric
            ? ((e.staticLyric = t[0]
                .map(e => (s ? e[0] : e[1] + e[0] || ''))
                .join('\r\n')),
              this.iterate(this.message, 'originText', (e, t) => {
                (e.originText += n), (t.length = 0);
              }))
            : e.n13F1.length <= t[0].length &&
              (e.n13F1.forEach((e, n) => {
                e.f1 = s ? t[0][n][0] : e.f1 + `\n${t[0][n][0]}`;
              }),
              (e.originText += n)),
            (this.needProcess = !0);
        }
      }
    },
    wn = new Map([
      ['browse', bn],
      [
        'next',
        class extends bn {
          constructor(e = ct, t = 'Next') {
            super(e, t);
          }
          pure() {
            return super.pure(), this;
          }
          addTranslateTab() {
            this.iterate(
              this.message?.a1F7?.musicPlayRender,
              'items',
              (e, t) => {
                let n = e.items.find(e =>
                  e.tab.info?.browseInfo?.browseId.startsWith('MPLYt')
                );
                n && (n.tab.name = n.tab.name + '⇄'),
                  (this.needProcess = !0),
                  (t.length = 0);
              }
            );
          }
        }
      ],
      [
        'player',
        class extends yn {
          constructor(e = jt, t = 'Player') {
            super(e, t);
          }
          pure() {
            this.message.adPlacements?.length &&
              (this.message.adPlacements.length = 0);
            let e = this.message?.playabilityStatus?.pipAbility?.piplayer;
            return (
              'object' == typeof e && (e.active = !0),
              'object' == typeof this.message.playabilityStatus &&
                (this.message.playabilityStatus.backgroundAbility = new Ct({
                  backgroundPlayer: { active: !0 }
                })),
              this.iterate(this.message, 'captionTracks', (e, t) => {
                let n = e.captionTracks;
                if (Array.isArray(n)) for (let e of n) e.isTranslatable = !0;
                (e.translationLanguages = Object.entries({
                  de: 'Deutsch',
                  ru: 'Русский',
                  fr: 'Français',
                  fil: 'Filipino',
                  ko: '한국어',
                  ja: '日本語',
                  en: 'English',
                  vi: 'Tiếng Việt',
                  'zh-Hant': '中文（繁體）',
                  'zh-Hans': '中文（简体）',
                  und: '@VirgilClyne'
                }).map(
                  ([e, t]) =>
                    new Wt({
                      languageCode: e,
                      languageName: { runs: [{ text: t }] }
                    })
                )),
                  e?.defaultCaptionTrackIndex ||
                    (e.defaultCaptionTrackIndex = 0),
                  (t.length = 0);
              }),
              (this.needProcess = !0),
              this
            );
          }
        }
      ],
      [
        'search',
        class extends bn {
          constructor(e = Nt, t = 'Search') {
            super(e, t);
          }
        }
      ],
      [
        'reel_watch_sequence',
        class extends yn {
          constructor(e = vt, t = 'Shorts') {
            super(e, t);
          }
          pure() {
            let e = this.message.entries?.length;
            if (e)
              for (let t = e - 1; t >= 0; t--)
                this.message.entries[t].command?.reelWatchEndpoint?.overlay ||
                  (this.message.entries.splice(t, 1), (this.needProcess = !0));
            return this;
          }
        }
      ],
      [
        'guide',
        class extends yn {
          constructor(e = At, t = 'Guide') {
            super(e, t);
          }
          pure() {
            let e = ['FEmusic_immersive', 'SPunlimited', 'FEuploads'];
            return (
              this.iterate(this.message, 'rendererItems', t => {
                for (let n = t.rendererItems.length - 1; n >= 0; n--) {
                  let s =
                    t.rendererItems[n]?.iconRender?.browseId ||
                    t.rendererItems[n]?.labelRender?.browseId;
                  e.includes(s) &&
                    (t.rendererItems.splice(n, 1), (this.needProcess = !0));
                }
              }),
              this
            );
          }
        }
      ],
      [
        'get_setting',
        class extends yn {
          constructor(e = Ht, t = 'Setting') {
            super(e, t);
          }
          pure() {
            this.iterate(this.message, 'categoryId', e => {
              if (10005 === e.categoryId) {
                let t = {
                    f1: 135,
                    f2: 20434,
                    f3: 2,
                    timeInfo: this.message.trackingParams.timeInfo
                  },
                  n = new sn({
                    settingBooleanRenderer: {
                      itemId: 0,
                      enableServiceEndpoint: {
                        trackingParams: t,
                        setClientSettingEndpoint: {
                          settingDatas: {
                            clientSettingEnum: { item: 151 },
                            boolValue: !0
                          }
                        }
                      },
                      disableServiceEndpoint: {
                        trackingParams: t,
                        setClientSettingEndpoint: {
                          settingDatas: {
                            clientSettingEnum: { item: 151 },
                            boolValue: !1
                          }
                        }
                      },
                      clickTrackingParams: t
                    }
                  });
                e.subSettings.push(n);
              }
            });
            let e = new Qt({
              settingCategoryEntryRenderer: {
                f2: 1,
                f3: 1,
                trackingParams: {
                  f1: 2,
                  f2: 20020,
                  f3: 8,
                  timeInfo: this.message.trackingParams.timeInfo
                },
                f6: 0,
                f7: 1,
                f8: 1,
                f9: 1,
                f10: 1,
                f12: 1
              }
            });
            return (
              this.message.settingItems.push(e), (this.needProcess = !0), this
            );
          }
        }
      ]
    ]);
  !(async function () {
    let e = (function (e) {
      for (let [t, n] of wn.entries()) if (e.includes(t)) return new n();
      return null;
    })(hn.request.url);
    if (e)
      try {
        let t = hn.response.bodyBytes;
        e.fromBinary(t).pure(),
          e instanceof bn && e.needTranslate && (await e.translate()),
          e.doneResponse();
      } catch (e) {
        hn.exit();
      }
    else
      hn.msg('YouTube Enhance', '脚本需要更新', '外部资源 -> 全部更新'),
        hn.exit();
  })();
})();
