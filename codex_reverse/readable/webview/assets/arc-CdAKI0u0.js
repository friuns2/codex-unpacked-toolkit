import {
  aG as ln,
  aH as an,
  aI as y,
  aJ as tn,
  aK as N,
  aL as I,
  aM as _,
  aN as un,
  aO as J,
  aP as rn,
  aQ as j,
  aR as o,
  aS as sn,
  aT as on,
  aU as fn,
} from "./index-BnRAGF7J.js";
function cn(l) {
  return l.innerRadius;
}
function yn(l) {
  return l.outerRadius;
}
function gn(l) {
  return l.startAngle;
}
function dn(l) {
  return l.endAngle;
}
function mn(l) {
  return l && l.padAngle;
}
function pn(l, h, q, O, v, R, K, a) {
  var D = q - l,
    i = O - h,
    n = K - v,
    d = a - R,
    u = d * D - n * i;
  if (!(u * u < y))
    return ((u = (n * (h - R) - d * (l - v)) / u), [l + u * D, h + u * i]);
}
function W(l, h, q, O, v, R, K) {
  var a = l - q,
    D = h - O,
    i = (K ? R : -R) / j(a * a + D * D),
    n = i * D,
    d = -i * a,
    u = l + n,
    s = h + d,
    f = q + n,
    c = O + d,
    L = (u + f) / 2,
    t = (s + c) / 2,
    m = f - u,
    g = c - s,
    A = m * m + g * g,
    T = v - R,
    P = u * c - f * s,
    E = (g < 0 ? -1 : 1) * j(fn(0, T * T * A - P * P)),
    G = (P * g - m * E) / A,
    H = (-P * m - g * E) / A,
    w = (P * g + m * E) / A,
    p = (-P * m + g * E) / A,
    x = G - L,
    e = H - t,
    r = w - L,
    M = p - t;
  return (
    x * x + e * e > r * r + M * M && ((G = w), (H = p)),
    {
      cx: G,
      cy: H,
      x01: -n,
      y01: -d,
      x11: G * (v / T - 1),
      y11: H * (v / T - 1),
    }
  );
}
function hn() {
  var l = cn,
    h = yn,
    q = J(0),
    O = null,
    v = gn,
    R = dn,
    K = mn,
    a = null,
    D = ln(i);
  function i() {
    var n,
      d,
      u = +l.apply(this, arguments),
      s = +h.apply(this, arguments),
      f = v.apply(this, arguments) - an,
      c = R.apply(this, arguments) - an,
      L = un(c - f),
      t = c > f;
    if ((a || (a = n = D()), s < u && ((d = s), (s = u), (u = d)), !(s > y)))
      a.moveTo(0, 0);
    else if (L > tn - y)
      (a.moveTo(s * N(f), s * I(f)),
        a.arc(0, 0, s, f, c, !t),
        u > y && (a.moveTo(u * N(c), u * I(c)), a.arc(0, 0, u, c, f, t)));
    else {
      var m = f,
        g = c,
        A = f,
        T = c,
        P = L,
        E = L,
        G = K.apply(this, arguments) / 2,
        H = G > y && (O ? +O.apply(this, arguments) : j(u * u + s * s)),
        w = _(un(s - u) / 2, +q.apply(this, arguments)),
        p = w,
        x = w,
        e,
        r;
      if (H > y) {
        var M = sn((H / u) * I(G)),
          z = sn((H / s) * I(G));
        ((P -= M * 2) > y
          ? ((M *= t ? 1 : -1), (A += M), (T -= M))
          : ((P = 0), (A = T = (f + c) / 2)),
          (E -= z * 2) > y
            ? ((z *= t ? 1 : -1), (m += z), (g -= z))
            : ((E = 0), (m = g = (f + c) / 2)));
      }
      var Q = s * N(m),
        U = s * I(m),
        B = u * N(T),
        C = u * I(T);
      if (w > y) {
        var F = s * N(g),
          V = s * I(g),
          X = u * N(A),
          Y = u * I(A),
          S;
        if (L < rn)
          if ((S = pn(Q, U, X, Y, F, V, B, C))) {
            var Z = Q - S[0],
              $ = U - S[1],
              k = F - S[0],
              b = V - S[1],
              nn =
                1 /
                I(
                  on((Z * k + $ * b) / (j(Z * Z + $ * $) * j(k * k + b * b))) /
                    2,
                ),
              en = j(S[0] * S[0] + S[1] * S[1]);
            ((p = _(w, (u - en) / (nn - 1))), (x = _(w, (s - en) / (nn + 1))));
          } else p = x = 0;
      }
      (E > y
        ? x > y
          ? ((e = W(X, Y, Q, U, s, x, t)),
            (r = W(F, V, B, C, s, x, t)),
            a.moveTo(e.cx + e.x01, e.cy + e.y01),
            x < w
              ? a.arc(e.cx, e.cy, x, o(e.y01, e.x01), o(r.y01, r.x01), !t)
              : (a.arc(e.cx, e.cy, x, o(e.y01, e.x01), o(e.y11, e.x11), !t),
                a.arc(
                  0,
                  0,
                  s,
                  o(e.cy + e.y11, e.cx + e.x11),
                  o(r.cy + r.y11, r.cx + r.x11),
                  !t,
                ),
                a.arc(r.cx, r.cy, x, o(r.y11, r.x11), o(r.y01, r.x01), !t)))
          : (a.moveTo(Q, U), a.arc(0, 0, s, m, g, !t))
        : a.moveTo(Q, U),
        !(u > y) || !(P > y)
          ? a.lineTo(B, C)
          : p > y
            ? ((e = W(B, C, F, V, u, -p, t)),
              (r = W(Q, U, X, Y, u, -p, t)),
              a.lineTo(e.cx + e.x01, e.cy + e.y01),
              p < w
                ? a.arc(e.cx, e.cy, p, o(e.y01, e.x01), o(r.y01, r.x01), !t)
                : (a.arc(e.cx, e.cy, p, o(e.y01, e.x01), o(e.y11, e.x11), !t),
                  a.arc(
                    0,
                    0,
                    u,
                    o(e.cy + e.y11, e.cx + e.x11),
                    o(r.cy + r.y11, r.cx + r.x11),
                    t,
                  ),
                  a.arc(r.cx, r.cy, p, o(r.y11, r.x11), o(r.y01, r.x01), !t)))
            : a.arc(0, 0, u, T, A, t));
    }
    if ((a.closePath(), n)) return ((a = null), n + "" || null);
  }
  return (
    (i.centroid = function () {
      var n = (+l.apply(this, arguments) + +h.apply(this, arguments)) / 2,
        d =
          (+v.apply(this, arguments) + +R.apply(this, arguments)) / 2 - rn / 2;
      return [N(d) * n, I(d) * n];
    }),
    (i.innerRadius = function (n) {
      return arguments.length
        ? ((l = typeof n == "function" ? n : J(+n)), i)
        : l;
    }),
    (i.outerRadius = function (n) {
      return arguments.length
        ? ((h = typeof n == "function" ? n : J(+n)), i)
        : h;
    }),
    (i.cornerRadius = function (n) {
      return arguments.length
        ? ((q = typeof n == "function" ? n : J(+n)), i)
        : q;
    }),
    (i.padRadius = function (n) {
      return arguments.length
        ? ((O = n == null ? null : typeof n == "function" ? n : J(+n)), i)
        : O;
    }),
    (i.startAngle = function (n) {
      return arguments.length
        ? ((v = typeof n == "function" ? n : J(+n)), i)
        : v;
    }),
    (i.endAngle = function (n) {
      return arguments.length
        ? ((R = typeof n == "function" ? n : J(+n)), i)
        : R;
    }),
    (i.padAngle = function (n) {
      return arguments.length
        ? ((K = typeof n == "function" ? n : J(+n)), i)
        : K;
    }),
    (i.context = function (n) {
      return arguments.length ? ((a = n ?? null), i) : a;
    }),
    i
  );
}
export { hn as d };
//# sourceMappingURL=arc-CdAKI0u0.js.map
