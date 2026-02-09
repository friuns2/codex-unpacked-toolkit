"use strict";

Object.defineProperty(exports, Symbol.toStringTag, {
  value: "Module",
});
const process = require("node:process"),
  workerCGFIvBQ = require("./worker-C_GFIvBQ.js"),
  path = require("path"),
  childProcess = require("child_process"),
  fs = require("fs"),
  os = require("os"),
  assert = require("assert"),
  events = require("events"),
  buffer = require("buffer"),
  stream = require("stream"),
  util = require("util"),
  os2 = require("node:os");
var $ = {
    exports: {},
  },
  _ = {
    exports: {},
  },
  re,
  $e;
function Rn() {
  if ($e) return re;
  (($e = 1), (re = o), (o.sync = i));
  var n = fs;
  function r(t, e) {
    var u = e.pathExt !== void 0 ? e.pathExt : process.env.PATHEXT;
    if (!u || ((u = u.split(";")), u.indexOf("") !== -1)) return !0;
    for (var s = 0; s < u.length; s++) {
      var a = u[s].toLowerCase();
      if (a && t.substr(-a.length).toLowerCase() === a) return !0;
    }
    return !1;
  }
  function l(t, e, u) {
    return !t.isSymbolicLink() && !t.isFile() ? !1 : r(e, u);
  }
  function o(t, e, u) {
    n.stat(t, function (s, a) {
      u(s, s ? !1 : l(a, t, e));
    });
  }
  function i(t, e) {
    return l(n.statSync(t), t, e);
  }
  return re;
}
var oe, _e;
function Pn() {
  if (_e) return oe;
  ((_e = 1), (oe = r), (r.sync = l));
  var n = fs;
  function r(t, e, u) {
    n.stat(t, function (s, a) {
      u(s, s ? !1 : o(a, e));
    });
  }
  function l(t, e) {
    return o(n.statSync(t), e);
  }
  function o(t, e) {
    return t.isFile() && i(t, e);
  }
  function i(t, e) {
    var u = t.mode,
      s = t.uid,
      a = t.gid,
      c = e.uid !== void 0 ? e.uid : process.getuid && process.getuid(),
      f = e.gid !== void 0 ? e.gid : process.getgid && process.getgid(),
      h = parseInt("100", 8),
      d = parseInt("010", 8),
      p = parseInt("001", 8),
      g = h | d,
      m =
        u & p || (u & d && a === f) || (u & h && s === c) || (u & g && c === 0);
    return m;
  }
  return oe;
}
var ie, Ae;
function Tn() {
  if (Ae) return ie;
  Ae = 1;
  var n;
  (process.platform === "win32" || workerCGFIvBQ.commonjsGlobal.TESTING_WINDOWS
    ? (n = Rn())
    : (n = Pn()),
    (ie = r),
    (r.sync = l));
  function r(o, i, t) {
    if ((typeof i == "function" && ((t = i), (i = {})), !t)) {
      if (typeof Promise != "function")
        throw new TypeError("callback not provided");
      return new Promise(function (e, u) {
        r(o, i || {}, function (s, a) {
          s ? u(s) : e(a);
        });
      });
    }
    n(o, i || {}, function (e, u) {
      (e &&
        (e.code === "EACCES" || (i && i.ignoreErrors)) &&
        ((e = null), (u = !1)),
        t(e, u));
    });
  }
  function l(o, i) {
    try {
      return n.sync(o, i || {});
    } catch (t) {
      if ((i && i.ignoreErrors) || t.code === "EACCES") return !1;
      throw t;
    }
  }
  return ie;
}
var se, Oe;
function Cn() {
  if (Oe) return se;
  Oe = 1;
  const n =
      process.platform === "win32" ||
      process.env.OSTYPE === "cygwin" ||
      process.env.OSTYPE === "msys",
    r = path,
    l = n ? ";" : ":",
    o = Tn(),
    i = (s) =>
      Object.assign(new Error(`not found: ${s}`), {
        code: "ENOENT",
      }),
    t = (s, a) => {
      const c = a.colon || l,
        f =
          s.match(/\//) || (n && s.match(/\\/))
            ? [""]
            : [
                ...(n ? [process.cwd()] : []),
                ...(a.path || process.env.PATH || "").split(c),
              ],
        h = n ? a.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "",
        d = n ? h.split(c) : [""];
      return (
        n && s.indexOf(".") !== -1 && d[0] !== "" && d.unshift(""),
        {
          pathEnv: f,
          pathExt: d,
          pathExtExe: h,
        }
      );
    },
    e = (s, a, c) => {
      (typeof a == "function" && ((c = a), (a = {})), a || (a = {}));
      const { pathEnv: f, pathExt: h, pathExtExe: d } = t(s, a),
        p = [],
        g = (S) =>
          new Promise((v, b) => {
            if (S === f.length) return a.all && p.length ? v(p) : b(i(s));
            const R = f[S],
              P = /^".*"$/.test(R) ? R.slice(1, -1) : R,
              G = r.join(P, s),
              k = !P && /^\.[\\\/]/.test(s) ? s.slice(0, 2) + G : G;
            v(m(k, S, 0));
          }),
        m = (S, v, b) =>
          new Promise((R, P) => {
            if (b === h.length) return R(g(v + 1));
            const G = h[b];
            o(
              S + G,
              {
                pathExt: d,
              },
              (k, W) => {
                if (!k && W)
                  if (a.all) p.push(S + G);
                  else return R(S + G);
                return R(m(S, v, b + 1));
              },
            );
          });
      return c ? g(0).then((S) => c(null, S), c) : g(0);
    },
    u = (s, a) => {
      a = a || {};
      const { pathEnv: c, pathExt: f, pathExtExe: h } = t(s, a),
        d = [];
      for (let p = 0; p < c.length; p++) {
        const g = c[p],
          m = /^".*"$/.test(g) ? g.slice(1, -1) : g,
          S = r.join(m, s),
          v = !m && /^\.[\\\/]/.test(s) ? s.slice(0, 2) + S : S;
        for (let b = 0; b < f.length; b++) {
          const R = v + f[b];
          try {
            if (
              o.sync(R, {
                pathExt: h,
              })
            )
              if (a.all) d.push(R);
              else return R;
          } catch {}
        }
      }
      if (a.all && d.length) return d;
      if (a.nothrow) return null;
      throw i(s);
    };
  return ((se = e), (e.sync = u), se);
}
var Q = {
    exports: {},
  },
  Ne;
function mn() {
  if (Ne) return Q.exports;
  Ne = 1;
  const n = (r = {}) => {
    const l = r.env || process.env;
    return (r.platform || process.platform) !== "win32"
      ? "PATH"
      : Object.keys(l)
          .reverse()
          .find((i) => i.toUpperCase() === "PATH") || "Path";
  };
  return ((Q.exports = n), (Q.exports.default = n), Q.exports);
}
var ae, Le;
function qn() {
  if (Le) return ae;
  Le = 1;
  const n = path,
    r = Cn(),
    l = mn();
  function o(t, e) {
    const u = t.options.env || process.env,
      s = process.cwd(),
      a = t.options.cwd != null,
      c = a && process.chdir !== void 0 && !process.chdir.disabled;
    if (c)
      try {
        process.chdir(t.options.cwd);
      } catch {}
    let f;
    try {
      f = r.sync(t.command, {
        path: u[
          l({
            env: u,
          })
        ],
        pathExt: e ? n.delimiter : void 0,
      });
    } catch {
    } finally {
      c && process.chdir(s);
    }
    return (f && (f = n.resolve(a ? t.options.cwd : "", f)), f);
  }
  function i(t) {
    return o(t) || o(t, !0);
  }
  return ((ae = i), ae);
}
var J = {},
  Me;
function Gn() {
  if (Me) return J;
  Me = 1;
  const n = /([()\][%!^"`<>&|;, *?])/g;
  function r(o) {
    return ((o = o.replace(n, "^$1")), o);
  }
  function l(o, i) {
    return (
      (o = `${o}`),
      (o = o.replace(/(?=(\\+?)?)\1"/g, '$1$1\\"')),
      (o = o.replace(/(?=(\\+?)?)\1$/, "$1$1")),
      (o = `"${o}"`),
      (o = o.replace(n, "^$1")),
      i && (o = o.replace(n, "^$1")),
      o
    );
  }
  return ((J.command = r), (J.argument = l), J);
}
var ce, Be;
function $n() {
  return (Be || ((Be = 1), (ce = /^#!(.*)/)), ce);
}
var ue, je;
function _n() {
  if (je) return ue;
  je = 1;
  const n = $n();
  return (
    (ue = (r = "") => {
      const l = r.match(n);
      if (!l) return null;
      const [o, i] = l[0].replace(/#! ?/, "").split(" "),
        t = o.split("/").pop();
      return t === "env" ? i : i ? `${t} ${i}` : t;
    }),
    ue
  );
}
var le, ke;
function An() {
  if (ke) return le;
  ke = 1;
  const n = fs,
    r = _n();
  function l(o) {
    const t = Buffer.alloc(150);
    let e;
    try {
      ((e = n.openSync(o, "r")), n.readSync(e, t, 0, 150, 0), n.closeSync(e));
    } catch {}
    return r(t.toString());
  }
  return ((le = l), le);
}
var de, Fe;
function On() {
  if (Fe) return de;
  Fe = 1;
  const n = path,
    r = qn(),
    l = Gn(),
    o = An(),
    i = process.platform === "win32",
    t = /\.(?:com|exe)$/i,
    e = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
  function u(c) {
    c.file = r(c);
    const f = c.file && o(c.file);
    return f ? (c.args.unshift(c.file), (c.command = f), r(c)) : c.file;
  }
  function s(c) {
    if (!i) return c;
    const f = u(c),
      h = !t.test(f);
    if (c.options.forceShell || h) {
      const d = e.test(f);
      ((c.command = n.normalize(c.command)),
        (c.command = l.command(c.command)),
        (c.args = c.args.map((g) => l.argument(g, d))));
      const p = [c.command].concat(c.args).join(" ");
      ((c.args = ["/d", "/s", "/c", `"${p}"`]),
        (c.command = process.env.comspec || "cmd.exe"),
        (c.options.windowsVerbatimArguments = !0));
    }
    return c;
  }
  function a(c, f, h) {
    (f && !Array.isArray(f) && ((h = f), (f = null)),
      (f = f ? f.slice(0) : []),
      (h = Object.assign({}, h)));
    const d = {
      command: c,
      args: f,
      options: h,
      file: void 0,
      original: {
        command: c,
        args: f,
      },
    };
    return h.shell ? d : s(d);
  }
  return ((de = a), de);
}
var fe, Ue;
function Nn() {
  if (Ue) return fe;
  Ue = 1;
  const n = process.platform === "win32";
  function r(t, e) {
    return Object.assign(new Error(`${e} ${t.command} ENOENT`), {
      code: "ENOENT",
      errno: "ENOENT",
      syscall: `${e} ${t.command}`,
      path: t.command,
      spawnargs: t.args,
    });
  }
  function l(t, e) {
    if (!n) return;
    const u = t.emit;
    t.emit = function (s, a) {
      if (s === "exit") {
        const c = o(a, e);
        if (c) return u.call(t, "error", c);
      }
      return u.apply(t, arguments);
    };
  }
  function o(t, e) {
    return n && t === 1 && !e.file ? r(e.original, "spawn") : null;
  }
  function i(t, e) {
    return n && t === 1 && !e.file ? r(e.original, "spawnSync") : null;
  }
  return (
    (fe = {
      hookChildProcess: l,
      verifyENOENT: o,
      verifyENOENTSync: i,
      notFoundError: r,
    }),
    fe
  );
}
var De;
function Ln() {
  if (De) return _.exports;
  De = 1;
  const n = childProcess,
    r = On(),
    l = Nn();
  function o(t, e, u) {
    const s = r(t, e, u),
      a = n.spawn(s.command, s.args, s.options);
    return (l.hookChildProcess(a, s), a);
  }
  function i(t, e, u) {
    const s = r(t, e, u),
      a = n.spawnSync(s.command, s.args, s.options);
    return ((a.error = a.error || l.verifyENOENTSync(a.status, s)), a);
  }
  return (
    (_.exports = o),
    (_.exports.spawn = o),
    (_.exports.sync = i),
    (_.exports._parse = r),
    (_.exports._enoent = l),
    _.exports
  );
}
var me, He;
function Mn() {
  return (
    He ||
      ((He = 1),
      (me = (n) => {
        const r =
            typeof n == "string"
              ? `
`
              : 10,
          l = typeof n == "string" ? "\r" : 13;
        return (
          n[n.length - 1] === r && (n = n.slice(0, n.length - 1)),
          n[n.length - 1] === l && (n = n.slice(0, n.length - 1)),
          n
        );
      })),
    me
  );
}
var te = {
  exports: {},
};
te.exports;
var Ke;
function Bn() {
  return (
    Ke ||
      ((Ke = 1),
      (function (n) {
        const r = path,
          l = mn(),
          o = (i) => {
            i = {
              cwd: process.cwd(),
              path: process.env[l()],
              execPath: process.execPath,
              ...i,
            };
            let t,
              e = r.resolve(i.cwd);
            const u = [];
            for (; t !== e; )
              (u.push(r.join(e, "node_modules/.bin")),
                (t = e),
                (e = r.resolve(e, "..")));
            const s = r.resolve(i.cwd, i.execPath, "..");
            return (u.push(s), u.concat(i.path).join(r.delimiter));
          };
        ((n.exports = o),
          (n.exports.default = o),
          (n.exports.env = (i) => {
            i = {
              env: process.env,
              ...i,
            };
            const t = {
                ...i.env,
              },
              e = l({
                env: t,
              });
            return ((i.path = t[e]), (t[e] = n.exports(i)), t);
          }));
      })(te)),
    te.exports
  );
}
var U = {
    exports: {},
  },
  ee = {
    exports: {},
  },
  We;
function jn() {
  if (We) return ee.exports;
  We = 1;
  const n = (r, l) => {
    for (const o of Reflect.ownKeys(l))
      Object.defineProperty(r, o, Object.getOwnPropertyDescriptor(l, o));
    return r;
  };
  return ((ee.exports = n), (ee.exports.default = n), ee.exports);
}
var Xe;
function kn() {
  if (Xe) return U.exports;
  Xe = 1;
  const n = jn(),
    r = new WeakMap(),
    l = (o, i = {}) => {
      if (typeof o != "function") throw new TypeError("Expected a function");
      let t,
        e = 0;
      const u = o.displayName || o.name || "<anonymous>",
        s = function (...a) {
          if ((r.set(s, ++e), e === 1)) ((t = o.apply(this, a)), (o = null));
          else if (i.throw === !0)
            throw new Error(`Function \`${u}\` can only be called once`);
          return t;
        };
      return (n(s, o), r.set(s, e), s);
    };
  return (
    (U.exports = l),
    (U.exports.default = l),
    (U.exports.callCount = (o) => {
      if (!r.has(o))
        throw new Error(
          `The given function \`${o.name}\` is not wrapped by the \`onetime\` package`,
        );
      return r.get(o);
    }),
    U.exports
  );
}
var A = {},
  D = {},
  H = {},
  Ve;
function Fn() {
  if (Ve) return H;
  ((Ve = 1),
    Object.defineProperty(H, "__esModule", {
      value: !0,
    }),
    (H.SIGNALS = void 0));
  const n = [
    {
      name: "SIGHUP",
      number: 1,
      action: "terminate",
      description: "Terminal closed",
      standard: "posix",
    },
    {
      name: "SIGINT",
      number: 2,
      action: "terminate",
      description: "User interruption with CTRL-C",
      standard: "ansi",
    },
    {
      name: "SIGQUIT",
      number: 3,
      action: "core",
      description: "User interruption with CTRL-\\",
      standard: "posix",
    },
    {
      name: "SIGILL",
      number: 4,
      action: "core",
      description: "Invalid machine instruction",
      standard: "ansi",
    },
    {
      name: "SIGTRAP",
      number: 5,
      action: "core",
      description: "Debugger breakpoint",
      standard: "posix",
    },
    {
      name: "SIGABRT",
      number: 6,
      action: "core",
      description: "Aborted",
      standard: "ansi",
    },
    {
      name: "SIGIOT",
      number: 6,
      action: "core",
      description: "Aborted",
      standard: "bsd",
    },
    {
      name: "SIGBUS",
      number: 7,
      action: "core",
      description:
        "Bus error due to misaligned, non-existing address or paging error",
      standard: "bsd",
    },
    {
      name: "SIGEMT",
      number: 7,
      action: "terminate",
      description: "Command should be emulated but is not implemented",
      standard: "other",
    },
    {
      name: "SIGFPE",
      number: 8,
      action: "core",
      description: "Floating point arithmetic error",
      standard: "ansi",
    },
    {
      name: "SIGKILL",
      number: 9,
      action: "terminate",
      description: "Forced termination",
      standard: "posix",
      forced: !0,
    },
    {
      name: "SIGUSR1",
      number: 10,
      action: "terminate",
      description: "Application-specific signal",
      standard: "posix",
    },
    {
      name: "SIGSEGV",
      number: 11,
      action: "core",
      description: "Segmentation fault",
      standard: "ansi",
    },
    {
      name: "SIGUSR2",
      number: 12,
      action: "terminate",
      description: "Application-specific signal",
      standard: "posix",
    },
    {
      name: "SIGPIPE",
      number: 13,
      action: "terminate",
      description: "Broken pipe or socket",
      standard: "posix",
    },
    {
      name: "SIGALRM",
      number: 14,
      action: "terminate",
      description: "Timeout or timer",
      standard: "posix",
    },
    {
      name: "SIGTERM",
      number: 15,
      action: "terminate",
      description: "Termination",
      standard: "ansi",
    },
    {
      name: "SIGSTKFLT",
      number: 16,
      action: "terminate",
      description: "Stack is empty or overflowed",
      standard: "other",
    },
    {
      name: "SIGCHLD",
      number: 17,
      action: "ignore",
      description: "Child process terminated, paused or unpaused",
      standard: "posix",
    },
    {
      name: "SIGCLD",
      number: 17,
      action: "ignore",
      description: "Child process terminated, paused or unpaused",
      standard: "other",
    },
    {
      name: "SIGCONT",
      number: 18,
      action: "unpause",
      description: "Unpaused",
      standard: "posix",
      forced: !0,
    },
    {
      name: "SIGSTOP",
      number: 19,
      action: "pause",
      description: "Paused",
      standard: "posix",
      forced: !0,
    },
    {
      name: "SIGTSTP",
      number: 20,
      action: "pause",
      description: 'Paused using CTRL-Z or "suspend"',
      standard: "posix",
    },
    {
      name: "SIGTTIN",
      number: 21,
      action: "pause",
      description: "Background process cannot read terminal input",
      standard: "posix",
    },
    {
      name: "SIGBREAK",
      number: 21,
      action: "terminate",
      description: "User interruption with CTRL-BREAK",
      standard: "other",
    },
    {
      name: "SIGTTOU",
      number: 22,
      action: "pause",
      description: "Background process cannot write to terminal output",
      standard: "posix",
    },
    {
      name: "SIGURG",
      number: 23,
      action: "ignore",
      description: "Socket received out-of-band data",
      standard: "bsd",
    },
    {
      name: "SIGXCPU",
      number: 24,
      action: "core",
      description: "Process timed out",
      standard: "bsd",
    },
    {
      name: "SIGXFSZ",
      number: 25,
      action: "core",
      description: "File too big",
      standard: "bsd",
    },
    {
      name: "SIGVTALRM",
      number: 26,
      action: "terminate",
      description: "Timeout or timer",
      standard: "bsd",
    },
    {
      name: "SIGPROF",
      number: 27,
      action: "terminate",
      description: "Timeout or timer",
      standard: "bsd",
    },
    {
      name: "SIGWINCH",
      number: 28,
      action: "ignore",
      description: "Terminal window size changed",
      standard: "bsd",
    },
    {
      name: "SIGIO",
      number: 29,
      action: "terminate",
      description: "I/O is available",
      standard: "other",
    },
    {
      name: "SIGPOLL",
      number: 29,
      action: "terminate",
      description: "Watched event",
      standard: "other",
    },
    {
      name: "SIGINFO",
      number: 29,
      action: "ignore",
      description: "Request for process information",
      standard: "other",
    },
    {
      name: "SIGPWR",
      number: 30,
      action: "terminate",
      description: "Device running out of power",
      standard: "systemv",
    },
    {
      name: "SIGSYS",
      number: 31,
      action: "core",
      description: "Invalid system call",
      standard: "other",
    },
    {
      name: "SIGUNUSED",
      number: 31,
      action: "terminate",
      description: "Invalid system call",
      standard: "other",
    },
  ];
  return ((H.SIGNALS = n), H);
}
var O = {},
  ze;
function pn() {
  if (ze) return O;
  ((ze = 1),
    Object.defineProperty(O, "__esModule", {
      value: !0,
    }),
    (O.SIGRTMAX = O.getRealtimeSignals = void 0));
  const n = function () {
    const i = o - l + 1;
    return Array.from(
      {
        length: i,
      },
      r,
    );
  };
  O.getRealtimeSignals = n;
  const r = function (i, t) {
      return {
        name: `SIGRT${t + 1}`,
        number: l + t,
        action: "terminate",
        description: "Application-specific signal (realtime)",
        standard: "posix",
      };
    },
    l = 34,
    o = 64;
  return ((O.SIGRTMAX = o), O);
}
var Ye;
function Un() {
  if (Ye) return D;
  ((Ye = 1),
    Object.defineProperty(D, "__esModule", {
      value: !0,
    }),
    (D.getSignals = void 0));
  var n = os,
    r = Fn(),
    l = pn();
  const o = function () {
    const t = (0, l.getRealtimeSignals)();
    return [...r.SIGNALS, ...t].map(i);
  };
  D.getSignals = o;
  const i = function ({
    name: t,
    number: e,
    description: u,
    action: s,
    forced: a = !1,
    standard: c,
  }) {
    const {
        signals: { [t]: f },
      } = n.constants,
      h = f !== void 0;
    return {
      name: t,
      number: h ? f : e,
      description: u,
      supported: h,
      action: s,
      forced: a,
      standard: c,
    };
  };
  return D;
}
var Ze;
function Dn() {
  if (Ze) return A;
  ((Ze = 1),
    Object.defineProperty(A, "__esModule", {
      value: !0,
    }),
    (A.signalsByNumber = A.signalsByName = void 0));
  var n = os,
    r = Un(),
    l = pn();
  const o = function () {
      return (0, r.getSignals)().reduce(i, {});
    },
    i = function (
      c,
      {
        name: f,
        number: h,
        description: d,
        supported: p,
        action: g,
        forced: m,
        standard: S,
      },
    ) {
      return {
        ...c,
        [f]: {
          name: f,
          number: h,
          description: d,
          supported: p,
          action: g,
          forced: m,
          standard: S,
        },
      };
    },
    t = o();
  A.signalsByName = t;
  const e = function () {
      const c = (0, r.getSignals)(),
        f = l.SIGRTMAX + 1,
        h = Array.from(
          {
            length: f,
          },
          (d, p) => u(p, c),
        );
      return Object.assign({}, ...h);
    },
    u = function (c, f) {
      const h = s(c, f);
      if (h === void 0) return {};
      const {
        name: d,
        description: p,
        supported: g,
        action: m,
        forced: S,
        standard: v,
      } = h;
      return {
        [c]: {
          name: d,
          number: c,
          description: p,
          supported: g,
          action: m,
          forced: S,
          standard: v,
        },
      };
    },
    s = function (c, f) {
      const h = f.find(({ name: d }) => n.constants.signals[d] === c);
      return h !== void 0 ? h : f.find((d) => d.number === c);
    },
    a = e();
  return ((A.signalsByNumber = a), A);
}
var pe, Qe;
function Hn() {
  if (Qe) return pe;
  Qe = 1;
  const { signalsByName: n } = Dn(),
    r = ({
      timedOut: o,
      timeout: i,
      errorCode: t,
      signal: e,
      signalDescription: u,
      exitCode: s,
      isCanceled: a,
    }) =>
      o
        ? `timed out after ${i} milliseconds`
        : a
          ? "was canceled"
          : t !== void 0
            ? `failed with ${t}`
            : e !== void 0
              ? `was killed with ${e} (${u})`
              : s !== void 0
                ? `failed with exit code ${s}`
                : "failed";
  return (
    (pe = ({
      stdout: o,
      stderr: i,
      all: t,
      error: e,
      signal: u,
      exitCode: s,
      command: a,
      escapedCommand: c,
      timedOut: f,
      isCanceled: h,
      killed: d,
      parsed: {
        options: { timeout: p },
      },
    }) => {
      ((s = s === null ? void 0 : s), (u = u === null ? void 0 : u));
      const g = u === void 0 ? void 0 : n[u].description,
        m = e && e.code,
        v = `Command ${r({
          timedOut: f,
          timeout: p,
          errorCode: m,
          signal: u,
          signalDescription: g,
          exitCode: s,
          isCanceled: h,
        })}: ${a}`,
        b = Object.prototype.toString.call(e) === "[object Error]",
        R = b
          ? `${v}
${e.message}`
          : v,
        P = [R, i, o].filter(Boolean).join(`
`);
      return (
        b
          ? ((e.originalMessage = e.message), (e.message = P))
          : (e = new Error(P)),
        (e.shortMessage = R),
        (e.command = a),
        (e.escapedCommand = c),
        (e.exitCode = s),
        (e.signal = u),
        (e.signalDescription = g),
        (e.stdout = o),
        (e.stderr = i),
        t !== void 0 && (e.all = t),
        "bufferedData" in e && delete e.bufferedData,
        (e.failed = !0),
        (e.timedOut = !!f),
        (e.isCanceled = h),
        (e.killed = d && !f),
        e
      );
    }),
    pe
  );
}
var ne = {
    exports: {},
  },
  Je;
function Kn() {
  if (Je) return ne.exports;
  Je = 1;
  const n = ["stdin", "stdout", "stderr"],
    r = (o) => n.some((i) => o[i] !== void 0),
    l = (o) => {
      if (!o) return;
      const { stdio: i } = o;
      if (i === void 0) return n.map((e) => o[e]);
      if (r(o))
        throw new Error(
          `It's not possible to provide \`stdio\` in combination with one of ${n.map((e) => `\`${e}\``).join(", ")}`,
        );
      if (typeof i == "string") return i;
      if (!Array.isArray(i))
        throw new TypeError(
          `Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof i}\``,
        );
      const t = Math.max(i.length, n.length);
      return Array.from(
        {
          length: t,
        },
        (e, u) => i[u],
      );
    };
  return (
    (ne.exports = l),
    (ne.exports.node = (o) => {
      const i = l(o);
      return i === "ipc"
        ? "ipc"
        : i === void 0 || typeof i == "string"
          ? [i, i, i, "ipc"]
          : i.includes("ipc")
            ? i
            : [...i, "ipc"];
    }),
    ne.exports
  );
}
var N = {
    exports: {},
  },
  he = {
    exports: {},
  },
  en;
function Wn() {
  return (
    en ||
      ((en = 1),
      (function (n) {
        ((n.exports = ["SIGABRT", "SIGALRM", "SIGHUP", "SIGINT", "SIGTERM"]),
          process.platform !== "win32" &&
            n.exports.push(
              "SIGVTALRM",
              "SIGXCPU",
              "SIGXFSZ",
              "SIGUSR2",
              "SIGTRAP",
              "SIGSYS",
              "SIGQUIT",
              "SIGIOT",
            ),
          process.platform === "linux" &&
            n.exports.push(
              "SIGIO",
              "SIGPOLL",
              "SIGPWR",
              "SIGSTKFLT",
              "SIGUNUSED",
            ));
      })(he)),
    he.exports
  );
}
var nn;
function Xn() {
  if (nn) return N.exports;
  nn = 1;
  var n = workerCGFIvBQ.commonjsGlobal.process;
  const r = function (m) {
    return (
      m &&
      typeof m == "object" &&
      typeof m.removeListener == "function" &&
      typeof m.emit == "function" &&
      typeof m.reallyExit == "function" &&
      typeof m.listeners == "function" &&
      typeof m.kill == "function" &&
      typeof m.pid == "number" &&
      typeof m.on == "function"
    );
  };
  if (!r(n))
    N.exports = function () {
      return function () {};
    };
  else {
    var l = assert,
      o = Wn(),
      i = /^win/i.test(n.platform),
      t = events;
    typeof t != "function" && (t = t.EventEmitter);
    var e;
    (n.__signal_exit_emitter__
      ? (e = n.__signal_exit_emitter__)
      : ((e = n.__signal_exit_emitter__ = new t()),
        (e.count = 0),
        (e.emitted = {})),
      e.infinite || (e.setMaxListeners(1 / 0), (e.infinite = !0)),
      (N.exports = function (m, S) {
        if (!r(workerCGFIvBQ.commonjsGlobal.process)) return function () {};
        (l.equal(
          typeof m,
          "function",
          "a callback must be provided for exit handler",
        ),
          c === !1 && f());
        var v = "exit";
        S && S.alwaysLast && (v = "afterexit");
        var b = function () {
          (e.removeListener(v, m),
            e.listeners("exit").length === 0 &&
              e.listeners("afterexit").length === 0 &&
              u());
        };
        return (e.on(v, m), b);
      }));
    var u = function () {
      !c ||
        !r(workerCGFIvBQ.commonjsGlobal.process) ||
        ((c = !1),
        o.forEach(function (S) {
          try {
            n.removeListener(S, a[S]);
          } catch {}
        }),
        (n.emit = p),
        (n.reallyExit = h),
        (e.count -= 1));
    };
    N.exports.unload = u;
    var s = function (S, v, b) {
        e.emitted[S] || ((e.emitted[S] = !0), e.emit(S, v, b));
      },
      a = {};
    (o.forEach(function (m) {
      a[m] = function () {
        if (r(workerCGFIvBQ.commonjsGlobal.process)) {
          var v = n.listeners(m);
          v.length === e.count &&
            (u(),
            s("exit", null, m),
            s("afterexit", null, m),
            i && m === "SIGHUP" && (m = "SIGINT"),
            n.kill(n.pid, m));
        }
      };
    }),
      (N.exports.signals = function () {
        return o;
      }));
    var c = !1,
      f = function () {
        c ||
          !r(workerCGFIvBQ.commonjsGlobal.process) ||
          ((c = !0),
          (e.count += 1),
          (o = o.filter(function (S) {
            try {
              return (n.on(S, a[S]), !0);
            } catch {
              return !1;
            }
          })),
          (n.emit = g),
          (n.reallyExit = d));
      };
    N.exports.load = f;
    var h = n.reallyExit,
      d = function (S) {
        r(workerCGFIvBQ.commonjsGlobal.process) &&
          ((n.exitCode = S || 0),
          s("exit", n.exitCode, null),
          s("afterexit", n.exitCode, null),
          h.call(n, n.exitCode));
      },
      p = n.emit,
      g = function (S, v) {
        if (S === "exit" && r(workerCGFIvBQ.commonjsGlobal.process)) {
          v !== void 0 && (n.exitCode = v);
          var b = p.apply(this, arguments);
          return (
            s("exit", n.exitCode, null),
            s("afterexit", n.exitCode, null),
            b
          );
        } else return p.apply(this, arguments);
      };
  }
  return N.exports;
}
var Se, tn;
function Vn() {
  if (tn) return Se;
  tn = 1;
  const n = os,
    r = Xn(),
    l = 1e3 * 5,
    o = (d, p = "SIGTERM", g = {}) => {
      const m = d(p);
      return (i(d, p, g, m), m);
    },
    i = (d, p, g, m) => {
      if (!t(p, g, m)) return;
      const S = u(g),
        v = setTimeout(() => {
          d("SIGKILL");
        }, S);
      v.unref && v.unref();
    },
    t = (d, { forceKillAfterTimeout: p }, g) => e(d) && p !== !1 && g,
    e = (d) =>
      d === n.constants.signals.SIGTERM ||
      (typeof d == "string" && d.toUpperCase() === "SIGTERM"),
    u = ({ forceKillAfterTimeout: d = !0 }) => {
      if (d === !0) return l;
      if (!Number.isFinite(d) || d < 0)
        throw new TypeError(
          `Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${d}\` (${typeof d})`,
        );
      return d;
    },
    s = (d, p) => {
      d.kill() && (p.isCanceled = !0);
    },
    a = (d, p, g) => {
      (d.kill(p),
        g(
          Object.assign(new Error("Timed out"), {
            timedOut: !0,
            signal: p,
          }),
        ));
    };
  return (
    (Se = {
      spawnedKill: o,
      spawnedCancel: s,
      setupTimeout: (d, { timeout: p, killSignal: g = "SIGTERM" }, m) => {
        if (p === 0 || p === void 0) return m;
        let S;
        const v = new Promise((R, P) => {
            S = setTimeout(() => {
              a(d, g, P);
            }, p);
          }),
          b = m.finally(() => {
            clearTimeout(S);
          });
        return Promise.race([v, b]);
      },
      validateTimeout: ({ timeout: d }) => {
        if (d !== void 0 && (!Number.isFinite(d) || d < 0))
          throw new TypeError(
            `Expected the \`timeout\` option to be a non-negative integer, got \`${d}\` (${typeof d})`,
          );
      },
      setExitHandler: async (d, { cleanup: p, detached: g }, m) => {
        if (!p || g) return m;
        const S = r(() => {
          d.kill();
        });
        return m.finally(() => {
          S();
        });
      },
    }),
    Se
  );
}
var ge, rn;
function zn() {
  if (rn) return ge;
  rn = 1;
  const n = (r) =>
    r !== null && typeof r == "object" && typeof r.pipe == "function";
  return (
    (n.writable = (r) =>
      n(r) &&
      r.writable !== !1 &&
      typeof r._write == "function" &&
      typeof r._writableState == "object"),
    (n.readable = (r) =>
      n(r) &&
      r.readable !== !1 &&
      typeof r._read == "function" &&
      typeof r._readableState == "object"),
    (n.duplex = (r) => n.writable(r) && n.readable(r)),
    (n.transform = (r) => n.duplex(r) && typeof r._transform == "function"),
    (ge = n),
    ge
  );
}
var B = {
    exports: {},
  },
  xe,
  on;
function Yn() {
  if (on) return xe;
  on = 1;
  const { PassThrough: n } = stream;
  return (
    (xe = (r) => {
      r = {
        ...r,
      };
      const { array: l } = r;
      let { encoding: o } = r;
      const i = o === "buffer";
      let t = !1;
      (l ? (t = !(o || i)) : (o = o || "utf8"), i && (o = null));
      const e = new n({
        objectMode: t,
      });
      o && e.setEncoding(o);
      let u = 0;
      const s = [];
      return (
        e.on("data", (a) => {
          (s.push(a), t ? (u = s.length) : (u += a.length));
        }),
        (e.getBufferedValue = () =>
          l ? s : i ? Buffer.concat(s, u) : s.join("")),
        (e.getBufferedLength = () => u),
        e
      );
    }),
    xe
  );
}
var sn;
function Zn() {
  if (sn) return B.exports;
  sn = 1;
  const { constants: n } = buffer,
    r = stream,
    { promisify: l } = util,
    o = Yn(),
    i = l(r.pipeline);
  class t extends Error {
    constructor() {
      (super("maxBuffer exceeded"), (this.name = "MaxBufferError"));
    }
  }
  async function e(u, s) {
    if (!u) throw new Error("Expected a stream");
    s = {
      maxBuffer: 1 / 0,
      ...s,
    };
    const { maxBuffer: a } = s,
      c = o(s);
    return (
      await new Promise((f, h) => {
        const d = (p) => {
          (p &&
            c.getBufferedLength() <= n.MAX_LENGTH &&
            (p.bufferedData = c.getBufferedValue()),
            h(p));
        };
        ((async () => {
          try {
            (await i(u, c), f());
          } catch (p) {
            d(p);
          }
        })(),
          c.on("data", () => {
            c.getBufferedLength() > a && d(new t());
          }));
      }),
      c.getBufferedValue()
    );
  }
  return (
    (B.exports = e),
    (B.exports.buffer = (u, s) =>
      e(u, {
        ...s,
        encoding: "buffer",
      })),
    (B.exports.array = (u, s) =>
      e(u, {
        ...s,
        array: !0,
      })),
    (B.exports.MaxBufferError = t),
    B.exports
  );
}
var ve, an;
function Qn() {
  if (an) return ve;
  an = 1;
  const { PassThrough: n } = stream;
  return (
    (ve = function () {
      var r = [],
        l = new n({
          objectMode: !0,
        });
      return (
        l.setMaxListeners(0),
        (l.add = o),
        (l.isEmpty = i),
        l.on("unpipe", t),
        Array.prototype.slice.call(arguments).forEach(o),
        l
      );
      function o(e) {
        return Array.isArray(e)
          ? (e.forEach(o), this)
          : (r.push(e),
            e.once("end", t.bind(null, e)),
            e.once("error", l.emit.bind(l, "error")),
            e.pipe(l, {
              end: !1,
            }),
            this);
      }
      function i() {
        return r.length == 0;
      }
      function t(e) {
        ((r = r.filter(function (u) {
          return u !== e;
        })),
          !r.length && l.readable && l.end());
      }
    }),
    ve
  );
}
var ye, cn;
function Jn() {
  if (cn) return ye;
  cn = 1;
  const n = zn(),
    r = Zn(),
    l = Qn(),
    o = (a, c) => {
      c === void 0 ||
        a.stdin === void 0 ||
        (n(c) ? c.pipe(a.stdin) : a.stdin.end(c));
    },
    i = (a, { all: c }) => {
      if (!c || (!a.stdout && !a.stderr)) return;
      const f = l();
      return (a.stdout && f.add(a.stdout), a.stderr && f.add(a.stderr), f);
    },
    t = async (a, c) => {
      if (a) {
        a.destroy();
        try {
          return await c;
        } catch (f) {
          return f.bufferedData;
        }
      }
    },
    e = (a, { encoding: c, buffer: f, maxBuffer: h }) => {
      if (!(!a || !f))
        return c
          ? r(a, {
              encoding: c,
              maxBuffer: h,
            })
          : r.buffer(a, {
              maxBuffer: h,
            });
    };
  return (
    (ye = {
      handleInput: o,
      makeAllStream: i,
      getSpawnedResult: async (
        { stdout: a, stderr: c, all: f },
        { encoding: h, buffer: d, maxBuffer: p },
        g,
      ) => {
        const m = e(a, {
            encoding: h,
            buffer: d,
            maxBuffer: p,
          }),
          S = e(c, {
            encoding: h,
            buffer: d,
            maxBuffer: p,
          }),
          v = e(f, {
            encoding: h,
            buffer: d,
            maxBuffer: p * 2,
          });
        try {
          return await Promise.all([g, m, S, v]);
        } catch (b) {
          return Promise.all([
            {
              error: b,
              signal: b.signal,
              timedOut: b.timedOut,
            },
            t(a, m),
            t(c, S),
            t(f, v),
          ]);
        }
      },
      validateInputSync: ({ input: a }) => {
        if (n(a))
          throw new TypeError(
            "The `input` option cannot be a stream in sync mode",
          );
      },
    }),
    ye
  );
}
var Ee, un;
function et() {
  if (un) return Ee;
  un = 1;
  const n = (async () => {})().constructor.prototype,
    r = ["then", "catch", "finally"].map((i) => [
      i,
      Reflect.getOwnPropertyDescriptor(n, i),
    ]);
  return (
    (Ee = {
      mergePromise: (i, t) => {
        for (const [e, u] of r) {
          const s =
            typeof t == "function"
              ? (...a) => Reflect.apply(u.value, t(), a)
              : u.value.bind(t);
          Reflect.defineProperty(i, e, {
            ...u,
            value: s,
          });
        }
        return i;
      },
      getSpawnedPromise: (i) =>
        new Promise((t, e) => {
          (i.on("exit", (u, s) => {
            t({
              exitCode: u,
              signal: s,
            });
          }),
            i.on("error", (u) => {
              e(u);
            }),
            i.stdin &&
              i.stdin.on("error", (u) => {
                e(u);
              }));
        }),
    }),
    Ee
  );
}
var be, ln;
function nt() {
  if (ln) return be;
  ln = 1;
  const n = (s, a = []) => (Array.isArray(a) ? [s, ...a] : [s]),
    r = /^[\w.-]+$/,
    l = /"/g,
    o = (s) =>
      typeof s != "string" || r.test(s) ? s : `"${s.replace(l, '\\"')}"`,
    i = (s, a) => n(s, a).join(" "),
    t = (s, a) =>
      n(s, a)
        .map((c) => o(c))
        .join(" "),
    e = / +/g;
  return (
    (be = {
      joinCommand: i,
      getEscapedCommand: t,
      parseCommand: (s) => {
        const a = [];
        for (const c of s.trim().split(e)) {
          const f = a[a.length - 1];
          f && f.endsWith("\\")
            ? (a[a.length - 1] = `${f.slice(0, -1)} ${c}`)
            : a.push(c);
        }
        return a;
      },
    }),
    be
  );
}
var dn;
function tt() {
  if (dn) return $.exports;
  dn = 1;
  const n = path,
    r = childProcess,
    l = Ln(),
    o = Mn(),
    i = Bn(),
    t = kn(),
    e = Hn(),
    u = Kn(),
    {
      spawnedKill: s,
      spawnedCancel: a,
      setupTimeout: c,
      validateTimeout: f,
      setExitHandler: h,
    } = Vn(),
    {
      handleInput: d,
      getSpawnedResult: p,
      makeAllStream: g,
      validateInputSync: m,
    } = Jn(),
    { mergePromise: S, getSpawnedPromise: v } = et(),
    { joinCommand: b, parseCommand: R, getEscapedCommand: P } = nt(),
    G = 1e3 * 1e3 * 100,
    k = ({
      env: I,
      extendEnv: E,
      preferLocal: w,
      localDir: x,
      execPath: C,
    }) => {
      const T = E
        ? {
            ...process.env,
            ...I,
          }
        : I;
      return w
        ? i.env({
            env: T,
            cwd: x,
            execPath: C,
          })
        : T;
    },
    W = (I, E, w = {}) => {
      const x = l._parse(I, E, w);
      return (
        (I = x.command),
        (E = x.args),
        (w = x.options),
        (w = {
          maxBuffer: G,
          buffer: !0,
          stripFinalNewline: !0,
          extendEnv: !0,
          preferLocal: !1,
          localDir: w.cwd || process.cwd(),
          execPath: process.execPath,
          encoding: "utf8",
          reject: !0,
          cleanup: !0,
          all: !1,
          windowsHide: !0,
          ...w,
        }),
        (w.env = k(w)),
        (w.stdio = u(w)),
        process.platform === "win32" &&
          n.basename(I, ".exe") === "cmd" &&
          E.unshift("/q"),
        {
          file: I,
          args: E,
          options: w,
          parsed: x,
        }
      );
    },
    F = (I, E, w) =>
      typeof E != "string" && !Buffer.isBuffer(E)
        ? w === void 0
          ? void 0
          : ""
        : I.stripFinalNewline
          ? o(E)
          : E,
    X = (I, E, w) => {
      const x = W(I, E, w),
        C = b(I, E),
        T = P(I, E);
      f(x.options);
      let y;
      try {
        y = r.spawn(x.file, x.args, x.options);
      } catch (z) {
        const Y = new r.ChildProcess(),
          Z = Promise.reject(
            e({
              error: z,
              stdout: "",
              stderr: "",
              all: "",
              command: C,
              escapedCommand: T,
              parsed: x,
              timedOut: !1,
              isCanceled: !1,
              killed: !1,
            }),
          );
        return S(Y, Z);
      }
      const L = v(y),
        V = c(y, x.options, L),
        M = h(y, x.options, V),
        Pe = {
          isCanceled: !1,
        };
      ((y.kill = s.bind(null, y.kill.bind(y))),
        (y.cancel = a.bind(null, y, Pe)));
      const hn = t(async () => {
        const [{ error: z, exitCode: Y, signal: Z, timedOut: Sn }, gn, xn, vn] =
            await p(y, x.options, M),
          Te = F(x.options, gn),
          Ce = F(x.options, xn),
          qe = F(x.options, vn);
        if (z || Y !== 0 || Z !== null) {
          const Ge = e({
            error: z,
            exitCode: Y,
            signal: Z,
            stdout: Te,
            stderr: Ce,
            all: qe,
            command: C,
            escapedCommand: T,
            parsed: x,
            timedOut: Sn,
            isCanceled: Pe.isCanceled,
            killed: y.killed,
          });
          if (!x.options.reject) return Ge;
          throw Ge;
        }
        return {
          command: C,
          escapedCommand: T,
          exitCode: 0,
          stdout: Te,
          stderr: Ce,
          all: qe,
          failed: !1,
          timedOut: !1,
          isCanceled: !1,
          killed: !1,
        };
      });
      return (d(y, x.options.input), (y.all = g(y, x.options)), S(y, hn));
    };
  return (
    ($.exports = X),
    ($.exports.sync = (I, E, w) => {
      const x = W(I, E, w),
        C = b(I, E),
        T = P(I, E);
      m(x.options);
      let y;
      try {
        y = r.spawnSync(x.file, x.args, x.options);
      } catch (M) {
        throw e({
          error: M,
          stdout: "",
          stderr: "",
          all: "",
          command: C,
          escapedCommand: T,
          parsed: x,
          timedOut: !1,
          isCanceled: !1,
          killed: !1,
        });
      }
      const L = F(x.options, y.stdout, y.error),
        V = F(x.options, y.stderr, y.error);
      if (y.error || y.status !== 0 || y.signal !== null) {
        const M = e({
          stdout: L,
          stderr: V,
          error: y.error,
          signal: y.signal,
          exitCode: y.status,
          command: C,
          escapedCommand: T,
          parsed: x,
          timedOut: y.error && y.error.code === "ETIMEDOUT",
          isCanceled: !1,
          killed: y.signal !== null,
        });
        if (!x.options.reject) return M;
        throw M;
      }
      return {
        command: C,
        escapedCommand: T,
        exitCode: 0,
        stdout: L,
        stderr: V,
        failed: !1,
        timedOut: !1,
        isCanceled: !1,
        killed: !1,
      };
    }),
    ($.exports.command = (I, E) => {
      const [w, ...x] = R(I);
      return X(w, x, E);
    }),
    ($.exports.commandSync = (I, E) => {
      const [w, ...x] = R(I);
      return X.sync(w, x, E);
    }),
    ($.exports.node = (I, E, w = {}) => {
      E && !Array.isArray(E) && typeof E == "object" && ((w = E), (E = []));
      const x = u.node(w),
        C = process.execArgv.filter((L) => !L.startsWith("--inspect")),
        { nodePath: T = process.execPath, nodeOptions: y = C } = w;
      return X(T, [...y, I, ...(Array.isArray(E) ? E : [])], {
        ...w,
        stdin: void 0,
        stdout: void 0,
        stderr: void 0,
        stdio: x,
        shell: !1,
      });
    }),
    $.exports
  );
}
var rt = tt();
const ot = workerCGFIvBQ.getDefaultExportFromCjs(rt);
function it({ onlyFirst: n = !1 } = {}) {
  const i =
    "(?:\\u001B\\][\\s\\S]*?(?:\\u0007|\\u001B\\u005C|\\u009C))|[\\u001B\\u009B][[\\]()#;?]*(?:\\d{1,4}(?:[;:]\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]";
  return new RegExp(i, n ? void 0 : "g");
}
const st = it();
function at(n) {
  if (typeof n != "string")
    throw new TypeError(`Expected a \`string\`, got \`${typeof n}\``);
  return n.replace(st, "");
}
const ct = () => {
    const { env: n } = process;
    if (process.platform === "win32") return n.COMSPEC || "cmd.exe";
    try {
      const { shell: r } = os2.userInfo();
      if (r) return r;
    } catch {}
    return process.platform === "darwin"
      ? n.SHELL || "/bin/zsh"
      : n.SHELL || "/bin/sh";
  },
  ut = ct(),
  lt = [
    "-ilc",
    'echo -n "_SHELL_ENV_DELIMITER_"; env; echo -n "_SHELL_ENV_DELIMITER_"; exit',
  ],
  dt = {
    DISABLE_AUTO_UPDATE: "true",
  },
  ft = (n) => {
    n = n.split("_SHELL_ENV_DELIMITER_")[1];
    const r = {};
    for (const l of at(n)
      .split(
        `
`,
      )
      .filter((o) => !!o)) {
      const [o, ...i] = l.split("=");
      r[o] = i.join("=");
    }
    return r;
  };
async function mt(n) {
  if (process.platform === "win32") return process.env;
  try {
    const { stdout: r } = await ot(n || ut, lt, {
      env: dt,
    });
    return ft(r);
  } catch (r) {
    if (n) throw r;
    return process.env;
  }
}
exports.shellEnv = mt;
//# sourceMappingURL=index-DvdoEcOI.js.map
