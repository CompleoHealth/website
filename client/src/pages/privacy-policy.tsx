import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import BackToTop from '@/components/common/back-to-top';
import ScrollProgress from '@/components/common/scroll-progress';
import Breadcrumb from '@/components/common/breadcrumb';
import TrustSignals from '@/components/common/trust-signals';
import { Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { BrandedIcon } from '@/components/ui/branded-icons';

export default function PrivacyPolicy() {
  const { elementRef: heroRef, isVisible: heroInView } = useIntersectionObserver({ threshold: 0.1 });

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Privacy Policy' }
  ];

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
                <BrandedIcon icon={Shield} variant="primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Privacy Policy
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Last updated: July 2025
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
              <div className="prose prose-lg max-w-none space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  At Compleo Health, your privacy is a priority. This Privacy Policy explains how we collect, use, store, and protect your personal data when you interact with us through our website. It also outlines your rights under UK data protection law.
                </p>
                
                <p className="text-gray-700 leading-relaxed">
                  For transparency, we have structured this policy into the following sections:
                </p>
                
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Contact Details</li>
                  <li>The Personal Data We Collect</li>
                  <li>Why We Collect Your Personal Data</li>
                  <li>How We Protect Your Personal Data</li>
                  <li>Sharing of Your Personal Data</li>
                  <li>Your Rights</li>
                  <li>Data Retention</li>
                  <li>Updates to This Policy</li>
                </ul>

                <h3 className="text-2xl font-bold text-compleo-deep-teal mt-8 mb-4">Contact Details</h3>
                <p className="text-gray-700 leading-relaxed">
                  Compleo Health Ltd 2Aiii at Beehive Mill Jersey Street Manchester, M4 6JG United Kingdom
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Company registration number: 13226032<br />
                  📧 Email: info@compleohealth.com
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Compleo Health is a healthcare services provider specialising in the recruitment of healthcare professionals, interim staffing, and managed equipment services. If you have any questions about this Privacy Policy or how we handle your personal data, please contact us via the email above.
                </p>

                <h3 className="text-2xl font-bold text-compleo-deep-teal mt-8 mb-4">The Personal Data We Collect</h3>
                <p className="text-gray-700 leading-relaxed">
                  When you visit our website or contact us through online forms, we may collect personal information such as:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>IP address</li>
                  <li>Location data</li>
                  <li>Any other information you voluntarily provide</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  This information is collected to identify you and to deliver services or respond to your enquiries. We only collect data that is necessary for the intended purpose.
                </p>

                <h4 className="text-xl font-semibold text-compleo-deep-teal mt-6 mb-3">Important Information for Young Users</h4>
                <p className="text-gray-700 leading-relaxed">
                  If you are aged between 13 and 18, we recommend that you speak with a parent or guardian before submitting any personal data. We also encourage families to read this Privacy Policy together to ensure it is understood.
                </p>

                <h3 className="text-2xl font-bold text-compleo-deep-teal mt-8 mb-4">Why We Collect Your Personal Data</h3>
                <p className="text-gray-700 leading-relaxed">
                  We may process your personal data for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>To contact you if you have submitted an enquiry or request</li>
                  <li>With your consent, to send you updates or marketing communications</li>
                  <li>To comply with legal and regulatory requirements</li>
                  <li>For internal operations, quality assurance, audits, and staff training</li>
                  <li>In response to inspections by relevant authorities</li>
                </ul>

                <h3 className="text-2xl font-bold text-compleo-deep-teal mt-8 mb-4">How We Protect Your Personal Data</h3>
                <p className="text-gray-700 leading-relaxed">
                  Your personal data is protected by both our internal policies and applicable law. Compleo Health complies with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We apply appropriate technical, organisational, and administrative safeguards to reduce the risk of unauthorised access, misuse, loss, or disclosure of personal data. Access to your data is restricted to authorised personnel only.
                </p>

                <h3 className="text-2xl font-bold text-compleo-deep-teal mt-8 mb-4">Sharing of Your Personal Data</h3>
                <p className="text-gray-700 leading-relaxed">
                  We may share your data with trusted third-party service providers who support us in delivering our services, such as:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>IT and web hosting providers</li>
                  <li>Customer support providers</li>
                  <li>Communication and analytics platforms</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  These partners only process your data on our behalf and in accordance with this Privacy Policy. They are not permitted to use your data for their own purposes.
                </p>

                <h3 className="text-2xl font-bold text-compleo-deep-teal mt-8 mb-4">Your Rights Under Data Protection Law</h3>
                <p className="text-gray-700 leading-relaxed">
                  Depending on the lawful basis for processing and the specific context, you may have the following rights:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Right of Access</strong> – to request a copy of your personal data</li>
                  <li><strong>Right to Rectification</strong> – to correct inaccurate or incomplete data</li>
                  <li><strong>Right to Erasure</strong> – to request deletion of your personal data in certain circumstances</li>
                  <li><strong>Right to Restrict Processing</strong> – to limit how we use your data</li>
                  <li><strong>Right to Withdraw Consent</strong> – to withdraw previously given consent</li>
                  <li><strong>Right to Data Portability</strong> – to request your data be transferred to another organisation</li>
                  <li><strong>Right to Object</strong> – to object to certain forms of processing</li>
                </ul>

                <h4 className="text-xl font-semibold text-compleo-deep-teal mt-6 mb-3">Right to Complaint</h4>
                <p className="text-gray-700 leading-relaxed">
                  If you are unhappy with how we have handled your data, you have the right to lodge a complaint with the UK Information Commissioner's Office (ICO):<br />
                  📍 Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF<br />
                  📞 Tel: 0303 123 1113<br />
                  🌐 www.ico.org.uk
                </p>

                <h4 className="text-xl font-semibold text-compleo-deep-teal mt-6 mb-3">How to Exercise Your Rights</h4>
                <p className="text-gray-700 leading-relaxed">
                  To exercise any of your rights, please contact us at info@compleohealth.com. We may request further information to confirm your identity before processing your request.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Please note that in some cases, we may be legally entitled to decline your request. Where requests are manifestly unfounded, repetitive, or excessive, we reserve the right to charge a reasonable fee or refuse to act.
                </p>

                <h3 className="text-2xl font-bold text-compleo-deep-teal mt-8 mb-4">Data Retention</h3>
                <p className="text-gray-700 leading-relaxed">
                  We retain your personal data only for as long as necessary to fulfil the purposes set out in this Privacy Policy, unless a longer retention period is required by law. We regularly review the data we hold and delete or anonymise information when it is no longer needed.
                </p>

                <h3 className="text-2xl font-bold text-compleo-deep-teal mt-8 mb-4">Updates to This Policy</h3>
                <p className="text-gray-700 leading-relaxed">
                  We are committed to ensuring our privacy practices remain up to date and in compliance with legal requirements. This Privacy Policy may be revised periodically without prior notice. We encourage you to review it regularly to stay informed about how we protect your data.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about this Privacy Policy or the way we handle your personal information, please contact us at info@compleohealth.com.
                </p>
              </div>
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