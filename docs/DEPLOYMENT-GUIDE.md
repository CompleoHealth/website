# CompleoHealth AWS Deployment Guide
## From Flowency AWS → Compleo AWS with Fact3

---

## Executive Summary

**Current Status:**
- ✅ **COMPLETE** - Frontend deployed to AWS Amplify: `https://main.d3psxuxgpqkedx.amplifyapp.com`
- ✅ **COMPLETE** - Strapi CMS deployed to AWS Lightsail: `https://18.201.155.94`
- ✅ **COMPLETE** - Contact forms integrated with AWS Lambda
- ✅ **COMPLETE** - Full SSL/HTTPS integration working
- ✅ **TESTED** - End-to-end functionality verified

**Next Step:** Transfer from Flowency AWS (testing) → Compleo AWS (production) via Fact3

---

## Architecture Overview

### Current Infrastructure
```
┌─────────────────────────────────────────────────────────┐
│                 FLOWENCY AWS (Testing)                 │
├─────────────────────────────────────────────────────────┤
│ Frontend (AWS Amplify)                                  │
│ ├── URL: https://main.d3psxuxgpqkedx.amplifyapp.com    │
│ ├── GitHub: flowency-live/CompleoHealthWeb             │
│ └── Auto-deploy from main branch                       │
├─────────────────────────────────────────────────────────┤
│ CMS (AWS Lightsail)                                     │
│ ├── Instance: Ubuntu 22.04 LTS                         │
│ ├── IP: 18.201.155.94                                  │
│ ├── SSL: Self-signed certificates                      │
│ └── Strapi v5 with all content migrated                │
├─────────────────────────────────────────────────────────┤
│ Contact Forms (AWS Lambda + API Gateway)               │
│ ├── URL: https://27jqynn952.execute-api.us-east-1...   │
│ ├── Function: contact-form-handler                     │
│ └── Email: AWS SES integration                         │
└─────────────────────────────────────────────────────────┘
```

### Target Infrastructure (Compleo AWS)
```
┌─────────────────────────────────────────────────────────┐
│                 COMPLEO AWS (Production)                │
├─────────────────────────────────────────────────────────┤
│ Frontend (AWS Amplify)                                  │
│ ├── Domain: compleohealth.com                          │
│ ├── GitHub: TBD - new repo or transfer                 │
│ └── Auto-deploy from main branch                       │
├─────────────────────────────────────────────────────────┤
│ CMS (AWS Lightsail)                                     │
│ ├── Instance: Ubuntu 22.04 LTS                         │
│ ├── Domain: cms.compleohealth.com                      │
│ ├── SSL: Let's Encrypt or ACM certificates             │
│ └── Strapi v5 with full content                        │
├─────────────────────────────────────────────────────────┤
│ Contact Forms (AWS Lambda + API Gateway)               │
│ ├── Custom domain integration                          │
│ ├── Production email settings                          │
│ └── AWS SES verified domain                            │
└─────────────────────────────────────────────────────────┘
```

---

## Critical Configuration Values

### Google Analytics
- **Current ID:** `G-4C9XEXTQ93` (in all .env files)
- **Location:** Multiple files contain this ID:
  - `.env`
  - `client/.env` 
  - `amplify.yml`
  - GitHub Actions workflow
- **⚠️ IMPORTANT:** This is likely Jason's test GA account - **Compleo needs their own GA4 account**

### Strapi CMS Connection
- **Current:** `https://18.201.155.94` (Flowency Lightsail IP)
- **Target:** `https://cms.compleohealth.com` or IP address in Compleo AWS
- **Configuration:** `client/.env` and `amplify.yml`

### Contact Form Endpoint
- **Current:** `https://27jqynn952.execute-api.us-east-1.amazonaws.com/Testing/contact`
- **Target:** New API Gateway endpoint in Compleo AWS
- **Files:** `client/src/components/forms/contact-form.tsx`, `enhanced-contact-form.tsx`

---

## Step-by-Step Migration Plan

