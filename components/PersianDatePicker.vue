<template>
  <div class="persian-date-picker">
    <ClientOnly>
      <VTextField
        v-model="displayValue"
        :label="label"
        :placeholder="placeholder"
        readonly
        prepend-inner-icon="mdi-calendar"
        @click="showPicker = true"
      />
      
      <VDialog v-model="showPicker" max-width="400">
      <VCard>
        <VCardTitle class="d-flex align-center justify-space-between">
          <span>انتخاب تاریخ</span>
          <VBtn icon variant="text" @click="showPicker = false">
            <VIcon icon="mdi-close" />
          </VBtn>
        </VCardTitle>
        
        <VCardText>
          <div class="date-picker-content">
            <!-- انتخاب سال -->
            <div class="mb-4">
              <label class="text-body-2 text-medium-emphasis mb-2 d-block">سال</label>
              <VSelect
                v-model="selectedYear"
                :items="yearItems"
                variant="outlined"
                density="compact"
                @update:model-value="updateDate"
              />
            </div>
            
            <!-- انتخاب ماه -->
            <div class="mb-4">
              <label class="text-body-2 text-medium-emphasis mb-2 d-block">ماه</label>
              <VSelect
                v-model="selectedMonth"
                :items="monthItems"
                variant="outlined"
                density="compact"
                @update:model-value="updateDate"
              />
            </div>
            
            <!-- انتخاب روز -->
            <div class="mb-4">
              <label class="text-body-2 text-medium-emphasis mb-2 d-block">روز</label>
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
        
        <VCardActions>
          <VSpacer />
          <VBtn variant="text" @click="showPicker = false">انصراف</VBtn>
          <VBtn color="primary" @click="confirmDate">تأیید</VBtn>
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

const showPicker = ref(false)
const selectedYear = ref(1403)
const selectedMonth = ref(1)
const selectedDay = ref(1)

const displayValue = computed(() => {
  if (!props.modelValue) {
    // نمایش تاریخ امروز به عنوان پیش‌فرض
    const today = new Date()
    const jalali = dateToJalali(today)
    return `${jalali.jy}/${jalali.jm.toString().padStart(2, '0')}/${jalali.jd.toString().padStart(2, '0')}`
  }
  const jalali = dateToJalali(props.modelValue)
  return `${jalali.jy}/${jalali.jm.toString().padStart(2, '0')}/${jalali.jd.toString().padStart(2, '0')}`
})

const yearItems = computed(() => {
  const currentYear = new Date().getFullYear()
  const jalali = dateToJalali(new Date(currentYear, 0, 1))
  const startYear = jalali.jy - 10
  const endYear = jalali.jy + 10
  
  return Array.from({ length: endYear - startYear + 1 }, (_, i) => ({
    title: (startYear + i).toString(),
    value: startYear + i
  }))
})

const monthItems = computed(() => [
  { title: 'فروردین', value: 1 },
  { title: 'اردیبهشت', value: 2 },
  { title: 'خرداد', value: 3 },
  { title: 'تیر', value: 4 },
  { title: 'مرداد', value: 5 },
  { title: 'شهریور', value: 6 },
  { title: 'مهر', value: 7 },
  { title: 'آبان', value: 8 },
  { title: 'آذر', value: 9 },
  { title: 'دی', value: 10 },
  { title: 'بهمن', value: 11 },
  { title: 'اسفند', value: 12 }
])

const dayItems = computed(() => {
  const daysInMonth = getDaysInJalaliMonth(selectedYear.value, selectedMonth.value)
  return Array.from({ length: daysInMonth }, (_, i) => ({
    title: (i + 1).toString(),
    value: i + 1
  }))
})

function getDaysInJalaliMonth(year: number, month: number): number {
  if (month <= 6) return 31
  if (month <= 11) return 30
  // برای اسفند، بررسی سال کبیسه
  return isLeapJalaliYear(year) ? 30 : 29
}

function isLeapJalaliYear(year: number): boolean {
  const jalali = dateToJalali(new Date(year + 621, 2, 20)) // 20 مارس
  return jalali.jy % 4 === 3
}

function updateDate() {
  // فقط برای به‌روزرسانی لیست روزها
}

function confirmDate() {
  const date = jalaliToDate(selectedYear.value, selectedMonth.value, selectedDay.value)
  emit('update:modelValue', date)
  showPicker.value = false
}

// مقداردهی اولیه
watch(() => props.modelValue, (newValue) => {
  const now = new Date()
  const jalali = dateToJalali(newValue || now)
  selectedYear.value = jalali.jy
  selectedMonth.value = jalali.jm
  selectedDay.value = jalali.jd
}, { immediate: true })

// تنظیم مقدار پیش‌فرض
onMounted(() => {
  if (import.meta.client) {
    const now = new Date() // در کلاینت از تاریخ واقعی استفاده کن
    const jalali = dateToJalali(now)
    selectedYear.value = jalali.jy
    selectedMonth.value = jalali.jm
    selectedDay.value = jalali.jd
  }
})
</script>

<style scoped>
.persian-date-picker {
  direction: rtl;
}

.date-picker-content {
  direction: rtl;
}

.date-picker-content .v-field__input {
  text-align: center;
}
</style>
