import { computed, toRef, createVNode, normalizeStyle, normalizeClass, createElementVNode, mergeProps } from "vue";
import { c as createSimpleFunctional, d as useVariant, e as useDensity, f as useElevation, h as useLocation, i as usePosition, j as useRounded, x as useTextColor, v as genOverlays, a as VIcon, b as VDefaultsProvider, l as makeVariantProps, o as makeRoundedProps, p as makePositionProps, q as makeLocationProps, s as makeElevationProps, m as makeDensityProps } from "./index-SOHsZWxA.js";
import { u as useDimension, m as makeTagProps, b as makeDimensionProps, c as makeComponentProps } from "./VGrid-DYUQajch.js";
import { p as propsFactory, g as genericComponent, D as useProxiedModel, f as provideTheme, J as useLocale, m as makeThemeProps, I as IconValue } from "../server.mjs";
import { a as VBtn } from "./index-DFeFuJj2.js";
const VAlertTitle = createSimpleFunctional("v-alert-title");
const makeIconSizeProps = propsFactory({
  iconSize: [Number, String],
  iconSizes: {
    type: Array,
    default: () => [["x-small", 10], ["small", 16], ["default", 24], ["large", 28], ["x-large", 32]]
  }
}, "iconSize");
function useIconSizes(props, fallback) {
  const iconSize = computed(() => {
    const iconSizeMap = new Map(props.iconSizes);
    const _iconSize = props.iconSize ?? fallback() ?? "default";
    return iconSizeMap.has(_iconSize) ? iconSizeMap.get(_iconSize) : _iconSize;
  });
  return {
    iconSize
  };
}
const allowedTypes = ["success", "info", "warning", "error"];
const makeVAlertProps = propsFactory({
  border: {
    type: [Boolean, String],
    validator: (val) => {
      return typeof val === "boolean" || ["top", "end", "bottom", "start"].includes(val);
    }
  },
  borderColor: String,
  closable: Boolean,
  closeIcon: {
    type: IconValue,
    default: "$close"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  icon: {
    type: [Boolean, String, Function, Object],
    default: null
  },
  modelValue: {
    type: Boolean,
    default: true
  },
  prominent: Boolean,
  title: String,
  text: String,
  type: {
    type: String,
    validator: (val) => allowedTypes.includes(val)
  },
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeIconSizeProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "flat"
  })
}, "VAlert");
const VAlert = genericComponent()({
  name: "VAlert",
  props: makeVAlertProps(),
  emits: {
    "click:close": (e) => true,
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const icon = toRef(() => {
      if (props.icon === false) return void 0;
      if (!props.type) return props.icon;
      return props.icon ?? `$${props.type}`;
    });
    const {
      iconSize
    } = useIconSizes(props, () => props.prominent ? 44 : void 0);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(() => ({
      color: props.color ?? props.type,
      variant: props.variant
    }));
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.borderColor);
    const {
      t
    } = useLocale();
    const closeProps = toRef(() => ({
      "aria-label": t(props.closeLabel),
      onClick(e) {
        isActive.value = false;
        emit("click:close", e);
      }
    }));
    return () => {
      const hasPrepend = !!(slots.prepend || icon.value);
      const hasTitle = !!(slots.title || props.title);
      const hasClose = !!(slots.close || props.closable);
      const iconProps = {
        density: props.density,
        icon: icon.value,
        size: props.iconSize || props.prominent ? iconSize.value : void 0
      };
      return isActive.value && createVNode(props.tag, {
        "class": normalizeClass(["v-alert", props.border && {
          "v-alert--border": !!props.border,
          [`v-alert--border-${props.border === true ? "start" : props.border}`]: true
        }, {
          "v-alert--prominent": props.prominent
        }, themeClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value, props.class]),
        "style": normalizeStyle([colorStyles.value, dimensionStyles.value, locationStyles.value, props.style]),
        "role": "alert"
      }, {
        default: () => [genOverlays(false, "v-alert"), props.border && createElementVNode("div", {
          "key": "border",
          "class": normalizeClass(["v-alert__border", textColorClasses.value]),
          "style": normalizeStyle(textColorStyles.value)
        }, null), hasPrepend && createElementVNode("div", {
          "key": "prepend",
          "class": "v-alert__prepend"
        }, [!slots.prepend ? createVNode(VIcon, mergeProps({
          "key": "prepend-icon"
        }, iconProps), null) : createVNode(VDefaultsProvider, {
          "key": "prepend-defaults",
          "disabled": !icon.value,
          "defaults": {
            VIcon: {
              ...iconProps
            }
          }
        }, slots.prepend)]), createElementVNode("div", {
          "class": "v-alert__content"
        }, [hasTitle && createVNode(VAlertTitle, {
          "key": "title"
        }, {
          default: () => [slots.title?.() ?? props.title]
        }), slots.text?.() ?? props.text, slots.default?.()]), slots.append && createElementVNode("div", {
          "key": "append",
          "class": "v-alert__append"
        }, [slots.append()]), hasClose && createElementVNode("div", {
          "key": "close",
          "class": "v-alert__close"
        }, [!slots.close ? createVNode(VBtn, mergeProps({
          "key": "close-btn",
          "icon": props.closeIcon,
          "size": "x-small",
          "variant": "text"
        }, closeProps.value), null) : createVNode(VDefaultsProvider, {
          "key": "close-defaults",
          "defaults": {
            VBtn: {
              icon: props.closeIcon,
              size: "x-small",
              variant: "text"
            }
          }
        }, {
          default: () => [slots.close?.({
            props: closeProps.value
          })]
        })])]
      });
    };
  }
});
export {
  VAlert as V
};
//# sourceMappingURL=VAlert-COT_yHdo.js.map
