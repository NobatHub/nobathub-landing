import React from 'react';
import { ArrowLeft, CheckCircle2, Gift, Globe, Sparkles, Scale, Stethoscope, Scissors } from 'lucide-react';
import { HeroInteractivePreview } from './HeroInteractivePreview';

interface HeroSectionProps {
  onOpenRegister: () => void;
  onScrollToFeatures: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenRegister,
  onScrollToFeatures,
}) => {
  return (
    <section className="relative pt-8 pb-20 overflow-hidden haikei-bg-blob">
      
      {/* Decorative Organic Ambient Glow Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[42rem] h-[22rem] bg-gradient-to-tr from-[#FF6A00]/15 via-orange-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 -right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-60 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Announcement Organic Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 text-xs text-slate-800 shadow-[0_10px_30px_rgba(255,106,0,0.08)]">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#FF6A00] animate-pulse" />
            <span className="font-extrabold text-[#FF6A00]">راه‌اندازی آنلاین صفحه رزرو:</span>
            <span className="font-medium text-slate-700">ویژه سالن‌های زیبایی، کلینیک‌ها، دفاتر وکالت، مطب‌ها و مشاوره</span>
          </div>
        </div>

        {/* Main Headline & Value Proposition */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#111111] tracking-tight leading-[1.2] text-balance">
            سامانه هوشمند رزرو آنلاین{' '}
            <span className="text-gradient-orange inline-block">
              نوبتهاب
            </span>{' '}
            برای مدیریت آسان نوبت‌ها
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            لینک رزرو اختصاصی برای بیو اینستاگرام، پنل مدیریت نوبت‌ها و مراجعین، ارسال پیامک خودکار OTP و اپلیکیشن نصب‌شدنی PWA بدون نیاز به دانلود برنامه.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenRegister}
              type="button"
              className="inline-flex items-center gap-2.5 px-8 py-4 text-sm font-black text-white bg-gradient-orange hover:bg-gradient-orange-hover rounded-[1.8rem] shadow-xl shadow-[#FF6A00]/25 hover:shadow-[#FF6A00]/40 transition-all duration-300 cursor-pointer active:scale-95 hover:-translate-y-0.5"
            >
              <Gift className="w-5 h-5 text-white" />
              <span>ساخت رایگان صفحه رزرو</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={onScrollToFeatures}
              type="button"
              className="inline-flex items-center gap-2.5 px-7 py-4 text-sm font-bold text-slate-800 hover:text-[#FF6A00] bg-white/80 backdrop-blur-xl hover:bg-white rounded-[1.8rem] transition-all duration-300 cursor-pointer border border-white/90 shadow-md hover:shadow-lg"
            >
              <Globe className="w-4 h-4 text-[#FF6A00]" />
              <span>بررسی ۴ ارزش اصلی نوبتهاب</span>
            </button>
          </div>

          {/* Quick Trust Checks */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-slate-700 font-semibold">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/60 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#FF6A00]" />
              <span>لینک رزرو اختصاصی (/book/اسم_کسب_و_کار)</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/60 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#FF6A00]" />
              <span>احراز هویت پیامکی OTP از خطوط خدماتی</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/60 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#FF6A00]" />
              <span>بدون خدمات بیعانه و پیچیدگی مالی</span>
            </div>
          </div>
        </div>

        {/* Dynamic Category Badges Floating Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-xs font-bold text-slate-700 shadow-sm">
            <Scissors className="w-3.5 h-3.5 text-[#FF6A00]" />
            <span>سالن زیبایی</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-xs font-bold text-slate-700 shadow-sm">
            <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
            <span>کلینیک و مطب</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-xs font-bold text-slate-700 shadow-sm">
            <Scale className="w-3.5 h-3.5 text-indigo-600" />
            <span>دفتر وکالت</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-xs font-bold text-slate-700 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>مرکز مشاوره</span>
          </div>
        </div>

        {/* Live Interactive Product Preview Container */}
        <div className="mt-4 max-w-5xl mx-auto relative">
          <HeroInteractivePreview />
        </div>

      </div>
    </section>
  );
};
