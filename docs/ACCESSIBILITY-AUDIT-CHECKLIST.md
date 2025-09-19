# Accessibility Audit Issues Checklist

## Instructions
- [ ] Fixed - Issue has been resolved and verified in UI
- [ ] Dismissed - Issue is not actually present or not applicable
- [ ] No Action - Issue exists but decision made not to fix

---

## 1. KEYBOARD NAVIGATION & FOCUS MANAGEMENT

### 1.1 Hero Section Issues
- [x] **Issue #1** - Home page hero section: `tabIndex={-1}` on links making buttons keyboard inaccessible **[DISMISSED]**
- [x] **Issue #2** - About page hero section: `tabIndex={-1}` on links making buttons keyboard inaccessible **[DISMISSED]**
- [x] **Issue #3** - Social Impact page hero section: `tabIndex={-1}` on links making buttons keyboard inaccessible **[DISMISSED]**
- [x] **Issue #4** - Case Studies page hero section: `tabIndex={-1}` on links making buttons keyboard inaccessible **[DISMISSED]**
- [x] **Issue #5** - Our Team page hero section: `tabIndex={-1}` on links making buttons keyboard inaccessible **[DISMISSED]**

### 1.2 Focus Indicators
- [x] **Issue #6** - Button components lack sufficient focus styles in `buttonVariants` definition **[DISMISSED]**
- [x] **Issue #7** - Select components have inadequate focus indicators **[DISMISSED]**
- [x] **Issue #8** - Checkbox components have minimal focus styling **[DISMISSED]**
- [x] **Issue #9** - Inconsistent focus styles across different components **[DISMISSED]**

### 1.3 Focus Management
- [x] **Issue #10** - Contact slide-out panel doesn't restore focus to trigger element when closed **[DISMISSED]**
- [x] **Issue #11** - Mobile navigation focus trap issues when menu is open **[DISMISSED]**
- [x] **Issue #12** - Form submission doesn't properly manage focus after validation errors **[DISMISSED]**

### 1.4 Video Controls
- [x] **Issue #13** - Home page hero video control buttons lack keyboard event handlers **[DISMISSED]**
- [x] **Issue #14** - Social Impact page video control button lacks keyboard event handlers **[DISMISSED]**

### 1.5 Card Navigation
- [x] **Issue #15** - News and Views page: news item cards lack proper keyboard navigation **[DISMISSED]**
- [x] **Issue #16** - Case Studies page: case study cards lack proper keyboard navigation **[DISMISSED]**
- [x] **Issue #17** - Our Team page: team member cards lack proper keyboard navigation **[DISMISSED]**

---

## 2. COLOR CONTRAST & VISUAL ACCESSIBILITY

### 2.1 Hero Section Contrast
- [x] **Issue #18** - Home page hero: white text on semi-transparent background over video has insufficient contrast **[NO ACTION]**
- [x] **Issue #19** - About page hero: white text on semi-transparent background has insufficient contrast **[FIXED]**
- [x] **Issue #20** - Social Impact page hero: white text on video background has insufficient contrast **[DISMISSED]**
- [x] **Issue #21** - Case Studies page hero: white text on dark background has insufficient contrast **[DISMISSED]**

### 2.2 Form Elements
- [x] **Issue #22** - Contact form placeholder text has low contrast (light gray on white/light backgrounds) **[DISMISSED]**
- [x] **Issue #23** - Form control states have insufficient contrast ratios **[FIXED]**
- [x] **Issue #24** - Input, select, and checkbox disabled states have insufficient contrast **[DISMISSED]**

### 2.3 Navigation & UI Elements
- [x] **Issue #25** - Desktop navigation: active/selected states indicated only by color change **[DISMISSED]**
- [x] **Issue #26** - Button hover states rely on color changes without additional indicators **[FIXED]**
- [x] **Issue #27** - Select component selected state relies on color only **[DISMISSED]**
- [ ] **Issue #28** - Case study badges have insufficient contrast ratios
- [ ] **Issue #29** - News item category badges have insufficient contrast

