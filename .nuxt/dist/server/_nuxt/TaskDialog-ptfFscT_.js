import { defineComponent, ref, computed, watch, mergeProps, unref, isRef, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext, shallowRef, watchEffect, nextTick, createElementVNode, Fragment, withDirectives, normalizeClass, vModelText } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { toGregorian } from "jalaali-js";
import { V as VTextField, e as useFocus, h as useAutocomplete, f as forwardRefs, i as makeVFieldProps, j as makeVInputProps, k as makeAutocompleteProps, l as VInput, o as VField, p as VCounter, q as useAutofocus } from "./VTextField-CZ6AaXgr.js";
import { V as VDialog, a as VSelect, T as TaskStatus } from "./index-DdPr0rhF.js";
import { V as VCard, a as VCardTitle, b as VCardText, c as VCardActions } from "./VCard-CH2KsXVv.js";
import { a as VBtn, V as VSpacer } from "./index-DFeFuJj2.js";
import { a as VIcon, I as Intersect } from "./index-SOHsZWxA.js";
import { V as VAlert } from "./VAlert-COT_yHdo.js";
import { _ as _export_sfc, g as genericComponent, p as propsFactory, D as useProxiedModel, j as convertToUnit, C as clamp, P as filterInputAttrs, L as callEvent } from "../server.mjs";
import { a as useRender } from "./VGrid-DYUQajch.js";
import "./scopeId-DHScbPzj.js";
import "./ssrBoot-BGRvKyVu.js";
import "./v3-kZLuQu14.js";
import "C:/Projects/tdp/node_modules/@unhead/vue/dist/index.mjs";
import "./VContainer-CZ2nQSIP.js";
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
function dateToJalali(date) {
  if (isNaN(date.getTime())) return todayJalali();
  const parts = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const year = parts.find((p) => p.type === "year")?.value || "";
  const month = parts.find((p) => p.type === "month")?.value || "";
  const day = parts.find((p) => p.type === "day")?.value || "";
  return `${year}/${month}/${day}`;
}
function todayJalali() {
  const now = /* @__PURE__ */ new Date();
  return dateToJalali(now);
}
function normalizeJalaliDigits(input) {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
  let out = "";
  for (const ch of input) {
    const persianIndex = persianDigits.indexOf(ch);
    if (persianIndex !== -1) {
      out += persianIndex.toString();
      continue;
    }
    const arabicIndex = arabicDigits.indexOf(ch);
    if (arabicIndex !== -1) {
      out += arabicIndex.toString();
      continue;
    }
    out += ch;
  }
  return out.replace(/[-_.\s]+/g, "/").trim();
}
function jalaliStrToDate(jalaliStr) {
  const norm = normalizeJalaliDigits(jalaliStr);
  const m = norm.match(/^(\d{4})[\/-](\d{2})[\/-](\d{2})$/);
  if (!m) return null;
  const jy = parseInt(m[1], 10);
  const jm = parseInt(m[2], 10);
  const jd = parseInt(m[3], 10);
  try {
    const { gy, gm, gd } = toGregorian(jy, jm, jd);
    const date = new Date(gy, gm - 1, gd);
    return isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PersianDatePicker",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    label: {},
    placeholder: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const showPicker = ref(false);
    const selectedYear = ref(1403);
    const selectedMonth = ref(1);
    const selectedDay = ref(1);
    const displayValue = computed(() => {
      if (!props.modelValue) return "";
      return dateToJalali(props.modelValue);
    });
    const yearItems = computed(() => {
      const years = [];
      for (let year = 1400; year <= 1410; year++) {
        years.push({ title: year.toString(), value: year });
      }
      return years;
    });
    const monthItems = computed(() => {
      const months = [
        { title: "فروردین", value: 1 },
        { title: "اردیبهشت", value: 2 },
        { title: "خرداد", value: 3 },
        { title: "تیر", value: 4 },
        { title: "مرداد", value: 5 },
        { title: "شهریور", value: 6 },
        { title: "مهر", value: 7 },
        { title: "آبان", value: 8 },
        { title: "آذر", value: 9 },
        { title: "دی", value: 10 },
        { title: "بهمن", value: 11 },
        { title: "اسفند", value: 12 }
      ];
      return months;
    });
    const dayItems = computed(() => {
      const days = [];
      const maxDays = getMaxDaysInMonth(selectedYear.value, selectedMonth.value);
      for (let day = 1; day <= maxDays; day++) {
        days.push({ title: day.toString(), value: day });
      }
      return days;
    });
    watch([selectedYear, selectedMonth], () => {
      updateDate();
    });
    function getMaxDaysInMonth(year, month) {
      if (month <= 6) return 31;
      if (month <= 11) return 30;
      return isLeapYear(year) ? 30 : 29;
    }
    function isLeapYear(year) {
      const leapYears = [1403, 1407, 1411, 1415, 1419, 1423, 1427, 1431, 1435, 1439, 1443, 1447, 1451, 1455, 1459, 1463, 1467, 1471, 1475, 1479, 1483, 1487, 1491, 1495, 1499];
      return leapYears.includes(year);
    }
    function updateDate() {
      const maxDays = getMaxDaysInMonth(selectedYear.value, selectedMonth.value);
      if (selectedDay.value > maxDays) {
        selectedDay.value = maxDays;
      }
    }
    function confirmDate() {
      const jalaliStr = `${selectedYear.value}/${selectedMonth.value.toString().padStart(2, "0")}/${selectedDay.value.toString().padStart(2, "0")}`;
      const date = jalaliStrToDate(jalaliStr);
      if (date) {
        emit("update:modelValue", date);
      }
      showPicker.value = false;
    }
    function initializeDate() {
      if (props.modelValue && !isNaN(props.modelValue.getTime())) {
        const jalaliStr = dateToJalali(props.modelValue);
        const parts2 = jalaliStr.split("/");
        if (parts2.length === 3) {
          const year = parseInt(parts2[0]);
          const month = parseInt(parts2[1]);
          const day = parseInt(parts2[2]);
          if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
            selectedYear.value = year;
            selectedMonth.value = month;
            selectedDay.value = day;
            return;
          }
        }
      }
      const today = /* @__PURE__ */ new Date();
      const todayJalali2 = dateToJalali(today);
      const parts = todayJalali2.split("/");
      if (parts.length === 3) {
        selectedYear.value = parseInt(parts[0]) || 1403;
        selectedMonth.value = parseInt(parts[1]) || 1;
        selectedDay.value = parseInt(parts[2]) || 1;
      }
    }
    watch(() => props.modelValue, () => {
      initializeDate();
    }, { immediate: true });
    watch(showPicker, (isOpen) => {
      if (isOpen) {
        initializeDate();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "persian-date-picker" }, _attrs))} data-v-4dd9e859>`);
      _push(ssrRenderComponent(VTextField, {
        modelValue: unref(displayValue),
        "onUpdate:modelValue": ($event) => isRef(displayValue) ? displayValue.value = $event : null,
        label: _ctx.label,
        placeholder: _ctx.placeholder,
        readonly: "",
        "prepend-inner-icon": "mdi-calendar",
        onClick: ($event) => showPicker.value = true
      }, null, _parent));
      _push(ssrRenderComponent(VDialog, {
        modelValue: unref(showPicker),
        "onUpdate:modelValue": ($event) => isRef(showPicker) ? showPicker.value = $event : null,
        "max-width": "400"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, { class: "d-flex align-center justify-space-between" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span data-v-4dd9e859${_scopeId3}>انتخاب تاریخ</span>`);
                        _push4(ssrRenderComponent(VBtn, {
                          icon: "",
                          variant: "text",
                          onClick: ($event) => showPicker.value = false
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VIcon, { icon: "mdi-close" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VIcon, { icon: "mdi-close" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("span", null, "انتخاب تاریخ"),
                          createVNode(VBtn, {
                            icon: "",
                            variant: "text",
                            onClick: ($event) => showPicker.value = false
                          }, {
                            default: withCtx(() => [
                              createVNode(VIcon, { icon: "mdi-close" })
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="date-picker-content" data-v-4dd9e859${_scopeId3}><div class="mb-4" data-v-4dd9e859${_scopeId3}><label class="text-body-2 text-medium-emphasis mb-2 d-block" data-v-4dd9e859${_scopeId3}>سال</label>`);
                        _push4(ssrRenderComponent(VSelect, {
                          modelValue: unref(selectedYear),
                          "onUpdate:modelValue": [($event) => isRef(selectedYear) ? selectedYear.value = $event : null, updateDate],
                          items: unref(yearItems),
                          variant: "outlined",
                          density: "compact"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="mb-4" data-v-4dd9e859${_scopeId3}><label class="text-body-2 text-medium-emphasis mb-2 d-block" data-v-4dd9e859${_scopeId3}>ماه</label>`);
                        _push4(ssrRenderComponent(VSelect, {
                          modelValue: unref(selectedMonth),
                          "onUpdate:modelValue": [($event) => isRef(selectedMonth) ? selectedMonth.value = $event : null, updateDate],
                          items: unref(monthItems),
                          variant: "outlined",
                          density: "compact"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="mb-4" data-v-4dd9e859${_scopeId3}><label class="text-body-2 text-medium-emphasis mb-2 d-block" data-v-4dd9e859${_scopeId3}>روز</label>`);
                        _push4(ssrRenderComponent(VSelect, {
                          modelValue: unref(selectedDay),
                          "onUpdate:modelValue": [($event) => isRef(selectedDay) ? selectedDay.value = $event : null, updateDate],
                          items: unref(dayItems),
                          variant: "outlined",
                          density: "compact"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(VAlert, {
                          type: "info",
                          variant: "tonal",
                          class: "mb-3"
                        }, {
                          prepend: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VIcon, { icon: "mdi-calendar-check" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VIcon, { icon: "mdi-calendar-check" })
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="text-body-2" data-v-4dd9e859${_scopeId4}> تاریخ انتخاب شده: ${ssrInterpolate(unref(displayValue))}</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "text-body-2" }, " تاریخ انتخاب شده: " + toDisplayString(unref(displayValue)), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "date-picker-content" }, [
                            createVNode("div", { class: "mb-4" }, [
                              createVNode("label", { class: "text-body-2 text-medium-emphasis mb-2 d-block" }, "سال"),
                              createVNode(VSelect, {
                                modelValue: unref(selectedYear),
                                "onUpdate:modelValue": [($event) => isRef(selectedYear) ? selectedYear.value = $event : null, updateDate],
                                items: unref(yearItems),
                                variant: "outlined",
                                density: "compact"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                            ]),
                            createVNode("div", { class: "mb-4" }, [
                              createVNode("label", { class: "text-body-2 text-medium-emphasis mb-2 d-block" }, "ماه"),
                              createVNode(VSelect, {
                                modelValue: unref(selectedMonth),
                                "onUpdate:modelValue": [($event) => isRef(selectedMonth) ? selectedMonth.value = $event : null, updateDate],
                                items: unref(monthItems),
                                variant: "outlined",
                                density: "compact"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                            ]),
                            createVNode("div", { class: "mb-4" }, [
                              createVNode("label", { class: "text-body-2 text-medium-emphasis mb-2 d-block" }, "روز"),
                              createVNode(VSelect, {
                                modelValue: unref(selectedDay),
                                "onUpdate:modelValue": [($event) => isRef(selectedDay) ? selectedDay.value = $event : null, updateDate],
                                items: unref(dayItems),
                                variant: "outlined",
                                density: "compact"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                            ]),
                            createVNode(VAlert, {
                              type: "info",
                              variant: "tonal",
                              class: "mb-3"
                            }, {
                              prepend: withCtx(() => [
                                createVNode(VIcon, { icon: "mdi-calendar-check" })
                              ]),
                              default: withCtx(() => [
                                createVNode("div", { class: "text-body-2" }, " تاریخ انتخاب شده: " + toDisplayString(unref(displayValue)), 1)
                              ]),
                              _: 1
                            })
                          ])
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
                          onClick: ($event) => showPicker.value = false
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
                          color: "primary",
                          onClick: confirmDate
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`تایید`);
                            } else {
                              return [
                                createTextVNode("تایید")
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
                            onClick: ($event) => showPicker.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("انصراف")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(VBtn, {
                            color: "primary",
                            onClick: confirmDate
                          }, {
                            default: withCtx(() => [
                              createTextVNode("تایید")
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
                    createVNode(VCardTitle, { class: "d-flex align-center justify-space-between" }, {
                      default: withCtx(() => [
                        createVNode("span", null, "انتخاب تاریخ"),
                        createVNode(VBtn, {
                          icon: "",
                          variant: "text",
                          onClick: ($event) => showPicker.value = false
                        }, {
                          default: withCtx(() => [
                            createVNode(VIcon, { icon: "mdi-close" })
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "date-picker-content" }, [
                          createVNode("div", { class: "mb-4" }, [
                            createVNode("label", { class: "text-body-2 text-medium-emphasis mb-2 d-block" }, "سال"),
                            createVNode(VSelect, {
                              modelValue: unref(selectedYear),
                              "onUpdate:modelValue": [($event) => isRef(selectedYear) ? selectedYear.value = $event : null, updateDate],
                              items: unref(yearItems),
                              variant: "outlined",
                              density: "compact"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ]),
                          createVNode("div", { class: "mb-4" }, [
                            createVNode("label", { class: "text-body-2 text-medium-emphasis mb-2 d-block" }, "ماه"),
                            createVNode(VSelect, {
                              modelValue: unref(selectedMonth),
                              "onUpdate:modelValue": [($event) => isRef(selectedMonth) ? selectedMonth.value = $event : null, updateDate],
                              items: unref(monthItems),
                              variant: "outlined",
                              density: "compact"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ]),
                          createVNode("div", { class: "mb-4" }, [
                            createVNode("label", { class: "text-body-2 text-medium-emphasis mb-2 d-block" }, "روز"),
                            createVNode(VSelect, {
                              modelValue: unref(selectedDay),
                              "onUpdate:modelValue": [($event) => isRef(selectedDay) ? selectedDay.value = $event : null, updateDate],
                              items: unref(dayItems),
                              variant: "outlined",
                              density: "compact"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ]),
                          createVNode(VAlert, {
                            type: "info",
                            variant: "tonal",
                            class: "mb-3"
                          }, {
                            prepend: withCtx(() => [
                              createVNode(VIcon, { icon: "mdi-calendar-check" })
                            ]),
                            default: withCtx(() => [
                              createVNode("div", { class: "text-body-2" }, " تاریخ انتخاب شده: " + toDisplayString(unref(displayValue)), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode(VSpacer),
                        createVNode(VBtn, {
                          variant: "text",
                          onClick: ($event) => showPicker.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("انصراف")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(VBtn, {
                          color: "primary",
                          onClick: confirmDate
                        }, {
                          default: withCtx(() => [
                            createTextVNode("تایید")
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
                  createVNode(VCardTitle, { class: "d-flex align-center justify-space-between" }, {
                    default: withCtx(() => [
                      createVNode("span", null, "انتخاب تاریخ"),
                      createVNode(VBtn, {
                        icon: "",
                        variant: "text",
                        onClick: ($event) => showPicker.value = false
                      }, {
                        default: withCtx(() => [
                          createVNode(VIcon, { icon: "mdi-close" })
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "date-picker-content" }, [
                        createVNode("div", { class: "mb-4" }, [
                          createVNode("label", { class: "text-body-2 text-medium-emphasis mb-2 d-block" }, "سال"),
                          createVNode(VSelect, {
                            modelValue: unref(selectedYear),
                            "onUpdate:modelValue": [($event) => isRef(selectedYear) ? selectedYear.value = $event : null, updateDate],
                            items: unref(yearItems),
                            variant: "outlined",
                            density: "compact"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        createVNode("div", { class: "mb-4" }, [
                          createVNode("label", { class: "text-body-2 text-medium-emphasis mb-2 d-block" }, "ماه"),
                          createVNode(VSelect, {
                            modelValue: unref(selectedMonth),
                            "onUpdate:modelValue": [($event) => isRef(selectedMonth) ? selectedMonth.value = $event : null, updateDate],
                            items: unref(monthItems),
                            variant: "outlined",
                            density: "compact"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        createVNode("div", { class: "mb-4" }, [
                          createVNode("label", { class: "text-body-2 text-medium-emphasis mb-2 d-block" }, "روز"),
                          createVNode(VSelect, {
                            modelValue: unref(selectedDay),
                            "onUpdate:modelValue": [($event) => isRef(selectedDay) ? selectedDay.value = $event : null, updateDate],
                            items: unref(dayItems),
                            variant: "outlined",
                            density: "compact"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        createVNode(VAlert, {
                          type: "info",
                          variant: "tonal",
                          class: "mb-3"
                        }, {
                          prepend: withCtx(() => [
                            createVNode(VIcon, { icon: "mdi-calendar-check" })
                          ]),
                          default: withCtx(() => [
                            createVNode("div", { class: "text-body-2" }, " تاریخ انتخاب شده: " + toDisplayString(unref(displayValue)), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VSpacer),
                      createVNode(VBtn, {
                        variant: "text",
                        onClick: ($event) => showPicker.value = false
                      }, {
                        default: withCtx(() => [
                          createTextVNode("انصراف")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(VBtn, {
                        color: "primary",
                        onClick: confirmDate
                      }, {
                        default: withCtx(() => [
                          createTextVNode("تایید")
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PersianDatePicker.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-4dd9e859"]]);
const makeVTextareaProps = propsFactory({
  autoGrow: Boolean,
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: Function,
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  noResize: Boolean,
  rows: {
    type: [Number, String],
    default: 5,
    validator: (v) => !isNaN(parseFloat(v))
  },
  maxRows: {
    type: [Number, String],
    validator: (v) => !isNaN(parseFloat(v))
  },
  suffix: String,
  modelModifiers: Object,
  ...makeAutocompleteProps(),
  ...makeVInputProps(),
  ...makeVFieldProps()
}, "VTextarea");
const VTextarea = genericComponent()({
  name: "VTextarea",
  directives: {
    vIntersect: Intersect
  },
  inheritAttrs: false,
  props: makeVTextareaProps(),
  emits: {
    "click:control": (e) => true,
    "mousedown:control": (e) => true,
    "update:focused": (focused) => true,
    "update:modelValue": (val) => true,
    "update:rows": (rows) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const {
      onIntersect
    } = useAutofocus(props);
    const counterValue = computed(() => {
      return typeof props.counterValue === "function" ? props.counterValue(model.value) : (model.value || "").toString().length;
    });
    const max = computed(() => {
      if (attrs.maxlength) return attrs.maxlength;
      if (!props.counter || typeof props.counter !== "number" && typeof props.counter !== "string") return void 0;
      return props.counter;
    });
    const vInputRef = ref();
    const vFieldRef = ref();
    const controlHeight = shallowRef("");
    const textareaRef = ref();
    const autocomplete = useAutocomplete(props);
    const isActive = computed(() => props.persistentPlaceholder || isFocused.value || props.active);
    function onFocus() {
      if (autocomplete.isSuppressing.value) {
        autocomplete.update();
      }
      if (textareaRef.value !== (void 0).activeElement) {
        textareaRef.value?.focus();
      }
      if (!isFocused.value) focus();
    }
    function onControlClick(e) {
      onFocus();
      emit("click:control", e);
    }
    function onControlMousedown(e) {
      emit("mousedown:control", e);
    }
    function onClear(e) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = "";
        callEvent(props["onClick:clear"], e);
      });
    }
    function onInput(e) {
      const el = e.target;
      model.value = el.value;
      if (props.modelModifiers?.trim) {
        const caretPosition = [el.selectionStart, el.selectionEnd];
        nextTick(() => {
          el.selectionStart = caretPosition[0];
          el.selectionEnd = caretPosition[1];
        });
      }
    }
    const sizerRef = ref();
    const rows = ref(Number(props.rows));
    const isPlainOrUnderlined = computed(() => ["plain", "underlined"].includes(props.variant));
    watchEffect(() => {
      if (!props.autoGrow) rows.value = Number(props.rows);
    });
    function calculateInputHeight() {
      if (!props.autoGrow) return;
      nextTick(() => {
        if (!sizerRef.value || !vFieldRef.value) return;
        const style = getComputedStyle(sizerRef.value);
        const fieldStyle = getComputedStyle(vFieldRef.value.$el);
        const padding = parseFloat(style.getPropertyValue("--v-field-padding-top")) + parseFloat(style.getPropertyValue("--v-input-padding-top")) + parseFloat(style.getPropertyValue("--v-field-padding-bottom"));
        const height = sizerRef.value.scrollHeight;
        const lineHeight = parseFloat(style.lineHeight);
        const minHeight = Math.max(parseFloat(props.rows) * lineHeight + padding, parseFloat(fieldStyle.getPropertyValue("--v-input-control-height")));
        const maxHeight = parseFloat(props.maxRows) * lineHeight + padding || Infinity;
        const newHeight = clamp(height ?? 0, minHeight, maxHeight);
        rows.value = Math.floor((newHeight - padding) / lineHeight);
        controlHeight.value = convertToUnit(newHeight);
      });
    }
    watch(model, calculateInputHeight);
    watch(() => props.rows, calculateInputHeight);
    watch(() => props.maxRows, calculateInputHeight);
    watch(() => props.density, calculateInputHeight);
    watch(rows, (val) => {
      emit("update:rows", val);
    });
    let observer;
    watch(sizerRef, (val) => {
      if (val) {
        observer = new ResizeObserver(calculateInputHeight);
        observer.observe(sizerRef.value);
      } else {
        observer?.disconnect();
      }
    });
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || props.counterValue);
      const hasDetails = !!(hasCounter || slots.details);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const {
        modelValue: _,
        ...inputProps
      } = VInput.filterProps(props);
      const fieldProps = {
        ...VField.filterProps(props),
        "onClick:clear": onClear
      };
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-textarea v-text-field", {
          "v-textarea--prefixed": props.prefix,
          "v-textarea--suffixed": props.suffix,
          "v-text-field--prefixed": props.prefix,
          "v-text-field--suffixed": props.suffix,
          "v-textarea--auto-grow": props.autoGrow,
          "v-textarea--no-resize": props.noResize || props.autoGrow,
          "v-input--plain-underlined": isPlainOrUnderlined.value
        }, props.class],
        "style": props.style
      }, rootAttrs, inputProps, {
        "centerAffix": rows.value === 1 && !isPlainOrUnderlined.value,
        "focused": isFocused.value
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id,
            isDisabled,
            isDirty,
            isReadonly,
            isValid,
            hasDetails: hasDetails2
          } = _ref2;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "style": {
              "--v-textarea-control-height": controlHeight.value
            },
            "onClick": onControlClick,
            "onMousedown": onControlMousedown,
            "onClick:prependInner": props["onClick:prependInner"],
            "onClick:appendInner": props["onClick:appendInner"]
          }, fieldProps, {
            "id": id.value,
            "active": isActive.value || isDirty.value,
            "centerAffix": rows.value === 1 && !isPlainOrUnderlined.value,
            "dirty": isDirty.value || props.dirty,
            "disabled": isDisabled.value,
            "focused": isFocused.value,
            "details": hasDetails2.value,
            "error": isValid.value === false
          }), {
            ...slots,
            default: (_ref3) => {
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref3;
              return createElementVNode(Fragment, null, [props.prefix && createElementVNode("span", {
                "class": "v-text-field__prefix"
              }, [props.prefix]), withDirectives(createElementVNode("textarea", mergeProps({
                "ref": textareaRef,
                "class": fieldClass,
                "value": model.value,
                "onInput": onInput,
                "autofocus": props.autofocus,
                "readonly": isReadonly.value,
                "disabled": isDisabled.value,
                "placeholder": props.placeholder,
                "rows": props.rows,
                "name": autocomplete.fieldName.value,
                "autocomplete": autocomplete.fieldAutocomplete.value,
                "onFocus": onFocus,
                "onBlur": blur
              }, slotProps, inputAttrs), null), [[Intersect, {
                handler: onIntersect
              }, null, {
                once: true
              }]]), props.autoGrow && withDirectives(createElementVNode("textarea", {
                "class": normalizeClass([fieldClass, "v-textarea__sizer"]),
                "id": `${slotProps.id}-sizer`,
                "onUpdate:modelValue": ($event) => model.value = $event,
                "ref": sizerRef,
                "readonly": true,
                "aria-hidden": "true"
              }, null), [[vModelText, model.value]]), props.suffix && createElementVNode("span", {
                "class": "v-text-field__suffix"
              }, [props.suffix])]);
            }
          });
        },
        details: hasDetails ? (slotProps) => createElementVNode(Fragment, null, [slots.details?.(slotProps), hasCounter && createElementVNode(Fragment, null, [createElementVNode("span", null, null), createVNode(VCounter, {
          "active": props.persistentCounter || isFocused.value,
          "value": counterValue.value,
          "max": max.value,
          "disabled": props.disabled
        }, slots.counter)])]) : void 0
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, textareaRef);
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TaskDialog",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    editing: {},
    date: {}
  },
  emits: ["update:modelValue", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const model = computed({ get: () => props.modelValue, set: (v) => emit("update:modelValue", v) });
    const editing = computed(() => props.editing);
    const title = ref("");
    const description = ref("");
    const status = ref(TaskStatus.Todo);
    const selectedDate = ref(/* @__PURE__ */ new Date());
    function fillFromProps() {
      if (editing.value) {
        title.value = editing.value.title;
        description.value = editing.value.description || "";
        status.value = editing.value.status;
        selectedDate.value = editing.value.dueDate;
      } else {
        title.value = "";
        description.value = "";
        status.value = TaskStatus.Todo;
        selectedDate.value = props.date || /* @__PURE__ */ new Date();
      }
    }
    watch(() => props.editing, () => {
      fillFromProps();
    }, { immediate: true });
    watch(model, (open) => {
      if (!open) {
        title.value = "";
        description.value = "";
        status.value = TaskStatus.Todo;
        selectedDate.value = props.date || /* @__PURE__ */ new Date();
      }
    });
    const statusItems = [
      { title: "انجام نشده", value: TaskStatus.Todo },
      { title: "در حال انجام", value: TaskStatus.InProgress },
      { title: "انجام شده", value: TaskStatus.Done }
    ];
    function save() {
      if (!selectedDate.value || isNaN(selectedDate.value.getTime())) {
        alert("لطفا تاریخ معتبر انتخاب کنید.");
        return;
      }
      const payload = {
        date: selectedDate.value,
        task: { title: title.value, description: description.value, status: status.value }
      };
      if (editing.value) {
        emit("save", { ...payload, editingId: editing.value.id });
      } else {
        emit("save", payload);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PersianDatePicker = __nuxt_component_0;
      _push(ssrRenderComponent(VDialog, mergeProps({
        modelValue: unref(model),
        "onUpdate:modelValue": ($event) => isRef(model) ? model.value = $event : null,
        "max-width": "520"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(editing) ? "ویرایش تسک" : "ایجاد تسک")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(editing) ? "ویرایش تسک" : "ایجاد تسک"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(title),
                          "onUpdate:modelValue": ($event) => isRef(title) ? title.value = $event : null,
                          label: "عنوان"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTextarea, {
                          modelValue: unref(description),
                          "onUpdate:modelValue": ($event) => isRef(description) ? description.value = $event : null,
                          label: "توضیحات",
                          "auto-grow": ""
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VSelect, {
                          items: statusItems,
                          modelValue: unref(status),
                          "onUpdate:modelValue": ($event) => isRef(status) ? status.value = $event : null,
                          label: "وضعیت"
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="mb-4"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_PersianDatePicker, {
                          modelValue: unref(selectedDate),
                          "onUpdate:modelValue": ($event) => isRef(selectedDate) ? selectedDate.value = $event : null,
                          label: "تاریخ سررسید",
                          placeholder: "انتخاب تاریخ"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(title),
                            "onUpdate:modelValue": ($event) => isRef(title) ? title.value = $event : null,
                            label: "عنوان"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(VTextarea, {
                            modelValue: unref(description),
                            "onUpdate:modelValue": ($event) => isRef(description) ? description.value = $event : null,
                            label: "توضیحات",
                            "auto-grow": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(VSelect, {
                            items: statusItems,
                            modelValue: unref(status),
                            "onUpdate:modelValue": ($event) => isRef(status) ? status.value = $event : null,
                            label: "وضعیت"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "mb-4" }, [
                            createVNode(_component_PersianDatePicker, {
                              modelValue: unref(selectedDate),
                              "onUpdate:modelValue": ($event) => isRef(selectedDate) ? selectedDate.value = $event : null,
                              label: "تاریخ سررسید",
                              placeholder: "انتخاب تاریخ"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
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
                          onClick: ($event) => emit("update:modelValue", false)
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
                          color: "primary",
                          onClick: save
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`ذخیره`);
                            } else {
                              return [
                                createTextVNode("ذخیره")
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
                            onClick: ($event) => emit("update:modelValue", false)
                          }, {
                            default: withCtx(() => [
                              createTextVNode("انصراف")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(VBtn, {
                            color: "primary",
                            onClick: save
                          }, {
                            default: withCtx(() => [
                              createTextVNode("ذخیره")
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
                        createTextVNode(toDisplayString(unref(editing) ? "ویرایش تسک" : "ایجاد تسک"), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(title),
                          "onUpdate:modelValue": ($event) => isRef(title) ? title.value = $event : null,
                          label: "عنوان"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(VTextarea, {
                          modelValue: unref(description),
                          "onUpdate:modelValue": ($event) => isRef(description) ? description.value = $event : null,
                          label: "توضیحات",
                          "auto-grow": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(VSelect, {
                          items: statusItems,
                          modelValue: unref(status),
                          "onUpdate:modelValue": ($event) => isRef(status) ? status.value = $event : null,
                          label: "وضعیت"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "mb-4" }, [
                          createVNode(_component_PersianDatePicker, {
                            modelValue: unref(selectedDate),
                            "onUpdate:modelValue": ($event) => isRef(selectedDate) ? selectedDate.value = $event : null,
                            label: "تاریخ سررسید",
                            placeholder: "انتخاب تاریخ"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode(VSpacer),
                        createVNode(VBtn, {
                          variant: "text",
                          onClick: ($event) => emit("update:modelValue", false)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("انصراف")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(VBtn, {
                          color: "primary",
                          onClick: save
                        }, {
                          default: withCtx(() => [
                            createTextVNode("ذخیره")
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
                      createTextVNode(toDisplayString(unref(editing) ? "ویرایش تسک" : "ایجاد تسک"), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(title),
                        "onUpdate:modelValue": ($event) => isRef(title) ? title.value = $event : null,
                        label: "عنوان"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(VTextarea, {
                        modelValue: unref(description),
                        "onUpdate:modelValue": ($event) => isRef(description) ? description.value = $event : null,
                        label: "توضیحات",
                        "auto-grow": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(VSelect, {
                        items: statusItems,
                        modelValue: unref(status),
                        "onUpdate:modelValue": ($event) => isRef(status) ? status.value = $event : null,
                        label: "وضعیت"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("div", { class: "mb-4" }, [
                        createVNode(_component_PersianDatePicker, {
                          modelValue: unref(selectedDate),
                          "onUpdate:modelValue": ($event) => isRef(selectedDate) ? selectedDate.value = $event : null,
                          label: "تاریخ سررسید",
                          placeholder: "انتخاب تاریخ"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VSpacer),
                      createVNode(VBtn, {
                        variant: "text",
                        onClick: ($event) => emit("update:modelValue", false)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("انصراف")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(VBtn, {
                        color: "primary",
                        onClick: save
                      }, {
                        default: withCtx(() => [
                          createTextVNode("ذخیره")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TaskDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=TaskDialog-ptfFscT_.js.map
