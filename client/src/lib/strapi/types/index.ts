/**
 * Types Index
 * 
 * This file re-exports all type definitions from the types directory
 * for easier importing throughout the application.
 */

export * from './common';
export * from './home';
export * from './global-settings';

// Explicitly re-export from managed-equipment to avoid ambiguity
import * as ManagedEquipment from './managed-equipment';
export { ManagedEquipment };

export * from './clinical-insourcing';
export * from './team-page';
export * from './our-team';
export * from './work-with-us';
export * from './case-studies';
