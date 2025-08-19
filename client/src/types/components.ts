// Component TypeScript interfaces and types

import { ReactNode } from 'react';
import { Equipment, Location } from '@shared/schema';

// Common component interfaces
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Hero Section
export interface HeroSectionProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonHref?: string;
  backgroundVideo?: string;
  backgroundImage?: string;
}

// Equipment Showcase
export interface EquipmentShowcaseProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
  maxItems?: number;
}

export interface EquipmentCardProps {
  equipment: Equipment;
  className?: string;
  showBadge?: boolean;
}

// Location Map
export interface LocationMapProps extends BaseComponentProps {
  locations?: Location[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  showLocationCards?: boolean;
}

export interface MapLocationPoint {
  lat: number;
  lng: number;
  name: string;
  address: string;
  country: string;
  type: 'facility' | 'office';
  phone?: string;
}

// Service Components
export interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
  imageAlt: string;
  href: string;
  className?: string;
}

export interface ServiceFeatureProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

// Team Components
export interface TeamMemberCardProps {
  id: string;
  name: string;
  role: string;
  image: string;
  summary?: string;
  className?: string;
  clickable?: boolean;
}

export interface TeamMemberProfileProps {
  member: {
    id: string;
    name: string;
    role: string;
    department: string;
    image: string;
    summary: string;
    bio?: string;
    keyAchievements?: string[];
    expertise?: string[];
    qualifications?: string[];
    experience: string;
    email?: string;
    linkedin?: string;
  };
}

// Form Components
export interface ContactFormProps extends BaseComponentProps {
  onSubmit?: (data: any) => void;
  isLoading?: boolean;
}

export interface BookingFormProps extends BaseComponentProps {
  onSubmit?: (data: any) => void;
  isLoading?: boolean;
}

// Navigation
export interface NavigationItem {
  name: string;
  href: string;
  current?: boolean;
}

export interface HeaderProps extends BaseComponentProps {
  logo?: string;
  logoAlt?: string;
  navigation?: NavigationItem[];
  showAuth?: boolean;
}

export interface FooterProps extends BaseComponentProps {
  companyInfo?: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  socialLinks?: {
    platform: string;
    href: string;
    icon: ReactNode;
  }[];
}

// Utility interfaces
export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

export interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
  aspectRatio?: string;
}

// Animation and intersection observer
export interface IntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export interface AnimationProps {
  shouldAnimate?: boolean;
  animationDelay?: number;
  animationType?: 'fade-in' | 'fade-in-up' | 'fade-in-left' | 'fade-in-right' | 'scale' | 'slide-up';
}

// Performance and accessibility
export interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

export interface AccessibilityProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  role?: string;
  tabIndex?: number;
}

// Error handling
export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: any;
}

export interface ErrorDisplayProps {
  error: Error;
  resetError: () => void;
  className?: string;
}