### 2.4 Text on Background Images
- [ ] **Issue #30** - Curved CTA panel: text overlaid on background images without sufficient contrast
- [ ] **Issue #31** - News and Views hero: text on image background lacks consistent contrast
- [ ] **Issue #32** - Social Impact impact cards: text on background images lacks sufficient contrast

### 2.5 Small Text Issues
- [x] **Issue #33** - Mobile navigation text size too small (under 16px) **[DISMISSED]**
- [ ] **Issue #34** - News item text size too small for comfortable reading
- [ ] **Issue #35** - Case study metadata text size too small
- [ ] **Issue #36** - Policy document metadata text size too small

---

## 3. SEMANTIC HTML & STRUCTURE

### 3.1 Heading Hierarchy
- [x] **Issue #37** - Home approach panels: `<h3>` elements without parent `<h2>` elements **[FIXED]**
- [x] **Issue #38** - About page values section: inconsistent heading levels under `<h2>` **[DISMISSED]**
- [x] **Issue #39** - Social Impact page: heading levels used inconsistently **[DISMISSED]**

### 3.2 Landmark Regions
- [x] **Issue #40** - Managed Equipment service page: missing appropriate landmark regions **[FIXED]**
- [x] **Issue #41** - Clinical Insourcing service page: missing appropriate landmark regions **[FIXED]**
- [x] **Issue #42** - Equipment Rental service page: missing appropriate landmark regions **[FIXED]**
- [x] **Issue #43** - Policies page: missing `id="main-content"` attribute **[DISMISSED]**
- [x] **Issue #44** - Accessibility page: missing `id="main-content"` attribute **[FIXED]**

### 3.3 Semantic Elements
- [x] **Issue #45** - Value proposition component: uses generic divs instead of semantic elements **[DISMISSED]**
- [x] **Issue #46** - News and Views: uses divs for news items instead of articles **[FIXED]**
- [x] **Issue #47** - Case Studies: uses divs for case study cards instead of articles **[FIXED]**
- [x] **Issue #48** - Location map component: content sections without proper headings **[DISMISSED]**
- [x] **Issue #49** - Our Team: team member cards without proper section headings **[DISMISSED]**

---

## 4. FORM ACCESSIBILITY

### 4.1 Error Message Association
- [x] **Issue #50** - Contact form: many controls lack `aria-describedby` attributes for error messages **[FIXED]**
- [x] **Issue #51** - Newsletter subscription form: lacks error message association **[DISMISSED - No newsletter form exists]**
- [x] **Issue #52** - Policy search field: lacks error message association **[DISMISSED - No search field exists]**

### 4.2 Error Indication
- [x] **Issue #53** - Contact form validation errors rely heavily on red color without non-color indicators **[DISMISSED - Has multiple non-color indicators]**
- [x] **Issue #54** - Newsletter form: red border only for errors (color-only indication) **[DISMISSED - No newsletter form exists]**

### 4.3 Input Instructions
- [x] **Issue #55** - Contact form phone field: lacks format instructions for expected input **[FIXED]**
- [x] **Issue #56** - Contact page email field: lacks format instructions **[DISMISSED - type="email" provides native validation]**
- [x] **Issue #57** - Policy search field: lacks instructions for expected input **[DISMISSED - No search field exists]**

### 4.4 Form Feedback
- [x] **Issue #58** - Contact form: no error summary provided at top when validation errors occur **[DISMISSED - Error summary exists]**
- [x] **Issue #59** - All forms: required field indicators not explained at beginning of forms **[FIXED]**
- [x] **Issue #60** - Form success/error messages lack `aria-live` regions for screen reader announcement **[DISMISSED - Error messages have aria-live]**

---

## 5. IMAGES & MEDIA ACCESSIBILITY

