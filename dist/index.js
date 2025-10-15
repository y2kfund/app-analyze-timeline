import { defineComponent as z, ref as m, computed as B, onMounted as H, createElementBlock as r, openBlock as d, createElementVNode as s, Fragment as F, renderList as M, normalizeStyle as V, normalizeClass as j, toDisplayString as w, watch as A, createCommentVNode as I, withDirectives as K, withKeys as q, withModifiers as O, vModelText as P, createTextVNode as U } from "vue";
const Q = { class: "analyze-timeline" }, G = ["disabled"], Z = { class: "timeline-container" }, J = { class: "timeline-track" }, R = ["onClick"], W = { class: "timeline-date" }, X = ["disabled"], E = 3, Y = /* @__PURE__ */ z({
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
  setup(v, { emit: y }) {
    const o = v, g = y, a = m(0), c = m([]), f = m(!1), p = m(null), k = B(() => c.value.length > 0 ? c.value : o.events), _ = B(() => k.value.slice(a.value, a.value + E)), $ = (n) => n.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }), D = (n) => _.value.length === 1 ? 50 : n / (_.value.length - 1) * 100, b = () => {
      a.value > 0 && (a.value--, g("navigate", "prev"));
    }, C = () => {
      a.value < k.value.length - E && (a.value++, g("navigate", "next"));
    }, T = (n) => {
      g("event-selected", n);
    }, L = async () => {
      var n, t, e;
      if (!(!((n = o.config) != null && n.enableDatabase) || !((t = o.config) != null && t.supabaseClient) || !((e = o.config) != null && e.userId))) {
        f.value = !0, p.value = null;
        try {
          const { data: i, error: u } = await o.config.supabaseClient.schema("hf").from("ai_conversations").select("created_at").eq("user_id", o.config.userId).order("created_at", { ascending: !0 });
          if (u)
            throw u;
          if (i && i.length > 0) {
            const l = /* @__PURE__ */ new Set();
            i.forEach((h) => {
              const S = new Date(h.created_at).toISOString().split("T")[0];
              l.add(S);
            }), c.value = Array.from(l).map((h) => ({
              id: h,
              date: new Date(h),
              title: `Conversations on ${h}`,
              description: `AI conversations from ${h}`
            })).sort((h, S) => h.date.getTime() - S.date.getTime());
            const x = Math.max(0, c.value.length - E);
            a.value = x;
          }
        } catch (i) {
          console.error("Error fetching timeline dates:", i), p.value = i.message || "Failed to fetch timeline data";
        } finally {
          f.value = !1;
        }
      }
    };
    return H(() => {
      L();
    }), (n, t) => (d(), r("div", Q, [
      s("button", {
        class: "timeline-nav timeline-nav-prev",
        onClick: b,
        disabled: a.value === 0
      }, [...t[0] || (t[0] = [
        s("svg", {
          width: "20",
          height: "20",
          viewBox: "0 0 20 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, [
          s("path", {
            d: "M12.5 15L7.5 10L12.5 5",
            stroke: "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          })
        ], -1)
      ])], 8, G),
      s("div", Z, [
        s("div", J, [
          t[2] || (t[2] = s("div", { class: "timeline-line" }, null, -1)),
          (d(!0), r(F, null, M(_.value, (e, i) => (d(), r("div", {
            key: e.id,
            class: j(["timeline-event", { active: v.selectedEventId === e.id }]),
            style: V({ left: `${D(i)}%` }),
            onClick: (u) => T(e)
          }, [
            t[1] || (t[1] = s("div", { class: "timeline-dot" }, null, -1)),
            s("div", W, w($(e.date)), 1)
          ], 14, R))), 128))
        ])
      ]),
      s("button", {
        class: "timeline-nav timeline-nav-next",
        onClick: C,
        disabled: a.value >= k.value.length - E
      }, [...t[3] || (t[3] = [
        s("svg", {
          width: "20",
          height: "20",
          viewBox: "0 0 20 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, [
          s("path", {
            d: "M7.5 15L12.5 10L7.5 5",
            stroke: "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          })
        ], -1)
      ])], 8, X)
    ]));
  }
}), N = (v, y) => {
  const o = v.__vccOpts || v;
  for (const [g, a] of y)
    o[g] = a;
  return o;
}, Se = /* @__PURE__ */ N(Y, [["__scopeId", "data-v-cbded2ac"]]), ee = { class: "conversations-card" }, te = { class: "card-header" }, se = { class: "card-title" }, ne = { class: "card-body" }, oe = {
  key: 0,
  class: "loading-state"
}, ie = {
  key: 1,
  class: "empty-state"
}, ae = {
  key: 2,
  class: "conversations-list"
}, le = { class: "conversation-card-item" }, re = { class: "conversation-time" }, de = { class: "conversation-question" }, ce = { class: "conversation-text" }, ue = {
  key: 0,
  class: "conversation-screenshot"
}, ve = ["src", "onClick"], pe = { class: "conversation-answer" }, he = ["innerHTML"], me = { class: "conversation-card-item" }, ge = { class: "conversation-time" }, fe = { class: "conversation-question" }, _e = { class: "conversation-text" }, we = { class: "conversation-answer" }, ye = ["innerHTML"], ke = { class: "follow-up-section" }, be = { class: "follow-up-chat" }, Ce = { class: "follow-up-input" }, $e = ["onUpdate:modelValue", "disabled", "onKeydown"], xe = ["onClick", "disabled"], Ee = { key: 0 }, De = { key: 1 }, Te = /* @__PURE__ */ z({
  __name: "aiAnalyseTimelineConversationCard",
  props: {
    isOpen: { type: Boolean },
    conversations: {},
    date: {},
    loading: { type: Boolean, default: !1 },
    supabaseClient: {},
    userId: {}
  },
  emits: ["close"],
  setup(v, { emit: y }) {
    const o = v, g = y, a = m({}), c = m({}), f = m({}), p = m({}), k = B(() => o.date ? new Date(o.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }) : ""), _ = (n) => {
      var i, u;
      const t = new Date(n), e = ((u = (((i = t.toString().match(/\(([A-Za-z\s].*)\)/)) == null ? void 0 : i[1]) ?? "").match(/[A-Z]/g)) == null ? void 0 : u.join("")) ?? "";
      return t.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !0
      }) + " " + e;
    };
    function $(n) {
      const t = [];
      let e = n.replace(/```([\s\S]*?)```/g, (i) => (t.push(i.trim()), `___CODE_BLOCK_${t.length - 1}___`));
      return e = e.replace(/^\s*\#\#\#\#\s+(.*)$/gm, "<h4>$1</h4>"), e = e.replace(/^\s*\#\#\#\s+(.*)$/gm, "<h3>$1</h3>"), e = e.replace(/^\s*\#\#\s+(.*)$/gm, "<h2>$1</h2>"), e = e.replace(/^\s*\#\s+(.*)$/gm, "<h1>$1</h1>"), e = e.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"), e = e.replace(/^[\s]*[•\-]\s+(.*)$/gm, "<li>$1</li>"), e = e.replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>"), e = e.replace(/\n/g, "<br/>"), e = e.replace(/<\/(h[1-4]|ul)><br\/>/g, "</$1>"), e = e.replace(/<ul><br\/>/g, "<ul>"), e = e.replace(/<\/ul><br\/>/g, "</ul>"), t.forEach((i, u) => {
        e = e.replace(
          `___CODE_BLOCK_${u}___`,
          `<pre><code>${i.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`
        );
      }), `
    <section>
      ${e}
    </section>
  `.trim();
    }
    const D = async (n) => {
      if (!o.supabaseClient || !o.userId) {
        console.warn("Supabase client or user ID not available");
        return;
      }
      if (!(c.value[n] || f.value[n])) {
        f.value[n] = !0;
        try {
          const { data: t, error: e } = await o.supabaseClient.schema("hf").from("ai_conversation_followups").select("*").eq("conversation_id", n).order("created_at", { ascending: !0 });
          if (e) throw e;
          c.value[n] = t || [];
        } catch (t) {
          console.error("Error loading follow-ups:", t), c.value[n] = [];
        } finally {
          f.value[n] = !1;
        }
      }
    }, b = async () => {
      !o.conversations || o.conversations.length === 0 || await Promise.all(
        o.conversations.map((n) => D(n.id))
      );
    };
    H(() => {
      b();
    }), A(() => o.conversations, () => {
      b();
    }, { deep: !0 }), A(() => o.isOpen, (n) => {
      if (n) {
        b();
        const t = (e) => {
          e.key === "Escape" && T();
        };
        return document.addEventListener("keydown", t), () => document.removeEventListener("keydown", t);
      }
    });
    const C = async (n) => {
      var e;
      const t = (e = a.value[n.id]) == null ? void 0 : e.trim();
      if (!(!t || !o.supabaseClient || !o.userId)) {
        p.value[n.id] = !0;
        try {
          const i = await fetch("https://www.y2k.fund/api/ai-analyze", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              question: t,
              screenshot: n.screenshot_url,
              timestamp: (/* @__PURE__ */ new Date()).toISOString(),
              url: window.location.href,
              context: {
                previousQuestion: n.question,
                previousResponse: n.response,
                conversationId: n.id
              }
            })
          });
          if (!i.ok)
            throw new Error("Failed to get AI response");
          const u = await i.json(), { data: l, error: x } = await o.supabaseClient.schema("hf").from("ai_conversation_followups").insert({
            conversation_id: n.id,
            user_id: o.userId,
            question: t,
            response: u.response
          }).select().single();
          if (x) throw x;
          c.value[n.id] || (c.value[n.id] = []), c.value[n.id].push(l), a.value[n.id] = "";
        } catch (i) {
          console.error("Error sending follow-up:", i), alert("Failed to send follow-up question. Please try again.");
        } finally {
          p.value[n.id] = !1;
        }
      }
    }, T = () => {
      g("close");
    }, L = (n) => {
      window.open(n, "_blank");
    };
    return (n, t) => (d(), r("div", ee, [
      s("div", te, [
        s("h2", se, "Conversations - " + w(k.value), 1),
        s("button", {
          class: "card-close",
          onClick: t[0] || (t[0] = (e) => n.$emit("close")),
          "aria-label": "Close panel"
        }, [...t[1] || (t[1] = [
          s("svg", {
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [
            s("line", {
              x1: "18",
              y1: "6",
              x2: "6",
              y2: "18"
            }),
            s("line", {
              x1: "6",
              y1: "6",
              x2: "18",
              y2: "18"
            })
          ], -1)
        ])])
      ]),
      s("div", ne, [
        v.loading ? (d(), r("div", oe, [...t[2] || (t[2] = [
          s("div", { class: "spinner" }, null, -1),
          s("p", null, "Loading conversations...", -1)
        ])])) : !v.conversations || v.conversations.length === 0 ? (d(), r("div", ie, [...t[3] || (t[3] = [
          s("svg", {
            width: "64",
            height: "64",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [
            s("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
          ], -1),
          s("p", null, "No conversations found for this date", -1)
        ])])) : (d(), r("div", ae, [
          (d(!0), r(F, null, M(v.conversations, (e) => {
            var i, u;
            return d(), r("div", {
              key: e.id
            }, [
              s("div", le, [
                s("div", re, w(_(e.created_at)), 1),
                s("div", de, [
                  t[4] || (t[4] = s("div", { class: "conversation-label" }, "Question:", -1)),
                  s("div", ce, w(e.question), 1)
                ]),
                e.screenshot_url ? (d(), r("div", ue, [
                  s("img", {
                    src: e.screenshot_url,
                    alt: "Screenshot",
                    onClick: (l) => L(e.screenshot_url)
                  }, null, 8, ve)
                ])) : I("", !0),
                s("div", pe, [
                  t[5] || (t[5] = s("div", { class: "conversation-label" }, "Answer:", -1)),
                  s("div", {
                    class: "conversation-text",
                    innerHTML: $(e.response)
                  }, null, 8, he)
                ])
              ]),
              ((i = c.value[e.id]) == null ? void 0 : i.length) > 0 ? (d(!0), r(F, { key: 0 }, M(c.value[e.id], (l) => (d(), r("div", {
                key: l.id,
                style: { "margin-top": "30px !important" }
              }, [
                s("div", me, [
                  s("div", ge, w(_(l.created_at)), 1),
                  s("div", fe, [
                    t[6] || (t[6] = s("div", { class: "conversation-label" }, "Question:", -1)),
                    s("div", _e, w(l.question), 1)
                  ]),
                  s("div", we, [
                    t[7] || (t[7] = s("div", { class: "conversation-label" }, "Answer:", -1)),
                    s("div", {
                      class: "conversation-text",
                      innerHTML: $(l.response)
                    }, null, 8, ye)
                  ])
                ])
              ]))), 128)) : I("", !0),
              s("div", ke, [
                s("div", be, [
                  s("div", Ce, [
                    K(s("textarea", {
                      "onUpdate:modelValue": (l) => a.value[e.id] = l,
                      placeholder: "Type your follow-up question...",
                      rows: "3",
                      disabled: p.value[e.id],
                      onKeydown: [
                        q(O((l) => C(e), ["ctrl"]), ["enter"]),
                        q(O((l) => C(e), ["meta"]), ["enter"])
                      ]
                    }, null, 40, $e), [
                      [P, a.value[e.id]]
                    ]),
                    s("button", {
                      onClick: (l) => C(e),
                      disabled: !((u = a.value[e.id]) != null && u.trim()) || p.value[e.id],
                      class: "send-button"
                    }, [
                      p.value[e.id] ? (d(), r("span", De, [...t[9] || (t[9] = [
                        s("div", { class: "spinner-small" }, null, -1),
                        U(" Sending... ", -1)
                      ])])) : (d(), r("span", Ee, [...t[8] || (t[8] = [
                        s("svg", {
                          width: "16",
                          height: "16",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        }, [
                          s("line", {
                            x1: "22",
                            y1: "2",
                            x2: "11",
                            y2: "13"
                          }),
                          s("polygon", { points: "22 2 15 22 11 13 2 9 22 2" })
                        ], -1),
                        U(" Send ", -1)
                      ])]))
                    ], 8, xe)
                  ])
                ])
              ])
            ]);
          }), 128))
        ]))
      ])
    ]));
  }
}), Be = /* @__PURE__ */ N(Te, [["__scopeId", "data-v-8a1df1d8"]]);
export {
  Se as AnalyzeTimeline,
  Be as aiAnalyseTimelineConversationCard,
  Se as default
};
