export interface EquipmentItem {
  id: string;
  name: string;
  manufacturer: 'Siemens' | 'Philips' | 'Canon';
  type: 'MRI' | 'CT';
  imageUrl: string;
  description: string;
  specifications: {
    fieldStrength?: string;
    slices?: string;
    technology?: string;
    keyFeatures: string[];
  };
  tags: string[];
  isComingSoon?: boolean;
}

import equipmentDataJson from './data/equipment.json';

export const equipmentData: EquipmentItem[] = equipmentDataJson;

export const getEquipmentByManufacturer = () => {
  return equipmentData.reduce((acc, item) => {
    if (!acc[item.manufacturer]) {
      acc[item.manufacturer] = [];
    }
    acc[item.manufacturer].push(item);
    return acc;
  }, {} as Record<string, EquipmentItem[]>);
};

export const getEquipmentByType = (type: 'MRI' | 'CT') => {
  return equipmentData.filter(item => item.type === type);
};