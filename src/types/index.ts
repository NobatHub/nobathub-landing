export type BusinessCategory = 
  | 'سالن زیبایی و آرایشگاه'
  | 'کلینیک و مطب پزشکی'
  | 'دفاتر وکالت و مشاوره حقوقی'
  | 'مرکز مشاوره و روانشناسی'
  | 'باشگاه ورزشی، ماساژ و اسپا'
  | 'سایر خدمات حضوری';

export interface ServiceItem {
  id: string;
  title: string;
  durationMinutes: number;
  price: number;
  specialist: string;
  category: string;
}

export interface BusinessSetting {
  workDays: string[];
  startTime: string;
  endTime: string;
  breakStartTime: string;
  breakEndTime: string;
}

export interface CustomerRecord {
  id: string;
  name: string;
  phone: string;
  totalAppointments: number;
  lastVisitJalali: string;
  totalSpent: number;
}

export interface Appointment {
  id: string;
  trackingCode: string;
  customerName: string;
  customerPhone: string;
  serviceTitle: string;
  specialistName: string;
  price: number;
  dateJalali: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  otpVerified: boolean;
  smsSentToManager: boolean;
  smsSentToCustomer: boolean;
}

export interface Business {
  id: string;
  slug: string; // e.g. 'viona_salon' -> /book/viona_salon & /manage/viona_salon
  name: string;
  category: BusinessCategory;
  managerName: string;
  phone: string;
  city: string;
  createdAtJalali: string;
  settings: BusinessSetting;
  services: ServiceItem[];
  customers: CustomerRecord[];
}
