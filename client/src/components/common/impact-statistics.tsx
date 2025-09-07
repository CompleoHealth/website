import { StrapiImpactStatistic } from '@/lib/strapi/types/common';

// Helper function to get a unique key for each statistic
function getStatisticKey(stat: StrapiImpactStatistic, index: number): string | number {
  // Check if it's a Strapi ImpactStatistic (has statId)
  if ('statId' in stat && stat.statId) {
    return stat.statId;
  }
  // Fallback to index
  return index;
}

interface ImpactStatisticsProps {
  variant?: 'hero' | 'panel' | 'compact';
  className?: string;
  title?: string;
  showTitle?: boolean;
  gridCols?: 2 | 3 | 6;
  textColor?: 'yellow' | 'teal' | 'white' | 'dark';
  statistics?: StrapiImpactStatistic[]; // CMS-driven statistics (required)
}

export function ImpactStatistics({ 
  variant = 'panel',
  className = '',
  title = 'Our Impact',
  showTitle = true,
  gridCols = 3,
  textColor = 'teal',
  statistics: cmsStatistics
}: ImpactStatisticsProps) {
  // Use CMS statistics with hardcoded fallback
  const statistics = cmsStatistics || [
    { statId: 'nhs-trusts', value: '30+', label: 'NHS TRUSTS SERVED' },
    { statId: 'hospital-sites', value: '50+', label: 'HOSPITAL SITES' },
    { statId: 'scanners', value: '30+', label: 'STATE-OF-ART SCANNERS' },
    { statId: 'cost-savings', value: '6%+', label: 'COST SAVINGS' },
    { statId: 'patient-satisfaction', value: '99%', label: 'PATIENT SATISFACTION' },
    { statId: 'accreditations', value: '6+', label: 'INDUSTRY ACCREDITATIONS' }
  ];

  const getColorClasses = () => {
    switch (textColor) {
      case 'yellow':
        return {
          value: 'text-compleo-yellow',
          label: 'text-white',
          title: 'text-compleo-yellow'
        };
      case 'teal':
        return {
          value: 'text-compleo-teal',
          label: 'text-compleo-gray',
          title: 'text-compleo-deep-teal'
        };
      case 'white':
        return {
          value: 'text-white',
          label: 'text-white/90',
          title: 'text-white'
        };
      case 'dark':
        return {
          value: 'text-compleo-deep-teal',
          label: 'text-gray-600',
          title: 'text-compleo-deep-teal'
        };
      default:
        return {
          value: 'text-compleo-teal',
          label: 'text-compleo-gray',
          title: 'text-compleo-deep-teal'
        };
    }
  };

  const colors = getColorClasses();

  const getGridClasses = () => {
    switch (gridCols) {
      case 2:
        return 'grid-cols-2';
      case 3:
        return 'grid-cols-2 lg:grid-cols-3';
      case 6:
        return 'grid-cols-2 lg:grid-cols-3';
      default:
        return 'grid-cols-2 lg:grid-cols-3';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'hero':
        return {
          container: 'text-center',
          value: 'text-4xl lg:text-5xl font-black mb-3 drop-shadow-lg',
          label: 'text-sm font-medium uppercase tracking-wider leading-relaxed',
          item: 'group hover:scale-105 transition-all duration-300 cursor-default'
        };
      case 'panel':
        return {
          container: 'text-center',
          value: 'text-3xl font-bold mb-2',
          label: 'text-sm',
          item: 'text-center'
        };
      case 'compact':
        return {
          container: 'text-center',
          value: 'text-2xl font-bold mb-1',
          label: 'text-xs',
          item: 'text-center'
        };
      default:
        return {
          container: 'text-center',
          value: 'text-3xl font-bold mb-2',
          label: 'text-sm',
          item: 'text-center'
        };
    }
  };

  const variantClasses = getVariantClasses();

  return (
    <div className={className}>
      {showTitle && (
        <h3 className={`text-2xl font-bold mb-6 ${colors.title}`}>
          {title}
        </h3>
      )}
      <div className={`grid ${getGridClasses()} gap-6 lg:gap-8 ${variantClasses.container}`}>
        {statistics.map((stat, index) => (
          <div key={getStatisticKey(stat, index)} className={variantClasses.item}>
            <div className={`${variantClasses.value} ${colors.value}`}>
              {stat.value}
            </div>
            <div className={`${variantClasses.label} ${colors.label}`}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}