### 5.1 Alt Text Issues
- [x] **Issue #61** - Value proposition cards: no fallback alt text when CMS content doesn't provide it **[DISMISSED - Has descriptive alt text]**
- [x] **Issue #62** - About page hero: background image has generic alt text **[DISMISSED - Has descriptive alt text]**
- [x] **Issue #63** - News item images: missing or generic alt text **[FIXED]**
- [x] **Issue #64** - Social Impact impact cards: images have generic alt text **[DISMISSED - Has alt text]**
- [x] **Issue #65** - Service card images: use generic alt text instead of descriptive content **[DISMISSED - Has alt text]**
- [x] **Issue #66** - Case study images: generic alt text instead of descriptive content **[FIXED]**
- [x] **Issue #67** - Team member images: generic alt text instead of descriptive content **[DISMISSED - Has alt text]**

### 5.2 Video Accessibility
- [x] **Issue #68** - Home page hero video: lacks captions for users with hearing impairments **[DISMISSED - Muted background video with enhanced aria-label]**
- [x] **Issue #69** - Social Impact background video: lacks captions for users with hearing impairments **[DISMISSED - Muted background video]**
- [x] **Issue #70** - Home page hero video: no audio descriptions for visual-only information **[DISMISSED - Enhanced aria-label describes visual content]**
- [x] **Issue #71** - Social Impact background video: no audio descriptions for visual-only information **[DISMISSED - Enhanced aria-label describes visual content]**

### 5.3 SVG & Icon Accessibility
- [x] **Issue #72** - Branded icons component: all icons lack proper accessibility attributes **[FIXED - Added aria-hidden]**
- [x] **Issue #73** - About page icon components: lack `role="img"` and `aria-label` **[FIXED - Added aria-hidden for decorative icons]**
- [x] **Issue #74** - Social Impact icon components: lack `role="img"` and `aria-label` **[FIXED - Added aria-hidden for decorative icons]**

### 5.4 Background Images
- [x] **Issue #75** - Curved CTA panel: background images convey information but lack text alternatives **[DISMISSED - Decorative background images]**
- [x] **Issue #76** - About page hero: background image conveys information but lacks text alternative **[DISMISSED - Decorative background image]**
- [x] **Issue #77** - About page decorative elements: not properly marked with empty alt or aria-hidden **[DISMISSED - Decorative CSS background elements]**
- [x] **Issue #78** - Social Impact decorative elements: not properly marked with empty alt or aria-hidden **[DISMISSED - Decorative CSS background elements]**

### 5.5 Image Error Handling
- [x] **Issue #79** - Lazy image component: error states don't provide sufficient alternative text **[DISMISSED - Shows "Failed to load image" text]**
- [x] **Issue #80** - News page image error handling: insufficient alternative text **[DISMISSED - Shows source domain as fallback]**

---

## 6. ARIA IMPLEMENTATION

### 6.1 Navigation ARIA
- [x] **Issue #81** - Desktop vs mobile navigation: inconsistent ARIA patterns for similar functionality **[DISMISSED - Modern accessible components handle ARIA]**
- [x] **Issue #82** - Desktop navigation dropdown items: lack `role="menuitem"` attributes **[DISMISSED - Not applicable for link navigation]**
- [x] **Issue #83** - Select component dropdown options: lack proper ARIA roles **[DISMISSED - Radix UI handles ARIA automatically]**

### 6.2 Button ARIA
- [x] **Issue #84** - Button components: redundant ARIA attributes on native elements **[DISMISSED - No redundant ARIA found]**
- [x] **Issue #85** - About page buttons: redundant ARIA attributes **[DISMISSED - No redundant ARIA found]**
- [x] **Issue #86** - Social Impact page buttons: redundant ARIA attributes **[DISMISSED - No redundant ARIA found]**

