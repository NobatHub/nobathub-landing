import React, { Suspense, useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { Sparkles, Box, RefreshCw } from 'lucide-react';

interface Spline3DModelProps {
  sceneUrl?: string;
  fallbackType?: 'calendar' | 'beauty' | 'clinic' | 'psychology' | 'massage' | 'dashboard';
  title?: string;
  height?: string;
}

export const Spline3DModel: React.FC<Spline3DModelProps> = ({
  sceneUrl,
  fallbackType = 'calendar',
  title = 'المان سه‌بعدی تعاملی',
  height = 'h-64 sm:h-80',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative w-full ${height} rounded-2xl glass-panel overflow-hidden border border-[#FF6A00]/20 flex items-center justify-center group`}>
      
      {/* Loading Placeholder */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#111111]/80 backdrop-blur-md text-slate-300 gap-2">
          <RefreshCw className="w-6 h-6 text-[#FF6A00] animate-spin" />
          <span className="text-xs font-semibold">در حال بارگذاری مدل سه‌بعدی زنده...</span>
        </div>
      )}

      {/* Spline Live Scene rendering or High-Performance Native 3D Graphic */}
      {sceneUrl && !hasError ? (
        <Suspense
          fallback={
            <div className="flex items-center justify-center text-xs text-slate-400">
              در حال آماده‌سازی صحنه سه‌بعدی...
            </div>
          }
        >
          <Spline
            scene={sceneUrl}
            onLoad={() => setIsLoading(false)}
            onError={() => setHasError(true)}
            className="w-full h-full"
          />
        </Suspense>
      ) : (
        /* Fallback Interactive Category 3D Visual Element */
        <InteractiveCategory3DVisual type={fallbackType} onLoad={() => setIsLoading(false)} />
      )}

      {/* Badge Overlay */}
      <div className="absolute bottom-3 right-3 z-10 pointer-events-none bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[11px] text-slate-300 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-[#FF6A00]" />
        <span>{title}</span>
      </div>
    </div>
  );
};

/* High-Performance Category & Feature 3D Interactive Visual Canvas */
interface CategoryVisualProps {
  type: 'calendar' | 'beauty' | 'clinic' | 'psychology' | 'massage' | 'dashboard';
  onLoad: () => void;
}

const InteractiveCategory3DVisual: React.FC<CategoryVisualProps> = ({ type, onLoad }) => {
  useEffect(() => {
    onLoad();
  }, [onLoad]);

  const getVisualConfig = () => {
    switch (type) {
      case 'beauty':
        return {
          icon: '✨ 💇‍♀️',
          gradient: 'from-[#FF6A00]/20 via-[#FF8C38]/10 to-transparent',
          label: 'مدل سه‌بعدی سالن زیبایی و استایل',
          desc: 'مدیریت تداخل لاین‌های رنگ، میکاپ و ناخن با زمان‌بندی دقیق',
          symbol: '3D Styling Hub',
        };
      case 'clinic':
        return {
          icon: '🩺 🛡️',
          gradient: 'from-emerald-500/20 via-[#FF6A00]/10 to-transparent',
          label: 'مدل سه‌بعدی کلینیک و مطب پزشکان',
          desc: 'کنترل فواصل ویزیت، پزشکان متخصص و پرونده‌های مراجعین',
          symbol: '3D Medical Grid',
        };
      case 'psychology':
        return {
          icon: '🧠 🌿',
          gradient: 'from-cyan-500/20 via-[#FF6A00]/10 to-transparent',
          label: 'مدل سه‌بعدی مشاوره و روانشناسی',
          desc: 'رزرو آنلاین جلسات ۴۵ دقیقه‌ای با حفظ حریم خصوصی مراجع',
          symbol: '3D Balance Sphere',
        };
      case 'massage':
        return {
          icon: '🧘‍♂️ 💆‍♂️',
          gradient: 'from-amber-500/20 via-[#FF6A00]/10 to-transparent',
          label: 'مدل سه‌بعدی ماساژ و اسپا',
          desc: 'زمان‌بندی ماساژورها، اتاق‌های اسپا و فواصل پاکسازی',
          symbol: '3D Zen Flow',
        };
      case 'dashboard':
        return {
          icon: '📊 ⚙️',
          gradient: 'from-[#FF6A00]/25 via-slate-900 to-transparent',
          label: 'داشبورد سه‌بعدی آنالیتیکس',
          desc: 'گزارش‌های درآمدی، نرخ حضور و خروجی اکسل CSV',
          symbol: '3D Analytics Mesh',
        };
      default:
        return {
          icon: '📅 ⏰',
          gradient: 'from-[#FF6A00]/20 via-slate-900 to-transparent',
          label: 'تقویم سه‌بعدی جلالی',
          desc: 'هماهنگی کامل با روزها و مناسبت‌های شمسی',
          symbol: '3D Jalali Node',
        };
    }
  };

  const config = getVisualConfig();

  return (
    <div className={`w-full h-full bg-gradient-to-tr ${config.gradient} p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group`}>
      {/* Glowing 3D Glass Shape */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-[#FF6A00] to-orange-400 p-0.5 shadow-2xl shadow-[#FF6A00]/30 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 flex items-center justify-center mb-4">
        <div className="w-full h-full bg-[#111111]/90 rounded-[22px] backdrop-blur-md flex items-center justify-center text-3xl sm:text-4xl shadow-inner">
          {config.icon}
        </div>
      </div>

      <h4 className="text-base font-bold text-white mb-1.5 group-hover:text-[#FF6A00] transition-colors">
        {config.label}
      </h4>
      <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
        {config.desc}
      </p>

      {/* Floating interactive 3D indicators */}
      <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-amber-400 font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-ping" />
        <span>{config.symbol}</span>
      </div>
    </div>
  );
};
