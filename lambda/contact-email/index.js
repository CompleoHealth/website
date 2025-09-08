const AWS = require('aws-sdk');

// Initialize SES
const ses = new AWS.SES({ 
  region: process.env.AWS_REGION || 'eu-west-2' 
});

// Email templates
const createHtmlEmail = (data) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #007bff; color: white; padding: 20px; text-align: center; }
    .content { background-color: #f9f9f9; padding: 20px; margin-top: 20px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #555; }
    .value { margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #007bff; }
    .footer { margin-top: 20px; text-align: center; color: #777; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name:</div>
        <div class="value">${data.name}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value">${data.email}</div>
      </div>
      ${data.phone ? `
      <div class="field">
        <div class="label">Phone:</div>
        <div class="value">${data.phone}</div>
      </div>
      ` : ''}
      ${data.company ? `
      <div class="field">
        <div class="label">Company:</div>
        <div class="value">${data.company}</div>
      </div>
      ` : ''}
      <div class="field">
        <div class="label">Message:</div>
        <div class="value">${data.message}</div>
      </div>
      <div class="field">
        <div class="label">Submitted:</div>
        <div class="value">${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</div>
      </div>
    </div>
    <div class="footer">
      <p>This email was sent from the Compleo Health website contact form.</p>
    </div>
  </div>
</body>
</html>
`;

const createTextEmail = (data) => `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}
${data.company ? `Company: ${data.company}` : ''}

Message:
${data.message}

Submitted: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}

---
This email was sent from the Compleo Health website contact form.
`;

// Validation function
const validateInput = (body) => {
  const errors = [];
  
  if (!body.name || body.name.trim().length < 2) {
    errors.push('Name is required (minimum 2 characters)');
  }
  
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.push('Valid email is required');
  }
  
  if (!body.message || body.message.trim().length < 10) {
    errors.push('Message is required (minimum 10 characters)');
  }
  
  // Honeypot check (anti-spam)
  if (body.website) {
    errors.push('Spam detected');
  }
  
  return errors;
};

// Main Lambda handler
exports.handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'POST,OPTIONS'
      },
      body: ''
    };
  }
  
  try {
    // Parse request body
    const body = JSON.parse(event.body);
    
    // Validate input
    const errors = validateInput(body);
    if (errors.length > 0) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          success: false, 
          errors 
        })
      };
    }
    
    // Prepare email parameters
    const params = {
      Destination: {
        ToAddresses: [process.env.TO_EMAIL || 'sales@compleohealth.com'],
        CcAddresses: process.env.CC_EMAIL ? [process.env.CC_EMAIL] : []
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: createHtmlEmail(body)
          },
          Text: {
            Charset: 'UTF-8',
            Data: createTextEmail(body)
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Website Contact: ${body.name} - ${new Date().toLocaleDateString('en-GB')}`
        }
      },
      Source: process.env.FROM_EMAIL || 'noreply@compleohealth.com',
      ReplyToAddresses: [body.email]
    };
    
    // Send email
    const result = await ses.sendEmail(params).promise();
    console.log('Email sent successfully:', result.MessageId);
    
    // Return success response
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: 'Your message has been sent successfully. We will get back to you soon.',
        messageId: result.MessageId
      })
    };
    
  } catch (error) {
    console.error('Error processing request:', error);
    
    // Check for specific SES errors
    if (error.code === 'MessageRejected') {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          success: false,
          error: 'Email address is not verified. Please try again.'
        })
      };
    }
    
    // Generic error response
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: 'Failed to send message. Please try again later.'
      })
    };
  }
};