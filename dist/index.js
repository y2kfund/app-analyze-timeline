import { defineComponent as j, ref as k, computed as O, onMounted as J, createElementBlock as n, openBlock as i, createElementVNode as e, Fragment as q, renderList as P, normalizeStyle as Y, normalizeClass as ee, toDisplayString as v, watch as Q, createCommentVNode as h, createTextVNode as F, withDirectives as te, withKeys as X, withModifiers as z, vModelText as se } from "vue";
const oe = { class: "analyze-timeline" }, ne = ["disabled"], ie = { class: "timeline-container" }, ae = { class: "timeline-track" }, le = ["onClick"], re = { class: "timeline-date" }, de = ["disabled"], V = 3, ce = /* @__PURE__ */ j({
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
  setup(g, { emit: E }) {
    const r = g, A = E, p = k(0), y = k([]), S = k(!1), x = k(null), T = O(() => y.value.length > 0 ? y.value : r.events), a = O(() => T.value.slice(p.value, p.value + V)), d = (f) => f.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }), _ = (f) => a.value.length === 1 ? 50 : f / (a.value.length - 1) * 100, B = () => {
      p.value > 0 && (p.value--, A("navigate", "prev"));
    }, M = () => {
      p.value < T.value.length - V && (p.value++, A("navigate", "next"));
    }, N = (f, m) => {
      const b = {
        x: m.clientX,
        y: m.clientY
      };
      A("event-selected", f, b);
    }, Z = async () => {
      var f, m, b;
      if (!(!((f = r.config) != null && f.enableDatabase) || !((m = r.config) != null && m.supabaseClient) || !((b = r.config) != null && b.userId))) {
        S.value = !0, x.value = null;
        try {
          const { data: $, error: L } = await r.config.supabaseClient.schema("hf").from("ai_conversations").select("created_at").eq("user_id", r.config.userId).order("created_at", { ascending: !0 });
          if (L)
            throw L;
          if ($ && $.length > 0) {
            const U = /* @__PURE__ */ new Set();
            $.forEach((C) => {
              const I = new Date(C.created_at).toISOString().split("T")[0];
              U.add(I);
            }), y.value = Array.from(U).map((C) => ({
              id: C,
              date: new Date(C),
              title: `Conversations on ${C}`,
              description: `AI conversations from ${C}`
            })).sort((C, I) => C.date.getTime() - I.date.getTime());
            const R = Math.max(0, y.value.length - V);
            p.value = R;
          }
        } catch ($) {
          console.error("Error fetching timeline dates:", $), x.value = $.message || "Failed to fetch timeline data";
        } finally {
          S.value = !1;
        }
      }
    };
    return J(() => {
      Z();
    }), (f, m) => (i(), n("div", oe, [
      e("button", {
        class: "timeline-nav timeline-nav-prev",
        onClick: B,
        disabled: p.value === 0
      }, [...m[0] || (m[0] = [
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
      ])], 8, ne),
      e("div", ie, [
        e("div", ae, [
          m[2] || (m[2] = e("div", { class: "timeline-line" }, null, -1)),
          (i(!0), n(q, null, P(a.value, (b, $) => (i(), n("div", {
            key: b.id,
            class: ee(["timeline-event", { active: g.selectedEventId === b.id }]),
            style: Y({ left: `${_($)}%` }),
            onClick: (L) => N(b, L)
          }, [
            m[1] || (m[1] = e("div", { class: "timeline-dot" }, null, -1)),
            e("div", re, v(d(b.date)), 1)
          ], 14, le))), 128))
        ])
      ]),
      e("button", {
        class: "timeline-nav timeline-nav-next",
        onClick: M,
        disabled: p.value >= T.value.length - V
      }, [...m[3] || (m[3] = [
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
      ])], 8, de)
    ]));
  }
}), G = (g, E) => {
  const r = g.__vccOpts || g;
  for (const [A, p] of E)
    r[A] = p;
  return r;
}, Nt = /* @__PURE__ */ G(ce, [["__scopeId", "data-v-c162c769"]]), ue = { class: "conversations-card" }, ve = { class: "card-header" }, pe = { class: "card-title" }, me = { class: "card-body" }, _e = {
  key: 0,
  class: "loading-state"
}, he = {
  key: 1,
  class: "empty-state"
}, ge = {
  key: 2,
  class: "conversations-list"
}, ye = { class: "conversation-card-item" }, fe = { class: "conversation-time" }, we = ["onClick"], ke = { class: "conversation-question" }, be = { class: "conversation-text" }, Ce = {
  key: 0,
  class: "conversation-screenshot"
}, xe = ["src", "onClick"], $e = { class: "conversation-answer" }, De = ["innerHTML"], Ae = { class: "conversation-card-item" }, Te = { class: "conversation-time" }, Se = ["onClick"], Ee = { class: "conversation-question" }, Be = { class: "conversation-text" }, Me = { class: "conversation-answer" }, Le = ["innerHTML"], qe = { class: "follow-up-section" }, Ie = { class: "follow-up-chat" }, Pe = { class: "follow-up-input" }, Oe = ["onUpdate:modelValue", "disabled", "onKeydown"], Ue = ["onClick", "disabled"], Fe = { key: 0 }, ze = { key: 1 }, Ne = { class: "api-modal-body" }, Re = {
  key: 0,
  class: "api-payload-content"
}, Ve = { class: "api-section" }, Ze = { class: "api-subsection" }, je = { class: "subsection-value" }, Ge = {
  key: 0,
  class: "api-subsection"
}, He = { class: "api-code-block" }, Ke = {
  key: 1,
  class: "api-subsection"
}, Qe = {
  key: 0,
  class: "prompt-text"
}, Xe = { class: "api-code-block" }, Je = {
  key: 1,
  class: "prompt-image"
}, Ye = { class: "image-url-display" }, We = { class: "image-detail" }, et = ["href"], tt = {
  key: 0,
  class: "image-detail"
}, st = {
  key: 2,
  class: "api-subsection"
}, ot = { class: "parameters-grid" }, nt = { class: "param-key" }, it = { class: "param-value" }, at = { class: "api-section" }, lt = {
  key: 0,
  class: "api-subsection"
}, rt = { class: "response-metadata" }, dt = { class: "metadata-item" }, ct = { class: "metadata-value" }, ut = { class: "metadata-item" }, vt = { class: "metadata-value" }, pt = { class: "metadata-item" }, mt = { class: "metadata-value" }, _t = {
  key: 0,
  class: "api-subsection"
}, ht = { class: "parameters-grid" }, gt = { class: "param-item" }, yt = { class: "param-value" }, ft = { class: "param-item" }, wt = { class: "param-value" }, kt = { class: "param-item" }, bt = { class: "param-value" }, Ct = {
  key: 1,
  class: "api-subsection"
}, xt = { class: "api-code-block" }, $t = {
  key: 1,
  class: "api-no-data"
}, Dt = { class: "screenshot-modal-body" }, At = ["src"], Tt = /* @__PURE__ */ j({
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
  setup(g, { emit: E }) {
    const r = g, A = E, p = k({}), y = k({}), S = k({}), x = k({}), T = k(!1), a = k(null), d = k(!1), _ = k(null), B = O(() => r.date ? new Date(r.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }) : ""), M = (s) => {
      var u, c;
      const t = new Date(s), o = ((c = (((u = t.toString().match(/\(([A-Za-z\s].*)\)/)) == null ? void 0 : u[1]) ?? "").match(/[A-Z]/g)) == null ? void 0 : c.join("")) ?? "";
      return t.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !0
      }) + " " + o;
    };
    function N(s) {
      const t = [];
      let o = s.replace(/```([\s\S]*?)```/g, (u) => (t.push(u.trim()), `___CODE_BLOCK_${t.length - 1}___`));
      return o = o.replace(/^\s*\#\#\#\#\s+(.*)$/gm, "<h4>$1</h4>"), o = o.replace(/^\s*\#\#\#\s+(.*)$/gm, "<h3>$1</h3>"), o = o.replace(/^\s*\#\#\s+(.*)$/gm, "<h2>$1</h2>"), o = o.replace(/^\s*\#\s+(.*)$/gm, "<h1>$1</h1>"), o = o.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"), o = o.replace(/^[\s]*[•\-]\s+(.*)$/gm, "<li>$1</li>"), o = o.replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>"), o = o.replace(/\n/g, "<br/>"), o = o.replace(/<\/(h[1-4]|ul)><br\/>/g, "</$1>"), o = o.replace(/<ul><br\/>/g, "<ul>"), o = o.replace(/<\/ul><br\/>/g, "</ul>"), t.forEach((u, c) => {
        o = o.replace(
          `___CODE_BLOCK_${c}___`,
          `<pre><code>${u.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`
        );
      }), `
    <section>
      ${o}
    </section>
  `.trim();
    }
    const Z = async (s) => {
      if (!r.supabaseClient || !r.userId) {
        console.warn("Supabase client or user ID not available");
        return;
      }
      if (!(y.value[s] || S.value[s])) {
        S.value[s] = !0;
        try {
          const { data: t, error: o } = await r.supabaseClient.schema("hf").from("ai_conversation_followups").select("*").eq("conversation_id", s).order("created_at", { ascending: !0 });
          if (o) throw o;
          y.value[s] = t || [];
        } catch (t) {
          console.error("Error loading follow-ups:", t), y.value[s] = [];
        } finally {
          S.value[s] = !1;
        }
      }
    }, f = async () => {
      !r.conversations || r.conversations.length === 0 || await Promise.all(
        r.conversations.map((s) => Z(s.id))
      );
    };
    J(() => {
      f();
    }), Q(() => r.conversations, () => {
      f();
    }, { deep: !0 }), Q(() => r.isOpen, (s) => {
      if (s) {
        f();
        const t = (o) => {
          o.key === "Escape" && b();
        };
        return document.addEventListener("keydown", t), () => document.removeEventListener("keydown", t);
      }
    });
    const m = async (s) => {
      var o;
      const t = (o = p.value[s.id]) == null ? void 0 : o.trim();
      if (!(!t || !r.supabaseClient || !r.userId)) {
        x.value[s.id] = !0;
        try {
          const u = await fetch("https://www.y2k.fund/api/ai-analyze", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              question: t,
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
          if (!u.ok)
            throw new Error("Failed to get AI response");
          const c = await u.json(), { data: l, error: D } = await r.supabaseClient.schema("hf").from("ai_conversation_followups").insert({
            conversation_id: s.id,
            user_id: r.userId,
            question: t,
            response: c.response,
            api_payload: c.api_payload || null
          }).select().single();
          if (D) throw D;
          y.value[s.id] || (y.value[s.id] = []), y.value[s.id].push(l), p.value[s.id] = "";
        } catch (u) {
          console.error("Error sending follow-up:", u), alert("Failed to send follow-up question. Please try again.");
        } finally {
          x.value[s.id] = !1;
        }
      }
    }, b = () => {
      A("close");
    }, $ = (s) => {
      _.value = s, d.value = !0;
    }, L = () => {
      d.value = !1, _.value = null;
    }, U = (s) => {
      s.api_payload ? (a.value = s.api_payload, T.value = !0) : alert("No API payload data available for this conversation.");
    }, R = () => {
      T.value = !1, a.value = null;
    }, C = () => {
      var o, u;
      const s = (u = (o = a.value) == null ? void 0 : o.request_sent_to_openrouter) == null ? void 0 : u.messages;
      if (!s || !Array.isArray(s)) return "";
      const t = s.find((c) => c.role === "system");
      return (t == null ? void 0 : t.content) || "";
    }, I = () => {
      var o, u;
      const s = (u = (o = a.value) == null ? void 0 : o.request_sent_to_openrouter) == null ? void 0 : u.messages;
      if (!s || !Array.isArray(s)) return [];
      const t = s.find((c) => c.role === "user");
      return !t || !t.content || !Array.isArray(t.content) ? [] : t.content.map((c) => c.type === "text" ? {
        type: "text",
        content: c.text
      } : c.type === "image_url" && c.image_url ? {
        type: "image_url",
        url: c.image_url.url || c.image_url,
        detail: c.image_url.detail || "high"
      } : { type: "unknown" }).filter((c) => c.type !== "unknown");
    }, H = () => {
      var o, u, c;
      const s = (u = (o = a.value) == null ? void 0 : o.response_received_from_openrouter) == null ? void 0 : u.raw_response;
      if (!s || !s.choices || !Array.isArray(s.choices)) return "";
      const t = s.choices[0];
      return ((c = t == null ? void 0 : t.message) == null ? void 0 : c.content) || "";
    }, W = (s) => s ? s.length <= 60 ? s : s.substring(0, 30) + "..." + s.substring(s.length - 27) : "N/A";
    return (s, t) => {
      var o, u, c;
      return i(), n(q, null, [
        e("div", ue, [
          e("div", ve, [
            e("h2", pe, "Conversations - " + v(B.value), 1),
            e("button", {
              class: "card-close",
              onClick: t[0] || (t[0] = (l) => s.$emit("close")),
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
          e("div", me, [
            g.loading ? (i(), n("div", _e, [...t[4] || (t[4] = [
              e("div", { class: "spinner" }, null, -1),
              e("p", null, "Loading conversations...", -1)
            ])])) : !g.conversations || g.conversations.length === 0 ? (i(), n("div", he, [...t[5] || (t[5] = [
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
            ])])) : (i(), n("div", ge, [
              (i(!0), n(q, null, P(g.conversations, (l) => {
                var D, K;
                return i(), n("div", {
                  key: l.id
                }, [
                  e("div", ye, [
                    e("div", fe, [
                      F(v(M(l.created_at)) + " ", 1),
                      l.api_payload ? (i(), n("button", {
                        key: 0,
                        onClick: (w) => U(l),
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
                      ])], 8, we)) : h("", !0)
                    ]),
                    e("div", ke, [
                      t[7] || (t[7] = e("div", { class: "conversation-label" }, "Question:", -1)),
                      e("div", be, v(l.question), 1)
                    ]),
                    l.screenshot_url ? (i(), n("div", Ce, [
                      e("img", {
                        src: l.screenshot_url,
                        alt: "Screenshot",
                        onClick: (w) => $(l.screenshot_url)
                      }, null, 8, xe)
                    ])) : h("", !0),
                    e("div", $e, [
                      t[8] || (t[8] = e("div", { class: "conversation-label" }, "Answer:", -1)),
                      e("div", {
                        class: "conversation-text",
                        innerHTML: N(l.response)
                      }, null, 8, De)
                    ])
                  ]),
                  ((D = y.value[l.id]) == null ? void 0 : D.length) > 0 ? (i(!0), n(q, { key: 0 }, P(y.value[l.id], (w) => (i(), n("div", {
                    key: w.id,
                    style: { "margin-top": "30px !important" }
                  }, [
                    e("div", Ae, [
                      e("div", Te, [
                        F(v(M(w.created_at)) + " ", 1),
                        w.api_payload ? (i(), n("button", {
                          key: 0,
                          onClick: (Ft) => U(w),
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
                        ])], 8, Se)) : h("", !0)
                      ]),
                      e("div", Ee, [
                        t[10] || (t[10] = e("div", { class: "conversation-label" }, "Question:", -1)),
                        e("div", Be, v(w.question), 1)
                      ]),
                      e("div", Me, [
                        t[11] || (t[11] = e("div", { class: "conversation-label" }, "Answer:", -1)),
                        e("div", {
                          class: "conversation-text",
                          innerHTML: N(w.response)
                        }, null, 8, Le)
                      ])
                    ])
                  ]))), 128)) : h("", !0),
                  e("div", qe, [
                    e("div", Ie, [
                      e("div", Pe, [
                        te(e("textarea", {
                          "onUpdate:modelValue": (w) => p.value[l.id] = w,
                          placeholder: "Type your follow-up question...",
                          rows: "3",
                          disabled: x.value[l.id],
                          onKeydown: [
                            X(z((w) => m(l), ["ctrl"]), ["enter"]),
                            X(z((w) => m(l), ["meta"]), ["enter"])
                          ]
                        }, null, 40, Oe), [
                          [se, p.value[l.id]]
                        ]),
                        e("button", {
                          onClick: (w) => m(l),
                          disabled: !((K = p.value[l.id]) != null && K.trim()) || x.value[l.id],
                          class: "send-button"
                        }, [
                          x.value[l.id] ? (i(), n("span", ze, [...t[13] || (t[13] = [
                            e("div", { class: "spinner-small" }, null, -1),
                            F(" Sending... ", -1)
                          ])])) : (i(), n("span", Fe, [...t[12] || (t[12] = [
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
                            F(" Send ", -1)
                          ])]))
                        ], 8, Ue)
                      ])
                    ])
                  ])
                ]);
              }), 128))
            ]))
          ])
        ]),
        T.value ? (i(), n("div", {
          key: 0,
          class: "api-modal-overlay",
          onClick: R
        }, [
          e("div", {
            class: "api-modal-container",
            onClick: t[1] || (t[1] = z(() => {
            }, ["stop"]))
          }, [
            e("div", { class: "api-modal-header" }, [
              t[15] || (t[15] = e("h3", { class: "api-modal-title" }, "🔍 API Request & Response Details", -1)),
              e("button", {
                class: "api-modal-close",
                onClick: R,
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
            e("div", Ne, [
              a.value ? (i(), n("div", Re, [
                e("div", Ve, [
                  t[24] || (t[24] = e("h4", { class: "api-section-title" }, "📤 Request Sent to OpenRouter", -1)),
                  e("div", Ze, [
                    t[16] || (t[16] = e("div", { class: "subsection-label" }, "Model", -1)),
                    e("div", je, v(((o = a.value.request_sent_to_openrouter) == null ? void 0 : o.model) || "N/A"), 1)
                  ]),
                  C() ? (i(), n("div", Ge, [
                    t[17] || (t[17] = e("div", { class: "subsection-label" }, "System Prompt", -1)),
                    e("div", He, [
                      e("pre", null, [
                        e("code", null, v(C()), 1)
                      ])
                    ])
                  ])) : h("", !0),
                  I().length > 0 ? (i(), n("div", Ke, [
                    t[22] || (t[22] = e("div", { class: "subsection-label" }, "User Message", -1)),
                    (i(!0), n(q, null, P(I(), (l, D) => (i(), n("div", {
                      key: D,
                      class: "user-prompt-item"
                    }, [
                      l.type === "text" ? (i(), n("div", Qe, [
                        t[18] || (t[18] = e("span", { class: "prompt-type-badge" }, "📝 Text", -1)),
                        e("div", Xe, [
                          e("pre", null, [
                            e("code", null, v(l.content), 1)
                          ])
                        ])
                      ])) : l.type === "image_url" ? (i(), n("div", Je, [
                        t[21] || (t[21] = e("span", { class: "prompt-type-badge" }, "🖼️ Image", -1)),
                        e("div", Ye, [
                          e("div", We, [
                            t[19] || (t[19] = e("strong", null, "URL:", -1)),
                            e("a", {
                              href: l.url,
                              target: "_blank",
                              class: "image-link"
                            }, v(W(l.url || "")), 9, et)
                          ]),
                          l.detail ? (i(), n("div", tt, [
                            t[20] || (t[20] = e("strong", null, "Detail Level:", -1)),
                            F(" " + v(l.detail), 1)
                          ])) : h("", !0)
                        ])
                      ])) : h("", !0)
                    ]))), 128))
                  ])) : h("", !0),
                  (u = a.value.request_sent_to_openrouter) != null && u.parameters ? (i(), n("div", st, [
                    t[23] || (t[23] = e("div", { class: "subsection-label" }, "Parameters", -1)),
                    e("div", ot, [
                      (i(!0), n(q, null, P(a.value.request_sent_to_openrouter.parameters, (l, D) => (i(), n("div", {
                        key: D,
                        class: "param-item"
                      }, [
                        e("span", nt, v(D) + ":", 1),
                        e("span", it, v(l), 1)
                      ]))), 128))
                    ])
                  ])) : h("", !0)
                ]),
                e("div", at, [
                  t[33] || (t[33] = e("h4", { class: "api-section-title" }, "📥 Response Received from OpenRouter", -1)),
                  (c = a.value.response_received_from_openrouter) != null && c.raw_response ? (i(), n("div", lt, [
                    e("div", rt, [
                      e("div", dt, [
                        t[25] || (t[25] = e("span", { class: "metadata-label" }, "ID:", -1)),
                        e("span", ct, v(a.value.response_received_from_openrouter.raw_response.id), 1)
                      ]),
                      e("div", ut, [
                        t[26] || (t[26] = e("span", { class: "metadata-label" }, "Model:", -1)),
                        e("span", vt, v(a.value.response_received_from_openrouter.raw_response.model), 1)
                      ]),
                      e("div", pt, [
                        t[27] || (t[27] = e("span", { class: "metadata-label" }, "Provider:", -1)),
                        e("span", mt, v(a.value.response_received_from_openrouter.raw_response.provider), 1)
                      ])
                    ]),
                    a.value.response_received_from_openrouter.raw_response.usage ? (i(), n("div", _t, [
                      t[31] || (t[31] = e("div", { class: "subsection-label" }, "Token Usage", -1)),
                      e("div", ht, [
                        e("div", gt, [
                          t[28] || (t[28] = e("span", { class: "param-key" }, "Prompt Tokens:", -1)),
                          e("span", yt, v(a.value.response_received_from_openrouter.raw_response.usage.prompt_tokens), 1)
                        ]),
                        e("div", ft, [
                          t[29] || (t[29] = e("span", { class: "param-key" }, "Completion Tokens:", -1)),
                          e("span", wt, v(a.value.response_received_from_openrouter.raw_response.usage.completion_tokens), 1)
                        ]),
                        e("div", kt, [
                          t[30] || (t[30] = e("span", { class: "param-key" }, "Total Tokens:", -1)),
                          e("span", bt, v(a.value.response_received_from_openrouter.raw_response.usage.total_tokens), 1)
                        ])
                      ])
                    ])) : h("", !0),
                    H() ? (i(), n("div", Ct, [
                      t[32] || (t[32] = e("div", { class: "subsection-label" }, "Response Content", -1)),
                      e("div", xt, [
                        e("pre", null, [
                          e("code", null, v(H()), 1)
                        ])
                      ])
                    ])) : h("", !0)
                  ])) : h("", !0)
                ])
              ])) : (i(), n("div", $t, [...t[34] || (t[34] = [
                e("p", null, "No API payload data available for this conversation.", -1)
              ])]))
            ])
          ])
        ])) : h("", !0),
        d.value ? (i(), n("div", {
          key: 1,
          class: "screenshot-modal-overlay",
          onClick: L
        }, [
          e("div", {
            class: "screenshot-modal-container",
            onClick: t[2] || (t[2] = z(() => {
            }, ["stop"]))
          }, [
            e("div", { class: "screenshot-modal-header" }, [
              t[36] || (t[36] = e("h3", { class: "screenshot-modal-title" }, "📸 Screenshot", -1)),
              e("button", {
                class: "screenshot-modal-close",
                onClick: L,
                "aria-label": "Close"
              }, [...t[35] || (t[35] = [
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
            e("div", Dt, [
              _.value ? (i(), n("img", {
                key: 0,
                src: _.value,
                alt: "Screenshot",
                class: "screenshot-image"
              }, null, 8, At)) : h("", !0)
            ])
          ])
        ])) : h("", !0)
      ], 64);
    };
  }
}), Rt = /* @__PURE__ */ G(Tt, [["__scopeId", "data-v-499f695b"]]), St = { class: "dropdown-header" }, Et = { class: "dropdown-title" }, Bt = { class: "dropdown-body" }, Mt = {
  key: 0,
  class: "dropdown-loading"
}, Lt = {
  key: 1,
  class: "dropdown-empty"
}, qt = {
  key: 2,
  class: "conversation-list"
}, It = ["onClick"], Pt = { class: "conversation-time" }, Ot = { class: "conversation-question-text" }, Ut = /* @__PURE__ */ j({
  __name: "ConversationDropdown",
  props: {
    conversations: {},
    position: { default: () => ({ x: 0, y: 0 }) },
    isOpen: { type: Boolean },
    loading: { type: Boolean, default: !1 },
    date: {}
  },
  emits: ["conversation-selected", "close"],
  setup(g, { emit: E }) {
    const r = g, A = E, p = O(() => [...r.conversations].sort((a, d) => new Date(a.created_at).getTime() - new Date(d.created_at).getTime())), y = O(() => r.date ? new Date(r.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }) : r.conversations.length > 0 ? new Date(r.conversations[0].created_at).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }) : "Conversations"), S = O(() => {
      const a = r.position.x, d = r.position.y + 60;
      return {
        position: "fixed",
        left: `${a}px`,
        top: `${d}px`,
        transform: "translateX(-50%)"
        // Center horizontally on click point
      };
    }), x = (a) => {
      var B, M;
      const d = new Date(a), _ = ((M = (((B = d.toString().match(/\(([A-Za-z\s].*)\)/)) == null ? void 0 : B[1]) ?? "").match(/[A-Z]/g)) == null ? void 0 : M.join("")) ?? "";
      return d.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !0
      }) + (_ ? " " + _ : "");
    }, T = (a) => {
      A("conversation-selected", a);
    };
    return (a, d) => g.isOpen ? (i(), n("div", {
      key: 0,
      class: "dropdown-overlay",
      onClick: d[2] || (d[2] = (_) => a.$emit("close"))
    }, [
      e("div", {
        class: "dropdown-container",
        style: Y(S.value),
        onClick: d[1] || (d[1] = z(() => {
        }, ["stop"]))
      }, [
        e("div", St, [
          e("h3", Et, v(y.value), 1),
          e("button", {
            class: "dropdown-close",
            onClick: d[0] || (d[0] = (_) => a.$emit("close")),
            "aria-label": "Close"
          }, [...d[3] || (d[3] = [
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
        e("div", Bt, [
          g.loading ? (i(), n("div", Mt, [...d[4] || (d[4] = [
            e("div", { class: "spinner-small" }, null, -1),
            e("span", null, "Loading...", -1)
          ])])) : p.value.length === 0 ? (i(), n("div", Lt, [...d[5] || (d[5] = [
            e("p", null, "No conversations found", -1)
          ])])) : (i(), n("div", qt, [
            (i(!0), n(q, null, P(p.value, (_) => (i(), n("div", {
              key: _.id,
              class: "conversation-item",
              onClick: (B) => T(_.id)
            }, [
              e("div", Pt, v(x(_.created_at)), 1),
              d[6] || (d[6] = e("div", { class: "conversation-divider" }, "|", -1)),
              e("div", Ot, v(_.question), 1)
            ], 8, It))), 128))
          ]))
        ])
      ], 4)
    ])) : h("", !0);
  }
}), Vt = /* @__PURE__ */ G(Ut, [["__scopeId", "data-v-1c5ad062"]]);
export {
  Nt as AnalyzeTimeline,
  Vt as ConversationDropdown,
  Rt as aiAnalyseTimelineConversationCard,
  Nt as default
};