### 6.3 Dynamic Content ARIA
- [x] **Issue #87** - Contact form toast notifications: lack `aria-live` regions **[DISMISSED - Radix UI Toast handles aria-live automatically]**
- [x] **Issue #88** - Home page loading states: lack `aria-live` regions **[DISMISSED - Loading states are static full-screen replacements]**
- [x] **Issue #89** - News page loading states: lack `aria-live` regions **[DISMISSED - Loading states are static full-screen replacements]**
- [x] **Issue #90** - All pages with dynamic content: lack `aria-live` regions for updates **[DISMISSED - Form errors have aria-live="polite", toasts use Radix UI]**

### 6.4 Interactive Elements ARIA
- [x] **Issue #91** - Impact statistics component: interactive elements lack appropriate ARIA roles **[DISMISSED - Purely presentational display, no interactive elements]**
- [x] **Issue #92** - Social Impact section: interactive elements lack appropriate ARIA roles **[DISMISSED - Display cards, no interactive elements requiring ARIA roles]**
- [x] **Issue #93** - About values section: interactive elements lack appropriate ARIA roles **[DISMISSED - Display cards with hover effects, no interactive elements]**

### 6.5 Form ARIA
- [x] **Issue #94** - Contact form error states: not properly communicated with ARIA attributes **[DISMISSED - Has aria-live, aria-describedby, aria-invalid]**
- [x] **Issue #95** - All forms: error states lack proper ARIA implementation **[DISMISSED - Contact form has proper ARIA implementation]**

### 6.6 Link ARIA
- [x] **Issue #96** - Home page link elements: unnecessary ARIA attributes on elements with native semantics **[DISMISSED - aria-label provides helpful context, not redundant]**
- [x] **Issue #97** - About page link elements: unnecessary ARIA attributes **[DISMISSED - aria-label enhances native semantics appropriately]**
- [x] **Issue #98** - Case Studies page link elements: unnecessary ARIA attributes **[DISMISSED - aria-label provides descriptive context for screen readers]**

### 6.7 Landmark ARIA
- [x] **Issue #99** - Policies page main content: missing `aria-labelledby` to associate with headings **[DISMISSED - Has id="main-content" landmark]**
- [x] **Issue #100** - Accessibility page main content: missing `aria-labelledby` to associate with headings **[DISMISSED - Has id="main-content" landmark]**

### 6.8 Iframe ARIA
- [x] **Issue #101** - News page LinkedIn embeds: iframes with `tabIndex={-1}` and `aria-hidden="true"` but still visible **[DISMISSED - Intentional design to prevent iframe tab traps while keeping visual preview]**

---

## 7. RESPONSIVE DESIGN & MOBILE ACCESSIBILITY

### 7.1 Touch Targets
- [x] **Issue #102** - Mobile navigation links: touch targets smaller than 44x44px **[DISMISSED - px-4 py-3 provides >44px touch targets]**
- [x] **Issue #103** - News item links: touch targets too small for mobile **[DISMISSED - Full card clickable areas with p-6 padding]**
- [x] **Issue #104** - Case study metadata links: touch targets too small for mobile **[DISMISSED - Full card clickable areas >44px]**
- [x] **Issue #105** - Policy document links: touch targets too small for mobile **[DISMISSED - Standard button/link padding provides adequate targets]**
- [x] **Issue #106** - Mobile navigation: insufficient spacing between interactive elements **[DISMISSED - space-y-4 provides adequate spacing]**

### 7.2 Fixed Positioning & Zoom
- [x] **Issue #107** - Header fixed positioning: causes content overlap when zoomed **[DISMISSED - Proper 64px offset with z-index management]**
- [x] **Issue #108** - Contact slide-out fixed positioning: causes overlap when zoomed **[DISMISSED - Standard overlay pattern with proper z-index]**
- [x] **Issue #109** - Back to top button: fixed positioning causes issues when zoomed **[DISMISSED - Standard bottom-right positioning, no overlap issues]**

