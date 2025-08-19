import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import BackToTop from '@/components/common/back-to-top';
import ScrollProgress from '@/components/common/scroll-progress';
import Breadcrumb from '@/components/common/breadcrumb';
import TrustSignals from '@/components/common/trust-signals';
import { FileText, Download, ExternalLink, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { BrandedIcon } from '@/components/ui/branded-icons';


import { useState, useEffect } from 'react';

interface PolicyDocument {
  name: string;
  filename: string;
  description: string;
  lastUpdated: string;
  size?: string;
  webPageRoute?: string; // For pages that have web content
  hasWebContent?: boolean;
}

export default function PoliciesPage() {
  const { elementRef: heroRef, isVisible: heroInView } = useIntersectionObserver({ threshold: 0.1 });
  const [policyDocuments, setPolicyDocuments] = useState<PolicyDocument[]>([]);



  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Policy Documents' }
  ];

  // Load policy documents from the policies folder
  useEffect(() => {
    const loadPolicyDocuments = async () => {
      try {
        // Check for available policy documents in the public/policies folder
        const availablePolicies: PolicyDocument[] = [
          {
            name: 'Corporate Social Responsibility',
            filename: 'csr-policy.pdf',
            description: 'Our commitment to making a positive social and economic contribution to healthcare',
            lastUpdated: 'April 2024',
            size: '245 KB',
            hasWebContent: false
          },
          {
            name: 'Carbon Reduction Plan',
            filename: 'carbon-reduction-plan-2024.pdf',
            description: 'Our strategy and commitments to achieve Net Zero carbon emissions',
            lastUpdated: 'July 2024',
            size: '485 KB',
            hasWebContent: false
          },
          {
            name: 'Modern Slavery Statement',
            filename: 'anti-slavery-statement-may-2025.pdf',
            description: 'Our commitment to preventing modern slavery in our operations and supply chain',
            lastUpdated: 'May 2025',
            size: '224 KB',
            hasWebContent: false
          }
        ];

        setPolicyDocuments(availablePolicies);
      } catch (error) {
        console.error('Error loading policy documents:', error);
      }
    };

    loadPolicyDocuments();
  }, []);

  const handlePolicyDownload = (filename: string) => {
    // Handle PDF download from public/policies folder
    const link = document.createElement('a');
    link.href = `/policies/${filename}`;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
                <BrandedIcon icon={FileText} variant="primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Policy Documents
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Access our comprehensive policy documentation and governance statements
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Policy Documents Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-compleo-deep-teal mb-4">
              Available Policy Documents
            </h2>
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {policyDocuments.map((policy, index) => (
              <Card 
                key={index} 
                className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-compleo-teal/20 group cursor-pointer h-full"
                onClick={() => window.open(`/policies/${policy.filename}`, '_blank')}
              >
                <CardContent className="p-8 flex flex-col h-full">
                  {/* Icon Header */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-compleo-teal to-compleo-deep-teal rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-compleo-deep-teal mb-4 group-hover:text-compleo-teal transition-colors">
                      {policy.name}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                      {policy.description}
                    </p>

                    {/* Document Info */}
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>Last Updated:</span>
                        <span className="font-medium">{policy.lastUpdated}</span>
                      </div>
                      {policy.size && (
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <span>File Size:</span>
                          <span className="font-medium">{policy.size}</span>
                        </div>
                      )}
                    </div>

                    {/* Click to View indicator */}
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 text-compleo-teal group-hover:text-compleo-deep-teal transition-colors">
                        <Eye className="h-5 w-5" />
                        <span className="font-medium">Click to open PDF</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Information Section */}
          <div className="mt-16 bg-gray-50 p-8 rounded-2xl">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-compleo-deep-teal mb-4">
                Document Management
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-compleo-teal rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-bold text-compleo-deep-teal mb-2">Regular Updates</h4>
                <p className="text-gray-600">
                  All policy documents are reviewed annually and updated to reflect current best practices and regulatory requirements.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-compleo-teal rounded-full flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-bold text-compleo-deep-teal mb-2">Accessible Format</h4>
                <p className="text-gray-600">
                  Documents are provided in PDF format for easy viewing, printing, and sharing across all devices and platforms.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        <TrustSignals />
      </main>
      <Footer />
      <BackToTop />


    </div>
  );
}