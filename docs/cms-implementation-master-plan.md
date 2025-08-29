# CMS Implementation Master Plan
*Consolidated Guide for Completing Strapi CMS Integration*

## Executive Summary

This document consolidates all CMS integration documentation into a single, actionable implementation plan for the remaining pages of the CompleoHealth website. Based on proven patterns from successfully integrated pages (Home, Services, About, Our Team, and 10+ service sub-pages), this guide provides step-by-step instructions for completing the CMS integration.

**Current Status**: 15 pages fully integrated with CMS, ~8 pages remaining  
**Proven Pattern**: Established and tested across multiple page types  
**Next Phase**: Complete remaining pages using identical patterns

---

## 🏗️ PROVEN ARCHITECTURE & PATTERNS

### Core Integration Pattern (Battle-Tested)

```typescript
// 1. State Management
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [pageData, setPageData] = useState<PageType | null>(null);
const [globalSettings, setGlobalSettings] = useState<StrapiGlobalSettings | null>(null);

// 2. Parallel Data Fetching
useEffect(() => {
  const fetchPageData = async () => {
    try {
      const [pageData, globalSettingsData] = await Promise.all([
        strapiApi.getSpecificPage(),
        strapiApi.getGlobalSettings()
      ]);
      setPageData(pageData);
      setGlobalSettings(globalSettingsData);
    } catch (err) {
      setError('Failed to load page content');
    } finally {
      setIsLoading(false);
    }
  };
  fetchPageData();
}, []);

// 3. Loading/Error States
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorState />;

// 4. Component Integration
<Component 
  title={pageData?.section?.title || "Fallback"}
  data={pageData?.section?.nestedData}
  sharedData={globalSettings?.SharedSection}
/>
```

### API Module Structure

```
/client/src/lib/strapi/api/
├── [page-name].ts      // Page-specific API
├── global-settings.ts  // Shared global data
├── config.ts          // API configuration
├── utils.ts           // Helper functions
└── index.ts           // Centralized exports
```

### Populate Object Pattern

```typescript
// Simple Components (no nesting)
const populateObject = {
  SimpleComponent: '*',
  AnotherComponent: '*'
};

// Nested Components
const populateObject = {
  ComplexSection: {
    populate: {
      NestedComponent: '*',
      RepeatableItems: {
        populate: {
          SubItems: '*'
        }
      }
    }
  }
};

// CRITICAL: Direct call, no wrapping
const queryString = createQueryString(populateObject);
```

---

## 📋 IMPLEMENTATION STATUS

### ✅ Completed Pages (Reference Implementations)

| Page | API Module | Key Pattern | Notes |
|------|------------|-------------|-------|
| **Home** | `homeApi` | Parallel fetching, nested components | Full integration with all sections |
| **Services** | `servicesApi` | Collection + single type | Hero + service cards |
| **About** | `aboutApi` | Parallel fetching with global settings | Company overview, values, features |
| **Our Team** | `ourTeamApi` | Simple `populate=*` pattern | Hero, leadership, culture sections |
| **Work With Us** | `workWithUsApi` | Simple `populate=*` pattern | Hero, benefits, CTA sections |
| **Clinical Insourcing** | `clinicalInsourcingApi` | Direct module import | Service sub-page pattern |
| **Community Diagnostic Centres** | `communityDiagnosticCentresApi` | Direct module import | Service sub-page pattern |
| **Equipment Rental** | `equipmentRentalApi` | Direct module import | Service sub-page pattern |
| **Managed Equipment** | `managedEquipmentApi` | Direct module import | Service sub-page pattern |
| **Screening Programmes** | `screeningProgrammesApi` | Direct module import | Service sub-page pattern |
| **Equipment Details** | `equipmentDetailsApi` | Dynamic slug routing | Individual equipment pages |
| **News and Views** | `newsAndViewsApi` | Fixed imports | News listing page |
| **Social Impact** | `sustainabilityApi` | Full CMS integration | Sustainability content |

### ❌ Remaining Pages to Integrate

