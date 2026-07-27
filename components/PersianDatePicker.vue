<template>
  <div class="persian-date-picker" :class="{ 'is-ltr': locale === 'en' }">
    <ClientOnly>
      <VTextField
        v-model="displayValue"
        :label="label"
        :placeholder="placeholder"
        readonly
        prepend-inner-icon="mdi-calendar"
        @click="showPicker = true"
      />

      <VDialog v-model="showPicker" max-width="400" width="100%" content-class="app-dialog">
        <VCard class="app-dialog-card" :dir="locale === 'fa' ? 'rtl' : 'ltr'">
          <VCardTitle class="d-flex align-center justify-space-between text-wrap">
            <span>{{ $t('Select Date') }}</span>
            <VBtn icon variant="text" @click="showPicker = false">
              <VIcon icon="mdi-close" />
            </VBtn>
          </VCardTitle>

          <VCardText class="app-dialog-card__body">
            <div class="date-picker-content" :class="{ 'dir-ltr': locale === 'en' }">
              <div class="mb-4">
                <label class="text-body-2 text-medium-emphasis mb-2 d-block">{{ $t('Year') }}</label>
                <VSelect
                  v-model="selectedYear"
                  :items="yearItems"
                  variant="outlined"
                  density="compact"
                  @update:model-value="updateDate"
                />
              </div>

              <div class="mb-4">
                <label class="text-body-2 text-medium-emphasis mb-2 d-block">{{ $t('Month') }}</label>
                <VSelect
                  v-model="selectedMonth"
                  :items="monthItems"
                  variant="outlined"
                  density="compact"
                  @update:model-value="updateDate"
                />
              </div>

              <div class="mb-4">
                <label class="text-body-2 text-medium-emphasis mb-2 d-block">{{ $t('Day') }}</label>
                <VSelect
                  v-model="selectedDay"
                  :items="dayItems"
                  variant="outlined"
                  density="compact"
                  @update:model-value="updateDate"
                />
              </div>
            </div>
          </VCardText>

          <VCardActions class="flex-wrap ga-2">
            <VSpacer class="d-none d-sm-block" />
            <VBtn variant="text" @click="showPicker = false">{{ $t('Cancel') }}</VBtn>
            <VBtn color="primary" @click="confirmDate">{{ $t('Confirm') }}</VBtn>
          </VCardActions>
        </VCard>
      </VDialog>

      <template #fallback>
        <VTextField
          :label="label"
          :placeholder="placeholder"
          readonly
          prepend-inner-icon="mdi-calendar"
        />
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { dateToJalali, jalaliToDate } from '@/utils/jalali'

const props = defineProps<{
  modelValue?: Date
  label?: string
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Date | undefined]
}>()

const nuxtApp = useNuxtApp()
const i18n = nuxtApp.$i18n as { locale: { value: string } }
const locale = i18n.locale

const showPicker = ref(false)
const selectedYear = ref(1403)
const selectedMonth = ref(1)
const selectedDay = ref(1)

const isJalali = computed(() => locale.value === 'fa')

const displayValue = computed(() => {
  if (!props.modelValue) {
    const today = new Date()
    if (isJalali.value) {
      const j = dateToJalali(today)
      return `${j.jy}/${j.jm.toString().padStart(2, '0')}/${j.jd.toString().padStart(2, '0')}`
    }
    return today.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
  }
  if (isJalali.value) {
    const j = dateToJalali(props.modelValue)
    return `${j.jy}/${j.jm.toString().padStart(2, '0')}/${j.jd.toString().padStart(2, '0')}`
  }
  return props.modelValue.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
})

const yearItems = computed(() => {
  if (isJalali.value) {
    const jalali = dateToJalali(new Date())
    const startYear = jalali.jy - 10
    const endYear = jalali.jy + 10
    return Array.from({ length: endYear - startYear + 1 }, (_, i) => ({
      title: (startYear + i).toString(),
      value: startYear + i
    }))
  }
  const y = new Date().getFullYear()
  const start = y - 10
  const end = y + 10
  return Array.from({ length: end - start + 1 }, (_, i) => ({
    title: (start + i).toString(),
    value: start + i
  }))
})

const JALALI_MONTHS = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
]
const GREGORIAN_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const monthItems = computed(() => {
  if (isJalali.value) {
    return JALALI_MONTHS.map((title, i) => ({ title, value: i + 1 }))
  }
  return GREGORIAN_MONTHS.map((title, i) => ({ title, value: i + 1 }))
})

function getDaysInJalaliMonth(year: number, month: number): number {
  if (month <= 6) return 31
  if (month <= 11) return 30
  return isLeapJalaliYear(year) ? 30 : 29
}

function isLeapJalaliYear(year: number): boolean {
  const jalali = dateToJalali(new Date(year + 621, 2, 20))
  return jalali.jy % 4 === 3
}

function getDaysInGregorianMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

const dayItems = computed(() => {
  const days = isJalali.value
    ? getDaysInJalaliMonth(selectedYear.value, selectedMonth.value)
    : getDaysInGregorianMonth(selectedYear.value, selectedMonth.value)
  return Array.from({ length: days }, (_, i) => ({
    title: (i + 1).toString(),
    value: i + 1
  }))
})

function updateDate() {
  const maxDay = isJalali.value
    ? getDaysInJalaliMonth(selectedYear.value, selectedMonth.value)
    : getDaysInGregorianMonth(selectedYear.value, selectedMonth.value)
  if (selectedDay.value > maxDay) selectedDay.value = maxDay
}

function confirmDate() {
  const date = isJalali.value
    ? jalaliToDate(selectedYear.value, selectedMonth.value, selectedDay.value)
    : new Date(selectedYear.value, selectedMonth.value - 1, selectedDay.value)
  emit('update:modelValue', date)
  showPicker.value = false
}

function syncFromModel() {
  const d = props.modelValue || new Date()
  if (isJalali.value) {
    const j = dateToJalali(d)
    selectedYear.value = j.jy
    selectedMonth.value = j.jm
    selectedDay.value = j.jd
  } else {
    selectedYear.value = d.getFullYear()
    selectedMonth.value = d.getMonth() + 1
    selectedDay.value = d.getDate()
  }
}

watch(() => [props.modelValue, locale.value], syncFromModel, { immediate: true })

onMounted(() => {
  if (import.meta.client) syncFromModel()
})
</script>

<style scoped>
.persian-date-picker:not(.is-ltr) {
  direction: rtl;
}

.persian-date-picker.is-ltr {
  direction: ltr;
}

.date-picker-content:not(.dir-ltr) {
  direction: rtl;
}

.date-picker-content.dir-ltr {
  direction: ltr;
}

.date-picker-content .v-field__input {
  text-align: center;
}
</style>
