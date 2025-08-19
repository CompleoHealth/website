import React from 'react';

/**
 * SkipLinks component for accessibility
 * Provides keyboard navigation shortcuts to main content
 */
export function SkipLinks() {
  return (
    <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-0 focus-within:left-0 focus-within:z-50 focus-within:bg-compleo-deep-teal focus-within:text-white focus-within:px-4 focus-within:py-2 focus-within:rounded-br-md">
      <a 
        href="#main-content"
        className="inline-block bg-compleo-deep-teal text-white hover:bg-compleo-teal focus:ring-2 focus:ring-compleo-yellow focus:ring-offset-2 px-4 py-2 rounded text-sm font-medium focus:outline-none"
      >
        Skip to main content
      </a>
    </div>
  );
}

export default SkipLinks;