| Page | Priority | Complexity | Content Type Needed |
|------|----------|------------|-------------------|
| **Our Team** | High | Low | Use existing team-data.ts or team collection |
| **Case Studies** | High | Medium | case-studies collection |
| **Contact** | Medium | Low | contact-page (single) |
| **Work With Us** | Medium | Low | careers-page (single) |
| **Net Zero Goals** | Low | Low | net-zero-page (single) |
| **Privacy Policy** | Low | Low | privacy-policy (single) |
| **Cookie Policy** | Low | Low | cookie-policy (single) |
| **Accessibility** | Low | Low | accessibility (single) |
| **Sitemap** | N/A | N/A | Auto-generated |

---

## 🚀 STEP-BY-STEP IMPLEMENTATION GUIDE

### For Each Remaining Page:

#### Phase 1: Strapi Backend Implementation (CMS Project)

##### 1.1 Create API Directory Structure
⚠️ **CRITICAL**: ALL backend files MUST use `.ts` extension with ES6 syntax!
Create the following structure in `C:\VSProjects\CompleoHealthCMS\src\api\[page-name]\`:

```
src/api/[page-name]/
├── content-types/
│   └── [page-name]/
│       └── schema.json
├── controllers/
│   └── [page-name].ts
├── routes/
│   └── [page-name].ts
└── services/
    └── [page-name].ts
```

##### 1.2 Create Schema File
`src/api/[page-name]/content-types/[page-name]/schema.json`:

```json
{
  "kind": "singleType",
  "collectionName": "[page_name]s",
  "info": {
    "singularName": "[page-name]",
    "pluralName": "[page-name]s",
    "displayName": "[Page Name]",
    "description": "[Page description]"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "Hero": {
      "type": "component",
      "repeatable": false,
      "component": "sections.hero-section"
    },
    "ContentSections": {
      "type": "component",
      "repeatable": true,
      "component": "content.content-block"
    },
    "seoTitle": {
      "type": "string"
    },
    "seoDescription": {
      "type": "text"
    }
  }
}
```

##### 1.3 Create Controller
`src/api/[page-name]/controllers/[page-name].ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::[page-name].[page-name]');
```

##### 1.4 Create Service
`src/api/[page-name]/services/[page-name].ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::[page-name].[page-name]');
```

##### 1.5 Create Routes
`src/api/[page-name]/routes/[page-name].ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::[page-name].[page-name]');
```

##### 1.6 Create Required Components
If the schema references components that don't exist, create them in `src/components/`:

`src/components/[category]/[component-name].json`:

```json
{
  "collectionName": "components_[category]_[component_name]s",
  "info": {
    "displayName": "[Component Name]",
    "description": ""
  },
  "options": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "text"
    },
    "image": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "buttonText": {
      "type": "string"
    },
    "buttonUrl": {
      "type": "string"
    }
  }
}
```

##### 1.7 Restart Strapi & Set Permissions
After creating all files:

1. **Restart Strapi** to register new content types:
   ```bash
   npm run develop
   ```

2. **Set Public Permissions** in Strapi Admin:
   - Go to Settings → Roles → Public
   - Find your new content type
   - Check `find` permission
   - Save

3. **Add Content** in Strapi Admin:
   - Go to Content Manager
   - Find your single type
   - Add content
   - Save and Publish

#### Phase 2: Frontend API Module Implementation

1. **Create API file** `/client/src/lib/strapi/api/[page-name].ts`:

```typescript
import axios from 'axios';
import { API_URL } from './config';
import { createQueryString, extractEntityData, handleApiError } from './utils';

// Define populate object based on content structure
const createPagePopulateObject = () => {
  return {
    Hero: '*',
    ContentSections: {
      populate: {
        Items: '*'
      }
    }
    // Add fields based on Strapi schema
  };
};

export const pageNameApi = {
  getPageName: async () => {
    try {
      const populateObject = createPagePopulateObject();
      const queryString = createQueryString(populateObject);
      const response = await axios.get(`${API_URL}/page-name?${queryString}`);
      const data = extractEntityData(response.data);
      return data;
    } catch (error) {
      return handleApiError(error, 'getPageName');
    }
  }
};
```

2. **Add to index.ts** exports:
```typescript
export { pageNameApi } from './page-name';
```

#### Phase 3: TypeScript Types

1. **Create types file** `/client/src/lib/strapi/types/[page-name].ts`:

```typescript
import { StrapiButton, StrapiMedia } from './common';

