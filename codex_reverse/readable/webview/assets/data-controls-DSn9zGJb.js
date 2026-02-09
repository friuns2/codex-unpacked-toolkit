import {
  c as $,
  w as B,
  x as W,
  j as a,
  S as G,
  d as K,
  n as O,
  y as Y,
  u as H,
  Q as J,
  p as X,
  z as U,
  e as V,
  f as I,
  M as f,
  A as Z,
  r as ee,
  q as te,
  v as ae,
  E as se,
  F as z,
  B as ie,
} from "./index-BnRAGF7J.js";
function oe() {
  const i = $.c(10),
    e = B();
  let t;
  i[0] === Symbol.for("react.memo_cache_sentinel")
    ? ((t = ["archived-threads"]), (i[0] = t))
    : (t = i[0]);
  let u;
  i[1] !== e
    ? ((u = {
        queryKey: t,
        queryFn: () => e.listArchivedThreads(),
        staleTime: J.FIVE_SECONDS,
      }),
      (i[1] = e),
      (i[2] = u))
    : (u = i[2]);
  const { data: v, isLoading: d, isError: r } = W(u);
  let c;
  i[3] !== v
    ? ((c = v === void 0 ? [] : v), (i[3] = v), (i[4] = c))
    : (c = i[4]);
  const o = c;
  let l;
  i[5] === Symbol.for("react.memo_cache_sentinel")
    ? ((l = a.jsx(X, { slug: "data-controls" })), (i[5] = l))
    : (l = i[5]);
  let n;
  return (
    i[6] !== o || i[7] !== r || i[8] !== d
      ? ((n = a.jsx(G, {
          title: l,
          children: a.jsx(K, {
            className: "gap-2",
            children: a.jsx(K.Content, {
              children: a.jsx(re, {
                archivedThreads: o,
                isLoading: d,
                isError: r,
              }),
            }),
          }),
        })),
        (i[6] = o),
        (i[7] = r),
        (i[8] = d),
        (i[9] = n))
      : (n = i[9]),
    n
  );
}
function re(i) {
  const e = $.c(14),
    { archivedThreads: t, isLoading: u, isError: v } = i,
    d = O(),
    r = Y(),
    c = H();
  let o;
  e[0] !== d || e[1] !== r || e[2] !== c
    ? ((o = (s) => {
        if (c === "electron") {
          d(`/local/${U(s)}`);
          return;
        }
        r(s);
      }),
      (e[0] = d),
      (e[1] = r),
      (e[2] = c),
      (e[3] = o))
    : (o = e[3]);
  const l = o;
  if (u) {
    let s;
    return (
      e[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((s = a.jsx("div", {
            className: "px-1.5 py-1",
            children: a.jsx(V, {
              children: a.jsx(I, {
                label: a.jsx(f, {
                  id: "settings.dataControls.archivedChats.loading",
                  defaultMessage: "Loading archived chats…",
                  description: "Loading state label for archived chats list",
                }),
                control: null,
              }),
            }),
          })),
          (e[4] = s))
        : (s = e[4]),
      s
    );
  }
  if (v) {
    let s;
    return (
      e[5] === Symbol.for("react.memo_cache_sentinel")
        ? ((s = a.jsx("div", {
            className: "px-1.5 py-1",
            children: a.jsx(V, {
              children: a.jsx(I, {
                label: a.jsx(f, {
                  id: "settings.dataControls.archivedChats.error",
                  defaultMessage: "Could not load archived chats.",
                  description: "Error state label for archived chats list",
                }),
                control: null,
              }),
            }),
          })),
          (e[5] = s))
        : (s = e[5]),
      s
    );
  }
  if (t.length === 0) {
    let s;
    return (
      e[6] === Symbol.for("react.memo_cache_sentinel")
        ? ((s = a.jsx("div", {
            className: "px-1.5 py-1",
            children: a.jsx(V, {
              children: a.jsx(I, {
                label: a.jsx(f, {
                  id: "settings.dataControls.archivedChats.empty",
                  defaultMessage: "No archived chats.",
                  description: "Empty state label for archived chats list",
                }),
                control: null,
              }),
            }),
          })),
          (e[6] = s))
        : (s = e[6]),
      s
    );
  }
  let n;
  if (e[7] !== t || e[8] !== l) {
    let s;
    (e[10] !== l
      ? ((s = (m) => {
          const p = U(m.id);
          return a.jsx(
            ne,
            { archivedThread: m, conversationId: p, onViewConversation: l },
            m.id,
          );
        }),
        (e[10] = l),
        (e[11] = s))
      : (s = e[11]),
      (n = t.map(s)),
      (e[7] = t),
      (e[8] = l),
      (e[9] = n));
  } else n = e[9];
  let h;
  return (
    e[12] !== n
      ? ((h = a.jsx("div", {
          className: "px-1.5 py-1",
          children: a.jsx(V, {
            className: "max-h-[min(80vh)] overflow-y-auto",
            children: n,
          }),
        })),
        (e[12] = n),
        (e[13] = h))
      : (h = e[13]),
    h
  );
}
function ne(i) {
  const e = $.c(62),
    { archivedThread: t, conversationId: u, onViewConversation: v } = i,
    d = B(),
    r = Z(),
    c = ee(),
    o = te();
  let l;
  e[0] !== t.id
    ? ((l = ["unarchive-thread", t.id]), (e[0] = t.id), (e[1] = l))
    : (l = e[1]);
  let n;
  e[2] !== d || e[3] !== u
    ? ((n = async () => d.unarchiveConversation(u)),
      (e[2] = d),
      (e[3] = u),
      (e[4] = n))
    : (n = e[4]);
  let h;
  e[5] !== t.id || e[6] !== r
    ? ((h = async () => {
        await r.cancelQueries({ queryKey: ["archived-threads"] });
        const _ = r.getQueryData(["archived-threads"]) ?? [];
        return (
          r.setQueryData(
            ["archived-threads"],
            _.filter((E) => E.id !== t.id),
          ),
          { previousThreads: _ }
        );
      }),
      (e[5] = t.id),
      (e[6] = r),
      (e[7] = h))
    : (h = e[7]);
  let s;
  e[8] !== o || e[9] !== r || e[10] !== c
    ? ((s = (_, E, A) => {
        (A?.previousThreads &&
          r.setQueryData(["archived-threads"], A.previousThreads),
          c.danger(
            o.formatMessage({
              id: "settings.dataControls.archivedChats.unarchiveError",
              defaultMessage: "Failed to unarchive chat",
              description: "Error message when unarchiving a chat",
            }),
          ));
      }),
      (e[8] = o),
      (e[9] = r),
      (e[10] = c),
      (e[11] = s))
    : (s = e[11]);
  let m;
  e[12] !== t.id || e[13] !== v || e[14] !== c
    ? ((m = () => {
        c.info(
          a.jsxs("span", {
            children: [
              a.jsx(f, {
                id: "settings.dataControls.archivedChats.unarchiveSuccessPlain",
                defaultMessage: "Unarchived thread.",
                description: "Success toast after unarchiving a chat",
              }),
              a.jsx("button", {
                className:
                  "ml-1 text-token-link cursor-interaction pointer-events-auto hover:underline underline-offset-2",
                type: "button",
                onClick: () => {
                  v(t.id);
                },
                children: a.jsx(f, {
                  id: "settings.dataControls.archivedChats.viewNow",
                  defaultMessage: "View now",
                  description:
                    "Action label to open an unarchived chat from the success toast",
                }),
              }),
            ],
          }),
          { id: `unarchive-thread-${t.id}` },
        );
      }),
      (e[12] = t.id),
      (e[13] = v),
      (e[14] = c),
      (e[15] = m))
    : (m = e[15]);
  let p;
  e[16] !== r
    ? ((p = () => {
        r.invalidateQueries({ queryKey: ["archived-threads"] });
      }),
      (e[16] = r),
      (e[17] = p))
    : (p = e[17]);
  let D;
  e[18] !== l ||
  e[19] !== n ||
  e[20] !== h ||
  e[21] !== s ||
  e[22] !== m ||
  e[23] !== p
    ? ((D = {
        mutationKey: l,
        mutationFn: n,
        onMutate: h,
        onError: s,
        onSuccess: m,
        onSettled: p,
      }),
      (e[18] = l),
      (e[19] = n),
      (e[20] = h),
      (e[21] = s),
      (e[22] = m),
      (e[23] = p),
      (e[24] = D))
    : (D = e[24]);
  const g = ae(D);
  let k;
  e[25] !== t.preview
    ? ((k = se(t.preview).trim()), (e[25] = t.preview), (e[26] = k))
    : (k = e[26]);
  const F = k;
  let y, x, j, Q;
  if (
    e[27] !== t.createdAt ||
    e[28] !== t.cwd ||
    e[29] !== t.path ||
    e[30] !== t.updatedAt ||
    e[31] !== o
  ) {
    const _ = new Date(Number(t.updatedAt) * 1e3),
      E = new Date(Number(t.createdAt) * 1e3),
      A = Number.isFinite(_.getTime())
        ? _
        : Number.isFinite(E.getTime())
          ? E
          : null;
    let R;
    (e[36] !== t.cwd || e[37] !== t.path
      ? ((R = z(t.cwd) ?? z(t.path)),
        (e[36] = t.cwd),
        (e[37] = t.path),
        (e[38] = R))
      : (R = e[38]),
      (j = R),
      (x = A != null),
      (y = x
        ? o.formatDate(A, { year: "numeric", month: "short", day: "numeric" })
        : ""),
      (Q = x ? o.formatTime(A, { hour: "numeric", minute: "2-digit" }) : ""),
      (e[27] = t.createdAt),
      (e[28] = t.cwd),
      (e[29] = t.path),
      (e[30] = t.updatedAt),
      (e[31] = o),
      (e[32] = y),
      (e[33] = x),
      (e[34] = j),
      (e[35] = Q));
  } else ((y = e[32]), (x = e[33]), (j = e[34]), (Q = e[35]));
  const L = Q;
  let C;
  e[39] !== F
    ? ((C =
        F.length > 0
          ? F
          : a.jsx(f, {
              id: "settings.dataControls.archivedChats.untitled",
              defaultMessage: "Untitled chat",
              description: "Fallback title for an archived chat",
            })),
      (e[39] = F),
      (e[40] = C))
    : (C = e[40]);
  let b;
  e[41] !== C
    ? ((b = a.jsx("div", {
        className: "truncate text-base font-medium",
        children: C,
      })),
      (e[41] = C),
      (e[42] = b))
    : (b = e[42]);
  let w;
  e[43] !== y || e[44] !== x || e[45] !== j || e[46] !== L
    ? ((w = x
        ? j
          ? a.jsx(f, {
              id: "settings.dataControls.archivedChats.dateTimeWithRepo",
              defaultMessage: "{date}, {time} • {repo}",
              description: "Date, time, and repo name for an archived chat",
              values: { date: y, time: L, repo: j },
            })
          : a.jsx(f, {
              id: "settings.dataControls.archivedChats.dateTime",
              defaultMessage: "{date}, {time}",
              description: "Date and time for an archived chat",
              values: { date: y, time: L },
            })
        : null),
      (e[43] = y),
      (e[44] = x),
      (e[45] = j),
      (e[46] = L),
      (e[47] = w))
    : (w = e[47]);
  let S;
  e[48] !== w
    ? ((S = a.jsx("div", {
        className: "mt-1 flex min-w-0 flex-col gap-0.5 text-sm",
        children: a.jsx("div", {
          className: "text-token-text-secondary truncate",
          children: w,
        }),
      })),
      (e[48] = w),
      (e[49] = S))
    : (S = e[49]);
  let N;
  e[50] !== b || e[51] !== S
    ? ((N = a.jsxs("div", {
        className: "text-token-text-primary min-w-0 flex-1 text-left",
        children: [b, S],
      })),
      (e[50] = b),
      (e[51] = S),
      (e[52] = N))
    : (N = e[52]);
  let T;
  e[53] !== g
    ? ((T = () => {
        g.isPending || g.mutate();
      }),
      (e[53] = g),
      (e[54] = T))
    : (T = e[54]);
  let P;
  e[55] === Symbol.for("react.memo_cache_sentinel")
    ? ((P = a.jsx(f, {
        id: "settings.dataControls.archivedChats.unarchive",
        defaultMessage: "Unarchive",
        description: "Button label to unarchive a chat",
      })),
      (e[55] = P))
    : (P = e[55]);
  let M;
  e[56] !== T || e[57] !== g.isPending
    ? ((M = a.jsx(ie, {
        className: "shrink-0",
        color: "secondary",
        size: "toolbar",
        disabled: g.isPending,
        loading: g.isPending,
        onClick: T,
        children: P,
      })),
      (e[56] = T),
      (e[57] = g.isPending),
      (e[58] = M))
    : (M = e[58]);
  let q;
  return (
    e[59] !== N || e[60] !== M
      ? ((q = a.jsxs("div", {
          className:
            "hover:bg-token-list-hover-background flex w-full items-center justify-between gap-3 px-4 py-3",
          children: [N, M],
        })),
        (e[59] = N),
        (e[60] = M),
        (e[61] = q))
      : (q = e[61]),
    q
  );
}
export { oe as DataControlsSettings };
//# sourceMappingURL=data-controls-DSn9zGJb.js.map
