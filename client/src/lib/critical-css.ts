export const CRITICAL_CSS = `
  /* Critical CSS for above-the-fold content */
  
  /* Brand colors */
  :root {
    --compleo-deep-teal: 15 46 46;
    --compleo-teal: 0 169 144;
    --compleo-yellow: 255 193 7;
    --compleo-gold: 255 193 7;
    --compleo-cream: 247 249 228;
    --compleo-beige: 242 237 230;
  }
  
  /* Reset and base styles */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.6;
    color: rgb(51 65 85);
    background-color: rgb(248 250 252);
  }
  
  /* Header styles */
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(226, 232, 240, 0.5);
  }
  
  /* Hero section styles */
  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    background: linear-gradient(135deg, rgb(15 46 46) 0%, rgb(0 169 144) 100%);
    color: white;
  }
  
  .hero-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    z-index: 10;
    position: relative;
  }
  
  .hero-title {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  }
  
  .hero-subtitle {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }
  
  /* Button styles */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    text-decoration: none;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
  }
  
  .btn-primary {
    background: rgb(0 169 144);
    color: white;
    padding: 0.75rem 1.5rem;
  }
  
  .btn-primary:hover {
    background: rgb(0 169 144 / 0.9);
    transform: translateY(-2px);
  }
  
  .btn-secondary {
    background: rgb(255 193 7);
    color: rgb(15 46 46);
    padding: 0.75rem 1.5rem;
  }
  
  .btn-secondary:hover {
    background: rgb(255 193 7 / 0.9);
    transform: translateY(-2px);
  }
  
  /* Loading states */
  .loading {
    opacity: 0.7;
    pointer-events: none;
  }
  
  .fade-in {
    opacity: 0;
    animation: fadeIn 0.6s ease-out forwards;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  /* Skip links */
  .skip-links a {
    position: absolute;
    top: -40px;
    left: 6px;
    background: rgb(255 193 7);
    color: rgb(15 46 46);
    padding: 8px;
    text-decoration: none;
    z-index: 100;
    border-radius: 4px;
  }
  
  .skip-links a:focus {
    top: 6px;
  }
  
  /* Responsive design */
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2rem;
    }
    
    .hero-subtitle {
      font-size: 1.125rem;
    }
    
    .hero-content {
      padding: 0 1rem;
    }
  }
`;

export function injectCriticalCSS(): void {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = CRITICAL_CSS;
    document.head.insertBefore(style, document.head.firstChild);
  }
}