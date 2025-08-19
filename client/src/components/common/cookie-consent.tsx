import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Cookie } from 'lucide-react';
import { Link } from 'wouter';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consentStatus = localStorage.getItem('cookie-consent');
    if (!consentStatus) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    hideBanner();
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    hideBanner();
  };

  const hideBanner = () => {
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Background overlay */}
      <div 
        className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* Cookie banner */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-auto">
        <div 
          className={`bg-white border-t-4 border-compleo-teal shadow-2xl transform transition-all duration-300 ease-out ${
            isAnimating ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-start gap-4">
              {/* Cookie icon */}
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-compleo-teal rounded-full flex items-center justify-center">
                  <Cookie className="w-4 h-4 text-white" />
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-compleo-deep-teal mb-2">
                  We Value Your Privacy
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  This website uses cookies and similar technologies to ensure the best user experience and to analyze traffic and optimize our advertising efforts. By using our website, you agree to our use of cookies for these purposes.{' '}
                  <Link href="/cookie-policy" className="text-compleo-teal hover:text-compleo-deep-teal font-medium underline">
                    Learn more about our cookie policy
                  </Link>
                </p>
                
                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAccept}
                    className="bg-compleo-teal hover:bg-compleo-deep-teal text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={handleReject}
                    variant="outline"
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Reject
                  </Button>
                </div>
              </div>
              
              {/* Close button */}
              <button
                onClick={hideBanner}
                className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                aria-label="Close cookie banner"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}