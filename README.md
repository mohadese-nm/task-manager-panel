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
- ✅ جستجو و فیلتر
- ✅ Real-time Sync بین تب‌ها
- ✅ نوتیفیکیشن صوتی
- ✅ کنترل دسترسی مبتنی بر پرمیشن (Type-safe)
- ✅ تقویم جلالی

## نصب و راه‌اندازی

### IDE و TypeScript در فایل‌های Vue

اگر در قالب فایل‌های `.vue` خطای «Cannot find name» می‌بینید (مثلاً برای `openCreate` یا متغیرهای script setup):

1. افزونه **Vue - Official (Volar)** را نصب کنید و در صورت نصب بودن **Vetur** آن را غیرفعال کنید.
2. از Command Palette دستور **Vue: Reload Project** یا **Developer: Reload Window** را اجرا کنید.
3. پروژه از `.vscode/settings.json` استفاده می‌کند؛ در صورت استفاده از Cursor/VS Code، Volar با Take Over Mode برای type-check فایل‌های Vue استفاده می‌شود.

کد در ران‌تایم درست کار می‌کند؛ این خطاها فقط مربوط به type-check قالب در محیط توسعه هستند.

### پیش‌نیازها

- نسخه Node.js: **Node 20 LTS**

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

## 🔊 فعال‌سازی نوتیفیکیشن صوتی

برای شنیدن صدای نوتیفیکیشن هنگام ایجاد یا تکمیل تسک‌ها، باید دسترسی صدا را در مرورگر فعال کنید:

### مراحل فعال‌سازی

#### Google Chrome

1. روی آیکون قفل یا صدا در نوار آدرس کلیک کنید
2. گزینه "صدا" را روی "اجازه" تنظیم کنید
3. صفحه را رفرش کنید

#### Firefox

1. روی آیکون سپر در نوار آدرس کلیک کنید
2. گزینه "صدا" را روی "اجازه" تنظیم کنید
3. صفحه را رفرش کنید

#### Microsoft Edge

1. روی آیکون قفل در نوار آدرس کلیک کنید
2. گزینه "صدا" را روی "اجازه" تنظیم کنید
3. صفحه را رفرش کنید

### نکات مهم

- **اولین بار:** حتماً روی صفحه کلیک کنید تا صدا فعال شود
- **Volume سیستم:** مطمئن شوید volume سیستم و مرورگر خاموش نیست
- **Extension ها:** Extension های ad blocker ممکن است صدا را مسدود کنند

### تست صدا

- هنگام **ایجاد تسک جدید** صدای ایجاد پخش می‌شود
- هنگام **تغییر وضعیت تسک به "انجام شده"** صدای تکمیل پخش می‌شود

## ساختار پروژه

```
├── components/         # کامپوننت‌های Vue
├── composables/        # Composables برای منطق مشترک
├── assets/             # استایل‌ها و دارایی‌های پردازشی (SCSS, تصاویر ماژولی)
├── middleware/         # Route middleware
├── layouts/            # layouts
├── pages/              # صفحات Nuxt
├── plugins/            # Nuxt plugins
├── public/             # فایل‌های استاتیک سِرو‌شونده در روت (مثل favicon)
├── stores/             # Pinia stores
├── types/              # TypeScript type definitions
├── utils/              # jalali date
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

## ویژگی‌های فنی

- **Real-time Sync**: استفاده از BroadcastChannel برای همگام‌سازی بین تب‌ها
- **Infinite Scroll**: بارگذاری تدریجی تسک‌ها
- **Notification Sound**: تولید صدا با Web Audio API (نیاز به فعال‌سازی دسترسی صدا)
- **Permission System**: سیستم پرمیشن type-safe
- **Responsive Design**: طراحی واکنش‌گرا
- **RTL Support**: پشتیبانی کامل از راست به چپ

## مجوز

MIT License
