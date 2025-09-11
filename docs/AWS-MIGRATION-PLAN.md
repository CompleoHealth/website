# AWS Migration Plan: Flowency → Compleo
## Production Deployment Checklist

---

## Current State
- **Frontend:** Working on Flowency AWS Amplify (`https://main.d3psxuxgpqkedx.amplifyapp.com`)
- **CMS:** ✅ DEPLOYED on Compleo AWS Lightsail (`http://35.178.98.91:1337`)
  - Awaiting DNS: `cms.compleohealth.com` → `35.178.98.91`
  - SSL/HTTPS ready to configure once DNS propagates
- **Contact Forms:** Working via AWS Lambda (Flowency account)
- **Ready for:** Lambda, SES, and Amplify deployment to Compleo AWS

---

## Pre-Migration Tasks

### 1. Compleo Google Analytics Setup
**Owner:** Compleo/Jason  
**Priority:** HIGH  
- [ ] Create new Google Analytics 4 account for Compleo
- [ ] Get measurement ID (format: `G-XXXXXXXXXX`)
- [ ] Replace `G-4C9XEXTQ93` in all environment files:
  - `client/.env`
  - `amplify.yml`
  - Amplify environment variables in AWS Console
  
**⚠️ CURRENT STATUS:** Using temporary Flowency GA ID `G-4C9XEXTQ93` - **MUST UPDATE BEFORE PRODUCTION**

### 2. GitHub Repository
**Owner:** Jason/Compleo  
**Priority:** HIGH  
- [ ] Create new GitHub repository under Compleo organization
- [ ] Push latest code from local to new repository
- [ ] Ensure main branch is protected

### 3. Content Backup
**Owner:** Jason  
**Priority:** HIGH  
- [ ] Export Strapi database from Flowency Lightsail
- [ ] Download all media files from Strapi
- [ ] Document admin user credentials

---

## Compleo AWS Setup Tasks

### 1. AWS Lightsail (Strapi CMS) ✅ COMPLETED
**Instance Details:**
- **Name:** WebsiteCMS-Ubuntu-1
- **Specs:** 4 GB RAM, 2 vCPUs, 80 GB SSD
- **OS:** Ubuntu 22.04 LTS
- **Region:** London, Zone A (eu-west-2a)
- **Static IP:** 35.178.98.91 (compleohealth-cms-ip)
- **Private IP:** 172.26.15.181

**Firewall Configuration:**
- Port 22: SSH (Any IPv4)
- Port 80: HTTP (Any IPv4)
- Port 443: HTTPS (Any IPv4)
- Port 1337: Strapi (Any IPv4)

**Deployment Status:**
```bash
# ✅ Node.js 22.19.0 installed via NodeSource
# ✅ PostgreSQL database (strapidb) configured
# ✅ PM2 process manager running (173 restarts resolved by installing pg module)
# ✅ Nginx reverse proxy configured for cms.compleohealth.com
# ✅ Certbot installed and ready for SSL

# Current location: /home/ubuntu/CompleoHealthCMS
# PM2 status: strapi app running on port 1337
# Access: http://35.178.98.91:1337/admin
```

**Remaining Steps:**
```bash
# Once DNS propagates (cms.compleohealth.com → 35.178.98.91):
sudo certbot --nginx -d cms.compleohealth.com

# This will automatically:
# - Obtain Let's Encrypt SSL certificate
# - Configure HTTPS on port 443
# - Set up auto-renewal via cron
```

### 2. AWS Lambda (Contact Forms) ✅ DEPLOYED
**Status:** Function created and API Gateway configured

#### Lambda Function Details
- **Name:** CompleoHealthContactForm
- **Runtime:** Node.js 20.x
- **Handler:** index.handler
- **Timeout:** 30 seconds
- **Region:** eu-west-2
- **Code:** Deployed from `lambda/contact-email/index.js`

#### Environment Variables
- `TO_EMAIL`: **⚠️ CURRENTLY SET TO PERSONAL EMAIL FOR TESTING**
  - **TODO:** Change to `info@compleohealth.com` before go-live
- `FROM_EMAIL`: `noreply@compleohealth.com` (requires SES verification)
- `CC_EMAIL`: (optional)
- `ALLOWED_ORIGINS`: `*` (restrict to production domain later)
- `AWS_REGION`: `eu-west-2`

#### IAM Permissions
- ✅ SES permissions added via inline policy
- Policy name: CompleoHealthContactFormSESPolicy

#### API Gateway Configuration ✅ DEPLOYED
- **API Name:** CompleoHealthContactAPI
- **Resource:** `/contact`
- **Methods:** POST, OPTIONS (for CORS)
- **Integration:** Lambda proxy
- **Stage:** prod
- **Endpoint:** `https://4xccwo5gph.execute-api.eu-west-2.amazonaws.com/prod`
- **Contact URL:** `https://4xccwo5gph.execute-api.eu-west-2.amazonaws.com/prod/contact`

**⚠️ TESTING STATUS:** 
- Lambda function fixed (AWS SDK v3)
- API responding correctly
- **BLOCKED:** Email sending requires SES domain verification
- **RESUME TESTING:** Once DNS records propagate and SES verifies compleohealth.com

### 3. AWS Amplify (Frontend) 🔄 IN PROGRESS
**Owner:** Jason (with Compleo AWS access)  

#### Repository Configuration
- **Source:** GitHub (`flowency-live/CompleoHealthWeb` - temporary)
- **Branch:** main
- **Build settings:** Uses `amplify.yml` 
- **TODO:** Migrate to Compleo GitHub organization later

