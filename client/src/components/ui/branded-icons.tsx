import React from 'react';
import { LucideIcon } from 'lucide-react';

interface BrandedIconProps {
  icon: LucideIcon;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'sustainability';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function BrandedIcon({ icon: Icon, variant = 'primary', size = 'md', className = '' }: BrandedIconProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24'
  };

  const iconSizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
    xl: 'h-12 w-12'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal',
    secondary: 'bg-gradient-to-br from-compleo-deep-teal via-compleo-deep-teal to-slate-800',
    success: 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700',
    warning: 'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600',
    info: 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700',
    sustainability: 'bg-gradient-to-br from-green-500 via-green-600 to-green-700'
  };

  return (
    <div className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 relative ${className}`}>
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/5 rounded-2xl" />
      
      {/* Icon container */}
      <div className="relative z-10">
        <Icon className={`${iconSizes[size]} text-white drop-shadow-sm`} />
      </div>
    </div>
  );
}

// Specialized medical/healthcare icons
export function MedicalIcon({ icon: Icon, className = '' }: { icon: LucideIcon; className?: string }) {
  return (
    <div className={`w-16 h-16 bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 relative overflow-hidden ${className}`}>
      {/* Medical cross pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-2 bg-white" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-12 bg-white" />
      </div>
      
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/5 rounded-2xl" />
      
      {/* Icon container */}
      <div className="relative z-10">
        <Icon className="h-10 w-10 text-white drop-shadow-sm" />
      </div>
    </div>
  );
}

// Sustainability-focused icons
export function SustainabilityIcon({ icon: Icon, className = '' }: { icon: LucideIcon; className?: string }) {
  return (
    <div className={`w-16 h-16 bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group relative overflow-hidden ${className}`}>
      {/* Leaf pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full" />
        <div className="absolute bottom-2 left-2 w-2 h-2 bg-white rounded-full" />
        <div className="absolute top-4 left-4 w-1 h-1 bg-white rounded-full" />
      </div>
      
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/5 rounded-2xl" />
      
      {/* Icon container */}
      <div className="relative z-10">
        <Icon className="h-10 w-10 text-white drop-shadow-sm" />
      </div>
      
      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

// Innovation/Technology icons
export function TechIcon({ icon: Icon, className = '' }: { icon: LucideIcon; className?: string }) {
  return (
    <div className={`w-16 h-16 bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 relative overflow-hidden ${className}`}>
      {/* Circuit pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-3 left-3 w-4 h-0.5 bg-white" />
        <div className="absolute top-3 left-7 w-0.5 h-4 bg-white" />
        <div className="absolute bottom-3 right-3 w-4 h-0.5 bg-white" />
        <div className="absolute bottom-7 right-3 w-0.5 h-4 bg-white" />
      </div>
      
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/5 rounded-2xl" />
      
      {/* Icon container */}
      <div className="relative z-10">
        <Icon className="h-10 w-10 text-white drop-shadow-sm" />
      </div>
    </div>
  );
}