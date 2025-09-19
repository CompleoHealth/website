import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Location {
  lat: number;
  lng: number;
  name: string;
  impact: string;
  details: string;
  country: string;
  countryCode: string;
  type: 'facility' | 'office';
}

interface OperatingCountry {
  code: string;
  name: string;
  locationCount: number;
}

interface InteractiveMapProps {
  locations: Location[];
  operatingCountries?: OperatingCountry[];
  height?: string;
  center?: [number, number];
  zoom?: number;
  className?: string;
  onLocationClick?: (location: Location) => void;
}

function InteractiveMap({ 
  locations, 
  operatingCountries = [],
  height = "400px", 
  center = [54.5, -2.0], 
  zoom = 6,
  className = "",
  onLocationClick
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Cleanup any existing map instance first
    if (mapInstanceRef.current) {
      try {
        mapInstanceRef.current.off();
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      } catch (error) {

      }
    }

    if (mapRef.current && !mapInstanceRef.current) {
      try {
        // Initialize the map as static (no zoom/pan controls)
        const map = L.map(mapRef.current, {
          preferCanvas: true,
          zoomControl: false,
          scrollWheelZoom: false,
          doubleClickZoom: false,
          touchZoom: false,
          dragging: false,
          keyboard: false,
          boxZoom: false,
          tap: false
        }).setView(center, zoom);

        // Add tile layer optimized for Canvas rendering
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          subdomains: 'abcd',
          maxZoom: 19,
          noWrap: true,
          bounds: [[-85.051128779807, -180], [85.051128779807, 180]]
        }).addTo(map);

        // Add country shading for operating countries
        if (operatingCountries.length > 0) {
          const loadCountryBoundaries = async () => {
            try {
              const response = await fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson');
              const worldData = await response.json();

              // Create a set of operating country codes for quick lookup
              const operatingCountryCodes = new Set(operatingCountries.map(country => country.code));
              
              // Add country boundaries with shading for operating countries
              L.geoJSON(worldData, {
                style: function(feature) {
                  const countryCode = feature?.properties?.['ISO3166-1-Alpha-2'];
                  const isOperating = operatingCountryCodes.has(countryCode);
                  
                  return {
                    fillColor: isOperating ? '#88F2DD' : 'transparent',
                    weight: isOperating ? 1 : 0,
                    opacity: isOperating ? 0.4 : 0,
                    color: isOperating ? '#00a990' : 'transparent',
                    fillOpacity: isOperating ? 0.15 : 0
                  };
                },
                onEachFeature: function(feature, layer) {
                  // Remove country tooltips - only show location markers
                }
              }).addTo(map);
              

            } catch (error) {

            }
          };

          loadCountryBoundaries();
        }

        // Create custom icons for different location types
        const createCustomIcon = (type: string = 'facility') => {
          const iconColors = {
            hospital: '#00a990',
            mobile: '#0f2e2e',
            facility: '#00a990',
            office: '#000000'
          };
          
          return L.divIcon({
            className: 'custom-marker',
            html: `
              <div style="
                background-color: ${iconColors[type as keyof typeof iconColors] || iconColors.facility};
                width: 28px;
                height: 28px;
                border-radius: 50%;
                border: 4px solid white;
                box-shadow: 0 3px 12px rgba(0,0,0,0.4);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: default;
              ">
                <div style="
                  width: 10px;
                  height: 10px;
                  background-color: white;
                  border-radius: 50%;
                "></div>
              </div>
            `,
            iconSize: [36, 36],
            iconAnchor: [18, 18],
            popupAnchor: [0, -18]
          });
        };

        // Add markers for each location (no popup functionality)
        locations.forEach(location => {
          const marker = L.marker([location.lat, location.lng], {
            icon: createCustomIcon(location.type),
            interactive: false, // Disable all interactions
            keyboard: false,    // Disable keyboard access
            riseOnHover: false  // Disable hover effects
          }).addTo(map);

          // Remove all interactive elements - markers are display-only
          // Explicitly disable tabbing on marker elements
          const markerElement = marker.getElement();
          if (markerElement) {
            markerElement.setAttribute('tabindex', '-1');
            markerElement.setAttribute('aria-hidden', 'true');
            markerElement.style.pointerEvents = 'none';
          }
        });

        mapInstanceRef.current = map;

      } catch (error) {

      }
    }

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.off();
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        } catch (error) {

        }
      }
    };
  }, [locations, operatingCountries, center, zoom, onLocationClick]);

  return (
    <div
      ref={mapRef}
      style={{
        height,
        width: '100%',
        position: 'relative',
        zIndex: 1
      }}
      className={`map-container ${className}`}
      aria-label="Map displaying service locations across the UK and Europe - visual reference only"
      tabIndex={-1}
      role="img"
    />
  );
}

export default InteractiveMap;