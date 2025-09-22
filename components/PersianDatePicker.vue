<template>
  <div class="persian-date-picker">
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
            
            <!-- نمایش تاریخ انتخاب شده -->
            <VAlert type="info" variant="tonal" class="mb-3">
              <template #prepend>
                <VIcon icon="mdi-calendar-check" />
              </template>
              <div class="text-body-2">
                تاریخ انتخاب شده: {{ displayValue }}
              </div>
            </VAlert>
          </div>
        </VCardText>
        
        <VCardActions>
          <VSpacer />
          <VBtn variant="text" @click="showPicker = false">انصراف</VBtn>
          <VBtn color="primary" @click="confirmDate">تایید</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<script setup lang="ts">
import { dateToJalali, jalaliStrToDate } from '@/utils/jalali'

const props = defineProps<{
  modelValue: Date
  label?: string
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Date): void
}>()

const showPicker = ref(false)
const selectedYear = ref(1403)
const selectedMonth = ref(1)
const selectedDay = ref(1)

// مقداردهی اولیه فوری
onMounted(() => {
  initializeDate()
})

// مقدار نمایشی
const displayValue = computed(() => {
  if (!props.modelValue) return ''
  return dateToJalali(props.modelValue)
})

// لیست سال‌ها (1400 تا 1410)
const yearItems = computed(() => {
  const years = []
  for (let year = 1400; year <= 1410; year++) {
    years.push({ title: year.toString(), value: year })
  }
  return years
})

// لیست ماه‌ها
const monthItems = computed(() => {
  const months = [
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
  ]
  return months
})

// لیست روزها
const dayItems = computed(() => {
  const days = []
  const maxDays = getMaxDaysInMonth(selectedYear.value, selectedMonth.value)
  for (let day = 1; day <= maxDays; day++) {
    days.push({ title: day.toString(), value: day })
  }
  return days
})

// بروزرسانی روز هنگام تغییر سال یا ماه
watch([selectedYear, selectedMonth], () => {
  updateDate()
})

// محاسبه حداکثر روزهای ماه
function getMaxDaysInMonth(year: number, month: number): number {
  if (month <= 6) return 31
  if (month <= 11) return 30
  // اسفند
  return isLeapYear(year) ? 30 : 29
}

// بررسی سال کبیسه
function isLeapYear(year: number): boolean {
  const leapYears = [1403, 1407, 1411, 1415, 1419, 1423, 1427, 1431, 1435, 1439, 1443, 1447, 1451, 1455, 1459, 1463, 1467, 1471, 1475, 1479, 1483, 1487, 1491, 1495, 1499]
  return leapYears.includes(year)
}

// بروزرسانی تاریخ
function updateDate() {
  // بررسی اینکه روز انتخاب شده در ماه جدید معتبر باشد
  const maxDays = getMaxDaysInMonth(selectedYear.value, selectedMonth.value)
  if (selectedDay.value > maxDays) {
    selectedDay.value = maxDays
  }
}

// تایید تاریخ
function confirmDate() {
  const jalaliStr = `${selectedYear.value}/${selectedMonth.value.toString().padStart(2, '0')}/${selectedDay.value.toString().padStart(2, '0')}`
  const date = jalaliStrToDate(jalaliStr)
  if (date) {
    emit('update:modelValue', date)
  }
  showPicker.value = false
}

// مقداردهی اولیه
function initializeDate() {
  if (props.modelValue && !isNaN(props.modelValue.getTime())) {
    const jalaliStr = dateToJalali(props.modelValue)
    const parts = jalaliStr.split('/')
    if (parts.length === 3) {
      const year = parseInt(parts[0])
      const month = parseInt(parts[1])
      const day = parseInt(parts[2])
      
      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        selectedYear.value = year
        selectedMonth.value = month
        selectedDay.value = day
        return
      }
    }
  }
  
  // مقدار پیش‌فرض: امروز
  const today = new Date()
  const todayJalali = dateToJalali(today)
  const parts = todayJalali.split('/')
  if (parts.length === 3) {
    selectedYear.value = parseInt(parts[0]) || 1403
    selectedMonth.value = parseInt(parts[1]) || 1
    selectedDay.value = parseInt(parts[2]) || 1
  }
}

// مقداردهی اولیه
watch(() => props.modelValue, () => {
  initializeDate()
}, { immediate: true })

// مقداردهی مجدد هنگام باز شدن picker
watch(showPicker, (isOpen) => {
  if (isOpen) {
    initializeDate()
  }
})
</script>

<style scoped>
.persian-date-picker {
  width: 100%;
}

.date-picker-content {
  direction: rtl;
}
</style>