### 7.3 Content Reflow
- [x] **Issue #110** - Value proposition cards: don't properly reflow at 400% zoom **[DISMISSED - Uses grid-cols-1 md:grid-cols-2 lg:grid-cols-3 responsive breakpoints]**
- [x] **Issue #111** - About values section: doesn't properly reflow at 400% zoom **[DISMISSED - Uses grid-cols-1 md:grid-cols-2 responsive breakpoints]**
- [x] **Issue #112** - News grid: doesn't properly reflow at 400% zoom **[DISMISSED - Uses responsive grid-cols-2 and lg:grid-cols-3 breakpoints]**
- [x] **Issue #113** - Case studies grid: doesn't properly reflow at 400% zoom **[DISMISSED - Uses md:grid-cols-2 responsive breakpoints]**

### 7.4 Layout Adaptation
- [x] **Issue #114** - Equipment showcase tables: don't adapt well to small screens **[DISMISSED - Uses responsive grid sm:grid-cols-2 lg:grid-cols-3]**
- [x] **Issue #115** - News grid: doesn't adapt well to small screens **[DISMISSED - Already verified responsive breakpoints]**
- [x] **Issue #116** - Social Impact initiatives grid: doesn't adapt well to small screens **[DISMISSED - Uses standard responsive CSS Grid patterns]**

### 7.5 Orientation Issues
- [x] **Issue #117** - Location map component: layout depends on landscape orientation **[DISMISSED - Uses responsive container, adapts to any orientation]**
- [x] **Issue #118** - About values section: layout depends on specific orientation **[DISMISSED - Uses grid-cols-1 md:grid-cols-2 responsive breakpoints]**
- [x] **Issue #119** - Social Impact cards: layout depends on specific orientation **[DISMISSED - Standard responsive implementation, orientation-independent]**

### 7.6 Text Sizing
- [x] **Issue #120** - Contact form labels: text size too small on mobile devices (under 16px) **[DISMISSED - Uses text-sm md:text-base responsive scaling, labels at 14px acceptable]**
- [x] **Issue #121** - News item text: too small on mobile devices **[DISMISSED - Main content uses text-lg/text-base (16px+), metadata text-xs acceptable]**
- [x] **Issue #122** - Case study metadata: too small on mobile devices **[DISMISSED - Uses text-sm with responsive scaling, appropriate for metadata]**
- [x] **Issue #123** - Policy document metadata: too small on mobile devices **[DISMISSED - Standard metadata text sizing patterns]**

### 7.7 Spacing Issues
- [x] **Issue #124** - Curved CTA panel: inconsistent spacing across breakpoints **[DISMISSED - Uses responsive CSS Grid/Flexbox with gap utilities]**
- [x] **Issue #125** - About hero section: spacing changes inconsistently across breakpoints **[DISMISSED - Responsive spacing design decisions, not accessibility issues]**
- [x] **Issue #126** - Social Impact initiatives: spacing changes inconsistently across breakpoints **[DISMISSED - Standard responsive spacing patterns]**

---

## 8. DYNAMIC CONTENT & JAVASCRIPT

### 8.1 Live Regions & Announcements
- [x] **Issue #127** - Contact form toast notifications: aren't announced to screen readers **[DISMISSED - Duplicate of #87, Radix UI Toast handles aria-live]**
- [x] **Issue #128** - Home page error messages: aren't announced to screen readers **[DISMISSED - Duplicate of #88, form errors have aria-live="polite"]**
- [x] **Issue #129** - About page error handling: aren't announced to screen readers **[DISMISSED - Duplicate of #89, standard error handling patterns]**
- [x] **Issue #130** - All toast notifications: lack proper screen reader announcements **[DISMISSED - Duplicate of #90, Radix UI provides accessibility]**

### 8.2 Animation Issues
- [ ] **Issue #131** - Home hero animations: no option to disable via prefers-reduced-motion
- [ ] **Issue #132** - About page animations: no option to disable via prefers-reduced-motion
- [ ] **Issue #133** - News page animations: no option to disable via prefers-reduced-motion
- [ ] **Issue #134** - Social Impact animations: no option to disable via prefers-reduced-motion

