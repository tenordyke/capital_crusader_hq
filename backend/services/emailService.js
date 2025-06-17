const nodemailer = require('nodemailer');
const { generateCarBuyersGuide, generateCarBuyersGuideFallback } = require('./pdfGenerator');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Create a transporter for custom domain email
// You'll need to add these to your .env file:
// EMAIL_HOST=your-smtp-host (e.g., smtp.gmail.com or your domain's SMTP)
// EMAIL_PORT=587 (or 465 for SSL)
// EMAIL_USER=drive@capitalcrusader.ca
// EMAIL_PASS=your-email-password
// EMAIL_FROM=Troy Nordyke <drive@capitalcrusader.ca>

// Debug: Log environment variables (remove in production)
console.log('Email config:', {
  host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
  port: process.env.EMAIL_PORT || 465,
  user: process.env.EMAIL_USER || 'drive@capitalcrusader.ca',
  passExists: !!process.env.EMAIL_PASS
});

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.EMAIL_PORT) || 465,
  secure: true, // true for 465 (SSL), false for other ports
  auth: {
    user: process.env.EMAIL_USER || 'drive@capitalcrusader.ca',
    pass: process.env.EMAIL_PASS || '$5438576TroyAlix$'
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendEmail = async (context) => {
  try {
    const { name, email, vehicle, tradeIn, timeframe, budget } = context;
    
    // Create personalized email content
    const subject = `Welcome to Capital GMC Buick Cadillac, ${name}! 🚗`;
    
    let htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #FFD700; padding: 20px; text-align: center;">
          <h1 style="color: #000; margin: 0;">Capital GMC Buick Cadillac</h1>
          <p style="color: #000; margin: 5px 0;">Regina's #1 Auto Superhero</p>
        </div>
        
        <div style="padding: 30px; background-color: #f5f5f5;">
          <h2 style="color: #333;">Hi ${name}! 👋</h2>
          
          <p style="color: #555; line-height: 1.6;">
            Thank you for your interest in ${vehicle !== 'Not specified' ? `a <strong>${vehicle}</strong>` : 'our vehicles'}! 
            Troy and the team at Capital GMC Buick Cadillac are excited to help you find your perfect vehicle.
          </p>
          
          <div style="background-color: #fff; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #d32f2f;">🎉 Your Exclusive Offer:</h3>
            <ul style="color: #555; line-height: 1.8;">
              <li><strong>$500 OFF</strong> any vehicle purchase</li>
              <li><strong>0% Financing</strong> available on select models</li>
              <li><strong>Free Car Buyer's Guide</strong> (attached)</li>
            </ul>
          </div>
    `;
    
    if (tradeIn !== 'No trade-in') {
      htmlContent += `
          <p style="color: #555; line-height: 1.6;">
            We're excited to evaluate your <strong>${tradeIn.split(' (')[0]}</strong> for trade-in! 
            We offer top dollar for trade-ins and will apply the value directly to your new vehicle.
          </p>
      `;
    }
    
    if (timeframe === 'immediately' || timeframe === 'within_week') {
      htmlContent += `
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="color: #856404; margin: 0;">
              <strong>⏰ Ready to Buy Soon?</strong> Troy is available for same-day appointments! 
              Call us at <a href="tel:306-331-4802">306-331-4802</a> to schedule your VIP test drive.
            </p>
          </div>
      `;
    }
    
    htmlContent += `
          <div style="margin-top: 30px;">
            <h3 style="color: #333;">Next Steps:</h3>
            <ol style="color: #555; line-height: 1.8;">
              <li>Review our current inventory online</li>
              <li>Schedule your no-pressure test drive</li>
              <li>Bring your trade-in for evaluation</li>
              <li>Drive away in your new vehicle!</li>
            </ol>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://troyatcapital.setmore.com/troy" 
               style="background-color: #d32f2f; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              Book Your Test Drive Now
            </a>
          </div>
          
          <p style="color: #555; line-height: 1.6; margin-top: 30px;">
            Have questions? Just reply to this email or call us at <strong>306-331-4802</strong>.
          </p>
          
          <p style="color: #555; line-height: 1.6;">
            Looking forward to helping you save the day!<br>
            <strong>Troy Nordyke</strong><br>
            Your Capital Crusader<br>
            Capital GMC Buick Cadillac
          </p>
        </div>
        
        <div style="background-color: #333; color: #fff; padding: 20px; text-align: center;">
          <p style="margin: 5px 0;">Capital GMC Buick Cadillac</p>
          <p style="margin: 5px 0;">📍 Regina, SK | 📞 306-331-4802</p>
          <p style="margin: 5px 0; font-size: 12px;">© 2025 All Rights Reserved</p>
        </div>
      </div>
    `;
    
    // Generate the PDF guide
    let pdfBuffer;
    try {
      pdfBuffer = await generateCarBuyersGuide();
      console.log('📄 PDF guide generated successfully');
    } catch (pdfError) {
      console.error('Failed to generate PDF with puppeteer, trying fallback:', pdfError);
      try {
        pdfBuffer = await generateCarBuyersGuideFallback();
        console.log('📄 PDF guide generated with fallback method');
      } catch (fallbackError) {
        console.error('Failed to generate PDF:', fallbackError);
        // Continue without attachment if PDF generation fails
      }
    }
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Troy Nordyke <drive@capitalcrusader.ca>',
      to: email,
      subject: subject,
      html: htmlContent,
      replyTo: 'drive@capitalcrusader.ca',
      attachments: pdfBuffer ? [
        {
          filename: 'Regina-Car-Buyers-Ultimate-Guide.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ] : []
    };
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('📧 Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error('❌ Email failed:', error);
    
    // If email fails, log it but don't crash the webhook
    // You might want to implement a retry mechanism or queue system
    return { success: false, error: error.message };
  }
};

module.exports = { sendEmail };
