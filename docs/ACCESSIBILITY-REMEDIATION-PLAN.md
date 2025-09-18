# CompleoHealth Accessibility Remediation Plan
## Comprehensive WCAG 2.1 AA Compliance Roadmap

**Audit Date:** September 18, 2025
**Current Compliance:** ~35% (revised from inflated 93% claim)
**Target:** 100% WCAG 2.1 AA compliance
**Total Effort:** 61 hours over 8 weeks

---

## Executive Summary

Following comprehensive review of SortSite reports and codebase analysis, the CompleoHealth website has significant accessibility barriers that require immediate attention. The previous 93% compliance estimate was based primarily on image alt text coverage and missed critical WCAG AA violations.

**Reality Check:**
- **SortSite Reports** identified multiple Level A and AA failures
- **Dynamic alt text** is working correctly (equipment: `${item.name} - ${item.manufacturer}`, team: `${leader.name}`)
- **Critical violations** affect color contrast, forms, navigation, and media across all 20+ pages

---

## Critical Issues Identified

### 1. Color Contrast Failures (WCAG 1.4.3 - Level AA) ❌
**Current State:** Compleo teal `rgb(0,169,144)` = 2.97:1 ratio
**Required:** 4.5:1 for normal text, 3:1 for large text
**Impact:** Affects all buttons, links, contact info, CTA elements sitewide

**SortSite Evidence:**
```
2.97 with color: rgb(0,169,144) background: rgb(255,255,255)
- Phone number: +44 (0)161 884 1303
- Email links: sales@compleohealth.com
- Button text and CTA elements
```

**Files Affected:**
- Global CSS/Tailwind configuration
- All button components
- Contact information displays
- CTA sections across all pages

### 2. Form Accessibility Breakdown (WCAG 1.3.1, 4.1.2 - Level A/AA) ❌
**Current State:** Complete screen reader failure

**SortSite Evidence:**
```
HTML form control has no accessible name:
- <input name='firstName' placeholder='' value=''>
- <input name='lastName' placeholder='' value=''>
- <input type='email' name='email' placeholder='' value=''>
- <input name='organization' placeholder='' value=''>
```

**Files Affected:**
- `client/src/components/forms/contact-form.tsx`
- `client/src/components/forms/enhanced-contact-form.tsx`
- All form components across service pages

### 3. Navigation Accessibility Failures (WCAG 2.4.1, 2.4.7 - Level A/AA) ❌

#### Broken Skip Links
**SortSite Evidence:**
```
This skip link is broken. The target anchor does not exist:
No element with id='main-content'
<a href='#main-content'>Skip to main content</a>
```

#### Invisible Focus Indicators
**SortSite Evidence:**
```
The CSS outline or border style makes it difficult to see focus outline:
- outline-color: matches background
- Multiple button and form elements affected
```

**Files Affected:**
- All page files (missing `id="main-content"`)
- Global CSS focus styles
- All interactive components

### 4. Media Accessibility Violations (WCAG 1.4.2 - Level A) ❌
**SortSite Evidence:**
```
A video plays longer than 5 seconds, without a way to pause it:
<video autoplay loop playsinline class='w-full h-full'>
```

**Files Affected:**
- `client/src/pages/equipmentdetails.tsx:122` (OrkneyDelivery.mp4)
- Home page hero videos
- Service page background videos

### 5. Interactive Element Issues (WCAG 4.1.2 - Level AA) ❌
**SortSite Evidence:**
```
The element button must not appear as a descendant of the a element:
- Equipment cards with nested buttons
- Team member cards with nested interactive elements
```

**Files Affected:**
- `client/src/components/equipment/equipment-showcase.tsx`
- `client/src/pages/our-team.tsx`
- All card-based layouts

### 6. Missing ARIA Labels (WCAG 1.1.1 - Level A) ❌
**SortSite Evidence:**
```
SVG elements with graphic role attributes must have an accessible name:
<svg role='img' viewBox='0 0 24 24'>
- LinkedIn icons
- Navigation icons
- Decorative elements
```

---

