import { defineComponent, ref, mergeProps, withCtx, createTextVNode, createVNode, unref, isRef, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { u as useAuthStore } from "./auth-D63m7rqX.js";
import "C:/Projects/tdp/node_modules/hookable/dist/index.mjs";
import { n as navigateTo } from "../server.mjs";
import { a as useSeoMeta } from "./v3-kZLuQu14.js";
import { V as VContainer } from "./VContainer-CZ2nQSIP.js";
import { V as VCard, a as VCardTitle, b as VCardText, c as VCardActions } from "./VCard-CH2KsXVv.js";
import { V as VAlert } from "./VAlert-COT_yHdo.js";
import { V as VTextField } from "./VTextField-CZ6AaXgr.js";
import { V as VSpacer, a as VBtn } from "./index-DFeFuJj2.js";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/Projects/tdp/node_modules/unctx/dist/index.mjs";
import "C:/Projects/tdp/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Projects/tdp/node_modules/radix3/dist/index.mjs";
import "C:/Projects/tdp/node_modules/defu/dist/defu.mjs";
import "C:/Projects/tdp/node_modules/ufo/dist/index.mjs";
import "C:/Projects/tdp/node_modules/klona/dist/index.mjs";
import "C:/Projects/tdp/node_modules/@unhead/vue/dist/index.mjs";
import "./VGrid-DYUQajch.js";
import "./index-SOHsZWxA.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const username = ref("");
    const password = ref("");
    const show = ref(false);
    const auth = useAuthStore();
    function fill(type) {
      if (type === "admin") {
        username.value = "admin";
        password.value = "admin123";
      } else {
        username.value = "guest";
        password.value = "guest123";
      }
    }
    function login() {
      const ok = auth.loginWithCredentials(username.value, password.value);
      if (ok) navigateTo("/");
      else alert("اطلاعات ورود نادرست است");
    }
    useSeoMeta({ title: "ورود" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, mergeProps({
        class: "d-flex align-center justify-center",
        style: { "min-height": "70vh" }
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, { "max-width": "480" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`ورود`);
                      } else {
                        return [
                          createTextVNode("ورود")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAlert, {
                          type: "info",
                          variant: "tonal",
                          class: "mb-4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` نام‌های کاربری و رمز عبور: <div class="mt-2"${_scopeId4}>- admin / admin123 (دارای پرمیشن منوی &quot;برای انجام&quot;)</div><div${_scopeId4}>- guest / guest123 (بدون پرمیشن)</div>`);
                            } else {
                              return [
                                createTextVNode(" نام‌های کاربری و رمز عبور: "),
                                createVNode("div", { class: "mt-2" }, '- admin / admin123 (دارای پرمیشن منوی "برای انجام")'),
                                createVNode("div", null, "- guest / guest123 (بدون پرمیشن)")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(username),
                          "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
                          label: "نام کاربری",
                          "prepend-inner-icon": "mdi-account"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(password),
                          "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                          type: unref(show) ? "text" : "password",
                          label: "رمز عبور",
                          "prepend-inner-icon": "mdi-lock",
                          "append-inner-icon": unref(show) ? "mdi-eye-off" : "mdi-eye",
                          "onClick:appendInner": ($event) => show.value = !unref(show)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAlert, {
                            type: "info",
                            variant: "tonal",
                            class: "mb-4"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" نام‌های کاربری و رمز عبور: "),
                              createVNode("div", { class: "mt-2" }, '- admin / admin123 (دارای پرمیشن منوی "برای انجام")'),
                              createVNode("div", null, "- guest / guest123 (بدون پرمیشن)")
                            ]),
                            _: 1
                          }),
                          createVNode(VTextField, {
                            modelValue: unref(username),
                            "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
                            label: "نام کاربری",
                            "prepend-inner-icon": "mdi-account"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(VTextField, {
                            modelValue: unref(password),
                            "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                            type: unref(show) ? "text" : "password",
                            label: "رمز عبور",
                            "prepend-inner-icon": "mdi-lock",
                            "append-inner-icon": unref(show) ? "mdi-eye-off" : "mdi-eye",
                            "onClick:appendInner": ($event) => show.value = !unref(show)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VSpacer, null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          variant: "tonal",
                          onClick: ($event) => fill("admin")
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`ادمین`);
                            } else {
                              return [
                                createTextVNode("ادمین")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          variant: "tonal",
                          onClick: ($event) => fill("guest")
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`مهمان`);
                            } else {
                              return [
                                createTextVNode("مهمان")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          variant: "elevated",
                          color: "blue",
                          onClick: login
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`ورود`);
                            } else {
                              return [
                                createTextVNode("ورود")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VSpacer),
                          createVNode(VBtn, {
                            variant: "tonal",
                            onClick: ($event) => fill("admin")
                          }, {
                            default: withCtx(() => [
                              createTextVNode("ادمین")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(VBtn, {
                            variant: "tonal",
                            onClick: ($event) => fill("guest")
                          }, {
                            default: withCtx(() => [
                              createTextVNode("مهمان")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(VBtn, {
                            variant: "elevated",
                            color: "blue",
                            onClick: login
                          }, {
                            default: withCtx(() => [
                              createTextVNode("ورود")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("ورود")
                      ]),
                      _: 1
                    }),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createVNode(VAlert, {
                          type: "info",
                          variant: "tonal",
                          class: "mb-4"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" نام‌های کاربری و رمز عبور: "),
                            createVNode("div", { class: "mt-2" }, '- admin / admin123 (دارای پرمیشن منوی "برای انجام")'),
                            createVNode("div", null, "- guest / guest123 (بدون پرمیشن)")
                          ]),
                          _: 1
                        }),
                        createVNode(VTextField, {
                          modelValue: unref(username),
                          "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
                          label: "نام کاربری",
                          "prepend-inner-icon": "mdi-account"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(VTextField, {
                          modelValue: unref(password),
                          "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                          type: unref(show) ? "text" : "password",
                          label: "رمز عبور",
                          "prepend-inner-icon": "mdi-lock",
                          "append-inner-icon": unref(show) ? "mdi-eye-off" : "mdi-eye",
                          "onClick:appendInner": ($event) => show.value = !unref(show)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode(VSpacer),
                        createVNode(VBtn, {
                          variant: "tonal",
                          onClick: ($event) => fill("admin")
                        }, {
                          default: withCtx(() => [
                            createTextVNode("ادمین")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(VBtn, {
                          variant: "tonal",
                          onClick: ($event) => fill("guest")
                        }, {
                          default: withCtx(() => [
                            createTextVNode("مهمان")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(VBtn, {
                          variant: "elevated",
                          color: "blue",
                          onClick: login
                        }, {
                          default: withCtx(() => [
                            createTextVNode("ورود")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, { "max-width": "480" }, {
                default: withCtx(() => [
                  createVNode(VCardTitle, null, {
                    default: withCtx(() => [
                      createTextVNode("ورود")
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createVNode(VAlert, {
                        type: "info",
                        variant: "tonal",
                        class: "mb-4"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" نام‌های کاربری و رمز عبور: "),
                          createVNode("div", { class: "mt-2" }, '- admin / admin123 (دارای پرمیشن منوی "برای انجام")'),
                          createVNode("div", null, "- guest / guest123 (بدون پرمیشن)")
                        ]),
                        _: 1
                      }),
                      createVNode(VTextField, {
                        modelValue: unref(username),
                        "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
                        label: "نام کاربری",
                        "prepend-inner-icon": "mdi-account"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(VTextField, {
                        modelValue: unref(password),
                        "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                        type: unref(show) ? "text" : "password",
                        label: "رمز عبور",
                        "prepend-inner-icon": "mdi-lock",
                        "append-inner-icon": unref(show) ? "mdi-eye-off" : "mdi-eye",
                        "onClick:appendInner": ($event) => show.value = !unref(show)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VSpacer),
                      createVNode(VBtn, {
                        variant: "tonal",
                        onClick: ($event) => fill("admin")
                      }, {
                        default: withCtx(() => [
                          createTextVNode("ادمین")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(VBtn, {
                        variant: "tonal",
                        onClick: ($event) => fill("guest")
                      }, {
                        default: withCtx(() => [
                          createTextVNode("مهمان")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(VBtn, {
                        variant: "elevated",
                        color: "blue",
                        onClick: login
                      }, {
                        default: withCtx(() => [
                          createTextVNode("ورود")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=login-ByCEyeG5.js.map
