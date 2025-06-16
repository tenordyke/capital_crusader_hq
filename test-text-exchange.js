const { sendTextMessage } = require('./backend/services/twilioService');
const { notifyTroy } = require('./backend/services/notificationService');
require('dotenv').config();

// Test context for the text message
const testContext = {
  name: 'Test Customer',
  phone: '3065405100',
  email: 'test@example.com',
  vehicle: '2024 GMC Sierra',
  tradeIn: '2020 Honda Civic',
  timeframe: 'within_week',
  budget: '40k-50k'
};

async function testTextExchange() {
  console.log('📱 Testing Text Message Exchange...\n');
  
  try {
    console.log('Sending initial text message to:', testContext.phone);
    
    // Send the initial text message
    const smsResult = await sendTextMessage(testContext);
    
    if (smsResult.success) {
      console.log('✅ Text message sent successfully!');
      console.log('📱 Message SID:', smsResult.sid);
      console.log('📝 Message content:');
      console.log(smsResult.message);
      
      // Notify Troy about the text being sent
      await notifyTroy('TEXT_SENT', {
        customerName: testContext.name,
        phone: testContext.phone,
        message: smsResult.message
      });
      
      console.log('\n🔔 Troy has been notified about the text message');
      console.log('\n📲 The system is now ready to receive replies!');
      console.log('When you reply to the text message, the webhook will:');
      console.log('1. Process your response');
      console.log('2. Send a notification to Troy');
      console.log('3. Potentially trigger follow-up actions');
      
    } else {
      console.log('❌ Text message failed:', smsResult.error);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testTextExchange().catch(console.error);
