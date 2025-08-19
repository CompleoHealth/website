# Accessibility Fixes Documentation

## Current Accessibility Assessment (74% Overall Score)

### JavaScript-Free Access Challenge (15% Score)
**Issue**: React SPA requires JavaScript for all functionality  
**Impact**: Blocks access for users with JavaScript disabled, text browsers, and some assistive technologies

## Proposed Solution: Static Accessible Landing Page

### Implementation Approach: Parallel Static Page
- **URL**: `/accessible` (alongside main React SPA)
- **Method**: User choice via accessibility statement link
- **Maintenance**: Independent static HTML with CMS data integration

### Static Page Structure (Corrected)

```
/accessible
├── Essential Contact Information
│   ├── Manchester Office: Beehive Mill, Jersey Street, Manchester M4 6JG
│   │   └── Phone: +44 (0)161 884 1303
│   ├── Denmark Office: Nørresundby, Denmark  
│   └── Email: sales@compleohealth.com
│
├── About Us (B2B Healthcare Partnership Focus)
│   ├── Company overview: Services provider to healthcare partnerships
│   ├── Leadership Team (Text-Only Bios):
│   │   ├── Beverley Wallace - Chief Executive Officer
│   │   ├── Claire Zeki - Chief Financial Officer  
│   │   ├── David Uregbula - Commercial Director
│   │   ├── Candice Martin - Director of Operations
│   │   ├── Cordelia Wilson - Quality & Risk Director
│   │   ├── Paula Moore - Head of Business Operations
│   │   ├── Carsten Nyborg - Director of International Business Development
│   │   └── James Berry - Head of Logistics
│   └── 40+ years combined healthcare experience
│
├── Services (Accurate Service List from Navigation)
│   ├── 1. Managed Equipment Services
│   ├── 2. Equipment Rental  
│   ├── 3. Community Diagnostic Centres
│   ├── 4. Screening Programmes
│   └── 5. Clinical Insourcing
│
├── Accessibility Statement
│   ├── WCAG 2.1 AA compliance commitment
│   ├── Contact: sales@compleohealth.com for accessibility issues
│   └── Alternative access methods
│
└── Link back to full website
    └── "Access full interactive website" button
```

### Business Context Corrections Made
- **Target Audience**: NHS Trusts, healthcare partnerships, hospital administrators (NOT private patients)
- **Service Focus**: Equipment provision, clinical staff support, diagnostic services
- **No Patient Booking**: Contact information for partnership inquiries only
- **Team Roles**: Accurate titles from team-data.ts (James Berry is Head of Logistics, not Technology Director)

### CMS Integration Strategy
**Challenge**: Ensure content consistency between static accessible page and React SPA

**Solution Options:**

#### Option 1: Server-Side Template Generation (Recommended)
- Create Express.js endpoint that renders static HTML using same data sources
- Use shared data files: `shared/team-data.ts`, `shared/location-data.json`
- Template engine (Handlebars/EJS) generates static HTML from JSON data
- **Benefit**: Single source of truth, automatic updates

#### Option 2: Build-Time Static Generation
- Pre-build script generates static HTML from data files
- Updates when data changes via CI/CD pipeline
- **Benefit**: Performance, static serving

#### Option 3: Manual Template with Data Extraction
- Static HTML template with placeholders
- Script extracts data from shared files and updates template
- **Benefit**: Simple implementation

### File Structure
```
public/
├── accessible.html (static landing page)
├── accessible-styles.css (minimal, accessible CSS)
└── accessibility-statement.html

server/
└── accessible-template.hbs (if using Option 1)

shared/
├── team-data.ts (existing)
├── location-data.json (existing)
└── services-data.ts (needs creation for service descriptions)
```

### Technical Requirements
1. **Semantic HTML**: Proper heading hierarchy (h1, h2, h3)
2. **No JavaScript Dependencies**: Pure HTML/CSS only
3. **Screen Reader Optimized**: Descriptive text, skip links
4. **High Contrast**: WCAG AA compliant colors
5. **Keyboard Navigation**: Tab order, focus indicators
6. **Mobile Responsive**: Works on all devices without JavaScript

### Content Accuracy Standards
- Use exact team member names and roles from `shared/team-data.ts`
- Use accurate service names from navigation dropdown structure
- Maintain B2B healthcare partnership positioning throughout
- Include authentic contact information (Manchester +44 (0)161 884 1303, Denmark office)
- Reference correct email addresses (sales@compleohealth.com)

This approach provides immediate JavaScript-free accessibility while maintaining content accuracy and preparing for future CMS integration where updating shared data files automatically updates both the React SPA and static accessible page.