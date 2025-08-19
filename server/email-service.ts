import { MailService } from '@sendgrid/mail';
import { ContactFormData } from '@shared/schema';

if (!process.env.SENDGRID_API_KEY) {

}

const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function sendContactEmail(contactData: ContactFormData): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.error('SendGrid API key not configured');
    return false;
  }

  try {
    const emailContent = `
New Contact Form Submission

Contact Type: ${contactData.type.toUpperCase()}
Name: ${contactData.firstName} ${contactData.lastName}
Email: ${contactData.email}
Phone: ${contactData.phone || 'Not provided'}
Organization: ${contactData.organization || 'Not provided'}
Role: ${contactData.role || 'Not provided'}
Service Interest: ${contactData.serviceInterest || 'Not provided'}

Message:
${contactData.message || 'No message provided'}

---
This email was sent from the Compleo Health website contact form.
    `;

    await mailService.send({
      to: 'sales@compleohealth.com',
      from: 'noreply@compleohealth.com',
      subject: 'Contact from Website',
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f2e2e;">New Contact Form Submission</h2>
          
          <div style="background: #f7f9f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0f2e2e; margin-top: 0;">Contact Information</h3>
            <p><strong>Contact Type:</strong> ${contactData.type.toUpperCase()}</p>
            <p><strong>Name:</strong> ${contactData.firstName} ${contactData.lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
            <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
            <p><strong>Organization:</strong> ${contactData.organization || 'Not provided'}</p>
            <p><strong>Role:</strong> ${contactData.role || 'Not provided'}</p>
            <p><strong>Service Interest:</strong> ${contactData.serviceInterest || 'Not provided'}</p>
          </div>
          
          ${contactData.message ? `
            <div style="background: #ffffff; padding: 20px; border-left: 4px solid #00a990; margin: 20px 0;">
              <h3 style="color: #0f2e2e; margin-top: 0;">Message</h3>
              <p style="white-space: pre-wrap;">${contactData.message}</p>
            </div>
          ` : ''}
          
          <div style="color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            This email was sent from the Compleo Health website contact form.
          </div>
        </div>
      `
    });

    return true;
  } catch (error: any) {
    console.error('SendGrid email error:', error);
    if (error.code === 403) {
      console.error('SendGrid domain verification required. The domain compleohealth.com needs to be verified in SendGrid.');
    }
    return false;
  }
}