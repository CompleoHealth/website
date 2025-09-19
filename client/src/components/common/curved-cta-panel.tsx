import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'wouter';

interface CurvedCtaPanelProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  imageSrc?: string;
  mobileImageSrc?: string;
  backgroundColor?: string;
  textColor?: string;
}

export default function CurvedCtaPanel({
  title,
  description,
  buttonText,
  buttonHref = "/contact",
  imageSrc = "/images/contact/uk10-team.jpg",
  mobileImageSrc = "/images/contact/uk10-team-mobile.jpg",
  backgroundColor = "#0f2e2eed",
  textColor = "white"
}: CurvedCtaPanelProps) {
  const [, setLocation] = useLocation();

  return (
    <section className={`c-call-to-action relative overflow-hidden`} style={{ backgroundColor, color: textColor }}>
      <div className="container mx-auto px-4">
        <div className="c-call-to-action__container flex items-center min-h-[400px]">
          {/* Image Section with Curved Edge */}
          <div className="c-call-to-action__image-wrapper lg:w-1/2 relative h-[400px] lg:h-[400px]">
            <div 
              className="c-call-to-action__image absolute top-0 left-0 w-full h-full bg-center bg-cover bg-no-repeat lg:rounded-r-[280px]"
              style={{
                backgroundImage: `url(${imageSrc})`,
                '--mobile-image': `url(${mobileImageSrc})`
              } as React.CSSProperties & { '--mobile-image': string }}
              role="img"
              aria-label="Compleo Health team at the UKIO conference"
            />
          </div>
          
          {/* Content Section */}
          <div className="c-call-to-action__content w-full lg:w-1/2 lg:pl-16 py-16 lg:py-0">
            <div className="max-w-lg lg:ml-auto">
              <h2 className="heading-2 mb-6">{title}</h2>
              <p className="body-large text-gray-300 mb-8">
                {description}
              </p>
              <Link href={buttonHref} tabIndex={-1}>
                <Button
                  className="bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal hover:from-compleo-teal/90 hover:via-compleo-teal/90 hover:to-compleo-deep-teal/90 text-white font-bold px-8 py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-white/40 hover:border-white/60 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  onClick={() => setLocation(buttonHref)}
                >
                  {buttonText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}