#### Environment Variables ✅ CONFIGURED
```
VITE_STRAPI_URL=https://cms.compleohealth.com
VITE_GA_MEASUREMENT_ID=G-4C9XEXTQ93  # ⚠️ TEMPORARY - needs Compleo GA ID
VITE_CONTACT_API_ENDPOINT=https://4xccwo5gph.execute-api.eu-west-2.amazonaws.com/prod/contact
```

#### Deployment Status
- [🔄] Initial deployment in progress
- [ ] Verify all pages load correctly
- [ ] Test CMS content displays
- [ ] Test contact forms (after SES verification)

---

## DNS & Domain Tasks (Fact3 Required)

### 1. Email Setup (SES) 🔄 IN PROGRESS
**Owner:** Fact3  
**Why Fact3:** Requires domain verification via DNS records  

- [✅] Add domain to AWS SES (compleohealth.com)
- [✅] DNS records sent to Fact3:
  - 3 CNAME records for DKIM
  - 1 MX record for mail.compleohealth.com
  - 2 TXT records (SPF and DMARC)
- [⏳] Awaiting DNS propagation and SES verification
- [ ] Move out of SES sandbox (for production)
- [✅] Personal email verified for testing

### 2. Domain Pointing
**Owner:** Fact3  
**Why Fact3:** Controls compleohealth.com DNS  

#### CMS Subdomain ✅ COMPLETE:
- [✅] Create A record: `cms.compleohealth.com` → `35.178.98.91`
- [✅] DNS propagated and confirmed
- [🔄] Ready for SSL: `sudo certbot --nginx -d cms.compleohealth.com`

#### After Frontend Testing Complete:
- [ ] Point `compleohealth.com` to Amplify app
- [ ] Point `www.compleohealth.com` to Amplify app
- [ ] Update SSL certificates after domain pointing

---

## Configuration Updates

### Files to Update
**Owner:** Jason  

#### 1. Environment Files (`.env`, `client/.env`)
```
VITE_STRAPI_URL=https://[compleo-lightsail-ip]
VITE_GA_MEASUREMENT_ID=[compleo-ga-id]
```

#### 2. Contact Form Endpoints
Files: `client/src/components/forms/contact-form.tsx`, `enhanced-contact-form.tsx`
```javascript
// Update URL to new API Gateway endpoint
const response = await fetch('https://[new-api-gateway].execute-api.[region].amazonaws.com/Production/contact', {
```

#### 3. Build Configuration (`amplify.yml`)
```yaml
build:
  commands:
    - VITE_STRAPI_URL=https://[compleo-lightsail-ip] VITE_GA_MEASUREMENT_ID=[compleo-ga-id] npx vite build
```

---

## Monitoring Setup

### Essential Monitoring
**Owner:** Jason/Compleo  
**Platform:** AWS CloudWatch  

#### Lightsail Monitoring
- [ ] CPU utilization alert (>80%)
- [ ] Memory usage alert (>90%)
- [ ] Disk space alert (>85%)
- [ ] Create `/health` endpoint in Strapi

#### Application Monitoring
- [ ] Uptime checks every 5 minutes
- [ ] SSL certificate expiry warnings
- [ ] Contact form error alerts

#### Notification Setup
- [ ] Create SNS topic for alerts
- [ ] Subscribe team emails
- [ ] Test alert delivery

---

## Testing Checklist

### Pre-DNS Switch Testing
**Owner:** Jason  

- [ ] Homepage loads with CMS content
- [ ] All service pages display correctly
- [ ] Team/case studies data loads
- [ ] Contact forms submit successfully
- [ ] Mobile responsive design works
- [ ] Google Analytics tracking active
- [ ] SSL certificates valid

### Post-DNS Switch Testing
**Owner:** Jason + Fact3  

- [ ] Domain resolves correctly
- [ ] Email delivery working
- [ ] No mixed content warnings
- [ ] Search console verification
- [ ] Performance benchmarks met

---

## Go-Live Sequence

### Day 1: Infrastructure Setup ✅ CMS COMPLETE
1. ✅ Lightsail CMS instance created and configured
2. ✅ Strapi deployed with PostgreSQL database
3. ⏳ Awaiting DNS for SSL certificate
4. 🔄 Next: Lambda functions for contact forms
5. 🔄 Next: Amplify for frontend deployment
6. 🔄 Next: SES for email configuration

### Day 2: Testing
1. Complete all pre-DNS testing
2. Fix any issues found
3. Performance optimization
4. Security review

### Day 3: DNS Switch (with Fact3)
1. Morning: Update DNS records
2. Monitor propagation (4-48 hours)
3. Test from multiple locations
4. Monitor for issues

### Day 4: Cleanup
1. Document final configuration
2. Remove test deployments
3. Optimize costs
4. Handover documentation

---

## Rollback Plan

If issues occur after DNS switch:
1. **Immediate:** Point DNS back to current hosting
2. **Fix issues** in Compleo AWS environment
3. **Retest** thoroughly
4. **Schedule** new switch window

---

## Key Contacts

**Technical Issues:** Jason  
**DNS/Domain:** Fact3  
**AWS Account:** Compleo designated admin  
**Emergency:** Establish escalation path  

---

## Success Criteria

- ✅ Website live at compleohealth.com
- ✅ All functionality working
- ✅ <3 second page loads
- ✅ Zero downtime during switch
- ✅ Monitoring active
- ✅ Documentation complete