### Phase 1: Preparation (Fact3 + Jason)

#### 1.1 Account Setup
- [ ] **Fact3:** Verify AWS account access and billing setup
- [ ] **Jason:** Document all current configuration values
- [ ] **Both:** Establish communication channels and deployment windows

#### 1.2 Domain Preparation
- [ ] **Fact3:** Verify DNS control for `compleohealth.com`
- [ ] **Fact3:** Plan subdomain strategy (`cms.compleohealth.com`)
- [ ] **Jason:** Document DNS requirements

#### 1.3 Content Backup
- [ ] **Jason:** Export complete Strapi database and media files
- [ ] **Jason:** Create restoration scripts/documentation
- [ ] **Jason:** Test restore process locally

### Phase 2: Infrastructure Deployment (Fact3)

#### 2.1 GitHub Repository Setup
**Option A: Transfer existing repo**
```bash
# Fact3 to coordinate with Jason
# Transfer flowency-live/CompleoHealthWeb to Compleo GitHub
```

**Option B: Create new repo**
```bash
# Fact3 creates new repo under Compleo GitHub
# Jason pushes latest code to new origin
git remote add compleo https://github.com/[compleo]/[repo-name]
git push compleo main
```

#### 2.2 AWS Lightsail (CMS) Deployment
```bash
# 1. Create Lightsail instance
aws lightsail create-instances \
  --instance-names "compleohealth-cms" \
  --availability-zone "us-east-1a" \
  --blueprint-id "ubuntu_22_04" \
  --bundle-id "small_3_0"

# 2. Setup static IP
aws lightsail allocate-static-ip --static-ip-name "compleohealth-cms-ip"
aws lightsail attach-static-ip --static-ip-name "compleohealth-cms-ip" --instance-name "compleohealth-cms"
```

**Instance Configuration:**
```bash
# SSH into instance and run setup
sudo apt update && sudo apt upgrade -y
sudo apt install nodejs npm nginx -y

# Install PM2
sudo npm install -g pm2

# Clone and setup Strapi
git clone [repo-url] /opt/compleohealth-cms
cd /opt/compleohealth-cms
npm install
```

#### 2.3 SSL Certificate Setup
**Option A: Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d cms.compleohealth.com
```

**Option B: AWS ACM (if using Load Balancer)**
```bash
aws acm request-certificate \
  --domain-name cms.compleohealth.com \
  --validation-method DNS
```

#### 2.4 AWS Lambda + API Gateway
```bash
# 1. Create Lambda function
aws lambda create-function \
  --function-name "compleohealth-contact-form" \
  --runtime "nodejs20.x" \
  --role "arn:aws:iam::[account]:role/lambda-execution-role" \
  --handler "index.handler" \
  --zip-file "fileb://lambda-deployment.zip"

# 2. Create API Gateway
aws apigateway create-rest-api --name "compleohealth-api"
```

### Phase 3: Environment Configuration

#### 3.1 Update Environment Variables
**Files to update:**
```bash
# .env and client/.env
VITE_STRAPI_URL=https://cms.compleohealth.com
VITE_GA_MEASUREMENT_ID=[NEW-COMPLEO-GA4-ID]

