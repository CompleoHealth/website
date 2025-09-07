import { useParams } from 'wouter';
import caseStudiesData from '@/../../shared/data/case-studies.json';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import BackToTop from '@/components/common/back-to-top';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  MapPin, 
  Calendar, 
  ArrowLeft, 
  Quote, 
  CheckCircle,
  Target,
  TrendingUp,
  Users
} from 'lucide-react';
import { Link } from 'wouter';

export default function CaseStudy() {
  const params = useParams();
  const caseStudy = caseStudiesData.caseStudies.find(study => study.id === params.id as string);

  // Redirect NHS Devon case study back to case studies page (quote only)
  if (params.id === 'nhs-devon') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="text-4xl font-bold text-compleo-deep-teal mb-6">
              Quote Only Available
            </h1>
            <p className="text-xl text-compleo-gray mb-8">
              The NHS Devon case study contains testimonial content only. Please view it on the main case studies page.
            </p>
            <Link href="/case-studies">
              <Button className="bg-compleo-teal hover:bg-compleo-teal/90 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Case Studies
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="text-4xl font-bold text-compleo-deep-teal mb-6">
              Case Study Not Found
            </h1>
            <p className="text-xl text-compleo-gray mb-8">
              The case study you're looking for doesn't exist or has been moved.
            </p>
            <Link href="/case-studies">
              <Button className="bg-compleo-teal hover:bg-compleo-teal/90 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Case Studies
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20">
        {/* Breadcrumb */}
        <section className="py-4 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-compleo-gray hover:text-compleo-teal">
                Home
              </Link>
              <span className="text-compleo-gray">/</span>
              <Link href="/case-studies" className="text-compleo-gray hover:text-compleo-teal">
                Case Studies
              </Link>
              <span className="text-compleo-gray">/</span>
              <span className="text-compleo-deep-teal font-medium">
                {caseStudy.trustName}
              </span>
            </nav>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-compleo-deep-teal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="bg-compleo-teal text-white mb-4">
                  {caseStudy.category}
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                  {caseStudy.title}
                </h1>
                {caseStudy.subtitle && (
                  <p className="text-xl text-gray-200 mb-6">
                    {caseStudy.subtitle}
                  </p>
                )}
                <div className="space-y-3 text-gray-200">
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-compleo-teal" />
                    <span>{caseStudy.trustName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-compleo-teal" />
                    <span>{caseStudy.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-compleo-teal" />
                    <span>{caseStudy.projectDuration || new Date(caseStudy.date).toLocaleDateString('en-GB')}</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={caseStudy.image} 
                  alt={caseStudy.title}
                  className="rounded-lg shadow-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-compleo-deep-teal mb-6">
              Project Overview
            </h2>
            <p className="text-lg text-compleo-gray leading-relaxed">
              {caseStudy.summary}
            </p>
          </div>
        </section>

        {/* Key Metrics */}
        {caseStudy.keyMetrics && (
          <section className="py-16 bg-[#ffffff]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-compleo-deep-teal mb-12 text-center">
                Key Project Details
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {caseStudy.keyMetrics.map((metric, index) => (
                  <Card key={index} className="text-center bg-white">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-compleo-teal rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-compleo-deep-teal mb-2">
                        {metric.label}
                      </h3>
                      <p className="text-compleo-gray font-medium">
                        {metric.value}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        

        {/* Testimonial */}
        <section className="py-16 bg-compleo-deep-teal">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <Quote className="h-12 w-12 text-compleo-teal mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Client Testimonial
              </h2>
            </div>
            <Card className="bg-white">
              <CardContent className="p-8">
                <div className="prose max-w-none">
                  {caseStudy.testimonialContent.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-compleo-gray mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-compleo-teal rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-compleo-deep-teal">
                        {caseStudy.testimonialAuthor}
                      </h4>
                      <p className="text-compleo-gray">
                        {caseStudy.testimonialRole}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Back to Case Studies */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link href="/case-studies">
              <Button className="bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal hover:from-compleo-teal/90 hover:via-compleo-teal/90 hover:to-compleo-deep-teal/90 text-white font-bold px-8 py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-white/40 hover:border-white/60 backdrop-blur-sm transition-all duration-300 hover:scale-105">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Case Studies
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}