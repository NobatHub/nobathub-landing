import { Business, Appointment } from '../types';

export const INITIAL_BUSINESS: Business = {
  id: 'biz-viona',
  slug: 'viona_salon',
  name: 'سالن زیبایی ویونا',
  category: 'سالن زیبایی و آرایشگاه',
  managerName: 'خانم علیزاده',
  phone: '09123456789',
  city: 'تهران - زعفرانیه',
  createdAtJalali: '۱۴۰۵/۰۷/۱۵',
  settings: {
    workDays: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه'],
    startTime: '۰۹:۰۰',
    endTime: '۱۹:۰۰',
    breakStartTime: '۱۳:۰۰',
    breakEndTime: '۱۴:۰۰',
  },
  services: [
    {
      id: 'srv-1',
      title: 'میکاپ و استایل تخصصی VIP',
      durationMinutes: 60,
      price: 850000,
      specialist: 'سارا رضایی',
      category: 'میکاپ'
    },
    {
      id: 'srv-2',
      title: 'پاکسازی و فیشیال عمیق پوست',
      durationMinutes: 45,
      price: 650000,
      specialist: 'مریم حسینی',
      category: 'پوست'
    },
    {
      id: 'srv-3',
      title: 'کوپ، ژورنال و براشینگ مجلسی',
      durationMinutes: 50,
      price: 450000,
      specialist: 'فرشته انصاری',
      category: 'مو'
    },
    {
      id: 'srv-4',
      title: 'کاشت و ترمیم ناخن لمینت',
      durationMinutes: 40,
      price: 380000,
      specialist: 'مینا کریمی',
      category: 'ناخن'
    }
  ],
  customers: [
    {
      id: 'cust-1',
      name: 'پریسا مهدوی',
      phone: '09124433221',
      totalAppointments: 4,
      lastVisitJalali: '۱۴۰۵/۰۷/۲۸',
      totalSpent: 2900000
    },
    {
      id: 'cust-2',
      name: 'سحر باقری',
      phone: '09378899001',
      totalAppointments: 2,
      lastVisitJalali: '۱۴۰۵/۰۸/۰۲',
      totalSpent: 1300000
    },
    {
      id: 'cust-3',
      name: 'نرگس کاظمی',
      phone: '09192233445',
      totalAppointments: 6,
      lastVisitJalali: '۱۴۰۵/۰۸/۰۶',
      totalSpent: 4200000
    }
  ]
};

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    trackingCode: 'NH-84920',
    customerName: 'پریسا مهدوی',
    customerPhone: '09124433221',
    serviceTitle: 'میکاپ و استایل تخصصی VIP',
    specialistName: 'سارا رضایی',
    price: 850000,
    dateJalali: '۱۴۰۵/۰۸/۰۸',
    timeSlot: '۱۰:۳۰ صبح',
    status: 'confirmed',
    otpVerified: true,
    smsSentToManager: true,
    smsSentToCustomer: true,
  },
  {
    id: 'apt-102',
    trackingCode: 'NH-73105',
    customerName: 'سحر باقری',
    customerPhone: '09378899001',
    serviceTitle: 'پاکسازی و فیشیال عمیق پوست',
    specialistName: 'مریم حسینی',
    price: 650000,
    dateJalali: '۱۴۰۵/۰۸/۰۸',
    timeSlot: '۱۲:۰۰ ظهر',
    status: 'confirmed',
    otpVerified: true,
    smsSentToManager: true,
    smsSentToCustomer: true,
  },
  {
    id: 'apt-103',
    trackingCode: 'NH-91024',
    customerName: 'نرگس کاظمی',
    customerPhone: '09192233445',
    serviceTitle: 'کوپ، ژورنال و براشینگ مجلسی',
    specialistName: 'فرشته انصاری',
    price: 450000,
    dateJalali: '۱۴۰۵/۰۸/۰۹',
    timeSlot: '۱۵:۳۰ عصر',
    status: 'pending',
    otpVerified: true,
    smsSentToManager: true,
    smsSentToCustomer: true,
  }
];

export const FAQ_ITEMS = [
  {
    q: 'لینک اختصاصی رزرو چیست و چگونه در بیو اینستاگرام قرار می‌گیرد؟',
    a: 'به محض ثبت‌نام در نوبتهاب، یک آدرس اختصاصی به صورت nobathub.ir/book/اسم_کسب_و_کار به شما اختصاص می‌یابد. می‌توانید این لینک را در بیو اینستاگرام، پیامک، کانال تلگرام و کارت ویزیت قرار دهید تا مشتریان بدون نیاز به تماس تلفنی نوبت خود را رزرو کنند.'
  },
  {
    q: 'احراز هویت پیامکی (OTP) و ارسال پیامک خدماتی چگونه عمل می‌کند؟',
    a: 'مشتری هنگام ثبت رزرو، کد ۴ رقمی پیامکی دریافت می‌کند تا از ثبت رزروهای فیک جلوگیری شود. تمامی پیامک‌های تایید، یادآوری و لغو نوبت از خطوط خدماتی ویژه ارسال شده و از بلک‌لیست تبلیغاتی (۸۰۰*) عبور می‌کنند.'
  },
  {
    q: 'پنل مدیریت کسب‌وکار چه امکاناتی دارد؟',
    a: 'در پنل مدیریت (/manage/اسم_کسب_و_کار)، می‌توانید تقویم روزانه و هفتگی نوبت‌ها را ببینید، ساعات کاری و استراحت را تغییر دهید، خدمات و قیمت‌ها را تعریف کرده و سوابق مراجعین (CRM) را مدیریت کنید.'
  },
  {
    q: 'قابلیت نصب اپلیکیشن PWA چگونه است؟',
    a: 'بدون نیاز به دانلود از سیب‌اپ یا بازار، هم شما و هم مشتریان می‌توانید با یک کلیک آیکون نوبتهاب را روی صفحه اصلی گوشی (آیفون یا اندروید) و کامپیوتر نصب و فوراً دسترسی پیدا کنید.'
  }
];
