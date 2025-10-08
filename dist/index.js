import { defineComponent as D, ref as k, computed as b, onMounted as F, createElementBlock as r, openBlock as d, createElementVNode as e, Fragment as $, renderList as L, normalizeStyle as M, normalizeClass as q, toDisplayString as p, watch as N, createCommentVNode as O } from "vue";
const G = { class: "analyze-timeline" }, V = ["disabled"], j = { class: "timeline-container" }, P = { class: "timeline-track" }, H = ["onClick"], Q = { class: "timeline-date" }, J = ["disabled"], C = 3, K = /* @__PURE__ */ D({
  __name: "AnalyzeTimeline",
  props: {
    events: { default: () => [
      { id: "1", date: /* @__PURE__ */ new Date("2024-03-20"), title: "Event 1", description: "First event" },
      { id: "2", date: /* @__PURE__ */ new Date("2024-05-20"), title: "Event 2", description: "Second event" },
      { id: "3", date: /* @__PURE__ */ new Date("2024-07-09"), title: "Event 3", description: "Third event" },
      { id: "4", date: /* @__PURE__ */ new Date("2024-08-15"), title: "Event 4", description: "Fourth event" },
      { id: "5", date: /* @__PURE__ */ new Date("2024-09-22"), title: "Event 5", description: "Fifth event" }
    ] },
    selectedEventId: { default: void 0 },
    config: { default: void 0 }
  },
  emits: ["event-selected", "navigate"],
  setup(a, { emit: f }) {
    const n = a, u = f, s = k(0), g = k([]), _ = k(!1), w = k(null), o = b(() => g.value.length > 0 ? g.value : n.events), t = b(() => o.value.slice(s.value, s.value + C)), i = (c) => c.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }), E = (c) => t.value.length === 1 ? 50 : c / (t.value.length - 1) * 100, I = () => {
      s.value > 0 && (s.value--, u("navigate", "prev"));
    }, T = () => {
      s.value < o.value.length - C && (s.value++, u("navigate", "next"));
    }, S = (c) => {
      u("event-selected", c);
    }, A = async () => {
      var c, l, m;
      if (!(!((c = n.config) != null && c.enableDatabase) || !((l = n.config) != null && l.supabaseClient) || !((m = n.config) != null && m.userId))) {
        _.value = !0, w.value = null;
        try {
          const { data: v, error: y } = await n.config.supabaseClient.schema("hf").from("ai_conversations").select("created_at").eq("user_id", n.config.userId).order("created_at", { ascending: !1 });
          if (y)
            throw y;
          if (v && v.length > 0) {
            const x = /* @__PURE__ */ new Set();
            v.forEach((h) => {
              const z = new Date(h.created_at).toISOString().split("T")[0];
              x.add(z);
            }), g.value = Array.from(x).map((h) => ({
              id: h,
              date: new Date(h),
              title: `Conversations on ${h}`,
              description: `AI conversations from ${h}`
            }));
          }
        } catch (v) {
          console.error("Error fetching timeline dates:", v), w.value = v.message || "Failed to fetch timeline data";
        } finally {
          _.value = !1;
        }
      }
    };
    return F(() => {
      A();
    }), (c, l) => (d(), r("div", G, [
      e("button", {
        class: "timeline-nav timeline-nav-prev",
        onClick: I,
        disabled: s.value === 0
      }, [...l[0] || (l[0] = [
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
      ])], 8, V),
      e("div", j, [
        e("div", P, [
          l[2] || (l[2] = e("div", { class: "timeline-line" }, null, -1)),
          (d(!0), r($, null, L(t.value, (m, v) => (d(), r("div", {
            key: m.id,
            class: q(["timeline-event", { active: a.selectedEventId === m.id }]),
            style: M({ left: `${E(v)}%` }),
            onClick: (y) => S(m)
          }, [
            l[1] || (l[1] = e("div", { class: "timeline-dot" }, null, -1)),
            e("div", Q, p(i(m.date)), 1)
          ], 14, H))), 128))
        ])
      ]),
      e("button", {
        class: "timeline-nav timeline-nav-next",
        onClick: T,
        disabled: s.value >= o.value.length - C
      }, [...l[3] || (l[3] = [
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
      ])], 8, J)
    ]));
  }
}), B = (a, f) => {
  const n = a.__vccOpts || a;
  for (const [u, s] of f)
    n[u] = s;
  return n;
}, ce = /* @__PURE__ */ B(K, [["__scopeId", "data-v-45a55e3f"]]), R = { class: "conversations-card" }, U = { class: "card-header" }, W = { class: "card-title" }, X = { class: "card-body" }, Y = {
  key: 0,
  class: "loading-state"
}, Z = {
  key: 1,
  class: "empty-state"
}, ee = {
  key: 2,
  class: "conversations-list"
}, te = { class: "conversation-time" }, ne = { class: "conversation-question" }, se = { class: "conversation-text" }, oe = {
  key: 0,
  class: "conversation-screenshot"
}, ie = ["src", "onClick"], ae = { class: "conversation-answer" }, le = { class: "conversation-text" }, re = /* @__PURE__ */ D({
  __name: "aiAnalyseTimelineConversationCard",
  props: {
    isOpen: { type: Boolean },
    conversations: {},
    date: {},
    loading: { type: Boolean, default: !1 }
  },
  emits: ["close"],
  setup(a, { emit: f }) {
    const n = a, u = f, s = b(() => n.date ? new Date(n.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }) : ""), g = (o) => new Date(o).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !0
    }), _ = () => {
      u("close");
    }, w = (o) => {
      window.open(o, "_blank");
    };
    return N(() => n.isOpen, (o) => {
      if (o) {
        const t = (i) => {
          i.key === "Escape" && _();
        };
        return document.addEventListener("keydown", t), () => document.removeEventListener("keydown", t);
      }
    }), (o, t) => (d(), r("div", R, [
      e("div", U, [
        e("h2", W, "Conversations - " + p(s.value), 1),
        e("button", {
          class: "card-close",
          onClick: t[0] || (t[0] = (i) => o.$emit("close")),
          "aria-label": "Close panel"
        }, [...t[1] || (t[1] = [
          e("svg", {
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [
            e("line", {
              x1: "18",
              y1: "6",
              x2: "6",
              y2: "18"
            }),
            e("line", {
              x1: "6",
              y1: "6",
              x2: "18",
              y2: "18"
            })
          ], -1)
        ])])
      ]),
      e("div", X, [
        a.loading ? (d(), r("div", Y, [...t[2] || (t[2] = [
          e("div", { class: "spinner" }, null, -1),
          e("p", null, "Loading conversations...", -1)
        ])])) : !a.conversations || a.conversations.length === 0 ? (d(), r("div", Z, [...t[3] || (t[3] = [
          e("svg", {
            width: "64",
            height: "64",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [
            e("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
          ], -1),
          e("p", null, "No conversations found for this date", -1)
        ])])) : (d(), r("div", ee, [
          (d(!0), r($, null, L(a.conversations, (i) => (d(), r("div", {
            key: i.id,
            class: "conversation-card-item"
          }, [
            e("div", te, p(g(i.created_at)), 1),
            e("div", ne, [
              t[4] || (t[4] = e("div", { class: "conversation-label" }, "Question:", -1)),
              e("div", se, p(i.question), 1)
            ]),
            i.screenshot_url ? (d(), r("div", oe, [
              e("img", {
                src: i.screenshot_url,
                alt: "Screenshot",
                onClick: (E) => w(i.screenshot_url)
              }, null, 8, ie)
            ])) : O("", !0),
            e("div", ae, [
              t[5] || (t[5] = e("div", { class: "conversation-label" }, "Answer:", -1)),
              e("div", le, p(i.response), 1)
            ])
          ]))), 128))
        ]))
      ])
    ]));
  }
}), ve = /* @__PURE__ */ B(re, [["__scopeId", "data-v-b1cf6b74"]]);
export {
  ce as AnalyzeTimeline,
  ve as aiAnalyseTimelineConversationCard,
  ce as default
};
