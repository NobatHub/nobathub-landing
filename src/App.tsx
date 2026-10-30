import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CoreValuePillars } from './components/CoreValuePillars';
import { CategoriesSection } from './components/CategoriesSection';
import { CustomerBookingPage } from './components/CustomerBookingPage';
import { BusinessManagePanel } from './components/BusinessManagePanel';
import { PricingSection } from './components/PricingSection';
import { RegisterModal } from './components/RegisterModal';
import { TermsAndPrivacyModal } from './components/TermsAndPrivacyModal';
import { Footer } from './components/Footer';
import { INITIAL_BUSINESS, FAQ_ITEMS } from './data/mockData';
import { Business } from './types';
import { ChevronDown, HelpCircle, X } from 'lucide-react';

export default function App() {
  const [activeModalView, setActiveModalView] = useState<'none' | 'book' | 'manage'>('none');
  const [business, setBusiness] = useState<Business>(INITIAL_BUSINESS);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [legalModalState, setLegalModalState] = useState<{
    isOpen: boolean;
    tab: 'terms' | 'privacy';
  }>({
    isOpen: false,
    tab: 'terms',
  });
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Check URL query parameters on load (e.g., if ?ref=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('ref')) {
      setIsRegisterOpen(true);
    }
  }, []);

  const handleRegisterSuccess = (newBiz: Business) => {
    setBusiness(newBiz);
  };

  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFC] text-[#111111] font-sans selection:bg-[#FF6A00] selection:text-white haikei-bg-blob" dir="rtl">
      
      {/* Top Header Navbar */}
      <Header
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenDashboard={() => setActiveModalView('manage')}
        onOpenAdmin={() => setActiveModalView('manage')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section with Live Poly Haven Studio 3D Calendar & Clock Scene */}
        <HeroSection
          onOpenRegister={() => setIsRegisterOpen(true)}
          onScrollToFeatures={scrollToFeatures}
        />

        {/* 4 Core Value Pillars (/book, /manage, SMS OTP, PWA) */}
        <CoreValuePillars
          onOpenBookingPage={() => setActiveModalView('book')}
          onOpenManagePanel={() => setActiveModalView('manage')}
          onOpenRegister={() => setIsRegisterOpen(true)}
        />

        {/* 3D Categories Section: Beauty, Clinic, Psychology, Massage */}
        <CategoriesSection />

        {/* Transparent Pricing Section */}
        <PricingSection
          onOpenRegister={() => setIsRegisterOpen(true)}
        />

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-[#FAFAFC] border-b border-slate-200/80 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-light border border-slate-200 text-[#FF6A00] text-xs font-semibold mb-3">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>پاسخ به پرسش‌های شما</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#111111] tracking-tight">
                سوالات متداول کسب‌وکارها درباره نوبتهاب
              </h2>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="glass-panel-light rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 text-right font-bold text-[#111111] text-sm sm:text-base flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'transform rotate-180 text-[#FF6A00]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenBookingDemo={() => setActiveModalView('book')}
        onOpenTerms={() => setLegalModalState({ isOpen: true, tab: 'terms' })}
        onOpenPrivacy={() => setLegalModalState({ isOpen: true, tab: 'privacy' })}
      />

      {/* Register Modal (/register experience with math captcha) */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegisterSuccess={handleRegisterSuccess}
      />

      {/* Terms and Privacy Modal */}
      <TermsAndPrivacyModal
        isOpen={legalModalState.isOpen}
        initialTab={legalModalState.tab}
        onClose={() => setLegalModalState((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Customer Booking Page Modal (/book/viona_salon) */}
      {activeModalView === 'book' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md overflow-y-auto p-4 sm:p-6">
          <div className="relative">
            <button
              onClick={() => setActiveModalView('none')}
              className="fixed top-5 left-5 z-50 px-4 py-2 bg-[#111111] hover:bg-slate-800 text-white rounded-xl text-xs font-bold border border-slate-700 cursor-pointer shadow-xl flex items-center gap-1.5"
            >
              <X className="w-4 h-4" />
              <span>بستن صفحه رزرو</span>
            </button>
            <CustomerBookingPage
              business={business}
              onBackToHome={() => setActiveModalView('none')}
            />
          </div>
        </div>
      )}

      {/* Business Manage Panel Modal (/manage/viona_salon) */}
      {activeModalView === 'manage' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md overflow-y-auto p-4 sm:p-6">
          <div className="relative">
            <button
              onClick={() => setActiveModalView('none')}
              className="fixed top-5 left-5 z-50 px-4 py-2 bg-[#111111] hover:bg-slate-800 text-white rounded-xl text-xs font-bold border border-slate-700 cursor-pointer shadow-xl flex items-center gap-1.5"
            >
              <X className="w-4 h-4" />
              <span>بستن پنل مدیریت</span>
            </button>
            <BusinessManagePanel
              business={business}
              onBackToHome={() => setActiveModalView('none')}
            />
          </div>
        </div>
      )}

    </div>
  );
}