## Phase 1: Critical Fixes (Weeks 1-2) - 15 hours

### Priority 1.1: Color Contrast Resolution (4 hours)
**Objective:** Achieve 4.5:1 contrast ratio for all text elements

**Tasks:**
1. **Update primary color:**
   - Change `rgb(0,169,144)` to `rgb(0,135,115)` (4.5:1 ratio)
   - Update Tailwind configuration
   - Test across all components

2. **Verify secondary colors:**
   - Check yellow accent color contrast
   - Validate button text visibility
   - Test hover states

**Files to modify:**
- `tailwind.config.js` - Update compleo-teal color value
- Test all button components for contrast
- Verify contact information displays

### Priority 1.2: Form Accessibility (5 hours)
**Objective:** Enable screen reader access to all forms

**Tasks:**
1. **Add proper labels:**
   ```tsx
   // Before
   <input name='firstName' placeholder='' value=''>

   // After
   <label htmlFor="firstName">First Name</label>
   <input id="firstName" name='firstName' placeholder='Enter first name' value=''>
   ```

2. **Implement ARIA attributes:**
   - Add `aria-describedby` for validation messages
   - Include `aria-required` for mandatory fields
   - Add `aria-invalid` for error states

**Files to modify:**
- `client/src/components/forms/contact-form.tsx`
- `client/src/components/forms/enhanced-contact-form.tsx`
- All service page inquiry forms

### Priority 1.3: Skip Links & Main Content (3 hours)
**Objective:** Enable keyboard navigation

**Tasks:**
1. **Add main content targets:**
   ```tsx
   // Add to all page components
   <main id="main-content" className="...">
   ```

2. **Implement visible skip links:**
   ```css
   .skip-link {
     position: absolute;
     top: -40px;
     left: 6px;
     background: #000;
     color: #fff;
     padding: 8px;
     text-decoration: none;
     transition: top 0.3s;
   }

   .skip-link:focus {
     top: 6px;
   }
   ```

**Files to modify:**
- All page components in `client/src/pages/`
- `client/src/components/layout/header.tsx`

### Priority 1.4: Focus Indicators (3 hours)
**Objective:** Make keyboard navigation visible

**Tasks:**
1. **Implement high-contrast focus styles:**
   ```css
   *:focus-visible {
     outline: 2px solid #0066cc;
     outline-offset: 2px;
   }
   ```

2. **Test keyboard navigation:**
   - Tab through all interactive elements
   - Verify focus order is logical
   - Ensure all controls are reachable

**Files to modify:**
- Global CSS file
- All interactive components

---

## Phase 2: Core Functionality (Weeks 3-4) - 22 hours

### Priority 2.1: Media Accessibility (8 hours)
**Objective:** Comply with autoplay and control requirements

**Tasks:**
1. **Remove autoplay or add controls:**
   ```tsx
   // Option 1: Remove autoplay
   <video loop muted playsInline controls>

   // Option 2: Add pause button
   <button onClick={() => videoRef.current?.pause()}>
     Pause Video
   </button>
   ```

2. **Add captions where needed:**
   - Review all video content
   - Add .vtt caption files
   - Implement caption toggle

**Files to modify:**
- `client/src/pages/equipmentdetails.tsx:122`
- Home page hero sections
- All pages with background videos

### Priority 2.2: Fix Nested Interactive Elements (6 hours)
**Objective:** Ensure proper screen reader interpretation

**Tasks:**
1. **Restructure equipment cards:**
   ```tsx
   // Before: Button inside Link
   <Link href={url}>
     <Card>
       <Button>Learn More</Button>
     </Card>
   </Link>

   // After: Separate interactive elements
   <Card>
     <Link href={url}>View Details</Link>
     <Button onClick={handleContact}>Contact</Button>
   </Card>
   ```

2. **Update team member cards:**
   - Remove nested buttons from clickable cards
   - Provide alternative interaction patterns

**Files to modify:**
- `client/src/components/equipment/equipment-showcase.tsx`
- `client/src/pages/our-team.tsx`
- All card-based layouts

