import { defineComponent as L, ref as b, computed as D, onMounted as F, createElementBlock as r, openBlock as d, createElementVNode as t, Fragment as B, renderList as I, normalizeStyle as q, normalizeClass as H, toDisplayString as x, watch as N, createCommentVNode as O } from "vue";
const j = { class: "analyze-timeline" }, G = ["disabled"], V = { class: "timeline-container" }, P = { class: "timeline-track" }, Z = ["onClick"], Q = { class: "timeline-date" }, J = ["disabled"], C = 3, K = /* @__PURE__ */ L({
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
    const o = a, m = f, i = b(0), g = b([]), w = b(!1), k = b(null), p = D(() => g.value.length > 0 ? g.value : o.events), n = D(() => p.value.slice(i.value, i.value + C)), e = (c) => c.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }), s = (c) => n.value.length === 1 ? 50 : c / (n.value.length - 1) * 100, _ = () => {
      i.value > 0 && (i.value--, m("navigate", "prev"));
    }, y = () => {
      i.value < p.value.length - C && (i.value++, m("navigate", "next"));
    }, S = (c) => {
      m("event-selected", c);
    }, z = async () => {
      var c, l, h;
      if (!(!((c = o.config) != null && c.enableDatabase) || !((l = o.config) != null && l.supabaseClient) || !((h = o.config) != null && h.userId))) {
        w.value = !0, k.value = null;
        try {
          const { data: v, error: $ } = await o.config.supabaseClient.schema("hf").from("ai_conversations").select("created_at").eq("user_id", o.config.userId).order("created_at", { ascending: !0 });
          if ($)
            throw $;
          if (v && v.length > 0) {
            const T = /* @__PURE__ */ new Set();
            v.forEach((u) => {
              const E = new Date(u.created_at).toISOString().split("T")[0];
              T.add(E);
            }), g.value = Array.from(T).map((u) => ({
              id: u,
              date: new Date(u),
              title: `Conversations on ${u}`,
              description: `AI conversations from ${u}`
            })).sort((u, E) => u.date.getTime() - E.date.getTime());
            const M = Math.max(0, g.value.length - C);
            i.value = M;
          }
        } catch (v) {
          console.error("Error fetching timeline dates:", v), k.value = v.message || "Failed to fetch timeline data";
        } finally {
          w.value = !1;
        }
      }
    };
    return F(() => {
      z();
    }), (c, l) => (d(), r("div", j, [
      t("button", {
        class: "timeline-nav timeline-nav-prev",
        onClick: _,
        disabled: i.value === 0
      }, [...l[0] || (l[0] = [
        t("svg", {
          width: "20",
          height: "20",
          viewBox: "0 0 20 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, [
          t("path", {
            d: "M12.5 15L7.5 10L12.5 5",
            stroke: "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          })
        ], -1)
      ])], 8, G),
      t("div", V, [
        t("div", P, [
          l[2] || (l[2] = t("div", { class: "timeline-line" }, null, -1)),
          (d(!0), r(B, null, I(n.value, (h, v) => (d(), r("div", {
            key: h.id,
            class: H(["timeline-event", { active: a.selectedEventId === h.id }]),
            style: q({ left: `${s(v)}%` }),
            onClick: ($) => S(h)
          }, [
            l[1] || (l[1] = t("div", { class: "timeline-dot" }, null, -1)),
            t("div", Q, x(e(h.date)), 1)
          ], 14, Z))), 128))
        ])
      ]),
      t("button", {
        class: "timeline-nav timeline-nav-next",
        onClick: y,
        disabled: i.value >= p.value.length - C
      }, [...l[3] || (l[3] = [
        t("svg", {
          width: "20",
          height: "20",
          viewBox: "0 0 20 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, [
          t("path", {
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
}), A = (a, f) => {
  const o = a.__vccOpts || a;
  for (const [m, i] of f)
    o[m] = i;
  return o;
}, ve = /* @__PURE__ */ A(K, [["__scopeId", "data-v-cbded2ac"]]), R = { class: "conversations-card" }, U = { class: "card-header" }, W = { class: "card-title" }, X = { class: "card-body" }, Y = {
  key: 0,
  class: "loading-state"
}, ee = {
  key: 1,
  class: "empty-state"
}, te = {
  key: 2,
  class: "conversations-list"
}, ne = { class: "conversation-time" }, se = { class: "conversation-question" }, oe = { class: "conversation-text" }, ie = {
  key: 0,
  class: "conversation-screenshot"
}, ae = ["src", "onClick"], le = { class: "conversation-answer" }, re = ["innerHTML"], de = /* @__PURE__ */ L({
  __name: "aiAnalyseTimelineConversationCard",
  props: {
    isOpen: { type: Boolean },
    conversations: {},
    date: {},
    loading: { type: Boolean, default: !1 }
  },
  emits: ["close"],
  setup(a, { emit: f }) {
    const o = a, m = f, i = D(() => o.date ? new Date(o.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }) : ""), g = (n) => {
      var _, y;
      const e = new Date(n), s = ((y = (((_ = e.toString().match(/\(([A-Za-z\s].*)\)/)) == null ? void 0 : _[1]) ?? "").match(/[A-Z]/g)) == null ? void 0 : y.join("")) ?? "";
      return e.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !0
      }) + " " + s;
    };
    function w(n) {
      console.log("test");
      let e = n.replace(/^\s*\#\#\#\#\s*(.*)$/gm, "<h4>$1</h4>");
      return e = e.replace(/^\s*\#\#\#\s*(.*)$/gm, "<h3>$1</h3>"), e = e.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>"), e = e.replace(/\n/g, "<br/>"), e = e.replace(/<\/h3><br\/>/g, "</h3>"), e = e.replace(/<\/h4><br\/>/g, "</h3>"), `
    <section>
    ${e}
    </section>
        `.trim();
    }
    const k = () => {
      m("close");
    }, p = (n) => {
      window.open(n, "_blank");
    };
    return N(() => o.isOpen, (n) => {
      if (n) {
        const e = (s) => {
          s.key === "Escape" && k();
        };
        return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
      }
    }), (n, e) => (d(), r("div", R, [
      t("div", U, [
        t("h2", W, "Conversations - " + x(i.value), 1),
        t("button", {
          class: "card-close",
          onClick: e[0] || (e[0] = (s) => n.$emit("close")),
          "aria-label": "Close panel"
        }, [...e[1] || (e[1] = [
          t("svg", {
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [
            t("line", {
              x1: "18",
              y1: "6",
              x2: "6",
              y2: "18"
            }),
            t("line", {
              x1: "6",
              y1: "6",
              x2: "18",
              y2: "18"
            })
          ], -1)
        ])])
      ]),
      t("div", X, [
        a.loading ? (d(), r("div", Y, [...e[2] || (e[2] = [
          t("div", { class: "spinner" }, null, -1),
          t("p", null, "Loading conversations...", -1)
        ])])) : !a.conversations || a.conversations.length === 0 ? (d(), r("div", ee, [...e[3] || (e[3] = [
          t("svg", {
            width: "64",
            height: "64",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [
            t("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
          ], -1),
          t("p", null, "No conversations found for this date", -1)
        ])])) : (d(), r("div", te, [
          (d(!0), r(B, null, I(a.conversations, (s) => (d(), r("div", {
            key: s.id,
            class: "conversation-card-item"
          }, [
            t("div", ne, x(g(s.created_at)), 1),
            t("div", se, [
              e[4] || (e[4] = t("div", { class: "conversation-label" }, "Question:", -1)),
              t("div", oe, x(s.question), 1)
            ]),
            s.screenshot_url ? (d(), r("div", ie, [
              t("img", {
                src: s.screenshot_url,
                alt: "Screenshot",
                onClick: (_) => p(s.screenshot_url)
              }, null, 8, ae)
            ])) : O("", !0),
            t("div", le, [
              e[5] || (e[5] = t("div", { class: "conversation-label" }, "Answer:", -1)),
              t("div", {
                class: "conversation-text",
                innerHTML: w(s.response)
              }, null, 8, re)
            ])
          ]))), 128))
        ]))
      ])
    ]));
  }
}), ue = /* @__PURE__ */ A(de, [["__scopeId", "data-v-2423d82a"]]);
export {
  ve as AnalyzeTimeline,
  ue as aiAnalyseTimelineConversationCard,
  ve as default
};
