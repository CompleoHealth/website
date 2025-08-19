import { cn } from '@/lib/utils';

interface EnhancedSkeletonProps {
  className?: string;
  variant?: 'default' | 'card' | 'text' | 'avatar' | 'image';
  lines?: number;
}

export default function EnhancedSkeleton({ 
  className,
  variant = 'default',
  lines = 1
}: EnhancedSkeletonProps) {
  if (variant === 'card') {
    return (
      <div className={cn("bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4", className)}>
        <div className="loading-shimmer h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="loading-shimmer h-3 bg-gray-200 rounded w-full"></div>
        <div className="loading-shimmer h-3 bg-gray-200 rounded w-2/3"></div>
        <div className="loading-shimmer h-8 bg-gray-200 rounded w-24"></div>
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div 
            key={i}
            className={cn(
              "loading-shimmer h-3 bg-gray-200 rounded",
              i === lines - 1 ? "w-2/3" : "w-full"
            )}
          />
        ))}
      </div>
    );
  }

  if (variant === 'avatar') {
    return (
      <div className={cn("loading-shimmer w-10 h-10 bg-gray-200 rounded-full", className)} />
    );
  }

  if (variant === 'image') {
    return (
      <div className={cn("loading-shimmer w-full h-48 bg-gray-200 rounded-lg", className)} />
    );
  }

  return (
    <div className={cn("loading-shimmer h-4 bg-gray-200 rounded", className)} />
  );
}