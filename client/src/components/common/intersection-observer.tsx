import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver(options: UseIntersectionObserverOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsIntersecting(isVisible);
        
        if (isVisible && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [threshold, rootMargin, hasIntersected]);

  return {
    targetRef,
    isIntersecting: triggerOnce ? hasIntersected : isIntersecting
  };
}

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'slide-left' | 'slide-right' | 'scale';
  delay?: number;
}

export function AnimatedSection({ 
  children, 
  className = '',
  animation = 'fade-up',
  delay = 0
}: AnimatedSectionProps) {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const animationClass = {
    'fade-up': 'animate-fade-in-up',
    'slide-left': 'animate-slide-in-left', 
    'slide-right': 'animate-slide-in-right',
    'scale': 'animate-scale-in'
  }[animation];

  return (
    <div
      ref={targetRef}
      className={`${className} ${isIntersecting ? animationClass : 'opacity-0'}`}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'both'
      }}
    >
      {children}
    </div>
  );
}