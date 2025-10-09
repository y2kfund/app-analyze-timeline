import { defineComponent as $, ref as k, computed as b, onMounted as F, createElementBlock as r, openBlock as d, createElementVNode as e, Fragment as L, renderList as B, normalizeStyle as q, normalizeClass as N, toDisplayString as p, watch as O, createCommentVNode as G } from "vue";
const V = { class: "analyze-timeline" }, j = ["disabled"], P = { class: "timeline-container" }, H = { class: "timeline-track" }, Q = ["onClick"], J = { class: "timeline-date" }, K = ["disabled"], y = 3, R = /* @__PURE__ */ $({
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
    const n = a, m = f, s = k(0), g = k([]), _ = k(!1), w = k(null), o = b(() => g.value.length > 0 ? g.value : n.events), t = b(() => o.value.slice(s.value, s.value + y)), i = (c) => c.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }), E = (c) => t.value.length === 1 ? 50 : c / (t.value.length - 1) * 100, I = () => {
      s.value > 0 && (s.value--, m("navigate", "prev"));
    }, S = () => {
      s.value < o.value.length - y && (s.value++, m("navigate", "next"));
    }, A = (c) => {
      m("event-selected", c);
    }, z = async () => {
      var c, l, h;
      if (!(!((c = n.config) != null && c.enableDatabase) || !((l = n.config) != null && l.supabaseClient) || !((h = n.config) != null && h.userId))) {
        _.value = !0, w.value = null;
        try {
          const { data: v, error: C } = await n.config.supabaseClient.schema("hf").from("ai_conversations").select("created_at").eq("user_id", n.config.userId).order("created_at", { ascending: !0 });
          if (C)
            throw C;
          if (v && v.length > 0) {
            const D = /* @__PURE__ */ new Set();
            v.forEach((u) => {
              const x = new Date(u.created_at).toISOString().split("T")[0];
              D.add(x);
            }), g.value = Array.from(D).map((u) => ({
              id: u,
              date: new Date(u),
              title: `Conversations on ${u}`,
              description: `AI conversations from ${u}`
            })).sort((u, x) => u.date.getTime() - x.date.getTime());
            const M = Math.max(0, g.value.length - y);
            s.value = M;
          }
        } catch (v) {
          console.error("Error fetching timeline dates:", v), w.value = v.message || "Failed to fetch timeline data";
        } finally {
          _.value = !1;
        }
      }
    };
    return F(() => {
      z();
    }), (c, l) => (d(), r("div", V, [
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
      ])], 8, j),
      e("div", P, [
        e("div", H, [
          l[2] || (l[2] = e("div", { class: "timeline-line" }, null, -1)),
          (d(!0), r(L, null, B(t.value, (h, v) => (d(), r("div", {
            key: h.id,
            class: N(["timeline-event", { active: a.selectedEventId === h.id }]),
            style: q({ left: `${E(v)}%` }),
            onClick: (C) => A(h)
          }, [
            l[1] || (l[1] = e("div", { class: "timeline-dot" }, null, -1)),
            e("div", J, p(i(h.date)), 1)
          ], 14, Q))), 128))
        ])
      ]),
      e("button", {
        class: "timeline-nav timeline-nav-next",
        onClick: S,
        disabled: s.value >= o.value.length - y
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
      ])], 8, K)
    ]));
  }
}), T = (a, f) => {
  const n = a.__vccOpts || a;
  for (const [m, s] of f)
    n[m] = s;
  return n;
}, ve = /* @__PURE__ */ T(R, [["__scopeId", "data-v-cbded2ac"]]), U = { class: "conversations-card" }, W = { class: "card-header" }, X = { class: "card-title" }, Y = { class: "card-body" }, Z = {
  key: 0,
  class: "loading-state"
}, ee = {
  key: 1,
  class: "empty-state"
}, te = {
  key: 2,
  class: "conversations-list"
}, ne = { class: "conversation-time" }, se = { class: "conversation-question" }, oe = { class: "conversation-text" }, ie = { class: "conversation-answer" }, ae = { class: "conversation-text" }, le = {
  key: 0,
  class: "conversation-screenshot"
}, re = ["src", "onClick"], de = /* @__PURE__ */ $({
  __name: "aiAnalyseTimelineConversationCard",
  props: {
    isOpen: { type: Boolean },
    conversations: {},
    date: {},
    loading: { type: Boolean, default: !1 }
  },
  emits: ["close"],
  setup(a, { emit: f }) {
    const n = a, m = f, s = b(() => n.date ? new Date(n.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }) : ""), g = (o) => new Date(o).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !0
    }), _ = () => {
      m("close");
    }, w = (o) => {
      window.open(o, "_blank");
    };
    return O(() => n.isOpen, (o) => {
      if (o) {
        const t = (i) => {
          i.key === "Escape" && _();
        };
        return document.addEventListener("keydown", t), () => document.removeEventListener("keydown", t);
      }
    }), (o, t) => (d(), r("div", U, [
      e("div", W, [
        e("h2", X, "Conversations - " + p(s.value), 1),
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
      e("div", Y, [
        a.loading ? (d(), r("div", Z, [...t[2] || (t[2] = [
          e("div", { class: "spinner" }, null, -1),
          e("p", null, "Loading conversations...", -1)
        ])])) : !a.conversations || a.conversations.length === 0 ? (d(), r("div", ee, [...t[3] || (t[3] = [
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
        ])])) : (d(), r("div", te, [
          (d(!0), r(L, null, B(a.conversations, (i) => (d(), r("div", {
            key: i.id,
            class: "conversation-card-item"
          }, [
            e("div", ne, p(g(i.created_at)), 1),
            e("div", se, [
              t[4] || (t[4] = e("div", { class: "conversation-label" }, "Question:", -1)),
              e("div", oe, p(i.question), 1)
            ]),
            e("div", ie, [
              t[5] || (t[5] = e("div", { class: "conversation-label" }, "Answer:", -1)),
              e("div", ae, p(i.response), 1)
            ]),
            i.screenshot_url ? (d(), r("div", le, [
              e("img", {
                src: i.screenshot_url,
                alt: "Screenshot",
                onClick: (E) => w(i.screenshot_url)
              }, null, 8, re)
            ])) : G("", !0)
          ]))), 128))
        ]))
      ])
    ]));
  }
}), ue = /* @__PURE__ */ T(de, [["__scopeId", "data-v-b6063314"]]);
export {
  ve as AnalyzeTimeline,
  ue as aiAnalyseTimelineConversationCard,
  ve as default
};
