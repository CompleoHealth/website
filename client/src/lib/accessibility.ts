// Accessibility utilities and keyboard navigation helpers

export function setupKeyboardNavigation() {
  // Trap focus within modals
  document.addEventListener('keydown', handleGlobalKeydown);
  
  // Improve focus visibility
  setupFocusManagement();
  
  // Skip link functionality
  setupSkipLinks();
}

function handleGlobalKeydown(event: KeyboardEvent) {
  // Handle Escape key to close modals/dropdowns
  if (event.key === 'Escape') {
    closeOpenModals();
  }
  
  // Handle Tab key for focus management
  if (event.key === 'Tab') {
    handleTabNavigation(event);
  }
}

function closeOpenModals() {
  // Close any open dropdowns
  const openDropdowns = document.querySelectorAll('[data-state="open"]');
  openDropdowns.forEach(dropdown => {
    const button = dropdown.querySelector('button');
    if (button) {
      button.click();
    }
  });
}

function handleTabNavigation(event: KeyboardEvent) {
  const focusableElements = getFocusableElements();
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  // If we're in a modal, trap focus
  const activeModal = document.querySelector('[role="dialog"]');
  if (activeModal) {
    const modalFocusable = activeModal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (event.shiftKey && document.activeElement === modalFocusable[0]) {
      event.preventDefault();
      (modalFocusable[modalFocusable.length - 1] as HTMLElement).focus();
    } else if (!event.shiftKey && document.activeElement === modalFocusable[modalFocusable.length - 1]) {
      event.preventDefault();
      (modalFocusable[0] as HTMLElement).focus();
    }
  }
}

function getFocusableElements() {
  return Array.from(
    document.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ) as HTMLElement[];
}

function setupFocusManagement() {
  // Add focus-visible polyfill behavior
  const style = document.createElement('style');
  style.textContent = `
    .focus-visible {
      outline: 2px solid #00a990;
      outline-offset: 2px;
    }
    
    button:focus-visible,
    a:focus-visible,
    input:focus-visible,
    select:focus-visible,
    textarea:focus-visible {
      outline: 2px solid #00a990;
      outline-offset: 2px;
    }
  `;
  document.head.appendChild(style);
}

function setupSkipLinks() {
  // Create skip link if it doesn't exist
  if (!document.querySelector('.skip-link')) {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-compleo-deep-teal focus:text-white focus:px-4 focus:py-2 focus:rounded';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
}

// Color contrast utilities
export function checkColorContrast(foreground: string, background: string): number {
  const getLuminance = (color: string) => {
    // Convert hex to RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    // Calculate relative luminance
    const sRGB = [r, g, b].map(c => 
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );
    
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  };
  
  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

// ARIA live region utilities
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcer = document.getElementById('screen-reader-announcer') || createAnnouncer();
  announcer.setAttribute('aria-live', priority);
  announcer.textContent = message;
  
  // Clear the message after announcement
  setTimeout(() => {
    announcer.textContent = '';
  }, 1000);
}

function createAnnouncer() {
  const announcer = document.createElement('div');
  announcer.id = 'screen-reader-announcer';
  announcer.className = 'sr-only';
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');
  document.body.appendChild(announcer);
  return announcer;
}

// Form accessibility helpers
export function enhanceFormAccessibility() {
  // Add proper labels and error associations
  const inputs = document.querySelectorAll('input, select, textarea');
  
  inputs.forEach(input => {
    const label = document.querySelector(`label[for="${input.id}"]`);
    if (!label && !input.getAttribute('aria-label')) {

    }
    
    // Ensure error messages are properly associated
    const errorElement = document.querySelector(`[data-error-for="${input.id}"]`);
    if (errorElement) {
      input.setAttribute('aria-describedby', errorElement.id);
    }
  });
}