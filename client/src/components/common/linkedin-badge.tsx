import React from 'react';
import { SiLinkedin } from 'react-icons/si';

interface LinkedInBadgeProps {
  variant?: 'header' | 'contact';
  className?: string;
}

export function LinkedInBadge({ variant = 'header', className = '' }: LinkedInBadgeProps) {
  if (variant === 'header') {
    return (
      <a 
        href="https://www.linkedin.com/company/compleohealth/" 
        target="_blank" 
        rel="noopener noreferrer"
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 linkedin-header-button ${className}`}
        aria-label="Follow us on LinkedIn"
      >
        <SiLinkedin className="h-5 w-5 text-white" />
      </a>
    );
  }

  // Contact slide-out version
  return (
    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
      <SiLinkedin className="h-5 w-5 text-compleo-yellow" aria-label="LinkedIn icon" />
    </div>
  );
}