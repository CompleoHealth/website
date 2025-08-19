// TypeScript utilities for testimonials data - loads from JSON for CMS compatibility
// Data is now stored in shared/data/testimonials.json for easy CMS management

export interface PatientTestimonial {
  id: string;
  type: 'patient';
  location: string;
  service: 'MRI' | 'CT';
  content: string;
  rating: number;
  satisfaction?: '100%' | '95%' | '90%' | '85%';
  date: string;
  isAnonymous: boolean;
  patientName?: string;
  staffMentioned?: string[];
  status: 'published' | 'draft' | 'archived';
}

export interface CustomerTestimonial {
  id: string;
  type: 'customer';
  customerName: string;
  role: string;
  organisation: string;
  location: string;
  service: 'Equipment Rental' | 'Clinical Insourcing' | 'Mobile Imaging' | 'Managed Equipment';
  content: string;
  rating: number;
  date: string;
  status: 'published' | 'draft' | 'archived';
}

export type Testimonial = PatientTestimonial | CustomerTestimonial;

// Dynamic import of JSON data for CMS compatibility
import testimonialsJson from './data/testimonials.json';
export const ALL_TESTIMONIALS: Testimonial[] = testimonialsJson.testimonials;

// Helper functions for filtering testimonials
export const getPublishedTestimonials = (): Testimonial[] => {
  return ALL_TESTIMONIALS.filter(testimonial => testimonial.status === 'published');
};

export const getTestimonialsByType = (type: 'patient' | 'customer'): Testimonial[] => {
  return ALL_TESTIMONIALS.filter(testimonial => testimonial.type === type);
};

export const getTestimonialsByLocation = (location: string): Testimonial[] => {
  return ALL_TESTIMONIALS.filter(testimonial => testimonial.location === location);
};

export const getTestimonialsByService = (service: string): Testimonial[] => {
  return ALL_TESTIMONIALS.filter(testimonial => testimonial.service === service);
};