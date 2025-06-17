const nodemailer = require('nodemailer');
require('dotenv').config({ path: './backend/.env' });

async function testEmail() {
  console.log('🔧 Testing email configuration...');
  console.log('Email settings:', {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    passExists: !!process.env.EMAIL_PASS
  });

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('📧 Testing SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful');

    console.log('📤 Sending test email...');
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: 'drive@capitalcrusader.ca',
      subject: 'Test Email - Capital Crusader Assistant',
      html: `
        <h1>Test Email</h1>
        <p>This is a test email from your Capital Crusader Assistant system.</p>
        <p>If you receive this, email delivery is working correctly!</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
      `
    });

    console.log('✅ Email sent successfully:', {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response
    });

  } catch (error) {
    console.error('❌ Email test failed:', error);
    console.error('Error details:', {
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode
    });
  }
}

testEmail();
