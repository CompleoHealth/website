import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { trackCTAClick } from '@/lib/analytics';

interface PillCTAProps {
  heading: string;
  description: string;
  primaryButton: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryButton?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
}

export default function PillCTA({
  heading,
  description,
  primaryButton,
  secondaryButton
}: PillCTAProps) {
  return (
    <section className="bg-white">
      {/* Recreate exact pill design structure with custom height */}
      <div className="services-cta-pill-wrapper">
        <div className="services-cta-layer1"></div>
        <div className="services-cta-layer2"></div>
        <div className="services-cta-layer3"></div>
        <div className="services-cta-content-overlay">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="flex items-center justify-start h-full">
              <div className="max-w-2xl text-white text-left md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{heading}</h2>
                <p className="text-xl text-gray-300 mb-8">{description}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-start">
                  {primaryButton.href ? (
                    <Link href={primaryButton.href} onClick={() => trackCTAClick(`${primaryButton.text} - Pill CTA`, window.location.pathname)}>
                      <Button size="lg" className="bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal hover:from-compleo-teal/90 hover:via-compleo-teal/90 hover:to-compleo-deep-teal/90 text-white font-bold px-6 py-2 sm:px-8 sm:py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-white/40 hover:border-white/60 backdrop-blur-sm transition-all duration-300 hover:scale-105">
                        {primaryButton.text}
                      </Button>
                    </Link>
                  ) : (
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal hover:from-compleo-teal/90 hover:via-compleo-teal/90 hover:to-compleo-deep-teal/90 text-white font-bold px-6 py-2 sm:px-8 sm:py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-white/40 hover:border-white/60 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                      onClick={() => {
                        trackCTAClick(`${primaryButton.text} - Pill CTA`, window.location.pathname);
                        primaryButton.onClick?.();
                      }}
                    >
                      {primaryButton.text}
                    </Button>
                  )}
                  
                  {secondaryButton && (
                    secondaryButton.href ? (
                      <Link href={secondaryButton.href} onClick={() => trackCTAClick(`${secondaryButton.text} - Pill CTA`, window.location.pathname)}>
                        <Button size="lg" className="bg-compleo-yellow hover:bg-compleo-yellow/90 text-compleo-deep-teal font-bold px-6 py-2 sm:px-8 sm:py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-compleo-yellow/40 hover:border-compleo-yellow/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                          {secondaryButton.text}
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        size="lg" 
                        className="bg-compleo-yellow hover:bg-compleo-yellow/90 text-compleo-deep-teal font-bold px-6 py-2 sm:px-8 sm:py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-compleo-yellow/40 hover:border-compleo-yellow/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                        onClick={() => {
                          trackCTAClick(`${secondaryButton.text} - Pill CTA`, window.location.pathname);
                          secondaryButton.onClick?.();
                        }}
                      >
                        {secondaryButton.text}
                      </Button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}