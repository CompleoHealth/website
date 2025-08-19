import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

interface CurvedSectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function CurvedSectionHeader({ title, subtitle, className = '' }: CurvedSectionHeaderProps) {
  const { elementRef, shouldAnimate } = useIntersectionObserver();

  return (
    <div ref={elementRef} className={`relative ${className}`}>
      {/* Three-Layer Curved Header */}
      <div className="pill-stack-wrapper">
        <div className="layer1"></div>
        <div className="layer2"></div>
        <div className="layer3"></div>
        <div className="pill-text-overlay">
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-white transition-all duration-700 ${shouldAnimate ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'}`}>
            {title}
          </h2>
        </div>
      </div>
      
      {/* Subtitle below the curved header if provided */}
      {subtitle && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-0">
          <div className={`text-center transition-all duration-700 ${shouldAnimate ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '200ms' }}>
            <p className="text-xl text-compleo-gray max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}