import { defineComponent as R, ref as y, computed as A, onMounted as G, createElementBlock as l, openBlock as a, createElementVNode as e, Fragment as I, renderList as z, normalizeStyle as H, normalizeClass as K, toDisplayString as w, watch as Z, createCommentVNode as D, createTextVNode as P, withDirectives as Q, withKeys as j, withModifiers as M, vModelText as J } from "vue";
const X = { class: "analyze-timeline" }, Y = ["disabled"], W = { class: "timeline-container" }, ee = { class: "timeline-track" }, te = ["onClick"], se = { class: "timeline-date" }, oe = ["disabled"], F = 3, ne = /* @__PURE__ */ R({
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
  setup(v, { emit: S }) {
    const n = v, x = S, d = y(0), p = y([]), $ = y(!1), _ = y(null), b = A(() => p.value.length > 0 ? p.value : n.events), r = A(() => b.value.slice(d.value, d.value + F)), i = (g) => g.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }), u = (g) => r.value.length === 1 ? 50 : g / (r.value.length - 1) * 100, E = () => {
      d.value > 0 && (d.value--, x("navigate", "prev"));
    }, T = () => {
      d.value < b.value.length - F && (d.value++, x("navigate", "next"));
    }, O = (g, c) => {
      const f = {
        x: c.clientX,
        y: c.clientY
      };
      x("event-selected", g, f);
    }, N = async () => {
      var g, c, f;
      if (!(!((g = n.config) != null && g.enableDatabase) || !((c = n.config) != null && c.supabaseClient) || !((f = n.config) != null && f.userId))) {
        $.value = !0, _.value = null;
        try {
          const { data: k, error: B } = await n.config.supabaseClient.schema("hf").from("ai_conversations").select("created_at").eq("user_id", n.config.userId).order("created_at", { ascending: !0 });
          if (B)
            throw B;
          if (k && k.length > 0) {
            const L = /* @__PURE__ */ new Set();
            k.forEach((o) => {
              const t = new Date(o.created_at).toISOString().split("T")[0];
              L.add(t);
            }), p.value = Array.from(L).map((o) => ({
              id: o,
              date: new Date(o),
              title: `Conversations on ${o}`,
              description: `AI conversations from ${o}`
            })).sort((o, t) => o.date.getTime() - t.date.getTime());
            const q = Math.max(0, p.value.length - F);
            d.value = q;
          }
        } catch (k) {
          console.error("Error fetching timeline dates:", k), _.value = k.message || "Failed to fetch timeline data";
        } finally {
          $.value = !1;
        }
      }
    };
    return G(() => {
      N();
    }), (g, c) => (a(), l("div", X, [
      e("button", {
        class: "timeline-nav timeline-nav-prev",
        onClick: E,
        disabled: d.value === 0
      }, [...c[0] || (c[0] = [
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
      ])], 8, Y),
      e("div", W, [
        e("div", ee, [
          c[2] || (c[2] = e("div", { class: "timeline-line" }, null, -1)),
          (a(!0), l(I, null, z(r.value, (f, k) => (a(), l("div", {
            key: f.id,
            class: K(["timeline-event", { active: v.selectedEventId === f.id }]),
            style: H({ left: `${u(k)}%` }),
            onClick: (B) => O(f, B)
          }, [
            c[1] || (c[1] = e("div", { class: "timeline-dot" }, null, -1)),
            e("div", se, w(i(f.date)), 1)
          ], 14, te))), 128))
        ])
      ]),
      e("button", {
        class: "timeline-nav timeline-nav-next",
        onClick: T,
        disabled: d.value >= b.value.length - F
      }, [...c[3] || (c[3] = [
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
      ])], 8, oe)
    ]));
  }
}), V = (v, S) => {
  const n = v.__vccOpts || v;
  for (const [x, d] of S)
    n[x] = d;
  return n;
}, st = /* @__PURE__ */ V(ne, [["__scopeId", "data-v-c162c769"]]), ie = { class: "conversations-card" }, le = { class: "card-header" }, ae = { class: "card-title" }, re = { class: "card-body" }, de = {
  key: 0,
  class: "loading-state"
}, ce = {
  key: 1,
  class: "empty-state"
}, ue = {
  key: 2,
  class: "conversations-list"
}, ve = { class: "conversation-card-item" }, pe = { class: "conversation-time" }, he = ["onClick"], me = { class: "conversation-question" }, ge = { class: "conversation-text" }, ye = {
  key: 0,
  class: "conversation-screenshot"
}, fe = ["src", "onClick"], we = { class: "conversation-answer" }, _e = ["innerHTML"], ke = { class: "conversation-card-item" }, Ce = { class: "conversation-time" }, xe = ["onClick"], be = { class: "conversation-question" }, $e = { class: "conversation-text" }, De = { class: "conversation-answer" }, Se = ["innerHTML"], Ee = { class: "follow-up-section" }, Te = { class: "follow-up-chat" }, Be = { class: "follow-up-input" }, Ae = ["onUpdate:modelValue", "disabled", "onKeydown"], Le = ["onClick", "disabled"], Me = { key: 0 }, Ie = { key: 1 }, Oe = { class: "api-modal-body" }, qe = {
  key: 0,
  class: "api-payload-content"
}, Pe = { class: "api-section" }, Fe = { class: "api-code-block" }, ze = { class: "api-section" }, Ne = { class: "api-code-block" }, Ue = {
  key: 1,
  class: "api-no-data"
}, Re = { class: "screenshot-modal-body" }, Ve = ["src"], Ze = /* @__PURE__ */ R({
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
  setup(v, { emit: S }) {
    const n = v, x = S, d = y({}), p = y({}), $ = y({}), _ = y({}), b = y(!1), r = y(null), i = y(!1), u = y(null), E = A(() => n.date ? new Date(n.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }) : ""), T = (o) => {
      var m, C;
      const t = new Date(o), s = ((C = (((m = t.toString().match(/\(([A-Za-z\s].*)\)/)) == null ? void 0 : m[1]) ?? "").match(/[A-Z]/g)) == null ? void 0 : C.join("")) ?? "";
      return t.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !0
      }) + " " + s;
    };
    function O(o) {
      const t = [];
      let s = o.replace(/```([\s\S]*?)```/g, (m) => (t.push(m.trim()), `___CODE_BLOCK_${t.length - 1}___`));
      return s = s.replace(/^\s*\#\#\#\#\s+(.*)$/gm, "<h4>$1</h4>"), s = s.replace(/^\s*\#\#\#\s+(.*)$/gm, "<h3>$1</h3>"), s = s.replace(/^\s*\#\#\s+(.*)$/gm, "<h2>$1</h2>"), s = s.replace(/^\s*\#\s+(.*)$/gm, "<h1>$1</h1>"), s = s.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"), s = s.replace(/^[\s]*[•\-]\s+(.*)$/gm, "<li>$1</li>"), s = s.replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>"), s = s.replace(/\n/g, "<br/>"), s = s.replace(/<\/(h[1-4]|ul)><br\/>/g, "</$1>"), s = s.replace(/<ul><br\/>/g, "<ul>"), s = s.replace(/<\/ul><br\/>/g, "</ul>"), t.forEach((m, C) => {
        s = s.replace(
          `___CODE_BLOCK_${C}___`,
          `<pre><code>${m.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`
        );
      }), `
    <section>
      ${s}
    </section>
  `.trim();
    }
    const N = async (o) => {
      if (!n.supabaseClient || !n.userId) {
        console.warn("Supabase client or user ID not available");
        return;
      }
      if (!(p.value[o] || $.value[o])) {
        $.value[o] = !0;
        try {
          const { data: t, error: s } = await n.supabaseClient.schema("hf").from("ai_conversation_followups").select("*").eq("conversation_id", o).order("created_at", { ascending: !0 });
          if (s) throw s;
          p.value[o] = t || [];
        } catch (t) {
          console.error("Error loading follow-ups:", t), p.value[o] = [];
        } finally {
          $.value[o] = !1;
        }
      }
    }, g = async () => {
      !n.conversations || n.conversations.length === 0 || await Promise.all(
        n.conversations.map((o) => N(o.id))
      );
    };
    G(() => {
      g();
    }), Z(() => n.conversations, () => {
      g();
    }, { deep: !0 }), Z(() => n.isOpen, (o) => {
      if (o) {
        g();
        const t = (s) => {
          s.key === "Escape" && f();
        };
        return document.addEventListener("keydown", t), () => document.removeEventListener("keydown", t);
      }
    });
    const c = async (o) => {
      var s;
      const t = (s = d.value[o.id]) == null ? void 0 : s.trim();
      if (!(!t || !n.supabaseClient || !n.userId)) {
        _.value[o.id] = !0;
        try {
          const m = await fetch("https://www.y2k.fund/api/ai-analyze", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              question: t,
              screenshot: o.screenshot_url,
              timestamp: (/* @__PURE__ */ new Date()).toISOString(),
              url: window.location.href,
              context: {
                previousQuestion: o.question,
                previousResponse: o.response,
                conversationId: o.id
              }
            })
          });
          if (!m.ok)
            throw new Error("Failed to get AI response");
          const C = await m.json(), { data: h, error: U } = await n.supabaseClient.schema("hf").from("ai_conversation_followups").insert({
            conversation_id: o.id,
            user_id: n.userId,
            question: t,
            response: C.response,
            api_payload: C.api_payload || null
          }).select().single();
          if (U) throw U;
          p.value[o.id] || (p.value[o.id] = []), p.value[o.id].push(h), d.value[o.id] = "";
        } catch (m) {
          console.error("Error sending follow-up:", m), alert("Failed to send follow-up question. Please try again.");
        } finally {
          _.value[o.id] = !1;
        }
      }
    }, f = () => {
      x("close");
    }, k = (o) => {
      u.value = o, i.value = !0;
    }, B = () => {
      i.value = !1, u.value = null;
    }, L = (o) => {
      o.api_payload ? (r.value = o.api_payload, b.value = !0) : alert("No API payload data available for this conversation.");
    }, q = () => {
      b.value = !1, r.value = null;
    };
    return (o, t) => (a(), l(I, null, [
      e("div", ie, [
        e("div", le, [
          e("h2", ae, "Conversations - " + w(E.value), 1),
          e("button", {
            class: "card-close",
            onClick: t[0] || (t[0] = (s) => o.$emit("close")),
            "aria-label": "Close panel"
          }, [...t[3] || (t[3] = [
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
        e("div", re, [
          v.loading ? (a(), l("div", de, [...t[4] || (t[4] = [
            e("div", { class: "spinner" }, null, -1),
            e("p", null, "Loading conversations...", -1)
          ])])) : !v.conversations || v.conversations.length === 0 ? (a(), l("div", ce, [...t[5] || (t[5] = [
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
          ])])) : (a(), l("div", ue, [
            (a(!0), l(I, null, z(v.conversations, (s) => {
              var m, C;
              return a(), l("div", {
                key: s.id
              }, [
                e("div", ve, [
                  e("div", pe, [
                    P(w(T(s.created_at)) + " ", 1),
                    s.api_payload ? (a(), l("button", {
                      key: 0,
                      onClick: (h) => L(s),
                      class: "api-payload-icon",
                      title: "View API Details"
                    }, [...t[6] || (t[6] = [
                      e("svg", {
                        class: "icon",
                        viewBox: "0 0 24 24",
                        width: "18",
                        height: "18",
                        "aria-hidden": "true"
                      }, [
                        e("path", {
                          fill: "currentColor",
                          d: "M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.21-.37-.3-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.03-.22-.22-.39-.44-.39h-3.84c-.22 0-.41.16-.44.39l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96c-.22-.09-.47 0-.59.22l-1.92 3.32c-.12.21-.07.47.12.61l2.03 1.58c.04.31.06.63.06.94s-.02.63-.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.21.37.3.59.22l2.39.96c.5.38 1.03.7 1.62.94l.36 2.54c.03.22.22.39.44.39h3.84c.22 0 .41-.16.44-.39l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.09.47 0 .59-.22l1.92-3.32c.12-.21.07-.47-.12-.61l-2.03-1.58ZM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5Z"
                        })
                      ], -1)
                    ])], 8, he)) : D("", !0)
                  ]),
                  e("div", me, [
                    t[7] || (t[7] = e("div", { class: "conversation-label" }, "Question:", -1)),
                    e("div", ge, w(s.question), 1)
                  ]),
                  s.screenshot_url ? (a(), l("div", ye, [
                    e("img", {
                      src: s.screenshot_url,
                      alt: "Screenshot",
                      onClick: (h) => k(s.screenshot_url)
                    }, null, 8, fe)
                  ])) : D("", !0),
                  e("div", we, [
                    t[8] || (t[8] = e("div", { class: "conversation-label" }, "Answer:", -1)),
                    e("div", {
                      class: "conversation-text",
                      innerHTML: O(s.response)
                    }, null, 8, _e)
                  ])
                ]),
                ((m = p.value[s.id]) == null ? void 0 : m.length) > 0 ? (a(!0), l(I, { key: 0 }, z(p.value[s.id], (h) => (a(), l("div", {
                  key: h.id,
                  style: { "margin-top": "30px !important" }
                }, [
                  e("div", ke, [
                    e("div", Ce, [
                      P(w(T(h.created_at)) + " ", 1),
                      h.api_payload ? (a(), l("button", {
                        key: 0,
                        onClick: (U) => L(h),
                        class: "api-payload-icon",
                        title: "View API Details"
                      }, [...t[9] || (t[9] = [
                        e("svg", {
                          class: "icon",
                          viewBox: "0 0 24 24",
                          width: "18",
                          height: "18",
                          "aria-hidden": "true"
                        }, [
                          e("path", {
                            fill: "currentColor",
                            d: "M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.21-.37-.3-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.03-.22-.22-.39-.44-.39h-3.84c-.22 0-.41.16-.44.39l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96c-.22-.09-.47 0-.59.22l-1.92 3.32c-.12.21-.07.47.12.61l2.03 1.58c.04.31.06.63.06.94s-.02.63-.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.21.37.3.59.22l2.39.96c.5.38 1.03.7 1.62.94l.36 2.54c.03.22.22.39.44.39h3.84c.22 0 .41-.16.44-.39l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.09.47 0 .59-.22l1.92-3.32c.12-.21.07-.47-.12-.61l-2.03-1.58ZM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5Z"
                          })
                        ], -1)
                      ])], 8, xe)) : D("", !0)
                    ]),
                    e("div", be, [
                      t[10] || (t[10] = e("div", { class: "conversation-label" }, "Question:", -1)),
                      e("div", $e, w(h.question), 1)
                    ]),
                    e("div", De, [
                      t[11] || (t[11] = e("div", { class: "conversation-label" }, "Answer:", -1)),
                      e("div", {
                        class: "conversation-text",
                        innerHTML: O(h.response)
                      }, null, 8, Se)
                    ])
                  ])
                ]))), 128)) : D("", !0),
                e("div", Ee, [
                  e("div", Te, [
                    e("div", Be, [
                      Q(e("textarea", {
                        "onUpdate:modelValue": (h) => d.value[s.id] = h,
                        placeholder: "Type your follow-up question...",
                        rows: "3",
                        disabled: _.value[s.id],
                        onKeydown: [
                          j(M((h) => c(s), ["ctrl"]), ["enter"]),
                          j(M((h) => c(s), ["meta"]), ["enter"])
                        ]
                      }, null, 40, Ae), [
                        [J, d.value[s.id]]
                      ]),
                      e("button", {
                        onClick: (h) => c(s),
                        disabled: !((C = d.value[s.id]) != null && C.trim()) || _.value[s.id],
                        class: "send-button"
                      }, [
                        _.value[s.id] ? (a(), l("span", Ie, [...t[13] || (t[13] = [
                          e("div", { class: "spinner-small" }, null, -1),
                          P(" Sending... ", -1)
                        ])])) : (a(), l("span", Me, [...t[12] || (t[12] = [
                          e("svg", {
                            width: "16",
                            height: "16",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2"
                          }, [
                            e("line", {
                              x1: "22",
                              y1: "2",
                              x2: "11",
                              y2: "13"
                            }),
                            e("polygon", { points: "22 2 15 22 11 13 2 9 22 2" })
                          ], -1),
                          P(" Send ", -1)
                        ])]))
                      ], 8, Le)
                    ])
                  ])
                ])
              ]);
            }), 128))
          ]))
        ])
      ]),
      b.value ? (a(), l("div", {
        key: 0,
        class: "api-modal-overlay",
        onClick: q
      }, [
        e("div", {
          class: "api-modal-container",
          onClick: t[1] || (t[1] = M(() => {
          }, ["stop"]))
        }, [
          e("div", { class: "api-modal-header" }, [
            t[15] || (t[15] = e("h3", { class: "api-modal-title" }, "🔍 API Request & Response Details", -1)),
            e("button", {
              class: "api-modal-close",
              onClick: q,
              "aria-label": "Close"
            }, [...t[14] || (t[14] = [
              e("svg", {
                width: "20",
                height: "20",
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
          e("div", Oe, [
            r.value ? (a(), l("div", qe, [
              e("div", Pe, [
                t[16] || (t[16] = e("h4", { class: "api-section-title" }, "📤 Request Sent to OpenRouter", -1)),
                e("div", Fe, [
                  e("pre", null, [
                    e("code", null, w(JSON.stringify(r.value.request_sent_to_openrouter, null, 2)), 1)
                  ])
                ])
              ]),
              e("div", ze, [
                t[17] || (t[17] = e("h4", { class: "api-section-title" }, "📥 Response Received from OpenRouter", -1)),
                e("div", Ne, [
                  e("pre", null, [
                    e("code", null, w(JSON.stringify(r.value.response_received_from_openrouter, null, 2)), 1)
                  ])
                ])
              ])
            ])) : (a(), l("div", Ue, [...t[18] || (t[18] = [
              e("p", null, "No API payload data available for this conversation.", -1)
            ])]))
          ])
        ])
      ])) : D("", !0),
      i.value ? (a(), l("div", {
        key: 1,
        class: "screenshot-modal-overlay",
        onClick: B
      }, [
        e("div", {
          class: "screenshot-modal-container",
          onClick: t[2] || (t[2] = M(() => {
          }, ["stop"]))
        }, [
          e("div", { class: "screenshot-modal-header" }, [
            t[20] || (t[20] = e("h3", { class: "screenshot-modal-title" }, "📸 Screenshot", -1)),
            e("button", {
              class: "screenshot-modal-close",
              onClick: B,
              "aria-label": "Close"
            }, [...t[19] || (t[19] = [
              e("svg", {
                width: "20",
                height: "20",
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
          e("div", Re, [
            u.value ? (a(), l("img", {
              key: 0,
              src: u.value,
              alt: "Screenshot",
              class: "screenshot-image"
            }, null, 8, Ve)) : D("", !0)
          ])
        ])
      ])) : D("", !0)
    ], 64));
  }
}), ot = /* @__PURE__ */ V(Ze, [["__scopeId", "data-v-2ecd7438"]]), je = { class: "dropdown-header" }, Ge = { class: "dropdown-title" }, He = { class: "dropdown-body" }, Ke = {
  key: 0,
  class: "dropdown-loading"
}, Qe = {
  key: 1,
  class: "dropdown-empty"
}, Je = {
  key: 2,
  class: "conversation-list"
}, Xe = ["onClick"], Ye = { class: "conversation-time" }, We = { class: "conversation-question-text" }, et = /* @__PURE__ */ R({
  __name: "ConversationDropdown",
  props: {
    conversations: {},
    position: { default: () => ({ x: 0, y: 0 }) },
    isOpen: { type: Boolean },
    loading: { type: Boolean, default: !1 },
    date: {}
  },
  emits: ["conversation-selected", "close"],
  setup(v, { emit: S }) {
    const n = v, x = S, d = A(() => [...n.conversations].sort((r, i) => new Date(r.created_at).getTime() - new Date(i.created_at).getTime())), p = A(() => n.date ? new Date(n.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }) : n.conversations.length > 0 ? new Date(n.conversations[0].created_at).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }) : "Conversations"), $ = A(() => {
      const r = n.position.x, i = n.position.y + 60;
      return {
        position: "fixed",
        left: `${r}px`,
        top: `${i}px`,
        transform: "translateX(-50%)"
        // Center horizontally on click point
      };
    }), _ = (r) => {
      var E, T;
      const i = new Date(r), u = ((T = (((E = i.toString().match(/\(([A-Za-z\s].*)\)/)) == null ? void 0 : E[1]) ?? "").match(/[A-Z]/g)) == null ? void 0 : T.join("")) ?? "";
      return i.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !0
      }) + (u ? " " + u : "");
    }, b = (r) => {
      x("conversation-selected", r);
    };
    return (r, i) => v.isOpen ? (a(), l("div", {
      key: 0,
      class: "dropdown-overlay",
      onClick: i[2] || (i[2] = (u) => r.$emit("close"))
    }, [
      e("div", {
        class: "dropdown-container",
        style: H($.value),
        onClick: i[1] || (i[1] = M(() => {
        }, ["stop"]))
      }, [
        e("div", je, [
          e("h3", Ge, w(p.value), 1),
          e("button", {
            class: "dropdown-close",
            onClick: i[0] || (i[0] = (u) => r.$emit("close")),
            "aria-label": "Close"
          }, [...i[3] || (i[3] = [
            e("svg", {
              width: "16",
              height: "16",
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
        e("div", He, [
          v.loading ? (a(), l("div", Ke, [...i[4] || (i[4] = [
            e("div", { class: "spinner-small" }, null, -1),
            e("span", null, "Loading...", -1)
          ])])) : d.value.length === 0 ? (a(), l("div", Qe, [...i[5] || (i[5] = [
            e("p", null, "No conversations found", -1)
          ])])) : (a(), l("div", Je, [
            (a(!0), l(I, null, z(d.value, (u) => (a(), l("div", {
              key: u.id,
              class: "conversation-item",
              onClick: (E) => b(u.id)
            }, [
              e("div", Ye, w(_(u.created_at)), 1),
              i[6] || (i[6] = e("div", { class: "conversation-divider" }, "|", -1)),
              e("div", We, w(u.question), 1)
            ], 8, Xe))), 128))
          ]))
        ])
      ], 4)
    ])) : D("", !0);
  }
}), nt = /* @__PURE__ */ V(et, [["__scopeId", "data-v-1c5ad062"]]);
export {
  st as AnalyzeTimeline,
  nt as ConversationDropdown,
  ot as aiAnalyseTimelineConversationCard,
  st as default
};
