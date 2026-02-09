import {
  c as Ze,
  q as et,
  r as tt,
  s as Ne,
  t as Ie,
  v as we,
  j as s,
  d as u,
  e as st,
  B as Ue,
  G as Se,
  p as it,
  M as l,
  f as ze,
  T as nt,
  S as ot,
} from "./index-BnRAGF7J.js";
function lt() {
  const e = Ze.c(139),
    t = et(),
    n = tt(),
    [je, Ve] = Ne.useState(null),
    { data: Ke, setData: ye, isLoading: We } = Ie(Se.GIT_BRANCH_PREFIX),
    { data: Ce, setData: _e, isLoading: Xe } = Ie(Se.GIT_ALWAYS_FORCE_PUSH),
    { data: Ye, setData: qe, isLoading: $e } = Ie(Se.GIT_COMMIT_INSTRUCTIONS),
    { data: Je, setData: Te, isLoading: Qe } = Ie(Se.GIT_PR_INSTRUCTIONS);
  let g;
  e[0] !== ye ? ((g = (i) => ye(i)), (e[0] = ye), (e[1] = g)) : (g = e[1]);
  let m, p;
  e[2] !== t || e[3] !== n
    ? ((m = () => {
        (Ve(null),
          n.success(
            t.formatMessage({
              id: "settings.git.branchPrefix.save.success",
              defaultMessage: "Saved branch prefix",
              description: "Toast shown when git branch prefix is saved",
            }),
          ));
      }),
      (p = () => {
        n.danger(
          t.formatMessage({
            id: "settings.git.branchPrefix.save.error",
            defaultMessage: "Failed to save branch prefix",
            description: "Toast shown when git branch prefix save fails",
          }),
        );
      }),
      (e[2] = t),
      (e[3] = n),
      (e[4] = m),
      (e[5] = p))
    : ((m = e[4]), (p = e[5]));
  let Q;
  e[6] !== g || e[7] !== m || e[8] !== p
    ? ((Q = { mutationFn: g, onSuccess: m, onError: p }),
      (e[6] = g),
      (e[7] = m),
      (e[8] = p),
      (e[9] = Q))
    : (Q = e[9]);
  const Z = we(Q);
  let h;
  e[10] !== _e ? ((h = (i) => _e(i)), (e[10] = _e), (e[11] = h)) : (h = e[11]);
  let b, x;
  e[12] !== t || e[13] !== n
    ? ((b = (i, a) => {
        a
          ? n.success(
              t.formatMessage({
                id: "settings.git.forcePush.save.enabled",
                defaultMessage: "Always force push enabled",
                description:
                  "Toast shown when the always force push toggle is enabled",
              }),
            )
          : n.success(
              t.formatMessage({
                id: "settings.git.forcePush.save.disabled",
                defaultMessage: "Always force push disabled",
                description:
                  "Toast shown when the always force push toggle is disabled",
              }),
            );
      }),
      (x = () => {
        n.danger(
          t.formatMessage({
            id: "settings.git.forcePush.save.error",
            defaultMessage: "Failed to save force push setting",
            description:
              "Toast shown when saving the always force push toggle fails",
          }),
        );
      }),
      (e[12] = t),
      (e[13] = n),
      (e[14] = b),
      (e[15] = x))
    : ((b = e[14]), (x = e[15]));
  let ee;
  e[16] !== h || e[17] !== b || e[18] !== x
    ? ((ee = { mutationFn: h, onSuccess: b, onError: x }),
      (e[16] = h),
      (e[17] = b),
      (e[18] = x),
      (e[19] = ee))
    : (ee = e[19]);
  const te = we(ee),
    [ke, He] = Ne.useState(null),
    [De, Oe] = Ne.useState(null);
  let P;
  e[20] !== qe ? ((P = (i) => qe(i)), (e[20] = qe), (e[21] = P)) : (P = e[21]);
  let M, v;
  e[22] !== t || e[23] !== n
    ? ((v = () => {
        (He(null),
          n.success(
            t.formatMessage({
              id: "settings.git.commitInstructions.save.success",
              defaultMessage: "Saved commit instructions",
              description: "Toast shown when commit instructions are saved",
            }),
          ));
      }),
      (M = () => {
        n.danger(
          t.formatMessage({
            id: "settings.git.commitInstructions.save.error",
            defaultMessage: "Failed to save commit instructions",
            description: "Toast shown when commit instructions save fails",
          }),
        );
      }),
      (e[22] = t),
      (e[23] = n),
      (e[24] = M),
      (e[25] = v))
    : ((M = e[24]), (v = e[25]));
  let se;
  e[26] !== M || e[27] !== P || e[28] !== v
    ? ((se = { mutationFn: P, onSuccess: v, onError: M }),
      (e[26] = M),
      (e[27] = P),
      (e[28] = v),
      (e[29] = se))
    : (se = e[29]);
  const d = we(se);
  let I;
  e[30] !== Te ? ((I = (i) => Te(i)), (e[30] = Te), (e[31] = I)) : (I = e[31]);
  let w, S;
  e[32] !== t || e[33] !== n
    ? ((w = () => {
        (Oe(null),
          n.success(
            t.formatMessage({
              id: "settings.git.prInstructions.save.success",
              defaultMessage: "Saved pull request instructions",
              description:
                "Toast shown when pull request instructions are saved",
            }),
          ));
      }),
      (S = () => {
        n.danger(
          t.formatMessage({
            id: "settings.git.prInstructions.save.error",
            defaultMessage: "Failed to save pull request instructions",
            description:
              "Toast shown when pull request instructions save fails",
          }),
        );
      }),
      (e[32] = t),
      (e[33] = n),
      (e[34] = w),
      (e[35] = S))
    : ((w = e[34]), (S = e[35]));
  let ie;
  e[36] !== I || e[37] !== w || e[38] !== S
    ? ((ie = { mutationFn: I, onSuccess: w, onError: S }),
      (e[36] = I),
      (e[37] = w),
      (e[38] = S),
      (e[39] = ie))
    : (ie = e[39]);
  const f = we(ie),
    Y = Ke,
    j = je ?? Y,
    Ae = je != null && je !== Y,
    c = Z.isPending || We,
    y = Xe || te.isPending,
    $ = Ye ?? "",
    C = ke ?? $,
    ne = ke != null && ke !== $,
    o = $e || d.isPending,
    J = Je ?? "",
    _ = De ?? J,
    oe = De != null && De !== J,
    r = Qe || f.isPending;
  let re;
  e[40] !== j || e[41] !== c || e[42] !== Ae || e[43] !== Z
    ? ((re = () => {
        !Ae || c || Z.mutate(j);
      }),
      (e[40] = j),
      (e[41] = c),
      (e[42] = Ae),
      (e[43] = Z),
      (e[44] = re))
    : (re = e[44]);
  const Re = re;
  let ae;
  e[45] !== te || e[46] !== y
    ? ((ae = (i) => {
        y || te.mutate(i);
      }),
      (e[45] = te),
      (e[46] = y),
      (e[47] = ae))
    : (ae = e[47]);
  const Le = ae;
  let le;
  e[48] !== C || e[49] !== o || e[50] !== ne || e[51] !== d
    ? ((le = () => {
        o || !ne || d.mutate(C);
      }),
      (e[48] = C),
      (e[49] = o),
      (e[50] = ne),
      (e[51] = d),
      (e[52] = le))
    : (le = e[52]);
  const Be = le;
  let ce;
  e[53] !== r || e[54] !== oe || e[55] !== _ || e[56] !== f
    ? ((ce = () => {
        r || !oe || f.mutate(_);
      }),
      (e[53] = r),
      (e[54] = oe),
      (e[55] = _),
      (e[56] = f),
      (e[57] = ce))
    : (ce = e[57]);
  const Fe = ce;
  let ue;
  e[58] === Symbol.for("react.memo_cache_sentinel")
    ? ((ue = s.jsx(it, { slug: "git-settings" })), (e[58] = ue))
    : (ue = e[58]);
  let de, fe;
  e[59] === Symbol.for("react.memo_cache_sentinel")
    ? ((de = s.jsx(l, {
        id: "settings.git.branchPrefix.label",
        defaultMessage: "Branch prefix",
        description: "Label for git branch prefix setting",
      })),
      (fe = s.jsx(l, {
        id: "settings.git.branchPrefix.description",
        defaultMessage: "Prefix used when creating new branches in Codex",
        description: "Description for git branch prefix setting",
      })),
      (e[59] = de),
      (e[60] = fe))
    : ((de = e[59]), (fe = e[60]));
  let q;
  e[61] !== c || e[62] !== Y
    ? ((q = (i) => {
        if (c) return;
        const a = i.target.value;
        Ve(a === Y ? null : a);
      }),
      (e[61] = c),
      (e[62] = Y),
      (e[63] = q))
    : (q = e[63]);
  let T;
  e[64] !== t
    ? ((T = t.formatMessage({
        id: "settings.git.branchPrefix.placeholder",
        defaultMessage: "codex/",
        description: "Placeholder for git branch prefix input",
      })),
      (e[64] = t),
      (e[65] = T))
    : (T = e[65]);
  let k;
  e[66] !== t
    ? ((k = t.formatMessage({
        id: "settings.git.branchPrefix.ariaLabel",
        defaultMessage: "Branch prefix",
        description: "Aria label for git branch prefix input",
      })),
      (e[66] = t),
      (e[67] = k))
    : (k = e[67]);
  let D;
  e[68] !== j ||
  e[69] !== Re ||
  e[70] !== c ||
  e[71] !== q ||
  e[72] !== T ||
  e[73] !== k
    ? ((D = s.jsx(ze, {
        label: de,
        description: fe,
        control: s.jsx("input", {
          className:
            "bg-token-input-background text-token-input-foreground placeholder:text-token-input-placeholder-foreground w-56 rounded-md border border-token-input-border px-2.5 py-1.5 text-base outline-none focus:border-token-focus-border",
          value: j,
          onChange: q,
          onBlur: Re,
          placeholder: T,
          "aria-label": k,
          disabled: c,
        }),
      })),
      (e[68] = j),
      (e[69] = Re),
      (e[70] = c),
      (e[71] = q),
      (e[72] = T),
      (e[73] = k),
      (e[74] = D))
    : (D = e[74]);
  let ge, me;
  e[75] === Symbol.for("react.memo_cache_sentinel")
    ? ((ge = s.jsx(l, {
        id: "settings.git.forcePush.label",
        defaultMessage: "Always force push",
        description: "Label for always force push toggle",
      })),
      (me = s.jsx(l, {
        id: "settings.git.forcePush.description",
        defaultMessage: "Use --force-with-lease when pushing from Codex",
        description: "Description for always force push toggle",
      })),
      (e[75] = ge),
      (e[76] = me))
    : ((ge = e[75]), (me = e[76]));
  let A;
  e[77] !== Le
    ? ((A = (i) => {
        Le(i);
      }),
      (e[77] = Le),
      (e[78] = A))
    : (A = e[78]);
  let R;
  e[79] !== t
    ? ((R = t.formatMessage({
        id: "settings.git.forcePush.ariaLabel",
        defaultMessage: "Always force push",
        description: "Aria label for always force push toggle",
      })),
      (e[79] = t),
      (e[80] = R))
    : (R = e[80]);
  let L;
  e[81] !== Ce || e[82] !== y || e[83] !== A || e[84] !== R
    ? ((L = s.jsx(ze, {
        label: ge,
        description: me,
        control: s.jsx(nt, {
          checked: Ce,
          disabled: y,
          onChange: A,
          ariaLabel: R,
        }),
      })),
      (e[81] = Ce),
      (e[82] = y),
      (e[83] = A),
      (e[84] = R),
      (e[85] = L))
    : (L = e[85]);
  let B;
  e[86] !== D || e[87] !== L
    ? ((B = s.jsx(u, {
        children: s.jsx(u.Content, {
          children: s.jsxs(st, { children: [D, L] }),
        }),
      })),
      (e[86] = D),
      (e[87] = L),
      (e[88] = B))
    : (B = e[88]);
  let pe, he;
  e[89] === Symbol.for("react.memo_cache_sentinel")
    ? ((pe = s.jsx(l, {
        id: "settings.git.commitInstructions.label",
        defaultMessage: "Commit instructions",
        description: "Label for commit instructions",
      })),
      (he = s.jsx(l, {
        id: "settings.git.commitInstructions.description",
        defaultMessage: "Added to commit message generation prompts",
        description: "Description for commit instructions",
      })),
      (e[89] = pe),
      (e[90] = he))
    : ((pe = e[89]), (he = e[90]));
  const Ee = !ne || o;
  let be;
  e[91] === Symbol.for("react.memo_cache_sentinel")
    ? ((be = s.jsx(l, {
        id: "settings.git.commitInstructions.save",
        defaultMessage: "Save",
        description: "Button label to save commit instructions",
      })),
      (e[91] = be))
    : (be = e[91]);
  let F;
  e[92] !== Be || e[93] !== d.isPending || e[94] !== Ee
    ? ((F = s.jsx(u.Header, {
        title: pe,
        subtitle: he,
        actions: s.jsx(Ue, {
          color: "secondary",
          disabled: Ee,
          loading: d.isPending,
          onClick: Be,
          size: "toolbar",
          children: be,
        }),
      })),
      (e[92] = Be),
      (e[93] = d.isPending),
      (e[94] = Ee),
      (e[95] = F))
    : (F = e[95]);
  let E;
  e[96] !== o || e[97] !== $
    ? ((E = (i) => {
        if (o) return;
        const a = i.target.value;
        He(a === $ ? null : a);
      }),
      (e[96] = o),
      (e[97] = $),
      (e[98] = E))
    : (E = e[98]);
  let G;
  e[99] !== t
    ? ((G = t.formatMessage({
        id: "settings.git.commitInstructions.placeholder",
        defaultMessage: "Add commit message guidance…",
        description: "Placeholder for commit instructions textarea",
      })),
      (e[99] = t),
      (e[100] = G))
    : (G = e[100]);
  let N;
  e[101] !== t
    ? ((N = t.formatMessage({
        id: "settings.git.commitInstructions.ariaLabel",
        defaultMessage: "Commit instructions",
        description: "Aria label for commit instructions textarea",
      })),
      (e[101] = t),
      (e[102] = N))
    : (N = e[102]);
  let V;
  e[103] !== C || e[104] !== o || e[105] !== E || e[106] !== G || e[107] !== N
    ? ((V = s.jsx(u.Content, {
        children: s.jsx("textarea", {
          className:
            "mt-1.5 bg-token-input-background text-token-input-foreground placeholder:text-token-input-placeholder-foreground w-full rounded-md border border-token-input-border px-2.5 py-2 text-sm outline-none focus:border-token-focus-border",
          value: C,
          onChange: E,
          placeholder: G,
          "aria-label": N,
          disabled: o,
          rows: 6,
        }),
      })),
      (e[103] = C),
      (e[104] = o),
      (e[105] = E),
      (e[106] = G),
      (e[107] = N),
      (e[108] = V))
    : (V = e[108]);
  let H;
  e[109] !== F || e[110] !== V
    ? ((H = s.jsxs(u, { children: [F, V] })),
      (e[109] = F),
      (e[110] = V),
      (e[111] = H))
    : (H = e[111]);
  let xe, Pe;
  e[112] === Symbol.for("react.memo_cache_sentinel")
    ? ((xe = s.jsx(l, {
        id: "settings.git.prInstructions.label",
        defaultMessage: "Pull request instructions",
        description: "Label for pull request instructions",
      })),
      (Pe = s.jsx(l, {
        id: "settings.git.prInstructions.description",
        defaultMessage: "Appended to pull request bodies created by Codex",
        description: "Description for pull request instructions",
      })),
      (e[112] = xe),
      (e[113] = Pe))
    : ((xe = e[112]), (Pe = e[113]));
  const Ge = !oe || r;
  let Me;
  e[114] === Symbol.for("react.memo_cache_sentinel")
    ? ((Me = s.jsx(l, {
        id: "settings.git.prInstructions.save",
        defaultMessage: "Save",
        description: "Button label to save pull request instructions",
      })),
      (e[114] = Me))
    : (Me = e[114]);
  let O;
  e[115] !== Fe || e[116] !== f.isPending || e[117] !== Ge
    ? ((O = s.jsx(u.Header, {
        title: xe,
        subtitle: Pe,
        actions: s.jsx(Ue, {
          color: "secondary",
          disabled: Ge,
          loading: f.isPending,
          onClick: Fe,
          size: "toolbar",
          children: Me,
        }),
      })),
      (e[115] = Fe),
      (e[116] = f.isPending),
      (e[117] = Ge),
      (e[118] = O))
    : (O = e[118]);
  let U;
  e[119] !== r || e[120] !== J
    ? ((U = (i) => {
        if (r) return;
        const a = i.target.value;
        Oe(a === J ? null : a);
      }),
      (e[119] = r),
      (e[120] = J),
      (e[121] = U))
    : (U = e[121]);
  let z;
  e[122] !== t
    ? ((z = t.formatMessage({
        id: "settings.git.prInstructions.placeholder",
        defaultMessage: "Add pull request guidance…",
        description: "Placeholder for pull request instructions textarea",
      })),
      (e[122] = t),
      (e[123] = z))
    : (z = e[123]);
  let K;
  e[124] !== t
    ? ((K = t.formatMessage({
        id: "settings.git.prInstructions.ariaLabel",
        defaultMessage: "Pull request instructions",
        description: "Aria label for pull request instructions textarea",
      })),
      (e[124] = t),
      (e[125] = K))
    : (K = e[125]);
  let W;
  e[126] !== r || e[127] !== _ || e[128] !== U || e[129] !== z || e[130] !== K
    ? ((W = s.jsx(u.Content, {
        children: s.jsx("textarea", {
          className:
            "mt-1.5 bg-token-input-background text-token-input-foreground placeholder:text-token-input-placeholder-foreground w-full rounded-md border border-token-input-border px-2.5 py-2 text-sm outline-none focus:border-token-focus-border",
          value: _,
          onChange: U,
          placeholder: z,
          "aria-label": K,
          disabled: r,
          rows: 6,
        }),
      })),
      (e[126] = r),
      (e[127] = _),
      (e[128] = U),
      (e[129] = z),
      (e[130] = K),
      (e[131] = W))
    : (W = e[131]);
  let X;
  e[132] !== O || e[133] !== W
    ? ((X = s.jsxs(u, { children: [O, W] })),
      (e[132] = O),
      (e[133] = W),
      (e[134] = X))
    : (X = e[134]);
  let ve;
  return (
    e[135] !== B || e[136] !== H || e[137] !== X
      ? ((ve = s.jsxs(ot, { title: ue, children: [B, H, X] })),
        (e[135] = B),
        (e[136] = H),
        (e[137] = X),
        (e[138] = ve))
      : (ve = e[138]),
    ve
  );
}
export { lt as GitSettings };
//# sourceMappingURL=git-settings-CbIElOYe.js.map
