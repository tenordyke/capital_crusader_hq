const { sendEmail } = require('./services/emailService');
require('dotenv').config({ path: '../.env' });

// Test function to send email
const testEmail = async () => {
  console.log('🧪 Testing email service...');
  console.log('📧 Sending to: drive@capitalcrusader.ca');
  
  // Create test context with sample data
  const testContext = {
    name: 'Troy Test',
    email: 'drive@capitalcrusader.ca',
    vehicle: 'GMC Sierra 1500',
    tradeIn: '2018 Ford F-150 (2018, 45,000 km)',
    timeframe: 'immediately',
    budget: '40k-50k'
  };
  
  try {
    console.log('\n📤 Attempting to send email with PDF attachment...');
    const result = await sendEmail(testContext);
    
    if (result.success) {
      console.log('✅ Email sent successfully!');
      console.log('📬 Message ID:', result.messageId);
      console.log('\n🎉 Check your inbox at drive@capitalcrusader.ca');
      console.log('📎 The email should include the Car Buyer\'s Guide PDF attachment');
    } else {
      console.error('❌ Email failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Test failed:', error);
    console.error('\n🔧 Troubleshooting tips:');
    console.error('1. Make sure your .env file contains:');
    console.error('   EMAIL_HOST=your-smtp-server');
    console.error('   EMAIL_PORT=587');
    console.error('   EMAIL_USER=drive@capitalcrusader.ca');
    console.error('   EMAIL_PASS=your-password');
    console.error('   EMAIL_FROM=Troy Nordyke <drive@capitalcrusader.ca>');
    console.error('\n2. If using Gmail/Google Workspace:');
    console.error('   - Enable 2-factor authentication');
    console.error('   - Generate an app-specific password');
    console.error('   - Use the app password instead of your regular password');
    console.error('\n3. Make sure puppeteer is installed:');
    console.error('   npm install puppeteer');
  }
};

// Run the test
console.log('🚀 Capital Crusader Email Test');
console.log('================================\n');
testEmail();
