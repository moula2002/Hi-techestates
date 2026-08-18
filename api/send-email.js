import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { 
      name = 'Not Provided', 
      email = 'Not Provided', 
      phone = 'Not Provided', 
      interestedIn = 'Not Provided', 
      message = 'No message provided',
      formSource = 'Website Form' // e.g., 'Contact Page', 'Home Page'
    } = req.body;

    // Check if SMTP credentials are still set to the dummy values or are missing
    if (!process.env.SMTP_USER || process.env.SMTP_USER === 'your_email@gmail.com' || !process.env.SMTP_PASS) {
      console.error('SMTP Configuration Error: Credentials are missing or set to dummy values.');
      return res.status(500).json({ 
        success: false, 
        message: 'Server Configuration Error: SMTP credentials (Email & App Password) are missing. Please add them to your Vercel Environment Variables or .env.local file.' 
      });
    }

    // Configure the Nodemailer transporter for Gmail
    // Using the 'gmail' service shortcut is the most reliable way to connect on Vercel
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Premium Email HTML template matching website branding
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
          .header { background-color: #0f172a; padding: 35px 30px; text-align: center; border-bottom: 4px solid #3b82f6; }
          .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 1px; }
          .header p { color: #94a3b8; margin: 12px 0 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600; }
          .content { padding: 40px 35px; }
          .field { margin-bottom: 25px; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px; }
          .field:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
          .label { font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; margin-bottom: 8px; display: block; }
          .value { font-size: 16px; color: #0f172a; font-weight: 600; margin: 0; }
          .message-box { background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; margin-top: 12px; }
          .message-text { color: #334155; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap; font-weight: 500; }
          .footer { background-color: #f1f5f9; padding: 25px; text-align: center; border-top: 1px solid #e2e8f0; }
          .footer p { margin: 0; color: #64748b; font-size: 13px; font-weight: 500; }
          .accent { color: #3b82f6; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Hi-Tech <span class="accent">Estates</span></h1>
            <p>New Enquiry: ${formSource}</p>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">Full Name</span>
              <p class="value">${name}</p>
            </div>
            <div class="field">
              <span class="label">Email Address</span>
              <p class="value"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></p>
            </div>
            <div class="field">
              <span class="label">Phone Number</span>
              <p class="value"><a href="tel:${phone}" style="color: #0f172a; text-decoration: none;">${phone}</a></p>
            </div>
            <div class="field">
              <span class="label">Interested In</span>
              <p class="value">${interestedIn}</p>
            </div>
            <div class="field">
              <span class="label">Message</span>
              <div class="message-box">
                <p class="message-text">${message}</p>
              </div>
            </div>
          </div>
          <div class="footer">
            <p>This is an automated message from the Hi-Tech Estates website system.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send the email
    await transporter.sendMail({
      from: `"Hi-Tech Website" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO_ADMIN || process.env.SMTP_USER, // Send to admin, default to self if not set
      subject: `New Enquiry from ${name} (${formSource})`,
      html: htmlContent,
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully!' });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send email. Check SMTP configuration.',
      error: error.message 
    });
  }
}
