export interface EquipmentFilter {
  type: 'all' | 'mri' | 'ct' | 'mobile';
}

export interface LocationFilter {
  service: 'all' | 'mri' | 'ct' | 'mobile' | 'private';
}

export interface TrustSignal {
  icon: string;
  title: string;
  description: string;
}

export interface TestimonialData {
  id: number;
  name: string;
  role: string;
  organization: string;
  content: string;
  rating: number;
  type: 'b2b' | 'b2c' | 'partner';
}

export interface ScanOption {
  id: string;
  name: string;
  price: number;
  description: string;
  duration: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  organization?: string;
  role?: string;
  serviceInterest?: string;
  message?: string;
  type: 'b2b' | 'b2c';
}

export interface BookingFormData {
  scanType: string;
  preferredLocation: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  estimatedCost: number;
}
