import { useState, useMemo } from 'react';
import { Equipment } from '@shared/schema';

export type EquipmentFilterType = 'all' | 'mri' | 'ct' | 'mobile';

export function useEquipmentFilter(equipment: Equipment[]) {
  const [activeFilter, setActiveFilter] = useState<EquipmentFilterType>('all');

  const filteredEquipment = useMemo(() => {
    if (activeFilter === 'all') {
      return equipment;
    }
    return equipment.filter(item => item.type === activeFilter);
  }, [equipment, activeFilter]);

  const filterCounts = useMemo(() => {
    return {
      all: equipment.length,
      mri: equipment.filter(item => item.type === 'mri').length,
      ct: equipment.filter(item => item.type === 'ct').length,
      mobile: equipment.filter(item => item.type === 'mobile').length,
    };
  }, [equipment]);

  return {
    activeFilter,
    setActiveFilter,
    filteredEquipment,
    filterCounts,
  };
}
