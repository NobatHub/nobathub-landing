import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFC] p-6 text-center" dir="rtl">
          <div className="w-16 h-16 rounded-3xl bg-[#FF6A00]/10 text-[#FF6A00] flex items-center justify-center mb-4 border border-[#FF6A00]/20">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-[#111111] mb-2">سامانه نوبتهاب در حال بازیابی است</h2>
          <p className="text-xs text-slate-500 max-w-md mb-6 leading-relaxed">
            یک خطای جزیی در مرورگر رخ داده است. با کلیک روی دکمه زیر صفحه را تازه‌سازی کنید.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-orange text-white text-xs font-bold rounded-2xl shadow-lg cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>بارگذاری مجدد صفحه</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
