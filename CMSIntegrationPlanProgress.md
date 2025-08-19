# CompleoHealth CMS Integration Plan

This document outlines the comprehensive plan for integrating the Strapi CMS with the new CompleoHealth website. It includes detailed tasks, guidance on API structure, and a checklist to track progress.

## Project Overview

- **Old Website**: `C:\VSProjects\CompleoHealth`
- **New Website**: `C:\VSProjects\CompleoHealthLatest`
- **Strapi CMS**: `C:\VSProjects\CompleoHealthCMS`
- **Primary Goal**: Migrate CMS integration from old to new website with improved modular API structure
- **Languages**: Content will be managed in CMS; local i18n will be removed

## Modular API Structure Design

### Directory Structure

```
/client/src/lib/strapi/
  ├── types/
  │   ├── common.ts         # Shared types (buttons, media, etc.)
  │   ├── home.ts           # Home page specific types
  │   ├── services.ts       # Services page types
  │   ├── about.ts          # About page types
  │   ├── case-studies.ts   # Case studies types
  │   └── index.ts          # Re-exports all types
  ├── api/
  │   ├── config.ts         # API configuration (URLs, headers, etc.)
  │   ├── utils.ts          # Shared utilities (data extraction, error handling)
  │   ├── home.ts           # Home page API calls
  │   ├── services.ts       # Services page API calls
  │   ├── about.ts          # About page API calls
  │   ├── case-studies.ts   # Case studies API calls
  │   └── index.ts          # Re-exports all API functions
  └── index.ts              # Main entry point that re-exports everything
```

### Core Files Content

#### config.ts
```typescript
// API configuration
export const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
export const API_URL = `${STRAPI_URL}/api`;

// Common headers or request config
export const defaultHeaders = {
  'Content-Type': 'application/json',
};
```

#### utils.ts
```typescript
import axios from 'axios';
import qs from 'qs';

// Helper to handle Strapi's data structure
export const extractEntityData = (response: any) => {
  if (!response.data) return null;
  
  // Handle single entity
  if (response.data.attributes) {
    const { id, documentId } = response.data;
    const attributes = response.data.attributes;
    return { id, documentId, ...attributes };
  }
  
  // Handle collection
  if (Array.isArray(response.data)) {
    return response.data.map((item: any) => {
      const { id, documentId } = item;
      const attributes = item.attributes;
      return { id, documentId, ...attributes };
    });
  }
  
  return response.data;
};

// Create query string with proper population
export const createQueryString = (populateObject: any) => {
  return qs.stringify(
    { populate: populateObject },
    { encodeValuesOnly: true }
  );
};

// Error handler
export const handleApiError = (error: any, context: string) => {
  console.error(`Error in ${context}:`, error);
  if (axios.isAxiosError(error)) {
    console.error('API error details:', error.response?.data);
  }
  return null;
};
```

## Shared Component Types

These reusable component types will be defined in `types/common.ts`:

```typescript
// Button component used across multiple sections
export interface StrapiButton {
  text: string;        // Primary button text
  subtext?: string;    // Secondary/smaller text
  url: string;         // Link destination
  icon?: string;       // Icon identifier
  analyticsId?: string; // For tracking
}

// Media component for images, videos, etc.
export interface StrapiMedia {
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
}

// Impact statistic used in hero and other sections
export interface StrapiImpactStatistic {
  statId: string;      // Unique identifier
  value: string;       // The displayed value (e.g., "30+")
  label: string;       // Description label
  description?: string; // Additional context
}

export interface StrapiImpactStatisticGroup {
  title: string;
  statistics: StrapiImpactStatistic[];
}

// Feature bullet used in value cards and other sections
export interface StrapiFeatureBullet {
  text: string;        // Feature text
}

// Value card used in multiple sections
export interface StrapiValueCard {
  title: string;
  description: string;
  linkText?: string;
  linkUrl?: string;
  imageUrl?: string;
  Features?: StrapiFeatureBullet[];
}

// Approach feature used in approach panels
export interface StrapiApproachFeature {
  title: string;
  description: string;
}
```

## API Query Pattern

The successful API query pattern for deep population uses bracket notation:

```typescript
`${API_URL}/home?populate[Hero][populate][primaryButton]=*&populate[Hero][populate][secondaryButton]=*&populate[Hero][populate][ImpactStatistics][populate]=statistics`
```

This pattern should be followed for all CMS queries to ensure proper data retrieval.

