# AWS Migration Plan: Flowency → Compleo
## Production Deployment Checklist

---

## Current State
- **Frontend:** Working on Flowency AWS Amplify (`https://main.d3psxuxgpqkedx.amplifyapp.com`)
- **CMS:** Working on Flowency AWS Lightsail (`https://18.201.155.94`)
- **Contact Forms:** Working via AWS Lambda
- **Ready for:** Production deployment to Compleo AWS

---

## Pre-Migration Tasks

### 1. Compleo Google Analytics Setup
**Owner:** Compleo/Jason  
**Priority:** HIGH  
- [ ] Create new Google Analytics 4 account for Compleo
- [ ] Get measurement ID (format: `G-XXXXXXXXXX`)
- [ ] Replace `G-4C9XEXTQ93` in all environment files

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

### 1. AWS Lightsail (Strapi CMS)
**Owner:** Jason (with Compleo AWS access)  

#### Create Instance
```bash
# Ubuntu 22.04 LTS, 2GB RAM minimum (4GB recommended)
# Static IP required
# Open ports: 22 (SSH), 80 (HTTP), 443 (HTTPS), 1337 (Strapi)
```

#### Install Requirements
```bash
# Core dependencies
sudo apt update && sudo apt upgrade -y
sudo apt install nodejs npm nginx git -y
sudo npm install -g pm2

# Clone and setup CMS
git clone [compleo-repo-url] /opt/strapi-cms
cd /opt/strapi-cms
npm install --production

# Environment configuration
cp .env.example .env
# Edit .env with production database and JWT secrets

# Start with PM2
pm2 start npm --name strapi -- start
pm2 startup
pm2 save
```

#### SSL Setup (Self-signed for now)
```bash
# Generate self-signed certificate
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/strapi.key \
  -out /etc/ssl/certs/strapi.crt

# Configure Nginx reverse proxy
# Copy nginx config from Flowency setup
```

### 2. AWS Lambda (Contact Forms)
**Owner:** Jason (with Compleo AWS access)  

#### Create Lambda Function
- Runtime: Node.js 20.x
- Handler: index.handler
- Timeout: 30 seconds
- Environment variables:
  - `TO_EMAIL`: Compleo contact email
  - `FROM_EMAIL`: noreply@compleohealth.com (requires SES verification)

#### Create API Gateway
- REST API
- POST method for `/contact`
- Enable CORS
- Deploy to "Production" stage

### 3. AWS Amplify (Frontend)
**Owner:** Jason (with Compleo AWS access)  

#### Connect Repository
- Source: GitHub (Compleo repository)
- Branch: main
- Build settings: Use existing `amplify.yml`

#### Environment Variables
```
VITE_STRAPI_URL=https://[new-lightsail-ip]
VITE_GA_MEASUREMENT_ID=[new-ga-id]
```

#### Build & Deploy
- Trigger initial deployment
- Verify all pages load correctly
- Test CMS content displays

---

## DNS & Domain Tasks (Fact3 Required)

### 1. Email Setup (SES)
**Owner:** Fact3  
**Why Fact3:** Requires domain verification via DNS records  

- [ ] Add domain to AWS SES
- [ ] Add verification TXT records to DNS
- [ ] Add DKIM records to DNS
- [ ] Configure SPF records
- [ ] Verify domain in SES console
- [ ] Move out of SES sandbox (if needed)

### 2. Domain Pointing
**Owner:** Fact3  
**Why Fact3:** Controls compleohealth.com DNS  

#### After Testing Complete:
- [ ] Point `compleohealth.com` to Amplify app
- [ ] Point `www.compleohealth.com` to Amplify app
- [ ] Create `cms.compleohealth.com` → Lightsail IP (optional)
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

### Day 1: Infrastructure Setup
1. Create all AWS resources in Compleo account
2. Deploy CMS with content
3. Deploy frontend application
4. Configure monitoring

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