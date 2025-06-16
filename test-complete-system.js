const { createConversationalAgent } = require('./backend/services/elevenLabsAgent');
const { sendEmail } = require('./backend/services/emailService');
const { sendTextMessage } = require('./backend/services/twilioService');
const { notifyTroy } = require('./backend/services/notificationService');
require('dotenv').config();

// Test data - using realistic test scenario
const testContext = {
  name: 'Troy Test Customer',
  phone: '3063314802', // Using your business number for testing
  email: 'drive@capitalcrusader.ca', // Using your business email
  vehicle: '2024 GMC Sierra',
  tradeIn: '2018 Ford F-150 (150,000 km)',
  timeframe: 'within_week',
  budget: '40k-50k'
};

async function testCompleteSystem() {
  console.log('🚀 Starting Complete System Test...\n');
  
  // Test 1: ElevenLabs AI Agent Call
  console.log('📞 Testing ElevenLabs AI Agent Call...');
  try {
    const callResult = await createConversationalAgent(testContext);
    if (callResult.success) {
      console.log('✅ AI Agent call initiated successfully');
      console.log('   Call ID:', callResult.callId);
      console.log('   Agent Type:', callResult.agentType);
    } else {
      console.log('❌ AI Agent call failed:', callResult.error);
    }
  } catch (error) {
    console.log('❌ AI Agent call error:', error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 2: Email Service
  console.log('📧 Testing Email Service...');
  try {
    const emailResult = await sendEmail(testContext);
    if (emailResult.success) {
      console.log('✅ Email sent successfully');
      console.log('   Message ID:', emailResult.messageId);
    } else {
      console.log('❌ Email failed:', emailResult.error);
    }
  } catch (error) {
    console.log('❌ Email error:', error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 3: SMS Service
  console.log('💬 Testing SMS Service...');
  try {
    const smsResult = await sendTextMessage(testContext);
    if (smsResult.success) {
      console.log('✅ SMS sent successfully');
      console.log('   Message SID:', smsResult.sid);
      console.log('   Message:', smsResult.message);
    } else {
      console.log('❌ SMS failed:', smsResult.error);
    }
  } catch (error) {
    console.log('❌ SMS error:', error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 4: Notification System
  console.log('📨 Testing Notification System...');
  try {
    await notifyTroy('NEW_LEAD', {
      name: testContext.name,
      email: testContext.email,
      phone: testContext.phone,
      vehicle: testContext.vehicle,
      tradeIn: testContext.tradeIn,
      budget: testContext.budget,
      timeframe: testContext.timeframe,
      preferred_contact_method: 'Call, Text, Email',
      actions: ['AI phone call initiated', 'Email sent with Car Buyer\'s Guide', 'Text message sent']
    });
    console.log('✅ Troy notification sent successfully');
  } catch (error) {
    console.log('❌ Notification error:', error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 5: Follow-up Scenarios
  console.log('🔄 Testing Follow-up Scenarios...');
  
  // Simulate call completion
  try {
    await notifyTroy('CALL_COMPLETED', {
      customerName: testContext.name,
      phone: testContext.phone,
      duration: '3 minutes',
      status: 'completed',
      transcript: 'Customer expressed interest in scheduling a test drive. Mentioned they have financing questions.',
      summary: 'Positive call - customer wants to schedule test drive and discuss financing options.'
    });
    console.log('✅ Call completion notification sent');
  } catch (error) {
    console.log('❌ Call completion notification error:', error.message);
  }
  
  // Simulate customer reply
  try {
    await notifyTroy('CUSTOMER_REPLY', {
      customerName: testContext.name,
      channel: 'SMS',
      message: 'YES - I would like to schedule a test drive for this weekend'
    });
    console.log('✅ Customer reply notification sent');
  } catch (error) {
    console.log('❌ Customer reply notification error:', error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Environment Check
  console.log('🔧 Environment Configuration Check...');
  const requiredEnvVars = [
    'ELEVENLABS_API_KEY',
    'ELEVENLABS_AGENT_ID', 
    'ELEVENLABS_PHONE_NUMBER_ID',
    'TWILIO_SID',
    'TWILIO_AUTH',
    'TWILIO_NUMBER',
    'EMAIL_HOST',
    'EMAIL_USER',
    'EMAIL_PASS'
  ];
  
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length === 0) {
    console.log('✅ All required environment variables are set');
  } else {
    console.log('❌ Missing environment variables:');
    missingVars.forEach(varName => {
      console.log(`   - ${varName}`);
    });
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  console.log('🏁 System Test Complete!');
  console.log('\nNext Steps:');
  console.log('1. Check your phone for the AI call');
  console.log('2. Check your email for the welcome message with PDF');
  console.log('3. Check your SMS for the text message');
  console.log('4. Check Troy\'s email for all notifications');
  console.log('\nIf any tests failed, check the error messages above and verify your .env configuration.');
}

// Run the test
testCompleteSystem().catch(console.error);