export interface StrapiPageName {
  Hero?: {
    title: string;
    subtitle?: string;
    backgroundImage?: StrapiMedia;
    primaryButton?: StrapiButton;
  };
  ContentSections?: Array<{
    title: string;
    description: string;
    items?: Array<{
      name: string;
      value: string;
    }>;
  }>;
  // Match Strapi schema exactly
}
```

#### Phase 4: Page Component Integration

1. **Import dependencies**:
```typescript
import { useState, useEffect } from 'react';
import { strapiApi } from '@/lib/strapi';
import { StrapiPageName } from '@/lib/strapi/types/page-name';
import { StrapiGlobalSettings } from '@/lib/strapi/types/global-settings';
```

2. **Add state management**:
```typescript
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [pageData, setPageData] = useState<StrapiPageName | null>(null);
const [globalSettings, setGlobalSettings] = useState<StrapiGlobalSettings | null>(null);
```

3. **Implement data fetching**:
```typescript
useEffect(() => {
  const fetchPageData = async () => {
    try {
      const [pageData, globalSettingsData] = await Promise.all([
        strapiApi.getPageName(),
        strapiApi.getGlobalSettings()
      ]);
      setPageData(pageData);
      setGlobalSettings(globalSettingsData);
    } catch (err) {
      console.error('Error fetching CMS data:', err);
      setError('Failed to load page content');
    } finally {
      setIsLoading(false);
    }
  };
  fetchPageData();
}, []);
```

4. **Add loading/error states** (use existing pattern):
```typescript
if (isLoading) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img 
          src="/images/shared/logo-loading.png" 
          alt="Compleo Health Logo" 
          className="w-[768px] h-auto max-w-[70vw] max-h-[40vh] object-contain animate-logo-grow"
        />
      </div>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-compleo-teal relative z-10 mb-6"></div>
      <p className="text-compleo-gray text-lg font-medium relative z-10">Loading...</p>
    </div>
  );
}

if (error) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Page</h1>
        <p className="text-gray-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-compleo-teal text-white rounded hover:bg-compleo-deep-teal"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
```

5. **Update component props** with CMS data:
```typescript
// Replace static data with CMS data
<HeroSection 
  title={pageData?.Hero?.title || staticFallback.title}
  subtitle={pageData?.Hero?.subtitle || staticFallback.subtitle}
  backgroundImage={pageData?.Hero?.backgroundImage?.url}
/>

<ContentSection 
  sections={pageData?.ContentSections || staticFallbackSections}
/>
```

---

## 🎯 CRITICAL SUCCESS RULES

### UI Preservation (ABSOLUTE PRIORITY)
- ❌ **NEVER** change layout, styling, or visual design
- ❌ **NEVER** modify CSS classes or component structure
- ❌ **NEVER** alter animations or interactions
- ✅ **ONLY** replace hardcoded text with CMS content
- ✅ **ONLY** replace static data arrays with CMS arrays

### Data Flow Pattern
1. **CMS First**: Always prioritize CMS data
2. **Static Fallback**: Use existing static data as fallback
3. **Type Safety**: Ensure interfaces match both CMS and static data
4. **Optional Chaining**: Use `?.` for all CMS data access

### Loading Sequence (MANDATORY)
1. Show loading spinner immediately
2. Fetch all data in parallel
3. Render with CMS data (no static flash)
4. Use fallback only if CMS data is null

---

## 🔧 STRAPI BACKEND PATTERNS (WORKING EXAMPLES)

### Example: Services Page Backend Structure

This is the actual working structure from your services page implementation:

#### Directory Structure
```
C:\VSProjects\CompleoHealthCMS\src\api\services-page\
├── content-types\
│   └── services-page\
│       └── schema.json
├── controllers\
│   └── services-page.ts
├── routes\
│   └── services-page.ts
└── services\
    └── services-page.ts
