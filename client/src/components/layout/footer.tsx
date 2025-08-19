import { Link } from 'wouter';
import { Linkedin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { globalSettingsApi } from '../../lib/strapi/api';
import { StrapiFooter } from '../../lib/strapi/types';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [footerContent, setFooterContent] = useState<StrapiFooter | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFooterContent = async () => {
      try {
        const data = await globalSettingsApi.getFooter();
        setFooterContent(data);

      } catch (error) {
        console.error('Failed to fetch footer content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterContent();
  }, []);

  const footerSections = [
    {
      title: 'Services',
      links: [
        { name: 'Managed Equipment Services', href: '/services/managed-equipment' },
        { name: 'Equipment Rental', href: '/services/equipment-rental' },
        { name: 'Community Diagnostics', href: '/services/community-diagnostic-centres' },
        { name: 'Screening Programmes', href: '/services/screening-programmes' },
        { name: 'Clinical Insourcing', href: '/services/clinical-insourcing' },
      ],
    },

    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Team', href: '/our-team' },
        { name: 'Careers', href: '/work-with-us' },
        { name: 'Sustainability', href: '/sustainability' },
        { name: 'News and Views', href: '/news-and-views' },
        { name: 'Case Studies', href: '/case-studies' },
      ],
    },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
    { name: 'Policies', href: '/policies' },
    { name: 'Sitemap', href: '/sitemap' },
    { name: 'Accessibility', href: '/accessibility' },
  ];

  return (
    <footer className="bg-compleo-deep-teal text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="h-12 flex items-end mb-2">
              <img 
                src="/images/shared/logo-main.png" 
                alt="Compleo Health" 
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
            <div className="w-full h-0.5 bg-gradient-to-r from-compleo-yellow to-compleo-teal rounded-full mb-4"></div>
            <p className="text-gray-300 mb-6">
              {loading ? "Loading..." : footerContent?.companyDescription || "Experts in diagnostic imaging, delivering innovative solutions with passion, precision, and integrity."}
            </p>
            <div className="text-sm text-gray-400">
              <div>{loading ? "Loading..." : footerContent?.companyNumber || "Company No: 13226032"}</div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <div className="h-12 flex items-end mb-2">
                <h4 className="text-lg font-bold text-compleo-yellow">
                  {section.title}
                </h4>
              </div>
              <div className="w-full h-0.5 bg-gradient-to-r from-compleo-yellow to-compleo-teal rounded-full mb-4"></div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-300">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <span className="hover:text-compleo-yellow transition-colors cursor-pointer">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="text-gray-400 text-sm">
                © {currentYear} Compleo Health. All rights reserved.
              </div>
              
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              {legalLinks.map((link) => (
                <Link key={link.name} href={link.href} className="hover:text-compleo-yellow transition-colors cursor-pointer">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
