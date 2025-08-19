# CMS Integration Master Guide
*Single Source of Truth for Strapi CMS Integration Patterns*

## 📋 OVERVIEW

This document serves as the **definitive guide** for CMS integration patterns across the Compleo Health application. All patterns documented here are **battle-tested** and currently working in production on both Home and Services pages.

**Last Updated:** August 12, 2025  
**Status:** ✅ **PRODUCTION READY** - All patterns verified working  
**Scope:** Home Page & Services Page - Fully CMS Integrated

---

## 🏗️ PROVEN ARCHITECTURE PATTERNS

### 1. **CORE DATA FETCHING PATTERN**
*Used successfully on Home & Services pages*

```typescript
// ✅ PROVEN PATTERN - Parallel API Calls
const [pageData, globalSettingsData] = await Promise.all([
  strapiApi.getSpecificPage(),      // Page-specific content
  strapiApi.getGlobalSettings()     // Shared global settings
]);

setPageData(pageData);
setGlobalSettings(globalSettingsData);
```

**✅ KEY PRINCIPLES:**
- **Always fetch in parallel** for performance
- **Always fetch global settings** for shared components (impact stats, etc.)
- **Use Promise.all** for concurrent API calls
- **Comprehensive error handling** with try/catch
- **Proper loading state management**

---

## 🔌 API INTEGRATION PATTERNS

### 2. **POPULATE OBJECT CONSTRUCTION**
*Critical for nested component data*

```typescript
// ✅ PROVEN PATTERN - Home Page Example
const createHomePopulateObject = () => {
  return {
    Hero: {
      populate: {
        primaryButton: '*',      // Component population
        secondaryButton: '*'     // Component population
      }
    },
    ValueProposition: {
      populate: {
        ValuePropositionCards: {
          populate: {
            Features: '*'         // Nested component population
          }
        }
      }
    },
    Approach: {
      populate: {
        ApproachPanel: {
          populate: {
            ApproachFeatures: '*' // Nested repeatable components
          }
        }
      }
    },
    HealthcareSolutions: {
      populate: {
        solutions: {
          populate: {
            Features: '*'         // Deep nested components
          }
        }
      }
    },
    Testimonials: '*',           // Simple component population
    LocationMap: '*',            // Simple component population  
    CurvedCTA: '*'              // Simple component population
  };
};
```

**✅ CRITICAL RULES:**
- **ONLY populate component fields** - Never simple strings/text fields
- **Use `'*'` for simple components** (no nested components)
- **Use nested populate objects** for components with sub-components
- **Check schema files** before creating populate objects
- **Never populate non-existent fields** (causes 400 Bad Request)
- **Note on API Imports for Sub-Pages**: For sub-pages like managed equipment, API methods may not be part of the main `strapiApi` object in `index.ts`. Import specific API modules directly (e.g., `import { managedEquipmentApi } from '@/lib/strapi/api/managed-equipment';`) if the method is not available in `strapiApi`.

### 3. **SCHEMA-DRIVEN POPULATE VALIDATION**
*Prevent API errors by validating against actual schema*

```bash
# Always check actual schema before API queries
📂 CMS Schema Location: 
   └── src/api/[content-type]/content-types/[name]/schema.json
   └── src/components/[category]/[component].json

✅ VALIDATION CHECKLIST:
  □ Field exists in schema
  □ Field is a component (not string/text)
  □ Nested components properly mapped
  □ No deprecated/removed fields included
```

---

## 🌐 GLOBAL SETTINGS PATTERN

### 4. **SHARED IMPACT STATISTICS**
*Critical pattern for consistent data across pages*

```typescript
// ✅ PROVEN PATTERN - Shared Impact Stats
// Global Settings Fetch (parallel with page data)
const globalSettingsData = await strapiApi.getGlobalSettings();

// Component Usage Pattern
<ImpactStatistics
  variant="hero"
  textColor="yellow"
  gridCols={3}
  title={pageData?.impactStatsTitle || "Default Title"}
  statistics={globalSettings?.ImpactStatistics?.statistics}  // ✅ From global settings
/>

// ❌ NEVER USE: pageData?.sharedImpactStats?.statistics (field doesn't exist)
```

**✅ GLOBAL SETTINGS USAGE RULES:**
- **Always fetch global settings** alongside page data
- **Use shared impact statistics** from `globalSettings?.ImpactStatistics`
- **Never use page-specific impact stat fields** unless they exist in schema
- **Single source of truth** for shared data across all pages

