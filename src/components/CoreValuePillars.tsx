import React from 'react';
import { Globe, LayoutDashboard, MessageSquareText, Smartphone, ArrowLeft, Check, Sparkles, Scale } from 'lucide-react';

import beautyPhoto from '../assets/images/beauty_salon_interior_1793336984044.jpg';
import clinicPhoto from '../assets/images/medical_clinic_room_1793336983887.jpg';
import psychologyPhoto from '../assets/images/psychology_counseling_room_1793336983765.jpg';
import massagePhoto from '../assets/images/massage_spa_room_1793336996824.jpg';
import lawOfficePhoto from '../assets/images/law_office_photo_1793338901246.jpg';

interface CoreValuePillarsProps {
  onOpenBookingPage: () => void;
  onOpenManagePanel: () => void;
  onOpenRegister: () => void;
}

export const CoreValuePillars: React.FC<CoreValuePillarsProps> = ({
  onOpenBookingPage,
  onOpenManagePanel,
  onOpenRegister,
}) => {
  return (
    <section id="features" className="py-24 bg-[#FAFAFC] border-b border-slate-200/80 relative overflow-hidden haikei-bg-blob">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-[#FF6A00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 text-[#FF6A00] text-xs font-bold mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#FF6A00]" />
            <span>ارزش‌های ملموس نوبتهاب برای کسب‌وکار شما</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight leading-tight">
            تمام آنچه یک کسب‌وکار خدماتی برای اتوماسیون نوبت‌دهی نیاز دارد
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            امکانات کاربردی برای سالن‌های زیبایی، مطب‌ها، دفاتر وکالت، کلینیک‌ها و مراکز مشاوره همراه با تصاویر واقعی محیط‌ها
          </p>
        </div>

        {/* 4 Core Value Cards Grid - Dynamic Asymmetric Organic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Pillar 1: Dedicated Booking Link */}
          <div className="relative bg-white/80 backdrop-blur-xl p-7 sm:p-9 rounded-[2.5rem] rounded-tr-[1.2rem] border border-white/90 shadow-[0_15px_45px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(255,106,0,0.12)] transition-all duration-500 flex flex-col justify-between overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6A00]/15 to-transparent rounded-bl-[3rem] pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-13 h-13 rounded-2xl bg-[#FF6A00] text-white flex items-center justify-center shadow-lg shadow-[#FF6A00]/25 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-[#FF6A00] bg-[#FF6A00]/10 px-3.5 py-1.5 rounded-full border border-[#FF6A00]/20 font-bold shadow-sm">
                  /book/اسم_کسب_و_کار
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#111111] mb-4">
                ۱. لینک و صفحه اختصاصی رزرو مشتریان
              </h3>

              {/* Photo Thumbnail */}
              <div className="relative h-48 rounded-[1.8rem] overflow-hidden mb-5 border border-white/80 shadow-md">
                <img
                  src={beautyPhoto}
                  alt="صفحه رزرو مشتریان"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-4">
                  <span className="text-[11px] text-white font-extrabold bg-[#FF6A00] px-3 py-1 rounded-full shadow-md">
                    نمونه صفحه رزرو آنلاین سالن زیبایی
                  </span>
                  <span className="text-xs text-white/90 font-mono">
                    nobathub.ir/book/viona_salon
                  </span>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full bg-[#FF6A00]/10 text-[#FF6A00] shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>صفحه اختصاصی رزرو آنلاین:</strong> درج آسان در بیو اینستاگرام، تلگرام، پیامک و کارت ویزیت</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full bg-[#FF6A00]/10 text-[#FF6A00] shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>انتخاب سرویس و متخصص:</strong> نمایش لیست خدمات، قیمت‌ها، زمان مورد نیاز و پرسنل</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full bg-[#FF6A00]/10 text-[#FF6A00] shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>تقویم و زمان‌بندی هوشمند:</strong> مشاهده فقط سانس‌ها و ساعت‌های خالی واقعی</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full bg-[#FF6A00]/10 text-[#FF6A00] shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>پیگیری آنلاین بدون تماس:</strong> دریافت کد پیگیری اختصاصی و پیگیری وضعیت آنلاین</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={onOpenBookingPage}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#FF6A00] hover:text-[#111111] transition-colors cursor-pointer group/btn"
              >
                <span>مشاهده نمونه صفحه رزرو مشتری</span>
                <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Pillar 2: Business Management Panel */}
          <div className="relative bg-white/80 backdrop-blur-xl p-7 sm:p-9 rounded-[2.5rem] rounded-tl-[1.2rem] border border-white/90 shadow-[0_15px_45px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.12)] transition-all duration-500 flex flex-col justify-between overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/15 to-transparent rounded-bl-[3rem] pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-13 h-13 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/25 group-hover:scale-110 transition-transform duration-300">
                  <LayoutDashboard className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 font-bold shadow-sm">
                  /manage/اسم_کسب_و_کار
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#111111] mb-4">
                ۲. پنل مدیریت اختصاصی کسب‌وکار
              </h3>

              {/* Photo Thumbnail */}
              <div className="relative h-48 rounded-[1.8rem] overflow-hidden mb-5 border border-white/80 shadow-md">
                <img
                  src={clinicPhoto}
                  alt="پنل مدیریت کسب و کار"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-4">
                  <span className="text-[11px] text-white font-extrabold bg-emerald-600 px-3 py-1 rounded-full shadow-md">
                    مدیریت تقویم و مطب پزشکان
                  </span>
                  <span className="text-xs text-white/90 font-mono">
                    nobathub.ir/manage/clinic
                  </span>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-600 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>مدیریت تقویم و نوبت‌ها:</strong> تایید/رد، تغییر وضعیت و افزودن دستی نوبت‌های تلفنی/حضوری</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-600 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>تنظیم ساعات کاری و استراحت:</strong> تعریف ساعات فعالیت روزانه، استراحت و روزهای تعطیل</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-600 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>دفترچه مشتریان (CRM پایه):</strong> ثبت سوابق مراجعین، شماره تماس و تاریخچه رزروها</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-600 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>تعریف خدمات و پرسنل:</strong> مدیریت کامل عنوان خدمات، زمان‌بندی و تخصیص متخصصین</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={onOpenManagePanel}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-emerald-600 hover:text-[#111111] transition-colors cursor-pointer group/btn"
              >
                <span>مشاهده نمونه پنل مدیریت کسب‌وکار</span>
                <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Pillar 3: Smart SMS Notifications & Law Office Integration */}
          <div className="relative bg-white/80 backdrop-blur-xl p-7 sm:p-9 rounded-[2.5rem] rounded-bl-[1.2rem] border border-white/90 shadow-[0_15px_45px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.12)] transition-all duration-500 flex flex-col justify-between overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/15 to-transparent rounded-bl-[3rem] pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-13 h-13 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/25 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquareText className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-indigo-700 bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-200 font-bold shadow-sm">
                  پیامک خدماتی + کد OTP
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#111111] mb-4">
                ۳. سیستم اطلاع‌رسانی و یادآوری هوشمند پیامکی
              </h3>

              {/* Photo Thumbnail */}
              <div className="relative h-48 rounded-[1.8rem] overflow-hidden mb-5 border border-white/80 shadow-md">
                <img
                  src={lawOfficePhoto}
                  alt="سیستم پیامکی دفتر وکالت"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-4">
                  <span className="text-[11px] text-white font-extrabold bg-indigo-600 px-3 py-1 rounded-full shadow-md">
                    ارسال پیامک تایید زمان حضور در دفتر وکالت
                  </span>
                  <span className="text-xs text-white/90 font-mono">
                    عبور از بلک‌لیست (۸۰۰*)
                  </span>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full bg-indigo-500/10 text-indigo-600 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>کد اعتبارسنجی OTP:</strong> احراز هویت شماره تلفن مشتری جهت جلوگیری از رزرو فیک</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full bg-indigo-500/10 text-indigo-600 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>پیامک فوری به مدیر:</strong> اطلاع‌رسانی آنی به وکیل، پزشک یا مدیر سالن هنگام ثبت نوبت</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full bg-indigo-500/10 text-indigo-600 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>عبور از بلک‌لیست تبلیغاتی (۸۰۰*):</strong> ارسال پیامک تایید و لوکیشن دفتر از خطوط خدماتی</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="text-indigo-600 font-bold">★ تضمین ۱۰۰٪ تحویل پیامک از سرشماره‌های خدماتی</span>
            </div>
          </div>

          {/* Pillar 4: Quick Setup & PWA App */}
          <div className="relative bg-white/80 backdrop-blur-xl p-7 sm:p-9 rounded-[2.5rem] rounded-br-[1.2rem] border border-white/90 shadow-[0_15px_45px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(245,158,11,0.12)] transition-all duration-500 flex flex-col justify-between overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/15 to-transparent rounded-bl-[3rem] pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-13 h-13 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:scale-110 transition-transform duration-300">
                  <Smartphone className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-amber-700 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200 font-bold shadow-sm">
                  اپلیکیشن PWA
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#111111] mb-4">
                ۴. راه‌اندازی سریع و اپلیکیشن PWA
              </h3>

              {/* Photo Thumbnail */}
              <div className="relative h-48 rounded-[1.8rem] overflow-hidden mb-5 border border-white/80 shadow-md">
                <img
                  src={massagePhoto}
                  alt="اپلیکیشن PWA"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-4">
                  <span className="text-[11px] text-white font-extrabold bg-amber-600 px-3 py-1 rounded-full shadow-md">
                    نصب سریع روی گوشی و دسکتاپ
                  </span>
                  <span className="text-xs text-white/90 font-mono">
                    بدون نیاز به مارکت‌ها
                  </span>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full bg-amber-500/10 text-amber-600 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>راه‌اندازی آنلاین خودکار:</strong> فعال‌سازی صفحه رزرو در چند دقیقه بدون دانش فنی</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full bg-amber-500/10 text-amber-600 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>نصب مستقیم PWA:</strong> افزودن آیکون نوبتهاب به صفحه اصلی گوشی (اندروید و آیفون) و کامپیوتر</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full bg-amber-500/10 text-amber-600 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>دسترسی سریع و آسان:</strong> بدون نیاز به دانلود از بازار، سیب‌اپ یا گوگل‌پلی</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={onOpenRegister}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-amber-600 hover:text-[#111111] transition-colors cursor-pointer group/btn"
              >
                <span>شروع ثبت‌نام آنلاین نوبتهاب</span>
                <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
