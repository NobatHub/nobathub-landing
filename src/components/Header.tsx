import React from 'react';
import { Calendar, Gift, ShieldCheck, UserCheck } from 'lucide-react';

interface HeaderProps {
  onOpenRegister: () => void;
  onOpenDashboard: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenRegister,
  onOpenDashboard,
  onOpenAdmin,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark with Official Brand Logo Asset */}
        <a href="/" className="flex items-center gap-3 whitespace-nowrap shrink-0 group">
          <img 
            src="/assets/aistudio/file_00000000f45881f4a9e3edab83e2c9ed_6daab086.png" 
            alt="نوبتهاب - NobatHub" 
            className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </a>

        {/* Zone 2: RTL Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
          <a
            href="#features"
            className="hover:text-[#FF6A00] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            امکانات و ارزش‌ها
          </a>
          <a
            href="#categories"
            className="hover:text-[#FF6A00] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            دسته‌بندی اصناف
          </a>
          <a
            href="#pricing"
            className="hover:text-[#FF6A00] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            تعرفه‌ها
          </a>
          <a
            href="#faq"
            className="hover:text-[#FF6A00] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            سوالات متداول
          </a>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenDashboard}
            type="button"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:text-[#FF6A00] bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <UserCheck className="w-4 h-4 text-[#FF6A00]" />
            <span>داشبورد کسب‌وکار</span>
          </button>

          <button
            onClick={onOpenAdmin}
            type="button"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 bg-transparent hover:bg-slate-100 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer"
            title="پنل مدیریت"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>پنل مدیریت</span>
          </button>

          <button
            onClick={onOpenRegister}
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold text-white bg-gradient-orange hover:bg-gradient-orange-hover rounded-xl shadow-md shadow-[#FF6A00]/25 transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer active:scale-95"
          >
            <Gift className="w-4 h-4 text-white" />
            <span>ثبت‌نام و راه اندازی</span>
          </button>
        </div>

      </div>
    </header>
  );
};
