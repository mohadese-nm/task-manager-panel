import { computed, h, capitalize, createVNode, Transition, mergeProps, useId, toRef, provide, onScopeDispose, createElementVNode, normalizeStyle, normalizeClass, shallowRef, ref, withDirectives, Fragment, inject, nextTick, vShow, toDisplayString, watch, watchEffect, reactive, toValue, toRaw, readonly, Teleport, defineComponent, unref, withCtx, createTextVNode, withModifiers, createBlock, createCommentVNode, openBlock, useSSRContext, defineAsyncComponent, isRef, renderList, resolveDynamicComponent } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderVNode } from "vue/server-renderer";
import { V as VCard, b as VCardText, a as VCardTitle, c as VCardActions } from "./VCard-CH2KsXVv.js";
import { m as makeTagProps, c as makeComponentProps, a as useRender, d as useResizeObserver, b as makeDimensionProps, u as useDimension } from "./VGrid-DYUQajch.js";
import { g as genericComponent, p as propsFactory, U as breakpoints, V as acceleratedEasing, W as deceleratedEasing, M as standardEasing, m as makeThemeProps, G as deepEqual, I as IconValue, D as useProxiedModel, e as provideDefaults, P as filterInputAttrs, N as wrapInArray, X as matchesSelector, Q as omit, Y as makeDisplayProps, d as useRtl, Z as useDisplay, $ as useGoTo, a0 as focusableChildren, f as provideTheme, J as useLocale, K as EventProp, l as destructComputed, a1 as CircularBuffer, a2 as consoleError, j as convertToUnit, C as clamp, h as getCurrentInstance, i as templateRef, E as useToggleScope, a3 as isClickInsideElement, a4 as focusChild, a5 as getNextElement, H as defineStore, a6 as debounce, a7 as getPropertyFromItem, a8 as camelizeProps, a9 as ensureValidVNode, aa as checkPrintable, ab as refElement, ac as storeToRefs, a as useNuxtApp } from "../server.mjs";
import { m as makeDensityProps, R as Ripple, a as VIcon, e as useDensity, x as useTextColor, z as useBackgroundColor, l as makeVariantProps, u as useBorder, f as useElevation, j as useRounded, A as useSize, k as useLink, d as useVariant, v as genOverlays, b as VDefaultsProvider, V as VAvatar, C as makeSizeProps, n as makeRouterProps, o as makeRoundedProps, s as makeElevationProps, t as makeBorderProps, D as parseAnchor, E as flipSide, F as flipAlign, G as flipCorner, H as getAxis, y as makeTransitionProps, J as useRouter, M as MaybeTransition, i as usePosition, p as makePositionProps, q as makeLocationProps, K as VProgressLinear } from "./index-SOHsZWxA.js";
import { a as animate, g as getTargetBox, n as nullifyTransforms, b as VLabel, B as Box, c as getElementBox, d as getOverflow, f as forwardRefs, u as useForm, m as makeVTextFieldProps, V as VTextField } from "./VTextField-CZ6AaXgr.js";
import { m as makeGroupProps, u as useGroup, d as VFadeTransition, e as useGroupItem, c as VExpandXTransition, f as makeGroupItemProps, a as VBtn, V as VSpacer } from "./index-DFeFuJj2.js";
import { m as makeDelayProps, u as useDelay, a as useScopeId, V as VList, b as VListItem, c as VListItemTitle, d as useItems, e as makeItemsProps, f as VDivider, g as VListSubheader } from "./scopeId-DHScbPzj.js";
import { a as useSeoMeta } from "./v3-kZLuQu14.js";
import { V as VContainer } from "./VContainer-CZ2nQSIP.js";
import { V as VuetifyLayoutKey, u as useLayout } from "./ssrBoot-BGRvKyVu.js";
function attachedRoot(node) {
  if (typeof node.getRootNode !== "function") {
    while (node.parentNode) node = node.parentNode;
    if (node !== void 0) return null;
    return void 0;
  }
  const root = node.getRootNode();
  if (root !== void 0 && root.getRootNode({
    composed: true
  }) !== void 0) return null;
  return root;
}
function getScrollParent(el) {
  let includeHidden = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  while (el) {
    if (includeHidden ? isPotentiallyScrollable(el) : hasScrollbar(el)) return el;
    el = el.parentElement;
  }
  return (void 0).scrollingElement;
}
function getScrollParents(el, stopAt) {
  const elements = [];
  if (stopAt && el && !stopAt.contains(el)) return elements;
  while (el) {
    if (hasScrollbar(el)) elements.push(el);
    if (el === stopAt) break;
    el = el.parentElement;
  }
  return elements;
}
function hasScrollbar(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
  const style = (void 0).getComputedStyle(el);
  const hasVerticalScrollbar = style.overflowY === "scroll" || style.overflowY === "auto" && el.scrollHeight > el.clientHeight;
  const hasHorizontalScrollbar = style.overflowX === "scroll" || style.overflowX === "auto" && el.scrollWidth > el.clientWidth;
  return hasVerticalScrollbar || hasHorizontalScrollbar;
}
function isPotentiallyScrollable(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
  const style = (void 0).getComputedStyle(el);
  return ["scroll", "auto"].includes(style.overflowY);
}
function isFixedPosition(el) {
  while (el) {
    if ((void 0).getComputedStyle(el).position === "fixed") {
      return true;
    }
    el = el.offsetParent;
  }
  return false;
}
const breakpointProps = (() => {
  return breakpoints.reduce((props, val) => {
    props[val] = {
      type: [Boolean, String, Number],
      default: false
    };
    return props;
  }, {});
})();
const offsetProps = (() => {
  return breakpoints.reduce((props, val) => {
    const offsetKey = "offset" + capitalize(val);
    props[offsetKey] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();
const orderProps = (() => {
  return breakpoints.reduce((props, val) => {
    const orderKey = "order" + capitalize(val);
    props[orderKey] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();
const propMap$1 = {
  col: Object.keys(breakpointProps),
  offset: Object.keys(offsetProps),
  order: Object.keys(orderProps)
};
function breakpointClass$1(type, prop, val) {
  let className = type;
  if (val == null || val === false) {
    return void 0;
  }
  if (prop) {
    const breakpoint = prop.replace(type, "");
    className += `-${breakpoint}`;
  }
  if (type === "col") {
    className = "v-" + className;
  }
  if (type === "col" && (val === "" || val === true)) {
    return className.toLowerCase();
  }
  className += `-${val}`;
  return className.toLowerCase();
}
const ALIGN_SELF_VALUES = ["auto", "start", "end", "center", "baseline", "stretch"];
const makeVColProps = propsFactory({
  cols: {
    type: [Boolean, String, Number],
    default: false
  },
  ...breakpointProps,
  offset: {
    type: [String, Number],
    default: null
  },
  ...offsetProps,
  order: {
    type: [String, Number],
    default: null
  },
  ...orderProps,
  alignSelf: {
    type: String,
    default: null,
    validator: (str) => ALIGN_SELF_VALUES.includes(str)
  },
  ...makeComponentProps(),
  ...makeTagProps()
}, "VCol");
const VCol = genericComponent()({
  name: "VCol",
  props: makeVColProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const classes = computed(() => {
      const classList = [];
      let type;
      for (type in propMap$1) {
        propMap$1[type].forEach((prop) => {
          const value = props[prop];
          const className = breakpointClass$1(type, prop, value);
          if (className) classList.push(className);
        });
      }
      const hasColClasses = classList.some((className) => className.startsWith("v-col-"));
      classList.push({
        // Default to .v-col if no other col-{bp}-* classes generated nor `cols` specified.
        "v-col": !hasColClasses || !props.cols,
        [`v-col-${props.cols}`]: props.cols,
        [`offset-${props.offset}`]: props.offset,
        [`order-${props.order}`]: props.order,
        [`align-self-${props.alignSelf}`]: props.alignSelf
      });
      return classList;
    });
    return () => h(props.tag, {
      class: [classes.value, props.class],
      style: props.style
    }, slots.default?.());
  }
});
const ALIGNMENT = ["start", "end", "center"];
const SPACE = ["space-between", "space-around", "space-evenly"];
function makeRowProps(prefix, def) {
  return breakpoints.reduce((props, val) => {
    const prefixKey = prefix + capitalize(val);
    props[prefixKey] = def();
    return props;
  }, {});
}
const ALIGN_VALUES = [...ALIGNMENT, "baseline", "stretch"];
const alignValidator = (str) => ALIGN_VALUES.includes(str);
const alignProps = makeRowProps("align", () => ({
  type: String,
  default: null,
  validator: alignValidator
}));
const JUSTIFY_VALUES = [...ALIGNMENT, ...SPACE];
const justifyValidator = (str) => JUSTIFY_VALUES.includes(str);
const justifyProps = makeRowProps("justify", () => ({
  type: String,
  default: null,
  validator: justifyValidator
}));
const ALIGN_CONTENT_VALUES = [...ALIGNMENT, ...SPACE, "stretch"];
const alignContentValidator = (str) => ALIGN_CONTENT_VALUES.includes(str);
const alignContentProps = makeRowProps("alignContent", () => ({
  type: String,
  default: null,
  validator: alignContentValidator
}));
const propMap = {
  align: Object.keys(alignProps),
  justify: Object.keys(justifyProps),
  alignContent: Object.keys(alignContentProps)
};
const classMap = {
  align: "align",
  justify: "justify",
  alignContent: "align-content"
};
function breakpointClass(type, prop, val) {
  let className = classMap[type];
  if (val == null) {
    return void 0;
  }
  if (prop) {
    const breakpoint = prop.replace(type, "");
    className += `-${breakpoint}`;
  }
  className += `-${val}`;
  return className.toLowerCase();
}
const makeVRowProps = propsFactory({
  dense: Boolean,
  noGutters: Boolean,
  align: {
    type: String,
    default: null,
    validator: alignValidator
  },
  ...alignProps,
  justify: {
    type: String,
    default: null,
    validator: justifyValidator
  },
  ...justifyProps,
  alignContent: {
    type: String,
    default: null,
    validator: alignContentValidator
  },
  ...alignContentProps,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VRow");
const VRow = genericComponent()({
  name: "VRow",
  props: makeVRowProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const classes = computed(() => {
      const classList = [];
      let type;
      for (type in propMap) {
        propMap[type].forEach((prop) => {
          const value = props[prop];
          const className = breakpointClass(type, prop, value);
          if (className) classList.push(className);
        });
      }
      classList.push({
        "v-row--no-gutters": props.noGutters,
        "v-row--dense": props.dense,
        [`align-${props.align}`]: props.align,
        [`justify-${props.justify}`]: props.justify,
        [`align-content-${props.alignContent}`]: props.alignContent
      });
      return classList;
    });
    return () => h(props.tag, {
      class: ["v-row", classes.value, props.class],
      style: props.style
    }, slots.default?.());
  }
});
const makeVDialogTransitionProps = propsFactory({
  target: [Object, Array]
}, "v-dialog-transition");
const saved = /* @__PURE__ */ new WeakMap();
const VDialogTransition = genericComponent()({
  name: "VDialogTransition",
  props: makeVDialogTransitionProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const functions = {
      onBeforeEnter(el) {
        el.style.pointerEvents = "none";
        el.style.visibility = "hidden";
      },
      async onEnter(el, done) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
        await new Promise((resolve) => requestAnimationFrame(resolve));
        el.style.visibility = "";
        const dimensions = getDimensions(props.target, el);
        const {
          x,
          y,
          sx,
          sy,
          speed
        } = dimensions;
        saved.set(el, dimensions);
        {
          const animation = animate(el, [{
            transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
            opacity: 0
          }, {}], {
            duration: 225 * speed,
            easing: deceleratedEasing
          });
          getChildren(el)?.forEach((el2) => {
            animate(el2, [{
              opacity: 0
            }, {
              opacity: 0,
              offset: 0.33
            }, {}], {
              duration: 225 * 2 * speed,
              easing: standardEasing
            });
          });
          animation.finished.then(() => done());
        }
      },
      onAfterEnter(el) {
        el.style.removeProperty("pointer-events");
      },
      onBeforeLeave(el) {
        el.style.pointerEvents = "none";
      },
      async onLeave(el, done) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
        let dimensions;
        if (!saved.has(el) || Array.isArray(props.target) || props.target.offsetParent || props.target.getClientRects().length) {
          dimensions = getDimensions(props.target, el);
        } else {
          dimensions = saved.get(el);
        }
        const {
          x,
          y,
          sx,
          sy,
          speed
        } = dimensions;
        {
          const animation = animate(el, [{}, {
            transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
            opacity: 0
          }], {
            duration: 125 * speed,
            easing: acceleratedEasing
          });
          animation.finished.then(() => done());
          getChildren(el)?.forEach((el2) => {
            animate(el2, [{}, {
              opacity: 0,
              offset: 0.2
            }, {
              opacity: 0
            }], {
              duration: 125 * 2 * speed,
              easing: standardEasing
            });
          });
        }
      },
      onAfterLeave(el) {
        el.style.removeProperty("pointer-events");
      }
    };
    return () => {
      return props.target ? createVNode(Transition, mergeProps({
        "name": "dialog-transition"
      }, functions, {
        "css": false
      }), slots) : createVNode(Transition, {
        "name": "dialog-transition"
      }, slots);
    };
  }
});
function getChildren(el) {
  const els = el.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")?.children;
  return els && [...els];
}
function getDimensions(target, el) {
  const targetBox = getTargetBox(target);
  const elBox = nullifyTransforms(el);
  const [originX, originY] = getComputedStyle(el).transformOrigin.split(" ").map((v) => parseFloat(v));
  const [anchorSide, anchorOffset] = getComputedStyle(el).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let offsetX = targetBox.left + targetBox.width / 2;
  if (anchorSide === "left" || anchorOffset === "left") {
    offsetX -= targetBox.width / 2;
  } else if (anchorSide === "right" || anchorOffset === "right") {
    offsetX += targetBox.width / 2;
  }
  let offsetY = targetBox.top + targetBox.height / 2;
  if (anchorSide === "top" || anchorOffset === "top") {
    offsetY -= targetBox.height / 2;
  } else if (anchorSide === "bottom" || anchorOffset === "bottom") {
    offsetY += targetBox.height / 2;
  }
  const tsx = targetBox.width / elBox.width;
  const tsy = targetBox.height / elBox.height;
  const maxs = Math.max(1, tsx, tsy);
  const sx = tsx / maxs || 0;
  const sy = tsy / maxs || 0;
  const asa = elBox.width * elBox.height / ((void 0).innerWidth * (void 0).innerHeight);
  const speed = asa > 0.12 ? Math.min(1.5, (asa - 0.12) * 10 + 1) : 1;
  return {
    x: offsetX - (originX + elBox.left),
    y: offsetY - (originY + elBox.top),
    sx,
    sy,
    speed
  };
}
var TaskStatus = /* @__PURE__ */ ((TaskStatus2) => {
  TaskStatus2["Todo"] = "todo";
  TaskStatus2["InProgress"] = "in_progress";
  TaskStatus2["Done"] = "done";
  return TaskStatus2;
})(TaskStatus || {});
const VSelectionControlGroupSymbol = Symbol.for("vuetify:selection-control-group");
const makeSelectionControlGroupProps = propsFactory({
  color: String,
  disabled: {
    type: Boolean,
    default: null
  },
  defaultsTarget: String,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: IconValue,
  trueIcon: IconValue,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  multiple: {
    type: Boolean,
    default: null
  },
  name: String,
  readonly: {
    type: Boolean,
    default: null
  },
  modelValue: null,
  type: String,
  valueComparator: {
    type: Function,
    default: deepEqual
  },
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeThemeProps()
}, "SelectionControlGroup");
const makeVSelectionControlGroupProps = propsFactory({
  ...makeSelectionControlGroupProps({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup");
genericComponent()({
  name: "VSelectionControlGroup",
  props: makeVSelectionControlGroupProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const modelValue = useProxiedModel(props, "modelValue");
    const uid = useId();
    const id = toRef(() => props.id || `v-selection-control-group-${uid}`);
    const name = toRef(() => props.name || id.value);
    const updateHandlers = /* @__PURE__ */ new Set();
    provide(VSelectionControlGroupSymbol, {
      modelValue,
      forceUpdate: () => {
        updateHandlers.forEach((fn) => fn());
      },
      onForceUpdate: (cb) => {
        updateHandlers.add(cb);
        onScopeDispose(() => {
          updateHandlers.delete(cb);
        });
      }
    });
    provideDefaults({
      [props.defaultsTarget]: {
        color: toRef(() => props.color),
        disabled: toRef(() => props.disabled),
        density: toRef(() => props.density),
        error: toRef(() => props.error),
        inline: toRef(() => props.inline),
        modelValue,
        multiple: toRef(() => !!props.multiple || props.multiple == null && Array.isArray(modelValue.value)),
        name,
        falseIcon: toRef(() => props.falseIcon),
        trueIcon: toRef(() => props.trueIcon),
        readonly: toRef(() => props.readonly),
        ripple: toRef(() => props.ripple),
        type: toRef(() => props.type),
        valueComparator: toRef(() => props.valueComparator)
      }
    });
    useRender(() => createElementVNode("div", {
      "class": normalizeClass(["v-selection-control-group", {
        "v-selection-control-group--inline": props.inline
      }, props.class]),
      "style": normalizeStyle(props.style),
      "role": props.type === "radio" ? "radiogroup" : void 0
    }, [slots.default?.()]));
    return {};
  }
});
const makeVSelectionControlProps = propsFactory({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...makeComponentProps(),
  ...makeSelectionControlGroupProps()
}, "VSelectionControl");
function useSelectionControl(props) {
  const group = inject(VSelectionControlGroupSymbol, void 0);
  const {
    densityClasses
  } = useDensity(props);
  const modelValue = useProxiedModel(props, "modelValue");
  const trueValue = computed(() => props.trueValue !== void 0 ? props.trueValue : props.value !== void 0 ? props.value : true);
  const falseValue = computed(() => props.falseValue !== void 0 ? props.falseValue : false);
  const isMultiple = computed(() => !!props.multiple || props.multiple == null && Array.isArray(modelValue.value));
  const model = computed({
    get() {
      const val = group ? group.modelValue.value : modelValue.value;
      return isMultiple.value ? wrapInArray(val).some((v) => props.valueComparator(v, trueValue.value)) : props.valueComparator(val, trueValue.value);
    },
    set(val) {
      if (props.readonly) return;
      const currentValue = val ? trueValue.value : falseValue.value;
      let newVal = currentValue;
      if (isMultiple.value) {
        newVal = val ? [...wrapInArray(modelValue.value), currentValue] : wrapInArray(modelValue.value).filter((item) => !props.valueComparator(item, trueValue.value));
      }
      if (group) {
        group.modelValue.value = newVal;
      } else {
        modelValue.value = newVal;
      }
    }
  });
  const {
    textColorClasses,
    textColorStyles
  } = useTextColor(() => {
    if (props.error || props.disabled) return void 0;
    return model.value ? props.color : props.baseColor;
  });
  const {
    backgroundColorClasses,
    backgroundColorStyles
  } = useBackgroundColor(() => {
    return model.value && !props.error && !props.disabled ? props.color : props.baseColor;
  });
  const icon = computed(() => model.value ? props.trueIcon : props.falseIcon);
  return {
    group,
    densityClasses,
    trueValue,
    falseValue,
    model,
    textColorClasses,
    textColorStyles,
    backgroundColorClasses,
    backgroundColorStyles,
    icon
  };
}
const VSelectionControl = genericComponent()({
  name: "VSelectionControl",
  directives: {
    vRipple: Ripple
  },
  inheritAttrs: false,
  props: makeVSelectionControlProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      group,
      densityClasses,
      icon,
      model,
      textColorClasses,
      textColorStyles,
      backgroundColorClasses,
      backgroundColorStyles,
      trueValue
    } = useSelectionControl(props);
    const uid = useId();
    const isFocused = shallowRef(false);
    const isFocusVisible = shallowRef(false);
    const input = ref();
    const id = toRef(() => props.id || `input-${uid}`);
    const isInteractive = toRef(() => !props.disabled && !props.readonly);
    group?.onForceUpdate(() => {
      if (input.value) {
        input.value.checked = model.value;
      }
    });
    function onFocus(e) {
      if (!isInteractive.value) return;
      isFocused.value = true;
      if (matchesSelector(e.target) !== false) {
        isFocusVisible.value = true;
      }
    }
    function onBlur() {
      isFocused.value = false;
      isFocusVisible.value = false;
    }
    function onClickLabel(e) {
      e.stopPropagation();
    }
    function onInput(e) {
      if (!isInteractive.value) {
        if (input.value) {
          input.value.checked = model.value;
        }
        return;
      }
      if (props.readonly && group) {
        nextTick(() => group.forceUpdate());
      }
      model.value = e.target.checked;
    }
    useRender(() => {
      const label = slots.label ? slots.label({
        label: props.label,
        props: {
          for: id.value
        }
      }) : props.label;
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const inputNode = createElementVNode("input", mergeProps({
        "ref": input,
        "checked": model.value,
        "disabled": !!props.disabled,
        "id": id.value,
        "onBlur": onBlur,
        "onFocus": onFocus,
        "onInput": onInput,
        "aria-disabled": !!props.disabled,
        "aria-label": props.label,
        "type": props.type,
        "value": trueValue.value,
        "name": props.name,
        "aria-checked": props.type === "checkbox" ? model.value : void 0
      }, inputAttrs), null);
      return createElementVNode("div", mergeProps({
        "class": ["v-selection-control", {
          "v-selection-control--dirty": model.value,
          "v-selection-control--disabled": props.disabled,
          "v-selection-control--error": props.error,
          "v-selection-control--focused": isFocused.value,
          "v-selection-control--focus-visible": isFocusVisible.value,
          "v-selection-control--inline": props.inline
        }, densityClasses.value, props.class]
      }, rootAttrs, {
        "style": props.style
      }), [createElementVNode("div", {
        "class": normalizeClass(["v-selection-control__wrapper", textColorClasses.value]),
        "style": normalizeStyle(textColorStyles.value)
      }, [slots.default?.({
        backgroundColorClasses,
        backgroundColorStyles
      }), withDirectives(createElementVNode("div", {
        "class": normalizeClass(["v-selection-control__input"])
      }, [slots.input?.({
        model,
        textColorClasses,
        textColorStyles,
        backgroundColorClasses,
        backgroundColorStyles,
        inputNode,
        icon: icon.value,
        props: {
          onFocus,
          onBlur,
          id: id.value
        }
      }) ?? createElementVNode(Fragment, null, [icon.value && createVNode(VIcon, {
        "key": "icon",
        "icon": icon.value
      }, null), inputNode])]), [[Ripple, !props.disabled && !props.readonly && props.ripple, null, {
        center: true,
        circle: true
      }]])]), label && createVNode(VLabel, {
        "for": id.value,
        "onClick": onClickLabel
      }, {
        default: () => [label]
      })]);
    });
    return {
      isFocused,
      input
    };
  }
});
const makeVCheckboxBtnProps = propsFactory({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: IconValue,
    default: "$checkboxIndeterminate"
  },
  ...makeVSelectionControlProps({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "VCheckboxBtn");
const VCheckboxBtn = genericComponent()({
  name: "VCheckboxBtn",
  props: makeVCheckboxBtnProps(),
  emits: {
    "update:modelValue": (value) => true,
    "update:indeterminate": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const indeterminate = useProxiedModel(props, "indeterminate");
    const model = useProxiedModel(props, "modelValue");
    function onChange(v) {
      if (indeterminate.value) {
        indeterminate.value = false;
      }
    }
    const falseIcon = toRef(() => {
      return indeterminate.value ? props.indeterminateIcon : props.falseIcon;
    });
    const trueIcon = toRef(() => {
      return indeterminate.value ? props.indeterminateIcon : props.trueIcon;
    });
    useRender(() => {
      const controlProps = omit(VSelectionControl.filterProps(props), ["modelValue"]);
      return createVNode(VSelectionControl, mergeProps(controlProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": [($event) => model.value = $event, onChange],
        "class": ["v-checkbox-btn", props.class],
        "style": props.style,
        "type": "checkbox",
        "falseIcon": falseIcon.value,
        "trueIcon": trueIcon.value,
        "aria-checked": indeterminate.value ? "mixed" : void 0
      }), slots);
    });
    return {};
  }
});
function calculateUpdatedTarget(_ref) {
  let {
    selectedElement,
    containerElement,
    isRtl,
    isHorizontal
  } = _ref;
  const containerSize = getOffsetSize(isHorizontal, containerElement);
  const scrollPosition = getScrollPosition(isHorizontal, isRtl, containerElement);
  const childrenSize = getOffsetSize(isHorizontal, selectedElement);
  const childrenStartPosition = getOffsetPosition(isHorizontal, selectedElement);
  const additionalOffset = childrenSize * 0.4;
  if (scrollPosition > childrenStartPosition) {
    return childrenStartPosition - additionalOffset;
  } else if (scrollPosition + containerSize < childrenStartPosition + childrenSize) {
    return childrenStartPosition - containerSize + childrenSize + additionalOffset;
  }
  return scrollPosition;
}
function getScrollSize(isHorizontal, element) {
  const key = isHorizontal ? "scrollWidth" : "scrollHeight";
  return element?.[key] || 0;
}
function getClientSize(isHorizontal, element) {
  const key = isHorizontal ? "clientWidth" : "clientHeight";
  return element?.[key] || 0;
}
function getScrollPosition(isHorizontal, rtl, element) {
  if (!element) {
    return 0;
  }
  const {
    scrollLeft,
    offsetWidth,
    scrollWidth
  } = element;
  if (isHorizontal) {
    return rtl ? scrollWidth - offsetWidth + scrollLeft : scrollLeft;
  }
  return element.scrollTop;
}
function getOffsetSize(isHorizontal, element) {
  const key = isHorizontal ? "offsetWidth" : "offsetHeight";
  return element?.[key] || 0;
}
function getOffsetPosition(isHorizontal, element) {
  const key = isHorizontal ? "offsetLeft" : "offsetTop";
  return element?.[key] || 0;
}
const VSlideGroupSymbol = Symbol.for("vuetify:v-slide-group");
const makeVSlideGroupProps = propsFactory({
  centerActive: Boolean,
  contentClass: null,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: VSlideGroupSymbol
  },
  nextIcon: {
    type: IconValue,
    default: "$next"
  },
  prevIcon: {
    type: IconValue,
    default: "$prev"
  },
  showArrows: {
    type: [Boolean, String],
    validator: (v) => typeof v === "boolean" || ["always", "desktop", "mobile"].includes(v)
  },
  ...makeComponentProps(),
  ...makeDisplayProps({
    mobile: null
  }),
  ...makeTagProps(),
  ...makeGroupProps({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup");
const VSlideGroup = genericComponent()({
  name: "VSlideGroup",
  props: makeVSlideGroupProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isRtl
    } = useRtl();
    const {
      displayClasses,
      mobile
    } = useDisplay(props);
    const group = useGroup(props, props.symbol);
    const isOverflowing = shallowRef(false);
    const scrollOffset = shallowRef(0);
    const containerSize = shallowRef(0);
    shallowRef(0);
    const isHorizontal = computed(() => props.direction === "horizontal");
    const {
      resizeRef: containerRef
    } = useResizeObserver();
    const {
      resizeRef: contentRef
    } = useResizeObserver();
    useGoTo();
    computed(() => {
      return {
        container: containerRef.el,
        duration: 200,
        easing: "easeOutQuart"
      };
    });
    computed(() => {
      if (!group.selected.value.length) return -1;
      return group.items.value.findIndex((item) => item.id === group.selected.value[0]);
    });
    computed(() => {
      if (!group.selected.value.length) return -1;
      return group.items.value.findIndex((item) => item.id === group.selected.value[group.selected.value.length - 1]);
    });
    const isFocused = shallowRef(false);
    function scrollToChildren(children, center) {
      {
        calculateUpdatedTarget({
          containerElement: containerRef.el,
          isHorizontal: isHorizontal.value,
          isRtl: isRtl.value,
          selectedElement: children
        });
      }
    }
    function onScroll(e) {
      const {
        scrollTop,
        scrollLeft
      } = e.target;
      scrollOffset.value = isHorizontal.value ? scrollLeft : scrollTop;
    }
    function onFocusin(e) {
      isFocused.value = true;
      if (!isOverflowing.value || !contentRef.el) return;
      for (const el of e.composedPath()) {
        for (const item of contentRef.el.children) {
          if (item === el) {
            scrollToChildren(item);
            return;
          }
        }
      }
    }
    function onFocusout(e) {
      isFocused.value = false;
    }
    let ignoreFocusEvent = false;
    function onFocus(e) {
      if (!ignoreFocusEvent && !isFocused.value && !(e.relatedTarget && contentRef.el?.contains(e.relatedTarget))) focus();
      ignoreFocusEvent = false;
    }
    function onFocusAffixes() {
      ignoreFocusEvent = true;
    }
    function onKeydown(e) {
      if (!contentRef.el) return;
      function toFocus(location) {
        e.preventDefault();
        focus(location);
      }
      if (isHorizontal.value) {
        if (e.key === "ArrowRight") {
          toFocus(isRtl.value ? "prev" : "next");
        } else if (e.key === "ArrowLeft") {
          toFocus(isRtl.value ? "next" : "prev");
        }
      } else {
        if (e.key === "ArrowDown") {
          toFocus("next");
        } else if (e.key === "ArrowUp") {
          toFocus("prev");
        }
      }
      if (e.key === "Home") {
        toFocus("first");
      } else if (e.key === "End") {
        toFocus("last");
      }
    }
    function getSiblingElement(el, location) {
      if (!el) return void 0;
      let sibling = el;
      do {
        sibling = sibling?.[location === "next" ? "nextElementSibling" : "previousElementSibling"];
      } while (sibling?.hasAttribute("disabled"));
      return sibling;
    }
    function focus(location) {
      if (!contentRef.el) return;
      let el;
      if (!location) {
        const focusable = focusableChildren(contentRef.el);
        el = focusable[0];
      } else if (location === "next") {
        el = getSiblingElement(contentRef.el.querySelector(":focus"), location);
        if (!el) return focus("first");
      } else if (location === "prev") {
        el = getSiblingElement(contentRef.el.querySelector(":focus"), location);
        if (!el) return focus("last");
      } else if (location === "first") {
        el = contentRef.el.firstElementChild;
        if (el?.hasAttribute("disabled")) el = getSiblingElement(el, "next");
      } else if (location === "last") {
        el = contentRef.el.lastElementChild;
        if (el?.hasAttribute("disabled")) el = getSiblingElement(el, "prev");
      }
      if (el) {
        el.focus({
          preventScroll: true
        });
      }
    }
    function scrollTo(location) {
      const direction = isHorizontal.value && isRtl.value ? -1 : 1;
      const offsetStep = (location === "prev" ? -direction : direction) * containerSize.value;
      scrollOffset.value + offsetStep;
      if (isHorizontal.value && isRtl.value && containerRef.el) {
        const {
          scrollWidth,
          offsetWidth: containerWidth
        } = containerRef.el;
      }
    }
    const slotProps = computed(() => ({
      next: group.next,
      prev: group.prev,
      select: group.select,
      isSelected: group.isSelected
    }));
    const hasOverflowOrScroll = computed(() => isOverflowing.value || Math.abs(scrollOffset.value) > 0);
    const hasAffixes = computed(() => {
      switch (props.showArrows) {
        // Always show arrows on desktop & mobile
        case "always":
          return true;
        // Always show arrows on desktop
        case "desktop":
          return !mobile.value;
        // Show arrows on mobile when overflowing.
        // This matches the default 2.2 behavior
        case true:
          return hasOverflowOrScroll.value;
        // Always show on mobile
        case "mobile":
          return mobile.value || hasOverflowOrScroll.value;
        // https://material.io/components/tabs#scrollable-tabs
        // Always show arrows when
        // overflowed on desktop
        default:
          return !mobile.value && hasOverflowOrScroll.value;
      }
    });
    const hasPrev = computed(() => {
      return Math.abs(scrollOffset.value) > 1;
    });
    const hasNext = computed(() => {
      if (!containerRef.value || !hasOverflowOrScroll.value) return false;
      const scrollSize = getScrollSize(isHorizontal.value, containerRef.el);
      const clientSize = getClientSize(isHorizontal.value, containerRef.el);
      const scrollSizeMax = scrollSize - clientSize;
      return scrollSizeMax - Math.abs(scrollOffset.value) > 1;
    });
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-slide-group", {
        "v-slide-group--vertical": !isHorizontal.value,
        "v-slide-group--has-affixes": hasAffixes.value,
        "v-slide-group--is-overflowing": isOverflowing.value
      }, displayClasses.value, props.class]),
      "style": normalizeStyle(props.style),
      "tabindex": isFocused.value || group.selected.value.length ? -1 : 0,
      "onFocus": onFocus
    }, {
      default: () => [hasAffixes.value && createElementVNode("div", {
        "key": "prev",
        "class": normalizeClass(["v-slide-group__prev", {
          "v-slide-group__prev--disabled": !hasPrev.value
        }]),
        "onMousedown": onFocusAffixes,
        "onClick": () => hasPrev.value && scrollTo("prev")
      }, [slots.prev?.(slotProps.value) ?? createVNode(VFadeTransition, null, {
        default: () => [createVNode(VIcon, {
          "icon": isRtl.value ? props.nextIcon : props.prevIcon
        }, null)]
      })]), createElementVNode("div", {
        "key": "container",
        "ref": containerRef,
        "class": normalizeClass(["v-slide-group__container", props.contentClass]),
        "onScroll": onScroll
      }, [createElementVNode("div", {
        "ref": contentRef,
        "class": "v-slide-group__content",
        "onFocusin": onFocusin,
        "onFocusout": onFocusout,
        "onKeydown": onKeydown
      }, [slots.default?.(slotProps.value)])]), hasAffixes.value && createElementVNode("div", {
        "key": "next",
        "class": normalizeClass(["v-slide-group__next", {
          "v-slide-group__next--disabled": !hasNext.value
        }]),
        "onMousedown": onFocusAffixes,
        "onClick": () => hasNext.value && scrollTo("next")
      }, [slots.next?.(slotProps.value) ?? createVNode(VFadeTransition, null, {
        default: () => [createVNode(VIcon, {
          "icon": isRtl.value ? props.prevIcon : props.nextIcon
        }, null)]
      })])]
    }));
    return {
      selected: group.selected,
      scrollTo,
      scrollOffset,
      focus,
      hasPrev,
      hasNext
    };
  }
});
const VChipGroupSymbol = Symbol.for("vuetify:v-chip-group");
const makeVChipGroupProps = propsFactory({
  baseColor: String,
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: deepEqual
  },
  ...makeVSlideGroupProps(),
  ...makeComponentProps(),
  ...makeGroupProps({
    selectedClass: "v-chip--selected"
  }),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "tonal"
  })
}, "VChipGroup");
genericComponent()({
  name: "VChipGroup",
  props: makeVChipGroupProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isSelected,
      select,
      next,
      prev,
      selected
    } = useGroup(props, VChipGroupSymbol);
    provideDefaults({
      VChip: {
        baseColor: toRef(() => props.baseColor),
        color: toRef(() => props.color),
        disabled: toRef(() => props.disabled),
        filter: toRef(() => props.filter),
        variant: toRef(() => props.variant)
      }
    });
    useRender(() => {
      const slideGroupProps = VSlideGroup.filterProps(props);
      return createVNode(VSlideGroup, mergeProps(slideGroupProps, {
        "class": ["v-chip-group", {
          "v-chip-group--column": props.column
        }, themeClasses.value, props.class],
        "style": props.style
      }), {
        default: () => [slots.default?.({
          isSelected,
          select,
          next,
          prev,
          selected: selected.value
        })]
      });
    });
    return {};
  }
});
const makeVChipProps = propsFactory({
  activeClass: String,
  appendAvatar: String,
  appendIcon: IconValue,
  baseColor: String,
  closable: Boolean,
  closeIcon: {
    type: IconValue,
    default: "$delete"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  draggable: Boolean,
  filter: Boolean,
  filterIcon: {
    type: IconValue,
    default: "$complete"
  },
  label: Boolean,
  link: {
    type: Boolean,
    default: void 0
  },
  pill: Boolean,
  prependAvatar: String,
  prependIcon: IconValue,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  text: {
    type: [String, Number, Boolean],
    default: void 0
  },
  modelValue: {
    type: Boolean,
    default: true
  },
  onClick: EventProp(),
  onClickOnce: EventProp(),
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "span"
  }),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "tonal"
  })
}, "VChip");
const VChip = genericComponent()({
  name: "VChip",
  directives: {
    vRipple: Ripple
  },
  props: makeVChipProps(),
  emits: {
    "click:close": (e) => true,
    "update:modelValue": (value) => true,
    "group:selected": (val) => true,
    click: (e) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      borderClasses
    } = useBorder(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses
    } = useSize(props);
    const {
      themeClasses
    } = provideTheme(props);
    const isActive = useProxiedModel(props, "modelValue");
    const group = useGroupItem(props, VChipGroupSymbol, false);
    const link = useLink(props, attrs);
    const isLink = toRef(() => props.link !== false && link.isLink.value);
    const isClickable = computed(() => !props.disabled && props.link !== false && (!!group || props.link || link.isClickable.value));
    const closeProps = toRef(() => ({
      "aria-label": t(props.closeLabel),
      disabled: props.disabled,
      onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        isActive.value = false;
        emit("click:close", e);
      }
    }));
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(() => {
      const showColor = !group || group.isSelected.value;
      return {
        color: showColor ? props.color ?? props.baseColor : props.baseColor,
        variant: props.variant
      };
    });
    function onClick(e) {
      emit("click", e);
      if (!isClickable.value) return;
      link.navigate?.(e);
      group?.toggle();
    }
    function onKeyDown(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick(e);
      }
    }
    return () => {
      const Tag = link.isLink.value ? "a" : props.tag;
      const hasAppendMedia = !!(props.appendIcon || props.appendAvatar);
      const hasAppend = !!(hasAppendMedia || slots.append);
      const hasClose = !!(slots.close || props.closable);
      const hasFilter = !!(slots.filter || props.filter) && group;
      const hasPrependMedia = !!(props.prependIcon || props.prependAvatar);
      const hasPrepend = !!(hasPrependMedia || slots.prepend);
      return isActive.value && withDirectives(createVNode(Tag, mergeProps({
        "class": ["v-chip", {
          "v-chip--disabled": props.disabled,
          "v-chip--label": props.label,
          "v-chip--link": isClickable.value,
          "v-chip--filter": hasFilter,
          "v-chip--pill": props.pill,
          [`${props.activeClass}`]: props.activeClass && link.isActive?.value
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, group?.selectedClass.value, props.class],
        "style": [colorStyles.value, props.style],
        "disabled": props.disabled || void 0,
        "draggable": props.draggable,
        "tabindex": isClickable.value ? 0 : void 0,
        "onClick": onClick,
        "onKeydown": isClickable.value && !isLink.value && onKeyDown
      }, link.linkProps), {
        default: () => [genOverlays(isClickable.value, "v-chip"), hasFilter && createVNode(VExpandXTransition, {
          "key": "filter"
        }, {
          default: () => [withDirectives(createElementVNode("div", {
            "class": "v-chip__filter"
          }, [!slots.filter ? createVNode(VIcon, {
            "key": "filter-icon",
            "icon": props.filterIcon
          }, null) : createVNode(VDefaultsProvider, {
            "key": "filter-defaults",
            "disabled": !props.filterIcon,
            "defaults": {
              VIcon: {
                icon: props.filterIcon
              }
            }
          }, slots.filter)]), [[vShow, group.isSelected.value]])]
        }), hasPrepend && createElementVNode("div", {
          "key": "prepend",
          "class": "v-chip__prepend"
        }, [!slots.prepend ? createElementVNode(Fragment, null, [props.prependIcon && createVNode(VIcon, {
          "key": "prepend-icon",
          "icon": props.prependIcon,
          "start": true
        }, null), props.prependAvatar && createVNode(VAvatar, {
          "key": "prepend-avatar",
          "image": props.prependAvatar,
          "start": true
        }, null)]) : createVNode(VDefaultsProvider, {
          "key": "prepend-defaults",
          "disabled": !hasPrependMedia,
          "defaults": {
            VAvatar: {
              image: props.prependAvatar,
              start: true
            },
            VIcon: {
              icon: props.prependIcon,
              start: true
            }
          }
        }, slots.prepend)]), createElementVNode("div", {
          "class": "v-chip__content",
          "data-no-activator": ""
        }, [slots.default?.({
          isSelected: group?.isSelected.value,
          selectedClass: group?.selectedClass.value,
          select: group?.select,
          toggle: group?.toggle,
          value: group?.value.value,
          disabled: props.disabled
        }) ?? toDisplayString(props.text)]), hasAppend && createElementVNode("div", {
          "key": "append",
          "class": "v-chip__append"
        }, [!slots.append ? createElementVNode(Fragment, null, [props.appendIcon && createVNode(VIcon, {
          "key": "append-icon",
          "end": true,
          "icon": props.appendIcon
        }, null), props.appendAvatar && createVNode(VAvatar, {
          "key": "append-avatar",
          "end": true,
          "image": props.appendAvatar
        }, null)]) : createVNode(VDefaultsProvider, {
          "key": "append-defaults",
          "disabled": !hasAppendMedia,
          "defaults": {
            VAvatar: {
              end: true,
              image: props.appendAvatar
            },
            VIcon: {
              end: true,
              icon: props.appendIcon
            }
          }
        }, slots.append)]), hasClose && createElementVNode("button", mergeProps({
          "key": "close",
          "class": "v-chip__close",
          "type": "button",
          "data-testid": "close-chip"
        }, closeProps.value), [!slots.close ? createVNode(VIcon, {
          "key": "close-icon",
          "icon": props.closeIcon,
          "size": "x-small"
        }, null) : createVNode(VDefaultsProvider, {
          "key": "close-defaults",
          "defaults": {
            VIcon: {
              icon: props.closeIcon,
              size: "x-small"
            }
          }
        }, slots.close)])]
      }), [[Ripple, isClickable.value && props.ripple, null]]);
    };
  }
});
function elementToViewport(point, offset) {
  return {
    x: point.x + offset.x,
    y: point.y + offset.y
  };
}
function getOffset(a, b) {
  return {
    x: a.x - b.x,
    y: a.y - b.y
  };
}
function anchorToPoint(anchor, box) {
  if (anchor.side === "top" || anchor.side === "bottom") {
    const {
      side,
      align
    } = anchor;
    const x = align === "left" ? 0 : align === "center" ? box.width / 2 : align === "right" ? box.width : align;
    const y = side === "top" ? 0 : side === "bottom" ? box.height : side;
    return elementToViewport({
      x,
      y
    }, box);
  } else if (anchor.side === "left" || anchor.side === "right") {
    const {
      side,
      align
    } = anchor;
    const x = side === "left" ? 0 : side === "right" ? box.width : side;
    const y = align === "top" ? 0 : align === "center" ? box.height / 2 : align === "bottom" ? box.height : align;
    return elementToViewport({
      x,
      y
    }, box);
  }
  return elementToViewport({
    x: box.width / 2,
    y: box.height / 2
  }, box);
}
const locationStrategies = {
  static: staticLocationStrategy,
  // specific viewport position, usually centered
  connected: connectedLocationStrategy
  // connected to a certain element
};
const makeLocationStrategyProps = propsFactory({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (val) => typeof val === "function" || val in locationStrategies
  },
  location: {
    type: String,
    default: "bottom"
  },
  origin: {
    type: String,
    default: "auto"
  },
  offset: [Number, String, Array],
  stickToTarget: Boolean
}, "VOverlay-location-strategies");
function useLocationStrategies(props, data) {
  const contentStyles = ref({});
  const updateLocation = ref();
  return {
    contentStyles,
    updateLocation
  };
}
function staticLocationStrategy() {
}
function getIntrinsicSize(el, isRtl) {
  const contentBox = nullifyTransforms(el);
  if (isRtl) {
    contentBox.x += parseFloat(el.style.right || 0);
  } else {
    contentBox.x -= parseFloat(el.style.left || 0);
  }
  contentBox.y -= parseFloat(el.style.top || 0);
  return contentBox;
}
function connectedLocationStrategy(data, props, contentStyles) {
  const activatorFixed = Array.isArray(data.target.value) || isFixedPosition(data.target.value);
  if (activatorFixed) {
    Object.assign(contentStyles.value, {
      position: "fixed",
      top: 0,
      [data.isRtl.value ? "right" : "left"]: 0
    });
  }
  const {
    preferredAnchor,
    preferredOrigin
  } = destructComputed(() => {
    const parsedAnchor = parseAnchor(props.location, data.isRtl.value);
    const parsedOrigin = props.origin === "overlap" ? parsedAnchor : props.origin === "auto" ? flipSide(parsedAnchor) : parseAnchor(props.origin, data.isRtl.value);
    if (parsedAnchor.side === parsedOrigin.side && parsedAnchor.align === flipAlign(parsedOrigin).align) {
      return {
        preferredAnchor: flipCorner(parsedAnchor),
        preferredOrigin: flipCorner(parsedOrigin)
      };
    } else {
      return {
        preferredAnchor: parsedAnchor,
        preferredOrigin: parsedOrigin
      };
    }
  });
  const [minWidth, minHeight, maxWidth, maxHeight] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((key) => {
    return computed(() => {
      const val = parseFloat(props[key]);
      return isNaN(val) ? Infinity : val;
    });
  });
  const offset = computed(() => {
    if (Array.isArray(props.offset)) {
      return props.offset;
    }
    if (typeof props.offset === "string") {
      const offset2 = props.offset.split(" ").map(parseFloat);
      if (offset2.length < 2) offset2.push(0);
      return offset2;
    }
    return typeof props.offset === "number" ? [props.offset, 0] : [0, 0];
  });
  let observe = false;
  let lastFrame = -1;
  const flipped = new CircularBuffer(4);
  const observer = new ResizeObserver(() => {
    if (!observe) return;
    requestAnimationFrame((newTime) => {
      if (newTime !== lastFrame) flipped.clear();
      requestAnimationFrame((newNewTime) => {
        lastFrame = newNewTime;
      });
    });
    if (flipped.isFull) {
      const values = flipped.values();
      if (deepEqual(values.at(-1), values.at(-3)) && !deepEqual(values.at(-1), values.at(-2))) {
        return;
      }
    }
    const result = updateLocation();
    if (result) flipped.push(result.flipped);
  });
  let targetBox = new Box({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  watch(data.target, (newTarget, oldTarget) => {
    if (oldTarget && !Array.isArray(oldTarget)) observer.unobserve(oldTarget);
    if (!Array.isArray(newTarget)) {
      if (newTarget) observer.observe(newTarget);
    } else if (!deepEqual(newTarget, oldTarget)) {
      updateLocation();
    }
  }, {
    immediate: true
  });
  watch(data.contentEl, (newContentEl, oldContentEl) => {
    if (oldContentEl) observer.unobserve(oldContentEl);
    if (newContentEl) observer.observe(newContentEl);
  }, {
    immediate: true
  });
  onScopeDispose(() => {
    observer.disconnect();
  });
  function updateLocation() {
    observe = false;
    requestAnimationFrame(() => observe = true);
    if (!data.target.value || !data.contentEl.value) return;
    if (Array.isArray(data.target.value) || data.target.value.offsetParent || data.target.value.getClientRects().length) {
      targetBox = getTargetBox(data.target.value);
    }
    const contentBox = getIntrinsicSize(data.contentEl.value, data.isRtl.value);
    const scrollParents = getScrollParents(data.contentEl.value);
    const viewportMargin = 12;
    if (!scrollParents.length) {
      scrollParents.push((void 0).documentElement);
      if (!(data.contentEl.value.style.top && data.contentEl.value.style.left)) {
        contentBox.x -= parseFloat((void 0).documentElement.style.getPropertyValue("--v-body-scroll-x") || 0);
        contentBox.y -= parseFloat((void 0).documentElement.style.getPropertyValue("--v-body-scroll-y") || 0);
      }
    }
    const viewport = scrollParents.reduce((box, el) => {
      const scrollBox = getElementBox(el);
      if (box) {
        return new Box({
          x: Math.max(box.left, scrollBox.left),
          y: Math.max(box.top, scrollBox.top),
          width: Math.min(box.right, scrollBox.right) - Math.max(box.left, scrollBox.left),
          height: Math.min(box.bottom, scrollBox.bottom) - Math.max(box.top, scrollBox.top)
        });
      }
      return scrollBox;
    }, void 0);
    viewport.x += viewportMargin;
    viewport.y += viewportMargin;
    viewport.width -= viewportMargin * 2;
    viewport.height -= viewportMargin * 2;
    let placement = {
      anchor: preferredAnchor.value,
      origin: preferredOrigin.value
    };
    function checkOverflow(_placement) {
      const box = new Box(contentBox);
      const targetPoint = anchorToPoint(_placement.anchor, targetBox);
      const contentPoint = anchorToPoint(_placement.origin, box);
      let {
        x: x2,
        y: y2
      } = getOffset(targetPoint, contentPoint);
      switch (_placement.anchor.side) {
        case "top":
          y2 -= offset.value[0];
          break;
        case "bottom":
          y2 += offset.value[0];
          break;
        case "left":
          x2 -= offset.value[0];
          break;
        case "right":
          x2 += offset.value[0];
          break;
      }
      switch (_placement.anchor.align) {
        case "top":
          y2 -= offset.value[1];
          break;
        case "bottom":
          y2 += offset.value[1];
          break;
        case "left":
          x2 -= offset.value[1];
          break;
        case "right":
          x2 += offset.value[1];
          break;
      }
      box.x += x2;
      box.y += y2;
      box.width = Math.min(box.width, maxWidth.value);
      box.height = Math.min(box.height, maxHeight.value);
      const overflows = getOverflow(box, viewport);
      return {
        overflows,
        x: x2,
        y: y2
      };
    }
    let x = 0;
    let y = 0;
    const available = {
      x: 0,
      y: 0
    };
    const flipped2 = {
      x: false,
      y: false
    };
    let resets = -1;
    while (true) {
      if (resets++ > 10) {
        consoleError("Infinite loop detected in connectedLocationStrategy");
        break;
      }
      const {
        x: _x,
        y: _y,
        overflows
      } = checkOverflow(placement);
      x += _x;
      y += _y;
      contentBox.x += _x;
      contentBox.y += _y;
      {
        const axis2 = getAxis(placement.anchor);
        const hasOverflowX = overflows.x.before || overflows.x.after;
        const hasOverflowY = overflows.y.before || overflows.y.after;
        let reset = false;
        ["x", "y"].forEach((key) => {
          if (key === "x" && hasOverflowX && !flipped2.x || key === "y" && hasOverflowY && !flipped2.y) {
            const newPlacement = {
              anchor: {
                ...placement.anchor
              },
              origin: {
                ...placement.origin
              }
            };
            const flip = key === "x" ? axis2 === "y" ? flipAlign : flipSide : axis2 === "y" ? flipSide : flipAlign;
            newPlacement.anchor = flip(newPlacement.anchor);
            newPlacement.origin = flip(newPlacement.origin);
            const {
              overflows: newOverflows
            } = checkOverflow(newPlacement);
            if (newOverflows[key].before <= overflows[key].before && newOverflows[key].after <= overflows[key].after || newOverflows[key].before + newOverflows[key].after < (overflows[key].before + overflows[key].after) / 2) {
              placement = newPlacement;
              reset = flipped2[key] = true;
            }
          }
        });
        if (reset) continue;
      }
      if (overflows.x.before) {
        if (!props.stickToTarget) x += overflows.x.before;
        contentBox.x += overflows.x.before;
      }
      if (overflows.x.after) {
        if (!props.stickToTarget) x -= overflows.x.after;
        contentBox.x -= overflows.x.after;
      }
      if (overflows.y.before) {
        if (!props.stickToTarget) y += overflows.y.before;
        contentBox.y += overflows.y.before;
      }
      if (overflows.y.after) {
        if (!props.stickToTarget) y -= overflows.y.after;
        contentBox.y -= overflows.y.after;
      }
      {
        const overflows2 = getOverflow(contentBox, viewport);
        available.x = viewport.width - overflows2.x.before - overflows2.x.after;
        available.y = viewport.height - overflows2.y.before - overflows2.y.after;
        if (!props.stickToTarget) x += overflows2.x.before;
        contentBox.x += overflows2.x.before;
        if (!props.stickToTarget) y += overflows2.y.before;
        contentBox.y += overflows2.y.before;
      }
      break;
    }
    const axis = getAxis(placement.anchor);
    Object.assign(contentStyles.value, {
      "--v-overlay-anchor-origin": `${placement.anchor.side} ${placement.anchor.align}`,
      transformOrigin: `${placement.origin.side} ${placement.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: convertToUnit(pixelRound(y)),
      left: data.isRtl.value ? void 0 : convertToUnit(pixelRound(x)),
      right: data.isRtl.value ? convertToUnit(pixelRound(-x)) : void 0,
      minWidth: convertToUnit(axis === "y" ? Math.min(minWidth.value, targetBox.width) : minWidth.value),
      maxWidth: convertToUnit(pixelCeil(clamp(available.x, minWidth.value === Infinity ? 0 : minWidth.value, maxWidth.value))),
      maxHeight: convertToUnit(pixelCeil(clamp(available.y, minHeight.value === Infinity ? 0 : minHeight.value, maxHeight.value)))
    });
    return {
      available,
      contentBox,
      flipped: flipped2
    };
  }
  watch(() => [preferredAnchor.value, preferredOrigin.value, props.offset, props.minWidth, props.minHeight, props.maxWidth, props.maxHeight], () => updateLocation());
  nextTick(() => {
    const result = updateLocation();
    if (!result) return;
    const {
      available,
      contentBox
    } = result;
    if (contentBox.height > available.y) {
      requestAnimationFrame(() => {
        updateLocation();
        requestAnimationFrame(() => {
          updateLocation();
        });
      });
    }
  });
  return {
    updateLocation
  };
}
function pixelRound(val) {
  return Math.round(val * devicePixelRatio) / devicePixelRatio;
}
function pixelCeil(val) {
  return Math.ceil(val * devicePixelRatio) / devicePixelRatio;
}
let clean = true;
const frames = [];
function requestNewFrame(cb) {
  if (!clean || frames.length) {
    frames.push(cb);
    run();
  } else {
    clean = false;
    cb();
    run();
  }
}
let raf = -1;
function run() {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    const frame = frames.shift();
    if (frame) frame();
    if (frames.length) run();
    else clean = true;
  });
}
const scrollStrategies = {
  none: null,
  close: closeScrollStrategy,
  block: blockScrollStrategy,
  reposition: repositionScrollStrategy
};
const makeScrollStrategyProps = propsFactory({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (val) => typeof val === "function" || val in scrollStrategies
  }
}, "VOverlay-scroll-strategies");
function closeScrollStrategy(data) {
  function onScroll(e) {
    data.isActive.value = false;
  }
  bindScroll(getTargetEl(data.target.value, data.contentEl.value), onScroll);
}
function blockScrollStrategy(data, props) {
  const offsetParent = data.root.value?.offsetParent;
  const target = getTargetEl(data.target.value, data.contentEl.value);
  const scrollElements = [.../* @__PURE__ */ new Set([...getScrollParents(target, props.contained ? offsetParent : void 0), ...getScrollParents(data.contentEl.value, props.contained ? offsetParent : void 0)])].filter((el) => !el.classList.contains("v-overlay-scroll-blocked"));
  const scrollbarWidth = (void 0).innerWidth - (void 0).documentElement.offsetWidth;
  const scrollableParent = ((el) => hasScrollbar(el) && el)(offsetParent || (void 0).documentElement);
  if (scrollableParent) {
    data.root.value.classList.add("v-overlay--scroll-blocked");
  }
  scrollElements.forEach((el, i) => {
    el.style.setProperty("--v-body-scroll-x", convertToUnit(-el.scrollLeft));
    el.style.setProperty("--v-body-scroll-y", convertToUnit(-el.scrollTop));
    if (el !== (void 0).documentElement) {
      el.style.setProperty("--v-scrollbar-offset", convertToUnit(scrollbarWidth));
    }
    el.classList.add("v-overlay-scroll-blocked");
  });
  onScopeDispose(() => {
    scrollElements.forEach((el, i) => {
      const x = parseFloat(el.style.getPropertyValue("--v-body-scroll-x"));
      const y = parseFloat(el.style.getPropertyValue("--v-body-scroll-y"));
      const scrollBehavior = el.style.scrollBehavior;
      el.style.scrollBehavior = "auto";
      el.style.removeProperty("--v-body-scroll-x");
      el.style.removeProperty("--v-body-scroll-y");
      el.style.removeProperty("--v-scrollbar-offset");
      el.classList.remove("v-overlay-scroll-blocked");
      el.scrollLeft = -x;
      el.scrollTop = -y;
      el.style.scrollBehavior = scrollBehavior;
    });
    if (scrollableParent) {
      data.root.value.classList.remove("v-overlay--scroll-blocked");
    }
  });
}
function repositionScrollStrategy(data, props, scope) {
  let slow = false;
  let raf2 = -1;
  let ric = -1;
  function update(e) {
    requestNewFrame(() => {
      const start = performance.now();
      data.updateLocation.value?.(e);
      const time = performance.now() - start;
      slow = time / (1e3 / 60) > 2;
    });
  }
  ric = (typeof requestIdleCallback === "undefined" ? (cb) => cb() : requestIdleCallback)(() => {
    scope.run(() => {
      bindScroll(getTargetEl(data.target.value, data.contentEl.value), (e) => {
        if (slow) {
          cancelAnimationFrame(raf2);
          raf2 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(() => {
              update(e);
            });
          });
        } else {
          update(e);
        }
      });
    });
  });
  onScopeDispose(() => {
    typeof cancelIdleCallback !== "undefined" && cancelIdleCallback(ric);
    cancelAnimationFrame(raf2);
  });
}
function getTargetEl(target, contentEl) {
  return Array.isArray(target) ? (void 0).elementsFromPoint(...target).find((el) => !contentEl?.contains(el)) : target ?? contentEl;
}
function bindScroll(el, onScroll) {
  const scrollElements = [void 0, ...getScrollParents(el)];
  scrollElements.forEach((el2) => {
    el2.addEventListener("scroll", onScroll, {
      passive: true
    });
  });
  onScopeDispose(() => {
    scrollElements.forEach((el2) => {
      el2.removeEventListener("scroll", onScroll);
    });
  });
}
const VMenuSymbol = Symbol.for("vuetify:v-menu");
const makeActivatorProps = propsFactory({
  target: [String, Object],
  activator: [String, Object],
  activatorProps: {
    type: Object,
    default: () => ({})
  },
  openOnClick: {
    type: Boolean,
    default: void 0
  },
  openOnHover: Boolean,
  openOnFocus: {
    type: Boolean,
    default: void 0
  },
  closeOnContentClick: Boolean,
  ...makeDelayProps()
}, "VOverlay-activator");
function useActivator(props, _ref) {
  let {
    isActive,
    isTop,
    contentEl
  } = _ref;
  const vm = getCurrentInstance("useActivator");
  const activatorEl = ref();
  let isHovered = false;
  let isFocused = false;
  let firstEnter = true;
  const openOnFocus = computed(() => props.openOnFocus || props.openOnFocus == null && props.openOnHover);
  const openOnClick = computed(() => props.openOnClick || props.openOnClick == null && !props.openOnHover && !openOnFocus.value);
  const {
    runOpenDelay,
    runCloseDelay
  } = useDelay(props, (value) => {
    if (value === (props.openOnHover && isHovered || openOnFocus.value && isFocused) && !(props.openOnHover && isActive.value && !isTop.value)) {
      if (isActive.value !== value) {
        firstEnter = true;
      }
      isActive.value = value;
    }
  });
  const cursorTarget = ref();
  const availableEvents = {
    onClick: (e) => {
      e.stopPropagation();
      activatorEl.value = e.currentTarget || e.target;
      if (!isActive.value) {
        cursorTarget.value = [e.clientX, e.clientY];
      }
      isActive.value = !isActive.value;
    },
    onMouseenter: (e) => {
      if (e.sourceCapabilities?.firesTouchEvents) return;
      isHovered = true;
      activatorEl.value = e.currentTarget || e.target;
      runOpenDelay();
    },
    onMouseleave: (e) => {
      isHovered = false;
      runCloseDelay();
    },
    onFocus: (e) => {
      if (matchesSelector(e.target) === false) return;
      isFocused = true;
      e.stopPropagation();
      activatorEl.value = e.currentTarget || e.target;
      runOpenDelay();
    },
    onBlur: (e) => {
      isFocused = false;
      e.stopPropagation();
      runCloseDelay();
    }
  };
  const activatorEvents = computed(() => {
    const events = {};
    if (openOnClick.value) {
      events.onClick = availableEvents.onClick;
    }
    if (props.openOnHover) {
      events.onMouseenter = availableEvents.onMouseenter;
      events.onMouseleave = availableEvents.onMouseleave;
    }
    if (openOnFocus.value) {
      events.onFocus = availableEvents.onFocus;
      events.onBlur = availableEvents.onBlur;
    }
    return events;
  });
  const contentEvents = computed(() => {
    const events = {};
    if (props.openOnHover) {
      events.onMouseenter = () => {
        isHovered = true;
        runOpenDelay();
      };
      events.onMouseleave = () => {
        isHovered = false;
        runCloseDelay();
      };
    }
    if (openOnFocus.value) {
      events.onFocusin = () => {
        isFocused = true;
        runOpenDelay();
      };
      events.onFocusout = () => {
        isFocused = false;
        runCloseDelay();
      };
    }
    if (props.closeOnContentClick) {
      const menu = inject(VMenuSymbol, null);
      events.onClick = () => {
        isActive.value = false;
        menu?.closeParents();
      };
    }
    return events;
  });
  const scrimEvents = computed(() => {
    const events = {};
    if (props.openOnHover) {
      events.onMouseenter = () => {
        if (firstEnter) {
          isHovered = true;
          firstEnter = false;
          runOpenDelay();
        }
      };
      events.onMouseleave = () => {
        isHovered = false;
        runCloseDelay();
      };
    }
    return events;
  });
  watch(isTop, (val) => {
    if (val && (props.openOnHover && !isHovered && (!openOnFocus.value || !isFocused) || openOnFocus.value && !isFocused && (!props.openOnHover || !isHovered)) && !contentEl.value?.contains((void 0).activeElement)) {
      isActive.value = false;
    }
  });
  watch(isActive, (val) => {
    if (!val) {
      setTimeout(() => {
        cursorTarget.value = void 0;
      });
    }
  }, {
    flush: "post"
  });
  const activatorRef = templateRef();
  watchEffect(() => {
    if (!activatorRef.value) return;
    nextTick(() => {
      activatorEl.value = activatorRef.el;
    });
  });
  const targetRef = templateRef();
  const target = computed(() => {
    if (props.target === "cursor" && cursorTarget.value) return cursorTarget.value;
    if (targetRef.value) return targetRef.el;
    return getTarget(props.target, vm) || activatorEl.value;
  });
  const targetEl = computed(() => {
    return Array.isArray(target.value) ? void 0 : target.value;
  });
  watch(() => !!props.activator, (val) => {
  }, {
    flush: "post",
    immediate: true
  });
  onScopeDispose(() => {
  });
  return {
    activatorEl,
    activatorRef,
    target,
    targetEl,
    targetRef,
    activatorEvents,
    contentEvents,
    scrimEvents
  };
}
function getTarget(selector, vm) {
  if (!selector) return;
  let target;
  if (selector === "parent") {
    let el = vm?.proxy?.$el?.parentNode;
    while (el?.hasAttribute("data-no-activator")) {
      el = el.parentNode;
    }
    target = el;
  } else if (typeof selector === "string") {
    target = (void 0).querySelector(selector);
  } else if ("$el" in selector) {
    target = selector.$el;
  } else {
    target = selector;
  }
  return target;
}
function useHydration() {
  return shallowRef(false);
}
const makeLazyProps = propsFactory({
  eager: Boolean
}, "lazy");
function useLazy(props, active) {
  const isBooted = shallowRef(false);
  const hasContent = toRef(() => isBooted.value || props.eager || active.value);
  watch(active, () => isBooted.value = true);
  function onAfterLeave() {
    if (!props.eager) isBooted.value = false;
  }
  return {
    isBooted,
    hasContent,
    onAfterLeave
  };
}
const StackSymbol = Symbol.for("vuetify:stack");
const globalStack = reactive([]);
function useStack(isActive, zIndex, disableGlobalStack) {
  const vm = getCurrentInstance("useStack");
  const createStackEntry = !disableGlobalStack;
  const parent = inject(StackSymbol, void 0);
  const stack = reactive({
    activeChildren: /* @__PURE__ */ new Set()
  });
  provide(StackSymbol, stack);
  const _zIndex = shallowRef(Number(toValue(zIndex)));
  useToggleScope(isActive, () => {
    const lastZIndex = globalStack.at(-1)?.[1];
    _zIndex.value = lastZIndex ? lastZIndex + 10 : Number(toValue(zIndex));
    if (createStackEntry) {
      globalStack.push([vm.uid, _zIndex.value]);
    }
    parent?.activeChildren.add(vm.uid);
    onScopeDispose(() => {
      if (createStackEntry) {
        const idx = toRaw(globalStack).findIndex((v) => v[0] === vm.uid);
        globalStack.splice(idx, 1);
      }
      parent?.activeChildren.delete(vm.uid);
    });
  });
  const globalTop = shallowRef(true);
  if (createStackEntry) {
    watchEffect(() => {
      const _isTop = globalStack.at(-1)?.[0] === vm.uid;
      setTimeout(() => globalTop.value = _isTop);
    });
  }
  const localTop = toRef(() => !stack.activeChildren.size);
  return {
    globalTop: readonly(globalTop),
    localTop,
    stackStyles: toRef(() => ({
      zIndex: _zIndex.value
    }))
  };
}
function useTeleport(target) {
  const teleportTarget = computed(() => {
    target();
    return void 0;
  });
  return {
    teleportTarget
  };
}
function defaultConditional() {
  return true;
}
function checkEvent(e, el, binding) {
  if (!e || checkIsActive(e, binding) === false) return false;
  const root = attachedRoot(el);
  if (typeof ShadowRoot !== "undefined" && root instanceof ShadowRoot && root.host === e.target) return false;
  const elements = (typeof binding.value === "object" && binding.value.include || (() => []))();
  elements.push(el);
  return !elements.some((el2) => el2?.contains(e.target));
}
function checkIsActive(e, binding) {
  const isActive = typeof binding.value === "object" && binding.value.closeConditional || defaultConditional;
  return isActive(e);
}
function directive(e, el, binding) {
  const handler = typeof binding.value === "function" ? binding.value : binding.value.handler;
  e.shadowTarget = e.target;
  el._clickOutside.lastMousedownWasOutside && checkEvent(e, el, binding) && setTimeout(() => {
    checkIsActive(e, binding) && handler && handler(e);
  }, 0);
}
function handleShadow(el, callback) {
  const root = attachedRoot(el);
  callback(void 0);
  if (typeof ShadowRoot !== "undefined" && root instanceof ShadowRoot) {
    callback(root);
  }
}
const ClickOutside = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(el, binding) {
    const onClick = (e) => directive(e, el, binding);
    const onMousedown = (e) => {
      el._clickOutside.lastMousedownWasOutside = checkEvent(e, el, binding);
    };
    handleShadow(el, (app) => {
      app.addEventListener("click", onClick, true);
      app.addEventListener("mousedown", onMousedown, true);
    });
    if (!el._clickOutside) {
      el._clickOutside = {
        lastMousedownWasOutside: false
      };
    }
    el._clickOutside[binding.instance.$.uid] = {
      onClick,
      onMousedown
    };
  },
  beforeUnmount(el, binding) {
    if (!el._clickOutside) return;
    handleShadow(el, (app) => {
      if (!app || !el._clickOutside?.[binding.instance.$.uid]) return;
      const {
        onClick,
        onMousedown
      } = el._clickOutside[binding.instance.$.uid];
      app.removeEventListener("click", onClick, true);
      app.removeEventListener("mousedown", onMousedown, true);
    });
    delete el._clickOutside[binding.instance.$.uid];
  }
};
function Scrim(props) {
  const {
    modelValue,
    color,
    ...rest
  } = props;
  return createVNode(Transition, {
    "name": "fade-transition",
    "appear": true
  }, {
    default: () => [props.modelValue && createElementVNode("div", mergeProps({
      "class": ["v-overlay__scrim", props.color.backgroundColorClasses.value],
      "style": props.color.backgroundColorStyles.value
    }, rest), null)]
  });
}
const makeVOverlayProps = propsFactory({
  absolute: Boolean,
  attach: [Boolean, String, Object],
  closeOnBack: {
    type: Boolean,
    default: true
  },
  contained: Boolean,
  contentClass: null,
  contentProps: null,
  disabled: Boolean,
  opacity: [Number, String],
  noClickAnimation: Boolean,
  modelValue: Boolean,
  persistent: Boolean,
  scrim: {
    type: [Boolean, String],
    default: true
  },
  zIndex: {
    type: [Number, String],
    default: 2e3
  },
  ...makeActivatorProps(),
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeLazyProps(),
  ...makeLocationStrategyProps(),
  ...makeScrollStrategyProps(),
  ...makeThemeProps(),
  ...makeTransitionProps()
}, "VOverlay");
const VOverlay = genericComponent()({
  name: "VOverlay",
  directives: {
    vClickOutside: ClickOutside
  },
  inheritAttrs: false,
  props: {
    _disableGlobalStack: Boolean,
    ...makeVOverlayProps()
  },
  emits: {
    "click:outside": (e) => true,
    "update:modelValue": (value) => true,
    keydown: (e) => true,
    afterEnter: () => true,
    afterLeave: () => true
  },
  setup(props, _ref) {
    let {
      slots,
      attrs,
      emit
    } = _ref;
    const vm = getCurrentInstance("VOverlay");
    const root = ref();
    const scrimEl = ref();
    const contentEl = ref();
    const model = useProxiedModel(props, "modelValue");
    const isActive = computed({
      get: () => model.value,
      set: (v) => {
        if (!(v && props.disabled)) model.value = v;
      }
    });
    const {
      themeClasses
    } = provideTheme(props);
    const {
      rtlClasses
    } = useRtl();
    const {
      hasContent,
      onAfterLeave: _onAfterLeave
    } = useLazy(props, isActive);
    const scrimColor = useBackgroundColor(() => {
      return typeof props.scrim === "string" ? props.scrim : null;
    });
    const {
      globalTop,
      localTop,
      stackStyles
    } = useStack(isActive, () => props.zIndex, props._disableGlobalStack);
    const {
      activatorEl,
      activatorRef,
      target,
      targetRef,
      activatorEvents,
      contentEvents,
      scrimEvents
    } = useActivator(props, {
      isActive,
      isTop: localTop,
      contentEl
    });
    const {
      teleportTarget
    } = useTeleport(() => {
      const target2 = props.attach || props.contained;
      if (target2) return target2;
      const rootNode = activatorEl?.value?.getRootNode() || vm.proxy?.$el?.getRootNode();
      if (rootNode instanceof ShadowRoot) return rootNode;
      return false;
    });
    const {
      dimensionStyles
    } = useDimension(props);
    const isMounted = useHydration();
    const {
      scopeId
    } = useScopeId();
    watch(() => props.disabled, (v) => {
      if (v) isActive.value = false;
    });
    const {
      contentStyles,
      updateLocation
    } = useLocationStrategies();
    function onClickOutside(e) {
      emit("click:outside", e);
      if (!props.persistent) isActive.value = false;
      else animateClick();
    }
    function closeConditional(e) {
      return isActive.value && globalTop.value && // If using scrim, only close if clicking on it rather than anything opened on top
      (!props.scrim || e.target === scrimEl.value || e instanceof MouseEvent && e.shadowTarget === scrimEl.value);
    }
    function onKeydownSelf(e) {
      if (e.key === "Escape" && !globalTop.value) return;
      emit("keydown", e);
    }
    useRouter();
    useToggleScope(() => props.closeOnBack, () => {
    });
    const top = ref();
    watch(() => isActive.value && (props.absolute || props.contained) && teleportTarget.value == null, (val) => {
      if (val) {
        const scrollParent = getScrollParent(root.value);
        if (scrollParent && scrollParent !== (void 0).scrollingElement) {
          top.value = scrollParent.scrollTop;
        }
      }
    });
    function animateClick() {
      if (props.noClickAnimation) return;
      contentEl.value && animate(contentEl.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: standardEasing
      });
    }
    function onAfterEnter() {
      emit("afterEnter");
    }
    function onAfterLeave() {
      _onAfterLeave();
      emit("afterLeave");
    }
    useRender(() => createElementVNode(Fragment, null, [slots.activator?.({
      isActive: isActive.value,
      targetRef,
      props: mergeProps({
        ref: activatorRef
      }, activatorEvents.value, props.activatorProps)
    }), isMounted.value && hasContent.value && createVNode(Teleport, {
      "disabled": !teleportTarget.value,
      "to": teleportTarget.value
    }, {
      default: () => [createElementVNode("div", mergeProps({
        "class": ["v-overlay", {
          "v-overlay--absolute": props.absolute || props.contained,
          "v-overlay--active": isActive.value,
          "v-overlay--contained": props.contained
        }, themeClasses.value, rtlClasses.value, props.class],
        "style": [stackStyles.value, {
          "--v-overlay-opacity": props.opacity,
          top: convertToUnit(top.value)
        }, props.style],
        "ref": root,
        "onKeydown": onKeydownSelf
      }, scopeId, attrs), [createVNode(Scrim, mergeProps({
        "color": scrimColor,
        "modelValue": isActive.value && !!props.scrim,
        "ref": scrimEl
      }, scrimEvents.value), null), createVNode(MaybeTransition, {
        "appear": true,
        "persisted": true,
        "transition": props.transition,
        "target": target.value,
        "onAfterEnter": onAfterEnter,
        "onAfterLeave": onAfterLeave
      }, {
        default: () => [withDirectives(createElementVNode("div", mergeProps({
          "ref": contentEl,
          "class": ["v-overlay__content", props.contentClass],
          "style": [dimensionStyles.value, contentStyles.value]
        }, contentEvents.value, props.contentProps), [slots.default?.({
          isActive
        })]), [[vShow, isActive.value], [ClickOutside, {
          handler: onClickOutside,
          closeConditional,
          include: () => [activatorEl.value]
        }]])]
      })])]
    })]));
    return {
      activatorEl,
      scrimEl,
      target,
      animateClick,
      contentEl,
      globalTop,
      localTop,
      updateLocation
    };
  }
});
const makeVMenuProps = propsFactory({
  // TODO
  // disableKeys: Boolean,
  id: String,
  submenu: Boolean,
  disableInitialFocus: Boolean,
  ...omit(makeVOverlayProps({
    closeDelay: 250,
    closeOnContentClick: true,
    locationStrategy: "connected",
    location: void 0,
    openDelay: 300,
    scrim: false,
    scrollStrategy: "reposition",
    transition: {
      component: VDialogTransition
    }
  }), ["absolute"])
}, "VMenu");
const VMenu = genericComponent()({
  name: "VMenu",
  props: makeVMenuProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const {
      scopeId
    } = useScopeId();
    const {
      isRtl
    } = useRtl();
    const uid = useId();
    const id = toRef(() => props.id || `v-menu-${uid}`);
    const overlay = ref();
    const parent = inject(VMenuSymbol, null);
    const openChildren = shallowRef(/* @__PURE__ */ new Set());
    provide(VMenuSymbol, {
      register() {
        openChildren.value.add(uid);
      },
      unregister() {
        openChildren.value.delete(uid);
      },
      closeParents(e) {
        setTimeout(() => {
          if (!openChildren.value.size && !props.persistent && (e == null || overlay.value?.contentEl && !isClickInsideElement(e, overlay.value.contentEl))) {
            isActive.value = false;
            parent?.closeParents();
          }
        }, 40);
      }
    });
    watch(isActive, (val) => {
      if (val) {
        parent?.register();
      } else {
        parent?.unregister();
      }
    }, {
      immediate: true
    });
    function onClickOutside(e) {
      parent?.closeParents(e);
    }
    function onKeydown(e) {
      if (props.disabled) return;
      if (e.key === "Tab" || e.key === "Enter" && !props.closeOnContentClick) {
        if (e.key === "Enter" && (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement && !!e.target.closest("form"))) return;
        if (e.key === "Enter") e.preventDefault();
        const nextElement = getNextElement(focusableChildren(overlay.value?.contentEl, false), e.shiftKey ? "prev" : "next", (el) => el.tabIndex >= 0);
        if (!nextElement) {
          isActive.value = false;
          overlay.value?.activatorEl?.focus();
        }
      } else if (props.submenu && e.key === (isRtl.value ? "ArrowRight" : "ArrowLeft")) {
        isActive.value = false;
        overlay.value?.activatorEl?.focus();
      }
    }
    function onActivatorKeydown(e) {
      if (props.disabled) return;
      const el = overlay.value?.contentEl;
      if (el && isActive.value) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          e.stopImmediatePropagation();
          focusChild(el, "next");
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          e.stopImmediatePropagation();
          focusChild(el, "prev");
        } else if (props.submenu) {
          if (e.key === (isRtl.value ? "ArrowRight" : "ArrowLeft")) {
            isActive.value = false;
          } else if (e.key === (isRtl.value ? "ArrowLeft" : "ArrowRight")) {
            e.preventDefault();
            focusChild(el, "first");
          }
        }
      } else if (props.submenu ? e.key === (isRtl.value ? "ArrowLeft" : "ArrowRight") : ["ArrowDown", "ArrowUp"].includes(e.key)) {
        isActive.value = true;
        e.preventDefault();
        setTimeout(() => setTimeout(() => onActivatorKeydown(e)));
      }
    }
    const activatorProps = computed(() => mergeProps({
      "aria-haspopup": "menu",
      "aria-expanded": String(isActive.value),
      "aria-controls": id.value,
      onKeydown: onActivatorKeydown
    }, props.activatorProps));
    useRender(() => {
      const overlayProps = VOverlay.filterProps(props);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "id": id.value,
        "class": ["v-menu", props.class],
        "style": props.style
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "absolute": true,
        "activatorProps": activatorProps.value,
        "location": props.location ?? (props.submenu ? "end" : "bottom"),
        "onClick:outside": onClickOutside,
        "onKeydown": onKeydown
      }, scopeId), {
        activator: slots.activator,
        default: function() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createVNode(VDefaultsProvider, {
            "root": "VMenu"
          }, {
            default: () => [slots.default?.(...args)]
          });
        }
      });
    });
    return forwardRefs({
      id,
      ΨopenChildren: openChildren
    }, overlay);
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TaskItem",
  __ssrInlineRender: true,
  props: {
    task: {}
  },
  emits: ["edit", "remove", "toggle"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    function toggle() {
      emit("toggle", props.task);
    }
    function formatJalaliDate(date) {
      try {
        const parts = new Intl.DateTimeFormat("fa-IR", { year: "numeric", month: "long", day: "numeric" }).formatToParts(date);
        const day = parts.find((p) => p.type === "day")?.value || "";
        const monthName = parts.find((p) => p.type === "month")?.value || "";
        const year = parts.find((p) => p.type === "year")?.value || "";
        return `${day} ${monthName} ${year}`;
      } catch {
        return date.toLocaleDateString("fa-IR");
      }
    }
    const showFull = ref(false);
    const displayDesc = computed(() => {
      const text = props.task.description || "";
      if (showFull.value) return text;
      if (text.length <= 60) return text;
      return text.slice(0, 60) + "...";
    });
    const statusClass = computed(() => {
      if (props.task.status === TaskStatus.Todo) return "status-todo";
      if (props.task.status === TaskStatus.InProgress) return "status-inprogress";
      return "status-done";
    });
    const chipColor = computed(() => {
      if (props.task.status === TaskStatus.Todo) return "warning";
      if (props.task.status === TaskStatus.InProgress) return "info";
      return "success";
    });
    const statusLabel = computed(() => {
      if (props.task.status === TaskStatus.Todo) return "انجام نشده";
      if (props.task.status === TaskStatus.InProgress) return "در حال انجام";
      return "انجام شده";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VCard, mergeProps({
        class: [["task-card", unref(statusClass), { "task-card-done": _ctx.task.status === unref(TaskStatus).Done }], "mb-2 px-2 py-2"],
        elevation: "2",
        dir: "rtl"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="d-flex align-center justify-space-between"${_scopeId}><div class="d-flex align-center" style="${ssrRenderStyle({ "gap": "8px" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(VCheckboxBtn, {
              "model-value": _ctx.task.status === unref(TaskStatus).Done,
              onClick: ($event) => toggle()
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-subtitle-2"${_scopeId}>${ssrInterpolate(_ctx.task.title)}</div>`);
            _push2(ssrRenderComponent(VChip, {
              color: unref(chipColor),
              size: "small",
              label: "",
              variant: "tonal",
              class: "mx-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(statusLabel))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(statusLabel)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(VMenu, null, {
              activator: withCtx(({ props: mProps }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn, mergeProps(mProps, {
                    icon: "",
                    variant: "text",
                    density: "comfortable",
                    class: "mx-0",
                    rounded: "lg"
                  }), {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VIcon, { icon: "mdi-dots-vertical" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VIcon, { icon: "mdi-dots-vertical" })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VBtn, mergeProps(mProps, {
                      icon: "",
                      variant: "text",
                      density: "comfortable",
                      class: "mx-0",
                      rounded: "lg"
                    }), {
                      default: withCtx(() => [
                        createVNode(VIcon, { icon: "mdi-dots-vertical" })
                      ]),
                      _: 1
                    }, 16)
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VList, { density: "compact" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VListItem, {
                          value: "edit",
                          onClick: ($event) => emit("edit", _ctx.task)
                        }, {
                          append: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VIcon, { icon: "mdi-pencil-outline" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VIcon, { icon: "mdi-pencil-outline" })
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItemTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`ویرایش`);
                                  } else {
                                    return [
                                      createTextVNode("ویرایش")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VListItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("ویرایش")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VListItem, {
                          value: "remove",
                          onClick: ($event) => emit("remove", _ctx.task)
                        }, {
                          append: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VIcon, {
                                icon: "mdi-delete-outline",
                                color: "error"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VIcon, {
                                  icon: "mdi-delete-outline",
                                  color: "error"
                                })
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItemTitle, { class: "text-error" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`حذف`);
                                  } else {
                                    return [
                                      createTextVNode("حذف")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VListItemTitle, { class: "text-error" }, {
                                  default: withCtx(() => [
                                    createTextVNode("حذف")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VListItem, {
                            value: "edit",
                            onClick: withModifiers(($event) => emit("edit", _ctx.task), ["stop"])
                          }, {
                            append: withCtx(() => [
                              createVNode(VIcon, { icon: "mdi-pencil-outline" })
                            ]),
                            default: withCtx(() => [
                              createVNode(VListItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("ویرایش")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(VListItem, {
                            value: "remove",
                            onClick: withModifiers(($event) => emit("remove", _ctx.task), ["stop"])
                          }, {
                            append: withCtx(() => [
                              createVNode(VIcon, {
                                icon: "mdi-delete-outline",
                                color: "error"
                              })
                            ]),
                            default: withCtx(() => [
                              createVNode(VListItemTitle, { class: "text-error" }, {
                                default: withCtx(() => [
                                  createTextVNode("حذف")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VList, { density: "compact" }, {
                      default: withCtx(() => [
                        createVNode(VListItem, {
                          value: "edit",
                          onClick: withModifiers(($event) => emit("edit", _ctx.task), ["stop"])
                        }, {
                          append: withCtx(() => [
                            createVNode(VIcon, { icon: "mdi-pencil-outline" })
                          ]),
                          default: withCtx(() => [
                            createVNode(VListItemTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("ویرایش")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(VListItem, {
                          value: "remove",
                          onClick: withModifiers(($event) => emit("remove", _ctx.task), ["stop"])
                        }, {
                          append: withCtx(() => [
                            createVNode(VIcon, {
                              icon: "mdi-delete-outline",
                              color: "error"
                            })
                          ]),
                          default: withCtx(() => [
                            createVNode(VListItemTitle, { class: "text-error" }, {
                              default: withCtx(() => [
                                createTextVNode("حذف")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="mt-2 px-2"${_scopeId}><div class="text-caption text-medium-emphasis" style="${ssrRenderStyle({ "white-space": "normal", "word-break": "break-word", "overflow-wrap": "anywhere" })}"${_scopeId}>${ssrInterpolate(unref(displayDesc))} `);
            if (!unref(showFull) && (_ctx.task.description || "").length > 60) {
              _push2(ssrRenderComponent(VBtn, {
                variant: "text",
                size: "x-small",
                class: "px-1",
                color: "primary",
                onClick: ($event) => showFull.value = true
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` بیشتر `);
                  } else {
                    return [
                      createTextVNode(" بیشتر ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else if (unref(showFull) && (_ctx.task.description || "").length > 60) {
              _push2(ssrRenderComponent(VBtn, {
                variant: "text",
                size: "x-small",
                class: "px-1",
                color: "primary",
                onClick: ($event) => showFull.value = false
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` کمتر `);
                  } else {
                    return [
                      createTextVNode(" کمتر ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="text-caption text-disabled mt-1" dir="rtl"${_scopeId}>${ssrInterpolate(formatJalaliDate(_ctx.task.dueDate))}</div></div>`);
          } else {
            return [
              createVNode("div", { class: "d-flex align-center justify-space-between" }, [
                createVNode("div", {
                  class: "d-flex align-center",
                  style: { "gap": "8px" }
                }, [
                  createVNode(VCheckboxBtn, {
                    "model-value": _ctx.task.status === unref(TaskStatus).Done,
                    onClick: withModifiers(($event) => toggle(), ["stop"])
                  }, null, 8, ["model-value", "onClick"]),
                  createVNode("div", { class: "text-subtitle-2" }, toDisplayString(_ctx.task.title), 1),
                  createVNode(VChip, {
                    color: unref(chipColor),
                    size: "small",
                    label: "",
                    variant: "tonal",
                    class: "mx-1"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(statusLabel)), 1)
                    ]),
                    _: 1
                  }, 8, ["color"])
                ]),
                createVNode(VMenu, null, {
                  activator: withCtx(({ props: mProps }) => [
                    createVNode(VBtn, mergeProps(mProps, {
                      icon: "",
                      variant: "text",
                      density: "comfortable",
                      class: "mx-0",
                      rounded: "lg"
                    }), {
                      default: withCtx(() => [
                        createVNode(VIcon, { icon: "mdi-dots-vertical" })
                      ]),
                      _: 1
                    }, 16)
                  ]),
                  default: withCtx(() => [
                    createVNode(VList, { density: "compact" }, {
                      default: withCtx(() => [
                        createVNode(VListItem, {
                          value: "edit",
                          onClick: withModifiers(($event) => emit("edit", _ctx.task), ["stop"])
                        }, {
                          append: withCtx(() => [
                            createVNode(VIcon, { icon: "mdi-pencil-outline" })
                          ]),
                          default: withCtx(() => [
                            createVNode(VListItemTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("ویرایش")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(VListItem, {
                          value: "remove",
                          onClick: withModifiers(($event) => emit("remove", _ctx.task), ["stop"])
                        }, {
                          append: withCtx(() => [
                            createVNode(VIcon, {
                              icon: "mdi-delete-outline",
                              color: "error"
                            })
                          ]),
                          default: withCtx(() => [
                            createVNode(VListItemTitle, { class: "text-error" }, {
                              default: withCtx(() => [
                                createTextVNode("حذف")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "mt-2 px-2" }, [
                createVNode("div", {
                  class: "text-caption text-medium-emphasis",
                  style: { "white-space": "normal", "word-break": "break-word", "overflow-wrap": "anywhere" }
                }, [
                  createTextVNode(toDisplayString(unref(displayDesc)) + " ", 1),
                  !unref(showFull) && (_ctx.task.description || "").length > 60 ? (openBlock(), createBlock(VBtn, {
                    key: 0,
                    variant: "text",
                    size: "x-small",
                    class: "px-1",
                    color: "primary",
                    onClick: withModifiers(($event) => showFull.value = true, ["stop"])
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" بیشتر ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])) : unref(showFull) && (_ctx.task.description || "").length > 60 ? (openBlock(), createBlock(VBtn, {
                    key: 1,
                    variant: "text",
                    size: "x-small",
                    class: "px-1",
                    color: "primary",
                    onClick: withModifiers(($event) => showFull.value = false, ["stop"])
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" کمتر ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])) : createCommentVNode("", true)
                ]),
                createVNode("div", {
                  class: "text-caption text-disabled mt-1",
                  dir: "rtl"
                }, toDisplayString(formatJalaliDate(_ctx.task.dueDate)), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TaskItem.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const weekStartSaturday = (base) => {
  const day = base.getDay();
  const diffToSaturday = (day + 1) % 7;
  const start = new Date(base);
  start.setDate(base.getDate() - diffToSaturday);
  return start;
};
const createMockWeek = () => {
  const start = weekStartSaturday(/* @__PURE__ */ new Date());
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const tasks = Array.from({ length: 25 }).map((_, idx) => ({
      id: `${d.toISOString().slice(0, 10)}-${idx + 1}`,
      title: `Task ${idx + 1}`,
      description: `${idx + 1} لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.`,
      status: idx % 3 === 0 ? TaskStatus.Todo : idx % 3 === 1 ? TaskStatus.InProgress : TaskStatus.Done,
      dueDate: new Date(d)
    }));
    days.push({ date: new Date(d), tasks });
  }
  return days;
};
const useTasksStore = defineStore("tasks", {
  state: () => ({
    days: [],
    searchText: "",
    statusFilter: "all"
  }),
  getters: {
    dayByDate: (state) => {
      return (date) => state.days.find((d) => d.date.toDateString() === date.toDateString());
    }
  },
  actions: {
    init() {
      {
        this.days = createMockWeek();
      }
    },
    persist() {
      return;
    },
    setSearch(text) {
      this.searchText = text;
    },
    setStatusFilter(filter) {
      this.statusFilter = filter;
    },
    addTask(date, partial) {
      const day = this.dayByDate(date);
      const newTask = { id: crypto.randomUUID(), dueDate: new Date(date), ...partial };
      if (day) day.tasks.unshift(newTask);
      else this.days.push({ date: new Date(date), tasks: [newTask] });
      this.persist();
    },
    updateTask(taskId, updater) {
      for (const day of this.days) {
        const idx = day.tasks.findIndex((t) => t.id === taskId);
        if (idx !== -1) {
          day.tasks[idx] = updater(day.tasks[idx]);
          this.persist();
          return;
        }
      }
    },
    removeTask(taskId) {
      for (const day of this.days) {
        const idx = day.tasks.findIndex((t) => t.id === taskId);
        if (idx !== -1) {
          day.tasks.splice(idx, 1);
          this.persist();
          return;
        }
      }
    },
    moveTask(taskId, toDate) {
      let moved = null;
      for (const day of this.days) {
        const idx = day.tasks.findIndex((t) => t.id === taskId);
        if (idx !== -1) {
          moved = day.tasks.splice(idx, 1)[0];
          break;
        }
      }
      if (moved) {
        moved.dueDate = new Date(toDate);
        const dest = this.dayByDate(toDate);
        if (dest) dest.tasks.unshift(moved);
        else this.days.push({ date: new Date(toDate), tasks: [moved] });
        this.persist();
      }
    }
  }
});
const useWeek = () => {
  const today = /* @__PURE__ */ new Date();
  const isToday = (date) => date.toDateString() === today.toDateString();
  const day = today.getDay();
  const diffToSaturday = (day + 1) % 7;
  const start = new Date(today);
  start.setDate(today.getDate() - diffToSaturday);
  const currentWeek = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return new Date(d);
  });
  return { todayDate: new Date(today), isToday, currentWeek };
};
const useFilter = () => {
  const applyFilter = (tasks, searchText, status) => {
    let list = tasks;
    if (searchText) {
      const q = searchText.toLowerCase();
      list = list.filter((t) => t.title.toLowerCase().includes(q) || (t.description || "").toLowerCase().includes(q));
    }
    if (status !== "all") {
      list = list.filter((t) => t.status === status);
    }
    return list;
  };
  return { applyFilter };
};
const makeVDialogProps = propsFactory({
  fullscreen: Boolean,
  retainFocus: {
    type: Boolean,
    default: true
  },
  scrollable: Boolean,
  ...makeVOverlayProps({
    origin: "center center",
    scrollStrategy: "block",
    transition: {
      component: VDialogTransition
    },
    zIndex: 2400
  })
}, "VDialog");
const VDialog = genericComponent()({
  name: "VDialog",
  props: makeVDialogProps(),
  emits: {
    "update:modelValue": (value) => true,
    afterEnter: () => true,
    afterLeave: () => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const {
      scopeId
    } = useScopeId();
    const overlay = ref();
    function onAfterEnter() {
      emit("afterEnter");
      if ((props.scrim || props.retainFocus) && overlay.value?.contentEl && !overlay.value.contentEl.contains((void 0).activeElement)) {
        overlay.value.contentEl.focus({
          preventScroll: true
        });
      }
    }
    function onAfterLeave() {
      emit("afterLeave");
    }
    watch(isActive, async (val) => {
      if (!val) {
        await nextTick();
        overlay.value.activatorEl?.focus({
          preventScroll: true
        });
      }
    });
    useRender(() => {
      const overlayProps = VOverlay.filterProps(props);
      const activatorProps = mergeProps({
        "aria-haspopup": "dialog"
      }, props.activatorProps);
      const contentProps = mergeProps({
        tabindex: -1
      }, props.contentProps);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "class": ["v-dialog", {
          "v-dialog--fullscreen": props.fullscreen,
          "v-dialog--scrollable": props.scrollable
        }, props.class],
        "style": props.style
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "aria-modal": "true",
        "activatorProps": activatorProps,
        "contentProps": contentProps,
        "height": !props.fullscreen ? props.height : void 0,
        "width": !props.fullscreen ? props.width : void 0,
        "maxHeight": !props.fullscreen ? props.maxHeight : void 0,
        "maxWidth": !props.fullscreen ? props.maxWidth : void 0,
        "role": "dialog",
        "onAfterEnter": onAfterEnter,
        "onAfterLeave": onAfterLeave
      }, scopeId), {
        activator: slots.activator,
        default: function() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createVNode(VDefaultsProvider, {
            "root": "VDialog"
          }, {
            default: () => [slots.default?.(...args)]
          });
        }
      });
    });
    return forwardRefs({}, overlay);
  }
});
const makeVVirtualScrollItemProps = propsFactory({
  renderless: Boolean,
  ...makeComponentProps()
}, "VVirtualScrollItem");
const VVirtualScrollItem = genericComponent()({
  name: "VVirtualScrollItem",
  inheritAttrs: false,
  props: makeVVirtualScrollItemProps(),
  emits: {
    "update:height": (height) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      resizeRef,
      contentRect
    } = useResizeObserver();
    watch(() => contentRect.value?.height, (height) => {
      if (height != null) emit("update:height", height);
    });
    useRender(() => props.renderless ? createElementVNode(Fragment, null, [slots.default?.({
      itemRef: resizeRef
    })]) : createElementVNode("div", mergeProps({
      "ref": resizeRef,
      "class": ["v-virtual-scroll__item", props.class],
      "style": props.style
    }, attrs), [slots.default?.()]));
  }
});
const UP = -1;
const DOWN = 1;
const BUFFER_PX = 100;
const makeVirtualProps = propsFactory({
  itemHeight: {
    type: [Number, String],
    default: null
  },
  itemKey: {
    type: [String, Array, Function],
    default: null
  },
  height: [Number, String]
}, "virtual");
function useVirtual(props, items) {
  const display = useDisplay();
  const itemHeight = shallowRef(0);
  watchEffect(() => {
    itemHeight.value = parseFloat(props.itemHeight || 0);
  });
  const first = shallowRef(0);
  const last = shallowRef(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(props.height) || display.height.value) / (itemHeight.value || 16)
  ) || 1);
  const paddingTop = shallowRef(0);
  const paddingBottom = shallowRef(0);
  const containerRef = ref();
  const markerRef = ref();
  let markerOffset = 0;
  const {
    resizeRef,
    contentRect
  } = useResizeObserver();
  watchEffect(() => {
    resizeRef.value = containerRef.value;
  });
  const viewportHeight = computed(() => {
    return containerRef.value === (void 0).documentElement ? display.height.value : contentRect.value?.height || parseInt(props.height) || 0;
  });
  const hasInitialRender = computed(() => {
    return !!(containerRef.value && markerRef.value && viewportHeight.value && itemHeight.value);
  });
  let sizes = Array.from({
    length: items.value.length
  });
  let offsets = Array.from({
    length: items.value.length
  });
  const updateTime = shallowRef(0);
  let targetScrollIndex = -1;
  function getSize(index2) {
    return sizes[index2] || itemHeight.value;
  }
  const updateOffsets = debounce(() => {
    const start = performance.now();
    offsets[0] = 0;
    const length = items.value.length;
    for (let i = 1; i <= length - 1; i++) {
      offsets[i] = (offsets[i - 1] || 0) + getSize(i - 1);
    }
    updateTime.value = Math.max(updateTime.value, performance.now() - start);
  }, updateTime);
  const unwatch = watch(hasInitialRender, (v) => {
    if (!v) return;
    unwatch();
    markerOffset = markerRef.value.offsetTop;
    updateOffsets.immediate();
    calculateVisibleItems();
    if (!~targetScrollIndex) return;
    nextTick(() => {
    });
  });
  onScopeDispose(() => {
    updateOffsets.clear();
  });
  function handleItemResize(index2, height) {
    const prevHeight = sizes[index2];
    const prevMinHeight = itemHeight.value;
    itemHeight.value = prevMinHeight ? Math.min(itemHeight.value, height) : height;
    if (prevHeight !== height || prevMinHeight !== itemHeight.value) {
      sizes[index2] = height;
      updateOffsets();
    }
  }
  function calculateOffset(index2) {
    index2 = clamp(index2, 0, items.value.length - 1);
    const whole = Math.floor(index2);
    const fraction = index2 % 1;
    const next = whole + 1;
    const wholeOffset = offsets[whole] || 0;
    const nextOffset = offsets[next] || wholeOffset;
    return wholeOffset + (nextOffset - wholeOffset) * fraction;
  }
  function calculateIndex(scrollTop) {
    return binaryClosest(offsets, scrollTop);
  }
  let lastScrollTop = 0;
  let scrollVelocity = 0;
  let lastScrollTime = 0;
  watch(viewportHeight, (val, oldVal) => {
    if (oldVal) {
      calculateVisibleItems();
      if (val < oldVal) {
        requestAnimationFrame(() => {
          scrollVelocity = 0;
          calculateVisibleItems();
        });
      }
    }
  });
  let scrollTimeout = -1;
  function handleScroll() {
    if (!containerRef.value || !markerRef.value) return;
    const scrollTop = containerRef.value.scrollTop;
    const scrollTime = performance.now();
    const scrollDeltaT = scrollTime - lastScrollTime;
    if (scrollDeltaT > 500) {
      scrollVelocity = Math.sign(scrollTop - lastScrollTop);
      markerOffset = markerRef.value.offsetTop;
    } else {
      scrollVelocity = scrollTop - lastScrollTop;
    }
    lastScrollTop = scrollTop;
    lastScrollTime = scrollTime;
    (void 0).clearTimeout(scrollTimeout);
    scrollTimeout = (void 0).setTimeout(handleScrollend, 500);
    calculateVisibleItems();
  }
  function handleScrollend() {
    if (!containerRef.value || !markerRef.value) return;
    scrollVelocity = 0;
    lastScrollTime = 0;
    (void 0).clearTimeout(scrollTimeout);
    calculateVisibleItems();
  }
  let raf2 = -1;
  function calculateVisibleItems() {
    cancelAnimationFrame(raf2);
    raf2 = requestAnimationFrame(_calculateVisibleItems);
  }
  function _calculateVisibleItems() {
    if (!containerRef.value || !viewportHeight.value || !itemHeight.value) return;
    const scrollTop = lastScrollTop - markerOffset;
    const direction = Math.sign(scrollVelocity);
    const startPx = Math.max(0, scrollTop - BUFFER_PX);
    const start = clamp(calculateIndex(startPx), 0, items.value.length);
    const endPx = scrollTop + viewportHeight.value + BUFFER_PX;
    const end = clamp(calculateIndex(endPx) + 1, start + 1, items.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (direction !== UP || start < first.value) && (direction !== DOWN || end > last.value)
    ) {
      const topOverflow = calculateOffset(first.value) - calculateOffset(start);
      const bottomOverflow = calculateOffset(end) - calculateOffset(last.value);
      const bufferOverflow = Math.max(topOverflow, bottomOverflow);
      if (bufferOverflow > BUFFER_PX) {
        first.value = start;
        last.value = end;
      } else {
        if (start <= 0) first.value = start;
        if (end >= items.value.length) last.value = end;
      }
    }
    paddingTop.value = calculateOffset(first.value);
    paddingBottom.value = calculateOffset(items.value.length) - calculateOffset(last.value);
  }
  function scrollToIndex(index2) {
    const offset = calculateOffset(index2);
    if (!containerRef.value || index2 && !offset) {
      targetScrollIndex = index2;
    } else {
      containerRef.value.scrollTop = offset;
    }
  }
  const computedItems = computed(() => {
    return items.value.slice(first.value, last.value).map((item, index2) => {
      const _index = index2 + first.value;
      return {
        raw: item,
        index: _index,
        key: getPropertyFromItem(item, props.itemKey, _index)
      };
    });
  });
  watch(items, () => {
    sizes = Array.from({
      length: items.value.length
    });
    offsets = Array.from({
      length: items.value.length
    });
    updateOffsets.immediate();
    calculateVisibleItems();
  }, {
    deep: 1
  });
  return {
    calculateVisibleItems,
    containerRef,
    markerRef,
    computedItems,
    paddingTop,
    paddingBottom,
    scrollToIndex,
    handleScroll,
    handleScrollend,
    handleItemResize
  };
}
function binaryClosest(arr, val) {
  let high = arr.length - 1;
  let low = 0;
  let mid = 0;
  let item = null;
  let target = -1;
  if (arr[high] < val) {
    return high;
  }
  while (low <= high) {
    mid = low + high >> 1;
    item = arr[mid];
    if (item > val) {
      high = mid - 1;
    } else if (item < val) {
      target = mid;
      low = mid + 1;
    } else if (item === val) {
      return mid;
    } else {
      return low;
    }
  }
  return target;
}
const makeVVirtualScrollProps = propsFactory({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...makeVirtualProps(),
  ...makeComponentProps(),
  ...makeDimensionProps()
}, "VVirtualScroll");
const VVirtualScroll = genericComponent()({
  name: "VVirtualScroll",
  props: makeVVirtualScrollProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    getCurrentInstance("VVirtualScroll");
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      calculateVisibleItems,
      containerRef,
      markerRef,
      handleScroll,
      handleScrollend,
      handleItemResize,
      scrollToIndex,
      paddingTop,
      paddingBottom,
      computedItems
    } = useVirtual(props, toRef(() => props.items));
    useToggleScope(() => props.renderless, () => {
      function handleListeners() {
        let add = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        const method = add ? "addEventListener" : "removeEventListener";
        if (containerRef.value === (void 0).documentElement) {
          (void 0)[method]("scroll", handleScroll, {
            passive: true
          });
          (void 0)[method]("scrollend", handleScrollend);
        } else {
          containerRef.value?.[method]("scroll", handleScroll, {
            passive: true
          });
          containerRef.value?.[method]("scrollend", handleScrollend);
        }
      }
      onScopeDispose(handleListeners);
    });
    useRender(() => {
      const children = computedItems.value.map((item) => createVNode(VVirtualScrollItem, {
        "key": item.key,
        "renderless": props.renderless,
        "onUpdate:height": (height) => handleItemResize(item.index, height)
      }, {
        default: (slotProps) => slots.default?.({
          item: item.raw,
          index: item.index,
          ...slotProps
        })
      }));
      return props.renderless ? createElementVNode(Fragment, null, [createElementVNode("div", {
        "ref": markerRef,
        "class": "v-virtual-scroll__spacer",
        "style": {
          paddingTop: convertToUnit(paddingTop.value)
        }
      }, null), children, createElementVNode("div", {
        "class": "v-virtual-scroll__spacer",
        "style": {
          paddingBottom: convertToUnit(paddingBottom.value)
        }
      }, null)]) : createElementVNode("div", {
        "ref": containerRef,
        "class": normalizeClass(["v-virtual-scroll", props.class]),
        "onScrollPassive": handleScroll,
        "onScrollend": handleScrollend,
        "style": normalizeStyle([dimensionStyles.value, props.style])
      }, [createElementVNode("div", {
        "ref": markerRef,
        "class": "v-virtual-scroll__container",
        "style": {
          paddingTop: convertToUnit(paddingTop.value),
          paddingBottom: convertToUnit(paddingBottom.value)
        }
      }, [children])]);
    });
    return {
      calculateVisibleItems,
      scrollToIndex
    };
  }
});
function useScrolling(listRef, textFieldRef) {
  const isScrolling = shallowRef(false);
  let scrollTimeout;
  function onListScroll(e) {
    cancelAnimationFrame(scrollTimeout);
    isScrolling.value = true;
    scrollTimeout = requestAnimationFrame(() => {
      scrollTimeout = requestAnimationFrame(() => {
        isScrolling.value = false;
      });
    });
  }
  async function finishScrolling() {
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => {
      if (isScrolling.value) {
        const stop = watch(isScrolling, () => {
          stop();
          resolve();
        });
      } else resolve();
    });
  }
  async function onListKeydown(e) {
    if (e.key === "Tab") {
      textFieldRef.value?.focus();
    }
    if (!["PageDown", "PageUp", "Home", "End"].includes(e.key)) return;
    const el = listRef.value?.$el;
    if (!el) return;
    if (e.key === "Home" || e.key === "End") {
      el.scrollTo({
        top: e.key === "Home" ? 0 : el.scrollHeight,
        behavior: "smooth"
      });
    }
    await finishScrolling();
    const children = el.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");
    if (e.key === "PageDown" || e.key === "Home") {
      const top = el.getBoundingClientRect().top;
      for (const child of children) {
        if (child.getBoundingClientRect().top >= top) {
          child.focus();
          break;
        }
      }
    } else {
      const bottom = el.getBoundingClientRect().bottom;
      for (const child of [...children].reverse()) {
        if (child.getBoundingClientRect().bottom <= bottom) {
          child.focus();
          break;
        }
      }
    }
  }
  return {
    onScrollPassive: onListScroll,
    onKeydown: onListKeydown
  };
}
const makeMenuActivatorProps = propsFactory({
  closeText: {
    type: String,
    default: "$vuetify.close"
  },
  openText: {
    type: String,
    default: "$vuetify.open"
  }
}, "autocomplete");
function useMenuActivator(props, isOpen) {
  const {
    t
  } = useLocale();
  const uid = useId();
  const menuId = computed(() => `menu-${uid}`);
  const ariaExpanded = toRef(() => toValue(isOpen));
  const ariaControls = toRef(() => menuId.value);
  const ariaLabel = toRef(() => t(toValue(isOpen) ? props.closeText : props.openText));
  return {
    menuId,
    ariaExpanded,
    ariaControls,
    ariaLabel
  };
}
const makeSelectProps = propsFactory({
  chips: Boolean,
  closableChips: Boolean,
  eager: Boolean,
  hideNoData: Boolean,
  hideSelected: Boolean,
  listProps: {
    type: Object
  },
  menu: Boolean,
  menuIcon: {
    type: IconValue,
    default: "$dropdown"
  },
  menuProps: {
    type: Object
  },
  multiple: Boolean,
  noDataText: {
    type: String,
    default: "$vuetify.noDataText"
  },
  openOnClear: Boolean,
  itemColor: String,
  noAutoScroll: Boolean,
  ...makeMenuActivatorProps(),
  ...makeItemsProps({
    itemChildren: false
  })
}, "Select");
const makeVSelectProps = propsFactory({
  ...makeSelectProps(),
  ...omit(makeVTextFieldProps({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...makeTransitionProps({
    transition: {
      component: VDialogTransition
    }
  })
}, "VSelect");
const VSelect = genericComponent()({
  name: "VSelect",
  props: makeVSelectProps(),
  emits: {
    "update:focused": (focused) => true,
    "update:modelValue": (value) => true,
    "update:menu": (ue) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const vTextFieldRef = ref();
    const vMenuRef = ref();
    const vVirtualScrollRef = ref();
    const {
      items,
      transformIn,
      transformOut
    } = useItems(props);
    const model = useProxiedModel(props, "modelValue", [], (v) => transformIn(v === null ? [null] : wrapInArray(v)), (v) => {
      const transformed = transformOut(v);
      return props.multiple ? transformed : transformed[0] ?? null;
    });
    const counterValue = computed(() => {
      return typeof props.counterValue === "function" ? props.counterValue(model.value) : typeof props.counterValue === "number" ? props.counterValue : model.value.length;
    });
    const form = useForm(props);
    const selectedValues = computed(() => model.value.map((selection) => selection.value));
    const isFocused = shallowRef(false);
    let keyboardLookupPrefix = "";
    let keyboardLookupIndex = -1;
    let keyboardLookupLastTime;
    const displayItems = computed(() => {
      if (props.hideSelected) {
        return items.value.filter((item) => !model.value.some((s) => (props.valueComparator || deepEqual)(s, item)));
      }
      return items.value;
    });
    const menuDisabled = computed(() => props.hideNoData && !displayItems.value.length || form.isReadonly.value || form.isDisabled.value);
    const _menu = useProxiedModel(props, "menu");
    const menu = computed({
      get: () => _menu.value,
      set: (v) => {
        if (_menu.value && !v && vMenuRef.value?.ΨopenChildren.size) return;
        if (v && menuDisabled.value) return;
        _menu.value = v;
      }
    });
    const {
      menuId,
      ariaExpanded,
      ariaControls,
      ariaLabel
    } = useMenuActivator(props, menu);
    const computedMenuProps = computed(() => {
      return {
        ...props.menuProps,
        activatorProps: {
          ...props.menuProps?.activatorProps || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    });
    const listRef = ref();
    const listEvents = useScrolling(listRef, vTextFieldRef);
    function onClear(e) {
      if (props.openOnClear) {
        menu.value = true;
      }
    }
    function onMousedownControl() {
      if (menuDisabled.value) return;
      menu.value = !menu.value;
    }
    function onListKeydown(e) {
      if (checkPrintable(e)) {
        onKeydown(e);
      }
    }
    function onKeydown(e) {
      if (!e.key || form.isReadonly.value) return;
      if (["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
        e.preventDefault();
      }
      if (["Enter", "ArrowDown", " "].includes(e.key)) {
        menu.value = true;
      }
      if (["Escape", "Tab"].includes(e.key)) {
        menu.value = false;
      }
      if (e.key === "Home") {
        listRef.value?.focus("first");
      } else if (e.key === "End") {
        listRef.value?.focus("last");
      }
      const KEYBOARD_LOOKUP_THRESHOLD = 1e3;
      if (!checkPrintable(e)) return;
      const now = performance.now();
      if (now - keyboardLookupLastTime > KEYBOARD_LOOKUP_THRESHOLD) {
        keyboardLookupPrefix = "";
        keyboardLookupIndex = -1;
      }
      keyboardLookupPrefix += e.key.toLowerCase();
      keyboardLookupLastTime = now;
      const items2 = displayItems.value;
      function findItem() {
        let result2 = findItemBase();
        if (result2) return result2;
        if (keyboardLookupPrefix.at(-1) === keyboardLookupPrefix.at(-2)) {
          keyboardLookupPrefix = keyboardLookupPrefix.slice(0, -1);
          result2 = findItemBase();
          if (result2) return result2;
        }
        keyboardLookupIndex = -1;
        result2 = findItemBase();
        if (result2) return result2;
        keyboardLookupPrefix = e.key.toLowerCase();
        return findItemBase();
      }
      function findItemBase() {
        for (let i = keyboardLookupIndex + 1; i < items2.length; i++) {
          const _item = items2[i];
          if (_item.title.toLowerCase().startsWith(keyboardLookupPrefix)) {
            return [_item, i];
          }
        }
        return void 0;
      }
      const result = findItem();
      if (!result) return;
      const [item, index2] = result;
      keyboardLookupIndex = index2;
      listRef.value?.focus(index2);
      if (!props.multiple) {
        model.value = [item];
      }
    }
    function select(item) {
      let set = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      if (item.props.disabled) return;
      if (props.multiple) {
        const index2 = model.value.findIndex((selection) => (props.valueComparator || deepEqual)(selection.value, item.value));
        const add = set == null ? !~index2 : set;
        if (~index2) {
          const value = add ? [...model.value, item] : [...model.value];
          value.splice(index2, 1);
          model.value = value;
        } else if (add) {
          model.value = [...model.value, item];
        }
      } else {
        const add = set !== false;
        model.value = add ? [item] : [];
        nextTick(() => {
          menu.value = false;
        });
      }
    }
    function onBlur(e) {
      if (!listRef.value?.$el.contains(e.relatedTarget)) {
        menu.value = false;
      }
    }
    function onAfterEnter() {
      if (props.eager) {
        vVirtualScrollRef.value?.calculateVisibleItems();
      }
    }
    function onAfterLeave() {
      if (isFocused.value) {
        vTextFieldRef.value?.focus();
      }
    }
    function onFocusin(e) {
      isFocused.value = true;
    }
    function onModelUpdate(v) {
      if (v == null) model.value = [];
      else if (matchesSelector(vTextFieldRef.value) || matchesSelector(vTextFieldRef.value)) {
        const item = items.value.find((item2) => item2.title === v);
        if (item) {
          select(item);
        }
      } else if (vTextFieldRef.value) {
        vTextFieldRef.value.value = "";
      }
    }
    watch(menu, () => {
      if (!props.hideSelected && menu.value && model.value.length) {
        displayItems.value.findIndex((item) => model.value.some((s) => (props.valueComparator || deepEqual)(s.value, item.value)));
      }
    });
    watch(items, (newVal, oldVal) => {
      if (menu.value) return;
      if (isFocused.value && props.hideNoData && !oldVal.length && newVal.length) {
        menu.value = true;
      }
    });
    useRender(() => {
      const hasChips = !!(props.chips || slots.chip);
      const hasList = !!(!props.hideNoData || displayItems.value.length || slots["prepend-item"] || slots["append-item"] || slots["no-data"]);
      const isDirty = model.value.length > 0;
      const textFieldProps = VTextField.filterProps(props);
      const placeholder = isDirty || !isFocused.value && props.label && !props.persistentPlaceholder ? void 0 : props.placeholder;
      return createVNode(VTextField, mergeProps({
        "ref": vTextFieldRef
      }, textFieldProps, {
        "modelValue": model.value.map((v) => v.props.value).join(", "),
        "onUpdate:modelValue": onModelUpdate,
        "focused": isFocused.value,
        "onUpdate:focused": ($event) => isFocused.value = $event,
        "validationValue": model.externalValue,
        "counterValue": counterValue.value,
        "dirty": isDirty,
        "class": ["v-select", {
          "v-select--active-menu": menu.value,
          "v-select--chips": !!props.chips,
          [`v-select--${props.multiple ? "multiple" : "single"}`]: true,
          "v-select--selected": model.value.length,
          "v-select--selection-slot": !!slots.selection
        }, props.class],
        "style": props.style,
        "inputmode": "none",
        "placeholder": placeholder,
        "onClick:clear": onClear,
        "onMousedown:control": onMousedownControl,
        "onBlur": onBlur,
        "onKeydown": onKeydown,
        "aria-expanded": ariaExpanded.value,
        "aria-controls": ariaControls.value,
        "aria-label": ariaLabel.value,
        "title": ariaLabel.value
      }), {
        ...slots,
        default: () => createElementVNode(Fragment, null, [createVNode(VMenu, mergeProps({
          "id": menuId.value,
          "ref": vMenuRef,
          "modelValue": menu.value,
          "onUpdate:modelValue": ($event) => menu.value = $event,
          "activator": "parent",
          "contentClass": "v-select__content",
          "disabled": menuDisabled.value,
          "eager": props.eager,
          "maxHeight": 310,
          "openOnClick": false,
          "closeOnContentClick": false,
          "transition": props.transition,
          "onAfterEnter": onAfterEnter,
          "onAfterLeave": onAfterLeave
        }, computedMenuProps.value), {
          default: () => [hasList && createVNode(VList, mergeProps({
            "ref": listRef,
            "selected": selectedValues.value,
            "selectStrategy": props.multiple ? "independent" : "single-independent",
            "onMousedown": (e) => e.preventDefault(),
            "onKeydown": onListKeydown,
            "onFocusin": onFocusin,
            "tabindex": "-1",
            "selectable": true,
            "aria-live": "polite",
            "aria-label": `${props.label}-list`,
            "color": props.itemColor ?? props.color
          }, listEvents, props.listProps), {
            default: () => [slots["prepend-item"]?.(), !displayItems.value.length && !props.hideNoData && (slots["no-data"]?.() ?? createVNode(VListItem, {
              "key": "no-data",
              "title": t(props.noDataText)
            }, null)), createVNode(VVirtualScroll, {
              "ref": vVirtualScrollRef,
              "renderless": true,
              "items": displayItems.value,
              "itemKey": "value"
            }, {
              default: (_ref2) => {
                let {
                  item,
                  index: index2,
                  itemRef
                } = _ref2;
                const camelizedProps = camelizeProps(item.props);
                const itemProps = mergeProps(item.props, {
                  ref: itemRef,
                  key: item.value,
                  onClick: () => select(item, null)
                });
                if (item.type === "divider") {
                  return slots.divider?.({
                    props: item.raw,
                    index: index2
                  }) ?? createVNode(VDivider, mergeProps(item.props, {
                    "key": `divider-${index2}`
                  }), null);
                }
                if (item.type === "subheader") {
                  return slots.subheader?.({
                    props: item.raw,
                    index: index2
                  }) ?? createVNode(VListSubheader, mergeProps(item.props, {
                    "key": `subheader-${index2}`
                  }), null);
                }
                return slots.item?.({
                  item,
                  index: index2,
                  props: itemProps
                }) ?? createVNode(VListItem, mergeProps(itemProps, {
                  "role": "option"
                }), {
                  prepend: (_ref3) => {
                    let {
                      isSelected
                    } = _ref3;
                    return createElementVNode(Fragment, null, [props.multiple && !props.hideSelected ? createVNode(VCheckboxBtn, {
                      "key": item.value,
                      "modelValue": isSelected,
                      "ripple": false,
                      "tabindex": "-1"
                    }, null) : void 0, camelizedProps.prependAvatar && createVNode(VAvatar, {
                      "image": camelizedProps.prependAvatar
                    }, null), camelizedProps.prependIcon && createVNode(VIcon, {
                      "icon": camelizedProps.prependIcon
                    }, null)]);
                  }
                });
              }
            }), slots["append-item"]?.()]
          })]
        }), model.value.map((item, index2) => {
          function onChipClose(e) {
            e.stopPropagation();
            e.preventDefault();
            select(item, false);
          }
          const slotProps = {
            "onClick:close": onChipClose,
            onKeydown(e) {
              if (e.key !== "Enter" && e.key !== " ") return;
              e.preventDefault();
              e.stopPropagation();
              onChipClose(e);
            },
            onMousedown(e) {
              e.preventDefault();
              e.stopPropagation();
            },
            modelValue: true,
            "onUpdate:modelValue": void 0
          };
          const hasSlot = hasChips ? !!slots.chip : !!slots.selection;
          const slotContent = hasSlot ? ensureValidVNode(hasChips ? slots.chip({
            item,
            index: index2,
            props: slotProps
          }) : slots.selection({
            item,
            index: index2
          })) : void 0;
          if (hasSlot && !slotContent) return void 0;
          return createElementVNode("div", {
            "key": item.value,
            "class": "v-select__selection"
          }, [hasChips ? !slots.chip ? createVNode(VChip, mergeProps({
            "key": "chip",
            "closable": props.closableChips,
            "size": "small",
            "text": item.title,
            "disabled": item.props.disabled
          }, slotProps), null) : createVNode(VDefaultsProvider, {
            "key": "chip-defaults",
            "defaults": {
              VChip: {
                closable: props.closableChips,
                size: "small",
                text: item.title
              }
            }
          }, {
            default: () => [slotContent]
          }) : slotContent ?? createElementVNode("span", {
            "class": "v-select__selection-text"
          }, [item.title, props.multiple && index2 < model.value.length - 1 && createElementVNode("span", {
            "class": "v-select__selection-comma"
          }, [createTextVNode(",")])])]);
        })]),
        "append-inner": function() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createElementVNode(Fragment, null, [slots["append-inner"]?.(...args), props.menuIcon ? createVNode(VIcon, {
            "class": "v-select__menu-icon",
            "color": vTextFieldRef.value?.fieldIconColor,
            "icon": props.menuIcon
          }, null) : void 0]);
        }
      });
    });
    return forwardRefs({
      isFocused,
      menu,
      select
    }, vTextFieldRef);
  }
});
function useCountdown(milliseconds) {
  const time = shallowRef(milliseconds());
  let timer = -1;
  function clear() {
    clearInterval(timer);
  }
  function reset() {
    clear();
    nextTick(() => time.value = milliseconds());
  }
  function start(el) {
    const style = el ? getComputedStyle(el) : {
      transitionDuration: 0.2
    };
    const interval = parseFloat(style.transitionDuration) * 1e3 || 200;
    clear();
    if (time.value <= 0) return;
    const startTime = performance.now();
    timer = (void 0).setInterval(() => {
      const elapsed = performance.now() - startTime + interval;
      time.value = Math.max(milliseconds() - elapsed, 0);
      if (time.value <= 0) clear();
    }, interval);
  }
  onScopeDispose(clear);
  return {
    clear,
    time,
    start,
    reset
  };
}
const makeVSnackbarProps = propsFactory({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...makeLocationProps({
    location: "bottom"
  }),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeVariantProps(),
  ...makeThemeProps(),
  ...omit(makeVOverlayProps({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy", "stickToTarget"])
}, "VSnackbar");
const VSnackbar = genericComponent()({
  name: "VSnackbar",
  props: makeVSnackbarProps(),
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const {
      positionClasses
    } = usePosition(props);
    const {
      scopeId
    } = useScopeId();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      roundedClasses
    } = useRounded(props);
    const countdown = useCountdown(() => Number(props.timeout));
    const overlay = ref();
    const timerRef = ref();
    const isHovering = shallowRef(false);
    const startY = shallowRef(0);
    const mainStyles = ref();
    const hasLayout = inject(VuetifyLayoutKey, void 0);
    useToggleScope(() => !!hasLayout, () => {
      const layout = useLayout();
      watchEffect(() => {
        mainStyles.value = layout.mainStyles.value;
      });
    });
    watch(isActive, startTimeout);
    watch(() => props.timeout, startTimeout);
    let activeTimeout = -1;
    function startTimeout() {
      countdown.reset();
      (void 0).clearTimeout(activeTimeout);
      const timeout = Number(props.timeout);
      if (!isActive.value || timeout === -1) return;
      const element = refElement(timerRef.value);
      countdown.start(element);
      activeTimeout = (void 0).setTimeout(() => {
        isActive.value = false;
      }, timeout);
    }
    function clearTimeout() {
      countdown.reset();
      (void 0).clearTimeout(activeTimeout);
    }
    function onPointerenter() {
      isHovering.value = true;
      clearTimeout();
    }
    function onPointerleave() {
      isHovering.value = false;
      startTimeout();
    }
    function onTouchstart(event) {
      startY.value = event.touches[0].clientY;
    }
    function onTouchend(event) {
      if (Math.abs(startY.value - event.changedTouches[0].clientY) > 50) {
        isActive.value = false;
      }
    }
    function onAfterLeave() {
      if (isHovering.value) onPointerleave();
    }
    const locationClasses = computed(() => {
      return props.location.split(" ").reduce((acc, loc) => {
        acc[`v-snackbar--${loc}`] = true;
        return acc;
      }, {});
    });
    useRender(() => {
      const overlayProps = VOverlay.filterProps(props);
      const hasContent = !!(slots.default || slots.text || props.text);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "class": ["v-snackbar", {
          "v-snackbar--active": isActive.value,
          "v-snackbar--multi-line": props.multiLine && !props.vertical,
          "v-snackbar--timer": !!props.timer,
          "v-snackbar--vertical": props.vertical
        }, locationClasses.value, positionClasses.value, props.class],
        "style": [mainStyles.value, props.style]
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "contentProps": mergeProps({
          class: ["v-snackbar__wrapper", themeClasses.value, colorClasses.value, roundedClasses.value, variantClasses.value],
          style: [colorStyles.value],
          onPointerenter,
          onPointerleave
        }, overlayProps.contentProps),
        "persistent": true,
        "noClickAnimation": true,
        "scrim": false,
        "scrollStrategy": "none",
        "_disableGlobalStack": true,
        "onTouchstartPassive": onTouchstart,
        "onTouchend": onTouchend,
        "onAfterLeave": onAfterLeave
      }, scopeId), {
        default: () => [genOverlays(false, "v-snackbar"), props.timer && !isHovering.value && createElementVNode("div", {
          "key": "timer",
          "class": "v-snackbar__timer"
        }, [createVNode(VProgressLinear, {
          "ref": timerRef,
          "color": typeof props.timer === "string" ? props.timer : "info",
          "max": props.timeout,
          "modelValue": countdown.time.value
        }, null)]), hasContent && createElementVNode("div", {
          "key": "content",
          "class": "v-snackbar__content",
          "role": "status",
          "aria-live": "polite"
        }, [slots.text?.() ?? props.text, slots.default?.()]), slots.actions && createVNode(VDefaultsProvider, {
          "defaults": {
            VBtn: {
              variant: "text",
              ripple: false,
              slim: true
            }
          }
        }, {
          default: () => [createElementVNode("div", {
            "class": "v-snackbar__actions"
          }, [slots.actions({
            isActive
          })])]
        })],
        activator: slots.activator
      });
    });
    return forwardRefs({}, overlay);
  }
});
const perPage = 10;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const TaskDialog = defineAsyncComponent(() => import("./TaskDialog-ptfFscT_.js"));
    const tasksStore = useTasksStore();
    const { setSearch, setStatusFilter, init, moveTask, addTask, updateTask, removeTask } = tasksStore;
    const { days, searchText, statusFilter } = storeToRefs(tasksStore);
    const week = useWeek();
    const { applyFilter } = useFilter();
    const search = computed({
      get: () => searchText.value,
      set: (v) => setSearch(v)
    });
    const status = computed({
      get: () => statusFilter.value,
      set: (v) => setStatusFilter(v || "all")
    });
    const statusItems = [
      { title: "همه", value: "all" },
      { title: "انجام نشده", value: TaskStatus.Todo },
      { title: "در حال انجام", value: TaskStatus.InProgress },
      { title: "انجام شده", value: TaskStatus.Done }
    ];
    const visibleCount = reactive({});
    const loadingMore = reactive({});
    const draggingId = ref(null);
    function visibleTasks(date) {
      const day = days.value.find((d) => {
        const dayDate = d.date instanceof Date ? d.date : new Date(d.date);
        return dayDate.toDateString() === date.toDateString();
      });
      const list = applyFilter(day ? day.tasks : [], search.value, status.value);
      return list.slice(0, visibleCount[date.toDateString()] || perPage);
    }
    function canLoadMore(date) {
      const day = days.value.find((d) => {
        const dayDate = d.date instanceof Date ? d.date : new Date(d.date);
        return dayDate.toDateString() === date.toDateString();
      });
      const total = applyFilter(day ? day.tasks : [], search.value, status.value).length;
      const current = visibleCount[date.toDateString()] || perPage;
      return current < total;
    }
    function onScroll(date, evt) {
      const el = evt.target;
      const dateStr = date.toDateString();
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
        if (loadingMore[dateStr]) return;
        if (!canLoadMore(date)) return;
        loadingMore[dateStr] = true;
        setTimeout(() => {
          visibleCount[dateStr] = (visibleCount[dateStr] || perPage) + perPage;
          loadingMore[dateStr] = false;
        }, 400);
      }
    }
    function dragStart(id) {
      draggingId.value = id;
    }
    function onDrop(date) {
      if (!draggingId.value) return;
      moveTask(draggingId.value, date);
      draggingId.value = null;
    }
    const dialog = ref(false);
    const editingTask = ref(null);
    const dialogDate = ref(/* @__PURE__ */ new Date());
    function openCreate() {
      editingTask.value = null;
      dialogDate.value = week.todayDate;
      dialog.value = true;
    }
    function onEdit(task) {
      editingTask.value = task;
      dialogDate.value = task.dueDate;
      dialog.value = true;
    }
    const confirmDelete = ref(false);
    const taskToDelete = ref(null);
    function onRemove(task) {
      taskToDelete.value = task;
      confirmDelete.value = true;
    }
    function confirmDeleteYes() {
      if (taskToDelete.value) {
        removeTask(taskToDelete.value.id);
        notify("تسک حذف شد", "error");
      }
      confirmDelete.value = false;
      taskToDelete.value = null;
    }
    const { $sound } = useNuxtApp();
    function onToggle(task) {
      const next = task.status === TaskStatus.Done ? TaskStatus.Todo : TaskStatus.Done;
      updateTask(task.id, (t) => ({ ...t, status: next }));
      if (next === TaskStatus.Done) $sound.playDone();
    }
    function onSave(payload) {
      if (payload.editingId) {
        const id = payload.editingId;
        const original = editingTask.value;
        if (original && payload.date.toDateString() !== original.dueDate.toDateString()) {
          moveTask(id, payload.date);
        }
        updateTask(id, (t) => ({ ...t, ...payload.task }));
        notify("تسک ویرایش شد", "info");
      } else {
        addTask(payload.date, payload.task);
        $sound.playCreate();
        notify("تسک ایجاد شد", "success");
      }
      dialog.value = false;
    }
    function formatDate(date) {
      return date.toLocaleDateString("fa-IR", { weekday: "long", month: "short", day: "numeric" });
    }
    useSeoMeta({ title: "برای انجام" });
    function isWeekend(date) {
      const day = date.getDay();
      return day === 4 || day === 5;
    }
    const snackbar = reactive({ show: false, text: "", color: "success" });
    function notify(text, color = "success") {
      snackbar.text = text;
      snackbar.color = color;
      snackbar.show = true;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TaskItem = _sfc_main$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VContainer, {
        fluid: "",
        class: "py-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="filter-bar"${_scopeId}>`);
            _push2(ssrRenderComponent(VRow, { align: "center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "5"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          class: "outlined-primary",
                          variant: "outlined",
                          modelValue: unref(search),
                          "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                          label: "جستجو",
                          "prepend-inner-icon": "mdi-magnify",
                          clearable: "",
                          "hide-details": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            class: "outlined-primary",
                            variant: "outlined",
                            modelValue: unref(search),
                            "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                            label: "جستجو",
                            "prepend-inner-icon": "mdi-magnify",
                            clearable: "",
                            "hide-details": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VSelect, {
                          class: "outlined-primary",
                          variant: "outlined",
                          items: statusItems,
                          modelValue: unref(status),
                          "onUpdate:modelValue": ($event) => isRef(status) ? status.value = $event : null,
                          label: "فیلتر وضعیت",
                          clearable: "",
                          "hide-details": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VSelect, {
                            class: "outlined-primary",
                            variant: "outlined",
                            items: statusItems,
                            modelValue: unref(status),
                            "onUpdate:modelValue": ($event) => isRef(status) ? status.value = $event : null,
                            label: "فیلتر وضعیت",
                            clearable: "",
                            "hide-details": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "3",
                    class: "text-center text-md-right"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="d-flex gap-2 justify-end"${_scopeId3}>`);
                        _push4(ssrRenderComponent(VBtn, {
                          color: "primary",
                          variant: "elevated",
                          rounded: "lg",
                          size: "large",
                          class: "text-white",
                          "append-icon": "mdi-plus",
                          onClick: openCreate
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` افزودن تسک `);
                            } else {
                              return [
                                createTextVNode(" افزودن تسک ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "d-flex gap-2 justify-end" }, [
                            createVNode(VBtn, {
                              color: "primary",
                              variant: "elevated",
                              rounded: "lg",
                              size: "large",
                              class: "text-white",
                              "append-icon": "mdi-plus",
                              onClick: openCreate
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" افزودن تسک ")
                              ]),
                              _: 1
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      md: "5"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          class: "outlined-primary",
                          variant: "outlined",
                          modelValue: unref(search),
                          "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                          label: "جستجو",
                          "prepend-inner-icon": "mdi-magnify",
                          clearable: "",
                          "hide-details": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode(VSelect, {
                          class: "outlined-primary",
                          variant: "outlined",
                          items: statusItems,
                          modelValue: unref(status),
                          "onUpdate:modelValue": ($event) => isRef(status) ? status.value = $event : null,
                          label: "فیلتر وضعیت",
                          clearable: "",
                          "hide-details": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      md: "3",
                      class: "text-center text-md-right"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "d-flex gap-2 justify-end" }, [
                          createVNode(VBtn, {
                            color: "primary",
                            variant: "elevated",
                            rounded: "lg",
                            size: "large",
                            class: "text-white",
                            "append-icon": "mdi-plus",
                            onClick: openCreate
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" افزودن تسک ")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(VRow, { class: "week-scroll flex-nowrap" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(week).currentWeek, (date) => {
                    _push3(ssrRenderComponent(VCol, {
                      key: date.toDateString(),
                      cols: "12",
                      sm: "6",
                      md: "4",
                      lg: "2",
                      xl: "2"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VCard, {
                            class: ["day-card", { "is-today": unref(week).isToday(date), "is-weekend": isWeekend(date) }],
                            title: formatDate(date),
                            dir: "rtl"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (!isWeekend(date)) {
                                  _push5(ssrRenderComponent(VCardText, {
                                    style: { "max-height": "70vh", "overflow": "auto" },
                                    onScroll: ($event) => onScroll(date, $event)
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<div class="d-flex flex-column gap-2"${_scopeId5}><!--[-->`);
                                        ssrRenderList(visibleTasks(date), (t) => {
                                          _push6(ssrRenderComponent(_component_TaskItem, {
                                            key: t.id,
                                            task: t,
                                            class: "mb-4",
                                            draggable: "true",
                                            onDragstart: ($event) => dragStart(t.id),
                                            onEdit,
                                            onRemove,
                                            onToggle
                                          }, null, _parent6, _scopeId5));
                                        });
                                        _push6(`<!--]--></div>`);
                                        if (unref(loadingMore)[date.toDateString()] && canLoadMore(date)) {
                                          _push6(`<div class="text-center py-2"${_scopeId5}>در حال بارگذاری...</div>`);
                                        } else {
                                          _push6(`<!---->`);
                                        }
                                      } else {
                                        return [
                                          createVNode("div", {
                                            class: "d-flex flex-column gap-2",
                                            onDragover: withModifiers(() => {
                                            }, ["prevent"]),
                                            onDrop: ($event) => onDrop(date)
                                          }, [
                                            (openBlock(true), createBlock(Fragment, null, renderList(visibleTasks(date), (t) => {
                                              return openBlock(), createBlock(_component_TaskItem, {
                                                key: t.id,
                                                task: t,
                                                class: "mb-4",
                                                draggable: "true",
                                                onDragstart: ($event) => dragStart(t.id),
                                                onEdit,
                                                onRemove,
                                                onToggle
                                              }, null, 8, ["task", "onDragstart"]);
                                            }), 128))
                                          ], 40, ["onDragover", "onDrop"]),
                                          unref(loadingMore)[date.toDateString()] && canLoadMore(date) ? (openBlock(), createBlock("div", {
                                            key: 0,
                                            class: "text-center py-2"
                                          }, "در حال بارگذاری...")) : createCommentVNode("", true)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(ssrRenderComponent(VCardText, { class: "text-center py-12" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(` روز تعطیل `);
                                      } else {
                                        return [
                                          createTextVNode(" روز تعطیل ")
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                }
                              } else {
                                return [
                                  !isWeekend(date) ? (openBlock(), createBlock(VCardText, {
                                    key: 0,
                                    style: { "max-height": "70vh", "overflow": "auto" },
                                    onScrollPassive: ($event) => onScroll(date, $event)
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", {
                                        class: "d-flex flex-column gap-2",
                                        onDragover: withModifiers(() => {
                                        }, ["prevent"]),
                                        onDrop: ($event) => onDrop(date)
                                      }, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(visibleTasks(date), (t) => {
                                          return openBlock(), createBlock(_component_TaskItem, {
                                            key: t.id,
                                            task: t,
                                            class: "mb-4",
                                            draggable: "true",
                                            onDragstart: ($event) => dragStart(t.id),
                                            onEdit,
                                            onRemove,
                                            onToggle
                                          }, null, 8, ["task", "onDragstart"]);
                                        }), 128))
                                      ], 40, ["onDragover", "onDrop"]),
                                      unref(loadingMore)[date.toDateString()] && canLoadMore(date) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-center py-2"
                                      }, "در حال بارگذاری...")) : createCommentVNode("", true)
                                    ]),
                                    _: 2
                                  }, 1032, ["onScrollPassive"])) : (openBlock(), createBlock(VCardText, {
                                    key: 1,
                                    class: "text-center py-12"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" روز تعطیل ")
                                    ]),
                                    _: 1
                                  }))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VCard, {
                              class: ["day-card", { "is-today": unref(week).isToday(date), "is-weekend": isWeekend(date) }],
                              title: formatDate(date),
                              dir: "rtl"
                            }, {
                              default: withCtx(() => [
                                !isWeekend(date) ? (openBlock(), createBlock(VCardText, {
                                  key: 0,
                                  style: { "max-height": "70vh", "overflow": "auto" },
                                  onScrollPassive: ($event) => onScroll(date, $event)
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", {
                                      class: "d-flex flex-column gap-2",
                                      onDragover: withModifiers(() => {
                                      }, ["prevent"]),
                                      onDrop: ($event) => onDrop(date)
                                    }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(visibleTasks(date), (t) => {
                                        return openBlock(), createBlock(_component_TaskItem, {
                                          key: t.id,
                                          task: t,
                                          class: "mb-4",
                                          draggable: "true",
                                          onDragstart: ($event) => dragStart(t.id),
                                          onEdit,
                                          onRemove,
                                          onToggle
                                        }, null, 8, ["task", "onDragstart"]);
                                      }), 128))
                                    ], 40, ["onDragover", "onDrop"]),
                                    unref(loadingMore)[date.toDateString()] && canLoadMore(date) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-center py-2"
                                    }, "در حال بارگذاری...")) : createCommentVNode("", true)
                                  ]),
                                  _: 2
                                }, 1032, ["onScrollPassive"])) : (openBlock(), createBlock(VCardText, {
                                  key: 1,
                                  class: "text-center py-12"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" روز تعطیل ")
                                  ]),
                                  _: 1
                                }))
                              ]),
                              _: 2
                            }, 1032, ["class", "title"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(week).currentWeek, (date) => {
                      return openBlock(), createBlock(VCol, {
                        key: date.toDateString(),
                        cols: "12",
                        sm: "6",
                        md: "4",
                        lg: "2",
                        xl: "2"
                      }, {
                        default: withCtx(() => [
                          createVNode(VCard, {
                            class: ["day-card", { "is-today": unref(week).isToday(date), "is-weekend": isWeekend(date) }],
                            title: formatDate(date),
                            dir: "rtl"
                          }, {
                            default: withCtx(() => [
                              !isWeekend(date) ? (openBlock(), createBlock(VCardText, {
                                key: 0,
                                style: { "max-height": "70vh", "overflow": "auto" },
                                onScrollPassive: ($event) => onScroll(date, $event)
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", {
                                    class: "d-flex flex-column gap-2",
                                    onDragover: withModifiers(() => {
                                    }, ["prevent"]),
                                    onDrop: ($event) => onDrop(date)
                                  }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(visibleTasks(date), (t) => {
                                      return openBlock(), createBlock(_component_TaskItem, {
                                        key: t.id,
                                        task: t,
                                        class: "mb-4",
                                        draggable: "true",
                                        onDragstart: ($event) => dragStart(t.id),
                                        onEdit,
                                        onRemove,
                                        onToggle
                                      }, null, 8, ["task", "onDragstart"]);
                                    }), 128))
                                  ], 40, ["onDragover", "onDrop"]),
                                  unref(loadingMore)[date.toDateString()] && canLoadMore(date) ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-center py-2"
                                  }, "در حال بارگذاری...")) : createCommentVNode("", true)
                                ]),
                                _: 2
                              }, 1032, ["onScrollPassive"])) : (openBlock(), createBlock(VCardText, {
                                key: 1,
                                class: "text-center py-12"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" روز تعطیل ")
                                ]),
                                _: 1
                              }))
                            ]),
                            _: 2
                          }, 1032, ["class", "title"])
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(unref(TaskDialog)), {
              modelValue: unref(dialog),
              "onUpdate:modelValue": ($event) => isRef(dialog) ? dialog.value = $event : null,
              editing: unref(editingTask),
              date: unref(dialogDate),
              onSave
            }, null), _parent2, _scopeId);
          } else {
            return [
              createVNode("div", { class: "filter-bar" }, [
                createVNode(VRow, { align: "center" }, {
                  default: withCtx(() => [
                    createVNode(VCol, {
                      cols: "12",
                      md: "5"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          class: "outlined-primary",
                          variant: "outlined",
                          modelValue: unref(search),
                          "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                          label: "جستجو",
                          "prepend-inner-icon": "mdi-magnify",
                          clearable: "",
                          "hide-details": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode(VSelect, {
                          class: "outlined-primary",
                          variant: "outlined",
                          items: statusItems,
                          modelValue: unref(status),
                          "onUpdate:modelValue": ($event) => isRef(status) ? status.value = $event : null,
                          label: "فیلتر وضعیت",
                          clearable: "",
                          "hide-details": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      md: "3",
                      class: "text-center text-md-right"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "d-flex gap-2 justify-end" }, [
                          createVNode(VBtn, {
                            color: "primary",
                            variant: "elevated",
                            rounded: "lg",
                            size: "large",
                            class: "text-white",
                            "append-icon": "mdi-plus",
                            onClick: openCreate
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" افزودن تسک ")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              createVNode(VRow, { class: "week-scroll flex-nowrap" }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(week).currentWeek, (date) => {
                    return openBlock(), createBlock(VCol, {
                      key: date.toDateString(),
                      cols: "12",
                      sm: "6",
                      md: "4",
                      lg: "2",
                      xl: "2"
                    }, {
                      default: withCtx(() => [
                        createVNode(VCard, {
                          class: ["day-card", { "is-today": unref(week).isToday(date), "is-weekend": isWeekend(date) }],
                          title: formatDate(date),
                          dir: "rtl"
                        }, {
                          default: withCtx(() => [
                            !isWeekend(date) ? (openBlock(), createBlock(VCardText, {
                              key: 0,
                              style: { "max-height": "70vh", "overflow": "auto" },
                              onScrollPassive: ($event) => onScroll(date, $event)
                            }, {
                              default: withCtx(() => [
                                createVNode("div", {
                                  class: "d-flex flex-column gap-2",
                                  onDragover: withModifiers(() => {
                                  }, ["prevent"]),
                                  onDrop: ($event) => onDrop(date)
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(visibleTasks(date), (t) => {
                                    return openBlock(), createBlock(_component_TaskItem, {
                                      key: t.id,
                                      task: t,
                                      class: "mb-4",
                                      draggable: "true",
                                      onDragstart: ($event) => dragStart(t.id),
                                      onEdit,
                                      onRemove,
                                      onToggle
                                    }, null, 8, ["task", "onDragstart"]);
                                  }), 128))
                                ], 40, ["onDragover", "onDrop"]),
                                unref(loadingMore)[date.toDateString()] && canLoadMore(date) ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-center py-2"
                                }, "در حال بارگذاری...")) : createCommentVNode("", true)
                              ]),
                              _: 2
                            }, 1032, ["onScrollPassive"])) : (openBlock(), createBlock(VCardText, {
                              key: 1,
                              class: "text-center py-12"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" روز تعطیل ")
                              ]),
                              _: 1
                            }))
                          ]),
                          _: 2
                        }, 1032, ["class", "title"])
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 1
              }),
              (openBlock(), createBlock(resolveDynamicComponent(unref(TaskDialog)), {
                modelValue: unref(dialog),
                "onUpdate:modelValue": ($event) => isRef(dialog) ? dialog.value = $event : null,
                editing: unref(editingTask),
                date: unref(dialogDate),
                onSave
              }, null, 40, ["modelValue", "onUpdate:modelValue", "editing", "date"]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VDialog, {
        modelValue: unref(confirmDelete),
        "onUpdate:modelValue": ($event) => isRef(confirmDelete) ? confirmDelete.value = $event : null,
        "max-width": "420"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`تایید حذف`);
                      } else {
                        return [
                          createTextVNode("تایید حذف")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` آیا از حذف این تسک مطمئن هستید؟ <div class="text-medium-emphasis mt-2"${_scopeId3}>${ssrInterpolate(unref(taskToDelete)?.title)}</div>`);
                      } else {
                        return [
                          createTextVNode(" آیا از حذف این تسک مطمئن هستید؟ "),
                          createVNode("div", { class: "text-medium-emphasis mt-2" }, toDisplayString(unref(taskToDelete)?.title), 1)
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
                          variant: "text",
                          onClick: ($event) => confirmDelete.value = false
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`انصراف`);
                            } else {
                              return [
                                createTextVNode("انصراف")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          color: "error",
                          onClick: confirmDeleteYes
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`حذف`);
                            } else {
                              return [
                                createTextVNode("حذف")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VSpacer),
                          createVNode(VBtn, {
                            variant: "text",
                            onClick: ($event) => confirmDelete.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("انصراف")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(VBtn, {
                            color: "error",
                            onClick: confirmDeleteYes
                          }, {
                            default: withCtx(() => [
                              createTextVNode("حذف")
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
                        createTextVNode("تایید حذف")
                      ]),
                      _: 1
                    }),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createTextVNode(" آیا از حذف این تسک مطمئن هستید؟ "),
                        createVNode("div", { class: "text-medium-emphasis mt-2" }, toDisplayString(unref(taskToDelete)?.title), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode(VSpacer),
                        createVNode(VBtn, {
                          variant: "text",
                          onClick: ($event) => confirmDelete.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("انصراف")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(VBtn, {
                          color: "error",
                          onClick: confirmDeleteYes
                        }, {
                          default: withCtx(() => [
                            createTextVNode("حذف")
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
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VCardTitle, null, {
                    default: withCtx(() => [
                      createTextVNode("تایید حذف")
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createTextVNode(" آیا از حذف این تسک مطمئن هستید؟ "),
                      createVNode("div", { class: "text-medium-emphasis mt-2" }, toDisplayString(unref(taskToDelete)?.title), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VSpacer),
                      createVNode(VBtn, {
                        variant: "text",
                        onClick: ($event) => confirmDelete.value = false
                      }, {
                        default: withCtx(() => [
                          createTextVNode("انصراف")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(VBtn, {
                        color: "error",
                        onClick: confirmDeleteYes
                      }, {
                        default: withCtx(() => [
                          createTextVNode("حذف")
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
      _push(ssrRenderComponent(VSnackbar, {
        modelValue: unref(snackbar).show,
        "onUpdate:modelValue": ($event) => unref(snackbar).show = $event,
        color: unref(snackbar).color,
        location: "top",
        timeout: "2500"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, {
              variant: "text",
              size: "small",
              onClick: ($event) => unref(snackbar).show = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`بستن`);
                } else {
                  return [
                    createTextVNode("بستن")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VBtn, {
                variant: "text",
                size: "small",
                onClick: ($event) => unref(snackbar).show = false
              }, {
                default: withCtx(() => [
                  createTextVNode("بستن")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(snackbar).text)} `);
          } else {
            return [
              createTextVNode(toDisplayString(unref(snackbar).text) + " ", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));
export {
  TaskStatus as T,
  VDialog as V,
  VSelect as a,
  index as i
};
//# sourceMappingURL=index-DdPr0rhF.js.map
