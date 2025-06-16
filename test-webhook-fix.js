const { sendTextMessage } = require('./backend/services/twilioService');
require('dotenv').config();

async function testWebhookFix() {
  console.log('🔧 Testing Webhook Fix...\n');
  
  const testContext = {
    name: 'Webhook Test',
    phone: '3065405100',
    email: 'test@example.com',
    vehicle: '2024 GMC Sierra',
    tradeIn: 'No trade-in',
    timeframe: 'within_week',
    budget: '40k-50k'
  };
  
  console.log('📱 Sending test message to verify webhook is working...');
  
  try {
    const result = await sendTextMessage(testContext);
    
    if (result.success) {
      console.log('✅ Test message sent successfully!');
      console.log('📱 Message SID:', result.sid);
      console.log('\n🔗 Webhook URL: https://capital-crusader-webhook.loca.lt/webhook/twilio/sms');
      console.log('\n📋 Next Steps:');
      console.log('1. Update Twilio console with the webhook URL above');
      console.log('2. Reply to the text message you receive');
      console.log('3. You should get an AI response from Lex instead of config message');
      console.log('\n💬 Try replying with:');
      console.log('- "YES" (for test drive)');
      console.log('- "What\'s the price?"');
      console.log('- "Tell me about financing"');
      console.log('- Any question to test AI responses');
    } else {
      console.log('❌ Test message failed:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testWebhookFix().catch(console.error);
