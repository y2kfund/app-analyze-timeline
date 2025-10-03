import { defineComponent as f, ref as _, computed as E, createElementBlock as v, openBlock as c, createElementVNode as e, Fragment as x, renderList as y, normalizeStyle as C, normalizeClass as b, toDisplayString as D } from "vue";
const L = { class: "analyze-timeline" }, z = ["disabled"], B = { class: "timeline-container" }, F = { class: "timeline-track" }, I = ["onClick"], S = { class: "timeline-date" }, T = ["disabled"], u = 3, j = /* @__PURE__ */ f({
  __name: "AnalyzeTimeline",
  props: {
    events: { default: () => [
      { id: "1", date: /* @__PURE__ */ new Date("2024-03-20"), title: "Event 1", description: "First event" },
      { id: "2", date: /* @__PURE__ */ new Date("2024-05-20"), title: "Event 2", description: "Second event" },
      { id: "3", date: /* @__PURE__ */ new Date("2024-07-09"), title: "Event 3", description: "Third event" },
      { id: "4", date: /* @__PURE__ */ new Date("2024-08-15"), title: "Event 4", description: "Fourth event" },
      { id: "5", date: /* @__PURE__ */ new Date("2024-09-22"), title: "Event 5", description: "Fifth event" }
    ] },
    selectedEventId: { default: void 0 }
  },
  emits: ["event-selected", "navigate"],
  setup(i, { emit: d }) {
    const l = i, o = d, t = _(0), r = E(() => l.events.slice(t.value, t.value + u)), m = (s) => s.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }), g = (s) => r.value.length === 1 ? 50 : s / (r.value.length - 1) * 100, p = () => {
      t.value > 0 && (t.value--, o("navigate", "prev"));
    }, h = () => {
      t.value < l.events.length - u && (t.value++, o("navigate", "next"));
    }, w = (s) => {
      o("event-selected", s);
    };
    return (s, n) => (c(), v("div", L, [
      e("button", {
        class: "timeline-nav timeline-nav-prev",
        onClick: p,
        disabled: t.value === 0
      }, [...n[0] || (n[0] = [
        e("svg", {
          width: "20",
          height: "20",
          viewBox: "0 0 20 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, [
          e("path", {
            d: "M12.5 15L7.5 10L12.5 5",
            stroke: "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          })
        ], -1)
      ])], 8, z),
      e("div", B, [
        e("div", F, [
          n[2] || (n[2] = e("div", { class: "timeline-line" }, null, -1)),
          (c(!0), v(x, null, y(r.value, (a, k) => (c(), v("div", {
            key: a.id,
            class: b(["timeline-event", { active: i.selectedEventId === a.id }]),
            style: C({ left: `${g(k)}%` }),
            onClick: (M) => w(a)
          }, [
            n[1] || (n[1] = e("div", { class: "timeline-dot" }, null, -1)),
            e("div", S, D(m(a.date)), 1)
          ], 14, I))), 128))
        ])
      ]),
      e("button", {
        class: "timeline-nav timeline-nav-next",
        onClick: h,
        disabled: t.value >= i.events.length - u
      }, [...n[3] || (n[3] = [
        e("svg", {
          width: "20",
          height: "20",
          viewBox: "0 0 20 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, [
          e("path", {
            d: "M7.5 15L12.5 10L7.5 5",
            stroke: "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          })
        ], -1)
      ])], 8, T)
    ]));
  }
}), A = (i, d) => {
  const l = i.__vccOpts || i;
  for (const [o, t] of d)
    l[o] = t;
  return l;
}, P = /* @__PURE__ */ A(j, [["__scopeId", "data-v-73243ade"]]);
export {
  P as AnalyzeTimeline
};
