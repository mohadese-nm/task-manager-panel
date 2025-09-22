# پنل To-Do

پنل مدیریت تسک‌های روزانه با استفاده از Nuxt 3، Vuetify و TypeScript

## ویژگی‌ها

### امکانات اصلی
- ✅ پنل ادمین 
- ✅ مدیریت کامل تسک‌ها (ایجاد، ویرایش، حذف)
- ✅ جابجایی تسک‌ها با Drag & Drop
- ✅ تغییر وضعیت تسک‌ها (انجام شده، انجام نشده، در حال انجام)
- ✅ نمایش 7 روز هفته با هایلایت امروز
- ✅ Infinite Scroll برای هر روز
- ✅ جستجو و فیلتر پیشرفته
- ✅ Real-time Sync بین تب‌ها
- ✅ نوتیفیکیشن صوتی
- ✅ کنترل دسترسی مبتنی بر پرمیشن (Type-safe) 


## نصب و راه‌اندازی

```bash
# نصب dependencies
npm install

# اجرای پروژه در حالت development
npm run dev

# ساخت پروژه برای production
npm run build

# پیش‌نمایش پروژه ساخته شده
npm run preview
```

## اطلاعات ورود تست

برای تست دسترسی منوی "برای انجام" دو کاربر نمونه تعریف شده است:

- ادمین: نام کاربری `admin` و رمز عبور `admin123` (با پرمیشن `menu_in_todos_show`)
- مهمان: نام کاربری `guest` و رمز عبور `guest123` (بدون پرمیشن)

از صفحه `/login` وارد شوید. در صورت ورود با کاربر ادمین، آیتم منوی "برای انجام" نمایش داده می‌شود و دسترسی به `/admin` دارید.


## ساختار پروژه

```
├── components/          # کامپوننت‌های Vue
├── composables/         # Composables برای منطق مشترک
├── middleware/         # Route middleware
├── pages/              # صفحات Nuxt
├── plugins/            # Nuxt plugins
├── stores/             # Pinia stores
├── types/              # TypeScript type definitions
└── app.vue             # Root component
```

## تکنولوژی‌های استفاده شده

- **Nuxt 3** - Framework اصلی
- **Vue 3** - Frontend framework
- **Vuetify 3** - UI component library
- **TypeScript** - Type safety
- **Pinia** - State management
- **VueUse** - Vue composition utilities
- **VueDraggable** - Drag & drop functionality

## ویژگی‌های پیشرفته

- **Real-time Sync**: استفاده از BroadcastChannel برای همگام‌سازی بین تب‌ها
- **Infinite Scroll**: بارگذاری تدریجی تسک‌ها
- **Notification Sound**: تولید صدا با Web Audio API
- **Permission System**: سیستم پرمیشن type-safe
- **Responsive Design**: طراحی واکنش‌گرا
- **RTL Support**: پشتیبانی کامل از راست به چپ

## مجوز

MIT License

