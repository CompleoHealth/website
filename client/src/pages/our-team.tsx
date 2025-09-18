import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import BackToTop from '@/components/common/back-to-top';
import ScrollProgress from '@/components/common/scroll-progress';
import TrustSignals from '@/components/common/trust-signals';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link, useLocation } from 'wouter';
import { MessageSquare, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

// CMS imports
import { ourTeamApi } from '@/lib/strapi/api/our-team';
import { globalSettingsApi } from '@/lib/strapi/api/global-settings';
import { teamApi } from '@/lib/strapi/api/team';
import { StrapiOurTeamPage } from '@/lib/strapi/types/our-team';
import { StrapiGlobalSettings } from '@/lib/strapi/types/global-settings';
import { CMSTeamMember } from '@/lib/strapi/types/team';
import { STRAPI_URL } from '@/lib/strapi/api/config';

// Import team data (stays as operational data)
import { TEAM_MEMBERS } from '@/../../shared/team-data';

export default function OurTeam() {
  // CMS State Management (following proven pattern)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageData, setPageData] = useState<StrapiOurTeamPage | null>(null);
  const [globalSettings, setGlobalSettings] = useState<StrapiGlobalSettings | null>(null);
  const [cmsTeamMembers, setCmsTeamMembers] = useState<CMSTeamMember[] | null>(null);
  const [, setLocation] = useLocation();

  const leadership = cmsTeamMembers && cmsTeamMembers.length > 0 ? cmsTeamMembers : TEAM_MEMBERS;

  // Fetch CMS data (following proven pattern from about.tsx)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Parallel API calls for page data, global settings, and team members
        const [ourTeamPageData, globalSettingsData, teamMembersData] = await Promise.all([
          ourTeamApi.getOurTeamPage(),
          globalSettingsApi.getGlobalSettings(),
          teamApi.getTeamMembers()
        ]);
        

        setPageData(ourTeamPageData as any); // Type assertion for flexibility
        setGlobalSettings(globalSettingsData);
        setCmsTeamMembers(teamMembersData);
        setIsLoading(false);
      } catch (err) {
        // Error fetching Our Team CMS data - failing silently in production
        setError('Failed to load page content');
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Loading state (proven pattern)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
        {/* Large Compleo Logo Watermark */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img 
            src="/images/shared/logo-loading.png" 
            alt="Compleo Health Logo" 
            className="w-[768px] h-auto max-w-[70vw] max-h-[40vh] object-contain animate-logo-grow"
          />
        </div>
        {/* Loading Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-compleo-teal relative z-10 mb-6"></div>
        <p className="text-compleo-gray text-lg font-medium relative z-10">Loading Our Team...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Page</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-compleo-teal text-white rounded hover:bg-compleo-deep-teal"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollProgress />
      <Header />
      <main id="main-content" className="animate-fade-in-up">
        {/* Hero Section - Standard Centered */}
        <section className="relative bg-gradient-to-br from-compleo-deep-teal via-compleo-deep-teal to-slate-800 text-white py-20 lg:py-24">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in-up">
              <h1 className="heading-1 mb-6">
                {pageData?.Hero?.title || "Our Team"}
              </h1>
              <p className="body-large text-gray-300 mb-12 max-w-3xl mx-auto">
                {pageData?.Hero?.subtitle || "Meet the passionate professionals driving healthcare innovation and excellence across the UK."}
              </p>
              <div className="flex flex-row gap-3 sm:gap-6 justify-center">
                <Link href="/work-with-us" tabIndex={-1}>
                  <Button
                    size="lg"
                    className="group relative bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal hover:from-compleo-teal/90 hover:via-compleo-teal/90 hover:to-compleo-deep-teal/90 text-white px-4 sm:px-8 py-4 sm:py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-white/40 hover:border-white/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 w-36 sm:w-48 h-auto"
                    onClick={() => setLocation('/work-with-us')}
                  >
                    <div className="flex flex-col items-center gap-1 sm:gap-1.5">
                      <div className="bg-white/20 rounded-full p-1">
                        <Users className="h-4 w-4 sm:h-5 sm:w-5 group-hover:pulse transition-transform duration-300" />
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-sm sm:text-base font-semibold tracking-wider">WORK</span>
                        <span className="text-xs font-medium opacity-90">with us</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Button>
                </Link>
                <Link href="/contact" tabIndex={-1}>
                  <Button
                    size="lg"
                    className="group bg-compleo-yellow hover:bg-compleo-yellow/90 text-compleo-deep-teal px-4 sm:px-8 py-4 sm:py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-compleo-deep-teal/30 hover:border-compleo-deep-teal/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 w-36 sm:w-48 h-auto"
                    onClick={() => setLocation('/contact')}
                  >
                    <div className="flex flex-col items-center gap-1 sm:gap-1.5">
                      <div className="bg-compleo-deep-teal/20 rounded-full p-1">
                        <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 group-hover:pulse transition-transform duration-300" />
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-sm sm:text-base font-semibold tracking-wider">CONTACT</span>
                        <span className="text-xs font-medium opacity-90">Us</span>
                      </div>
                    </div>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Meet our Leadership Team */}
        <section className="section-padding bg-gray-100">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="text-center mb-16">
              <h2 className="heading-2 text-compleo-deep-teal mb-6">
                {pageData?.leadershipTitle || "Leadership Team"}
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                {pageData?.leadershipDescription || "Experienced leaders combining clinical expertise, technological innovation, and healthcare industry knowledge to drive our mission forward."}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leadership.map((leader, index) => {
                const leaderId = (leader as any).id_slug || (leader as any).id;
                const leaderImage = (leader as any).image?.url ? `${STRAPI_URL}${(leader as any).image.url}` : (leader as any).image;

                return (
                  <Link key={index} href={`/team-member/${leaderId}`}>
                    <Card className="overflow-hidden group cursor-pointer transform transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden">
                          <img
                            src={leaderImage}
                            alt={leader.name}
                            className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {/* Brand green fade-up overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-compleo-teal via-compleo-teal/60 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500"></div>

                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 z-10">
                            <h3 className="text-xl font-bold text-white group-hover:text-compleo-yellow transition-colors duration-300">{leader.name}</h3>
                            <p className="text-gray-200 group-hover:text-white transition-colors duration-300">{leader.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Culture & Values */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-compleo-deep-teal mb-6">
                  {pageData?.cultureTitle || "Our Culture & Values"}
                </h2>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  {pageData?.cultureDescription || "We believe in fostering an environment where innovation thrives, collaboration flourishes, and every team member feels empowered to make a meaningful impact on healthcare delivery."}
                </p>
                <div className="space-y-6">
                  {(pageData?.cultureValues && pageData.cultureValues.length > 0 
                    ? pageData.cultureValues 
                    : [
                        { title: "Patient-First Mindset", description: "Every decision we make is guided by improving patient outcomes and experiences" },
                        { title: "Excellence & Innovation", description: "Continuous improvement and technological advancement drive our work" },
                        { title: "Collaborative Partnership", description: "Building lasting relationships with NHS Trusts and healthcare providers" }
                      ]
                  ).map((value, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="bg-compleo-teal/10 p-3 rounded-lg">
                        <svg className="h-6 w-6 text-compleo-teal" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          {index === 0 && <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>}
                          {index === 1 && <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>}
                          {index === 2 && <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A3.01 3.01 0 0 0 17.1 7c-.5 0-.96.18-1.31.47l-5.11 4.24A1.004 1.004 0 0 0 11 12.5v8.5c0 .55.45 1 1 1s1-.45 1-1v-7h2.5l2.5 7.5h1.5c.83 0 1.5-.67 1.5-1.5z"/>}
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-compleo-deep-teal mb-2">{value.title}</h3>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <img 
                  src={pageData?.cultureImage?.url || "/images/team/culture-collage.jpg"}
                  alt={pageData?.cultureImageAlt || "Compleo Health team culture and collaboration moments"}
                  className="w-full aspect-square object-cover rounded-xl shadow-lg"
                />
              </div>
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