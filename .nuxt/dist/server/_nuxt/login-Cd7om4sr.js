import { mergeProps, withCtx, renderSlot, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import { V as VApp, a as VMain } from "./VMain-DoCgzJ8d.js";
import { V as VContainer } from "./VContainer-CZ2nQSIP.js";
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
import "./ssrBoot-BGRvKyVu.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(ssrRenderComponent(VApp, mergeProps({ class: "app-bg" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VMain, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VContainer, {
                class: "d-flex align-center justify-center",
                style: { "min-height": "100vh" }
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push4, _parent4, _scopeId3);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default")
                    ];
                  }
                }),
                _: 3
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VContainer, {
                  class: "d-flex align-center justify-center",
                  style: { "min-height": "100vh" }
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "default")
                  ]),
                  _: 3
                })
              ];
            }
          }),
          _: 3
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VMain, null, {
            default: withCtx(() => [
              createVNode(VContainer, {
                class: "d-flex align-center justify-center",
                style: { "min-height": "100vh" }
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              })
            ]),
            _: 3
          })
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  login as default
};
//# sourceMappingURL=login-Cd7om4sr.js.map
