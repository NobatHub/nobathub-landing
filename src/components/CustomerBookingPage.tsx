import React, { useState } from 'react';
import { Calendar as CalendarIcon, Check, Send, ShieldCheck, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Business, ServiceItem } from '../types';
import { formatCurrency, formatJalaliDate, toPersianDigits } from '../utils/jalali';

interface CustomerBookingPageProps {
  business: Business;
  onBackToHome: () => void;
}

export const CustomerBookingPage: React.FC<CustomerBookingPageProps> = ({ business, onBackToHome }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem>(business.services[0]);
  const [selectedDateOffset, setSelectedDateOffset] = useState<number>(0);
  const [selectedSlot, setSelectedSlot] = useState<string>('۱۰:۳۰ صبح');
  
  // Form State
  const [customerName, setCustomerName] = useState<string>('پریسا مهدوی');
  const [customerPhone, setCustomerPhone] = useState<string>('09330055720');
  const [step, setStep] = useState<'details' | 'otp' | 'confirmed'>('details');
  const [otpInput, setOtpInput] = useState<string>('');
  const [otpCode] = useState<string>('8492');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [trackingCode, setTrackingCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Generate next 5 Jalali days
  const upcomingDays = Array.from({ length: 5 }).map((_, idx) => {
    const d = new Date();
    d.setDate(d.getDate() + idx);
    return {
      offset: idx,
      label: idx === 0 ? 'امروز' : idx === 1 ? 'فردا' : `پس‌فردا (+${toPersianDigits(idx)})`,
      formatted: formatJalaliDate(d, false),
      dateObj: d,
    };
  });

  const timeSlots = [
    '۰۹:۰۰ صبح',
    '۱۰:۳۰ صبح',
    '۱۲:۰۰ ظهر',
    '۱۵:۳۰ عصر',
    '۱۷:۰۰ عصر',
  ];

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput.trim() !== otpCode) {
      setOtpError(true);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const code = `NH-${Math.floor(10000 + Math.random() * 90000)}`;
      setTrackingCode(code);
      setLoading(false);
      setStep('confirmed');
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#111111] py-8 px-4 sm:px-6 lg:px-8 font-sans haikei-bg-blob" dir="rtl">
      
      {/* Top Banner URL Mock Bar */}
      <div className="max-w-4xl mx-auto mb-6 p-3 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between text-xs text-slate-700">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-[#FF6A00] font-mono text-xs mr-2">nobathub.ir/book/{business.slug}</span>
        </div>
        <button
          onClick={onBackToHome}
          className="text-slate-500 hover:text-[#111111] flex items-center gap-1 cursor-pointer font-bold"
        >
          <span>بازگشت به صفحه اصلی</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto glass-panel-light rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm">
        
        {/* Business Header */}
        <div className="bg-white p-6 sm:p-8 border-b border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/aistudio/file_00000000f45881f4a9e3edab83e2c9ed_6daab086.png" 
                alt="نوبتهاب NobatHub" 
                className="h-8 sm:h-9 w-auto object-contain"
              />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6A00]/10 text-[#FF6A00] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>صفحه اختصاصی رزرو نوبت آنلاین</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">{business.name}</h1>
            <p className="text-xs sm:text-sm text-slate-500">
              {business.category} · مدیریت: {business.managerName} · {business.city}
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">
            <div className="text-[#FF6A00] font-bold">ساعات کاری مجاز:</div>
            <div>{business.settings.startTime} الی {business.settings.endTime}</div>
            <div className="text-slate-500 text-[11px]">زمان استراحت: {business.settings.breakStartTime} الی {business.settings.breakEndTime}</div>
          </div>
        </div>

        {/* Step Flow Content */}
        <div className="p-6 sm:p-8">
          
          {step === 'details' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Form Controls (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Select Service */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    ۱. انتخاب خدمت و متخصص
                  </label>
                  <div className="space-y-2.5">
                    {business.services.map((srv) => {
                      const isSelected = selectedService.id === srv.id;
                      return (
                        <div
                          key={srv.id}
                          onClick={() => setSelectedService(srv)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'border-[#FF6A00] bg-[#FF6A00]/10 ring-1 ring-[#FF6A00]/30 shadow-sm'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div>
                            <div className="font-bold text-sm text-[#111111]">{srv.title}</div>
                            <div className="text-xs text-slate-500 mt-0.5">
                              متخصص: {srv.specialist} · زمان مورد نیاز: {srv.durationMinutes} دقیقه
                            </div>
                          </div>
                          <div className="text-left font-bold text-sm text-[#FF6A00] tabular-persian">
                            {formatCurrency(srv.price)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Select Jalali Date */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    ۲. انتخاب تاریخ شمسی (سانس‌های واقعی)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {upcomingDays.map((day) => {
                      const isSelected = selectedDateOffset === day.offset;
                      return (
                        <button
                          key={day.offset}
                          type="button"
                          onClick={() => setSelectedDateOffset(day.offset)}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#FF6A00] bg-[#FF6A00] text-white font-bold shadow-md'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className={`text-[11px] ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>{day.label}</div>
                          <div className="text-xs font-bold mt-1 tabular-persian">
                            {day.formatted}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Select Time Slot */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    ۳. ساعت خالی نوبت
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {timeSlots.map((slot) => {
                      const isSelected = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer tabular-persian ${
                            isSelected
                              ? 'bg-[#111111] text-white border-[#111111] shadow-md'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Column: Customer Info & OTP Trigger (5 cols) */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-sm">
                <div>
                  <h3 className="text-base font-bold text-[#111111] mb-4 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-[#FF6A00]" />
                    <span>اطلاعات مراجع و دریافت کد OTP</span>
                  </h3>

                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        نام و نام‌خانوادگی مراجع *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-[#111111] focus:outline-none focus:border-[#FF6A00]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        شماره موبایل جهت دریافت کد OTP *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-[#111111] font-mono text-left dir-ltr focus:outline-none focus:border-[#FF6A00]"
                      />
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                      <div className="flex justify-between font-bold text-[#111111]">
                        <span>هزینه خدمت:</span>
                        <span className="text-[#FF6A00] tabular-persian">{formatCurrency(selectedService.price)}</span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        پرداخت نهایی هنگام حضور در مرکز انجام می‌شود.
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-4 bg-gradient-orange hover:bg-gradient-orange-hover text-white font-extrabold text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-[#FF6A00]/25"
                    >
                      {loading ? (
                        <span>در حال ارسال پیامک OTP...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>دریافت کد اعتبارپذیری OTP پیامکی</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                <div className="mt-4 text-center text-[11px] text-slate-500">
                  ★ ارسال پیامک OTP از خطوط خدماتی بدون بلاک تبلیغاتی (۸۰۰*) انجام می‌شود.
                </div>
              </div>

            </div>
          )}

          {/* Step 2: OTP Verification Screen */}
          {step === 'otp' && (
            <div className="max-w-md mx-auto py-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#FF6A00]/10 border border-[#FF6A00]/30 text-[#FF6A00] flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-extrabold text-[#111111] mb-2">
                تایید شماره تلفن و احراز هویت (OTP)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                کد تایید ۴ رقمی پیامک شده به شماره <span className="font-mono text-[#111111] dir-ltr inline-block font-bold">{customerPhone}</span> را وارد کنید:
              </p>

              {/* Simulated SMS Alert Box */}
              <div className="mb-6 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-right space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-800">
                  <Send className="w-3.5 h-3.5 text-[#FF6A00]" />
                  <span>پیامک خدماتی شبیه‌سازی‌شده نوبتهاب:</span>
                </div>
                <div>کد تایید اعتبارپذیری شما برای {business.name}: <strong className="font-mono text-[#FF6A00] text-sm">{otpCode}</strong></div>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <input
                  type="text"
                  maxLength={4}
                  required
                  value={otpInput}
                  onChange={(e) => {
                    setOtpInput(e.target.value);
                    setOtpError(false);
                  }}
                  placeholder="کد ۴ رقمی"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[#111111] font-mono text-center text-lg tracking-widest focus:outline-none focus:border-[#FF6A00]"
                />

                {otpError && (
                  <p className="text-xs text-rose-600 font-medium">
                    کد وارد شده نادرست است! لطفاً کد {otpCode} را وارد کنید.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 bg-gradient-orange hover:bg-gradient-orange-hover text-white font-extrabold text-sm rounded-xl transition-all cursor-pointer shadow-md shadow-[#FF6A00]/25"
                >
                  {loading ? 'در حال ثبت رزرو قطعی...' : 'تایید کد و ثبت نوبت'}
                </button>
              </form>
            </div>
          )}

          {/* Step 3: Confirmed Screen with Tracking Code */}
          {step === 'confirmed' && (
            <div className="max-w-md mx-auto py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h3 className="text-2xl font-black text-[#111111]">
                نوبت شما با موفقیت ثبت شد!
              </h3>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 text-right space-y-2.5 text-xs sm:text-sm shadow-sm">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">کد پیگیری اختصاصی:</span>
                  <span className="font-mono font-bold text-[#FF6A00] text-sm">{trackingCode}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">کسب‌وکار:</span>
                  <span className="font-bold text-[#111111]">{business.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">خدمت و متخصص:</span>
                  <span className="font-bold text-[#111111]">{selectedService.title} ({selectedService.specialist})</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-slate-500">تاریخ و ساعت:</span>
                  <span className="font-bold text-[#FF6A00] tabular-persian">
                    {upcomingDays[selectedDateOffset]?.formatted} - {selectedSlot}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs text-right">
                ✓ پیامک تایید و کد پیگیری آنلاین از خط خدماتی بدون بلاک تبلیغاتی به شماره {customerPhone} ارسال گردید. همچنین پیامک هشدار آنی برای مدیر ارسال شد.
              </div>

              <button
                onClick={onBackToHome}
                className="w-full py-3.5 px-4 bg-[#111111] hover:bg-slate-800 text-white font-bold text-sm rounded-xl cursor-pointer"
              >
                بازگشت به صفحه اصلی نوبتهاب
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
