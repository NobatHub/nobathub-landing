import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  User,
  Check,
  Send,
  Smartphone,
  ShieldCheck,
  Plus,
  Bell,
  Sliders,
  ExternalLink,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  Search,
  Building2,
  Stethoscope,
  Scissors,
  Scale,
  X,
  Lock
} from 'lucide-react';

export const HeroInteractivePreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'customer' | 'dashboard' | 'sms'>('customer');
  
  // Interactive Customer Booking State
  const [selectedCategory, setSelectedCategory] = useState<'clinic' | 'salon' | 'law'>('clinic');
  const [selectedService, setSelectedService] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string>('16:30');
  const [phone, setPhone] = useState<string>('09330055720');
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);
  const [otpInput, setOtpInput] = useState<string>('');
  const [otpCode] = useState<string>('8492');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [trackingCode, setTrackingCode] = useState<string>('');

  // Interactive Dashboard State
  const [appointments, setAppointments] = useState([
    { id: 'NH-9041', name: 'مریم کمالی', service: 'مشاوره تغذیه', time: '۱۰:۳۰ امروز', status: 'confirmed', phone: '0912***1234' },
    { id: 'NH-9042', name: 'امیرحسین رضایی', service: 'چکاپ عمومی', time: '۱۱:۴۵ امروز', status: 'pending', phone: '0919***5678' },
    { id: 'NH-9043', name: 'سارا احمدی', service: 'مشاوره تخصصی', time: '۱۶:۳۰ امروز', status: 'confirmed', phone: '0935***8901' },
    { id: 'NH-9044', name: 'کامران حسینی', service: 'بررسی مدارک', time: '۱۸:۰۰ امروز', status: 'completed', phone: '0912***4321' },
  ]);

  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed'>('all');

  // Sample data by business category
  const categoryData = {
    clinic: {
      name: 'مطب دکتر علوی - متخصص داخلی',
      url: 'nobathub.ir/book/dr_alavi',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80',
      badge: 'پزشک متخصص',
      icon: Stethoscope,
      services: [
        { id: 1, name: 'ویزیت و معاینه تخصصی', duration: '۳۰ دقیقه', price: '۳۵۰,۰۰۰ تومان' },
        { id: 2, name: 'چکاپ و بررسی آزمایشات', duration: '۲۰ دقیقه', price: '۲۵۰,۰۰۰ تومان' },
        { id: 3, name: 'مشاوره آنلاین آنی', duration: '۱۵ دقیقه', price: '۲۰۰,۰۰۰ تومان' },
      ]
    },
    salon: {
      name: 'سالن زیبایی و آرایشی ویونا',
      url: 'nobathub.ir/book/viona_beauty',
      avatar: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=150&q=80',
      badge: 'سالن VIP',
      icon: Scissors,
      services: [
        { id: 1, name: 'اصلاح و کوتاهی تخصصی مو', duration: '۴۵ دقیقه', price: '۴۰۰,۰۰۰ تومان' },
        { id: 2, name: 'میکاپ و گریم همراه', duration: '۹۰ دقیقه', price: '۱,۲۰۰,۰۰۰ تومان' },
        { id: 3, name: 'پاکسازی تخصصی پوست', duration: '۶۰ دقیقه', price: '۷۵۰,۰۰۰ تومان' },
      ]
    },
    law: {
      name: 'دفتر وکالت و مشاوره حقوقی دادگر',
      url: 'nobathub.ir/book/dadgar_law',
      avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=150&q=80',
      badge: 'وکیل پایه یک دادگستری',
      icon: Scale,
      services: [
        { id: 1, name: 'مشاوره حقوقی حضوری', duration: '۴۵ دقیقه', price: '۶۰۰,۰۰۰ تومان' },
        { id: 2, name: 'بررسی و تنظیم قراردادها', duration: '۶۰ دقیقه', price: '۹۰۰,۰۰۰ تومان' },
        { id: 3, name: 'مشاوره تلفنی سریع', duration: '۲۰ دقیقه', price: '۳۵۰,۰۰۰ تومان' },
      ]
    }
  };

  const currentCategory = categoryData[selectedCategory];

  const days = [
    { day: 'امروز', date: '۱۰ اسفند' },
    { day: 'فردا', date: '۱۱ اسفند' },
    { day: 'شنبه', date: '۱۲ اسفند' },
    { day: 'یکشنبه', date: '۱۳ اسفند' },
  ];

  const times = ['۱۰:۰۰', '۱۱:۳۰', '۱۶:۰۰', '۱۶:۳۰', '۱۷:۱۵', '۱۸:۰۰'];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setOtpInput('');
    setOtpError(false);
    setShowOtpModal(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCode = otpInput.trim() || otpCode;
    if (finalCode !== otpCode && finalCode.length < 4) {
      setOtpError(true);
      return;
    }
    const code = 'NH-' + Math.floor(1000 + Math.random() * 9000);
    setTrackingCode(code);
    setShowOtpModal(false);
    setBookingSuccess(true);
  };

  const toggleAppointmentStatus = (id: string) => {
    setAppointments(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextStatus = item.status === 'pending' ? 'confirmed' : 'completed';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  return (
    <div className="w-full bg-white/95 backdrop-blur-2xl rounded-3xl border border-slate-200/80 shadow-[0_20px_60px_rgba(17,17,17,0.07)] overflow-hidden">
      
      {/* Top Browser / Control Bar */}
      <div className="bg-slate-900 text-white px-4 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 ml-3">
            <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block" />
          </div>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">پیش‌نمایش زنده سیستم نوبتهاب</span>
        </div>

        {/* Interactive Mode Switcher Tabs */}
        <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700/60 text-xs font-bold">
          <button
            onClick={() => setActiveTab('customer')}
            type="button"
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'customer'
                ? 'bg-[#FF6A00] text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>صفحه رزرو مشتری</span>
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            type="button"
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-[#FF6A00] text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>پنل مدیریت کسب‌وکار</span>
          </button>

          <button
            onClick={() => setActiveTab('sms')}
            type="button"
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'sms'
                ? 'bg-[#FF6A00] text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>ارسال پیامک OTP</span>
          </button>
        </div>

        {/* Status indicator */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>آماده پذیرش نوبت</span>
        </div>
      </div>

      {/* Main Interactive Workspace Area */}
      <div className="p-4 sm:p-6 lg:p-8 bg-slate-50/50">
        
        {/* TAB 1: CUSTOMER BOOKING VIEW */}
        {activeTab === 'customer' && (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200/90 shadow-lg overflow-hidden">
            
            {/* Simulated Business URL Header Bar */}
            <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2 font-mono dir-ltr bg-white px-3 py-1 rounded-md border border-slate-200 text-slate-800 font-semibold w-full sm:w-auto overflow-hidden text-ellipsis">
                <ExternalLink className="w-3.5 h-3.5 text-[#FF6A00] shrink-0" />
                <span>https://{currentCategory.url}</span>
              </div>
              <span className="hidden sm:inline-block text-emerald-700 bg-emerald-100 font-bold px-2.5 py-0.5 rounded-full text-[11px]">
                ثبت رزرو ۲۴ ساعته
              </span>
            </div>

            {/* Category Selector Pills inside Mockup */}
            <div className="p-4 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold text-slate-600">انتخاب نمونه کسب‌وکار:</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => { setSelectedCategory('clinic'); setBookingSuccess(false); }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === 'clinic'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  🏥 مطب و کلینیک
                </button>
                <button
                  onClick={() => { setSelectedCategory('salon'); setBookingSuccess(false); }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === 'salon'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  💅 سالن زیبایی
                </button>
                <button
                  onClick={() => { setSelectedCategory('law'); setBookingSuccess(false); }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === 'law'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  ⚖️ دفتر وکالت
                </button>
              </div>
            </div>

            {/* Business Hero Banner */}
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-gradient-to-r from-orange-50/40 via-white to-slate-50">
              <img
                src={currentCategory.avatar}
                alt={currentCategory.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#FF6A00]/30 shadow-md shrink-0"
              />
              <div className="text-center sm:text-right flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <h3 className="font-extrabold text-slate-900 text-base">{currentCategory.name}</h3>
                  <span className="bg-[#FF6A00]/10 text-[#FF6A00] text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border border-[#FF6A00]/20">
                    {currentCategory.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  سامانه رزرو آنلاین هوشمند نوبتهاب · بدون نیاز به تماس تلفنی و بدون بیعانه اجباری
                </p>
              </div>
            </div>

            {/* Booking Form steps */}
            {bookingSuccess ? (
              <div className="p-8 text-center bg-emerald-50/60 animate-fade-in">
                <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h4 className="text-xl font-black text-emerald-950 mb-1">نوبت شما با موفقیت ثبت شد!</h4>
                <p className="text-xs text-emerald-800 mb-4">
                  پیامک تایید حاوی کد پیگیری به شماره <span className="font-bold dir-ltr inline-block">{phone}</span> ارسال گردید.
                </p>

                <div className="inline-block bg-white border border-emerald-200 rounded-2xl p-4 text-right shadow-sm max-w-sm w-full mb-6">
                  <div className="flex justify-between items-center text-xs text-slate-500 mb-2 pb-2 border-b border-slate-100">
                    <span>کد پیگیری اختصاصی:</span>
                    <span className="font-mono font-black text-[#FF6A00] text-sm dir-ltr">{trackingCode}</span>
                  </div>
                  <div className="text-xs text-slate-700 space-y-1.5 font-medium">
                    <p>📍 مرکز: <span className="font-bold text-slate-900">{currentCategory.name}</span></p>
                    <p>🕒 زمان: <span className="font-bold text-slate-900">{days[selectedDay].day} ({days[selectedDay].date}) ساعت {selectedTime}</span></p>
                    <p>✨ خدمت: <span className="font-bold text-slate-900">{currentCategory.services.find(s => s.id === selectedService)?.name}</span></p>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => setBookingSuccess(false)}
                    className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    ثبت نوبت جدید (تست مجدد)
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-5 space-y-5">
                
                {/* Step 1: Service Selection */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-800 mb-2">
                    ۱. انتخاب نوع خدمت:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {currentCategory.services.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setSelectedService(service.id)}
                        className={`p-3 rounded-xl border text-right transition-all cursor-pointer relative ${
                          selectedService === service.id
                            ? 'border-[#FF6A00] bg-orange-50/60 ring-2 ring-[#FF6A00]/20 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="font-bold text-xs text-slate-900 mb-1">{service.name}</div>
                        <div className="text-[11px] text-slate-500 flex justify-between items-center mt-2">
                          <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] text-slate-600">{service.duration}</span>
                          <span className="font-bold text-[#FF6A00]">{service.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Day Selection */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-800 mb-2">
                    ۲. انتخاب روز رزرو:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {days.map((d, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedDay(index)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedDay === index
                            ? 'border-[#FF6A00] bg-[#FF6A00] text-white shadow-md'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="font-bold text-xs">{d.day}</div>
                        <div className={`text-[10px] ${selectedDay === index ? 'text-white/80' : 'text-slate-400'}`}>{d.date}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Time Slot Selection */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-800 mb-2">
                    ۳. سانس‌های خالی مجاز:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {times.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTime(t)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          selectedTime === t
                            ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 4: Customer Phone & Submit */}
                <form onSubmit={handleBooking} className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                  <div className="w-full sm:flex-1 relative">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="شماره موبایل (جهت ارسال کد پیامک)"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] text-right dir-ltr"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-gradient-orange hover:bg-gradient-orange-hover text-white rounded-xl text-xs font-black shadow-lg shadow-[#FF6A00]/20 transition-all cursor-pointer active:scale-95 whitespace-nowrap"
                  >
                    تایید و دریافت پیامک نوبت
                  </button>
                </form>

              </div>
            )}

            <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 text-center text-[11px] text-slate-500">
              ⚡ این یک پیش‌نمایش کاملاً تعاملی است. دکمه‌ها و فرم بالا را کلیک کنید تا تجربه مشتری را ببینید.
            </div>

            {/* Interactive OTP Verification Pop-Up Modal */}
            {showOtpModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" dir="rtl">
                <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative overflow-hidden animate-scale-up">
                  
                  {/* Close button */}
                  <button
                    type="button"
                    onClick={() => setShowOtpModal(false)}
                    className="absolute top-4 left-4 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Simulated Floating Incoming SMS Banner */}
                  <div className="bg-slate-900 text-white p-3.5 rounded-2xl mb-5 shadow-lg border border-slate-800 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#FF6A00]/20 text-[#FF6A00] flex items-center justify-center shrink-0 font-bold">
                        📩
                      </div>
                      <div>
                        <div className="font-extrabold text-[#FF6A00] flex items-center gap-1.5">
                          <span>پیامک دریافت شد</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        </div>
                        <div className="text-[11px] text-slate-300">
                          کد احراز هویت شما: <span className="font-mono font-black text-amber-300 text-sm px-1.5 py-0.5 rounded bg-slate-800 dir-ltr inline-block">{otpCode}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setOtpInput(otpCode);
                        setOtpError(false);
                      }}
                      className="bg-[#FF6A00] hover:bg-orange-600 text-white font-extrabold px-3 py-1.5 rounded-xl text-[11px] transition-all cursor-pointer whitespace-nowrap shadow-sm active:scale-95 shrink-0"
                    >
                      جاگذاری {otpCode}
                    </button>
                  </div>

                  {/* Modal Header */}
                  <div className="text-center mb-5">
                    <div className="w-12 h-12 bg-[#FF6A00]/10 text-[#FF6A00] rounded-2xl flex items-center justify-center mx-auto mb-3 border border-[#FF6A00]/20">
                      <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <h3 className="font-black text-slate-900 text-base sm:text-lg mb-1">کد احراز هویت پیامکی را وارد کنید</h3>
                    <p className="text-xs text-slate-500">
                      کد تایید ۴ رقمی پیامک‌شده به شماره <span className="font-bold text-slate-900 font-mono dir-ltr inline-block">{phone}</span> را وارد کنید.
                    </p>
                  </div>

                  {/* OTP Code Input Form */}
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        maxLength={4}
                        value={otpInput}
                        onChange={(e) => {
                          setOtpInput(e.target.value);
                          setOtpError(false);
                        }}
                        placeholder="----"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-center text-2xl font-mono font-black tracking-[0.5em] text-slate-900 focus:outline-none focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/20"
                        autoFocus
                      />
                      {otpError && (
                        <p className="text-[11px] text-rose-600 font-extrabold mt-1.5 text-center">
                          کد واردشده نادرست است. کد شبیه‌سازی‌شده: {otpCode}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                      <span className="flex items-center gap-1 font-semibold text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-[#FF6A00]" />
                        ۰۱:۵۹ تا امکان ارسال مجدد
                      </span>
                      <span className="text-emerald-700 font-extrabold bg-emerald-100/80 px-2 py-0.5 rounded-md text-[10px]">
                        خط خدماتی 800*
                      </span>
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-gradient-orange hover:bg-gradient-orange-hover text-white rounded-xl text-xs font-black shadow-lg shadow-[#FF6A00]/25 transition-all cursor-pointer active:scale-95"
                      >
                        تایید کد و نهایی‌سازی رزرو
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowOtpModal(false)}
                        className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                      >
                        انصراف
                      </button>
                    </div>
                  </form>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-center text-[10px] text-slate-400">
                    سامانه هوشمند جلوگیری از رزروهای فیک و ثبت‌نام‌های نامعتبر نوبتهاب
                  </div>

                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: BUSINESS MANAGER DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="max-w-4xl mx-auto space-y-4">
            
            {/* KPI Cards Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                <span className="text-[11px] font-bold text-slate-500 block mb-1">نوبت‌های امروز</span>
                <span className="text-2xl font-black text-slate-900 font-mono">۱۲ نوبت</span>
                <span className="text-[10px] text-emerald-600 block mt-1 font-semibold">۴ نوبت تاییدشده</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                <span className="text-[11px] font-bold text-slate-500 block mb-1">در انتظار تایید</span>
                <span className="text-2xl font-black text-amber-600 font-mono">۲ نوبت</span>
                <span className="text-[10px] text-amber-600 block mt-1 font-semibold">نیازمند بررسی</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                <span className="text-[11px] font-bold text-slate-500 block mb-1">پیامک‌های ارسال‌شده</span>
                <span className="text-2xl font-black text-[#FF6A00] font-mono">۴۸ پیامک</span>
                <span className="text-[10px] text-slate-500 block mt-1 font-semibold">ارسال آنی OTP</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                <span className="text-[11px] font-bold text-slate-500 block mb-1">وضعیت پذیرش</span>
                <span className="text-xl font-black text-emerald-600 block mt-1">فعال و آنلاین</span>
                <span className="text-[10px] text-slate-500 block mt-1 font-semibold">ساعات کاری: ۹ الی ۲۰</span>
              </div>
            </div>

            {/* Manage Appointments Table */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-slate-900">لیست رزروهای مدیریت نوبتهاب</h4>
                  <span className="bg-slate-200 text-slate-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    {appointments.length} رزرو فعال
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFilterStatus('all')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      filterStatus === 'all' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    همه
                  </button>
                  <button
                    onClick={() => setFilterStatus('pending')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      filterStatus === 'pending' ? 'bg-amber-500 text-white' : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    در انتظار
                  </button>
                  <button
                    onClick={() => setFilterStatus('confirmed')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      filterStatus === 'confirmed' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    تاییدشده
                  </button>
                </div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-slate-100">
                {appointments
                  .filter(a => filterStatus === 'all' || a.status === filterStatus)
                  .map((item) => (
                    <div key={item.id} className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#FF6A00]/10 text-[#FF6A00] flex items-center justify-center font-bold text-xs shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-slate-900">{item.name}</span>
                            <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded dir-ltr">{item.id}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-3">
                            <span>خدمت: {item.service}</span>
                            <span>•</span>
                            <span className="font-medium text-slate-700">{item.time}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                          item.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                          item.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {item.status === 'confirmed' ? '✓ تاییدشده' : item.status === 'pending' ? '⏳ در انتظار تایید' : 'تکمیل‌شده'}
                        </span>

                        <button
                          onClick={() => toggleAppointmentStatus(item.id)}
                          className="px-3 py-1 bg-white border border-slate-200 hover:border-[#FF6A00] text-slate-800 hover:text-[#FF6A00] rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs"
                        >
                          تغییر وضعیت
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-600">
                <span>امکان افزودن نوبت حضوری/تلفنی به صورت دستی فراهم است.</span>
                <span className="font-bold text-[#FF6A00] cursor-pointer hover:underline flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> افزودن نوبت جدید
                </span>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: AUTOMATED SMS OTP SIMULATION */}
        {activeTab === 'sms' && (
          <div className="max-w-md mx-auto bg-slate-900 rounded-3xl p-4 sm:p-6 text-white shadow-2xl border border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#FF6A00]" />
                <span className="font-bold text-xs">سیستم پیامکی هوشمند نوبتهاب</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                خط خدماتی (عبور از بلک‌لیست)
              </span>
            </div>

            {/* Simulated SMS Thread */}
            <div className="space-y-3">
              {/* Message 1: OTP */}
              <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-3.5 text-xs text-slate-200 space-y-1">
                <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-slate-700/50 pb-1 mb-1">
                  <span className="font-extrabold text-[#FF6A00]">کد تایید نوبتهاب (OTP)</span>
                  <span>آنلاین</span>
                </div>
                <p>کد تایید ورود به صفحه رزرو: <span className="font-mono font-bold text-white text-sm bg-slate-900 px-2 py-0.5 rounded dir-ltr inline-block">8492</span></p>
                <p className="text-[10px] text-slate-400">لغو ارسال با پاسخ OFF</p>
              </div>

              {/* Message 2: Booking Confirmation */}
              <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-3.5 text-xs text-slate-200 space-y-1">
                <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-slate-700/50 pb-1 mb-1">
                  <span className="font-extrabold text-emerald-400">تایید ثبت نوبت جدید</span>
                  <span>هم‌اکنون</span>
                </div>
                <p className="font-bold text-white">مشتری گرامی، نوبت شما ثبت شد.</p>
                <p>مرکز: مطب دکتر علوی</p>
                <p>زمان: شنبه ۱۲ اسفند ساعت ۱۶:۳۰</p>
                <p>کد پیگیری: <span className="font-mono text-[#FF6A00] font-bold">NH-9043</span></p>
              </div>

              {/* Message 3: Business Alert */}
              <div className="bg-[#FF6A00]/10 border border-[#FF6A00]/30 rounded-2xl p-3.5 text-xs text-orange-200 space-y-1">
                <div className="flex justify-between items-center text-[10px] text-[#FF6A00] border-b border-[#FF6A00]/20 pb-1 mb-1">
                  <span className="font-extrabold">اطلاع‌رسانی به مدیر کسب‌وکار</span>
                  <span>خودکار</span>
                </div>
                <p className="font-bold text-white">نوبت جدید ثبت شد!</p>
                <p>مشتری: سارا احمدی (0933***5720)</p>
                <p>خدمت: مشاوره تخصصی - ساعت ۱۶:۳۰</p>
              </div>
            </div>

            <div className="mt-5 text-center text-[11px] text-slate-400">
              ارسال پیامک‌ها حتی برای شماره‌های مسدود تبلیغاتی (بلک‌لیست) با بالاترین تحویل‌دهی انجام می‌شود.
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
