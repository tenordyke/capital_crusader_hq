const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmailSystem() {
  console.log('📧 Testing Email System...\n');
  
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.EMAIL_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER || 'drive@capitalcrusader.ca',
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    // Test email to Troy
    console.log('📧 Sending test email to Troy...');
    
    const testEmail = {
      from: 'Capital Crusader System <drive@capitalcrusader.ca>',
      to: 'drive@capitalcrusader.ca',
      subject: '🧪 Email System Test - Appointment Booking',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #28a745; padding: 20px; text-align: center;">
            <h2 style="color: white; margin: 0;">Email System Test</h2>
          </div>
          
          <div style="padding: 20px; background-color: #f5f5f5;">
            <p>This is a test email to verify the appointment booking email system is working.</p>
            
            <div style="background-color: white; padding: 15px; margin: 10px 0; border-radius: 5px;">
              <h3>Test Details:</h3>
              <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>System:</strong> Custom Booking Service</p>
              <p><strong>Status:</strong> Email system operational</p>
            </div>
            
            <p>If you receive this email, the appointment booking email system is working correctly!</p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(testEmail);
    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', result.messageId);
    console.log('📧 Response:', result.response);
    
    console.log('\n📋 Email Configuration:');
    console.log('Host:', process.env.EMAIL_HOST);
    console.log('Port:', process.env.EMAIL_PORT);
    console.log('User:', process.env.EMAIL_USER);
    console.log('From:', process.env.EMAIL_FROM);
    
    console.log('\n✅ If you receive the test email, the system is working!');
    console.log('📧 Check your inbox at drive@capitalcrusader.ca');
    
  } catch (error) {
    console.error('❌ Email test failed:', error);
  }
}

testEmailSystem().catch(console.error);
