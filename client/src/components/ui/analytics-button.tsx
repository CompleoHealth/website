// Analytics-enabled button component for CTA tracking
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/analytics';
import { useLocation } from 'wouter';
import { forwardRef } from 'react';

interface AnalyticsButtonProps extends React.ComponentProps<typeof Button> {
  trackingName?: string;
  trackingCategory?: string;
  children: React.ReactNode;
}

export const AnalyticsButton = forwardRef<HTMLButtonElement, AnalyticsButtonProps>(
  ({ trackingName, trackingCategory = 'CTA', onClick, children, ...props }, ref) => {
    const [location] = useLocation();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Track the click before executing original onClick
      if (trackingName) {
        trackCTAClick(trackingName, location);
      }
      
      // Execute original onClick if provided
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <Button
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

AnalyticsButton.displayName = 'AnalyticsButton';