```

#### Actual Schema Example (services-page)
`src/api/services-page/content-types/services-page/schema.json`:

```json
{
  "kind": "singleType",
  "collectionName": "services_pages",
  "info": {
    "singularName": "services-page",
    "pluralName": "services-pages",
    "displayName": "Services Page",
    "description": "Main services page content"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "heroContent": {
      "type": "component",
      "repeatable": false,
      "component": "sections.service-hero"
    },
    "sectionTitle": {
      "type": "string",
      "default": "Our Services"
    },
    "sectionDescription": {
      "type": "text"
    },
    "services": {
      "type": "component",
      "repeatable": true,
      "component": "cards.value-cards"
    },
    "ApproachFeatures": {
      "type": "component",
      "repeatable": true,
      "component": "bullets.approach-bullets"
    },
    "impactStatsTitle": {
      "type": "string"
    },
    "CurvedPill_CTA": {
      "type": "component",
      "repeatable": false,
      "component": "cta.curved-pill-cta"
    }
  }
}
```

### Component Examples (Working)

#### Value Card Component
`src/components/cards/value-cards.json`:

```json
{
  "collectionName": "components_cards_value_cards",
  "info": {
    "displayName": "Value Cards",
    "description": "Card with title, description and features"
  },
  "options": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "text"
    },
    "linkText": {
      "type": "string"
    },
    "linkUrl": {
      "type": "string"
    },
    "imageUrl": {
      "type": "string"
    },
    "Features": {
      "type": "component",
      "repeatable": true,
      "component": "bullets.feature-bullets"
    }
  }
}
```

#### Feature Bullet Component
`src/components/bullets/feature-bullets.json`:

```json
{
  "collectionName": "components_bullets_feature_bullets",
  "info": {
    "displayName": "Feature Bullets",
    "description": "Single feature bullet point"
  },
  "options": {},
  "attributes": {
    "text": {
      "type": "string",
      "required": true
    }
  }
}
```

### Collection Type Example (Equipment Details)

For pages that need multiple entries (like equipment, case studies, team members):

#### Schema for Collection
`src/api/equipment-detail/content-types/equipment-detail/schema.json`:

```json
{
  "kind": "collectionType",
  "collectionName": "equipment_details",
  "info": {
    "singularName": "equipment-detail",
    "pluralName": "equipment-details",
    "displayName": "Equipment Details"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "title": {
      "type": "string",
      "required": true
    },
    "category": {
      "type": "enumeration",
      "enum": ["MRI", "CT", "Ultrasound", "X-Ray"],
      "required": true
    },
    "specifications": {
      "type": "component",
      "repeatable": true,
      "component": "equipment.specification"
    }
  }
}
```

---

## 📊 SPECIFIC PAGE IMPLEMENTATION NOTES

### Our Team Page
- **Options**:
  1. Continue using static `team-data.ts` (simpler)
  2. Create team member collection in Strapi
- **Recommendation**: Keep static for now, focus on content pages

### Case Studies Page
- **Content**: Case study cards with filtering
- **Pattern**: Collection type with categories
- **Components**: Filter buttons, case study cards, detail pages

### Contact Page
- **Content**: Contact form, office locations, contact details
- **Note**: Form functionality remains unchanged, only surrounding content from CMS

### Policy Pages
- **Content**: Long-form text content
- **Pattern**: Single rich text field or markdown
- **Components**: Simple hero + content area

---

## 🧪 VALIDATION CHECKLIST

Before marking any page as complete:

### Technical Validation
- [ ] API returns expected data structure
- [ ] No 400/500 errors in console
- [ ] TypeScript compiles without errors
- [ ] Loading state shows immediately
- [ ] No content flash after loading

### Visual Validation
- [ ] UI looks identical to static version
- [ ] All animations preserved
- [ ] Responsive design intact
- [ ] No layout shifts

### Content Validation
- [ ] All CMS content renders correctly
- [ ] Fallback content works when needed
- [ ] Global settings data shared properly
- [ ] No missing content sections

### Performance Validation
- [ ] Page loads within 2 seconds
- [ ] Parallel API calls working
- [ ] No unnecessary re-renders

---

## 🔄 MAINTENANCE & BEST PRACTICES

### When Schema Changes
1. Update TypeScript interfaces first
2. Adjust populate objects
3. Update component props
4. Test thoroughly before deployment

### When Adding New Components
1. Check if component exists in Strapi
2. Follow naming conventions
3. Reuse existing components when possible
4. Document new patterns

### Code Quality
1. Remove console.logs after testing
2. Use consistent error handling
3. Follow established import patterns
4. Maintain type safety throughout

---

## 🚦 IMPLEMENTATION PRIORITY ORDER

### Phase 1: High-Value Pages (Week 1)
1. **Our Team** - Team profiles
2. **Case Studies** - Portfolio content
3. **Contact** - Contact information

### Phase 2: Supporting Pages (Week 2)
4. **Work With Us** - Careers content
5. **Net Zero Goals** - Sustainability content

### Phase 3: Policy Pages (Week 3)
6. **Privacy Policy**
7. **Cookie Policy**
8. **Accessibility Statement**

---

## 📝 NOTES & REMINDERS

### Critical Reminders
- **ALWAYS** test loading states thoroughly
- **NEVER** skip the fallback implementation
- **ALWAYS** preserve existing UI exactly
- **NEVER** make multiple changes at once

### Common Pitfalls to Avoid
- Don't populate simple string fields
- Don't use non-existent fields
- Don't skip global settings fetch
- Don't deviate from proven patterns
- **CRITICAL**: Always import `DEFAULT_TIMEOUT` from config when using it
- **CRITICAL**: Use `populate=*` for simple cases, not complex nested objects
- **CRITICAL**: Check exact working patterns before creating new populate structures

### Resources
- Working examples: home.tsx, services.tsx
- API patterns: /lib/strapi/api/
- Type definitions: /lib/strapi/types/
- Strapi schemas: /src/api/ (in CMS project)

---

## 🚨 **CRITICAL TROUBLESHOOTING GUIDE**

### **400 Bad Request Errors**

**Symptoms**: API returns 400 error, console shows `❌ API Error: AxiosError`

**Root Cause Analysis from Our Team Implementation**:

#### **Issue 1: Import Errors** ⚠️ **CRITICAL**
**Problem**: `DEFAULT_TIMEOUT is not defined` error
**Solution**: Always check imports in API files
```typescript
// ❌ WRONG - Missing import
import { API_URL } from './config';

