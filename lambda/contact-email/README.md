# Contact Email Lambda Function

This Lambda function handles contact form submissions from the Compleo Health website.

## Setup

### 1. Local Development

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your values
```

### 2. AWS Setup

#### Create Lambda Function
```bash
aws lambda create-function \
  --function-name compleohealth-contact-email \
  --runtime nodejs18.x \
  --role arn:aws:iam::YOUR_ACCOUNT:role/lambda-ses-role \
  --handler index.handler \
  --timeout 10
```

#### Create IAM Role
The Lambda function needs a role with these permissions:
- SES:SendEmail
- CloudWatch Logs

#### Configure API Gateway
1. Create REST API
2. Create `/contact` resource
3. Add POST method
4. Configure Lambda integration
5. Enable CORS
6. Deploy to stage

### 3. Environment Variables

Set these in Lambda console or via CLI:

- `AWS_REGION`: AWS region (default: eu-west-2)
- `TO_EMAIL`: Recipient email address
- `FROM_EMAIL`: Sender email address (must be verified in SES)
- `CC_EMAIL`: Optional CC recipient
- `ALLOWED_ORIGINS`: CORS allowed origins

### 4. Deployment

#### Manual Deployment
```bash
# Create deployment package
zip -r function.zip index.js package.json node_modules

# Upload to Lambda
aws lambda update-function-code \
  --function-name compleohealth-contact-email \
  --zip-file fileb://function.zip
```

#### CI/CD Deployment
See `.github/workflows/deploy-lambda.yml` in main repository.

### 5. Testing

Test the function with this payload:
```json
{
  "httpMethod": "POST",
  "body": "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"message\":\"Test message\"}"
}
```

### 6. Monitoring

- CloudWatch Logs: `/aws/lambda/compleohealth-contact-email`
- Metrics: AWS Lambda console
- Alarms: Set up for error rate > 1%

## Troubleshooting

### Email not sending
1. Check SES is not in sandbox mode
2. Verify sender email in SES
3. Check CloudWatch logs for errors

### CORS errors
1. Verify API Gateway CORS configuration
2. Check `ALLOWED_ORIGINS` environment variable
3. Ensure OPTIONS method is configured

### Rate limiting
- Lambda concurrent executions: 1000 (default)
- SES sending rate: Check your SES limits