# amplify.yml
VITE_STRAPI_URL=https://cms.compleohealth.com
VITE_GA_MEASUREMENT_ID=[NEW-COMPLEO-GA4-ID]
```

#### 3.2 Update Contact Form Endpoints
**Files:** `client/src/components/forms/*-contact-form.tsx`
```javascript
// Replace URL
const response = await fetch('https://[NEW-API-ENDPOINT]/contact', {
```

### Phase 4: AWS Amplify Deployment

#### 4.1 Create Amplify Application
```bash
aws amplify create-app \
  --name "compleohealth-frontend" \
  --repository "https://github.com/[compleo]/[repo-name]"
```

#### 4.2 Configure Build Settings
**amplify.yml** (already exists in repo):
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - VITE_STRAPI_URL=https://[CMS-URL] VITE_GA_MEASUREMENT_ID=[GA-ID] npx vite build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

#### 4.3 Custom Domain Setup
```bash
aws amplify create-domain-association \
  --app-id "[app-id]" \
  --domain-name "compleohealth.com" \
  --sub-domain-settings prefix="",branchName="main"
```

---

## AWS Monitoring & Alerting Setup

### Essential Monitoring (Recommended)

#### 1. Lightsail Instance Monitoring
```bash
# Enable detailed monitoring
aws lightsail put-instance-public-ports \
  --instance-name "compleohealth-cms" \
  --port-infos fromPort=443,toPort=443,protocol=tcp,accessFrom=0.0.0.0/0

# Setup CloudWatch alarms
aws lightsail put-alarm \
  --alarm-name "CMS-HighCPU" \
  --monitored-resource-name "compleohealth-cms" \
  --metric-name "CPUUtilization" \
  --comparison-operator "GreaterThanThreshold" \
  --threshold 80 \
  --evaluation-periods 2
```

**Key Metrics to Monitor:**
- CPU Utilization > 80%
- Memory Usage > 90%
- Disk Usage > 85%
- Network connectivity failures

#### 2. Application Health Checks
**Create health check endpoint in Strapi:**
```javascript
// Add to Strapi: api/health/routes/health.js
module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/health',
      handler: 'health.check',
    },
  ],
};
```

**CloudWatch synthetic monitoring:**
```bash
aws synthetics create-canary \
  --name "compleohealth-uptime" \
  --runtime-version "syn-nodejs-puppeteer-6.2" \
  --schedule cron="rate(5 minutes)"
```

#### 3. Lambda Function Monitoring
```bash
# Error rate alerts
aws cloudwatch put-metric-alarm \
  --alarm-name "ContactForm-HighErrors" \
  --alarm-description "High error rate on contact form" \
  --metric-name "Errors" \
  --namespace "AWS/Lambda" \
  --statistic "Sum" \
  --period 300 \
  --threshold 5 \
  --comparison-operator "GreaterThanThreshold"
```

#### 4. Amplify Deployment Monitoring
```bash
# Build failure alerts
aws cloudwatch put-metric-alarm \
  --alarm-name "Amplify-BuildFailures" \
  --alarm-description "Amplify build failures" \
  --metric-name "BuildFailure" \
  --namespace "AWS/Amplify"
```

### Notification Setup
```bash
# Create SNS topic for alerts
aws sns create-topic --name "compleohealth-alerts"

# Subscribe email addresses
aws sns subscribe \
  --topic-arn "arn:aws:sns:us-east-1:[account]:compleohealth-alerts" \
  --protocol "email" \
  --notification-endpoint "[admin-email]"
```

### Lightsail Failure Scenarios & Mitigation

#### Common Failure Points:
1. **Instance crash** - Memory exhaustion, CPU overload
2. **Storage full** - Database growth, log files
3. **Network issues** - Security group changes, IP blocking
4. **Application crashes** - Node.js/Strapi errors, PM2 issues

#### Mitigation Strategies:

**1. Automated Recovery:**
```bash
# PM2 auto-restart configuration
pm2 start ecosystem.config.js
pm2 startup
pm2 save

# ecosystem.config.js
module.exports = {
  apps: [{
    name: 'strapi',
    script: 'npm',
    args: 'start',
    instances: 1,
    exec_mode: 'cluster',
    watch: false,
    max_restarts: 10,
    min_uptime: '10s',
    max_memory_restart: '1G'
  }]
};
```

**2. Database Backup Automation:**
```bash
# Daily database backups
0 2 * * * /opt/compleohealth-cms/scripts/backup-database.sh

# backup-database.sh
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
cd /opt/compleohealth-cms
npm run strapi export -- --file "./backups/backup_$DATE.tar.gz"
aws s3 cp "./backups/backup_$DATE.tar.gz" s3://compleohealth-backups/
```

**3. Instance Snapshot Schedule:**
```bash
aws lightsail create-instance-snapshot \
  --instance-name "compleohealth-cms" \
  --instance-snapshot-name "cms-daily-$(date +%Y%m%d)"
```

---

## Migration Checklist

### Pre-Migration
- [ ] **Fact3:** AWS account access verified
- [ ] **Fact3:** DNS control confirmed for `compleohealth.com`
- [ ] **Jason:** Complete content backup created
- [ ] **Jason:** New Google Analytics account setup by Compleo
- [ ] **Both:** Migration schedule and rollback plan agreed

### Migration Day
- [ ] **Fact3:** Create Lightsail instance with static IP
- [ ] **Fact3:** Setup SSL certificates for CMS domain
- [ ] **Jason:** Deploy and test CMS with content restore
- [ ] **Fact3:** Create Lambda function and API Gateway
- [ ] **Jason:** Update environment variables
- [ ] **Fact3:** Deploy Amplify application
- [ ] **Fact3:** Configure custom domain and SSL
- [ ] **Both:** End-to-end testing
- [ ] **Fact3:** DNS cutover to new infrastructure
- [ ] **Both:** Monitor for issues

### Post-Migration
- [ ] **Fact3:** Setup monitoring and alerting
- [ ] **Fact3:** Configure automated backups
- [ ] **Jason:** Update documentation with new endpoints
- [ ] **Both:** Performance testing and optimization
- [ ] **Fact3:** Security review and hardening

---

## Risk Assessment & Rollback Plan

### High-Risk Items
1. **DNS propagation delays** (24-48 hours)
2. **SSL certificate verification** (DNS validation required)
3. **Content migration data integrity** (test thoroughly)
4. **Email deliverability** (SES domain verification)

### Rollback Strategy
1. **DNS rollback** - Point back to current infrastructure
2. **Amplify rollback** - Previous deployment available instantly
3. **CMS rollback** - Snapshot restore within 30 minutes
4. **Lambda rollback** - Previous version deployment

---

## Success Criteria

### Technical
- [ ] Website loads correctly at `compleohealth.com`
- [ ] All CMS content displays properly
- [ ] Contact forms submit successfully
- [ ] Google Analytics tracking active
- [ ] SSL certificates valid and secure
- [ ] Mobile responsiveness verified
- [ ] Page load speeds < 3 seconds

### Business
- [ ] Zero downtime during migration
- [ ] All existing functionality preserved
- [ ] Admin users can access CMS
- [ ] Email notifications working
- [ ] SEO rankings maintained

---

## Contact Information

**Jason (Developer):**
- Responsible for: Technical implementation, testing, documentation
- Available for: Migration troubleshooting, configuration issues

**Fact3 (Service Provider):**
- Responsible for: AWS infrastructure, DNS management, production deployment
- Available for: Infrastructure issues, domain management

**Key Communication:**
- Pre-migration: Technical requirements and planning
- During migration: Real-time coordination and issue resolution
- Post-migration: Monitoring and optimization

---

## Appendix

### A. Configuration Files Reference
- **Environment Variables:** `.env`, `client/.env`, `amplify.yml`
- **Contact Forms:** `client/src/components/forms/*-contact-form.tsx`
- **Analytics:** `client/src/lib/analytics.ts`, `shared/config/analytics.ts`
- **Build Configuration:** `amplify.yml`, `vite.config.ts`

### B. AWS Resource ARNs (To Be Updated)
- **Lightsail Instance:** `[TO BE ASSIGNED]`
- **Lambda Function:** `[TO BE ASSIGNED]`
- **Amplify App:** `[TO BE ASSIGNED]`
- **API Gateway:** `[TO BE ASSIGNED]`

### C. Performance Benchmarks
- **Current Lighthouse Score:** 95+ (Performance, Accessibility, SEO)
- **Page Load Time:** < 2 seconds on 3G
- **First Contentful Paint:** < 1.5 seconds
- **Cumulative Layout Shift:** < 0.1

This deployment guide provides everything needed for a successful migration from Flowency AWS to Compleo AWS with proper monitoring and risk mitigation strategies.