// ✅ CORRECT - Complete import
import { API_URL, DEFAULT_TIMEOUT } from './config';
```

#### **Issue 2: Complex Populate Objects** ⚠️ **CRITICAL**
**Problem**: Using nested populate when simple is needed
**Failed Approach**:
```typescript
// ❌ WRONG - Complex nested populate (causes 400 errors)
const populateObject = {
  Hero: {
    populate: {
      primaryButton: '*',
      secondaryButton: '*',
      backgroundImage: '*'
    }
  }
};
```

**Working Solution**:
```typescript
// ✅ CORRECT - Simple populate=* (works every time)
const queryString = 'populate=*';
```

#### **Issue 3: Assuming Populate Patterns** ⚠️ **CRITICAL**
**Problem**: Not checking actual working patterns in codebase
**Process to Follow**:
1. **First**: Use `populate=*` (simplest pattern)
2. **If needed**: Check existing working pages for exact pattern
3. **Never**: Create new complex populate structures without verification

### **Working Patterns Reference** ✅

**Pattern A: Simple Populate** (Recommended first attempt)
```typescript
// Used by: managed-equipment, equipment-details, our-team
const queryString = 'populate=*';
```

**Pattern B: Flat Object Populate**
```typescript
// Used by: about, equipment-rental, community-diagnostic-centres
const populateObject = {
  componentField1: '*',
  componentField2: '*',
  mediaField: '*'
};
const queryString = createQueryString(populateObject);
```

**Pattern C: Complex Nested** (Advanced - use only if confirmed working)
```typescript
// Used by: home page (complex multi-level components)
const populateObject = {
  Hero: {
    populate: {
      primaryButton: '*',
      secondaryButton: '*'
    }
  }
};
```

### **Debugging Checklist**

When API fails:
1. ✅ Check all imports in API file
2. ✅ Try `populate=*` first
3. ✅ Verify content exists and is published in Strapi
4. ✅ Confirm API permissions are set (Public → find)
5. ✅ Test endpoint in browser: `http://localhost:1337/api/[content-type]`
6. ✅ Check component references match actual component names
7. ✅ Verify Strapi has been restarted after schema changes