## Integration Protocol

For each component integration, follow this protocol:

1. **Verify Strapi Model**: Confirm exact field/component names in Strapi
2. **Construct API Query**: Use bracket notation with correct field names
3. **Map Frontend Code**: Ensure frontend code matches Strapi response shape exactly
4. **Update TypeScript Interfaces**: Maintain type safety
5. **Debug with Logging**: Log API responses and check for 400 errors due to field mismatches

## Website Pages Requiring CMS Integration

- [x] **Analysis Phase Complete**
- [ ] **Implementation Phase**

### 1. Home Page
- [ ] Hero Section
- [ ] Value Proposition
- [ ] Approach Panels
- [ ] Healthcare Solutions
- [ ] Testimonials
- [ ] Location Map
- [ ] Curved CTA Panel

### 2. About Page
- [ ] Company Overview
- [ ] Team Section
- [ ] Mission & Values
- [ ] History Timeline

### 3. Services Page
- [ ] Services Overview
- [ ] Service Categories
- [ ] Service Details

### 4. Equipment Page
- [ ] Equipment Overview
- [ ] Equipment Categories
- [ ] Equipment Details

### 5. Case Studies Page
- [ ] Case Studies Listing
- [ ] Case Study Filters

### 6. Case Study Detail Page
- [ ] Case Study Content
- [ ] Related Case Studies

### 7. News & Views Page
- [ ] News Listing
- [ ] News Filters

### 8. News Detail Page
- [ ] News Content
- [ ] Related News

### 9. Sustainability Page
- [ ] Sustainability Overview
- [ ] Initiatives
- [ ] Impact Metrics

### 10. Careers Page
- [ ] Careers Overview
- [ ] Job Listings
- [ ] Benefits

### 11. Contact Page
- [ ] Contact Form
- [ ] Office Locations
- [ ] Contact Details

### 12. Privacy Policy Page
- [ ] Policy Content

### 13. Cookie Policy Page
- [ ] Policy Content

### 14. Terms & Conditions Page
- [ ] Terms Content

### 15. Accessibility Statement Page
- [ ] Statement Content

## Detailed Task List

### Phase 1: Setup and Analysis

- [x] Review differences between old and new website versions
- [x] Analyze Strapi CMS structure and integration in old website
- [x] Audit home page components for static/hardcoded text
- [x] Document mapping between static text and Strapi CMS fields
- [x] Identify shared/reusable component types
- [x] Design modular API structure

### Phase 2: Core Implementation

- [ ] Create directory structure for modular API
- [ ] Implement core configuration (config.ts)
- [ ] Implement utility functions (utils.ts)
- [ ] Create shared type definitions (types/common.ts)
- [ ] Create index files for proper exports
- [ ] Add VITE_STRAPI_URL to .env file

### Phase 3: Home Page Integration

- [ ] Create home page type definitions (types/home.ts)
- [ ] Implement home page API functions (api/home.ts)
- [ ] Update Hero Section component to use CMS data
- [ ] Update Value Proposition component to use CMS data
- [ ] Update Approach Panels component to use CMS data
- [ ] Update Healthcare Solutions component to use CMS data
- [ ] Update Testimonials component to use CMS data
- [ ] Update Location Map component to use CMS data
- [ ] Update Curved CTA Panel component to use CMS data
- [ ] Update Home page to fetch and distribute CMS data
- [ ] Test complete home page integration

### Phase 4: Remaining Pages Integration

- [ ] Analyze and document CMS requirements for each remaining page
- [ ] Create type definitions for each page
- [ ] Implement API functions for each page
- [ ] Update components to use CMS data
- [ ] Test each page integration

### Phase 5: Final Testing and Documentation

- [ ] Comprehensive testing of all CMS-integrated pages
- [ ] Performance optimization if needed
- [ ] Clean up debug logs and console statements
- [ ] Document the implementation and API usage
- [ ] Update developer onboarding/readme docs

## Component-Specific Mapping

### Hero Section

