import { useLocation } from 'wouter';

export const useNavigationData = () => {
  const [location] = useLocation();

  const navigation = [
    { name: 'Sustainability', href: '/sustainability' },
    { name: 'News & Views', href: '/news-and-views' },
  ];

  const aboutPages = [
    { name: 'About', href: '/about' },
    { name: 'Our Team', href: '/our-team' },
    { name: 'Work With Us', href: '/work-with-us' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Contact', href: '/contact' },
  ];

  const servicePages = [
    { name: 'All Services', href: '/services' },
    { name: 'Managed Equipment Services', href: '/services/managed-equipment' },
    { name: 'Equipment Rental', href: '/services/equipment-rental' },
    { name: 'Community Diagnostic Centres', href: '/services/community-diagnostic-centres' },
    { name: 'Screening Programmes', href: '/services/screening-programmes' },
    { name: 'Clinical Insourcing', href: '/services/clinical-insourcing' },
  ];

  const isActive = (href: string) => location === href;

  return {
    location,
    navigation,
    aboutPages,
    servicePages,
    isActive,
  };
};