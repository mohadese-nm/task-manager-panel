import { createVNode, normalizeStyle, normalizeClass, createElementVNode, shallowRef, computed, ref, watch, toRef, watchEffect, mergeProps, onScopeDispose, readonly, nextTick, Fragment, Transition, defineComponent, withCtx, createTextVNode, unref, createBlock, openBlock, createCommentVNode, renderSlot, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { useRouter as useRouter$1 } from "vue-router";
import { u as useAuthStore } from "./auth-D63m7rqX.js";
import { ac as storeToRefs, g as genericComponent, p as propsFactory, m as makeThemeProps, f as provideTheme, d as useRtl, e as provideDefaults, j as convertToUnit, C as clamp, D as useProxiedModel, E as useToggleScope, Q as omit, Z as useDisplay, Y as makeDisplayProps } from "../server.mjs";
import { V as VApp, a as VMain } from "./VMain-DoCgzJ8d.js";
import { a as useRender, m as makeTagProps, c as makeComponentProps, u as useDimension, b as makeDimensionProps } from "./VGrid-DYUQajch.js";
import { a as useSsrBoot, b as useLayoutItem, m as makeLayoutItemProps, c as createLayout, d as makeLayoutProps } from "./ssrBoot-BGRvKyVu.js";
import { g as VExpandTransition, h as makeVBtnProps, a as VBtn, V as VSpacer } from "./index-DFeFuJj2.js";
import { o as makeRoundedProps, s as makeElevationProps, t as makeBorderProps, z as useBackgroundColor, u as useBorder, f as useElevation, j as useRounded, w as VImg, b as VDefaultsProvider, J as useRouter, N as toPhysical } from "./index-SOHsZWxA.js";
import { a as useScopeId, m as makeDelayProps, u as useDelay, V as VList, b as VListItem, f as VDivider } from "./scopeId-DHScbPzj.js";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/Projects/tdp/node_modules/hookable/dist/index.mjs";
import "C:/Projects/tdp/node_modules/unctx/dist/index.mjs";
import "C:/Projects/tdp/node_modules/h3/dist/index.mjs";
import "C:/Projects/tdp/node_modules/radix3/dist/index.mjs";
import "C:/Projects/tdp/node_modules/defu/dist/defu.mjs";
import "C:/Projects/tdp/node_modules/ufo/dist/index.mjs";
import "C:/Projects/tdp/node_modules/klona/dist/index.mjs";
const usePermission = () => {
  const auth = useAuthStore();
  const { currentUser } = storeToRefs(auth);
  const can = (perm) => {
    return auth.hasPermission(perm);
  };
  return { currentUser, can };
};
const makeVToolbarTitleProps = propsFactory({
  text: String,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VToolbarTitle");
const VToolbarTitle = genericComponent()({
  name: "VToolbarTitle",
  props: makeVToolbarTitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const hasText = !!(slots.default || slots.text || props.text);
      return createVNode(props.tag, {
        "class": normalizeClass(["v-toolbar-title", props.class]),
        "style": normalizeStyle(props.style)
      }, {
        default: () => [hasText && createElementVNode("div", {
          "class": "v-toolbar-title__placeholder"
        }, [slots.text ? slots.text() : props.text, slots.default?.()])]
      });
    });
    return {};
  }
});
const allowedDensities = [null, "prominent", "default", "comfortable", "compact"];
const makeVToolbarProps = propsFactory({
  absolute: Boolean,
  collapse: Boolean,
  color: String,
  density: {
    type: String,
    default: "default",
    validator: (v) => allowedDensities.includes(v)
  },
  extended: {
    type: Boolean,
    default: null
  },
  extensionHeight: {
    type: [Number, String],
    default: 48
  },
  flat: Boolean,
  floating: Boolean,
  height: {
    type: [Number, String],
    default: 64
  },
  image: String,
  title: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: "header"
  }),
  ...makeThemeProps()
}, "VToolbar");
const VToolbar = genericComponent()({
  name: "VToolbar",
  props: makeVToolbarProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      rtlClasses
    } = useRtl();
    const isExtended = shallowRef(props.extended === null ? !!slots.extension?.() : props.extended);
    const contentHeight = computed(() => parseInt(Number(props.height) + (props.density === "prominent" ? Number(props.height) : 0) - (props.density === "comfortable" ? 8 : 0) - (props.density === "compact" ? 16 : 0), 10));
    const extensionHeight = computed(() => isExtended.value ? parseInt(Number(props.extensionHeight) + (props.density === "prominent" ? Number(props.extensionHeight) : 0) - (props.density === "comfortable" ? 4 : 0) - (props.density === "compact" ? 8 : 0), 10) : 0);
    provideDefaults({
      VBtn: {
        variant: "text"
      }
    });
    useRender(() => {
      const hasTitle = !!(props.title || slots.title);
      const hasImage = !!(slots.image || props.image);
      const extension = slots.extension?.();
      isExtended.value = props.extended === null ? !!extension : props.extended;
      return createVNode(props.tag, {
        "class": normalizeClass(["v-toolbar", {
          "v-toolbar--absolute": props.absolute,
          "v-toolbar--collapse": props.collapse,
          "v-toolbar--flat": props.flat,
          "v-toolbar--floating": props.floating,
          [`v-toolbar--density-${props.density}`]: true
        }, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, themeClasses.value, rtlClasses.value, props.class]),
        "style": normalizeStyle([backgroundColorStyles.value, props.style])
      }, {
        default: () => [hasImage && createElementVNode("div", {
          "key": "image",
          "class": "v-toolbar__image"
        }, [!slots.image ? createVNode(VImg, {
          "key": "image-img",
          "cover": true,
          "src": props.image
        }, null) : createVNode(VDefaultsProvider, {
          "key": "image-defaults",
          "disabled": !props.image,
          "defaults": {
            VImg: {
              cover: true,
              src: props.image
            }
          }
        }, slots.image)]), createVNode(VDefaultsProvider, {
          "defaults": {
            VTabs: {
              height: convertToUnit(contentHeight.value)
            }
          }
        }, {
          default: () => [createElementVNode("div", {
            "class": "v-toolbar__content",
            "style": {
              height: convertToUnit(contentHeight.value)
            }
          }, [slots.prepend && createElementVNode("div", {
            "class": "v-toolbar__prepend"
          }, [slots.prepend?.()]), hasTitle && createVNode(VToolbarTitle, {
            "key": "title",
            "text": props.title
          }, {
            text: slots.title
          }), slots.default?.(), slots.append && createElementVNode("div", {
            "class": "v-toolbar__append"
          }, [slots.append?.()])])]
        }), createVNode(VDefaultsProvider, {
          "defaults": {
            VTabs: {
              height: convertToUnit(extensionHeight.value)
            }
          }
        }, {
          default: () => [createVNode(VExpandTransition, null, {
            default: () => [isExtended.value && createElementVNode("div", {
              "class": "v-toolbar__extension",
              "style": {
                height: convertToUnit(extensionHeight.value)
              }
            }, [extension])]
          })]
        })]
      });
    });
    return {
      contentHeight,
      extensionHeight
    };
  }
});
const makeScrollProps = propsFactory({
  scrollTarget: {
    type: String
  },
  scrollThreshold: {
    type: [String, Number],
    default: 300
  }
}, "scroll");
function useScroll(props) {
  let args = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    canScroll
  } = args;
  let previousScroll = 0;
  let previousScrollHeight = 0;
  const target = ref(null);
  const currentScroll = shallowRef(0);
  const savedScroll = shallowRef(0);
  const currentThreshold = shallowRef(0);
  const isScrollActive = shallowRef(false);
  const isScrollingUp = shallowRef(false);
  const scrollThreshold = computed(() => {
    return Number(props.scrollThreshold);
  });
  const scrollRatio = computed(() => {
    return clamp((scrollThreshold.value - currentScroll.value) / scrollThreshold.value || 0);
  });
  const onScroll = () => {
    const targetEl = target.value;
    if (!targetEl || canScroll && !canScroll.value) return;
    previousScroll = currentScroll.value;
    currentScroll.value = "window" in targetEl ? targetEl.pageYOffset : targetEl.scrollTop;
    const currentScrollHeight = targetEl instanceof Window ? (void 0).documentElement.scrollHeight : targetEl.scrollHeight;
    if (previousScrollHeight !== currentScrollHeight) {
      previousScrollHeight = currentScrollHeight;
      return;
    }
    isScrollingUp.value = currentScroll.value < previousScroll;
    currentThreshold.value = Math.abs(currentScroll.value - scrollThreshold.value);
  };
  watch(isScrollingUp, () => {
    savedScroll.value = savedScroll.value || currentScroll.value;
  });
  watch(isScrollActive, () => {
    savedScroll.value = 0;
  });
  canScroll && watch(canScroll, onScroll, {
    immediate: true
  });
  return {
    scrollThreshold,
    currentScroll,
    currentThreshold,
    isScrollActive,
    scrollRatio,
    // required only for testing
    // probably can be removed
    // later (2 chars chlng)
    isScrollingUp,
    savedScroll
  };
}
const makeVAppBarProps = propsFactory({
  scrollBehavior: String,
  modelValue: {
    type: Boolean,
    default: true
  },
  location: {
    type: String,
    default: "top",
    validator: (value) => ["top", "bottom"].includes(value)
  },
  ...makeVToolbarProps(),
  ...makeLayoutItemProps(),
  ...makeScrollProps(),
  height: {
    type: [Number, String],
    default: 64
  }
}, "VAppBar");
const VAppBar = genericComponent()({
  name: "VAppBar",
  props: makeVAppBarProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const vToolbarRef = ref();
    const isActive = useProxiedModel(props, "modelValue");
    const scrollBehavior = computed(() => {
      const behavior = new Set(props.scrollBehavior?.split(" ") ?? []);
      return {
        hide: behavior.has("hide"),
        fullyHide: behavior.has("fully-hide"),
        inverted: behavior.has("inverted"),
        collapse: behavior.has("collapse"),
        elevate: behavior.has("elevate"),
        fadeImage: behavior.has("fade-image")
        // shrink: behavior.has('shrink'),
      };
    });
    const canScroll = computed(() => {
      const behavior = scrollBehavior.value;
      return behavior.hide || behavior.fullyHide || behavior.inverted || behavior.collapse || behavior.elevate || behavior.fadeImage || // behavior.shrink ||
      !isActive.value;
    });
    const {
      currentScroll,
      scrollThreshold,
      isScrollingUp,
      scrollRatio
    } = useScroll(props, {
      canScroll
    });
    const canHide = toRef(() => scrollBehavior.value.hide || scrollBehavior.value.fullyHide);
    const isCollapsed = computed(() => props.collapse || scrollBehavior.value.collapse && (scrollBehavior.value.inverted ? scrollRatio.value > 0 : scrollRatio.value === 0));
    const isFlat = computed(() => props.flat || scrollBehavior.value.fullyHide && !isActive.value || scrollBehavior.value.elevate && (scrollBehavior.value.inverted ? currentScroll.value > 0 : currentScroll.value === 0));
    const opacity = computed(() => scrollBehavior.value.fadeImage ? scrollBehavior.value.inverted ? 1 - scrollRatio.value : scrollRatio.value : void 0);
    const height = computed(() => {
      if (scrollBehavior.value.hide && scrollBehavior.value.inverted) return 0;
      const height2 = vToolbarRef.value?.contentHeight ?? 0;
      const extensionHeight = vToolbarRef.value?.extensionHeight ?? 0;
      if (!canHide.value) return height2 + extensionHeight;
      return currentScroll.value < scrollThreshold.value || scrollBehavior.value.fullyHide ? height2 + extensionHeight : height2;
    });
    useToggleScope(() => !!props.scrollBehavior, () => {
      watchEffect(() => {
        if (canHide.value) {
          if (scrollBehavior.value.inverted) {
            isActive.value = currentScroll.value > scrollThreshold.value;
          } else {
            isActive.value = isScrollingUp.value || currentScroll.value < scrollThreshold.value;
          }
        } else {
          isActive.value = true;
        }
      });
    });
    const {
      ssrBootStyles
    } = useSsrBoot();
    const {
      layoutItemStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: toRef(() => props.location),
      layoutSize: height,
      elementSize: shallowRef(void 0),
      active: isActive,
      absolute: toRef(() => props.absolute)
    });
    useRender(() => {
      const toolbarProps = VToolbar.filterProps(props);
      return createVNode(VToolbar, mergeProps({
        "ref": vToolbarRef,
        "class": ["v-app-bar", {
          "v-app-bar--bottom": props.location === "bottom"
        }, props.class],
        "style": [{
          ...layoutItemStyles.value,
          "--v-toolbar-image-opacity": opacity.value,
          height: void 0,
          ...ssrBootStyles.value
        }, props.style]
      }, toolbarProps, {
        "collapse": isCollapsed.value,
        "flat": isFlat.value
      }), slots);
    });
    return {};
  }
});
const makeVAppBarNavIconProps = propsFactory({
  ...omit(makeVBtnProps({
    icon: "$menu",
    variant: "text"
  }), ["spaced"])
}, "VAppBarNavIcon");
const VAppBarNavIcon = genericComponent()({
  name: "VAppBarNavIcon",
  props: makeVAppBarNavIconProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(VBtn, mergeProps(props, {
      "class": ["v-app-bar-nav-icon"]
    }), slots));
    return {};
  }
});
const makeVLayoutProps = propsFactory({
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeLayoutProps()
}, "VLayout");
const VLayout = genericComponent()({
  name: "VLayout",
  props: makeVLayoutProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      layoutClasses,
      layoutStyles,
      getLayoutItem,
      items,
      layoutRef
    } = createLayout(props);
    const {
      dimensionStyles
    } = useDimension(props);
    useRender(() => createElementVNode("div", {
      "ref": layoutRef,
      "class": normalizeClass([layoutClasses.value, props.class]),
      "style": normalizeStyle([dimensionStyles.value, layoutStyles.value, props.style])
    }, [slots.default?.()]));
    return {
      getLayoutItem,
      items
    };
  }
});
function useSticky(_ref) {
  let {
    isSticky,
    layoutItemStyles
  } = _ref;
  const isStuck = shallowRef(false);
  const stuckPosition = shallowRef(0);
  const stickyStyles = computed(() => {
    const side = typeof isStuck.value === "boolean" ? "top" : isStuck.value;
    return [isSticky.value ? {
      top: "auto",
      bottom: "auto",
      height: void 0
    } : void 0, isStuck.value ? {
      [side]: convertToUnit(stuckPosition.value)
    } : {
      top: layoutItemStyles.value.top
    }];
  });
  return {
    isStuck,
    stickyStyles
  };
}
function useTouch(_ref) {
  let {
    el,
    width,
    position
  } = _ref;
  computed(() => ["left", "right"].includes(position.value));
  const isDragging = shallowRef(false);
  const dragProgress = shallowRef(0);
  shallowRef(0);
  const dragStyles = computed(() => {
    return isDragging.value ? {
      transform: position.value === "left" ? `translateX(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === "right" ? `translateX(calc(100% - ${dragProgress.value * width.value}px))` : position.value === "top" ? `translateY(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === "bottom" ? `translateY(calc(100% - ${dragProgress.value * width.value}px))` : oops(),
      transition: "none"
    } : void 0;
  });
  useToggleScope(isDragging, () => {
    const transform = el.value?.style.transform ?? null;
    const transition = el.value?.style.transition ?? null;
    watchEffect(() => {
      el.value?.style.setProperty("transform", dragStyles.value?.transform || "none");
      el.value?.style.setProperty("transition", dragStyles.value?.transition || null);
    });
    onScopeDispose(() => {
      el.value?.style.setProperty("transform", transform);
      el.value?.style.setProperty("transition", transition);
    });
  });
  return {
    isDragging,
    dragProgress,
    dragStyles
  };
}
function oops() {
  throw new Error();
}
const locations = ["start", "end", "left", "right", "top", "bottom"];
const makeVNavigationDrawerProps = propsFactory({
  color: String,
  disableResizeWatcher: Boolean,
  disableRouteWatcher: Boolean,
  expandOnHover: Boolean,
  floating: Boolean,
  modelValue: {
    type: Boolean,
    default: null
  },
  permanent: Boolean,
  rail: {
    type: Boolean,
    default: null
  },
  railWidth: {
    type: [Number, String],
    default: 56
  },
  scrim: {
    type: [Boolean, String],
    default: true
  },
  image: String,
  temporary: Boolean,
  persistent: Boolean,
  touchless: Boolean,
  width: {
    type: [Number, String],
    default: 256
  },
  location: {
    type: String,
    default: "start",
    validator: (value) => locations.includes(value)
  },
  sticky: Boolean,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDelayProps(),
  ...makeDisplayProps({
    mobile: null
  }),
  ...makeElevationProps(),
  ...makeLayoutItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: "nav"
  }),
  ...makeThemeProps()
}, "VNavigationDrawer");
const VNavigationDrawer = genericComponent()({
  name: "VNavigationDrawer",
  props: makeVNavigationDrawerProps(),
  emits: {
    "update:modelValue": (val) => true,
    "update:rail": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      isRtl
    } = useRtl();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      displayClasses,
      mobile
    } = useDisplay(props);
    const {
      roundedClasses
    } = useRounded(props);
    const router = useRouter();
    const isActive = useProxiedModel(props, "modelValue", null, (v) => !!v);
    const {
      ssrBootStyles
    } = useSsrBoot();
    const {
      scopeId
    } = useScopeId();
    const rootEl = ref();
    const isHovering = shallowRef(false);
    const {
      runOpenDelay,
      runCloseDelay
    } = useDelay(props, (value) => {
      isHovering.value = value;
    });
    const width = computed(() => {
      return props.rail && props.expandOnHover && isHovering.value ? Number(props.width) : Number(props.rail ? props.railWidth : props.width);
    });
    const location = computed(() => {
      return toPhysical(props.location, isRtl.value);
    });
    const isPersistent = toRef(() => props.persistent);
    const isTemporary = computed(() => !props.permanent && (mobile.value || props.temporary));
    const isSticky = computed(() => props.sticky && !isTemporary.value && location.value !== "bottom");
    useToggleScope(() => props.expandOnHover && props.rail != null, () => {
      watch(isHovering, (val) => emit("update:rail", !val));
    });
    useToggleScope(() => !props.disableResizeWatcher, () => {
      watch(isTemporary, (val) => !props.permanent && nextTick(() => isActive.value = !val));
    });
    useToggleScope(() => !props.disableRouteWatcher && !!router, () => {
      watch(router.currentRoute, () => isTemporary.value && (isActive.value = false));
    });
    watch(() => props.permanent, (val) => {
      if (val) isActive.value = true;
    });
    if (props.modelValue == null && !isTemporary.value) {
      isActive.value = props.permanent || !mobile.value;
    }
    const {
      isDragging,
      dragProgress
    } = useTouch({
      el: rootEl,
      width,
      touchless: toRef(() => props.touchless),
      position: location
    });
    const layoutSize = computed(() => {
      const size = isTemporary.value ? 0 : props.rail && props.expandOnHover ? Number(props.railWidth) : width.value;
      return isDragging.value ? size * dragProgress.value : size;
    });
    const {
      layoutItemStyles,
      layoutItemScrimStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: location,
      layoutSize,
      elementSize: width,
      active: readonly(isActive),
      disableTransitions: toRef(() => isDragging.value),
      absolute: computed(() => (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        props.absolute || isSticky.value && typeof isStuck.value !== "string"
      ))
    });
    const {
      isStuck,
      stickyStyles
    } = useSticky({
      isSticky,
      layoutItemStyles
    });
    const scrimColor = useBackgroundColor(() => {
      return typeof props.scrim === "string" ? props.scrim : null;
    });
    const scrimStyles = computed(() => ({
      ...isDragging.value ? {
        opacity: dragProgress.value * 0.2,
        transition: "none"
      } : void 0,
      ...layoutItemScrimStyles.value
    }));
    provideDefaults({
      VList: {
        bgColor: "transparent"
      }
    });
    useRender(() => {
      const hasImage = slots.image || props.image;
      return createElementVNode(Fragment, null, [createVNode(props.tag, mergeProps({
        "ref": rootEl,
        "onMouseenter": runOpenDelay,
        "onMouseleave": runCloseDelay,
        "class": ["v-navigation-drawer", `v-navigation-drawer--${location.value}`, {
          "v-navigation-drawer--expand-on-hover": props.expandOnHover,
          "v-navigation-drawer--floating": props.floating,
          "v-navigation-drawer--is-hovering": isHovering.value,
          "v-navigation-drawer--rail": props.rail,
          "v-navigation-drawer--temporary": isTemporary.value,
          "v-navigation-drawer--persistent": isPersistent.value,
          "v-navigation-drawer--active": isActive.value,
          "v-navigation-drawer--sticky": isSticky.value
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, displayClasses.value, elevationClasses.value, roundedClasses.value, props.class],
        "style": [backgroundColorStyles.value, layoutItemStyles.value, ssrBootStyles.value, stickyStyles.value, props.style]
      }, scopeId, attrs), {
        default: () => [hasImage && createElementVNode("div", {
          "key": "image",
          "class": "v-navigation-drawer__img"
        }, [!slots.image ? createVNode(VImg, {
          "key": "image-img",
          "alt": "",
          "cover": true,
          "height": "inherit",
          "src": props.image
        }, null) : createVNode(VDefaultsProvider, {
          "key": "image-defaults",
          "disabled": !props.image,
          "defaults": {
            VImg: {
              alt: "",
              cover: true,
              height: "inherit",
              src: props.image
            }
          }
        }, slots.image)]), slots.prepend && createElementVNode("div", {
          "class": "v-navigation-drawer__prepend"
        }, [slots.prepend?.()]), createElementVNode("div", {
          "class": "v-navigation-drawer__content"
        }, [slots.default?.()]), slots.append && createElementVNode("div", {
          "class": "v-navigation-drawer__append"
        }, [slots.append?.()])]
      }), createVNode(Transition, {
        "name": "fade-transition"
      }, {
        default: () => [isTemporary.value && (isDragging.value || isActive.value) && !!props.scrim && createElementVNode("div", mergeProps({
          "class": ["v-navigation-drawer__scrim", scrimColor.backgroundColorClasses.value],
          "style": [scrimStyles.value, scrimColor.backgroundColorStyles.value],
          "onClick": () => {
            if (isPersistent.value) return;
            isActive.value = false;
          }
        }, scopeId), null)]
      })]);
    });
    return {
      isStuck
    };
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const drawer = ref(false);
    const { can } = usePermission();
    const auth = useAuthStore();
    const router = useRouter$1();
    function logout() {
      auth.logout();
      router.push("/login");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VApp, mergeProps({
        class: "app-bg",
        dir: "rtl"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VLayout, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VAppBar, {
                    color: "primary",
                    density: "comfortable"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAppBarNavIcon, {
                          onClick: ($event) => drawer.value = !drawer.value
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VToolbarTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`پنل کارها`);
                            } else {
                              return [
                                createTextVNode("پنل کارها")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VSpacer, null, null, _parent4, _scopeId3));
                        if (!unref(auth).currentUser) {
                          _push4(ssrRenderComponent(VBtn, {
                            color: "secondary",
                            variant: "tonal",
                            rounded: "lg",
                            elevation: "0",
                            density: "comfortable",
                            "prepend-icon": "mdi-login",
                            to: "/login",
                            class: "mx-1 text-none"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` ورود `);
                              } else {
                                return [
                                  createTextVNode(" ورود ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(VBtn, {
                            color: "error",
                            variant: "tonal",
                            rounded: "lg",
                            elevation: "0",
                            size: "large",
                            density: "comfortable",
                            "prepend-icon": "mdi-logout",
                            onClick: logout,
                            class: "mx-1 text-none"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` خروج `);
                              } else {
                                return [
                                  createTextVNode(" خروج ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        }
                      } else {
                        return [
                          createVNode(VAppBarNavIcon, {
                            onClick: ($event) => drawer.value = !drawer.value
                          }, null, 8, ["onClick"]),
                          createVNode(VToolbarTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("پنل کارها")
                            ]),
                            _: 1
                          }),
                          createVNode(VSpacer),
                          !unref(auth).currentUser ? (openBlock(), createBlock(VBtn, {
                            key: 0,
                            color: "secondary",
                            variant: "tonal",
                            rounded: "lg",
                            elevation: "0",
                            density: "comfortable",
                            "prepend-icon": "mdi-login",
                            to: "/login",
                            class: "mx-1 text-none"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" ورود ")
                            ]),
                            _: 1
                          })) : (openBlock(), createBlock(VBtn, {
                            key: 1,
                            color: "error",
                            variant: "tonal",
                            rounded: "lg",
                            elevation: "0",
                            size: "large",
                            density: "comfortable",
                            "prepend-icon": "mdi-logout",
                            onClick: logout,
                            class: "mx-1 text-none"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" خروج ")
                            ]),
                            _: 1
                          }))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VNavigationDrawer, {
                    modelValue: drawer.value,
                    "onUpdate:modelValue": ($event) => drawer.value = $event,
                    temporary: "",
                    class: "app-drawer",
                    location: "right"
                  }, {
                    append: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VDivider, null, null, _parent4, _scopeId3));
                        _push4(`<div class="pa-3"${_scopeId3}>`);
                        if (unref(auth).currentUser) {
                          _push4(ssrRenderComponent(VBtn, {
                            block: "",
                            color: "error",
                            variant: "tonal",
                            rounded: "lg",
                            "prepend-icon": "mdi-logout",
                            class: "text-none",
                            onClick: logout
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` خروج `);
                              } else {
                                return [
                                  createTextVNode(" خروج ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode(VDivider),
                          createVNode("div", { class: "pa-3" }, [
                            unref(auth).currentUser ? (openBlock(), createBlock(VBtn, {
                              key: 0,
                              block: "",
                              color: "error",
                              variant: "tonal",
                              rounded: "lg",
                              "prepend-icon": "mdi-logout",
                              class: "text-none",
                              onClick: logout
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" خروج ")
                              ]),
                              _: 1
                            })) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VList, { nav: "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItem, {
                                to: "/",
                                title: "خانه",
                                "prepend-icon": "mdi-home"
                              }, null, _parent5, _scopeId4));
                              if (unref(can)("menu_in_todos_show")) {
                                _push5(ssrRenderComponent(VListItem, {
                                  to: "/admin",
                                  title: "برای انجام",
                                  "prepend-icon": "mdi-checkbox-multiple-marked-outline"
                                }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                createVNode(VListItem, {
                                  to: "/",
                                  title: "خانه",
                                  "prepend-icon": "mdi-home"
                                }),
                                unref(can)("menu_in_todos_show") ? (openBlock(), createBlock(VListItem, {
                                  key: 0,
                                  to: "/admin",
                                  title: "برای انجام",
                                  "prepend-icon": "mdi-checkbox-multiple-marked-outline"
                                })) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VList, { nav: "" }, {
                            default: withCtx(() => [
                              createVNode(VListItem, {
                                to: "/",
                                title: "خانه",
                                "prepend-icon": "mdi-home"
                              }),
                              unref(can)("menu_in_todos_show") ? (openBlock(), createBlock(VListItem, {
                                key: 0,
                                to: "/admin",
                                title: "برای انجام",
                                "prepend-icon": "mdi-checkbox-multiple-marked-outline"
                              })) : createCommentVNode("", true)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VMain, { class: "app-main" }, {
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
                    createVNode(VAppBar, {
                      color: "primary",
                      density: "comfortable"
                    }, {
                      default: withCtx(() => [
                        createVNode(VAppBarNavIcon, {
                          onClick: ($event) => drawer.value = !drawer.value
                        }, null, 8, ["onClick"]),
                        createVNode(VToolbarTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("پنل کارها")
                          ]),
                          _: 1
                        }),
                        createVNode(VSpacer),
                        !unref(auth).currentUser ? (openBlock(), createBlock(VBtn, {
                          key: 0,
                          color: "secondary",
                          variant: "tonal",
                          rounded: "lg",
                          elevation: "0",
                          density: "comfortable",
                          "prepend-icon": "mdi-login",
                          to: "/login",
                          class: "mx-1 text-none"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" ورود ")
                          ]),
                          _: 1
                        })) : (openBlock(), createBlock(VBtn, {
                          key: 1,
                          color: "error",
                          variant: "tonal",
                          rounded: "lg",
                          elevation: "0",
                          size: "large",
                          density: "comfortable",
                          "prepend-icon": "mdi-logout",
                          onClick: logout,
                          class: "mx-1 text-none"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" خروج ")
                          ]),
                          _: 1
                        }))
                      ]),
                      _: 1
                    }),
                    createVNode(VNavigationDrawer, {
                      modelValue: drawer.value,
                      "onUpdate:modelValue": ($event) => drawer.value = $event,
                      temporary: "",
                      class: "app-drawer",
                      location: "right"
                    }, {
                      append: withCtx(() => [
                        createVNode(VDivider),
                        createVNode("div", { class: "pa-3" }, [
                          unref(auth).currentUser ? (openBlock(), createBlock(VBtn, {
                            key: 0,
                            block: "",
                            color: "error",
                            variant: "tonal",
                            rounded: "lg",
                            "prepend-icon": "mdi-logout",
                            class: "text-none",
                            onClick: logout
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" خروج ")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ])
                      ]),
                      default: withCtx(() => [
                        createVNode(VList, { nav: "" }, {
                          default: withCtx(() => [
                            createVNode(VListItem, {
                              to: "/",
                              title: "خانه",
                              "prepend-icon": "mdi-home"
                            }),
                            unref(can)("menu_in_todos_show") ? (openBlock(), createBlock(VListItem, {
                              key: 0,
                              to: "/admin",
                              title: "برای انجام",
                              "prepend-icon": "mdi-checkbox-multiple-marked-outline"
                            })) : createCommentVNode("", true)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(VMain, { class: "app-main" }, {
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
              createVNode(VLayout, null, {
                default: withCtx(() => [
                  createVNode(VAppBar, {
                    color: "primary",
                    density: "comfortable"
                  }, {
                    default: withCtx(() => [
                      createVNode(VAppBarNavIcon, {
                        onClick: ($event) => drawer.value = !drawer.value
                      }, null, 8, ["onClick"]),
                      createVNode(VToolbarTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("پنل کارها")
                        ]),
                        _: 1
                      }),
                      createVNode(VSpacer),
                      !unref(auth).currentUser ? (openBlock(), createBlock(VBtn, {
                        key: 0,
                        color: "secondary",
                        variant: "tonal",
                        rounded: "lg",
                        elevation: "0",
                        density: "comfortable",
                        "prepend-icon": "mdi-login",
                        to: "/login",
                        class: "mx-1 text-none"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" ورود ")
                        ]),
                        _: 1
                      })) : (openBlock(), createBlock(VBtn, {
                        key: 1,
                        color: "error",
                        variant: "tonal",
                        rounded: "lg",
                        elevation: "0",
                        size: "large",
                        density: "comfortable",
                        "prepend-icon": "mdi-logout",
                        onClick: logout,
                        class: "mx-1 text-none"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" خروج ")
                        ]),
                        _: 1
                      }))
                    ]),
                    _: 1
                  }),
                  createVNode(VNavigationDrawer, {
                    modelValue: drawer.value,
                    "onUpdate:modelValue": ($event) => drawer.value = $event,
                    temporary: "",
                    class: "app-drawer",
                    location: "right"
                  }, {
                    append: withCtx(() => [
                      createVNode(VDivider),
                      createVNode("div", { class: "pa-3" }, [
                        unref(auth).currentUser ? (openBlock(), createBlock(VBtn, {
                          key: 0,
                          block: "",
                          color: "error",
                          variant: "tonal",
                          rounded: "lg",
                          "prepend-icon": "mdi-logout",
                          class: "text-none",
                          onClick: logout
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" خروج ")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ])
                    ]),
                    default: withCtx(() => [
                      createVNode(VList, { nav: "" }, {
                        default: withCtx(() => [
                          createVNode(VListItem, {
                            to: "/",
                            title: "خانه",
                            "prepend-icon": "mdi-home"
                          }),
                          unref(can)("menu_in_todos_show") ? (openBlock(), createBlock(VListItem, {
                            key: 0,
                            to: "/admin",
                            title: "برای انجام",
                            "prepend-icon": "mdi-checkbox-multiple-marked-outline"
                          })) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(VMain, { class: "app-main" }, {
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=default-BCoZ6Sbr.js.map