### **Strapi Backend File Requirements** ⚠️ **CRITICAL**
**From Case-studies Implementation**:

#### **Issue 6: JavaScript vs TypeScript File Extensions** ⚠️ **ABSOLUTE RULE**
**Problem**: Content type exists in Strapi admin but doesn't appear in API permissions
**Root Cause**: Using `.js` files with CommonJS syntax instead of `.ts` files with ES6 syntax
**Solution**: 
```typescript
// ❌ WRONG - JavaScript files (.js) with CommonJS
// case-studies-page.js
const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::case-studies-page.case-studies-page');

// ✅ CORRECT - TypeScript files (.ts) with ES6 imports
// case-studies-page.ts
import { factories } from '@strapi/strapi'
export default factories.createCoreController('api::case-studies-page.case-studies-page');
```
**Critical Rule**: ALWAYS use `.ts` files for all Strapi backend files (controllers, services, routes)

### **React Component Errors** ⚠️ **CRITICAL**
**From Work-with-us Implementation**:

#### **Issue 3: Icon Management in CMS** ⚠️ **ABSOLUTE RULE**
**Problem**: `BrandedIcon` component received undefined icons from CMS data
**Root Cause**: Icons should NEVER be managed through CMS
**Solution**: 
```typescript
// ❌ WRONG - Icons in CMS schemas
export interface StrapiBenefitItem {
  icon: string;  // DON'T DO THIS
  title: string;
  description: string;
}

// ✅ CORRECT - Icons stay static, only text in CMS
export interface StrapiBenefitItem {
  title: string;      // CMS managed
  description: string; // CMS managed
  // icon comes from static data
}
```
**Critical Rule**: Icons are always static - map CMS text to static icons:
```typescript
// Always use static icons from JSON data
const staticIcons = workWithUsData.benefits.items[index]?.icon || 'Award';
```

#### **Issue 4: Link Component Hover Issues** ⚠️ **CRITICAL**
**Problem**: Cursor flashing, buttons extending clickable area outside bounds
**Root Cause**: Adding className to Link wrapper when other pages don't have it
**Solution**: 
```typescript
// ❌ WRONG - Adding className to Link (causes hover issues)
<Link href={url} className="inline-block w-36 sm:w-48">
  <Button>...</Button>
</Link>

// ✅ CORRECT - NO className on Link (matches working pages)
<Link href={url}>
  <Button className="w-36 sm:w-48">...</Button>
</Link>
```
**Critical Rule**: NEVER add className to Link wrappers around buttons - compare with working pages exactly!

#### **Issue 5: Animation Intersection Observer** ⚠️ 
**Problem**: Hero content invisible due to opacity animation not triggering
**Root Cause**: Intersection observer not triggering on page load for already-visible content
**Solution**: Remove animation temporarily or ensure proper observer setup
**Critical Rule**: When debugging, temporarily remove opacity animations to isolate issues

---

## 🎯 SUCCESS METRICS

Implementation is complete when:
- ✅ All pages load with CMS content
- ✅ No visual differences from static version
- ✅ Loading states work consistently
- ✅ Error handling prevents crashes
- ✅ TypeScript compilation succeeds
- ✅ Performance metrics maintained
- ✅ Content editors can update via Strapi

---

## 🎓 **LESSONS LEARNED FROM OUR TEAM INTEGRATION**

### **What Worked** ✅
1. **Simple `populate=*` approach** - Immediately resolved 400 errors
2. **Copying exact imports** from working pages (`DEFAULT_TIMEOUT`)
3. **Following proven response pattern** (`response.data.data`)
4. **Comprehensive console logging** for debugging

### **What Failed** ❌
1. **Complex nested populate objects** - Caused 400 Bad Request
2. **Assuming patterns** without checking existing code
3. **Missing imports** - Caused runtime errors
4. **Trying to be clever** instead of following working examples

### **Key Implementation Time**
- **Total time**: ~45 minutes (including debugging)
- **Time wasted on wrong approaches**: ~30 minutes
- **Time using proven pattern**: ~15 minutes

**Lesson**: Always start with the simplest working pattern first!

---

*This master plan consolidates learnings from 15 successfully integrated pages. Follow these patterns exactly for guaranteed success.*