| New Website (Static Text/Props) | Strapi CMS Field | Notes |
|--------------------------------|------------------|-------|
| Heading: "We deliver what matters to you" | `strapiData.Hero[0].heading` | Main heading text |
| Highlight: "matters to you" | `strapiData.Hero[0].highlighttext` | Text to be highlighted in yellow |
| Subheading: "Advancing diagnostics..." | `strapiData.Hero[0].subheading` | Descriptive paragraph below heading |
| Video URL: "/videos/hero-background.mp4" | `strapiData.Hero[0].backgroundVideoURL` | Background video source |
| Fallback image URL | `strapiData.Hero[0].fallbackImageURL` | Image shown if video fails to load |
| Primary Button Text: "EXPLORE" | `strapiData.Hero[0].primaryButton.text` | Main CTA button text |
| Primary Button Subtext: "Our Solutions" | `strapiData.Hero[0].primaryButton.subtext` | Smaller text below main button text |
| Primary Button URL: "/services" | `strapiData.Hero[0].primaryButton.url` | Button link destination |
| Primary Button Icon: "Search" | `strapiData.Hero[0].primaryButton.icon` | Icon name (needs mapping logic) |
| Secondary Button Text: "READ" | `strapiData.Hero[0].secondaryButton.text` | Secondary CTA button text |
| Secondary Button Subtext: "Our Case Studies" | `strapiData.Hero[0].secondaryButton.subtext` | Smaller text below secondary button text |
| Secondary Button URL: "/case-studies" | `strapiData.Hero[0].secondaryButton.url` | Button link destination |
| Secondary Button Icon: "CalendarCheck" | `strapiData.Hero[0].secondaryButton.icon` | Icon name (needs mapping logic) |
| Impact Statistics Title: "Trusted by Healthcare Leaders and Patients" | `strapiData.Hero[0].ImpactStatistics.title` | Title for statistics section |
| Impact Statistics (from shared file) | `strapiData.Hero[0].ImpactStatistics.statistics` | Array of statistics objects |

### Value Proposition

| New Website (Static Text/Props) | Strapi CMS Field | Notes |
|--------------------------------|------------------|-------|
| Title: "Why Choose Compleo Health?" | `strapiData.ValueProposition.title` | Section title |
| Subtitle: "Our state-of-the-art scanners..." | `strapiData.ValueProposition.subtitle` | Section subtitle/description |
| Cards Array (3 default cards) | `strapiData.ValueProposition.ValuePropositionCards` | Array of card objects |
| Card 1 Title: "Cutting Edge Technology" | `strapiData.ValueProposition.ValuePropositionCards[0].title` | Card heading |
| Card 1 Description: "Latest MRI and CT scanner equipment" | `strapiData.ValueProposition.ValuePropositionCards[0].description` | Card description |
| Card 1 Link Text: "Explore Our Scanners →" | `strapiData.ValueProposition.ValuePropositionCards[0].linkText` | Card CTA text |
| Card 1 Link URL: "/equipment-details" | `strapiData.ValueProposition.ValuePropositionCards[0].linkUrl` | Card CTA destination |
| Card 1 Image: "/images/value-proposition/advanced-technology.jpg" | `strapiData.ValueProposition.ValuePropositionCards[0].imageUrl` | Card image |

### Approach Panels

| New Website (Static Text/Props) | Strapi CMS Field | Notes |
|--------------------------------|------------------|-------|
| Left Panel Title: "Our Partnership Approach" | `strapiPanels[0].title` | Panel heading |
| Left Panel Description1: "We offer more than technology..." | Part of `strapiPanels[0].description` | First paragraph |
| Left Panel Description2: "We focus on long-term value..." | Part of `strapiPanels[0].description` | Second paragraph |
| Left Panel Bullet Points (3 items) | `strapiPanels[0].ApproachFeatures` | Array of feature objects |
| Left Panel Bullet 1 Title: "Seamless Integration" | `strapiPanels[0].ApproachFeatures[0].title` | Feature heading |
| Left Panel Bullet 1 Description: "Positive and impactful..." | `strapiPanels[0].ApproachFeatures[0].description` | Feature description |

## Notes on Implementation

1. **Description Field Handling**: The Approach Panels component has `description1` and `description2` fields, but Strapi has a single `description` field. Options:
   - Modify Strapi model to have two description fields
   - Split the single Strapi description field in the component (e.g., by paragraph)
   - Concatenate the two description fields when sending to Strapi

2. **Icon Mapping**: Some components use icon names that may not match Strapi data. Create a mapping function to convert between them.

3. **Default Props**: Components should gracefully handle missing CMS data by providing sensible defaults.

4. **Debug Logging**: Include debug logging during development but remove before production.

5. **API Query Construction**: Use the bracket notation pattern for all deep population queries.

## Progress Tracking

Use this document to track progress by checking off completed tasks. Update regularly as implementation progresses.
