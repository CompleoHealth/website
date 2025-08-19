interface TrustSymbolProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  opacity?: number;
}

export default function TrustSymbol({ 
  size = 'md', 
  className = '',
  opacity = 0.7 
}: TrustSymbolProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <img 
      src="/images/shared/logo-symbol.jpg" 
      alt="Compleo Health - Trusted Partner" 
      className={`${sizeClasses[size]} ${className}`}
      style={{ opacity }}
    />
  );
}