import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import BackToTop from '@/components/common/back-to-top';
import ScrollProgress from '@/components/common/scroll-progress';
import Breadcrumb from '@/components/common/breadcrumb';
import TrustSignals from '@/components/common/trust-signals';
import { Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { BrandedIcon } from '@/components/ui/branded-icons';
import { useState, useEffect } from 'react';
import { marked } from 'marked';

// CMS imports
import { websitePoliciesApi } from '@/lib/strapi/api/website-policies';
import { StrapiWebsitePolicy } from '@/lib/strapi/types/website-policy';

export default function Accessibility() {
  const { elementRef: heroRef, isVisible: heroInView } = useIntersectionObserver({ threshold: 0.1 });
  const [policyData, setPolicyData] = useState<StrapiWebsitePolicy | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Accessibility' }
  ];

  // Load policy data from CMS
  useEffect(() => {
    const loadPolicyData = async () => {
      try {
        const data = await websitePoliciesApi.getWebsitePolicyByPageType('accessibility');
        setPolicyData(data);
      } catch (error) {
        console.error('Error loading accessibility policy:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPolicyData();
  }, []);

  // Render rich text content safely
  const renderContent = () => {
    if (policyData?.content) {
      try {
        // Configure marked options for better HTML output
        marked.setOptions({
          breaks: true, // Convert \n to <br>
          gfm: true,    // GitHub Flavored Markdown
        });

        // Convert markdown to HTML
        const htmlContent = marked(policyData.content);

        return (
          <div
            className="prose prose-lg max-w-none space-y-6"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        );
      } catch (error) {
        console.error('Error parsing markdown content:', error);
        // Fallback to plain text if markdown parsing fails
        return (
          <div className="prose prose-lg max-w-none space-y-6">
            <pre className="whitespace-pre-wrap font-sans">{policyData.content}</pre>
          </div>
        );
      }
    }

    // Fallback content if CMS is not available
    return (
      <div className="prose prose-lg max-w-none space-y-6">
        <p className="text-gray-700 leading-relaxed">
          At Compleo Health, we are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
        </p>

        <h3 className="text-2xl font-bold text-compleo-deep-teal mt-8 mb-4">Our Commitment</h3>
        <p className="text-gray-700 leading-relaxed">
          We believe that healthcare services should be accessible to everyone. Our website is designed to be inclusive and user-friendly, following best practices in web accessibility to ensure that all users can access our services and information effectively.
        </p>

        <h3 className="text-2xl font-bold text-compleo-deep-teal mt-8 mb-4">Accessibility Standards</h3>
        <p className="text-gray-700 leading-relaxed">
          This website has been designed to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. These guidelines explain how to make web content more accessible for people with disabilities and user-friendly for everyone.
        </p>

        <h3 className="text-2xl font-bold text-compleo-deep-teal mt-8 mb-4">How We Make Our Website Accessible</h3>
        <p className="text-gray-700 leading-relaxed">
          We have implemented various accessibility features to ensure our website works well for users with different needs:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Clear and logical page structure with proper heading hierarchy</li>
          <li>Descriptive alt text for all images and graphics</li>
          <li>Keyboard navigation support throughout the site</li>
          <li>Sufficient colour contrast ratios for text and backgrounds</li>
          <li>Responsive design that works on various devices and screen sizes</li>
          <li>Clear, descriptive link text that makes sense out of context</li>
          <li>Form labels and error messages that are clearly associated with their inputs</li>
          <li>Skip links to help users navigate quickly to main content</li>
          <li>Focus indicators that are visible when navigating with a keyboard</li>
        </ul>

        <h3 className="text-2xl font-bold text-compleo-deep-teal mt-8 mb-4">Browser and Assistive Technology Support</h3>
        <p className="text-gray-700 leading-relaxed">
          Our website is designed to work with:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Modern web browsers including Chrome, Firefox, Safari, and Edge</li>
          <li>Screen readers such as NVDA, JAWS, and VoiceOver</li>
          <li>Keyboard navigation without requiring a mouse</li>
          <li>Voice recognition software</li>
          <li>Screen magnification software</li>
        </ul>

        <h3 className="text-2xl font-bold text-compleo-deep-teal mt-8 mb-4">Third-Party Content</h3>
        <p className="text-gray-700 leading-relaxed">
          Some content on our website comes from third parties, such as embedded videos or external links. We cannot guarantee the accessibility of third-party content, but we strive to choose accessible alternatives where possible.
        </p>

        <h3 className="text-2xl font-bold text-compleo-deep-teal mt-8 mb-4">Ongoing Improvements</h3>
        <p className="text-gray-700 leading-relaxed">
          We regularly review and test our website for accessibility issues. As we continue to develop new features and content, we ensure that accessibility remains a priority throughout the design and development process.
        </p>

        <h3 className="text-2xl font-bold text-compleo-deep-teal mt-8 mb-4">Alternative Access Methods</h3>
        <p className="text-gray-700 leading-relaxed">
          If you encounter difficulties accessing any part of our website, we offer alternative ways to access our services:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Contact us by phone at +44 (0)161 884 1303</li>
          <li>Email us at info@compleohealth.com</li>
          <li>Visit our Manchester office at Beehive Mill, Jersey Street, Manchester M4 6JG</li>
        </ul>

        <h3 className="text-2xl font-bold text-compleo-deep-teal mt-8 mb-4">Reporting Accessibility Issues</h3>
        <p className="text-gray-700 leading-relaxed">
          We welcome feedback about the accessibility of our website. If you encounter any barriers or have suggestions for improvement, please contact us:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Email: info@compleohealth.com</li>
          <li>Phone: +44 (0)161 884 1303</li>
          <li>Post: Compleo Health Ltd, Beehive Mill, Jersey Street, Manchester M4 6JG</li>
        </ul>

        <p className="text-gray-700 leading-relaxed">
          When reporting accessibility issues, please include:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>The web page URL where you encountered the issue</li>
          <li>A description of the problem you experienced</li>
          <li>The browser and assistive technology you were using</li>
          <li>Your contact information so we can follow up with you</li>
        </ul>

        <p className="text-gray-700 leading-relaxed">
          We aim to respond to accessibility feedback within 5 working days and will work with you to resolve any issues as quickly as possible.
        </p>

        <h3 className="text-2xl font-bold text-compleo-deep-teal mt-8 mb-4">Enforcement and Complaints</h3>
        <p className="text-gray-700 leading-relaxed">
          If you are not satisfied with our response to your accessibility concern, you can contact the Equality and Human Rights Commission (EHRC) or, in Northern Ireland, the Equality Commission for Northern Ireland (ECNI).
        </p>

        <h3 className="text-2xl font-bold text-compleo-deep-teal mt-8 mb-4">Technical Specifications</h3>
        <p className="text-gray-700 leading-relaxed">
          This website's accessibility relies on the following technologies:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>HTML5 for semantic markup</li>
          <li>CSS3 for styling and layout</li>
          <li>JavaScript for interactive features</li>
          <li>ARIA (Accessible Rich Internet Applications) attributes where appropriate</li>
        </ul>

        <p className="text-gray-700 leading-relaxed">
          These technologies are relied upon for conformance with the accessibility standards used. Changes to these technologies may impact the accessibility of the website.
        </p>

        <h3 className="text-2xl font-bold text-compleo-deep-teal mt-8 mb-4">Assessment and Testing</h3>
        <p className="text-gray-700 leading-relaxed">
          This website has been assessed using a combination of automated testing tools and manual evaluation methods. We conduct regular accessibility audits and testing with assistive technologies to ensure ongoing compliance.
        </p>

        <p className="text-gray-700 leading-relaxed">
          This statement was prepared and last reviewed in July 2025. We review our accessibility statement annually and update it as needed to reflect changes to our website and accessibility improvements.
        </p>

        <p className="text-gray-700 leading-relaxed">
          For more information about web accessibility, visit the <a href="https://www.w3.org/WAI/" target="_blank" rel="noopener noreferrer" className="text-compleo-teal hover:text-compleo-deep-teal underline">Web Accessibility Initiative (WAI)</a> website.
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <Header />
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="bg-compleo-deep-teal text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <BrandedIcon icon={Eye} variant="primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {policyData?.title || 'Accessibility Statement'}
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Last updated: {policyData?.lastUpdated ? new Date(policyData.lastUpdated).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : 'July 2025'}
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="bg-white shadow-xl border-2 border-gray-100">
            <CardContent className="p-8">
              {renderContent()}
            </CardContent>
          </Card>
        </div>

        {/* Trust Signals Section */}
        <TrustSignals />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}