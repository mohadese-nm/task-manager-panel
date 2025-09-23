import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { a as useSeoMeta } from "./v3-kZLuQu14.js";
import { V as VContainer } from "./VContainer-CZ2nQSIP.js";
import { V as VCard, a as VCardTitle, b as VCardText } from "./VCard-CH2KsXVv.js";
import "C:/Projects/tdp/node_modules/@unhead/vue/dist/index.mjs";
import "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/Projects/tdp/node_modules/hookable/dist/index.mjs";
import "C:/Projects/tdp/node_modules/unctx/dist/index.mjs";
import "C:/Projects/tdp/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Projects/tdp/node_modules/radix3/dist/index.mjs";
import "C:/Projects/tdp/node_modules/defu/dist/defu.mjs";
import "C:/Projects/tdp/node_modules/ufo/dist/index.mjs";
import "C:/Projects/tdp/node_modules/klona/dist/index.mjs";
import "./VGrid-DYUQajch.js";
import "./index-SOHsZWxA.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "خانه",
      description: "صفحه خانه"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, mergeProps({ class: "py-8" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, {
              elevation: "1",
              dir: "rtl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`خوش آمدید`);
                      } else {
                        return [
                          createTextVNode("خوش آمدید")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` اگر ادمین باشید، آیتم &quot;برای انجام&quot; در منو نمایش داده می‌شود `);
                      } else {
                        return [
                          createTextVNode(' اگر ادمین باشید، آیتم "برای انجام" در منو نمایش داده می‌شود ')
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("خوش آمدید")
                      ]),
                      _: 1
                    }),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createTextVNode(' اگر ادمین باشید، آیتم "برای انجام" در منو نمایش داده می‌شود ')
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
              createVNode(VCard, {
                elevation: "1",
                dir: "rtl"
              }, {
                default: withCtx(() => [
                  createVNode(VCardTitle, null, {
                    default: withCtx(() => [
                      createTextVNode("خوش آمدید")
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createTextVNode(' اگر ادمین باشید، آیتم "برای انجام" در منو نمایش داده می‌شود ')
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-DoZU3K8G.js.map
