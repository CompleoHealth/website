import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import EnhancedContactForm from '@/components/forms/enhanced-contact-form';
import BackToTop from '@/components/common/back-to-top';
import ScrollProgress from '@/components/common/scroll-progress';
import { SEOHead } from '@/components/common/seo-head';
import { SEO_DATA } from '@/lib/seo-data';
import TrustSignals from '@/components/common/trust-signals';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useLocation } from 'wouter';
import { 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Users,
  Building,
  Hospital
} from 'lucide-react';
import contactData from '@/../../shared/data/contact.json';

// Icon mapping for dynamic icons
const getIcon = (iconName: string) => {
  const icons: { [key: string]: any } = {
    Phone,
    Mail,
    Users,
    Hospital,
    Building,
    MapPin,
    Clock,
    MessageSquare,
    CheckCircle
  };
  return icons[iconName];
};

export default function Contact() {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { elementRef: heroRef, isVisible: heroInView } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });
  const [location] = useLocation();

  // Extract equipment parameter from URL
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const equipmentName = urlParams.get('equipment');

  useEffect(() => {
    const timer = setTimeout(() => setShouldAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to contact form if hash is present
  useEffect(() => {
    if (window.location.hash === '#contact-form') {
      const element = document.getElementById('contact-form');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 500); // Wait for page to load
      }
    }
  }, [location]);



  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead {...SEO_DATA.contact} />
      {/* Skip Links for Accessibility */}
      <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-0 focus-within:left-0 focus-within:z-50 focus-within:bg-compleo-deep-teal focus-within:text-white focus-within:px-4 focus-within:py-2 focus-within:rounded-br-md">
        <a 
          href="#main-content"
          className="inline-block bg-compleo-deep-teal text-white hover:bg-compleo-teal focus:ring-2 focus:ring-compleo-yellow focus:ring-offset-2 px-4 py-2 rounded text-sm font-medium focus:outline-none"
        >
          Skip to main content
        </a>
      </div>
      <ScrollProgress />
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <section ref={heroRef} className="section-padding-lg bg-compleo-deep-teal text-white">
          <div className="max-w-7xl mx-auto container-padding text-center">
            <div className={`transition-all duration-700 ${heroInView ? 'animate-slide-in-left opacity-100' : 'opacity-0 translate-x-[-50px]'}`}>
              <h1 className="heading-1 mb-4">
                {contactData.hero.title}
              </h1>
              <p className="body-large text-gray-200 max-w-3xl mx-auto mb-6">{contactData.hero.subtitle}</p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="section-padding bg-gray-100">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="text-center mb-12">
              <h2 className="heading-2 text-compleo-deep-teal mb-4">
                How Can We Help?
              </h2>
              <p className="body-base text-compleo-gray max-w-3xl mx-auto">
                Multiple ways to reach us based on your needs and urgency.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {contactData.contactMethods.map((method, index) => {
                const IconComponent = getIcon(method.icon);
                return (
                  <Card key={index} className="group text-center hover-lift border-2 border-gray-100 hover:border-compleo-teal/20 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
                    {/* Full card overlay */}
                    <div className="absolute inset-0 bg-compleo-deep-teal opacity-0 group-hover:opacity-25 transition-opacity duration-300 z-30 pointer-events-none"></div>
                    
                    <CardContent className="p-6 relative z-10">
                      <div className="w-16 h-16 bg-compleo-teal rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        {IconComponent && <IconComponent className="text-white" size={24} />}
                      </div>
                      <h3 className="text-lg font-bold text-compleo-deep-teal mb-2">
                        {method.title}
                      </h3>
                      <div className="text-compleo-deep-teal font-bold mb-1">
                        {method.isEmail ? (
                          <a
                            href={`mailto:${method.primary}`}
                            className="hover:underline transition-colors duration-300"
                          >
                            {method.primary}
                          </a>
                        ) : (
                          method.primary
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {method.secondary}
                      </div>
                      <div className="text-xs text-gray-600">
                        {method.description}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Inquiry Types */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-compleo-deep-teal mb-6">
                {contactData.partnership.title}
              </h2>
              <p className="text-xl text-compleo-gray max-w-3xl mx-auto">{contactData.partnership.subtitle}</p>
            </div>

            <div className="max-w-4xl mx-auto">
              {contactData.partnership.cards.map((card, index) => {
                const IconComponent = getIcon(card.icon);
                return (
                  <Card key={index} className="group hover-lift border-2 border-gray-100 hover:border-compleo-teal/20 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white overflow-hidden relative">
                    {/* Full card overlay */}
                    <div className="absolute inset-0 bg-compleo-deep-teal opacity-0 group-hover:opacity-25 transition-opacity duration-300 z-30 pointer-events-none"></div>
                    
                    {/* Teal accent bar on left edge */}
                    <div className="absolute left-0 top-0 w-1 h-full bg-compleo-teal"></div>
                    
                    <CardContent className="p-4 sm:p-6 lg:p-8 relative z-10">
                      {/* Mobile: Stacked Layout, Desktop: Side-by-side */}
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between h-full space-y-6 lg:space-y-0">
                        {/* Services and Benefits Section */}
                        <div className="flex-1 lg:pr-8">
                          <div className="flex items-center mb-4 sm:mb-6">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-compleo-teal rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                              {IconComponent && <IconComponent className="text-white" size={20} />}
                            </div>
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-compleo-deep-teal">
                              {card.title}
                            </h3>
                          </div>
                          
                          <p className="text-compleo-gray mb-4 sm:mb-6 text-sm sm:text-base">
                            {card.description}
                          </p>
                          
                          <ul className="space-y-2 mb-4 sm:mb-6">
                            {card.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-center text-compleo-gray text-sm sm:text-base">
                                <CheckCircle className="text-compleo-teal mr-2 h-4 w-4 flex-shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                          
                          <Button
                            className="bg-compleo-deep-teal hover:bg-compleo-teal text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl text-sm sm:text-base w-full sm:w-auto transition-all duration-300 hover:scale-105"
                            onClick={() => {
                              document.getElementById('contact-form')?.scrollIntoView({ 
                                behavior: 'smooth',
                                block: 'start'
                              });
                            }}
                          >
                            {card.ctaText}
                          </Button>
                        </div>
                        
                        {/* Logo and Contact Section - Mobile: Stacked, Desktop: Side Panel */}
                        <div className="flex-1 lg:pl-8 lg:border-l border-gray-200 pt-6 lg:pt-0 border-t lg:border-t-0">
                          <div className="flex flex-col h-full">
                            {/* Logo - Larger on mobile */}
                            <div className="mb-4 sm:mb-6 text-center lg:text-left">
                              <img 
                                src={card.logoPath} 
                                alt="Compleo Health" 
                                className="h-8 sm:h-10 lg:h-12 w-auto mx-auto lg:mx-0"
                              />
                            </div>
                            
                            {/* Contact Details - Better mobile formatting */}
                            <div className="space-y-3 text-center lg:text-left">
                              <div className="text-compleo-gray text-sm sm:text-base">
                                <div className="text-compleo-deep-teal font-medium mb-1 text-base sm:text-lg">
                                  {card.contactInfo.companyName}
                                </div>
                                {card.contactInfo.address.map((line, idx) => (
                                  <div key={idx} className="text-sm sm:text-base">{line}</div>
                                ))}
                              </div>
                              
                              <div className="text-compleo-deep-teal font-medium text-base sm:text-lg">
                                {card.contactInfo.phone}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form - Enhanced Design */}
        <section id="contact-form" className="py-20 bg-gradient-to-br from-compleo-deep-teal via-compleo-deep-teal to-compleo-teal text-white relative overflow-hidden">
          {/* Watermark Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: `url(${contactData.contactForm.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          

          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-6">{contactData.contactForm.title}</h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                {contactData.contactForm.subtitle}
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <EnhancedContactForm 
                equipmentName={equipmentName || undefined}
                prefilledMessage={equipmentName ? `Please tell me more about ${equipmentName}` : undefined}
              />
            </div>
          </div>
        </section>

        <TrustSignals />

        
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
