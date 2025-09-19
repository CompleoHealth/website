import { StrapiApproachPanel } from '@/lib/strapi/types/home';

interface BulletPoint {
  title: string;
  description: string;
}

interface ApproachPanel {
  title: string;
  description1: string;
  description2: string;
  bulletPoints: [BulletPoint, BulletPoint, BulletPoint]; // Always exactly 3 bullet points
  theme: 'dark' | 'light';
}

interface ApproachPanelsProps {
  // CMS data structure - Approach is repeatable array with ApproachPanel arrays
  approachPanels?: Array<{ ApproachPanel: StrapiApproachPanel[] }>;
  // Legacy static data fallback
  leftPanel?: ApproachPanel;
  rightPanel?: ApproachPanel;
}

export default function ApproachPanels({
  approachPanels,
  leftPanel = {
    title: "Our Partnership Approach",
    description1: "We offer more than technology. We collaborate with NHS Trusts, private providers, and system partners to integrate seamlessly with existing services and care pathways.",
    description2: "We focus on long-term value over transactions, building flexible, sustainable, and aligned solutions that deliver clinical excellence, commercial value, and improved patient access and experience.",
    bulletPoints: [
      {
        title: "Seamless Integration",
        description: "Positive and impactful integration into care pathways"
      },
      {
        title: "Long-Term Value", 
        description: "Sustainable solutions over short-term transactions"
      },
      {
        title: "Flexible Solutions",
        description: "Aligned with your specific needs and goals"
      }
    ],
    theme: 'dark'
  },
  rightPanel = {
    title: "Patient-First Approach",
    description1: "Our state-of-the-art equipment and experienced clinical teams deliver rapid diagnostic results ensuring a positive patient experience.",
    description2: "We operate flexibly across accessible locations, delivering services where patients need them most. Our comfortable, anxiety-reducing environments are designed with patients in mind.",
    bulletPoints: [
      {
        title: "Faster Results",
        description: "State-of-the-art equipment for rapid and accurate diagnoses"
      },
      {
        title: "Accessible Locations",
        description: "Solutions deliverable where most beneficial to pathways"
      },
      {
        title: "Comfortable Experience",
        description: "Anxiety-reducing environment designed for your comfort"
      }
    ],
    theme: 'light'
  }
}: ApproachPanelsProps = {}) {
  
  const renderPanel = (panel: ApproachPanel, isLeft: boolean) => {
    const isDark = panel.theme === 'dark';
    
    return (
      <div className={`rounded-2xl card-padding-lg relative overflow-hidden shadow-2xl border-2 ${
        isDark 
          ? 'bg-compleo-deep-teal text-white border-compleo-teal/20' 
          : 'bg-gradient-to-br from-white to-gray-50/50 text-compleo-deep-teal border-compleo-teal/10'
      }`}>
        {/* Decorative circles */}
        {isDark ? (
          <>
            <div className="absolute top-0 right-0 w-48 h-48 rounded-bl-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}></div>
            <div className="absolute top-0 right-0 w-28 h-28 rounded-bl-full" style={{ backgroundColor: 'rgba(247, 249, 228, 0.15)' }}></div>
          </>
        ) : (
          <>
            <div className="absolute top-0 left-0 w-48 h-48 rounded-br-full" style={{ backgroundColor: 'rgba(0, 169, 144, 0.08)' }}></div>
            <div className="absolute top-0 left-0 w-28 h-28 rounded-br-full" style={{ backgroundColor: 'rgba(15, 46, 46, 0.06)' }}></div>
          </>
        )}
        
        <div className="relative z-10">
          <h2 className="heading-2 mb-4">{panel.title}</h2>
          <p className={`body-base mb-4 ${isDark ? 'text-gray-200' : 'text-compleo-gray'}`}>
            {panel.description1}
          </p>
          <p className={`body-base mb-6 ${isDark ? 'text-gray-200' : 'text-compleo-gray'}`}>
            {panel.description2}
          </p>
          
          <div className="space-y-3">
            {panel.bulletPoints.map((bullet, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  isDark ? 'bg-compleo-yellow' : 'bg-compleo-teal'
                }`}></div>
                <div>
                  <h4 className="heading-4 mb-1">{bullet.title}</h4>
                  <p className={`body-small ${isDark ? 'text-gray-200' : 'text-compleo-gray'}`}>
                    {bullet.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Use CMS data first, fallback to static data
  const panels = approachPanels && approachPanels.length >= 2 
    ? approachPanels.flatMap(approach => approach.ApproachPanel).slice(0, 2).map((panel, index) => ({
        title: panel.title,
        description1: panel.description.split('\n\n')[0] || panel.description,
        description2: panel.description.split('\n\n')[1] || '',
        bulletPoints: (() => {
          const features = panel.ApproachFeatures?.slice(0, 3) || [];
          // Ensure exactly 3 bullet points for TypeScript
          while (features.length < 3) {
            features.push({ title: '', description: '' });
          }
          return features.map(feature => ({
            title: feature.title,
            description: feature.description
          })) as [BulletPoint, BulletPoint, BulletPoint];
        })(),
        theme: index === 0 ? 'dark' as const : 'light' as const
      }))
    : [leftPanel, rightPanel];

  return (
    <section className="section-padding bg-[#ffffff]">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="grid lg:grid-cols-2 gap-8">
          {panels[0] && renderPanel(panels[0], true)}
          {panels[1] && renderPanel(panels[1], false)}
        </div>
      </div>
    </section>
  );
}