import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'nhs' | 'compleo';
  hoverable?: boolean;
}

export function PremiumCard({ 
  children, 
  className, 
  variant = 'default',
  hoverable = true 
}: PremiumCardProps) {
  const variantStyles = {
    default: 'border-white/10 hover:border-white/20',
    nhs: 'border-blue-400/30 hover:border-blue-400/50',
    compleo: 'border-compleo-teal/30 hover:border-compleo-teal/50'
  };

  return (
    <Card 
      className={cn(
        'bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm',
        'border rounded-2xl shadow-2xl',
        hoverable && 'hover:shadow-3xl hover:scale-105 transition-all duration-500',
        variantStyles[variant],
        'group',
        className
      )}
    >
      {children}
    </Card>
  );
}

interface PremiumCardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function PremiumCardHeader({ children, className }: PremiumCardHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between mb-6', className)}>
      {children}
    </div>
  );
}

interface PremiumCardTitleProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'nhs' | 'compleo';
}

export function PremiumCardTitle({ 
  children, 
  className, 
  variant = 'default' 
}: PremiumCardTitleProps) {
  const variantStyles = {
    default: 'text-white group-hover:text-compleo-yellow',
    nhs: 'text-white group-hover:text-blue-100',
    compleo: 'text-white group-hover:text-compleo-yellow'
  };

  return (
    <h3 className={cn(
      'text-2xl font-bold transition-colors',
      variantStyles[variant],
      className
    )}>
      {children}
    </h3>
  );
}

interface PremiumCardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function PremiumCardDescription({ children, className }: PremiumCardDescriptionProps) {
  return (
    <p className={cn('text-gray-200 mb-6 leading-relaxed', className)}>
      {children}
    </p>
  );
}

interface PremiumBadgeProps {
  children: ReactNode;
  variant?: 'carbon' | 'social' | 'default';
  className?: string;
}

export function PremiumBadge({ 
  children, 
  variant = 'default', 
  className 
}: PremiumBadgeProps) {
  const variantStyles = {
    carbon: 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-100 border-emerald-500/30',
    social: 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-100 border-blue-500/30',
    default: 'bg-gradient-to-r from-compleo-teal/20 to-compleo-deep-teal/20 text-compleo-beige border-compleo-teal/30'
  };

  return (
    <Badge className={cn(
      'px-4 py-2 rounded-full text-sm font-medium border backdrop-blur-sm',
      variantStyles[variant],
      className
    )}>
      {children}
    </Badge>
  );
}

interface PremiumCardContentProps {
  children: ReactNode;
  className?: string;
}

export function PremiumCardContent({ children, className }: PremiumCardContentProps) {
  return (
    <CardContent className={cn('p-8 text-white', className)}>
      {children}
    </CardContent>
  );
}