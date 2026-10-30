import React, { useState } from 'react';
import { Sparkles, Scissors, Stethoscope, Scale, Brain, Sparkle, CheckCircle2, Image as ImageIcon, Box, ArrowUpLeft } from 'lucide-react';
import { Spline3DModel } from './Spline3DModel';

import beautyPhoto from '../assets/images/beauty_salon_interior_1793336984044.jpg';
import clinicPhoto from '../assets/images/medical_clinic_room_1793336983887.jpg';
import psychologyPhoto from '../assets/images/psychology_counseling_room_1793336983765.jpg';
import massagePhoto from '../assets/images/massage_spa_room_1793336996824.jpg';
import lawOfficePhoto from '../assets/images/law_office_photo_1793338901246.jpg';

interface CategoryItem {
  id: 'beauty' | 'clinic' | 'lawyer' | 'psychology' | 'massage';
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  fallbackType: 'beauty' | 'clinic' | 'psychology' | 'massage';
  features: string[];
  metrics: string;
  photoUrl: string;
  badgeText: string;
  accentGradient: string;
}

export const CategoriesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'beauty' | 'clinic' | 'lawyer' | 'psychology' | 'massage'>('beauty');
  const [viewMode, setViewMode] = useState<'photo' | '3d'>('photo');

  const categories: CategoryItem[] = [
    {
      id: 'beauty',
      title: 'سالن‌های زیبایی و آرایشگاه‌ها',
      subtitle: 'مدیریت حرفه‌ای لاین‌های رنگ، میکاپ، ناخن و کراتین',
      icon: <Scissors className="w-5 h-5 text-[#FF6A00]" />,
      fallbackType: 'beauty',
      features: [
        'تعریف پرسنل مستقل با رزرو مستقیم لاین‌های تخصصی',
        'تایم‌لاین بدون تداخل برای خدمات همزمان ناخن و رنگ',
        'پیامک یادآوری خودکار قبل از زمان مراجعه'
      ],
      metrics: 'کاهش ۸۵٪ تداخل لاین‌های کاری سالن',
      photoUrl: beautyPhoto,
      badgeText: 'محیط واقعی سالن زیبایی',
      accentGradient: 'from-orange-500/20 via-amber-500/10 to-transparent'
    },
    {
      id: 'clinic',
      title: 'کلینیک‌ها، مطب‌ها و دندانپزشکی',
      subtitle: 'اتوماسیون وقت‌دهی پزشکان، لیزر و فیشیال پوست',
      icon: <Stethoscope className="w-5 h-5 text-emerald-600" />,
      fallbackType: 'clinic',
      features: [
        'کنترل فواصل دقیق ویزیت و پاکسازی تجهیزات',
        'ثبت آنلاین نوبت با کد پیگیری اختصاصی',
        'ارسال آدرس مطب و نقشه همراه پیامک تایید'
      ],
      metrics: 'کاهش ۹۵٪ کنسلی‌های بی‌خبر مراجعین',
      photoUrl: clinicPhoto,
      badgeText: 'محیط واقعی مطب و کلینیک',
      accentGradient: 'from-emerald-500/20 via-teal-500/10 to-transparent'
    },
    {
      id: 'lawyer',
      title: 'دفاتر وکالت و مشاوره حقوقی',
      subtitle: 'تنظیم وقت دقیق وکلا، تنظیم قرارداد و مشاوره تخصصی',
      icon: <Scale className="w-5 h-5 text-indigo-600" />,
      fallbackType: 'clinic',
      features: [
        'دسته‌بندی جلسات مشاوره حقوقی، دعاوی ملکی و خانواده',
        'تایید هویت پیامکی مراجعین قبل از حضور در دفتر وکالت',
        'ارسال یادآوری زمان دادگاه یا حضور در دفتر همراه لوکیشن'
      ],
      metrics: 'افزایش ۷۵٪ انضباط زمانی مراجعین وکالت',
      photoUrl: lawOfficePhoto,
      badgeText: 'محیط واقعی دفتر وکالت',
      accentGradient: 'from-indigo-500/20 via-purple-500/10 to-transparent'
    },
    {
      id: 'psychology',
      title: 'مراکز مشاوره و روانشناسی',
      subtitle: 'رزرو امن جلسات آنلاین و حضوری با حفظ محرمانگی',
      icon: <Brain className="w-5 h-5 text-cyan-600" />,
      fallbackType: 'psychology',
      features: [
        'زمان‌بندی جلسات استاندارد ۴۵ دقیقه‌ای با استراحت',
        'امکان رزرو توسط خود بیمار بدون واسطه منشی',
        'ارسال لینک برگزاری جلسه آنلاین در پیامک تایید'
      ],
      metrics: 'افزایش ۶۰٪ نظم مراجعین هفتگی',
      photoUrl: psychologyPhoto,
      badgeText: 'محیط واقعی اتاق مشاوره',
      accentGradient: 'from-cyan-500/20 via-blue-500/10 to-transparent'
    },
    {
      id: 'massage',
      title: 'باشگاه‌ها، ماساژ و اسپا',
      subtitle: 'مدیریت اتاق‌های اسپا، ماساژورها و سانس‌های ورزشی',
      icon: <Sparkle className="w-5 h-5 text-amber-600" />,
      fallbackType: 'massage',
      features: [
        'تخصیص هوشمند ماساژور و اتاق ماساژ بدون هم‌پوشانی',
        'امکان انتخاب جنسیت متخصص و نوع ماساژ',
        'گزارش‌گیری دقیق تعداد سانس‌های پرشده در ماه'
      ],
      metrics: 'بهینه‌سازی ۱۰۰٪ ظرفیت اتاق‌های اسپا',
      photoUrl: massagePhoto,
      badgeText: 'محیط واقعی مرکز اسپا',
      accentGradient: 'from-amber-500/20 via-orange-500/10 to-transparent'
    }
  ];

  const currentCategory = categories.find(c => c.id === activeCategory) || categories[0];

  return (
    <section id="categories" className="py-24 bg-[#FAFAFC] border-b border-slate-200/80 relative overflow-hidden haikei-bg-blob">
      
      {/* Decorative Organic Ambient Glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FF6A00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/90 text-[#FF6A00] text-xs font-bold mb-4 shadow-sm shadow-[#FF6A00]/5">
            <Sparkles className="w-4 h-4 text-[#FF6A00]" />
            <span>تصاویر واقعی محیط‌ها و امکانات تخصصی اصناف</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight leading-tight">
            راه‌کار تخصصی نوبتهاب برای صنف شما
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            محیط‌های واقعی کسب‌وکارها ویژه‌ی سالن‌های زیبایی، کلینیک‌ها، دفاتر وکالت، مراکز مشاوره و اسپا
          </p>
        </div>

        {/* Dynamic Organic Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-3.5 rounded-[1.8rem] transition-all duration-300 cursor-pointer flex items-center gap-3 border ${
                  isActive
                    ? 'bg-white border-[#FF6A00] text-[#111111] shadow-xl shadow-[#FF6A00]/12 -translate-y-1 scale-105'
                    : 'bg-white/60 backdrop-blur-md border-slate-200/80 text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-md'
                }`}
              >
                <div className={`p-2.5 rounded-2xl transition-colors ${isActive ? 'bg-[#FF6A00] text-white shadow-md shadow-[#FF6A00]/30' : 'bg-slate-100 text-slate-600'}`}>
                  {cat.id === activeCategory ? React.cloneElement(cat.icon as React.ReactElement, { className: 'w-4 h-4 text-white' }) : cat.icon}
                </div>
                <div className="text-right">
                  <div className={`text-xs font-black ${isActive ? 'text-[#111111]' : 'text-slate-700'}`}>
                    {cat.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Category Content & Organic Photo Card */}
        <div className="relative rounded-[2.8rem] rounded-tl-[1.2rem] bg-white/80 backdrop-blur-xl p-6 sm:p-10 lg:p-12 border border-white/90 shadow-[0_20px_60px_rgba(0,0,0,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center overflow-hidden">
          
          {/* Subtle Ambient Gradient Mesh inside card */}
          <div className={`absolute inset-0 bg-gradient-to-br ${currentCategory.accentGradient} opacity-60 pointer-events-none`} />

          {/* Info Details (6 cols) */}
          <div className="lg:col-span-6 space-y-6 relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 text-[#FF6A00] text-xs font-extrabold shadow-sm">
                {currentCategory.icon}
                <span>{currentCategory.title}</span>
              </div>

              {/* Toggle Photo vs 3D */}
              <div className="inline-flex items-center p-1 rounded-2xl bg-slate-100/90 border border-slate-200/80 text-xs shadow-inner">
                <button
                  onClick={() => setViewMode('photo')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    viewMode === 'photo'
                      ? 'bg-white text-[#111111] shadow-md shadow-black/5'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5 text-[#FF6A00]" />
                  <span>عکس واقعی</span>
                </button>
                <button
                  onClick={() => setViewMode('3d')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    viewMode === '3d'
                      ? 'bg-white text-[#111111] shadow-md shadow-black/5'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Box className="w-3.5 h-3.5 text-[#FF6A00]" />
                  <span>مدل سه‌بعدی</span>
                </button>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-[#111111] leading-snug">
              {currentCategory.subtitle}
            </h3>

            <div className="space-y-3.5 pt-1">
              {currentCategory.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <div className="p-1 rounded-full bg-[#FF6A00]/10 text-[#FF6A00] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6A00]" />
                  </div>
                  <span className="font-medium">{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 text-xs sm:text-sm text-slate-700 flex flex-wrap items-center justify-between gap-2 shadow-sm">
                <span className="text-slate-500 font-medium">دست‌آورد واقعی نوبتهاب در این صنف:</span>
                <span className="font-black text-[#FF6A00] text-sm sm:text-base">{currentCategory.metrics}</span>
              </div>
            </div>
          </div>

          {/* Real Photo or Interactive 3D Model Box (6 cols) */}
          <div className="lg:col-span-6 relative z-10">
            {viewMode === 'photo' ? (
              <div className="relative w-full h-80 sm:h-[26rem] rounded-[2.2rem] rounded-br-[1rem] overflow-hidden border border-white/90 shadow-2xl group">
                <img
                  src={currentCategory.photoUrl}
                  alt={currentCategory.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Organic Glass Overlay Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-between p-6">
                  <div className="flex justify-end">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-white bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg">
                      <Sparkles className="w-3 h-3 text-[#FF6A00]" />
                      <span>{currentCategory.badgeText}</span>
                    </span>
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-2 text-white font-extrabold text-lg sm:text-xl">
                      <span>{currentCategory.title}</span>
                      <ArrowUpLeft className="w-5 h-5 text-[#FF6A00]" />
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      تجربه رزرو هوشمند آنلاین با قابلیت ساخت لینک اختصاصی و ارسال پیامک تایید
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <Spline3DModel
                fallbackType={currentCategory.fallbackType}
                title={`صحنه سه‌بعدی زنده ${currentCategory.title}`}
                height="h-80 sm:h-[26rem]"
              />
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
