import React, { useState } from 'react';
import { Check, Gift } from 'lucide-react';

interface PricingProps {
  onOpenRegister: () => void;
}

export const PricingSection: React.FC<PricingProps> = ({ onOpenRegister }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const plans = [
    {
      id: 'free',
      name: 'هدیه راه‌اندازی (ثبت‌نام آنلاین)',
      description: 'برای تمام کسب‌وکارهای جدید جهت تجربه کامل امکانات',
      price: '۰ تومان',
      period: '۶۰ روز کامل (۲ ماه)',
      isGift: true,
      popular: false,
      buttonText: 'شروع رایگان نوبتهاب',
      features: [
        '۶۰ روز دسترسی کامل به پنل نوبت‌دهی',
        'ثبت نامحدود مراجعین و نوبت‌ها',
        'ارسال کد اعتبارپذیری پیامکی OTP',
        'عبور از بلک‌لیست پیامکی تبلیغاتی (۸۰۰*)',
        'لینک اختصاصی رزرو (/book/اسم_کسب_و_کار)',
        'قابلیت نصب اپلیکیشن PWA روی گوشی',
        'دفترچه مراجعین و مدیریت تقویم (CRM)',
      ],
    },
    {
      id: 'standard',
      name: 'طرح سالن‌ها و مطب‌ها',
      description: 'مناسب برای سالن‌های زیبایی، کلینیک‌ها و دفاتر مشاوره',
      price: billingCycle === 'annual' ? '۲۸۰,۰۰۰' : '۳۵۰,۰۰۰',
      period: 'تومان / در ماه',
      isGift: false,
      popular: true,
      buttonText: 'انتخاب طرح استاندارد',
      features: [
        'تمام امکانات طرح راه‌اندازی',
        'تعریف پرسنل و متخصصین مستقل',
        'تنظیم ساعات کاری و زمان استراحت',
        'امکان لغو یا تغییر نوبت توسط مشتری',
        'ارسال پیامک با نام تجاری کسب‌وکار',
        'گزارش‌گیری مراجعین و تاریخچه نوبت‌ها',
        'پشتیبانی اولویت‌دار اختصاصی',
      ],
    },
    {
      id: 'enterprise',
      name: 'طرح کلینیک‌های بزرگ و VIP',
      description: 'برای مراکز پرتردد، چند شعبه‌ای و کلینیک‌های دندانپزشکی',
      price: billingCycle === 'annual' ? '۴۵۰,۰۰۰' : '۵۵۰,۰۰۰',
      period: 'تومان / در ماه',
      isGift: false,
      popular: false,
      buttonText: 'سفارش طرح VIP',
      features: [
        'تمام امکانات طرح استاندارد',
        'تعداد پرسنل و لاین‌های خدماتی نامحدود',
        'مدیریت چند شعبه‌ای در یک پنل',
        'اتصال به پنل پیامکی اختصاصی',
        'پشتیبانی ۲۴ ساعته اختصاصی',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-[#FAFAFC] border-b border-slate-200/80 relative overflow-hidden haikei-bg-blob">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-light border border-slate-200 text-[#FF6A00] text-xs font-bold mb-3 shadow-sm">
            <Gift className="w-3.5 h-3.5" />
            <span>تعرفه‌های شفاف و هدیه راه‌اندازی</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#111111] tracking-tight">
            شروع ۱۰۰٪ رایگان؛ بدون ریسک و هزینه اولیه
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            ابتدا ۲ ماه رایگان تست کنید و صفحه رزرو اختصاصی کسب‌وکار خود را فعال سازید.
          </p>

          {/* Billing switcher */}
          <div className="mt-6 inline-flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                billingCycle === 'annual'
                  ? 'bg-[#FF6A00] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              پرداخت سالانه (۲۰٪ تخفیف)
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-[#FF6A00] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              پرداخت ماهانه
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-7 flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'border-2 border-[#FF6A00] bg-white shadow-xl shadow-[#FF6A00]/10 relative'
                  : plan.isGift
                  ? 'border border-slate-200 bg-white shadow-sm relative'
                  : 'border border-slate-200 bg-white/80 shadow-xs'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 right-6 px-3.5 py-1 bg-[#FF6A00] text-white text-xs font-black rounded-full shadow-md">
                  پیشنهاد اکثر سالن‌ها و کلینیک‌ها
                </div>
              )}
              {plan.isGift && (
                <div className="absolute -top-3.5 right-6 px-3.5 py-1 bg-[#111111] text-white text-xs font-black rounded-full shadow-md flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5 text-[#FF6A00]" />
                  <span>هدیه راه‌اندازی آنلاین</span>
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-[#111111]">{plan.name}</h3>
                <p className="text-xs text-slate-500 mt-1 min-h-[36px]">{plan.description}</p>

                <div className="mt-6 mb-6 pb-6 border-b border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-[#111111] tabular-persian">
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-500">{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    امکانات این طرح:
                  </div>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <Check className="w-4 h-4 text-[#FF6A00] shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={onOpenRegister}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all shadow-md cursor-pointer ${
                    plan.popular
                      ? 'bg-gradient-orange hover:bg-gradient-orange-hover text-white shadow-[#FF6A00]/25'
                      : 'bg-[#111111] hover:bg-slate-800 text-white'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