---

## 📦 COMPONENT INTEGRATION PATTERNS

### 5. **SIMPLE COMPONENT PATTERN**
*For components with no nested sub-components*

```typescript
// ✅ Schema: String/text fields only
// ✅ Populate: '*' 
// ✅ Usage:
<CurvedCtaPanel 
  title={pageData?.CurvedCTA?.title}
  description={pageData?.CurvedCTA?.description}
  buttonText={pageData?.CurvedCTA?.buttonText}
  buttonHref={pageData?.CurvedCTA?.buttonHref}
/>
```

### 6. **NESTED COMPONENT PATTERN**
*For components containing repeatable sub-components*

```typescript
// ✅ Schema: Contains repeatable components
// ✅ Populate: Nested populate object
ValueProposition: {
  populate: {
    ValuePropositionCards: {    // Repeatable component
      populate: {
        Features: '*'           // Sub-component
      }
    }
  }
}

// ✅ Usage:
<ValueProposition 
  title={pageData?.ValueProposition?.title}
  subtitle={pageData?.ValueProposition?.subtitle}
  valuePropositionCards={pageData?.ValueProposition?.ValuePropositionCards}
/>
```

### 7. **DEEP NESTED COMPONENT PATTERN**
*For complex component hierarchies*

```typescript
// ✅ Example: Healthcare Solutions (3-level nesting)
HealthcareSolutions: {
  populate: {
    solutions: {              // Level 1: Repeatable solutions
      populate: {
        Features: '*'         // Level 2: Features within each solution
      }
    }
  }
}

// ✅ Usage with proper data flow:
<HealthcareSolutions 
  title={pageData?.HealthcareSolutions?.title}
  description={pageData?.HealthcareSolutions?.description}
  solutions={pageData?.HealthcareSolutions?.solutions}
/>
```

---

## 💾 TYPE DEFINITIONS & IMPORTS

### 8. **PROVEN IMPORT PATTERNS**

```typescript
// ✅ PROVEN IMPORTS - Home Page
import { strapiApi } from '@/lib/strapi';
import { StrapiHomePage } from '@/lib/strapi/types/home';
import { StrapiGlobalSettings } from '@/lib/strapi/types/global-settings';

// ✅ PROVEN IMPORTS - Services Page  
import { strapiApi } from '@/lib/strapi';
import { StrapiServicesPage } from '@/lib/strapi/types/services';
import { StrapiGlobalSettings } from '@/lib/strapi/types/global-settings';

// ✅ STATE MANAGEMENT PATTERN
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [pageData, setPageData] = useState<StrapiHomePage | null>(null);
const [globalSettings, setGlobalSettings] = useState<StrapiGlobalSettings | null>(null);
```

---

## 🚦 ERROR HANDLING & LOADING PATTERNS

### 9. **COMPREHENSIVE ERROR HANDLING**

```typescript
// ✅ PROVEN ERROR HANDLING PATTERN
const fetchPageData = async () => {
  try {
    console.log('🏠 Starting CMS data fetch...');
    
    const [pageData, globalSettingsData] = await Promise.all([
      strapiApi.getHomePage(),
      strapiApi.getGlobalSettings()
    ]);
    
    console.log('✅ CMS data fetched successfully');
    console.log('📄 Page Data:', pageData);
    console.log('🌐 Global Settings:', globalSettingsData);
    
    setPageData(pageData);
    setGlobalSettings(globalSettingsData);
  } catch (err) {
    console.error('❌ Error fetching CMS data:', err);
    setError('Failed to load page content');
  } finally {
    console.log('🏁 Loading complete');
    setIsLoading(false);
  }
};
```

### 10. **LOADING STATE PATTERN**

```typescript
// ✅ PROVEN LOADING STATE - Consistent across all pages
if (isLoading) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Compleo Logo with Animation */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img 
          src="/images/shared/logo-loading.png" 
          alt="Compleo Health Logo" 
          className="w-[768px] h-auto max-w-[70vw] max-h-[40vh] object-contain animate-logo-grow"
        />
      </div>
      {/* Loading Spinner */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-compleo-teal relative z-10 mb-6"></div>
      <p className="text-compleo-gray text-lg font-medium relative z-10">Loading...</p>
    </div>
  );
}
```

