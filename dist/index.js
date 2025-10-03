import { defineComponent as $, ref as k, computed as x, onMounted as F, createElementBlock as d, openBlock as r, createElementVNode as e, Fragment as B, renderList as L, normalizeStyle as N, normalizeClass as O, toDisplayString as w, watch as q, createBlock as V, Teleport as G, createVNode as j, Transition as P, withCtx as H, createCommentVNode as D, withModifiers as Q } from "vue";
const J = { class: "analyze-timeline" }, K = ["disabled"], R = { class: "timeline-container" }, U = { class: "timeline-track" }, W = ["onClick"], X = { class: "timeline-date" }, Y = ["disabled"], C = 3, Z = /* @__PURE__ */ $({
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
  setup(o, { emit: g }) {
    const n = o, u = g, s = k(0), p = k([]), h = k(!1), _ = k(null), i = x(() => p.value.length > 0 ? p.value : n.events), t = x(() => i.value.slice(s.value, s.value + C)), a = (c) => c.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }), b = (c) => t.value.length === 1 ? 50 : c / (t.value.length - 1) * 100, T = () => {
      s.value > 0 && (s.value--, u("navigate", "prev"));
    }, M = () => {
      s.value < i.value.length - C && (s.value++, u("navigate", "next"));
    }, S = (c) => {
      u("event-selected", c);
    }, z = async () => {
      var c, l, m;
      if (!(!((c = n.config) != null && c.enableDatabase) || !((l = n.config) != null && l.supabaseClient) || !((m = n.config) != null && m.userId))) {
        h.value = !0, _.value = null;
        try {
          const { data: v, error: y } = await n.config.supabaseClient.schema("hf").from("ai_conversations").select("created_at").eq("user_id", n.config.userId).order("created_at", { ascending: !1 });
          if (y)
            throw y;
          if (v && v.length > 0) {
            const E = /* @__PURE__ */ new Set();
            v.forEach((f) => {
              const A = new Date(f.created_at).toISOString().split("T")[0];
              E.add(A);
            }), p.value = Array.from(E).map((f) => ({
              id: f,
              date: new Date(f),
              title: `Conversations on ${f}`,
              description: `AI conversations from ${f}`
            }));
          }
        } catch (v) {
          console.error("Error fetching timeline dates:", v), _.value = v.message || "Failed to fetch timeline data";
        } finally {
          h.value = !1;
        }
      }
    };
    return F(() => {
      z();
    }), (c, l) => (r(), d("div", J, [
      e("button", {
        class: "timeline-nav timeline-nav-prev",
        onClick: T,
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
      ])], 8, K),
      e("div", R, [
        e("div", U, [
          l[2] || (l[2] = e("div", { class: "timeline-line" }, null, -1)),
          (r(!0), d(B, null, L(t.value, (m, v) => (r(), d("div", {
            key: m.id,
            class: O(["timeline-event", { active: o.selectedEventId === m.id }]),
            style: N({ left: `${b(v)}%` }),
            onClick: (y) => S(m)
          }, [
            l[1] || (l[1] = e("div", { class: "timeline-dot" }, null, -1)),
            e("div", X, w(a(m.date)), 1)
          ], 14, W))), 128))
        ])
      ]),
      e("button", {
        class: "timeline-nav timeline-nav-next",
        onClick: M,
        disabled: s.value >= i.value.length - C
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
      ])], 8, Y)
    ]));
  }
}), I = (o, g) => {
  const n = o.__vccOpts || o;
  for (const [u, s] of g)
    n[u] = s;
  return n;
}, fe = /* @__PURE__ */ I(Z, [["__scopeId", "data-v-45a55e3f"]]), ee = { class: "modal-container" }, te = { class: "modal-header" }, ne = { class: "modal-body" }, oe = {
  key: 0,
  class: "loading-state"
}, se = {
  key: 1,
  class: "empty-state"
}, ie = {
  key: 2,
  class: "conversations-list"
}, ae = { class: "conversation-time" }, le = { class: "conversation-question" }, re = { class: "conversation-text" }, de = { class: "conversation-answer" }, ce = { class: "conversation-text" }, ve = {
  key: 0,
  class: "conversation-screenshot"
}, ue = ["src", "onClick"], me = /* @__PURE__ */ $({
  __name: "ConversationModal",
  props: {
    isOpen: { type: Boolean },
    conversations: {},
    date: {},
    loading: { type: Boolean, default: !1 }
  },
  emits: ["close"],
  setup(o, { emit: g }) {
    const n = o, u = g, s = x(() => n.date ? new Date(n.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }) : ""), p = (i) => new Date(i).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !0
    }), h = () => {
      u("close");
    }, _ = (i) => {
      window.open(i, "_blank");
    };
    return q(() => n.isOpen, (i) => {
      if (i) {
        const t = (a) => {
          a.key === "Escape" && h();
        };
        return document.addEventListener("keydown", t), () => document.removeEventListener("keydown", t);
      }
    }), (i, t) => (r(), V(G, { to: "body" }, [
      j(P, { name: "modal" }, {
        default: H(() => [
          o.isOpen ? (r(), d("div", {
            key: 0,
            class: "modal-overlay",
            onClick: Q(h, ["self"])
          }, [
            e("div", ee, [
              e("div", te, [
                e("h2", null, "Conversations - " + w(s.value), 1),
                e("button", {
                  class: "modal-close",
                  onClick: h,
                  "aria-label": "Close modal"
                }, [...t[0] || (t[0] = [
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
              e("div", ne, [
                o.loading ? (r(), d("div", oe, [...t[1] || (t[1] = [
                  e("div", { class: "spinner" }, null, -1),
                  e("p", null, "Loading conversations...", -1)
                ])])) : !o.conversations || o.conversations.length === 0 ? (r(), d("div", se, [...t[2] || (t[2] = [
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
                ])])) : (r(), d("div", ie, [
                  (r(!0), d(B, null, L(o.conversations, (a) => (r(), d("div", {
                    key: a.id,
                    class: "conversation-card"
                  }, [
                    e("div", ae, w(p(a.created_at)), 1),
                    e("div", le, [
                      t[3] || (t[3] = e("div", { class: "conversation-label" }, "Question:", -1)),
                      e("div", re, w(a.question), 1)
                    ]),
                    e("div", de, [
                      t[4] || (t[4] = e("div", { class: "conversation-label" }, "Answer:", -1)),
                      e("div", ce, w(a.response), 1)
                    ]),
                    a.screenshot_url ? (r(), d("div", ve, [
                      e("img", {
                        src: a.screenshot_url,
                        alt: "Screenshot",
                        onClick: (b) => _(a.screenshot_url)
                      }, null, 8, ue)
                    ])) : D("", !0)
                  ]))), 128))
                ]))
              ])
            ])
          ])) : D("", !0)
        ]),
        _: 1
      })
    ]));
  }
}), ge = /* @__PURE__ */ I(me, [["__scopeId", "data-v-377047f9"]]);
export {
  fe as AnalyzeTimeline,
  ge as ConversationModal,
  fe as default
};
