import React, { useState, useEffect } from 'react';
import { X, Gift, RefreshCw, ShieldCheck, CheckCircle2, Smartphone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Business, BusinessCategory } from '../types';
import { toPersianDigits, gregorianToJalali } from '../utils/jalali';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (business: Business) => void;
}

const CATEGORIES: BusinessCategory[] = [
  'سالن زیبایی و آرایشگاه',
  'کلینیک و مطب پزشکی',
  'دفاتر وکالت و مشاوره حقوقی',
  'مرکز مشاوره و روانشناسی',
  'باشگاه ورزشی، ماساژ و اسپا',
  'سایر خدمات حضوری'
];

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onRegisterSuccess }) => {
  const [businessName, setBusinessName] = useState('');
  const [managerName, setManagerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('تهران');
  const [category, setCategory] = useState<BusinessCategory>('سالن زیبایی و آرایشگاه');
  const [password, setPassword] = useState('');

  // Math Captcha state
  const [num1, setNum1] = useState(4);
  const [num2, setNum2] = useState(7);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Generate random math captcha
  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 8) + 2;
    const n2 = Math.floor(Math.random() * 9) + 1;
    setNum1(n1);
    setNum2(n2);
    setCaptchaInput('');
    setCaptchaError(false);
  };

  useEffect(() => {
    if (isOpen) {
      generateCaptcha();
      setSubmittedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCaptchaError(false);

    // Validate math captcha
    const expected = num1 + num2;
    const userAns = parseInt(captchaInput.trim(), 10);
    if (isNaN(userAns) || userAns !== expected) {
      setCaptchaError(true);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmittedSuccess(true);

      // Trigger celebratory confetti in Lumora Orange theme
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6A00', '#FF8C38', '#FFFFFF']
      });

      const today = new Date();
      const [jy, jm, jd] = gregorianToJalali(today.getFullYear(), today.getMonth() + 1, today.getDate());
      const jalaliStr = `${toPersianDigits(jy)}/${toPersianDigits(jm < 10 ? '0' + jm : jm)}/${toPersianDigits(jd < 10 ? '0' + jd : jd)}`;

      const slug = businessName.trim().replace(/\s+/g, '_').toLowerCase();

      const newBiz: Business = {
        id: `biz-${Date.now()}`,
        slug: slug || 'my_business',
        name: businessName,
        category,
        managerName,
        phone,
        city,
        createdAtJalali: jalaliStr,
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
            title: 'خدمت نمونه اول',
            durationMinutes: 45,
            price: 500000,
            specialist: managerName,
            category: 'اصلی'
          }
        ],
        customers: []
      };

      onRegisterSuccess(newBiz);
    }, 650);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="bg-white text-[#111111] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 text-slate-400 hover:text-slate-700 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FF6A00]/10 border border-[#FF6A00]/30 text-[#FF6A00] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-black text-[#111111]">
              ثبت‌نام با موفقیت انجام شد!
            </h3>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed text-right space-y-1">
              <div>📍 <strong>لینک رزرو اختصاصی شما آماده شد:</strong></div>
              <div className="font-mono text-[#FF6A00] dir-ltr text-left font-bold text-sm">
                nobathub.ir/book/{businessName.trim().replace(/\s+/g, '_')}
              </div>
              <div className="pt-2 text-slate-600 text-xs">
                همچنین پنل مدیریت شما به آدرس <span className="font-mono text-[#111111] dir-ltr inline-block font-bold">/manage/{businessName.trim().replace(/\s+/g, '_')}</span> فعال شد.
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 px-4 bg-gradient-orange hover:bg-gradient-orange-hover text-white font-extrabold text-sm rounded-xl transition-all cursor-pointer shadow-md shadow-[#FF6A00]/25"
            >
              ورود به سامانه
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src="/assets/aistudio/file_00000000f45881f4a9e3edab83e2c9ed_6daab086.png" 
                  alt="نوبتهاب NobatHub" 
                  className="h-9 sm:h-10 w-auto object-contain"
                />
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6A00]/10 text-[#FF6A00] border border-[#FF6A00]/20 text-xs font-bold">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>راه‌اندازی آنلاین صفحه رزرو در ۳ دقیقه</span>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#111111]">
                ثبت‌نام کسب‌وکار در نوبتهاب
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                اطلاعات سالن، مطب، دفتر وکالت یا مرکز خود را وارد کنید تا صفحه رزرو اختصاصی فعال گردد.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    نام کسب‌وکار / سالن / مطب *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="مثال: سالن زیبایی ویونا"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-[#111111] focus:outline-none focus:border-[#FF6A00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    نام و نام‌خانوادگی مدیر *
                  </label>
                  <input
                    type="text"
                    required
                    value={managerName}
                    onChange={(e) => setManagerName(e.target.value)}
                    placeholder="مثال: خانم علیزاده"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-[#111111] focus:outline-none focus:border-[#FF6A00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    دسته‌بندی فعالیت *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as BusinessCategory)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-[#111111] focus:outline-none focus:border-[#FF6A00]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-white text-[#111111]">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    شهر محل فعالیت *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="مثال: تهران، اصفهان..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-[#111111] focus:outline-none focus:border-[#FF6A00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  شماره موبایل جهت ارسال OTP پیامکی *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09121234567"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-[#111111] font-mono text-left dir-ltr focus:outline-none focus:border-[#FF6A00]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  رمز عبور ورود به پنل *
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="حداقل ۶ کاراکتر"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-[#111111] focus:outline-none focus:border-[#FF6A00]"
                />
              </div>

              {/* Anti-Spam Math Captcha */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>کپچای ریاضی ضداسپم:</span>
                  </div>
                  <button
                    type="button"
                    onClick={generateCaptcha}
                    className="text-xs text-[#FF6A00] hover:underline flex items-center gap-1 cursor-pointer font-bold"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>سوال جدید</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl font-mono font-bold text-[#FF6A00] text-sm tracking-widest shadow-xs">
                    {num1} + {num2} = ؟
                  </div>
                  <input
                    type="number"
                    required
                    value={captchaInput}
                    onChange={(e) => {
                      setCaptchaInput(e.target.value);
                      setCaptchaError(false);
                    }}
                    placeholder="پاسخ را بنویسید"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl font-mono text-center text-[#111111] focus:outline-none focus:border-[#FF6A00]"
                  />
                </div>
                {captchaError && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">
                    پاسخ ریاضی نادرست است!
                  </p>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-gradient-orange hover:bg-gradient-orange-hover text-white font-extrabold text-sm rounded-xl shadow-md shadow-[#FF6A00]/25 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75"
              >
                {loading ? (
                  <span>در حال فعال‌سازی صفحه رزرو...</span>
                ) : (
                  <>
                    <Gift className="w-4 h-4 text-white" />
                    <span>تکمیل ثبت‌نام و ساخت لینک رزرو اختصاصی</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
