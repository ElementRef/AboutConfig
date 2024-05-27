// https://raw.githubusercontent.com/Maasea/sgmodule/master/Script/Youtube/dist/youtube.request.beta.js
(() => {
  function e(e, t) {
    if (!e) throw new Error(t);
  }
  !(function (e) {
    function t() {}
    function n() {}
    var r = String.fromCharCode,
      i = {}.toString,
      s = i.call(e.SharedArrayBuffer),
      a = i(),
      o = e.Uint8Array,
      l = o || Array,
      u = o ? ArrayBuffer : l,
      f =
        u.isView ||
        function (e) {
          return e && 'length' in e;
        },
      c = i.call(u.prototype);
    u = n.prototype;
    var d = e.TextEncoder,
      h = new (o ? Uint16Array : l)(32);
    (t.prototype.decode = function (e) {
      if (!f(e)) {
        var t = i.call(e);
        if (t !== c && t !== s && t !== a)
          throw TypeError(
            "Failed to execute 'decode' on 'TextDecoder': The provided value is not of type '(ArrayBuffer or ArrayBufferView)'"
          );
        e = o ? new l(e) : e || [];
      }
      for (
        var n,
          u,
          d,
          m = (t = ''),
          p = 0,
          y = 0 | e.length,
          g = (y - 32) | 0,
          b = 0,
          w = 0,
          N = 0,
          k = -1;
        p < y;

      ) {
        for (
          n = p <= g ? 32 : (y - p) | 0;
          N < n;
          p = (p + 1) | 0, N = (N + 1) | 0
        ) {
          switch ((u = 255 & e[p]) >> 4) {
            case 15:
              if ((d = 255 & e[(p = (p + 1) | 0)]) >> 6 != 2 || 247 < u) {
                p = (p - 1) | 0;
                break;
              }
              (b = ((7 & u) << 6) | (63 & d)), (w = 5), (u = 256);
            case 14:
              (b <<= 6),
                (b |=
                  ((15 & u) << 6) | (63 & (d = 255 & e[(p = (p + 1) | 0)]))),
                (w = d >> 6 == 2 ? (w + 4) | 0 : 24),
                (u = (u + 256) & 768);
            case 13:
            case 12:
              (b <<= 6),
                (b |=
                  ((31 & u) << 6) | (63 & (d = 255 & e[(p = (p + 1) | 0)]))),
                (w = (w + 7) | 0),
                p < y && d >> 6 == 2 && b >> w && 1114112 > b
                  ? ((u = b),
                    0 <= (b = (b - 65536) | 0) &&
                      ((k = (55296 + (b >> 10)) | 0),
                      (u = (56320 + (1023 & b)) | 0),
                      31 > N
                        ? ((h[N] = k), (N = (N + 1) | 0), (k = -1))
                        : ((d = k), (k = u), (u = d))))
                  : ((p = (p - (u >>= 8) - 1) | 0), (u = 65533)),
                (b = w = 0),
                (n = p <= g ? 32 : (y - p) | 0);
            default:
              h[N] = u;
              continue;
            case 11:
            case 10:
            case 9:
            case 8:
          }
          h[N] = 65533;
        }
        if (
          ((m += r(
            h[0],
            h[1],
            h[2],
            h[3],
            h[4],
            h[5],
            h[6],
            h[7],
            h[8],
            h[9],
            h[10],
            h[11],
            h[12],
            h[13],
            h[14],
            h[15],
            h[16],
            h[17],
            h[18],
            h[19],
            h[20],
            h[21],
            h[22],
            h[23],
            h[24],
            h[25],
            h[26],
            h[27],
            h[28],
            h[29],
            h[30],
            h[31]
          )),
          32 > N && (m = m.slice(0, (N - 32) | 0)),
          p < y)
        ) {
          if (((h[0] = k), (N = ~k >>> 31), (k = -1), m.length < t.length))
            continue;
        } else -1 !== k && (m += r(k));
        (t += m), (m = '');
      }
      return t;
    }),
      (u.encode = function (e) {
        var t,
          n = 0 | (e = void 0 === e ? '' : '' + e).length,
          r = new l((8 + (n << 1)) | 0),
          i = 0,
          s = !o;
        for (t = 0; t < n; t = (t + 1) | 0, i = (i + 1) | 0) {
          var a = 0 | e.charCodeAt(t);
          if (127 >= a) r[i] = a;
          else {
            if (2047 >= a) r[i] = 192 | (a >> 6);
            else {
              e: {
                if (55296 <= a)
                  if (56319 >= a) {
                    var u = 0 | e.charCodeAt((t = (t + 1) | 0));
                    if (56320 <= u && 57343 >= u) {
                      if (65535 < (a = ((a << 10) + u - 56613888) | 0)) {
                        (r[i] = 240 | (a >> 18)),
                          (r[(i = (i + 1) | 0)] = 128 | ((a >> 12) & 63)),
                          (r[(i = (i + 1) | 0)] = 128 | ((a >> 6) & 63)),
                          (r[(i = (i + 1) | 0)] = 128 | (63 & a));
                        continue;
                      }
                      break e;
                    }
                    a = 65533;
                  } else 57343 >= a && (a = 65533);
                !s &&
                  t << 1 < i &&
                  t << 1 < ((i - 7) | 0) &&
                  ((s = !0), (u = new l(3 * n)).set(r), (r = u));
              }
              (r[i] = 224 | (a >> 12)),
                (r[(i = (i + 1) | 0)] = 128 | ((a >> 6) & 63));
            }
            r[(i = (i + 1) | 0)] = 128 | (63 & a);
          }
        }
        return o ? r.subarray(0, i) : r.slice(0, i);
      }),
      d || ((e.TextDecoder = t), (e.TextEncoder = n));
  })(globalThis);
  var t = 34028234663852886e22,
    n = -34028234663852886e22,
    r = 4294967295,
    i = 2147483647,
    s = -2147483648;
  function a(e) {
    if ('number' != typeof e) throw new Error('invalid int 32: ' + typeof e);
    if (!Number.isInteger(e) || e > i || e < s)
      throw new Error('invalid int 32: ' + e);
  }
  function o(e) {
    if ('number' != typeof e) throw new Error('invalid uint 32: ' + typeof e);
    if (!Number.isInteger(e) || e > r || e < 0)
      throw new Error('invalid uint 32: ' + e);
  }
  function l(e) {
    if ('number' != typeof e) throw new Error('invalid float 32: ' + typeof e);
    if (Number.isFinite(e) && (e > t || e < n))
      throw new Error('invalid float 32: ' + e);
  }
  var u = Symbol('@bufbuild/protobuf/enum-type');
  function f(t) {
    let n = t[u];
    return e(n, 'missing enum type on enum object'), n;
  }
  function c(e, t, n, r) {
    e[u] = d(
      t,
      n.map(t => ({ no: t.no, name: t.name, localName: e[t.no] })),
      r
    );
  }
  function d(e, t, n) {
    let r = Object.create(null),
      i = Object.create(null),
      s = [];
    for (let e of t) {
      let t = m(e);
      s.push(t), (r[e.name] = t), (i[e.no] = t);
    }
    return {
      typeName: e,
      values: s,
      findName: e => r[e],
      findNumber: e => i[e]
    };
  }
  function h(e, t, n) {
    let r = {};
    for (let e of t) {
      let t = m(e);
      (r[t.localName] = t.no), (r[t.no] = t.localName);
    }
    return c(r, e, t, n), r;
  }
  function m(e) {
    return 'localName' in e
      ? e
      : Object.assign(Object.assign({}, e), { localName: e.name });
  }
  var p,
    y,
    g,
    b = class {
      equals(e) {
        return this.getType().runtime.util.equals(this.getType(), this, e);
      }
      clone() {
        return this.getType().runtime.util.clone(this);
      }
      fromBinary(e, t) {
        let n = this.getType().runtime.bin,
          r = n.makeReadOptions(t);
        return n.readMessage(this, r.readerFactory(e), e.byteLength, r), this;
      }
      fromJson(e, t) {
        let n = this.getType(),
          r = n.runtime.json,
          i = r.makeReadOptions(t);
        return r.readMessage(n, e, i, this), this;
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
          r = n.writerFactory();
        return t.writeMessage(this, r, n), r.finish();
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
  function w() {
    let e = 0,
      t = 0;
    for (let n = 0; n < 28; n += 7) {
      let r = this.buf[this.pos++];
      if (((e |= (127 & r) << n), !(128 & r)))
        return this.assertBounds(), [e, t];
    }
    let n = this.buf[this.pos++];
    if (((e |= (15 & n) << 28), (t = (112 & n) >> 4), !(128 & n)))
      return this.assertBounds(), [e, t];
    for (let n = 3; n <= 31; n += 7) {
      let r = this.buf[this.pos++];
      if (((t |= (127 & r) << n), !(128 & r)))
        return this.assertBounds(), [e, t];
    }
    throw new Error('invalid varint');
  }
  function N(e, t, n) {
    for (let r = 0; r < 28; r += 7) {
      let i = e >>> r,
        s = !(!(i >>> 7) && 0 == t),
        a = 255 & (s ? 128 | i : i);
      if ((n.push(a), !s)) return;
    }
    let r = ((e >>> 28) & 15) | ((7 & t) << 4),
      i = !!(t >> 3);
    if ((n.push(255 & (i ? 128 | r : r)), i)) {
      for (let e = 3; e < 31; e += 7) {
        let r = t >>> e,
          i = !!(r >>> 7),
          s = 255 & (i ? 128 | r : r);
        if ((n.push(s), !i)) return;
      }
      n.push((t >>> 31) & 1);
    }
  }
  ((y = p || (p = {}))[(y.DOUBLE = 1)] = 'DOUBLE'),
    (y[(y.FLOAT = 2)] = 'FLOAT'),
    (y[(y.INT64 = 3)] = 'INT64'),
    (y[(y.UINT64 = 4)] = 'UINT64'),
    (y[(y.INT32 = 5)] = 'INT32'),
    (y[(y.FIXED64 = 6)] = 'FIXED64'),
    (y[(y.FIXED32 = 7)] = 'FIXED32'),
    (y[(y.BOOL = 8)] = 'BOOL'),
    (y[(y.STRING = 9)] = 'STRING'),
    (y[(y.BYTES = 12)] = 'BYTES'),
    (y[(y.UINT32 = 13)] = 'UINT32'),
    (y[(y.SFIXED32 = 15)] = 'SFIXED32'),
    (y[(y.SFIXED64 = 16)] = 'SFIXED64'),
    (y[(y.SINT32 = 17)] = 'SINT32'),
    (y[(y.SINT64 = 18)] = 'SINT64'),
    (function (e) {
      (e[(e.BIGINT = 0)] = 'BIGINT'), (e[(e.STRING = 1)] = 'STRING');
    })(g || (g = {}));
  var k = 4294967296;
  function T(e) {
    let t = '-' === e[0];
    t && (e = e.slice(1));
    let n = 1e6,
      r = 0,
      i = 0;
    function s(t, s) {
      let a = Number(e.slice(t, s));
      (i *= n), (r = r * n + a), r >= k && ((i += (r / k) | 0), (r %= k));
    }
    return s(-24, -18), s(-18, -12), s(-12, -6), s(-6), t ? S(r, i) : v(r, i);
  }
  function I(e, t) {
    if (
      (({ lo: e, hi: t } = (function (e, t) {
        return { lo: e >>> 0, hi: t >>> 0 };
      })(e, t)),
      t <= 2097151)
    )
      return String(k * t + e);
    let n = 16777215 & ((e >>> 24) | (t << 8)),
      r = (t >> 16) & 65535,
      i = (16777215 & e) + 6777216 * n + 6710656 * r,
      s = n + 8147497 * r,
      a = 2 * r,
      o = 1e7;
    return (
      i >= o && ((s += Math.floor(i / o)), (i %= o)),
      s >= o && ((a += Math.floor(s / o)), (s %= o)),
      a.toString() + E(s) + E(i)
    );
  }
  function v(e, t) {
    return { lo: 0 | e, hi: 0 | t };
  }
  function S(e, t) {
    return (t = ~t), e ? (e = 1 + ~e) : (t += 1), v(e, t);
  }
  var E = e => {
    let t = String(e);
    return '0000000'.slice(t.length) + t;
  };
  function B(e, t) {
    if (e >= 0) {
      for (; e > 127; ) t.push((127 & e) | 128), (e >>>= 7);
      t.push(e);
    } else {
      for (let n = 0; n < 9; n++) t.push((127 & e) | 128), (e >>= 7);
      t.push(1);
    }
  }
  function O() {
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
  var F,
    U = (function () {
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
          r = BigInt('0'),
          i = BigInt('18446744073709551615');
        return {
          zero: BigInt(0),
          supported: !0,
          parse(t) {
            let r = 'bigint' == typeof t ? t : BigInt(t);
            if (r > n || r < e) throw new Error(`int64 invalid: ${t}`);
            return r;
          },
          uParse(e) {
            let t = 'bigint' == typeof e ? e : BigInt(e);
            if (t > i || t < r) throw new Error(`uint64 invalid: ${e}`);
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
        r = t => e(/^[0-9]+$/.test(t), `uint64 invalid: ${t}`);
      return {
        zero: '0',
        supported: !1,
        parse: e => ('string' != typeof e && (e = e.toString()), n(e), e),
        uParse: e => ('string' != typeof e && (e = e.toString()), r(e), e),
        enc: e => ('string' != typeof e && (e = e.toString()), n(e), T(e)),
        uEnc: e => ('string' != typeof e && (e = e.toString()), r(e), T(e)),
        dec: (e, t) =>
          (function (e, t) {
            let n = v(e, t),
              r = 2147483648 & n.hi;
            r && (n = S(n.lo, n.hi));
            let i = I(n.lo, n.hi);
            return r ? '-' + i : i;
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
  })(F || (F = {}));
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
        return a(e), B(e, this.buf), this;
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
        a(e);
        let t = new Uint8Array(4);
        return new DataView(t.buffer).setInt32(0, e, !0), this.raw(t);
      }
      sint32(e) {
        return a(e), B((e = ((e << 1) ^ (e >> 31)) >>> 0), this.buf), this;
      }
      sfixed64(e) {
        let t = new Uint8Array(8),
          n = new DataView(t.buffer),
          r = U.enc(e);
        return n.setInt32(0, r.lo, !0), n.setInt32(4, r.hi, !0), this.raw(t);
      }
      fixed64(e) {
        let t = new Uint8Array(8),
          n = new DataView(t.buffer),
          r = U.uEnc(e);
        return n.setInt32(0, r.lo, !0), n.setInt32(4, r.hi, !0), this.raw(t);
      }
      int64(e) {
        let t = U.enc(e);
        return N(t.lo, t.hi, this.buf), this;
      }
      sint64(e) {
        let t = U.enc(e),
          n = t.hi >> 31;
        return (
          N((t.lo << 1) ^ n, ((t.hi << 1) | (t.lo >>> 31)) ^ n, this.buf), this
        );
      }
      uint64(e) {
        let t = U.uEnc(e);
        return N(t.lo, t.hi, this.buf), this;
      }
    },
    $ = class {
      constructor(e, t) {
        (this.varint64 = w),
          (this.uint32 = O),
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
          case F.Varint:
            for (; 128 & this.buf[this.pos++]; );
            break;
          case F.Bit64:
            this.pos += 4;
          case F.Bit32:
            this.pos += 4;
            break;
          case F.LengthDelimited:
            let t = this.uint32();
            this.pos += t;
            break;
          case F.StartGroup:
            let n;
            for (; (n = this.tag()[1]) !== F.EndGroup; ) this.skip(n);
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
        return U.dec(...this.varint64());
      }
      uint64() {
        return U.uDec(...this.varint64());
      }
      sint64() {
        let [e, t] = this.varint64(),
          n = -(1 & e);
        return (
          (e = ((e >>> 1) | ((1 & t) << 31)) ^ n),
          (t = (t >>> 1) ^ n),
          U.dec(e, t)
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
        return U.uDec(this.sfixed32(), this.sfixed32());
      }
      sfixed64() {
        return U.dec(this.sfixed32(), this.sfixed32());
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
  function D(e, t, n) {
    if (t === n) return !0;
    if (e == p.BYTES) {
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
      case p.UINT64:
      case p.FIXED64:
      case p.INT64:
      case p.SFIXED64:
      case p.SINT64:
        return t == n;
    }
    return !1;
  }
  function j(e, t) {
    switch (e) {
      case p.BOOL:
        return !1;
      case p.UINT64:
      case p.FIXED64:
      case p.INT64:
      case p.SFIXED64:
      case p.SINT64:
        return 0 == t ? U.zero : '0';
      case p.DOUBLE:
      case p.FLOAT:
        return 0;
      case p.BYTES:
        return new Uint8Array(0);
      case p.STRING:
        return '';
      default:
        return 0;
    }
  }
  function x(e, t) {
    let n = void 0 === t,
      r = F.Varint,
      i = 0 === t;
    switch (e) {
      case p.STRING:
        (i = n || !t.length), (r = F.LengthDelimited);
        break;
      case p.BOOL:
        i = !1 === t;
        break;
      case p.DOUBLE:
        r = F.Bit64;
        break;
      case p.FLOAT:
        r = F.Bit32;
        break;
      case p.INT64:
      case p.UINT64:
        i = n || 0 == t;
        break;
      case p.FIXED64:
        (i = n || 0 == t), (r = F.Bit64);
        break;
      case p.BYTES:
        (i = n || !t.byteLength), (r = F.LengthDelimited);
        break;
      case p.FIXED32:
      case p.SFIXED32:
        r = F.Bit32;
        break;
      case p.SFIXED64:
        (i = n || 0 == t), (r = F.Bit64);
        break;
      case p.SINT64:
        i = n || 0 == t;
    }
    return [r, p[e].toLowerCase(), n || i];
  }
  function L(e) {
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
            return j(t.T, t.L);
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
  function V(e, t) {
    return t instanceof b || !e.fieldWrapper ? t : e.fieldWrapper.wrapField(t);
  }
  p.DOUBLE,
    p.FLOAT,
    p.INT64,
    p.UINT64,
    p.INT32,
    p.UINT32,
    p.BOOL,
    p.STRING,
    p.BYTES;
  var J = Symbol('@bufbuild/protobuf/unknown-fields'),
    G = { readUnknownFields: !0, readerFactory: e => new $(e) },
    X = { writeUnknownFields: !0, writerFactory: () => new A() };
  function P(e) {
    return e ? Object.assign(Object.assign({}, G), e) : G;
  }
  function M(e) {
    return e ? Object.assign(Object.assign({}, X), e) : X;
  }
  function R(e, t, n, r, i) {
    let { repeated: s, localName: a } = n;
    switch (
      (n.oneof &&
        ((e = e[n.oneof.localName]).case != a && delete e.value,
        (e.case = a),
        (a = 'value')),
      n.kind)
    ) {
      case 'scalar':
      case 'enum':
        let o = 'enum' == n.kind ? p.INT32 : n.T,
          l = Y;
        if (('scalar' == n.kind && n.L > 0 && (l = q), s)) {
          let n = e[a];
          if (r == F.LengthDelimited && o != p.STRING && o != p.BYTES) {
            let e = t.uint32() + t.pos;
            for (; t.pos < e; ) n.push(l(t, o));
          } else n.push(l(t, o));
        } else e[a] = l(t, o);
        break;
      case 'message':
        let u = n.T;
        s
          ? e[a].push(_(t, new u(), i, n))
          : e[a] instanceof b
          ? _(t, e[a], i, n)
          : ((e[a] = _(t, new u(), i, n)),
            u.fieldWrapper &&
              !n.oneof &&
              !n.repeated &&
              (e[a] = u.fieldWrapper.unwrapField(e[a])));
        break;
      case 'map':
        let [f, c] = (function (e, t, n) {
          let r,
            i,
            s = t.uint32(),
            a = t.pos + s;
          for (; t.pos < a; ) {
            let [s] = t.tag();
            switch (s) {
              case 1:
                r = Y(t, e.K);
                break;
              case 2:
                switch (e.V.kind) {
                  case 'scalar':
                    i = Y(t, e.V.T);
                    break;
                  case 'enum':
                    i = t.int32();
                    break;
                  case 'message':
                    i = _(t, new e.V.T(), n, void 0);
                }
            }
          }
          if (void 0 === r) {
            let t = j(e.K, g.BIGINT);
            r = e.K == p.BOOL ? t.toString() : t;
          }
          if (
            ('string' != typeof r && 'number' != typeof r && (r = r.toString()),
            void 0 === i)
          )
            switch (e.V.kind) {
              case 'scalar':
                i = j(e.V.T, g.BIGINT);
                break;
              case 'enum':
                i = 0;
                break;
              case 'message':
                i = new e.V.T();
            }
          return [r, i];
        })(n, t, i);
        e[a][f] = c;
    }
  }
  function _(e, t, n, r) {
    let i = t.getType().runtime.bin,
      s = r?.delimited;
    return i.readMessage(t, e, s ? r?.no : e.uint32(), n, s), t;
  }
  function q(e, t) {
    let n = Y(e, t);
    return 'bigint' == typeof n ? n.toString() : n;
  }
  function Y(e, t) {
    switch (t) {
      case p.STRING:
        return e.string();
      case p.BOOL:
        return e.bool();
      case p.DOUBLE:
        return e.double();
      case p.FLOAT:
        return e.float();
      case p.INT32:
        return e.int32();
      case p.INT64:
        return e.int64();
      case p.UINT64:
        return e.uint64();
      case p.FIXED64:
        return e.fixed64();
      case p.BYTES:
        return e.bytes();
      case p.FIXED32:
        return e.fixed32();
      case p.SFIXED32:
        return e.sfixed32();
      case p.SFIXED64:
        return e.sfixed64();
      case p.SINT64:
        return e.sint64();
      case p.UINT32:
        return e.uint32();
      case p.SINT32:
        return e.sint32();
    }
  }
  function C(t, n, r, i, s) {
    t.tag(r.no, F.LengthDelimited), t.fork();
    let a = i;
    switch (r.K) {
      case p.INT32:
      case p.FIXED32:
      case p.UINT32:
      case p.SFIXED32:
      case p.SINT32:
        a = Number.parseInt(i);
        break;
      case p.BOOL:
        e('true' == i || 'false' == i), (a = 'true' == i);
    }
    switch ((K(t, r.K, 1, a, !0), r.V.kind)) {
      case 'scalar':
        K(t, r.V.T, 2, s, !0);
        break;
      case 'enum':
        K(t, p.INT32, 2, s, !0);
        break;
      case 'message':
        t.tag(2, F.LengthDelimited).bytes(s.toBinary(n));
    }
    t.join();
  }
  function W(e, t, n, r) {
    let i = V(n.T, r);
    n?.delimited
      ? e.tag(n.no, F.StartGroup).raw(i.toBinary(t)).tag(n.no, F.EndGroup)
      : e.tag(n.no, F.LengthDelimited).bytes(i.toBinary(t));
  }
  function K(e, t, n, r, i) {
    let [s, a, o] = x(t, r);
    (!o || i) && e.tag(n, s)[a](r);
  }
  function z(e, t, n, r) {
    let i = e.repeated;
    switch (e.kind) {
      case 'scalar':
      case 'enum':
        let s = 'enum' == e.kind ? p.INT32 : e.T;
        if (i)
          if (e.packed)
            !(function (e, t, n, r) {
              if (!r.length) return;
              e.tag(n, F.LengthDelimited).fork();
              let [, i] = x(t);
              for (let t = 0; t < r.length; t++) e[i](r[t]);
              e.join();
            })(n, s, e.no, t);
          else for (let r of t) K(n, s, e.no, r, !0);
        else void 0 !== t && K(n, s, e.no, t, !!e.oneof || e.opt);
        break;
      case 'message':
        if (i) for (let i of t) W(n, r, e, i);
        else void 0 !== t && W(n, r, e, t);
        break;
      case 'map':
        for (let [i, s] of Object.entries(t)) C(n, r, e, i, s);
    }
  }
  var Q =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split(
        ''
      ),
    H = [];
  for (let e = 0; e < Q.length; e++) H[Q[e].charCodeAt(0)] = e;
  (H['-'.charCodeAt(0)] = Q.indexOf('+')),
    (H['_'.charCodeAt(0)] = Q.indexOf('/'));
  var Z = {
    dec(e) {
      let t = (3 * e.length) / 4;
      '=' == e[e.length - 2] ? (t -= 2) : '=' == e[e.length - 1] && (t -= 1);
      let n,
        r = new Uint8Array(t),
        i = 0,
        s = 0,
        a = 0;
      for (let t = 0; t < e.length; t++) {
        if (((n = H[e.charCodeAt(t)]), void 0 === n))
          switch (e[t]) {
            case '=':
              s = 0;
            case '\n':
            case '\r':
            case '\t':
            case ' ':
              continue;
            default:
              throw Error('invalid base64 string.');
          }
        switch (s) {
          case 0:
            (a = n), (s = 1);
            break;
          case 1:
            (r[i++] = (a << 2) | ((48 & n) >> 4)), (a = n), (s = 2);
            break;
          case 2:
            (r[i++] = ((15 & a) << 4) | ((60 & n) >> 2)), (a = n), (s = 3);
            break;
          case 3:
            (r[i++] = ((3 & a) << 6) | n), (s = 0);
        }
      }
      if (1 == s) throw Error('invalid base64 string.');
      return r.subarray(0, i);
    },
    enc(e) {
      let t,
        n = '',
        r = 0,
        i = 0;
      for (let s = 0; s < e.length; s++)
        switch (((t = e[s]), r)) {
          case 0:
            (n += Q[t >> 2]), (i = (3 & t) << 4), (r = 1);
            break;
          case 1:
            (n += Q[i | (t >> 4)]), (i = (15 & t) << 2), (r = 2);
            break;
          case 2:
            (n += Q[i | (t >> 6)]), (n += Q[63 & t]), (r = 0);
        }
      return r && ((n += Q[i]), (n += '='), 1 == r && (n += '=')), n;
    }
  };
  function ee(e, t, n) {
    re(t, e);
    let r = t.runtime.bin.makeReadOptions(n),
      i = (function (e, t) {
        if (!t.repeated && ('enum' == t.kind || 'scalar' == t.kind)) {
          for (let n = e.length - 1; n >= 0; --n)
            if (e[n].no == t.no) return [e[n]];
          return [];
        }
        return e.filter(e => e.no === t.no);
      })(e.getType().runtime.bin.listUnknownFields(e), t.field),
      [s, a] = L(t);
    for (let e of i)
      t.runtime.bin.readField(
        s,
        r.readerFactory(e.data),
        t.field,
        e.wireType,
        r
      );
    return a();
  }
  function te(e, t, n, r) {
    re(t, e);
    let i = t.runtime.bin.makeReadOptions(r),
      s = t.runtime.bin.makeWriteOptions(r);
    if (ne(e, t)) {
      let n = e
        .getType()
        .runtime.bin.listUnknownFields(e)
        .filter(e => e.no != t.field.no);
      e.getType().runtime.bin.discardUnknownFields(e);
      for (let t of n)
        e.getType().runtime.bin.onUnknownField(e, t.no, t.wireType, t.data);
    }
    let a = s.writerFactory(),
      o = t.field;
    !o.opt &&
      !o.repeated &&
      ('enum' == o.kind || 'scalar' == o.kind) &&
      (o = Object.assign(Object.assign({}, t.field), { opt: !0 })),
      t.runtime.bin.writeField(o, n, a, s);
    let l = i.readerFactory(a.finish());
    for (; l.pos < l.len; ) {
      let [t, n] = l.tag(),
        r = l.skip(n);
      e.getType().runtime.bin.onUnknownField(e, t, n, r);
    }
  }
  function ne(e, t) {
    let n = e.getType();
    return (
      t.extendee.typeName === n.typeName &&
      !!n.runtime.bin.listUnknownFields(e).find(e => e.no == t.field.no)
    );
  }
  function re(t, n) {
    e(
      t.extendee.typeName == n.getType().typeName,
      `extension ${t.typeName} can only be applied to message ${t.extendee.typeName}`
    );
  }
  var ie = { ignoreUnknownFields: !1 },
    se = {
      emitDefaultValues: !1,
      enumAsInteger: !1,
      useProtoFieldName: !1,
      prettySpaces: 0
    };
  function ae(e) {
    return e ? Object.assign(Object.assign({}, ie), e) : ie;
  }
  function oe(e) {
    return e ? Object.assign(Object.assign({}, se), e) : se;
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
  function ue(e, t, n, r, i, s) {
    let a = n.localName;
    if (n.oneof) {
      if (null === t && 'scalar' == n.kind) return;
      (e = e[n.oneof.localName] = { case: a }), (a = 'value');
    }
    if (n.repeated) {
      if (null === t) return;
      if (!Array.isArray(t))
        throw new Error(
          `cannot decode field ${i.typeName}.${n.name} from JSON: ${le(t)}`
        );
      let s = e[a];
      for (let e of t) {
        if (null === e)
          throw new Error(
            `cannot decode field ${i.typeName}.${n.name} from JSON: ${le(e)}`
          );
        let t;
        switch (n.kind) {
          case 'message':
            t = n.T.fromJson(e, r);
            break;
          case 'enum':
            if (((t = ce(n.T, e, r.ignoreUnknownFields, !0)), void 0 === t))
              continue;
            break;
          case 'scalar':
            try {
              t = fe(n.T, e, n.L, !0);
            } catch (t) {
              let r = `cannot decode field ${i.typeName}.${
                n.name
              } from JSON: ${le(e)}`;
              throw (
                (t instanceof Error &&
                  t.message.length > 0 &&
                  (r += `: ${t.message}`),
                new Error(r))
              );
            }
        }
        s.push(t);
      }
    } else if ('map' == n.kind) {
      if (null === t) return;
      if ('object' != typeof t || Array.isArray(t))
        throw new Error(
          `cannot decode field ${i.typeName}.${n.name} from JSON: ${le(t)}`
        );
      let s = e[a];
      for (let [e, a] of Object.entries(t)) {
        if (null === a)
          throw new Error(
            `cannot decode field ${i.typeName}.${n.name} from JSON: map value null`
          );
        let o;
        switch (n.V.kind) {
          case 'message':
            o = n.V.T.fromJson(a, r);
            break;
          case 'enum':
            if (((o = ce(n.V.T, a, r.ignoreUnknownFields, !0)), void 0 === o))
              continue;
            break;
          case 'scalar':
            try {
              o = fe(n.V.T, a, g.BIGINT, !0);
            } catch (e) {
              let r = `cannot decode map value for field ${i.typeName}.${
                n.name
              } from JSON: ${le(t)}`;
              throw (
                (e instanceof Error &&
                  e.message.length > 0 &&
                  (r += `: ${e.message}`),
                new Error(r))
              );
            }
        }
        try {
          s[
            fe(
              n.K,
              n.K == p.BOOL ? 'true' == e || ('false' != e && e) : e,
              g.BIGINT,
              !0
            ).toString()
          ] = o;
        } catch (e) {
          let r = `cannot decode map key for field ${i.typeName}.${
            n.name
          } from JSON: ${le(t)}`;
          throw (
            (e instanceof Error &&
              e.message.length > 0 &&
              (r += `: ${e.message}`),
            new Error(r))
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
                `cannot decode field ${i.typeName}.${n.name} from JSON: null is invalid for oneof field`
              );
            return;
          }
          e[a] instanceof b
            ? e[a].fromJson(t, r)
            : ((e[a] = o.fromJson(t, r)),
              o.fieldWrapper &&
                !n.oneof &&
                (e[a] = o.fieldWrapper.unwrapField(e[a])));
          break;
        case 'enum':
          let l = ce(n.T, t, r.ignoreUnknownFields, s);
          void 0 !== l && (e[a] = l);
          break;
        case 'scalar':
          try {
            e[a] = fe(n.T, t, n.L, s);
          } catch (e) {
            let r = `cannot decode field ${i.typeName}.${
              n.name
            } from JSON: ${le(t)}`;
            throw (
              (e instanceof Error &&
                e.message.length > 0 &&
                (r += `: ${e.message}`),
              new Error(r))
            );
          }
      }
  }
  function fe(e, t, n, r) {
    switch (e) {
      case p.DOUBLE:
      case p.FLOAT:
        if (null === t) return r ? 0 : void 0;
        if ('NaN' === t) return Number.NaN;
        if ('Infinity' === t) return Number.POSITIVE_INFINITY;
        if ('-Infinity' === t) return Number.NEGATIVE_INFINITY;
        if (
          '' === t ||
          ('string' == typeof t && t.trim().length !== t.length) ||
          ('string' != typeof t && 'number' != typeof t)
        )
          break;
        let i = Number(t);
        if (Number.isNaN(i) || !Number.isFinite(i)) break;
        return e == p.FLOAT && l(i), i;
      case p.INT32:
      case p.FIXED32:
      case p.SFIXED32:
      case p.SINT32:
      case p.UINT32:
        if (null === t) return r ? 0 : void 0;
        let s;
        if (
          ('number' == typeof t
            ? (s = t)
            : 'string' == typeof t &&
              t.length > 0 &&
              t.trim().length === t.length &&
              (s = Number(t)),
          void 0 === s)
        )
          break;
        return e == p.UINT32 ? o(s) : a(s), s;
      case p.INT64:
      case p.SFIXED64:
      case p.SINT64:
        if (null === t) return r ? U.zero : void 0;
        if ('number' != typeof t && 'string' != typeof t) break;
        let u = U.parse(t);
        return n ? u.toString() : u;
      case p.FIXED64:
      case p.UINT64:
        if (null === t) return r ? U.zero : void 0;
        if ('number' != typeof t && 'string' != typeof t) break;
        let f = U.uParse(t);
        return n ? f.toString() : f;
      case p.BOOL:
        if (null === t) return !r && void 0;
        if ('boolean' != typeof t) break;
        return t;
      case p.STRING:
        if (null === t) return r ? '' : void 0;
        if ('string' != typeof t) break;
        try {
          encodeURIComponent(t);
        } catch {
          throw new Error('invalid UTF8');
        }
        return t;
      case p.BYTES:
        if (null === t) return r ? new Uint8Array(0) : void 0;
        if ('' === t) return new Uint8Array(0);
        if ('string' != typeof t) break;
        return Z.dec(t);
    }
    throw new Error();
  }
  function ce(e, t, n, r) {
    if (null === t) return r ? e.values[0].no : void 0;
    switch (typeof t) {
      case 'number':
        if (Number.isInteger(t)) return t;
        break;
      case 'string':
        let r = e.findName(t);
        if (r || n) return r?.no;
    }
    throw new Error(`cannot decode enum ${e.typeName} from JSON: ${le(t)}`);
  }
  function de(e, t, n, r) {
    var i;
    if (void 0 === t) return t;
    if (!n && e.values[0].no === t) return;
    if (r) return t;
    if ('google.protobuf.NullValue' == e.typeName) return null;
    let s = e.findNumber(t);
    return null !== (i = s?.name) && void 0 !== i ? i : t;
  }
  function he(t, n, r) {
    if (void 0 !== n)
      switch (t) {
        case p.INT32:
        case p.SFIXED32:
        case p.SINT32:
        case p.FIXED32:
        case p.UINT32:
          return e('number' == typeof n), 0 != n || r ? n : void 0;
        case p.FLOAT:
        case p.DOUBLE:
          return (
            e('number' == typeof n),
            Number.isNaN(n)
              ? 'NaN'
              : n === Number.POSITIVE_INFINITY
              ? 'Infinity'
              : n === Number.NEGATIVE_INFINITY
              ? '-Infinity'
              : 0 !== n || r
              ? n
              : void 0
          );
        case p.STRING:
          return e('string' == typeof n), n.length > 0 || r ? n : void 0;
        case p.BOOL:
          return e('boolean' == typeof n), n || r ? n : void 0;
        case p.UINT64:
        case p.FIXED64:
        case p.INT64:
        case p.SFIXED64:
        case p.SINT64:
          return (
            e(
              'bigint' == typeof n ||
                'string' == typeof n ||
                'number' == typeof n
            ),
            r || 0 != n ? n.toString(10) : void 0
          );
        case p.BYTES:
          return (
            e(n instanceof Uint8Array),
            r || n.byteLength > 0 ? Z.enc(n) : void 0
          );
      }
  }
  function me(e) {
    if (void 0 === e) return e;
    if (e instanceof b) return e.clone();
    if (e instanceof Uint8Array) {
      let t = new Uint8Array(e.byteLength);
      return t.set(e), t;
    }
    return e;
  }
  function pe(e) {
    return e instanceof Uint8Array ? e : new Uint8Array(e);
  }
  var ye = class {
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
  function ge(e, t) {
    let n = we(e);
    return t ? n : ve(Ie(n));
  }
  var be = we;
  function we(e) {
    let t = !1,
      n = [];
    for (let r = 0; r < e.length; r++) {
      let i = e.charAt(r);
      switch (i) {
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
          n.push(i), (t = !1);
          break;
        default:
          t && ((t = !1), (i = i.toUpperCase())), n.push(i);
      }
    }
    return n.join('');
  }
  var Ne = new Set(['constructor', 'toString', 'toJSON', 'valueOf']),
    ke = new Set([
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
    Te = e => `${e}$`,
    Ie = e => (ke.has(e) ? Te(e) : e),
    ve = e => (Ne.has(e) ? Te(e) : e),
    Se = class {
      constructor(e) {
        (this.kind = 'oneof'),
          (this.repeated = !1),
          (this.packed = !1),
          (this.opt = !1),
          (this.default = void 0),
          (this.fields = []),
          (this.name = e),
          (this.localName = (function (e) {
            return ge(e, !1);
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
    Ee = (function (e, t, n, r) {
      return {
        syntax: e,
        json: t,
        bin: n,
        util: r,
        makeMessageType(e, t, n) {
          return (function (e, t, n, r) {
            var i;
            let s =
                null !== (i = r?.localName) && void 0 !== i
                  ? i
                  : t.substring(t.lastIndexOf('.') + 1),
              a = {
                [s]: function (t) {
                  e.util.initFields(this), e.util.initPartial(t, this);
                }
              }[s];
            return (
              Object.setPrototypeOf(a.prototype, new b()),
              Object.assign(a, {
                runtime: e,
                typeName: t,
                fields: e.util.newFieldList(n),
                fromBinary: (e, t) => new a().fromBinary(e, t),
                fromJson: (e, t) => new a().fromJson(e, t),
                fromJsonString: (e, t) => new a().fromJsonString(e, t),
                equals: (t, n) => e.util.equals(a, t, n)
              }),
              a
            );
          })(this, e, t, n);
        },
        makeEnum: h,
        makeEnumType: d,
        getEnumType: f,
        makeExtension(e, t, n) {
          return (function (e, t, n, r) {
            let i;
            return {
              typeName: t,
              extendee: n,
              get field() {
                if (!i) {
                  let n = 'function' == typeof r ? r() : r;
                  (n.name = t.split('.').pop()),
                    (n.jsonName = `[${t}]`),
                    (i = e.util.newFieldList([n]).list()[0]);
                }
                return i;
              },
              runtime: e
            };
          })(this, e, t, n);
        }
      };
    })(
      'proto3',
      (function (e, t) {
        let n = t(de, he);
        return {
          makeReadOptions: ae,
          makeWriteOptions: oe,
          readMessage(t, n, r, i) {
            if (null == n || Array.isArray(n) || 'object' != typeof n)
              throw new Error(
                `cannot decode message ${t.typeName} from JSON: ${le(n)}`
              );
            i = i ?? new t();
            let s = new Map(),
              a = r.typeRegistry;
            for (let [o, l] of Object.entries(n)) {
              let n = t.fields.findJsonName(o);
              if (n) {
                if (n.oneof) {
                  if (null === l && 'scalar' == n.kind) continue;
                  let e = s.get(n.oneof);
                  if (void 0 !== e)
                    throw new Error(
                      `cannot decode message ${t.typeName} from JSON: multiple keys for oneof "${n.oneof.name}" present: "${e}", "${o}"`
                    );
                  s.set(n.oneof, o);
                }
                ue(i, l, n, r, t, e);
              } else {
                let e = !1;
                if (a?.findExtension && o.startsWith('[') && o.endsWith(']')) {
                  let n = a.findExtension(o.substring(1, o.length - 1));
                  if (n && n.extendee.typeName == t.typeName) {
                    e = !0;
                    let [t, s] = L(n);
                    ue(t, l, n.field, r, n, !0), te(i, n, s(), r);
                  }
                }
                if (!e && !r.ignoreUnknownFields)
                  throw new Error(
                    `cannot decode message ${t.typeName} from JSON: key "${o}" is unknown`
                  );
              }
            }
            return i;
          },
          writeMessage(e, t) {
            let r,
              i = e.getType(),
              s = {};
            try {
              for (let a of i.fields.byMember()) {
                let i;
                if ('oneof' == a.kind) {
                  let s = e[a.localName];
                  if (void 0 === s.value) continue;
                  if (((r = a.findField(s.case)), !r))
                    throw 'oneof case not found: ' + s.case;
                  i = n(r, s.value, t);
                } else (r = a), (i = n(r, e[r.localName], t));
                void 0 !== i &&
                  (s[t.useProtoFieldName ? r.name : r.jsonName] = i);
              }
              let a = t.typeRegistry;
              if (a?.findExtensionFor)
                for (let r of i.runtime.bin.listUnknownFields(e)) {
                  let o = a.findExtensionFor(i.typeName, r.no);
                  if (o && ne(e, o)) {
                    let r = ee(e, o, t),
                      i = n(o.field, r, t);
                    void 0 !== i && (s[o.field.jsonName] = i);
                  }
                }
            } catch (e) {
              let t = r
                  ? `cannot encode field ${i.typeName}.${r.name} to JSON`
                  : `cannot encode message ${i.typeName} to JSON`,
                n = e instanceof Error ? e.message : String(e);
              throw new Error(t + (n.length > 0 ? `: ${n}` : ''));
            }
            return s;
          },
          readScalar: (t, n, r) => fe(t, n, r, e),
          writeScalar: he,
          debug: le
        };
      })(
        !0,
        (t, n) =>
          function (r, i, s) {
            if ('map' == r.kind) {
              let a = {};
              switch (r.V.kind) {
                case 'scalar':
                  for (let [t, s] of Object.entries(i)) {
                    let i = n(r.V.T, s, !0);
                    e(void 0 !== i), (a[t.toString()] = i);
                  }
                  break;
                case 'message':
                  for (let [e, t] of Object.entries(i))
                    a[e.toString()] = t.toJson(s);
                  break;
                case 'enum':
                  let o = r.V.T;
                  for (let [n, r] of Object.entries(i)) {
                    e(void 0 === r || 'number' == typeof r);
                    let i = t(o, r, !0, s.enumAsInteger);
                    e(void 0 !== i), (a[n.toString()] = i);
                  }
              }
              return s.emitDefaultValues || Object.keys(a).length > 0
                ? a
                : void 0;
            }
            if (r.repeated) {
              let e = [];
              switch (r.kind) {
                case 'scalar':
                  for (let t = 0; t < i.length; t++) e.push(n(r.T, i[t], !0));
                  break;
                case 'enum':
                  for (let n = 0; n < i.length; n++)
                    e.push(t(r.T, i[n], !0, s.enumAsInteger));
                  break;
                case 'message':
                  for (let t = 0; t < i.length; t++) e.push(i[t].toJson(s));
              }
              return s.emitDefaultValues || e.length > 0 ? e : void 0;
            }
            if (void 0 !== i)
              switch (r.kind) {
                case 'scalar':
                  return n(r.T, i, !!r.oneof || r.opt || s.emitDefaultValues);
                case 'enum':
                  return t(
                    r.T,
                    i,
                    !!r.oneof || r.opt || s.emitDefaultValues,
                    s.enumAsInteger
                  );
                case 'message':
                  return V(r.T, i).toJson(s);
              }
          }
      ),
      Object.assign(
        Object.assign(
          {},
          {
            makeReadOptions: P,
            makeWriteOptions: M,
            listUnknownFields(e) {
              var t;
              return null !== (t = e[J]) && void 0 !== t ? t : [];
            },
            discardUnknownFields(e) {
              delete e[J];
            },
            writeUnknownFields(e, t) {
              let n = e[J];
              if (n) for (let e of n) t.tag(e.no, e.wireType).raw(e.data);
            },
            onUnknownField(e, t, n, r) {
              let i = e;
              Array.isArray(i[J]) || (i[J] = []),
                i[J].push({ no: t, wireType: n, data: r });
            },
            readMessage(e, t, n, r, i) {
              let s,
                a,
                o = e.getType(),
                l = i ? t.len : t.pos + n;
              for (; t.pos < l && (([s, a] = t.tag()), a != F.EndGroup); ) {
                let n = o.fields.find(s);
                if (n) R(e, t, n, a, r);
                else {
                  let n = t.skip(a);
                  r.readUnknownFields && this.onUnknownField(e, s, a, n);
                }
              }
              if (i && (a != F.EndGroup || s !== n))
                throw new Error('invalid end group tag');
            },
            readField: R
          }
        ),
        {
          writeField: z,
          writeMessage(e, t, n) {
            let r = e.getType();
            for (let i of r.fields.byNumber()) {
              let r,
                s = i.localName;
              if (i.oneof) {
                let t = e[i.oneof.localName];
                if (t.case !== s) continue;
                r = t.value;
              } else r = e[s];
              z(i, r, t, n);
            }
            return n.writeUnknownFields && this.writeUnknownFields(e, t), t;
          }
        }
      ),
      Object.assign(
        Object.assign(
          {},
          {
            setEnumType: c,
            initPartial(e, t) {
              if (void 0 === e) return;
              let n = t.getType();
              for (let r of n.fields.byMember()) {
                let n = r.localName,
                  i = t,
                  s = e;
                if (void 0 !== s[n])
                  switch (r.kind) {
                    case 'oneof':
                      let e = s[n].case;
                      if (void 0 === e) continue;
                      let t = r.findField(e),
                        a = s[n].value;
                      !t || 'message' != t.kind || a instanceof t.T
                        ? t &&
                          'scalar' === t.kind &&
                          t.T === p.BYTES &&
                          (a = pe(a))
                        : (a = new t.T(a)),
                        (i[n] = { case: e, value: a });
                      break;
                    case 'scalar':
                    case 'enum':
                      let o = s[n];
                      r.T === p.BYTES && (o = r.repeated ? o.map(pe) : pe(o)),
                        (i[n] = o);
                      break;
                    case 'map':
                      switch (r.V.kind) {
                        case 'scalar':
                        case 'enum':
                          if (r.V.T === p.BYTES)
                            for (let [e, t] of Object.entries(s[n]))
                              i[n][e] = pe(t);
                          else Object.assign(i[n], s[n]);
                          break;
                        case 'message':
                          let e = r.V.T;
                          for (let t of Object.keys(s[n])) {
                            let r = s[n][t];
                            e.fieldWrapper || (r = new e(r)), (i[n][t] = r);
                          }
                      }
                      break;
                    case 'message':
                      let l = r.T;
                      if (r.repeated)
                        i[n] = s[n].map(e => (e instanceof l ? e : new l(e)));
                      else if (void 0 !== s[n]) {
                        let e = s[n];
                        l.fieldWrapper
                          ? 'google.protobuf.BytesValue' === l.typeName
                            ? (i[n] = pe(e))
                            : (i[n] = e)
                          : (i[n] = e instanceof l ? e : new l(e));
                      }
                  }
              }
            },
            equals: (e, t, n) =>
              t === n ||
              (!(!t || !n) &&
                e.fields.byMember().every(e => {
                  let r = t[e.localName],
                    i = n[e.localName];
                  if (e.repeated) {
                    if (r.length !== i.length) return !1;
                    switch (e.kind) {
                      case 'message':
                        return r.every((t, n) => e.T.equals(t, i[n]));
                      case 'scalar':
                        return r.every((t, n) => D(e.T, t, i[n]));
                      case 'enum':
                        return r.every((e, t) => D(p.INT32, e, i[t]));
                    }
                    throw new Error(`repeated cannot contain ${e.kind}`);
                  }
                  switch (e.kind) {
                    case 'message':
                      return e.T.equals(r, i);
                    case 'enum':
                      return D(p.INT32, r, i);
                    case 'scalar':
                      return D(e.T, r, i);
                    case 'oneof':
                      if (r.case !== i.case) return !1;
                      let t = e.findField(r.case);
                      if (void 0 === t) return !0;
                      switch (t.kind) {
                        case 'message':
                          return t.T.equals(r.value, i.value);
                        case 'enum':
                          return D(p.INT32, r.value, i.value);
                        case 'scalar':
                          return D(t.T, r.value, i.value);
                      }
                      throw new Error(`oneof cannot contain ${t.kind}`);
                    case 'map':
                      let n = Object.keys(r).concat(Object.keys(i));
                      switch (e.V.kind) {
                        case 'message':
                          let t = e.V.T;
                          return n.every(e => t.equals(r[e], i[e]));
                        case 'enum':
                          return n.every(e => D(p.INT32, r[e], i[e]));
                        case 'scalar':
                          let s = e.V.T;
                          return n.every(e => D(s, r[e], i[e]));
                      }
                  }
                })),
            clone(e) {
              let t = e.getType(),
                n = new t(),
                r = n;
              for (let n of t.fields.byMember()) {
                let t,
                  i = e[n.localName];
                if (n.repeated) t = i.map(me);
                else if ('map' == n.kind) {
                  t = r[n.localName];
                  for (let [e, n] of Object.entries(i)) t[e] = me(n);
                } else
                  t =
                    'oneof' == n.kind
                      ? n.findField(i.case)
                        ? { case: i.case, value: me(i.value) }
                        : { case: void 0 }
                      : me(i);
                r[n.localName] = t;
              }
              return n;
            }
          }
        ),
        {
          newFieldList: e => new ye(e, Be),
          initFields(e) {
            for (let t of e.getType().fields.byMember()) {
              if (t.opt) continue;
              let n = t.localName,
                r = e;
              if (t.repeated) r[n] = [];
              else
                switch (t.kind) {
                  case 'oneof':
                    r[n] = { case: void 0 };
                    break;
                  case 'enum':
                    r[n] = 0;
                    break;
                  case 'map':
                    r[n] = {};
                    break;
                  case 'scalar':
                    r[n] = j(t.T, t.L);
                }
            }
          }
        }
      )
    );
  function Be(e) {
    var t, n, r, i;
    let s,
      a = [];
    for (let o of 'function' == typeof e ? e() : e) {
      let e = o;
      if (
        ((e.localName = ge(o.name, void 0 !== o.oneof)),
        (e.jsonName =
          null !== (t = o.jsonName) && void 0 !== t ? t : be(o.name)),
        (e.repeated = null !== (n = o.repeated) && void 0 !== n && n),
        'scalar' == o.kind &&
          (e.L = null !== (r = o.L) && void 0 !== r ? r : g.BIGINT),
        void 0 !== o.oneof)
      ) {
        let t = 'string' == typeof o.oneof ? o.oneof : o.oneof.name;
        (!s || s.name != t) && (s = new Se(t)), (e.oneof = s), s.addField(e);
      }
      'message' == o.kind && (e.delimited = !1),
        (e.packed =
          null !== (i = o.packed) && void 0 !== i
            ? i
            : 'enum' == o.kind ||
              ('scalar' == o.kind && o.T != p.BYTES && o.T != p.STRING)),
        a.push(e);
    }
    return a;
  }
  var Oe = Ee.makeMessageType('youtube.request.Request', () => [
      { no: 1, name: 'context', kind: 'message', T: Fe },
      { no: 2, name: 'browseId', kind: 'scalar', T: 9 }
    ]),
    Fe = Ee.makeMessageType('youtube.request.Context', () => [
      { no: 9, name: 'adSignalsInfo', kind: 'message', T: Ue }
    ]),
    Ue = Ee.makeMessageType('youtube.request.AdSignalsInfo', () => [
      { no: 1, name: 'params', kind: 'message', T: Ae, repeated: !0 }
    ]),
    Ae = Ee.makeMessageType('youtube.request.Params', () => [
      { no: 1, name: 'key', kind: 'scalar', T: 9 },
      { no: 2, name: 'value', kind: 'scalar', T: 9 }
    ]),
    $e = class {
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
          $e.instances[n] || ($e.instances[n] = $e.classNames[n](e, n, t)),
          $e.instances[n]
        );
      }
      createProxy(e) {
        return new Proxy(e, { get: this.getFn, set: this.setFn });
      }
      getFn(e, t, n) {
        return e[t];
      }
      setFn(e, t, n, r) {
        return (e[t] = n), !0;
      }
      getJSON(e, t = {}) {
        let n = this.getVal(e);
        return n ? JSON.parse(n) : t;
      }
      setJSON(e, t) {
        this.setVal(JSON.stringify(e), t);
      }
      msg(e = this.name, t = '', n = '', r) {}
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
    De = $e;
  (De.instances = {}),
    (De.classNames = {
      QuanX: (e, t, n) => new Ve(e, t, n),
      Surge: (e, t, n) => new xe(e, t, n)
    });
  var je = class extends De {
      getFn(e, t, n) {
        let r = je.clientAdapter[t] || t;
        return super.getFn(e, r, n);
      }
      setFn(e, t, n, r) {
        let i = je.clientAdapter[t] || t;
        return super.setFn(e, i, n, r);
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
      msg(e = this.name, t = '', n = '', r) {
        $notification.post(e, t, n, { url: r ?? '' });
      }
      async fetch(e) {
        return await new Promise((t, n) => {
          let { method: r, body: i, bodyBytes: s, ...a } = e,
            o = s ?? i,
            l = o instanceof Uint8Array;
          $httpClient[r.toLowerCase()](
            { ...a, body: o, 'binary-mode': l },
            (e, r, i) => {
              e && n(e);
              let s = l ? 'bodyBytes' : 'body';
              t({
                status: r.status || r.statusCode,
                headers: r.headers,
                [s]: i
              });
            }
          );
        });
      }
      done(e) {
        let t,
          n,
          r = e.response ?? e;
        r.bodyBytes
          ? ((t = r.bodyBytes),
            delete r.bodyBytes,
            (n = { ...e }),
            n.response ? (n.response.body = t) : (n.body = t))
          : (n = e),
          $done(n);
      }
    },
    xe = je;
  xe.clientAdapter = { bodyBytes: 'body' };
  var Le = class extends De {
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
        let r = Le.clientAdapter[t] || t,
          i = super.getFn(e, r, n);
        return (
          'bodyBytes' === t && (i = Le.transferBodyBytes(i, 'Uint8Array')), i
        );
      }
      setFn(e, t, n, r) {
        let i = Le.clientAdapter[t] || t,
          s = n;
        return (
          'bodyBytes' === t && (s = Le.transferBodyBytes(s, 'Uint8Array')),
          super.setFn(e, i, s, r)
        );
      }
      getVal(e) {
        return $prefs.valueForKey(e)?.replace(/\0/g, '');
      }
      setVal(e, t) {
        $prefs.setValueForKey(e, t);
      }
      msg(e = this.name, t = '', n = '', r) {
        $notify(e, t, n, { 'open-url': r ?? '' });
      }
      async fetch(e) {
        return await new Promise(t => {
          let n = { url: '', method: 'GET' };
          for (let [t, r] of Object.entries(e))
            'id' === t
              ? (n.sessionIndex = r)
              : 'bodyBytes' === t
              ? (n.bodyBytes = Le.transferBodyBytes(r, 'ArrayBuffer'))
              : (n[t] = r);
          e.bodyBytes && delete n.body,
            $task.fetch(n).then(e => {
              let n = { status: 200, headers: {} };
              for (let [t, r] of Object.entries(e))
                'sessionIndex' === t
                  ? (n.id = r)
                  : 'bodyBytes' === t
                  ? (n.bodyBytes = Le.transferBodyBytes(r, 'Uint8Array'))
                  : 'statusCode' === t
                  ? (n.status = r)
                  : (n[t] = r);
              t(n);
            });
        });
      }
      done(e) {
        let t = e.response ?? e,
          n = {};
        for (let [e, r] of Object.entries(t))
          'status' === e
            ? (n.status = `HTTP/1.1 ${r}`)
            : 'bodyBytes' === e
            ? (n.bodyBytes = Le.transferBodyBytes(r, 'ArrayBuffer'))
            : (n[e] = r);
        $done(n);
      }
    },
    Ve = Le;
  Ve.clientAdapter = { id: 'sessionIndex', status: 'statusCode' };
  var Je = De.getInstance('YouTube', { debug: !1 }),
    Ge = class {
      constructor(e, t) {
        (this.decoder = new TextDecoder('utf-8', { fatal: !1, ignoreBOM: !0 })),
          Je.log(t),
          (this.msgType = e),
          Object.assign(
            this,
            Je.getJSON('YouTubeAdvertiseInfo', {
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
          Je.log('Update Config');
          let e = {
            whiteNo: this.whiteNo,
            blackNo: this.blackNo,
            whiteEml: this.whiteEml,
            blackEml: this.blackEml
          };
          Je.setJSON(e, 'YouTubeAdvertiseInfo');
        }
      }
      done(e) {
        this.save();
        let t = e.bodyBytes;
        this.needProcess && (t = this.toBinary()),
          (e.headers['Content-Encoding'] = 'identity'),
          (e.headers['Content-Length'] = (t?.length ?? 0)?.toString()),
          Je.done({ response: { ...e, bodyBytes: t } });
      }
      doneResponse() {
        this.save(),
          this.needProcess && Je.done({ bodyBytes: this.toBinary() }),
          Je.exit();
      }
      iterate(e = {}, t, n) {
        let r = 'object' == typeof e ? [e] : [];
        for (; r.length; ) {
          let e = r.pop(),
            i = Object.keys(e);
          if ('symbol' == typeof t)
            for (let i of Object.getOwnPropertySymbols(e))
              if (i.description === t.description) {
                n(e, r);
                break;
              }
          for (let s of i)
            s === t ? n(e, r) : 'object' == typeof e[s] && r.push(e[s]);
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
          r = '';
        return (
          this.iterate(e, 'type', (e, i) => {
            (r = e.type.split('|')[0]),
              this.whiteEml.includes(r)
                ? (t = !1)
                : this.blackEml.includes(r) || /shorts(?!_pivot_item)/.test(r)
                ? (t = !0)
                : (n = !1),
              (i.length = 0);
          }),
          n ||
            (this.iterate(
              e,
              Symbol.for('@bufbuild/protobuf/unknown-fields'),
              (e, n) => {
                let r = this.listUnknownFields(e);
                for (let e of r)
                  if (
                    e.data.length > 1e3 &&
                    ((t = this.decoder.decode(e.data).includes('pagead')), t)
                  ) {
                    n.length = 0;
                    break;
                  }
              }
            ),
            t ? this.blackEml.push(r) : this.whiteEml.push(r),
            (this.needSave = !0)),
          t
        );
      }
    },
    Xe = new (class extends Ge {
      constructor(e = Oe, t = 'Request') {
        super(e, t);
      }
      pure() {
        return (
          (this.message.context.adSignalsInfo.params.length = 0),
          (this.needProcess = !0),
          this
        );
      }
    })();
  try {
    let e = Xe.fromBinary(Je.request.bodyBytes).pure().toBinary();
    Je.done({ bodyBytes: e });
  } catch (y) {
    Je.log(y.toString()), Je.exit();
  }
})();
