import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { LocationData } from '@shared/location-data';
import { Skeleton } from '@/components/ui/skeleton';
import InteractiveMap from '@/components/common/interactive-map';
import { getOperatingCountries, getCountryCode } from '@shared/location-data';
import { LocationMapProps, MapLocationPoint } from '@/types/components';



interface LocationMapComponentProps {
  title?: string;
  subtitle?: string;
  locations?: Array<{
    id: string;
    name: string;
    address?: string;
    lat: number;
    lng: number;
  }>;
}

export default function LocationMap({
  title = "European Coverage",
  subtitle,
  locations: cmsLocations
}: LocationMapComponentProps = {}) {
  // Use CMS locations if provided, otherwise fetch from API
  const { data: apiLocations = [], isLoading } = useQuery<LocationData[]>({
    queryKey: ['/api/locations'],
    // Skip the API call if we have CMS locations
    enabled: !cmsLocations || cmsLocations.length === 0,
  });
  
  // Use CMS locations if available, otherwise use API locations
  const locations = cmsLocations || apiLocations;

  // Convert locations to map format with coordinates and country info
  // Convert locations to map format with coordinates and country info
  const mapLocations = locations
    .filter(location => {
      // For CMS locations, we need lat/lng directly
      if ('lat' in location && 'lng' in location) {
        return true;
      }
      // For API locations, we need coordinates
      return 'coordinates' in location && location.coordinates;
    })
    .map(location => {
      // Determine if this is an office location based on the name
      const isOffice = location.name.toLowerCase().includes('office');
      const locationType = isOffice ? 'office' as const : 'facility' as const;
      
      // Handle both CMS locations and API locations
      const lat = 'lat' in location ? location.lat : (location.coordinates as any)?.lat || 54.5;
      const lng = 'lng' in location ? location.lng : (location.coordinates as any)?.lng || -2.0;
      const address = 'address' in location ? location.address : '';
      
      // For API locations, we have city, postcode, country
      // For CMS locations, we use address or fallback
      const impact = 'city' in location ? `${location.city}, ${location.postcode || ''}` : address || '';
      const details = 'city' in location ? `${location.address || ''}, ${location.city}` : address || '';
      const country = 'country' in location ? location.country : 'United Kingdom';
      
      return {
        lat,
        lng,
        name: location.name,
        impact,
        details,
        country,
        countryCode: 'country' in location ? getCountryCode(location.country) : 'GB',
        type: locationType
      };
    });

  // Get operating countries for map shading
  const operatingCountries = getOperatingCountries();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <section className="py-16 px-4 bg-[#ffffff]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-compleo-deep-teal mb-6">
            {title} 
          </h2>
          <p className="text-compleo-gray max-w-3xl mx-auto text-[20px]">
            {subtitle || (
              <>Our advanced imaging services are available across the UK<br />
              and expanding into Europe.</>
            )}
          </p>
        </div>

        <Card className="border-2 border-compleo-beige overflow-hidden relative shadow-2xl">
          <CardContent className="p-0">
            <InteractiveMap 
              locations={mapLocations}
              operatingCountries={operatingCountries}
              height="600px"
              center={[54.0, 8.0]}
              zoom={4.2}
              className="rounded-lg"
            />
            

            



          </CardContent>
        </Card>


      </div>
    </section>
  );
}