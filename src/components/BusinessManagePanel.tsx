import React, { useState } from 'react';
import { 
  Calendar, Clock, User, Phone, CheckCircle2, XCircle, 
  Plus, Settings, Users, ArrowRight 
} from 'lucide-react';
import { Business, Appointment, CustomerRecord, ServiceItem } from '../types';
import { toPersianDigits, formatCurrency, getCurrentJalali } from '../utils/jalali';
import { INITIAL_APPOINTMENTS } from '../data/mockData';

interface BusinessManagePanelProps {
  business: Business;
  onBackToHome: () => void;
}

export const BusinessManagePanel: React.FC<BusinessManagePanelProps> = ({ business, onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'settings' | 'services' | 'crm'>('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [services] = useState<ServiceItem[]>(business.services);
  const [customers] = useState<CustomerRecord[]>(business.customers);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');
  
  // Working hours settings state
  const [startTime, setStartTime] = useState(business.settings.startTime);
  const [endTime, setEndTime] = useState(business.settings.endTime);
  const [breakStart, setBreakStart] = useState(business.settings.breakStartTime);
  const [breakEnd, setBreakEnd] = useState(business.settings.breakEndTime);

  // Manual booking modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualService, setManualService] = useState(services[0]?.title || '');
  const [manualTime, setManualTime] = useState('۱۴:۰۰');

  const handleUpdateStatus = (id: string, newStatus: 'confirmed' | 'completed' | 'cancelled') => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const handleAddManualBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName || !manualPhone) return;

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      trackingCode: `NH-${Math.floor(10000 + Math.random() * 90000)}`,
      customerName: manualName,
      customerPhone: manualPhone,
      serviceTitle: manualService,
      specialistName: 'سارا رضایی',
      price: 650000,
      dateJalali: '۱۴۰۵/۰۸/۰۸',
      timeSlot: manualTime,
      status: 'confirmed',
      otpVerified: true,
      smsSentToManager: true,
      smsSentToCustomer: true,
    };

    setAppointments([newApt, ...appointments]);
    setShowAddModal(false);
    setManualName('');
    setManualPhone('');
  };

  const filteredAppointments = filterStatus === 'all'
    ? appointments
    : appointments.filter(a => a.status === filterStatus);

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#111111] py-8 px-4 sm:px-6 lg:px-8 font-sans haikei-bg-blob" dir="rtl">
      
      {/* Top Banner URL Mock Bar */}
      <div className="max-w-6xl mx-auto mb-6 p-3 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between text-xs text-slate-700">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-[#FF6A00] font-mono text-xs mr-2">nobathub.ir/manage/{business.slug}</span>
        </div>
        <button
          onClick={onBackToHome}
          className="text-slate-500 hover:text-[#111111] flex items-center gap-1 cursor-pointer font-bold"
        >
          <span>بازگشت به صفحه اصلی</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="glass-panel-light p-6 rounded-3xl border border-slate-200/80 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/aistudio/file_00000000f45881f4a9e3edab83e2c9ed_6daab086.png" 
                alt="نوبتهاب NobatHub" 
                className="h-8 sm:h-9 w-auto object-contain"
              />
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                پنل مدیریت اختصاصی
              </span>
            </div>
            <h1 className="text-2xl font-black text-[#111111]">{business.name}</h1>
            <p className="text-xs sm:text-sm text-slate-500">
              مدیریت: {business.managerName} · {business.category} · امروز: {getCurrentJalali()}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 bg-gradient-orange text-white font-extrabold rounded-xl text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md shadow-[#FF6A00]/20"
            >
              <Plus className="w-4 h-4 text-white" />
              <span>ثبت دستی نوبت تلفنی/حضوری</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'appointments' ? 'bg-[#FF6A00] text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>مدیریت تقویم و نوبت‌ها ({appointments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'settings' ? 'bg-[#FF6A00] text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>تنظیم ساعات کاری و استراحت</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'services' ? 'bg-[#FF6A00] text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>تعریف خدمات و قیمت‌ها</span>
          </button>

          <button
            onClick={() => setActiveTab('crm')}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'crm' ? 'bg-[#FF6A00] text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>دفترچه مشتریان (CRM)</span>
          </button>
        </div>

        {/* Tab 1: Appointments List */}
        {activeTab === 'appointments' && (
          <div className="glass-panel-light rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
              <h2 className="text-base font-bold text-[#111111]">لیست و وضعیت نوبت‌های تقویم</h2>
              
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs border border-slate-200">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                    filterStatus === 'all' ? 'bg-[#FF6A00] text-white' : 'text-slate-600'
                  }`}
                >
                  همه
                </button>
                <button
                  onClick={() => setFilterStatus('pending')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                    filterStatus === 'pending' ? 'bg-[#FF6A00] text-white' : 'text-slate-600'
                  }`}
                >
                  در انتظار
                </button>
                <button
                  onClick={() => setFilterStatus('confirmed')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                    filterStatus === 'confirmed' ? 'bg-[#FF6A00] text-white' : 'text-slate-600'
                  }`}
                >
                  تایید شده
                </button>
                <button
                  onClick={() => setFilterStatus('completed')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                    filterStatus === 'completed' ? 'bg-[#FF6A00] text-white' : 'text-slate-600'
                  }`}
                >
                  انجام شده
                </button>
              </div>
            </div>

            <div className="overflow-x-auto bg-white">
              <table className="w-full text-right text-xs sm:text-sm">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs">
                  <tr>
                    <th className="px-5 py-3.5">کد پیگیری</th>
                    <th className="px-5 py-3.5">نام مراجع</th>
                    <th className="px-5 py-3.5">خدمت و متخصص</th>
                    <th className="px-5 py-3.5">تاریخ و ساعت</th>
                    <th className="px-5 py-3.5">مبلغ خدمت</th>
                    <th className="px-5 py-3.5">وضعیت</th>
                    <th className="px-5 py-3.5 text-center">تغییر وضعیت</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3.5 font-mono text-[#FF6A00] font-bold">
                        {apt.trackingCode}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="font-bold text-[#111111]">{apt.customerName}</div>
                        <div className="text-xs text-slate-500 font-mono text-left dir-ltr inline-block">{apt.customerPhone}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="text-slate-800 font-medium">{apt.serviceTitle}</div>
                        <div className="text-xs text-slate-500">متخصص: {apt.specialistName}</div>
                      </td>
                      <td className="px-5 py-3.5 font-medium tabular-persian">
                        <div>{apt.dateJalali}</div>
                        <div className="text-xs text-[#FF6A00] font-bold">{apt.timeSlot}</div>
                      </td>
                      <td className="px-5 py-3.5 font-bold text-[#111111] tabular-persian">
                        {formatCurrency(apt.price)}
                      </td>
                      <td className="px-5 py-3.5">
                        {apt.status === 'confirmed' && <span className="text-sky-600 font-bold bg-sky-50 px-2.5 py-1 rounded-full text-xs">تایید شده</span>}
                        {apt.status === 'pending' && <span className="text-amber-600 font-bold bg-amber-50 px-2.5 py-1 rounded-full text-xs">در انتظار</span>}
                        {apt.status === 'completed' && <span className="text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full text-xs">انجام شده</span>}
                        {apt.status === 'cancelled' && <span className="text-rose-600 font-bold bg-rose-50 px-2.5 py-1 rounded-full text-xs">لغوشده</span>}
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {apt.status !== 'completed' && (
                            <button
                              onClick={() => handleUpdateStatus(apt.id, 'completed')}
                              className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-bold transition-colors cursor-pointer border border-emerald-200"
                            >
                              انجام شد
                            </button>
                          )}
                          {apt.status !== 'cancelled' && (
                            <button
                              onClick={() => handleUpdateStatus(apt.id, 'cancelled')}
                              className="px-2.5 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg text-xs font-bold transition-colors cursor-pointer border border-rose-200"
                            >
                              لغو نوبت
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Settings (Working Hours & Breaks) */}
        {activeTab === 'settings' && (
          <div className="glass-panel-light p-6 sm:p-8 rounded-3xl border border-slate-200/80 max-w-2xl mx-auto space-y-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#111111] border-b border-slate-200 pb-3">تنظیم ساعات کاری و استراحت میان روز</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">ساعت شروع بکار روزانه</label>
                <input
                  type="text"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#111111] font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">ساعت پایان بکار روزانه</label>
                <input
                  type="text"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#111111] font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">شروع استراحت میان‌روز</label>
                <input
                  type="text"
                  value={breakStart}
                  onChange={(e) => setBreakStart(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#111111] font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">پایان استراحت میان‌روز</label>
                <input
                  type="text"
                  value={breakEnd}
                  onChange={(e) => setBreakEnd(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#111111] font-mono"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="font-bold text-[#FF6A00]">روزهای فعال کاری هفته:</div>
              <div>شنبه، یکشنبه، دوشنبه، سه‌شنبه، چهارشنبه، پنج‌شنبه (جمعه‌ها تعطیل)</div>
            </div>

            <button
              type="button"
              onClick={() => alert('تنظیمات ساعات کاری و استراحت ذخیره شد.')}
              className="w-full py-3 bg-gradient-orange text-white font-extrabold rounded-xl cursor-pointer shadow-md shadow-[#FF6A00]/20"
            >
              ذخیره تنظیمات ساعات کاری
            </button>
          </div>
        )}

        {/* Tab 3: Services & Pricing */}
        {activeTab === 'services' && (
          <div className="glass-panel-light p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-lg font-bold text-[#111111]">تعریف خدمات، قیمت‌ها و تخصیص متخصصین</h2>
              <span className="text-xs text-[#FF6A00] font-bold">تعداد خدمات: {services.length}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((srv) => (
                <div key={srv.id} className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="flex justify-between font-bold text-[#111111] text-sm mb-1">
                      <span>{srv.title}</span>
                      <span className="text-[#FF6A00] tabular-persian">{formatCurrency(srv.price)}</span>
                    </div>
                    <div className="text-xs text-slate-500">
                      متخصص: {srv.specialist} · زمان مورد نیاز: {srv.durationMinutes} دقیقه
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between text-xs text-slate-500">
                    <span>دسته‌بندی: {srv.category}</span>
                    <span className="text-emerald-600 font-bold">فعال</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: CRM Ledger */}
        {activeTab === 'crm' && (
          <div className="glass-panel-light rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-200/80 flex items-center justify-between bg-white">
              <h2 className="text-base font-bold text-[#111111]">دفترچه مراجعین و سوابق مشتریان (CRM پایه)</h2>
              <span className="text-xs text-slate-500">تعداد مراجعین ثبت‌شده: {customers.length}</span>
            </div>

            <table className="w-full text-right text-xs sm:text-sm bg-white">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs">
                <tr>
                  <th className="px-5 py-3.5">نام و نام‌خانوادگی</th>
                  <th className="px-5 py-3.5">شماره تماس</th>
                  <th className="px-5 py-3.5">تعداد مراجعات قبلی</th>
                  <th className="px-5 py-3.5">آخرین مراجعه</th>
                  <th className="px-5 py-3.5">مجموع پرداختی</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3.5 font-bold text-[#111111]">{c.name}</td>
                    <td className="px-5 py-3.5 font-mono text-slate-600 text-left dir-ltr">{c.phone}</td>
                    <td className="px-5 py-3.5 font-bold text-[#FF6A00] tabular-persian">{toPersianDigits(c.totalAppointments)} بار</td>
                    <td className="px-5 py-3.5 tabular-persian text-slate-600">{c.lastVisitJalali}</td>
                    <td className="px-5 py-3.5 font-bold text-emerald-600 tabular-persian">{formatCurrency(c.totalSpent)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* Manual Booking Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl">
            <h3 className="text-lg font-bold text-[#111111] mb-4">ثبت نوبت دستی تلفنی یا حضوری</h3>
            <form onSubmit={handleAddManualBooking} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">نام مراجع *</label>
                <input
                  type="text"
                  required
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  placeholder="مثال: رویا کمالی"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-[#111111]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">شماره موبایل *</label>
                <input
                  type="tel"
                  required
                  value={manualPhone}
                  onChange={(e) => setManualPhone(e.target.value)}
                  placeholder="09121234567"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-[#111111] font-mono text-left dir-ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">خدمت انتخابی</label>
                <select
                  value={manualService}
                  onChange={(e) => setManualService(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-[#111111]"
                >
                  {services.map(s => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">ساعت حضور</label>
                <input
                  type="text"
                  value={manualTime}
                  onChange={(e) => setManualTime(e.target.value)}
                  placeholder="۱۴:۰۰"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-[#111111]"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-orange text-white font-extrabold text-xs sm:text-sm rounded-xl cursor-pointer"
                >
                  ثبت نوبت در تقویم
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="py-3 px-4 bg-slate-100 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl cursor-pointer"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
