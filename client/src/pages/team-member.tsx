import { useParams } from 'wouter';
import { Link } from 'wouter';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import BackToTop from '@/components/common/back-to-top';
import ScrollProgress from '@/components/common/scroll-progress';
import TrustSignals from '@/components/common/trust-signals';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Linkedin } from 'lucide-react';
import { getTeamMemberById, TEAM_MEMBERS } from '@/../../shared/team-data';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

export default function TeamMember() {
  const { id } = useParams();
  const member = getTeamMemberById(id || '');
  const { elementRef, shouldAnimate } = useIntersectionObserver();

  if (!member) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ScrollProgress />
        <Header />
        <main className="pt-24 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-compleo-deep-teal mb-4">Team Member Not Found</h1>
            <p className="text-gray-600 mb-8">The team member you're looking for doesn't exist.</p>
            <Link href="/our-team">
              <Button>Return to Our Team</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollProgress />
      <Header />
      
      <main className="pt-24">
        {/* Breadcrumb */}
        <section className="py-6 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-compleo-teal transition-colors">Home</Link>
              <span>/</span>
              <Link href="/about" className="hover:text-compleo-teal transition-colors">About</Link>
              <span>/</span>
              <span className="text-compleo-deep-teal font-medium">{member.name}, {member.role}</span>
            </div>
          </div>
        </section>

        {/* Hero Section - Member Highlight */}
        <section className="py-16 bg-gradient-to-br from-compleo-deep-teal via-compleo-teal to-compleo-deep-teal text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12 items-start">
              <div className="lg:col-span-1">
                <div className="relative text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full max-w-sm object-cover rounded-2xl shadow-2xl mx-auto"
                  />
                  {/* LinkedIn Button */}
                  <div className="mt-6">
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-br from-[#0077B5] via-[#0077B5] to-[#0077B5] hover:bg-gradient-to-br hover:from-[#005885] hover:via-[#005885] hover:to-[#005885] text-white font-bold px-4 py-2 rounded-xl shadow-xl hover:shadow-2xl border-2 border-white/40 hover:border-white/60 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                      onClick={() => window.open(member.linkedin, '_blank')}
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      Connect on LinkedIn
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <div className="text-center mb-8">
                  <h2 className="text-2xl text-compleo-yellow mb-4">Meet our {member.role}</h2>
                  <h3 className="text-3xl font-bold mb-6">{member.name}</h3>
                </div>
                
                <div className="prose prose-lg max-w-none text-gray-200 leading-relaxed">
                  {member.bio ? (
                    member.bio.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-lg mb-6">{paragraph}</p>
                    ))
                  ) : (
                    <p className="text-lg mb-6">{member.summary}</p>
                  )}
                </div>
                

              </div>
            </div>
          </div>
        </section>

        {/* Our leadership team */}
        <section className="section-padding bg-gray-100">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="text-center mb-16">
              <h2 className="heading-2 text-compleo-deep-teal mb-6">
                Our leadership team
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TEAM_MEMBERS.map((leader, index) => (
                <Link key={index} href={`/team-member/${leader.id}`}>
                  <Card className={`hover-lift overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 ${leader.id === member.id ? 'ring-2 ring-compleo-teal shadow-lg' : ''}`}>
                    <CardContent className="p-0">
                      <div className="relative">
                        <img 
                          src={leader.image}
                          alt={leader.name}
                          className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                          <h3 className="text-xl font-bold text-white group-hover:text-compleo-yellow transition-colors duration-300">{leader.name}</h3>
                          <p className="text-gray-200 group-hover:text-white transition-colors duration-300">{leader.role}</p>
                          {leader.id === member.id && (
                            <div className="absolute top-2 right-2 bg-compleo-yellow text-compleo-deep-teal px-2 py-1 rounded-full text-xs font-medium">
                              Current
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
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