---

## 🎯 COMPONENT CONSUMPTION PATTERNS

### 11. **CMS DATA PRIORITIZATION**

```typescript
// ✅ PROVEN PATTERN - Always prioritize CMS data, fallback to static
<HeroSection 
  heroData={pageData?.Hero?.[0]}                          // ✅ CMS first
  impactStats={globalSettings?.ImpactStatistics}          // ✅ Shared global data
  impactStatsTitle={pageData?.Hero?.[0]?.impactStatsTitle || "Default Title"} // ✅ Fallback
/>

// ✅ Component internally handles null/undefined gracefully
// ✅ Always use optional chaining (?.)
// ✅ Provide meaningful fallback content
```

### 12. **FALLBACK DATA PATTERNS**

```typescript
// ✅ PROVEN FALLBACK PATTERNS

// Simple fallback
title={pageData?.section?.title || "Default Title"}

// Array fallback  
services={pageData?.services || staticFallbackServices}

// Complex object fallback
const services = pageData?.services?.length > 0 
  ? pageData.services 
  : staticFallbackServices;

// Nested component fallback
valuePropositionCards={pageData?.ValueProposition?.ValuePropositionCards || []}
```

---

## ⚠️ COMMON PITFALLS & SOLUTIONS

### 13. **CRITICAL MISTAKES TO AVOID**

```typescript
// ❌ NEVER DO THESE:

// 1. Don't populate simple string fields
populate: {
  title: '*',          // ❌ WRONG - title is just a string
  description: '*'     // ❌ WRONG - description is just text
}

// 2. Don't use non-existent fields
statistics={pageData?.sharedImpactStats?.statistics}  // ❌ Field doesn't exist

// 3. Don't skip global settings
const pageData = await strapiApi.getHomePage();       // ❌ Missing global settings

// 4. Don't use wrong import paths
import { strapiApi } from '@/lib/strapi/api';         // ❌ Wrong path

// 5. Don't use inconsistent API patterns
strapiApi.globalSettingsApi.getGlobalSettings()      // ❌ Wrong API call
```

```typescript
// ✅ CORRECT VERSIONS:

// 1. Only populate component fields
populate: {
  primaryButton: '*',    // ✅ Component field
  secondaryButton: '*'   // ✅ Component field  
}

// 2. Use correct data sources
statistics={globalSettings?.ImpactStatistics?.statistics}  // ✅ From global settings

// 3. Always fetch global settings
const [pageData, globalSettingsData] = await Promise.all([
  strapiApi.getHomePage(),
  strapiApi.getGlobalSettings()      // ✅ Include global settings
]);

// 4. Use correct import paths
import { strapiApi } from '@/lib/strapi';              // ✅ Correct path

// 5. Use consistent API patterns  
strapiApi.getGlobalSettings()                          // ✅ Correct API call
```

---

## 🧪 TESTING & VALIDATION

### 14. **VALIDATION CHECKLIST**

**Before deploying new CMS integrations:**

```markdown
✅ **API VALIDATION:**
  □ Check schema files for field existence
  □ Verify populate object matches schema structure
  □ Test API calls return expected data structure
  □ Confirm no 400 Bad Request errors

✅ **COMPONENT VALIDATION:**
  □ Components receive expected CMS data props
  □ Fallback data works when CMS data unavailable
  □ Optional chaining used throughout
  □ TypeScript types align with actual data

✅ **INTEGRATION VALIDATION:**
  □ Page loads without errors
  □ All CMS content renders correctly
  □ Global settings data shared properly
  □ Loading states work as expected
  □ Error handling triggers appropriately

✅ **CONSISTENCY VALIDATION:**  
  □ Follows established patterns from home/services pages
  □ Import paths consistent with working pages
  □ API call patterns match proven approaches
  □ Error handling matches established patterns
```

---

## 🚀 IMPLEMENTATION WORKFLOW

### 15. **STEP-BY-STEP INTEGRATION PROCESS**

