import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import BackToTop from '@/components/common/back-to-top';
import ScrollProgress from '@/components/common/scroll-progress';
import Breadcrumb from '@/components/common/breadcrumb';
import TrustSignals from '@/components/common/trust-signals';
import { Cookie, Database } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { BrandedIcon } from '@/components/ui/branded-icons';
import { useState, useEffect } from 'react';
import { marked } from 'marked';

// CMS imports
import { websitePoliciesApi } from '@/lib/strapi/api/website-policies';
import { StrapiWebsitePolicy } from '@/lib/strapi/types/website-policy';

export default function CookiePolicy() {
  const { elementRef: heroRef, isVisible: heroInView } = useIntersectionObserver({ threshold: 0.1 });
  const [policyData, setPolicyData] = useState<StrapiWebsitePolicy | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Cookie Policy' }
  ];

  // Load policy data from CMS
  useEffect(() => {
    const loadPolicyData = async () => {
      try {
        const data = await websitePoliciesApi.getWebsitePolicyByPageType('cookie-policy');
        setPolicyData(data);
      } catch (error) {
        console.error('Error loading cookie policy:', error);
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
        <h3 className="text-2xl font-bold text-compleo-deep-teal mt-8 mb-4">What Are Cookies?</h3>
        <p className="text-gray-700 leading-relaxed">
          Cookies are small data files stored on your computer, tablet, or smartphone. They help enhance your browsing experience by remembering your preferences and activities. Cookies are not harmful programs and cannot contain viruses or malicious software.
        </p>

        <h3 className="text-2xl font-bold text-compleo-deep-teal mt-8 mb-4">Why We Use Cookies</h3>
        <p className="text-gray-700 leading-relaxed">
          Cookies are essential for the basic functionality of our website. They also help us understand how visitors interact with the site, enabling us to continuously improve its performance, layout, and content. In addition, cookies allow us to tailor our advertising on other platforms and display the most relevant content based on your interests.
        </p>

        <h3 className="text-2xl font-bold text-compleo-deep-teal mt-8 mb-4">How Long Are Cookies Stored?</h3>
        <p className="text-gray-700 leading-relaxed">
          The duration cookies remain on your device varies. Some are deleted automatically when you close your browser (session cookies), while others remain for a set period or until manually deleted (persistent cookies). Their lifespan is typically based on your most recent visit to the site.
        </p>

        <h3 className="text-2xl font-bold text-compleo-deep-teal mt-8 mb-4">Managing Cookies</h3>
        <p className="text-gray-700 leading-relaxed">
          You can manage or disable cookies through your browser settings. Please note that disabling cookies may impact your experience on the site, as some features rely on cookies to function properly. Where you find these settings depends on your browser – refer to your browser's help section for guidance.
        </p>

        <h3 className="text-2xl font-bold text-compleo-deep-teal mt-8 mb-4">Types of Cookies We Use</h3>

        <h4 className="text-xl font-semibold text-compleo-deep-teal mt-6 mb-3">1. Form-related Cookies</h4>
        <p className="text-gray-700 leading-relaxed">
          When you submit information via forms (e.g., contact forms or comment fields), cookies may be set to remember your details for future use.
        </p>


        <h4 className="text-xl font-semibold text-compleo-deep-teal mt-6 mb-3">2. Site Preference Cookies</h4>
        <p className="text-gray-700 leading-relaxed">
          We use cookies to remember your preferences (e.g., language or layout choices) to enhance your experience. These help us deliver a personalised experience the next time you visit.
        </p>

        <h4 className="text-xl font-semibold text-compleo-deep-teal mt-6 mb-3">3. Third-party Cookies</h4>
        <p className="text-gray-700 leading-relaxed">
          We use third-party services, including:
        </p>
        <p className="text-gray-700 leading-relaxed">
          <strong>Google Analytics:</strong> This widely-used analytics tool helps us understand how you use the site – such as time spent on pages, navigation patterns, and interaction levels – so we can optimise performance and user experience. For more information, please visit the official Google Analytics page.
        </p>

        <h3 className="text-2xl font-bold text-compleo-deep-teal mt-8 mb-4">Need More Information?</h3>
        <p className="text-gray-700 leading-relaxed">
          We hope this policy has clarified how and why we use cookies. If you have any further questions or concerns, please feel free to contact us at:
        </p>
        <p className="text-gray-700 leading-relaxed">
          📧 info@compleohealth.com
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
                <BrandedIcon icon={Cookie} variant="primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {policyData?.title || 'Cookie Policy'}
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

        {/* Manage Your Data Section - Outside CMS Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <Card className="bg-gradient-to-br from-compleo-teal/5 via-compleo-teal/5 to-compleo-deep-teal/10 shadow-lg border-2 border-compleo-teal/20">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <BrandedIcon icon={Database} variant="primary" />
              </div>
              <h3 className="text-2xl font-bold text-compleo-deep-teal mb-4">Manage Your Data</h3>
              <p className="text-gray-700 leading-relaxed mb-6 max-w-2xl mx-auto">
                You have full control over your data stored by our website. Use our data management tool to view, export, or delete information we store locally in your browser.
              </p>
              <a
                href="/manage-cookies"
                className="bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal hover:bg-gradient-to-br hover:from-compleo-deep-teal hover:via-compleo-deep-teal hover:to-compleo-deep-teal text-white font-bold px-8 py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-compleo-teal/40 hover:border-compleo-teal/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
              >
                <Database className="w-5 h-5" />
                Manage Your Data
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Trust Signals */}
        <TrustSignals />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}