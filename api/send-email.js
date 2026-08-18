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

    // Email HTML template
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
        <h2 style="color: #0f2b5b; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Enquiry: ${formSource}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Interested In:</strong> ${interestedIn}</p>
        <h3 style="color: #4b5563; margin-top: 20px;">Message:</h3>
        <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; color: #1f2937;">
          ${message.replace(/\n/g, '<br/>')}
        </div>
        <p style="margin-top: 30px; font-size: 12px; color: #9ca3af;">This email was sent automatically from the Hi-Tech Estates website.</p>
      </div>
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