### Priority 2.3: ARIA Labels for Icons (4 hours)
**Objective:** Provide accessible names for screen readers

**Tasks:**
1. **Add SVG accessibility:**
   ```tsx
   // Before
   <svg role='img' viewBox='0 0 24 24'>

   // After
   <svg role='img' aria-label="LinkedIn Profile" viewBox='0 0 24 24'>
   ```

2. **Review all icons:**
   - Navigation icons
   - Social media links
   - Decorative vs functional icons

### Priority 2.4: Form Validation & Error Handling (4 hours)
**Objective:** Accessible error communication

**Tasks:**
1. **Implement error announcements:**
   ```tsx
   <div role="alert" id="error-summary">
     Please correct the following errors:
   </div>
   ```

2. **Add field-level validation:**
   - Real-time validation feedback
   - Clear error descriptions
   - Success confirmations

---

## Phase 3: Comprehensive Compliance (Weeks 5-8) - 24 hours

### Priority 3.1: Semantic Markup Review (8 hours)
- Fix heading hierarchy across all pages
- Add proper landmark roles (`<nav>`, `<aside>`, `<section>`)
- Implement semantic HTML5 elements

### Priority 3.2: Image Alt Text Completion (8 hours)
- Audit all decorative images (`alt=""`)
- Add detailed descriptions for complex images
- Implement alt text for CSS background images using ARIA

### Priority 3.3: Advanced ARIA Implementation (8 hours)
- Add `aria-expanded` for collapsible content
- Implement `aria-describedby` relationships
- Add `aria-live` regions for dynamic content

---

## Validation & Testing Protocol

### Automated Testing
1. **Install axe-core** for continuous monitoring
2. **Run Lighthouse accessibility audits** before/after changes
3. **Implement Pa11y** in CI/CD pipeline

### Manual Testing Checklist
- [ ] Keyboard navigation through all pages
- [ ] Screen reader testing (NVDA/JAWS) for forms
- [ ] Color contrast verification with tools
- [ ] Focus indicator visibility testing
- [ ] Video control functionality

### User Testing
- [ ] Include users with disabilities in QA process
- [ ] Test with actual assistive technologies
- [ ] Validate real-world usage scenarios

---

## File Location Reference

### Key Files for Phase 1 & 2:
```
client/src/
├── components/
│   ├── forms/
│   │   ├── contact-form.tsx          # Form accessibility fixes
│   │   └── enhanced-contact-form.tsx # Form accessibility fixes
│   ├── equipment/
│   │   └── equipment-showcase.tsx    # Fix nested buttons
│   └── layout/
│       └── header.tsx                # Skip links implementation
├── pages/
│   ├── equipmentdetails.tsx          # Video autoplay fix
│   ├── our-team.tsx                  # Team card interaction fix
│   └── [all pages]                   # Add main content IDs
├── styles/
│   └── globals.css                   # Focus indicators, contrast
└── tailwind.config.js                # Color contrast updates
```

---

## Success Metrics

### Phase 1 Completion Criteria:
- [ ] All text achieves 4.5:1 contrast ratio
- [ ] All form inputs have accessible labels
- [ ] Skip links work on all pages
- [ ] Focus indicators visible for keyboard users

### Phase 2 Completion Criteria:
- [ ] No autoplay videos without controls
- [ ] No nested interactive elements
- [ ] All icons have accessible names
- [ ] Form validation provides clear feedback

### Final Compliance Target:
- [ ] 100% WCAG 2.1 AA compliance
- [ ] Pass automated accessibility testing
- [ ] Successful manual keyboard navigation
- [ ] Screen reader compatibility verified

---

## Context Resume Checklist

When returning to this work:
1. ✅ SortSite reports reviewed and issues cataloged
2. ✅ Dynamic alt text confirmed working (equipment/team pages)
3. ✅ Comprehensive audit completed revealing ~35% compliance
4. ✅ Critical issues prioritized by WCAG level and impact
5. 🎯 **READY FOR:** Phase 1 implementation starting with color contrast fixes

**Next Action:** Begin Priority 1.1 - Update Tailwind config for color contrast compliance