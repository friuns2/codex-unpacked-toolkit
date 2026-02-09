import {
  c as E,
  q as F,
  R as $,
  U as G,
  j as s,
  d as m,
  M as d,
  e as L,
  S as R,
  O as z,
  B as H,
  V as P,
  X as U,
  Y as B,
  p as W,
  y as I,
  w as q,
  r as A,
  s as O,
  Z as V,
  $ as X,
  a0 as Y,
} from "./index-BnRAGF7J.js";
function te() {
  const e = E.c(32),
    t = F(),
    { data: a, isLoading: o, error: r, refetch: n } = $(),
    { data: x, isLoading: S } = G();
  let h, f;
  if (
    e[0] !== x ||
    e[1] !== t ||
    e[2] !== S ||
    e[3] !== o ||
    e[4] !== n ||
    e[5] !== a?.worktrees ||
    e[6] !== r
  ) {
    f = Symbol.for("react.early_return_sentinel");
    e: {
      const j = a?.worktrees ?? [];
      let u;
      e[9] !== x ? ((u = x ?? []), (e[9] = x), (e[10] = u)) : (u = e[10]);
      const g = u,
        y = K(j);
      let k;
      e[11] === Symbol.for("react.memo_cache_sentinel")
        ? ((k = s.jsx(m.Header, {
            title: s.jsx(d, {
              id: "settings.worktrees.empty.title",
              defaultMessage: "No worktrees yet",
              description: "Empty state title for worktrees settings",
            }),
          })),
          (e[11] = k))
        : (k = e[11]);
      let w;
      e[12] === Symbol.for("react.memo_cache_sentinel")
        ? ((w = s.jsxs(m, {
            children: [
              k,
              s.jsx(m.Content, {
                children: s.jsx(L, {
                  children: s.jsx("div", {
                    className: "p-3 text-sm text-token-text-secondary",
                    children: s.jsx(d, {
                      id: "settings.worktrees.empty.body",
                      defaultMessage:
                        "Worktrees created by Codex will appear here.",
                      description: "Empty state body for worktrees settings",
                    }),
                  }),
                }),
              }),
            ],
          })),
          (e[12] = w))
        : (w = e[12]);
      const v = w;
      if (o) {
        let i;
        e[13] === Symbol.for("react.memo_cache_sentinel")
          ? ((i = s.jsx(W, { slug: "worktrees" })), (e[13] = i))
          : (i = e[13]);
        let c;
        e[14] === Symbol.for("react.memo_cache_sentinel")
          ? ((c = s.jsx(m.Header, {
              title: s.jsx(d, {
                id: "settings.worktrees.loading.title",
                defaultMessage: "Loading worktrees",
                description: "Loading state title for worktrees settings",
              }),
            })),
            (e[14] = c))
          : (c = e[14]);
        let l;
        (e[15] === Symbol.for("react.memo_cache_sentinel")
          ? ((l = s.jsx(R, {
              title: i,
              children: s.jsxs(m, {
                children: [
                  c,
                  s.jsx(m.Content, {
                    children: s.jsx(L, {
                      children: s.jsxs("div", {
                        className:
                          "flex items-center gap-2 p-3 text-sm text-token-text-secondary",
                        children: [
                          s.jsx(z, { className: "icon-xxs" }),
                          s.jsx(d, {
                            id: "settings.worktrees.loading.body",
                            defaultMessage: "Fetching worktree details.",
                            description:
                              "Loading state body for worktrees settings",
                          }),
                        ],
                      }),
                    }),
                  }),
                ],
              }),
            })),
            (e[15] = l))
          : (l = e[15]),
          (f = l));
        break e;
      }
      if (r) {
        let i;
        e[16] === Symbol.for("react.memo_cache_sentinel")
          ? ((i = s.jsx(W, { slug: "worktrees" })), (e[16] = i))
          : (i = e[16]);
        let c;
        e[17] === Symbol.for("react.memo_cache_sentinel")
          ? ((c = s.jsx(d, {
              id: "settings.worktrees.error.title",
              defaultMessage: "Unable to load worktrees",
              description: "Error state title for worktrees settings",
            })),
            (e[17] = c))
          : (c = e[17]);
        let l;
        e[18] !== n
          ? ((l = () => {
              n();
            }),
            (e[18] = n),
            (e[19] = l))
          : (l = e[19]);
        let b;
        e[20] === Symbol.for("react.memo_cache_sentinel")
          ? ((b = s.jsx(d, {
              id: "settings.worktrees.error.retry",
              defaultMessage: "Retry",
              description: "Retry button for worktrees settings",
            })),
            (e[20] = b))
          : (b = e[20]);
        let C;
        e[21] !== l
          ? ((C = s.jsx(m.Header, {
              title: c,
              actions: s.jsx(H, {
                className: "shrink-0",
                color: "secondary",
                onClick: l,
                size: "toolbar",
                children: b,
              }),
            })),
            (e[21] = l),
            (e[22] = C))
          : (C = e[22]);
        let M;
        e[23] !== t || e[24] !== r.message
          ? ((M =
              r.message ||
              t.formatMessage({
                id: "settings.worktrees.error.body",
                defaultMessage: "Something went wrong while loading worktrees.",
                description: "Error body for worktrees settings",
              })),
            (e[23] = t),
            (e[24] = r.message),
            (e[25] = M))
          : (M = e[25]);
        let N;
        e[26] !== M
          ? ((N = s.jsx(m.Content, {
              children: s.jsx(L, {
                children: s.jsx("div", {
                  className: "p-3 text-sm text-token-text-secondary",
                  children: M,
                }),
              }),
            })),
            (e[26] = M),
            (e[27] = N))
          : (N = e[27]);
        let _;
        (e[28] !== N || e[29] !== C
          ? ((_ = s.jsx(R, {
              title: i,
              children: s.jsxs(m, { children: [C, N] }),
            })),
            (e[28] = N),
            (e[29] = C),
            (e[30] = _))
          : (_ = e[30]),
          (f = _));
        break e;
      }
      let p;
      (e[31] === Symbol.for("react.memo_cache_sentinel")
        ? ((p = s.jsx(W, { slug: "worktrees" })), (e[31] = p))
        : (p = e[31]),
        (h = s.jsx(R, {
          title: p,
          children:
            y.length === 0
              ? v
              : y.map((i) =>
                  s.jsx(
                    Z,
                    {
                      conversations: g,
                      isConversationsLoading: S,
                      onWorktreeDeleted: () => {
                        n();
                      },
                      repoRoot: i.repoRoot,
                      worktrees: i.worktrees,
                    },
                    i.key,
                  ),
                ),
        })));
    }
    ((e[0] = x),
      (e[1] = t),
      (e[2] = S),
      (e[3] = o),
      (e[4] = n),
      (e[5] = a?.worktrees),
      (e[6] = r),
      (e[7] = h),
      (e[8] = f));
  } else ((h = e[7]), (f = e[8]));
  return f !== Symbol.for("react.early_return_sentinel") ? f : h;
}
function Z(e) {
  const t = E.c(23),
    {
      repoRoot: a,
      worktrees: o,
      conversations: r,
      isConversationsLoading: n,
      onWorktreeDeleted: x,
    } = e,
    S = a,
    { data: h, isLoading: f } = U(S),
    j = h?.root ?? a ?? o[0]?.dir ?? null;
  let u;
  t[0] !== j
    ? ((u = j
        ? s.jsx("span", {
            className: "truncate font-mono text-sm",
            children: j,
          })
        : s.jsx(d, {
            id: "settings.worktrees.repository.unknown",
            defaultMessage: "Unknown repository",
            description:
              "Fallback label when worktree repository cannot be resolved",
          })),
      (t[0] = j),
      (t[1] = u))
    : (u = t[1]);
  const g = u,
    y = f && j == null;
  let k;
  t[2] !== g
    ? ((k = s.jsx("div", {
        className: "text-token-text-primary min-w-0 truncate text-sm",
        children: g,
      })),
      (t[2] = g),
      (t[3] = k))
    : (k = t[3]);
  let w;
  t[4] !== y
    ? ((w = y
        ? s.jsx("div", {
            className: "text-token-text-secondary text-xs",
            children: s.jsx(d, {
              id: "settings.worktrees.repository.loading",
              defaultMessage: "Loading repository metadata…",
              description: "Subtitle while repository metadata is loading",
            }),
          })
        : null),
      (t[4] = y),
      (t[5] = w))
    : (w = t[5]);
  let v;
  t[6] !== k || t[7] !== w
    ? ((v = s.jsx(m.Header, {
        title: s.jsxs("div", {
          className: "flex min-w-0 flex-col",
          children: [k, w],
        }),
      })),
      (t[6] = k),
      (t[7] = w),
      (t[8] = v))
    : (v = t[8]);
  let p;
  if (t[9] !== r || t[10] !== n || t[11] !== x || t[12] !== o) {
    let l;
    (t[14] !== r || t[15] !== n || t[16] !== x
      ? ((l = (b) =>
          s.jsx(
            J,
            {
              conversations: T(b.dir, r),
              isConversationsLoading: n,
              onWorktreeDeleted: x,
              worktree: b,
            },
            b.dir,
          )),
        (t[14] = r),
        (t[15] = n),
        (t[16] = x),
        (t[17] = l))
      : (l = t[17]),
      (p = Q(o, r).map(l)),
      (t[9] = r),
      (t[10] = n),
      (t[11] = x),
      (t[12] = o),
      (t[13] = p));
  } else p = t[13];
  let i;
  t[18] !== p
    ? ((i = s.jsx(m.Content, { children: s.jsx(L, { children: p }) })),
      (t[18] = p),
      (t[19] = i))
    : (i = t[19]);
  let c;
  return (
    t[20] !== v || t[21] !== i
      ? ((c = s.jsxs(m, { children: [v, i] })),
        (t[20] = v),
        (t[21] = i),
        (t[22] = c))
      : (c = t[22]),
    c
  );
}
function J({
  worktree: e,
  conversations: t,
  isConversationsLoading: a,
  onWorktreeDeleted: o,
}) {
  const r = I(),
    n = q(),
    x = A(),
    S = F(),
    [h, f] = O.useState(!1),
    j = V(),
    u = async () => {
      if (!h) {
        f(!0);
        try {
          (t.length > 0 &&
            (await Promise.all(t.map((g) => n.archiveConversation(g.id)))),
            await Y("git").request({
              method: "delete-worktree",
              params: {
                worktree: e.dir,
                force: !0,
                reason: "settings-delete-targeted",
                hostConfig: j,
              },
            }),
            o());
        } catch {
          x.danger(
            S.formatMessage({
              id: "settings.worktrees.delete.error",
              defaultMessage: "Failed to delete worktree",
              description:
                "Error message when deleting a worktree from settings",
            }),
          );
        } finally {
          f(!1);
        }
      }
    };
  return s.jsxs("div", {
    className: "flex flex-col gap-2 p-3",
    children: [
      s.jsxs("div", {
        className: "flex items-start justify-between gap-3",
        children: [
          s.jsxs("div", {
            className: "min-w-0",
            children: [
              s.jsx("div", {
                className: "text-token-text-primary text-sm font-medium",
                children: s.jsx(d, {
                  id: "settings.worktrees.row.title",
                  defaultMessage: "Worktree",
                  description: "Label for a worktree row",
                }),
              }),
              s.jsx("div", {
                className:
                  "text-token-text-secondary mt-1 truncate font-mono text-xs",
                children: e.dir,
              }),
            ],
          }),
          s.jsx(H, {
            className: "shrink-0",
            color: "danger",
            loading: h,
            onClick: () => {
              u();
            },
            size: "toolbar",
            children: s.jsx(d, {
              id: "settings.worktrees.row.delete",
              defaultMessage: "Delete",
              description: "Delete button label for a worktree row",
            }),
          }),
        ],
      }),
      s.jsxs("div", {
        className: "flex flex-col gap-1",
        children: [
          s.jsx("div", {
            className: "text-token-text-secondary text-xs",
            children: s.jsx(d, {
              id: "settings.worktrees.row.conversations",
              defaultMessage: "Conversations",
              description: "Label for conversations list within a worktree row",
            }),
          }),
          a
            ? s.jsxs("div", {
                className:
                  "flex items-center gap-2 text-xs text-token-text-secondary",
                children: [
                  s.jsx(z, { className: "icon-xxs" }),
                  s.jsx(d, {
                    id: "settings.worktrees.row.conversations.loading",
                    defaultMessage: "Loading conversations…",
                    description: "Loading label for conversations list",
                  }),
                ],
              })
            : t.length === 0
              ? s.jsx("div", {
                  className: "text-token-text-secondary text-xs",
                  children: s.jsx(d, {
                    id: "settings.worktrees.row.conversations.empty",
                    defaultMessage: "No conversations linked to this worktree.",
                    description:
                      "Empty state for conversations list in worktree row",
                  }),
                })
              : s.jsx("div", {
                  className: "flex flex-col gap-1",
                  children: t.map((g) => {
                    const y = X(g);
                    return s.jsx(
                      "button",
                      {
                        className:
                          "text-token-text-primary hover:text-token-text-primary/80 focus-visible:outline-token-focus flex w-full items-center justify-between gap-2 rounded-lg px-row-x py-row-y text-left text-sm hover:bg-token-list-hover-background focus-visible:outline-1 focus-visible:outline-offset-[-2px]",
                        onClick: () => {
                          r(g.id);
                        },
                        type: "button",
                        children: s.jsx("span", {
                          className: "truncate",
                          children:
                            y ||
                            s.jsx(d, {
                              id: "settings.worktrees.conversation.untitled",
                              defaultMessage: "Untitled conversation",
                              description: "Fallback title for a conversation",
                            }),
                        }),
                      },
                      g.id,
                    );
                  }),
                }),
        ],
      }),
    ],
  });
}
function K(e) {
  const t = new Map();
  for (const a of e) {
    const o = P(a.gitDir),
      r = D(o ?? a.dir),
      n = t.get(r);
    if (n) {
      n.worktrees.push(a);
      continue;
    }
    t.set(r, { key: r, repoRoot: o, worktrees: [a] });
  }
  return Array.from(t.values());
}
function T(e, t) {
  if (t.length === 0) return [];
  const a = D(e);
  return t.filter((o) => {
    const r = o.cwd;
    if (!r) return !1;
    const n = D(r);
    return n === a ? !0 : n.startsWith(`${a}/`);
  });
}
function Q(e, t) {
  if (t.length === 0) return e;
  const a = e.map((o, r) => ({
    worktree: o,
    index: r,
    conversationCount: T(o.dir, t).length,
  }));
  return (
    a.sort((o, r) => {
      const n = r.conversationCount - o.conversationCount;
      return n !== 0 ? n : o.index - r.index;
    }),
    a.map((o) => o.worktree)
  );
}
function D(e) {
  return B(e).replace(/\/+$/, "");
}
export { te as WorktreesSettingsPage };
//# sourceMappingURL=worktrees-settings-page-CtISajgH.js.map
