import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { equipmentData, getEquipmentByManufacturer, EquipmentItem } from '@shared/equipment-data';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link, useLocation } from 'wouter';

interface ManufacturerSectionProps {
  manufacturer: string;
  equipment: EquipmentItem[];
  isExpanded: boolean;
  onToggle: () => void;
  shouldAnimate: boolean;
}

function ManufacturerSection({ manufacturer, equipment, isExpanded, onToggle, shouldAnimate }: ManufacturerSectionProps) {
  const visibleEquipment = isExpanded ? equipment : equipment.slice(0, 2);
  
  return (
    <div className="mb-12">
      {/* Manufacturer Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-compleo-deep-teal flex items-center gap-3">
            <div className="w-8 h-8 bg-compleo-teal rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">{manufacturer[0]}</span>
            </div>
            {manufacturer}
          </h2>

        </div>
        {equipment.length > 2 && (
          <Button
            variant="outline"
            onClick={onToggle}
            className="flex items-center gap-2 hover:bg-compleo-teal hover:text-white transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp size={16} />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown size={16} />
                Show All ({equipment.length})
              </>
            )}
          </Button>
        )}
      </div>

      {/* Equipment Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleEquipment.map((item, index) => (
          <EquipmentCard 
            key={item.id} 
            item={item} 
            index={index}
            shouldAnimate={shouldAnimate}
          />
        ))}
      </div>
    </div>
  );
}

interface EquipmentCardProps {
  item: EquipmentItem;
  index: number;
  shouldAnimate: boolean;
}

function EquipmentCard({ item, index, shouldAnimate }: EquipmentCardProps) {
  const isComingSoon = item.isComingSoon || item.tags.includes('Coming Soon');
  const [, setLocation] = useLocation();
  
  return (
    <Card 
      className={`hover-lift hover-glow overflow-hidden transition-all duration-700 h-full flex flex-col ${shouldAnimate ? 'animate-fade-in-up opacity-100' : 'opacity-100'} ${
        isComingSoon 
          ? 'ring-2 ring-compleo-yellow/50 shadow-2xl bg-gradient-to-br from-white to-compleo-yellow/5' 
          : 'shadow-lg hover:shadow-xl'
      }`}
      style={{ animationDelay: `${(index + 1) * 150}ms` }}
    >
      {/* Coming Soon Header */}
      {isComingSoon && (
        <div className="bg-gradient-to-r from-compleo-yellow to-compleo-yellow/90 text-compleo-deep-teal py-2 px-4">
          <div className="text-center">
            <strong className="text-sm font-bold tracking-wide">COMING SOON</strong>
          </div>
        </div>
      )}
      
      {/* Equipment Image */}
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={`${item.name} - ${item.manufacturer} diagnostic imaging equipment`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
            width="400"
            height="192"
            style={{ aspectRatio: '25/12' }}
          />
        ) : (
          <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <p className="text-gray-400 font-medium text-sm">Photo - Coming Soon</p>
          </div>
        )}
      </div>
      
      {/* Card Content */}
      <CardContent className="p-6 flex-1 flex flex-col">
        {/* Header Section */}
        <div className="mb-4">
          <h3 className={`text-lg font-bold mb-2 leading-tight ${isComingSoon ? 'text-compleo-teal' : 'text-compleo-deep-teal'}`}>
            {item.name}
          </h3>
          <p className="text-sm text-compleo-gray">
            {item.manufacturer} • {item.specifications.fieldStrength || item.specifications.technology || 'Advanced Technology'}
          </p>
        </div>

        {/* Tags Section */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {item.tags.filter(tag => tag !== 'Coming Soon').slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs px-2 py-1 bg-compleo-teal/10 text-compleo-teal border-compleo-teal/20"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-compleo-gray mb-4 flex-1">
          {item.description}
        </p>

        {/* Key Features */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-compleo-deep-teal mb-2">Key Features:</h4>
          <ul className="text-sm text-compleo-gray space-y-1">
            {item.specifications.keyFeatures.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <div className="w-1.5 h-1.5 bg-compleo-teal rounded-full mr-2 mt-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        {isComingSoon ? (
          <Button 
            className="w-full bg-gray-400 text-white cursor-not-allowed"
            disabled
          >
            Coming Soon
          </Button>
        ) : (
          <Link href={`/contact?equipment=${encodeURIComponent(item.name)}`} tabIndex={-1}>
            <Button
              className="w-full bg-compleo-teal hover:bg-compleo-deep-teal text-white transition-colors"
              aria-label={`Learn more about ${item.name} and request information`}
              onClick={() => setLocation(`/contact?equipment=${encodeURIComponent(item.name)}`)}
            >
              Learn More
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

export default function EquipmentShowcase() {
  const { elementRef, shouldAnimate } = useIntersectionObserver();
  const [expandedManufacturers, setExpandedManufacturers] = useState<Record<string, boolean>>({
    'Siemens': true // Siemens expanded by default (has 5 scanners)
  });
  
  const manufacturerData = getEquipmentByManufacturer();
  
  const toggleManufacturer = (manufacturer: string) => {
    setExpandedManufacturers(prev => ({
      ...prev,
      [manufacturer]: !prev[manufacturer]
    }));
  };

  return (
    <div ref={elementRef}>
      {/* Equipment by Manufacturer */}
      <div className="space-y-16">
        {Object.entries(manufacturerData).map(([manufacturer, equipment]) => (
          <ManufacturerSection
            key={manufacturer}
            manufacturer={manufacturer}
            equipment={equipment}
            isExpanded={expandedManufacturers[manufacturer] || false}
            onToggle={() => toggleManufacturer(manufacturer)}
            shouldAnimate={shouldAnimate}
          />
        ))}
      </div>
    </div>
  );
}
