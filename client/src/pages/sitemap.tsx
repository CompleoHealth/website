import { Link } from 'wouter';
import { FileText, Building2, Users, Shield } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import BackToTop from '@/components/common/back-to-top';
import ScrollProgress from '@/components/common/scroll-progress';

export default function SitemapPage() {
  const sitemapSections = [
    {
      title: 'Main Pages',
      icon: <FileText className="w-5 h-5" />,
      links: [
        { name: 'Home', href: '/', description: 'Main landing page with company overview' },
        { name: 'Services', href: '/services', description: 'Complete overview of our healthcare services' },
        { name: 'Equipment Details', href: '/equipment-details', description: 'Medical imaging equipment showcase and mobile units' },
        { name: 'Contact', href: '/contact', description: 'Get in touch with our team' },
      ],
    },
    {
      title: 'Services',
      icon: <Building2 className="w-5 h-5" />,
      links: [
        { name: 'Managed Equipment Services', href: '/services/managed-equipment', description: 'Comprehensive equipment management solutions' },
        { name: 'Equipment Rentals', href: '/services/equipment-rental', description: 'Flexible medical equipment rental options' },
        { name: 'Clinical Insourcing', href: '/services/clinical-insourcing', description: 'Professional clinical staffing solutions' },

        { name: 'Community Diagnostic Centres', href: '/services/community-diagnostic-centres', description: 'Local diagnostic imaging services' },
        { name: 'Screening Programs', href: '/services/screening-programmes', description: 'Comprehensive health screening services' },
      ],
    },
    {
      title: 'Company',
      icon: <Users className="w-5 h-5" />,
      links: [
        { name: 'About Us', href: '/about', description: 'Learn about Compleo Health and our mission' },
        { name: 'Our Team', href: '/our-team', description: 'Meet our leadership and expert team' },
        { name: 'Careers', href: '/work-with-us', description: 'Join our growing healthcare team' },
        { name: 'Sustainability', href: '/sustainability', description: 'Our commitment to environmental responsibility' },
        { name: 'News & Views', href: '/news-and-views', description: 'Latest healthcare industry insights' },
        { name: 'Case Studies', href: '/case-studies', description: 'Success stories from our partnerships' },
      ],
    },
    {
      title: 'Legal & Compliance',
      icon: <Shield className="w-5 h-5" />,
      links: [
        { name: 'Privacy Policy', href: '/privacy-policy', description: 'How we protect your personal information' },
        { name: 'Cookie Policy', href: '/cookie-policy', description: 'Information about cookies and tracking' },
        { name: 'Policy Documents', href: '/policies', description: 'CSR, Modern Slavery Statement, and Carbon Reduction Plan' },
        { name: 'Accessibility Statement', href: '/accessibility', description: 'Our commitment to digital accessibility and inclusion' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <Header />
      <main id="main-content">
        {/* Header */}
        <div className="bg-compleo-deep-teal text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Site Map
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Navigate through all pages and sections of the Compleo Health website
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {sitemapSections.map((section) => (
            <div key={section.title} className="bg-white rounded-xl shadow-xl border-2 border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-compleo-teal to-compleo-deep-teal text-white p-6">
                <div className="flex items-center gap-3">
                  {section.icon}
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {section.links.map((link) => (
                    <Link key={link.name} href={link.href}>
                      <div className="group p-4 rounded-lg border border-gray-200 hover:border-compleo-teal hover:bg-compleo-teal/5 transition-all duration-300 cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-compleo-deep-teal group-hover:text-compleo-teal transition-colors">
                              {link.name}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                              {link.description}
                            </p>
                          </div>
                          <FileText className="w-4 h-4 text-gray-400 group-hover:text-compleo-teal transition-colors flex-shrink-0 ml-2" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}