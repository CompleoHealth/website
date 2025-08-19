import React, { useState, useEffect } from 'react';
import { Shield, IdCard, Award } from 'lucide-react';
import { strapiApi } from '@/lib/strapi';
import { StrapiTrustSignals } from '@/lib/strapi/types/global-settings';

interface Certification {
  type: 'logo' | 'icon';
  logo?: string;
  icon?: any;
  title: string;
  description: string;
  size?: 'default' | 'large' | 'super-large' | 'xxl';
  noPaddingBottom?: boolean;
}

interface TrustSignalsProps {
  title?: string;
  subtitle?: string;
  certifications?: Certification[];
  backgroundColor?: string;
  textColor?: string;
}

function TrustSignalsComponent({
  title,
  subtitle,
  backgroundColor = "white",
  textColor = "compleo-deep-teal",
  certifications = [
    {
      type: 'logo',
      logo: '/images/certifications/iso-9001-dnv.png?v=2',
      title: 'ISO 9001:2015',
      description: 'Quality Management Certified by DNV',
      size: 'super-large',
      noPaddingBottom: true,
    },
    {
      type: 'logo',
      logo: '/images/certifications/care-quality-commission.png',
      title: 'Care Quality Commission',
      description: 'CQC Regulated Provider',
      size: 'super-large',
    },
    {
      type: 'logo',
      logo: '/images/certifications/nhs-workforce-alliance.png',
      title: 'NHS Workforce Alliance',
      description: 'Approved Supplier',
      size: 'xxl',
    },
    {
      type: 'logo',
      logo: '/images/certifications/doctify-patient-experience-2025.jpg',
      title: 'Outstanding Patient Experience 2025',
      description: 'Doctify Patient Experience Award',
      size: 'super-large',
    },
    {
      type: 'logo',
      logo: '/images/certifications/osi-logo.png',
      title: 'Working Towards OSI',
      description: 'Orthopaedic Surgery Initiative',
      size: 'large',
    },
    {
      type: 'logo',
      logo: '/images/certifications/cyber-essentials-plus.png',
      title: 'Cyber Essentials Plus',
      description: 'Information Security Certified',
      size: 'large',
    },
  ]
}: TrustSignalsProps = {}) {

  return (
    <section className={`pt-8 md:pt-10 pb-4 md:pb-6`} style={{ backgroundColor }}>
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-4">
          <h2 className={`heading-3 text-${textColor} mb-2`}>
            {title}
          </h2>
          <p className="body-base text-compleo-gray">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 lg:gap-6 lg:flex-nowrap lg:justify-between">
          {certifications.map((cert, index) => {
            // Calculate size based on cert.size using larger Tailwind classes
            let containerSize = "w-24 h-24 lg:w-28 lg:h-28"; // default - increased
            if (cert.size === 'super-large') {
              containerSize = "w-40 h-40 lg:w-44 lg:h-44"; // increased significantly
            } else if (cert.size === 'large') {
              containerSize = "w-32 h-32 lg:w-36 lg:h-36"; // increased
            } else if (cert.size === 'xxl') {
              containerSize = "w-48 h-48 lg:w-52 lg:h-52"; // NHS Workforce Alliance - increased
            }
            
            const marginBottom = cert.noPaddingBottom ? "mb-0" : "mb-1";
            
            return (
              <div key={index} className="text-center flex-shrink-0">
                {cert.type === 'logo' && cert.logo ? (
                  <div className={`${containerSize} mx-auto ${marginBottom} flex items-center justify-center`}>
                    <img 
                      src={cert.logo} 
                      alt={cert.title} 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : cert.type === 'icon' && cert.icon ? (
                  <div className="w-16 h-16 lg:w-14 lg:h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm border border-gray-100">
                    <cert.icon className={`text-${textColor}`} size={24} />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// CMS-enabled wrapper component with data fetching
export default function TrustSignals({
  backgroundColor = "white",
  textColor = "compleo-deep-teal",
  certifications
}: Omit<TrustSignalsProps, 'title' | 'subtitle'> & { certifications?: Certification[] }) {
  const [trustSignalsData, setTrustSignalsData] = useState<StrapiTrustSignals | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Fetch trust signals data from CMS
  useEffect(() => {
    const fetchTrustSignalsData = async () => {
      try {
        const data = await strapiApi.getTrustSignals();
        setTrustSignalsData(data);
      } catch (error) {
        console.error('Error fetching trust signals data:', error);
        // Will use fallback values below
      } finally {
        setLoading(false);
      }
    };

    fetchTrustSignalsData();
  }, []);

  // Use CMS data if available, otherwise use fallback values
  const title = trustSignalsData?.title || "Certified Excellence";
  const subtitle = trustSignalsData?.subtitle || "Trusted by healthcare professionals across the UK and Europe";

  return (
    <TrustSignalsComponent
      title={title}
      subtitle={subtitle}
      backgroundColor={backgroundColor}
      textColor={textColor}
      certifications={certifications}
    />
  );
}