```markdown
**1. SCHEMA ANALYSIS** 
   └── Review CMS schema files for target content type
   └── Identify component vs string fields  
   └── Map nested component relationships

**2. TYPE DEFINITIONS**
   └── Create/update TypeScript interfaces
   └── Ensure proper imports from correct paths
   └── Match interface structure to schema

**3. API INTEGRATION**
   └── Create populate object based on schema
   └── Follow proven populate patterns
   └── Include global settings fetch if shared data needed
   └── Test API calls return expected structure

**4. COMPONENT INTEGRATION** 
   └── Update component to accept CMS props
   └── Implement CMS data prioritization
   └── Add appropriate fallbacks
   └── Ensure optional chaining throughout

**5. VALIDATION & TESTING**
   └── Run through validation checklist
   └── Test loading/error states
   └── Verify CMS content renders correctly
   └── Confirm TypeScript compilation

**6. DOCUMENTATION UPDATE**
   └── Document any new patterns discovered
   └── Update this guide with new learnings
   └── Share patterns with team
```

---

## 📚 REFERENCE IMPLEMENTATIONS

### 16. **WORKING EXAMPLES**

**✅ HOME PAGE** (`/client/src/pages/home.tsx`)
- ✅ Complete CMS integration
- ✅ Global settings integration  
- ✅ Complex nested populate objects
- ✅ Comprehensive error handling

**✅ SERVICES PAGE** (`/client/src/pages/services.tsx`)  
- ✅ Complete CMS integration
- ✅ Shared impact stats from global settings
- ✅ Services array with nested features
- ✅ Fixed populate query alignment

**✅ API IMPLEMENTATIONS:**
- `/client/src/lib/strapi/api/home.ts` - Home page API patterns
- `/client/src/lib/strapi/api/services.ts` - Services page API patterns  
- `/client/src/lib/strapi/api/global-settings.ts` - Global settings API

---

## 🔄 MAINTENANCE & UPDATES

### 17. **KEEPING PATTERNS CURRENT**

```markdown
**WHEN SCHEMA CHANGES:**
□ Update TypeScript interfaces first
□ Adjust populate objects to match new structure  
□ Update component prop consumption
□ Test thoroughly before deployment

**WHEN ADDING NEW PAGES:**
□ Follow this guide's patterns exactly
□ Use home/services pages as reference implementations
□ Include global settings fetch if using shared components
□ Document any new patterns discovered

**REGULAR MAINTENANCE:**
□ Review console logs for API errors
□ Monitor for unused/deprecated fields
□ Keep TypeScript types in sync with schema
□ Update this documentation with new learnings
```

---

## 🎯 SUCCESS METRICS

### 18. **INTEGRATION SUCCESS CRITERIA**

```markdown
✅ **TECHNICAL SUCCESS:**
  □ Zero 400/500 API errors
  □ All CMS content renders correctly
  □ TypeScript compiles without errors
  □ Loading states function properly
  □ Error handling works as expected

✅ **CONSISTENCY SUCCESS:**
  □ Follows established patterns
  □ Uses proven import/API structures
  □ Maintains code consistency with home/services pages
  □ Proper fallback data implementation

✅ **MAINTAINABILITY SUCCESS:**
  □ Clear, self-documenting code
  □ Comprehensive error logging
  □ Proper TypeScript typing
  □ Easy to extend and modify
```

---

## 🔗 QUICK REFERENCE

### 19. **ESSENTIAL CODE SNIPPETS**

```typescript
// ✅ Basic Page Setup
import { strapiApi } from '@/lib/strapi';
import { StrapiPageType } from '@/lib/strapi/types/page-type';
import { StrapiGlobalSettings } from '@/lib/strapi/types/global-settings';

// ✅ Data Fetching
const [pageData, globalSettings] = await Promise.all([
  strapiApi.getSpecificPage(),
  strapiApi.getGlobalSettings()
]);

// ✅ Component Usage
<Component 
  title={pageData?.section?.title || "Fallback"}
  data={pageData?.section?.nestedComponent}
  sharedData={globalSettings?.SharedSection}
/>

// ✅ Impact Stats (Shared)
statistics={globalSettings?.ImpactStatistics?.statistics}
```

---

**🎯 THIS DOCUMENT IS YOUR SINGLE SOURCE OF TRUTH**

All patterns documented here are **battle-tested** and **production-ready**. When implementing new CMS integrations, follow these patterns exactly to ensure consistency and reliability.

**For questions or updates to this guide:**
- Reference working implementations in home.tsx and services.tsx
- Check actual schema files in the CMS codebase  
- Test thoroughly following the validation checklist
- Document any new patterns discovered

---

*Last verified: August 12, 2025 | Status: ✅ Production Ready*
