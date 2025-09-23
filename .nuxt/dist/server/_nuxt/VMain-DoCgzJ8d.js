import { createElementVNode, normalizeStyle, normalizeClass, createVNode } from "vue";
import { a as useRender, c as makeComponentProps, u as useDimension, m as makeTagProps, b as makeDimensionProps } from "./VGrid-DYUQajch.js";
import { c as createLayout, d as makeLayoutProps, u as useLayout, a as useSsrBoot } from "./ssrBoot-BGRvKyVu.js";
import { g as genericComponent, p as propsFactory, f as provideTheme, d as useRtl, m as makeThemeProps, Q as omit } from "../server.mjs";
const makeVAppProps = propsFactory({
  ...makeComponentProps(),
  ...omit(makeLayoutProps(), ["fullHeight"]),
  ...makeThemeProps()
}, "VApp");
const VApp = genericComponent()({
  name: "VApp",
  props: makeVAppProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const theme = provideTheme(props);
    const {
      layoutClasses,
      getLayoutItem,
      items,
      layoutRef
    } = createLayout({
      ...props,
      fullHeight: true
    });
    const {
      rtlClasses
    } = useRtl();
    useRender(() => createElementVNode("div", {
      "ref": layoutRef,
      "class": normalizeClass(["v-application", theme.themeClasses.value, layoutClasses.value, rtlClasses.value, props.class]),
      "style": normalizeStyle([props.style])
    }, [createElementVNode("div", {
      "class": "v-application__wrap"
    }, [slots.default?.()])]));
    return {
      getLayoutItem,
      items,
      theme
    };
  }
});
const makeVMainProps = propsFactory({
  scrollable: Boolean,
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeTagProps({
    tag: "main"
  })
}, "VMain");
const VMain = genericComponent()({
  name: "VMain",
  props: makeVMainProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      mainStyles
    } = useLayout();
    const {
      ssrBootStyles
    } = useSsrBoot();
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-main", {
        "v-main--scrollable": props.scrollable
      }, props.class]),
      "style": normalizeStyle([mainStyles.value, ssrBootStyles.value, dimensionStyles.value, props.style])
    }, {
      default: () => [props.scrollable ? createElementVNode("div", {
        "class": "v-main__scroller"
      }, [slots.default?.()]) : slots.default?.()]
    }));
    return {};
  }
});
export {
  VApp as V,
  VMain as a
};
//# sourceMappingURL=VMain-DoCgzJ8d.js.map
