import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// CSS to completely eliminate tile borders - final approach
const tileMapStyles = `
  .leaflet-tile {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    image-rendering: auto !important;
    image-rendering: crisp-edges !important;
    image-rendering: -webkit-optimize-contrast !important;
    transform: translate3d(0, 0, 0) !important;
  }
  .leaflet-tile-pane {
    filter: contrast(1.02) saturate(0.98) !important;
  }
  .leaflet-map-pane canvas {
    image-rendering: auto !important;
  }
`;

interface MapLocation {
  lat: number;
  lng: number;
  name: string;
  impact: string;
  details?: string;
  country?: string;
  countryCode?: string;
  type?: 'hospital' | 'mobile' | 'facility' | 'office';
}

interface OperatingCountry {
  name: string;
  code: string;
  locationCount: number;
}

interface TileMapProps {
  locations: MapLocation[];
  operatingCountries?: OperatingCountry[];
  height?: string;
  className?: string;
  onLocationClick?: (location: MapLocation) => void;
}

export default function TileMap({ 
  locations, 
  operatingCountries = [], 
  height = "400px", 
  className = "",
  onLocationClick 
}: TileMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current, {
      center: [54.0, 8.0],
      zoom: 4,
      zoomControl: false,
      scrollWheelZoom: false,
      dragging: false,
      touchZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      tap: false
    });

    mapInstanceRef.current = map;

    // Use clean CartoDB tiles with proper configuration
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 18,
      tileSize: 256,
      zoomOffset: 0,
      detectRetina: true,
      crossOrigin: true,
      className: 'seamless-tiles'
    }).addTo(map);

    // Create custom icons matching the reference image
    const facilityIcon = L.divIcon({
      html: '<div style="background-color: #00a990; width: 14px; height: 14px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      className: 'custom-div-icon'
    });

    const officeIcon = L.divIcon({
      html: '<div style="background-color: #0f2e2e; width: 14px; height: 14px; border-radius: 2px; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      className: 'custom-div-icon'
    });

    // Add location markers
    locations.forEach((location) => {
      const icon = location.type === 'office' ? officeIcon : facilityIcon;
      const marker = L.marker([location.lat, location.lng], { icon })
        .addTo(map)
        .bindPopup(`
          <div style="min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; color: #0f2e2e; font-size: 14px; font-weight: bold;">${location.name}</h3>
            <p style="margin: 0; color: #666; font-size: 12px;">${location.impact}</p>
            ${location.details ? `<p style="margin: 4px 0 0 0; color: #888; font-size: 11px;">${location.details}</p>` : ''}
          </div>
        `);

      if (onLocationClick) {
        marker.on('click', () => onLocationClick(location));
      }
    });

    // Add country boundaries for operating countries
    if (operatingCountries.length > 0) {
      const operatingCountryCodes = new Set(operatingCountries.map(c => c.code));
      
      // Load country boundaries with proper ISO codes
      fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
        .then(response => response.json())
        .then(data => {
          L.geoJSON(data, {
            style: (feature) => {
              // This GeoJSON has ISO3166-1-Alpha-2 property
              const props = feature?.properties || {};
              const countryCode = props['ISO3166-1-Alpha-2'] || 
                                props.ISO_A2 || 
                                props.iso_a2 || 
                                props.ADMIN ||
                                props.ADM0_A3?.slice(0, 2) ||
                                props.id;
              
              const isOperating = operatingCountryCodes.has(countryCode);
              
              return {
                fillColor: isOperating ? '#88F2DD' : 'transparent',
                weight: isOperating ? 2 : 0,
                opacity: isOperating ? 0.8 : 0,
                color: '#00a990',
                fillOpacity: isOperating ? 0.3 : 0
              };
            },
            onEachFeature: (feature, layer) => {
              const props = feature?.properties || {};
              const countryCode = props['ISO3166-1-Alpha-2'] || 
                                props.ISO_A2 || 
                                props.iso_a2 || 
                                props.ADMIN ||
                                props.ADM0_A3?.slice(0, 2) ||
                                props.id;
              const country = operatingCountries.find(c => c.code === countryCode);
              
              if (country) {
                layer.bindTooltip(`${country.name} - ${country.locationCount} locations`, {
                  permanent: false,
                  direction: 'center'
                });
              }
            }
          }).addTo(map);
        })
        .catch(error => {

        });
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [locations, operatingCountries, onLocationClick]);

  return (
    <div className={`relative ${className}`} style={{ height }}>
      <style>{tileMapStyles}</style>
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg" 
        style={{ 
          height: '100%',
          background: '#f5f5f5'
        }}
      />
      
      {/* Operating Countries Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-compleo-beige z-[1000]">
        <div className="text-xs font-semibold text-compleo-deep-teal mb-2">Operating Countries</div>
        <div className="flex flex-wrap gap-2">
          {operatingCountries.map((country) => (
            <div key={country.code} className="flex items-center gap-1 bg-compleo-beige px-2 py-1 rounded-full">
              <img 
                src={`https://flagcdn.com/16x12/${country.code.toLowerCase()}.png`} 
                alt={country.name} 
                className="w-4 h-3 rounded-sm"
              />
              <span className="text-xs font-medium text-compleo-deep-teal">{country.code}</span>
              <span className="text-xs text-compleo-gray">({country.locationCount})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-compleo-beige z-[1000]">
        <div className="text-xs font-semibold text-compleo-deep-teal mb-1">European Coverage</div>
        <div className="text-lg font-bold text-compleo-deep-teal">{locations.length}</div>
        <div className="text-xs text-compleo-gray">Service Locations</div>
      </div>
    </div>
  );
}