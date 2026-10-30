import React, { useState } from 'react';
import { ShieldCheck, FileText, X, CheckCircle2, Lock, AlertCircle, Info } from 'lucide-react';

interface TermsAndPrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'terms' | 'privacy';
}

export const TermsAndPrivacyModal: React.FC<TermsAndPrivacyModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'terms',
}) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden my-8 max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-slate-900 text-white relative border-b border-slate-800 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-6 left-6 text-slate-400 hover:text-white bg-slate-800/80 p-2 rounded-full transition-colors cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4 mb-4">
            <img 
              src="/assets/aistudio/file_00000000f45881f4a9e3edab83e2c9ed_6daab086.png" 
              alt="نوبتهاب NobatHub" 
              className="h-10 sm:h-12 w-auto object-contain bg-white/10 p-1.5 rounded-xl border border-white/20"
            />
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                قوانین، شرایط استفاده و حریم خصوصی نوبتهاب
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                آخرین بروزرسانی: جلالئی (شمسی) - مطابق با آخرین استانداردهای حقوقی و امنیتی
              </p>
            </div>
          </div>

          {/* Tab buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setActiveTab('terms')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'terms'
                  ? 'bg-[#FF6A00] text-white shadow-lg shadow-[#FF6A00]/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>قوانین و شرایط استفاده</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('privacy')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'privacy'
                  ? 'bg-[#FF6A00] text-white shadow-lg shadow-[#FF6A00]/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>سیاست حریم خصوصی</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-slate-700 text-xs sm:text-sm leading-relaxed grow">
          
          {activeTab === 'terms' ? (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Warm Welcome & Appreciation Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#FF6A00]/10 via-amber-50 to-orange-50 border border-[#FF6A00]/20 flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#FF6A00] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-extrabold text-[#111111] text-sm sm:text-base">
                    با تشکر فراوان بابت انتخاب و اعتماد شما به نوبتهاب
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    با قدردانی از حسن انتخاب شما در پیوستن به خانواده بزرگ کسب‌وکارهای نوبتهاب، قوانین زیر صرفاً جهت تضمین کیفیت ارائه خدمات، ارتقای نظم، حفظ حقوق طرفین و ایجاد حس آرامش و امنیت برای تمامی صاحبان مشاغل و مراجعین محترم تدوین شده است.
                  </p>
                </div>
              </div>

              {/* Easy & Friendly Terms First */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-base font-extrabold text-[#111111] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#FF6A00] text-white text-xs font-bold flex items-center justify-center">۱</span>
                  تسهیل رزرو آنلاین و شفافیت (عدم دریافت بیعانه اجباری)
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  نوبتهاب برای رزرو آنلاین مراجعین هیچ‌گونه کارمزد یا بیعانه اجباری دریافت نمی‌کند. مراجعین محترم می‌توانند به راحتی سانس‌های خالی واقعی را مشاهده و انتخاب کرده و در صورت انصراف، حداقل ۳ ساعت قبل نوبت خود را آنلاین مدیریت یا لغو فرمایند.
                </p>
              </div>

              <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-base font-extrabold text-[#111111] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#FF6A00] text-white text-xs font-bold flex items-center justify-center">۲</span>
                  احترام متقابل و نظم در زمان‌بندی
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  کسب‌وکارهای محترم موظفند ساعات حضور پرسنل و خدمات را به‌روز نگه دارند تا مراجعین بدون معطلی خدمات دریافت کنند. همچنین مراجعین گرامی با دریافت پیامک تایید OTP، تعهد اخلاقی به حضور به موقع در محل کسب‌وکار خواهند داشت.
                </p>
              </div>

              <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-base font-extrabold text-[#111111] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#FF6A00] text-white text-xs font-bold flex items-center justify-center">۳</span>
                  پشتیبانی فعال و همراهی در تمام مراحل
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  تیم پشتیبانی نوبتهاب همواره آماده پاسخگویی، راهنمایی و حل ابهامات فنی یا ساختاری شماست تا فرآیند نوبت‌دهی آنلاین به ساده‌ترین و لذت‌بخش‌ترین حالت ممکن اجرا گردد.
                </p>
              </div>

              {/* Standard Legal & Security Rules */}
              <div className="border-t border-slate-200 pt-6 space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">مقررات حقوقی و انضباطی پلتفرم:</h4>

                {/* Section 4: Disclaimer of Liability */}
                <div className="space-y-2">
                  <h3 className="text-sm font-extrabold text-[#111111] flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center">۴</span>
                    سلب مسئولیت پلتفرم (زیرساخت نرم‌افزاری)
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    پلتفرم نوبت‌هاب صرفاً ارائه‌دهنده زیرساخت نرم‌افزاری و سیستم نوبت‌دهی آنلاین است. نوبت‌هاب هیچ‌گونه مسئولیتی در قبال کیفیت ارائه خدمات، خروجی مشاوره، درمان، خدمات زیبایی یا تخصصی، تسویه‌حساب‌های مالی مستقیم خارج از سامانه، و رفتارهای فردی کسب‌وکارها و مراجعین ندارد.
                  </p>
                </div>

                {/* Section 5: Platform Arbitrator */}
                <div className="space-y-2">
                  <h3 className="text-sm font-extrabold text-[#111111] flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center">۵</span>
                    داوری و مرجع نهایی حل اختلاف
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    مرجع نهایی، قاطع و انحصاری رسیدگی به تمامی شکایت‌ها، گزارش‌های تخلف، عدم رعایت حقوق مراجعین و اختلافات میان کسب‌وکارها و مراجعین، مدیریت پلتفرم نوبت‌هاب می‌باشد. رأی و تصمیم مدیریت پلتفرم قطعی، نهایی، غیرقابل اعتراض و برای طرفین لازم‌الاجرا خواهد بود.
                  </p>
                </div>

                {/* Section 6: Monthly Terms Review Obligation */}
                <div className="space-y-2">
                  <h3 className="text-sm font-extrabold text-[#111111] flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center">۶</span>
                    به‌روزرسانی قوانین و مسئولیت پیگیری اول هر ماه شمسی
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    قوانین و مقررات نوبت‌هاب بر اساس تغییرات فنی و قانونی به‌طور دوره‌ای به روز می‌شود. تمامی کاربران و کسب‌وکارها موظف و متعهد هستند در <strong className="text-slate-900 font-bold">اول هر ماه شمسی</strong> قوانین و شرایط استفاده را مجدداً بررسی و مطالعه نمایند. ادامه استفاده از خدمات پلتفرم در هر زمان به منزله آگاهی کامل و پذیرش بی‌قیدوشرط آخرین نسخه قوانین است.
                  </p>
                </div>

                {/* Section 7: Unilateral Termination */}
                <div className="space-y-2">
                  <h3 className="text-sm font-extrabold text-[#111111] flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center">۷</span>
                    قطع یک‌طرفه همکاری در صورت بروز تخلف یا تقلب
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    در صورت بروز هرگونه تخلف، تقلب، ارائه اطلاعات نادرست، رفتار نادرست با مراجعین، نقض قوانین یا گزارش‌های مستند، مدیریت پلتفرم نوبت‌هاب این حق را برای خود محفوظ می‌دارد که بدون نیاز به اخطار قبلی یا تشریفات قضایی، ارائه خدمات، صفحه رزرو اختصاصی (<code className="bg-slate-100 px-1 py-0.5 rounded text-[#FF6A00]">/book/...</code>) و پنل مدیریت متخلف را به صورت <strong className="text-rose-600 font-bold">یک‌طرفه و فوری</strong> مسدود و قطع نماید.
                  </p>
                </div>

                {/* Section 8: Prohibited Businesses */}
                <div className="space-y-2">
                  <h3 className="text-sm font-extrabold text-[#111111] flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center">۸</span>
                    فهرست مشاغل ممنوعه
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    ثبت‌نام و استفاده از خدمات نوبت‌هاب برای فعالیت‌های غیرقانونی، ارائه خدمات جنسی، ماساژهای غیرمجاز، فال‌گیری و رمالی، فروش کالاهای ممنوعه و هرگونه کسب‌وکاری که مغایر با قوانین کشوری و عمومی باشد اکیداً ممنوع است. در صورت ثبت چنین عناوینی، حساب کاربری بلافاصله مسدود شده و موضوع به مراجع ذی‌صلاح منعکس خواهد شد.
                  </p>
                </div>

                {/* Section 9: Anti-Abuse Policy */}
                <div className="space-y-2">
                  <h3 className="text-sm font-extrabold text-[#111111] flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center">۹</span>
                    قانون سوءاستفاده از پلتفرم و حملات سایبری
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    هرگونه تلاش برای استخراج انبوه داده‌ها (Scraping)، نفوذ به سرورها یا کدهای پلتفرم، ثبت نوبت‌های جعلی و اسپم، ایجاد اختلال در روند خدمت‌رسانی به سایر کاربران، فشار غیرعادی به زیرساخت‌ها یا مهندسی معکوس کدهای نوبت‌هاب ممنوع بوده و موجب پیگرد قضایی و حقوقی خواهد شد.
                  </p>
                </div>
              </div>

              {/* Section 7: General Business Responsibilities */}
              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-[#111111] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#FF6A00]/10 text-[#FF6A00] text-xs font-bold flex items-center justify-center">۷</span>
                  تعهدات عمومی کسب‌وکارها و مراجعین
                </h3>
                <ul className="space-y-2.5 text-slate-600 list-disc list-inside pr-2">
                  <li>کسب‌وکارها موظفند جدول زمان‌بندی، لیست خدمات و قیمت‌ها را به‌روز نگه داشته و نوبت‌های ثبت‌شده توسط مراجعین را محترم شمارند.</li>
                  <li>مراجعین با ثبت شماره همراه و دریافت کد یک‌بار مصرف OTP اصالت هویت خود را تایید کرده و در صورت انصراف موظف به لغو نوبت حداقل ۳ ساعت قبل می‌باشند.</li>
                  <li>ارسال پیامک‌های اطلاع‌رسانی صرفاً جهت یادآوری نوبت و تایید ثبت رزرو بوده و فاقد هرگونه پیامک تبلیغاتی می‌باشد.</li>
                </ul>
              </div>

            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Highlight Box: Security */}
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-4">
                <Lock className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-emerald-900 text-sm">
                    تضمین امنیت داده‌ها و حریم شخصی
                  </h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    اطلاعات شماره همراه مراجعین و تاریخچه رزروها تنها جهت ارتقای کیفیت خدمت‌رسانی و ارسال یادآوری نوبت استفاده شده و تحت هیچ شرایطی در اختیار اشخاص ثالث یا سامانه‌های تبلیغاتی قرار نخواهد گرفت.
                  </p>
                </div>
              </div>

              {/* Section 1 */}
              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-[#111111] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#FF6A00]" />
                  اطلاعات جمع‌آوری‌شده
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  هنگام ثبت‌نام کسب‌وکار یا ثبت نوبت توسط مراجع، تنها اطلاعات ضروری شامل نام، شماره تلفن همراه و نوع خدمت رزروشده دریافت می‌شود. این داده‌ها برای ایجاد تقویم کاری کسب‌وکار و ارسال پیامک‌های تایید و یادآوری ضروری هستند.
                </p>
              </div>

              {/* Section 2 */}
              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-[#111111] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#FF6A00]" />
                  محرمانگی شماره‌های مراجعین
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  شماره تماس مراجعین تنها برای مدیریت مجموعه مربوطه جهت هماهنگی نوبت‌ها قابل مشاهده است. نوبتهاب متعهد می‌شود که هیچ‌گونه تحلیل دیموگرافیک غیرمجاز یا فروش بانک‌های اطلاعاتی انجام ندهد.
                </p>
              </div>

              {/* Section 3 */}
              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-[#111111] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#FF6A00]" />
                  حفاظت فنی و رمزنگاری
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  زیرساخت سرورهای نوبتهاب از پروتکل‌های رمزنگاری پیشرفته (SSL/TLS) و سیستم‌های پشتیبان‌گیری منظم استفاده می‌کند تا سلامت و پایداری اطلاعات تضمین گردد.
                </p>
              </div>

              {/* Section 4 */}
              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-[#111111] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#FF6A00]" />
                  حقوق کاربران
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  هر کاربر یا کسب‌وکار در هر زمان حق درخواست ویرایش اطلاعات یا پاک‌سازی سوابق نوبت‌های قبلی خود را دارا می‌باشد.
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500 font-medium">
            با استفاده از نوبتهاب، مفاد فوق مورد تایید کاربر می‌باشد.
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#FF6A00] hover:bg-[#e05d00] text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-md"
          >
            متوجه شدم و قبول دارم
          </button>
        </div>

      </div>
    </div>
  );
};
