import React from 'react';
import { Calendar, Phone } from 'lucide-react';

interface FooterProps {
  onOpenRegister: () => void;
  onOpenBookingDemo: () => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenRegister,
  onOpenBookingDemo,
  onOpenTerms,
  onOpenPrivacy,
}) => {
  return (
    <footer className="bg-white text-slate-600 py-12 border-t border-slate-200 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand info */}
          <div className="md:col-span-1 space-y-3">
            <a href="/" className="inline-block">
              <img 
                src="/assets/aistudio/file_00000000f45881f4a9e3edab83e2c9ed_6daab086.png" 
                alt="نوبتهاب NobatHub" 
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </a>
            <p className="text-xs text-slate-500 leading-relaxed">
              پلتفرم رزرو آنلاین و اتوماسیون نوبت‌دهی با لینک اختصاصی (/book)، پنل مدیریت تقویم و مراجعین (/manage)، پیامک خودکار OTP و اپلیکیشن PWA.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-[#111111] mb-3 text-xs uppercase tracking-wider text-[#FF6A00]">دسترسی سریع</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenBookingDemo} className="hover:text-[#FF6A00] transition-colors cursor-pointer text-right">
                  صفحه نمونه رزرو آنلاین مشتری (/book)
                </button>
              </li>
              <li>
                <button onClick={onOpenRegister} className="hover:text-[#FF6A00] transition-colors cursor-pointer text-right">
                  ثبت‌نام و ساخت لینک اختصاصی
                </button>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#FF6A00] transition-colors">
                  تعرفه‌ها و طرح‌های نوبتهاب
                </a>
              </li>
            </ul>
          </div>

          {/* Legal and Rules */}
          <div>
            <h4 className="font-bold text-[#111111] mb-3 text-xs uppercase tracking-wider text-[#FF6A00]">قوانین و حریم خصوصی</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="hover:text-[#FF6A00] transition-colors cursor-pointer text-right font-medium"
                >
                  قوانین و شرایط استفاده
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="hover:text-[#FF6A00] transition-colors cursor-pointer text-right font-medium"
                >
                  سیاست حریم خصوصی
                </button>
              </li>
              <li className="text-slate-400 text-[11px] pt-1 leading-relaxed">
                • عدم دریافت بیعانه اجباری
                <br />
                • امنیت داده‌ها و عدم افشای شماره تلفن‌ها
              </li>
            </ul>
          </div>

          {/* Direct Support */}
          <div>
            <h4 className="font-bold text-[#111111] mb-3 text-xs uppercase tracking-wider text-[#FF6A00]">پشتیبانی نوبتهاب</h4>
            <p className="text-xs text-slate-500 mb-3">
              پاسخگویی سریع توسط تیم پشتیبانی نوبتهاب:
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#111111] text-xs font-mono font-bold shadow-xs">
              <Phone className="w-4 h-4 text-[#FF6A00]" />
              <span>پشتیبانی آنلاین نوبتهاب</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} نوبتهاب (NobatHub). کلیه حقوق مادی و معنوی محفوظ است.
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenTerms}
              className="hover:text-[#FF6A00] underline underline-offset-4 cursor-pointer"
            >
              قوانین
            </button>
            <span>•</span>
            <button
              onClick={onOpenPrivacy}
              className="hover:text-[#FF6A00] underline underline-offset-4 cursor-pointer"
            >
              حریم خصوصی
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
