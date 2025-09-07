# Button Click Analytics Implementation Guide

## ✅ Working Example Implementation

### **Contact Slide-Out Component** (DONE ✅)
Perfect example of button click tracking in `client/src/components/common/contact-slide-out.tsx`:

```typescript
// Import analytics functions
import { trackCTAClick, trackPhoneClick, trackEmailClick } from '@/lib/analytics';

// 1. CTA Button Tracking
<Button
  onClick={() => {
    trackCTAClick('Contact Us Today - Slide Out', window.location.pathname);
    setIsOpen(true);
  }}
>
  Contact Us Today
</Button>

// 2. Phone Link Tracking
<a 
  href="tel:+441618841303" 
  onClick={() => trackPhoneClick('+44 (0)161 884 1303')}
>
  +44 (0)161 884 1303
</a>

// 3. Email Link Tracking
<a 
  href="mailto:info@compleohealth.com" 
  onClick={() => trackEmailClick('info@compleohealth.com')}
>
  info@compleohealth.com
</a>

// 4. Internal Navigation Tracking
<Link href="/contact" onClick={() => {
  trackCTAClick('Complete Contact Form', 'contact-slideout');
  onClose();
}}>
  <Button>Complete a Contact Form</Button>
</Link>
```

### **Contact Form Component** (DONE ✅)
Form submission tracking in `client/src/components/forms/enhanced-contact-form.tsx`:

```typescript
// Import tracking function
import { trackContactFormSubmit } from '@/lib/analytics';

// Form submission tracking
const onSubmit = (data: EnhancedContactFormData) => {
  // Track before submission
  trackContactFormSubmit(data.type || 'b2b');
  
  // Continue with form submission...
  createContactMutation.mutate(sanitizedData);
};
```

---

## **Two Implementation Approaches**

### **Approach 1: Add to Existing Buttons (Fastest - 1 line per button)**

**Add onClick tracking to any existing button:**

```typescript
// Before
<Button onClick={() => doSomething()}>Click Me</Button>

// After - Method A (inline)
<Button onClick={() => {
  trackCTAClick('Button Name', 'page-section');
  doSomething();
}}>Click Me</Button>

// After - Method B (separate function)
const handleClick = () => {
  trackCTAClick('Button Name', 'page-section');
  doSomething();
};
<Button onClick={handleClick}>Click Me</Button>
```

### **Approach 2: Use AnalyticsButton Component (More structured)**

```typescript
// Import the analytics button
import { AnalyticsButton } from '@/components/ui/analytics-button';

// Replace regular Button with AnalyticsButton
<AnalyticsButton 
  trackingName="Get Quote - Home Hero"
  onClick={() => navigateToContact()}
>
  Get Quote
</AnalyticsButton>
```

---

## **Priority Button Locations for Tracking**

### **🔥 HIGH PRIORITY - Main Conversion Points**

1. **Contact Forms** ✅ (DONE)
   - "Send enquiry" buttons
   - Location: `client/src/components/forms/enhanced-contact-form.tsx`

2. **Contact Slide-Out** ✅ (DONE) 
   - "Contact Us Today" trigger
   - Phone/email links inside panel
   - Location: `client/src/components/common/contact-slide-out.tsx`

3. **Hero Section CTAs** (Home page)
   - "EXPLORE Our Solutions" 
   - "READ Our Case Studies"
   - Location: `client/src/pages/home.tsx` or hero component

4. **Service Page CTAs**
   - "Contact Us" buttons on each service subpage
   - "Get Quote" style buttons
   - Locations: All 6 service subpage files

### **🎯 MEDIUM PRIORITY - Navigation & Engagement**

5. **Header/Navigation**
   - "Enquire Now" button in header
   - LinkedIn icon clicks
   - Location: Header component

6. **Equipment/Services Cards**
   - "View Details" buttons
   - Equipment showcase interactions
   - Location: Equipment and services components

7. **Team/About Pages**
   - "JOIN Our Team" buttons
   - LinkedIn profile links
   - Location: About and team components

### **📊 LOW PRIORITY - Supporting Actions**

8. **Footer Links**
   - Social media icons
   - Newsletter signups
   - Policy page navigation

9. **Video/Media Interactions**
   - Video play buttons
   - Download links
   - External link clicks

---

## **Analytics Event Categories**

The system automatically categorizes events:

- **CTA**: Call-to-action buttons (Contact, Get Quote, etc.)
- **Contact**: Phone/email clicks
- **Social Media**: LinkedIn, social icons
- **Lead Generation**: Form submissions
- **Navigation**: Internal page links
- **Media**: Video plays, downloads
- **External Links**: Links to other websites

---

## **Implementation Time Estimates**

- **High Priority (5 locations)**: 30 minutes
- **Medium Priority (10 locations)**: 45 minutes  
- **Low Priority (20+ locations)**: 60 minutes

**Total time to track all buttons**: ~2-3 hours

**Result**: Complete conversion funnel tracking from first click to form submission, providing your client with comprehensive analytics on user behavior and lead generation performance.

---

## **Next Steps**

1. ✅ **Contact slide-out tracking** - COMPLETE
2. ✅ **Contact form tracking** - COMPLETE  
3. 🔄 **Implement hero section button tracking**
4. 🔄 **Add service page CTA tracking**
5. 🔄 **Track header navigation clicks**

Each implementation takes 1-3 lines of code per button and provides immediate analytics value once the client adds their GA4 measurement ID.