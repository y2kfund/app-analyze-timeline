import { defineComponent as M, ref as C, computed as D, onMounted as j, createElementBlock as r, openBlock as d, createElementVNode as t, Fragment as L, renderList as S, normalizeStyle as G, normalizeClass as H, toDisplayString as _, watch as z, createCommentVNode as F, withDirectives as V, withKeys as U, withModifiers as I, vModelText as K, createTextVNode as N } from "vue";
const P = { class: "analyze-timeline" }, Q = ["disabled"], Z = { class: "timeline-container" }, X = { class: "timeline-track" }, J = ["onClick"], R = { class: "timeline-date" }, Y = ["disabled"], T = 3, W = /* @__PURE__ */ M({
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
  setup(u, { emit: x }) {
    const o = u, w = x, l = C(0), v = C([]), y = C(!1), g = C(null), b = D(() => v.value.length > 0 ? v.value : o.events), c = D(() => b.value.slice(l.value, l.value + T)), i = (s) => s.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }), m = (s) => c.value.length === 1 ? 50 : s / (c.value.length - 1) * 100, f = () => {
      l.value > 0 && (l.value--, w("navigate", "prev"));
    }, k = () => {
      l.value < b.value.length - T && (l.value++, w("navigate", "next"));
    }, B = (s, n) => {
      const e = {
        x: n.clientX,
        y: n.clientY
      };
      w("event-selected", s, e);
    }, A = async () => {
      var s, n, e;
      if (!(!((s = o.config) != null && s.enableDatabase) || !((n = o.config) != null && n.supabaseClient) || !((e = o.config) != null && e.userId))) {
        y.value = !0, g.value = null;
        try {
          const { data: a, error: h } = await o.config.supabaseClient.schema("hf").from("ai_conversations").select("created_at").eq("user_id", o.config.userId).order("created_at", { ascending: !0 });
          if (h)
            throw h;
          if (a && a.length > 0) {
            const p = /* @__PURE__ */ new Set();
            a.forEach(($) => {
              const q = new Date($.created_at).toISOString().split("T")[0];
              p.add(q);
            }), v.value = Array.from(p).map(($) => ({
              id: $,
              date: new Date($),
              title: `Conversations on ${$}`,
              description: `AI conversations from ${$}`
            })).sort(($, q) => $.date.getTime() - q.date.getTime());
            const E = Math.max(0, v.value.length - T);
            l.value = E;
          }
        } catch (a) {
          console.error("Error fetching timeline dates:", a), g.value = a.message || "Failed to fetch timeline data";
        } finally {
          y.value = !1;
        }
      }
    };
    return j(() => {
      A();
    }), (s, n) => (d(), r("div", P, [
      t("button", {
        class: "timeline-nav timeline-nav-prev",
        onClick: f,
        disabled: l.value === 0
      }, [...n[0] || (n[0] = [
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
      ])], 8, Q),
      t("div", Z, [
        t("div", X, [
          n[2] || (n[2] = t("div", { class: "timeline-line" }, null, -1)),
          (d(!0), r(L, null, S(c.value, (e, a) => (d(), r("div", {
            key: e.id,
            class: H(["timeline-event", { active: u.selectedEventId === e.id }]),
            style: G({ left: `${m(a)}%` }),
            onClick: (h) => B(e, h)
          }, [
            n[1] || (n[1] = t("div", { class: "timeline-dot" }, null, -1)),
            t("div", R, _(i(e.date)), 1)
          ], 14, J))), 128))
        ])
      ]),
      t("button", {
        class: "timeline-nav timeline-nav-next",
        onClick: k,
        disabled: l.value >= b.value.length - T
      }, [...n[3] || (n[3] = [
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
      ])], 8, Y)
    ]));
  }
}), O = (u, x) => {
  const o = u.__vccOpts || u;
  for (const [w, l] of x)
    o[w] = l;
  return o;
}, Ne = /* @__PURE__ */ O(W, [["__scopeId", "data-v-c162c769"]]), ee = { class: "conversations-card" }, te = { class: "card-header" }, ne = { class: "card-title" }, se = { class: "card-body" }, oe = {
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
}, ve = ["src", "onClick"], pe = { class: "conversation-answer" }, he = ["innerHTML"], me = { class: "conversation-card-item" }, ge = { class: "conversation-time" }, we = { class: "conversation-question" }, fe = { class: "conversation-text" }, _e = { class: "conversation-answer" }, ye = ["innerHTML"], ke = { class: "follow-up-section" }, $e = { class: "follow-up-chat" }, Ce = { class: "follow-up-input" }, xe = ["onUpdate:modelValue", "disabled", "onKeydown"], be = ["onClick", "disabled"], De = { key: 0 }, Ee = { key: 1 }, Te = /* @__PURE__ */ M({
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
  setup(u, { emit: x }) {
    const o = u, w = x, l = C({}), v = C({}), y = C({}), g = C({}), b = D(() => o.date ? new Date(o.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }) : ""), c = (s) => {
      var a, h;
      const n = new Date(s), e = ((h = (((a = n.toString().match(/\(([A-Za-z\s].*)\)/)) == null ? void 0 : a[1]) ?? "").match(/[A-Z]/g)) == null ? void 0 : h.join("")) ?? "";
      return n.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !0
      }) + " " + e;
    };
    function i(s) {
      const n = [];
      let e = s.replace(/```([\s\S]*?)```/g, (a) => (n.push(a.trim()), `___CODE_BLOCK_${n.length - 1}___`));
      return e = e.replace(/^\s*\#\#\#\#\s+(.*)$/gm, "<h4>$1</h4>"), e = e.replace(/^\s*\#\#\#\s+(.*)$/gm, "<h3>$1</h3>"), e = e.replace(/^\s*\#\#\s+(.*)$/gm, "<h2>$1</h2>"), e = e.replace(/^\s*\#\s+(.*)$/gm, "<h1>$1</h1>"), e = e.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"), e = e.replace(/^[\s]*[•\-]\s+(.*)$/gm, "<li>$1</li>"), e = e.replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>"), e = e.replace(/\n/g, "<br/>"), e = e.replace(/<\/(h[1-4]|ul)><br\/>/g, "</$1>"), e = e.replace(/<ul><br\/>/g, "<ul>"), e = e.replace(/<\/ul><br\/>/g, "</ul>"), n.forEach((a, h) => {
        e = e.replace(
          `___CODE_BLOCK_${h}___`,
          `<pre><code>${a.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`
        );
      }), `
    <section>
      ${e}
    </section>
  `.trim();
    }
    const m = async (s) => {
      if (!o.supabaseClient || !o.userId) {
        console.warn("Supabase client or user ID not available");
        return;
      }
      if (!(v.value[s] || y.value[s])) {
        y.value[s] = !0;
        try {
          const { data: n, error: e } = await o.supabaseClient.schema("hf").from("ai_conversation_followups").select("*").eq("conversation_id", s).order("created_at", { ascending: !0 });
          if (e) throw e;
          v.value[s] = n || [];
        } catch (n) {
          console.error("Error loading follow-ups:", n), v.value[s] = [];
        } finally {
          y.value[s] = !1;
        }
      }
    }, f = async () => {
      !o.conversations || o.conversations.length === 0 || await Promise.all(
        o.conversations.map((s) => m(s.id))
      );
    };
    j(() => {
      f();
    }), z(() => o.conversations, () => {
      f();
    }, { deep: !0 }), z(() => o.isOpen, (s) => {
      if (s) {
        f();
        const n = (e) => {
          e.key === "Escape" && B();
        };
        return document.addEventListener("keydown", n), () => document.removeEventListener("keydown", n);
      }
    });
    const k = async (s) => {
      var e;
      const n = (e = l.value[s.id]) == null ? void 0 : e.trim();
      if (!(!n || !o.supabaseClient || !o.userId)) {
        g.value[s.id] = !0;
        try {
          const a = await fetch("https://www.y2k.fund/api/ai-analyze", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              question: n,
              screenshot: s.screenshot_url,
              timestamp: (/* @__PURE__ */ new Date()).toISOString(),
              url: window.location.href,
              context: {
                previousQuestion: s.question,
                previousResponse: s.response,
                conversationId: s.id
              }
            })
          });
          if (!a.ok)
            throw new Error("Failed to get AI response");
          const h = await a.json(), { data: p, error: E } = await o.supabaseClient.schema("hf").from("ai_conversation_followups").insert({
            conversation_id: s.id,
            user_id: o.userId,
            question: n,
            response: h.response
          }).select().single();
          if (E) throw E;
          v.value[s.id] || (v.value[s.id] = []), v.value[s.id].push(p), l.value[s.id] = "";
        } catch (a) {
          console.error("Error sending follow-up:", a), alert("Failed to send follow-up question. Please try again.");
        } finally {
          g.value[s.id] = !1;
        }
      }
    }, B = () => {
      w("close");
    }, A = (s) => {
      window.open(s, "_blank");
    };
    return (s, n) => (d(), r("div", ee, [
      t("div", te, [
        t("h2", ne, "Conversations - " + _(b.value), 1),
        t("button", {
          class: "card-close",
          onClick: n[0] || (n[0] = (e) => s.$emit("close")),
          "aria-label": "Close panel"
        }, [...n[1] || (n[1] = [
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
      t("div", se, [
        u.loading ? (d(), r("div", oe, [...n[2] || (n[2] = [
          t("div", { class: "spinner" }, null, -1),
          t("p", null, "Loading conversations...", -1)
        ])])) : !u.conversations || u.conversations.length === 0 ? (d(), r("div", ie, [...n[3] || (n[3] = [
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
        ])])) : (d(), r("div", ae, [
          (d(!0), r(L, null, S(u.conversations, (e) => {
            var a, h;
            return d(), r("div", {
              key: e.id
            }, [
              t("div", le, [
                t("div", re, _(c(e.created_at)), 1),
                t("div", de, [
                  n[4] || (n[4] = t("div", { class: "conversation-label" }, "Question:", -1)),
                  t("div", ce, _(e.question), 1)
                ]),
                e.screenshot_url ? (d(), r("div", ue, [
                  t("img", {
                    src: e.screenshot_url,
                    alt: "Screenshot",
                    onClick: (p) => A(e.screenshot_url)
                  }, null, 8, ve)
                ])) : F("", !0),
                t("div", pe, [
                  n[5] || (n[5] = t("div", { class: "conversation-label" }, "Answer:", -1)),
                  t("div", {
                    class: "conversation-text",
                    innerHTML: i(e.response)
                  }, null, 8, he)
                ])
              ]),
              ((a = v.value[e.id]) == null ? void 0 : a.length) > 0 ? (d(!0), r(L, { key: 0 }, S(v.value[e.id], (p) => (d(), r("div", {
                key: p.id,
                style: { "margin-top": "30px !important" }
              }, [
                t("div", me, [
                  t("div", ge, _(c(p.created_at)), 1),
                  t("div", we, [
                    n[6] || (n[6] = t("div", { class: "conversation-label" }, "Question:", -1)),
                    t("div", fe, _(p.question), 1)
                  ]),
                  t("div", _e, [
                    n[7] || (n[7] = t("div", { class: "conversation-label" }, "Answer:", -1)),
                    t("div", {
                      class: "conversation-text",
                      innerHTML: i(p.response)
                    }, null, 8, ye)
                  ])
                ])
              ]))), 128)) : F("", !0),
              t("div", ke, [
                t("div", $e, [
                  t("div", Ce, [
                    V(t("textarea", {
                      "onUpdate:modelValue": (p) => l.value[e.id] = p,
                      placeholder: "Type your follow-up question...",
                      rows: "3",
                      disabled: g.value[e.id],
                      onKeydown: [
                        U(I((p) => k(e), ["ctrl"]), ["enter"]),
                        U(I((p) => k(e), ["meta"]), ["enter"])
                      ]
                    }, null, 40, xe), [
                      [K, l.value[e.id]]
                    ]),
                    t("button", {
                      onClick: (p) => k(e),
                      disabled: !((h = l.value[e.id]) != null && h.trim()) || g.value[e.id],
                      class: "send-button"
                    }, [
                      g.value[e.id] ? (d(), r("span", Ee, [...n[9] || (n[9] = [
                        t("div", { class: "spinner-small" }, null, -1),
                        N(" Sending... ", -1)
                      ])])) : (d(), r("span", De, [...n[8] || (n[8] = [
                        t("svg", {
                          width: "16",
                          height: "16",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        }, [
                          t("line", {
                            x1: "22",
                            y1: "2",
                            x2: "11",
                            y2: "13"
                          }),
                          t("polygon", { points: "22 2 15 22 11 13 2 9 22 2" })
                        ], -1),
                        N(" Send ", -1)
                      ])]))
                    ], 8, be)
                  ])
                ])
              ])
            ]);
          }), 128))
        ]))
      ])
    ]));
  }
}), je = /* @__PURE__ */ O(Te, [["__scopeId", "data-v-8a1df1d8"]]), Le = { class: "dropdown-header" }, Se = { class: "dropdown-title" }, Be = { class: "dropdown-body" }, Ae = {
  key: 0,
  class: "dropdown-loading"
}, qe = {
  key: 1,
  class: "dropdown-empty"
}, Fe = {
  key: 2,
  class: "conversation-list"
}, Ie = ["onClick"], Me = { class: "conversation-time" }, Oe = { class: "conversation-question-text" }, ze = /* @__PURE__ */ M({
  __name: "ConversationDropdown",
  props: {
    conversations: {},
    position: { default: () => ({ x: 0, y: 0 }) },
    isOpen: { type: Boolean },
    loading: { type: Boolean, default: !1 },
    date: {}
  },
  emits: ["conversation-selected", "close"],
  setup(u, { emit: x }) {
    const o = u, w = x, l = D(() => [...o.conversations].sort((c, i) => new Date(c.created_at).getTime() - new Date(i.created_at).getTime())), v = D(() => o.date ? new Date(o.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }) : o.conversations.length > 0 ? new Date(o.conversations[0].created_at).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }) : "Conversations"), y = D(() => {
      const c = o.position.x, i = o.position.y + 60;
      return {
        position: "fixed",
        left: `${c}px`,
        top: `${i}px`,
        transform: "translateX(-50%)"
        // Center horizontally on click point
      };
    }), g = (c) => {
      var f, k;
      const i = new Date(c), m = ((k = (((f = i.toString().match(/\(([A-Za-z\s].*)\)/)) == null ? void 0 : f[1]) ?? "").match(/[A-Z]/g)) == null ? void 0 : k.join("")) ?? "";
      return i.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !0
      }) + (m ? " " + m : "");
    }, b = (c) => {
      w("conversation-selected", c);
    };
    return (c, i) => u.isOpen ? (d(), r("div", {
      key: 0,
      class: "dropdown-overlay",
      onClick: i[2] || (i[2] = (m) => c.$emit("close"))
    }, [
      t("div", {
        class: "dropdown-container",
        style: G(y.value),
        onClick: i[1] || (i[1] = I(() => {
        }, ["stop"]))
      }, [
        t("div", Le, [
          t("h3", Se, _(v.value), 1),
          t("button", {
            class: "dropdown-close",
            onClick: i[0] || (i[0] = (m) => c.$emit("close")),
            "aria-label": "Close"
          }, [...i[3] || (i[3] = [
            t("svg", {
              width: "16",
              height: "16",
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
        t("div", Be, [
          u.loading ? (d(), r("div", Ae, [...i[4] || (i[4] = [
            t("div", { class: "spinner-small" }, null, -1),
            t("span", null, "Loading...", -1)
          ])])) : l.value.length === 0 ? (d(), r("div", qe, [...i[5] || (i[5] = [
            t("p", null, "No conversations found", -1)
          ])])) : (d(), r("div", Fe, [
            (d(!0), r(L, null, S(l.value, (m) => (d(), r("div", {
              key: m.id,
              class: "conversation-item",
              onClick: (f) => b(m.id)
            }, [
              t("div", Me, _(g(m.created_at)), 1),
              i[6] || (i[6] = t("div", { class: "conversation-divider" }, "|", -1)),
              t("div", Oe, _(m.question), 1)
            ], 8, Ie))), 128))
          ]))
        ])
      ], 4)
    ])) : F("", !0);
  }
}), Ge = /* @__PURE__ */ O(ze, [["__scopeId", "data-v-1c5ad062"]]);
export {
  Ne as AnalyzeTimeline,
  Ge as ConversationDropdown,
  je as aiAnalyseTimelineConversationCard,
  Ne as default
};
