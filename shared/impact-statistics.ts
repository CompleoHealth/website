export interface ImpactStatistic {
  id: string;
  value: string;
  label: string;
  description?: string;
}

// Centralized impact statistics data
// This ensures all "Our Impact" sections across the site use the same data
// When connected to a CMS, update this single source to update all pages
export const IMPACT_STATISTICS: ImpactStatistic[] = [
  {
    id: 'nhs-trusts',
    value: '30+',
    label: 'NHS TRUSTS SERVED',
    description: 'NHS Trusts partnering with Compleo Health for diagnostic services'
  },
  {
    id: 'hospital-sites',
    value: '50+',
    label: 'HOSPITAL SITES',
    description: 'Hospital locations served across the UK and Europe'
  },
  {
    id: 'scanners',
    value: '30+',
    label: 'STATE-OF-ART SCANNERS',
    description: 'Advanced MRI and CT scanners in our equipment fleet'
  },
  {
    id: 'cost-savings',
    value: '6%+',
    label: 'COST SAVINGS',
    description: 'Average cost savings achieved compared to alternatives'
  },
  {
    id: 'patient-satisfaction',
    value: '99%',
    label: 'PATIENT SATISFACTION',
    description: 'Patient satisfaction rate across all service locations'
  },
  {
    id: 'accreditations',
    value: '6+',
    label: 'INDUSTRY ACCREDITATIONS',
    description: 'Professional certifications and quality accreditations'
  }
];

// Helper function to get specific statistics by ID
export const getStatisticById = (id: string): ImpactStatistic | undefined => {
  return IMPACT_STATISTICS.find(stat => stat.id === id);
};

// Helper function to get subset of statistics
export const getStatistics = (ids: string[]): ImpactStatistic[] => {
  return ids.map(id => getStatisticById(id)).filter(Boolean) as ImpactStatistic[];
};