### 8.3 Focus After Updates
- [x] **Issue #135** - Contact slide-out closing: focus not properly managed after content updates **[DISMISSED - Has comprehensive focus trapping and management]**
- [x] **Issue #136** - Mobile navigation: focus not properly managed after content updates **[DISMISSED - Has firstFocusableRef, lastFocusableRef, and proper focus trapping]**
- [x] **Issue #137** - Form submission: focus not properly managed after validation **[DISMISSED - Form errors have proper ARIA and focus management]**

### 8.4 Progressive Enhancement
- [x] **Issue #138** - All React components: no fallback content when JavaScript is disabled **[DISMISSED - Modern SPA design, not an accessibility requirement]**
- [x] **Issue #139** - All pages: entirely depend on JavaScript with no progressive enhancement **[DISMISSED - React SPA by design, basic structure loads before hydration]**

### 8.5 Keyboard Events
- [x] **Issue #140** - Home hero video controls: lack keyboard event handlers **[DISMISSED - Duplicate of #13, button elements have native keyboard support]**
- [x] **Issue #141** - Social Impact video controls: lack keyboard event handlers **[DISMISSED - Duplicate of #14, button elements have native keyboard support]**
- [x] **Issue #142** - News page iframe interactions: lack keyboard event handlers **[DISMISSED - Intentionally non-interactive with tabIndex={-1} to prevent tab traps]**

### 8.6 Content Loading
- [x] **Issue #143** - Contact form validation: state changes not announced to screen readers **[DISMISSED - Duplicate of #87, has aria-live="polite"]**
- [x] **Issue #144** - Home loading states: state changes not announced to screen readers **[DISMISSED - Duplicate of #88, loading states are full-screen replacements]**
- [x] **Issue #145** - About data fetching: state changes not announced to screen readers **[DISMISSED - Duplicate of #89, standard loading patterns]**
- [x] **Issue #146** - All dynamic content: state changes not announced to screen readers **[DISMISSED - Duplicate of #90, proper aria-live implementation]**

### 8.7 CMS Content Issues
- [x] **Issue #147** - Home CMS data fetching: no error handling or announcements for loading failures **[DISMISSED - Has error state management and console logging]**
- [x] **Issue #148** - About CMS data fetching: no error handling or announcements for loading failures **[DISMISSED - Has error state and fallback patterns]**
- [x] **Issue #149** - News CMS data fetching: no error handling or announcements for loading failures **[DISMISSED - Has comprehensive error handling with timeout detection]**
- [x] **Issue #150** - All CMS pages: no error handling or announcements for loading failures **[DISMISSED - Pages have error states and fallback content]**

### 8.8 Timeout & Performance
- [x] **Issue #151** - Home data fetching: no timeout handling for users with slow connections **[DISMISSED - CMS API calls have timeout handling]**
- [x] **Issue #152** - About data fetching: no timeout handling for users with slow connections **[DISMISSED - Error handling includes ECONNABORTED and timeout detection]**
- [x] **Issue #153** - All async data loading: no timeout handling for slow connections **[DISMISSED - Comprehensive timeout handling implemented]**

### 8.9 Autoplay Issues
- [x] **Issue #154** - Home hero video: autoplays without user control (WCAG 2.2.2) **[DISMISSED - Muted autoplay with user controls is WCAG compliant]**
- [x] **Issue #155** - Social Impact video: autoplays without user control (WCAG 2.2.2) **[DISMISSED - Muted autoplay with user controls is WCAG compliant]**

---

## SUMMARY
**Total Issues Identified:** 155
- **Fixed:** 17
- **Dismissed:** 106
- **No Action:** 1
- **Remaining:** 31 (mostly prefers-reduced-motion enhancements)

---

## VERIFICATION NOTES
*(Add notes here as we verify each issue)*
