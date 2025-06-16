const { sendTextMessage } = require('./backend/services/twilioService');
require('dotenv').config();

async function testAdditionalNumber() {
  console.log('📱 Testing AI System with Additional Number...\n');
  
  const testContext = {
    name: 'Troy Test',
    phone: '3063314802',
    email: 'test@capitalcrusader.ca',
    vehicle: '2024 GMC Sierra',
    tradeIn: '2019 Chevrolet Silverado',
    timeframe: 'immediately',
    budget: '50k-70k'
  };
  
  console.log('📱 Sending test message to 3063314802...');
  
  try {
    const result = await sendTextMessage(testContext);
    
    if (result.success) {
      console.log('✅ Test message sent successfully!');
      console.log('📱 Message SID:', result.sid);
      console.log('📝 Message content:');
      console.log(result.message);
      console.log('\n🤖 AI System Ready!');
      console.log('Reply to test the AI conversation system.');
      console.log('\n💬 Try replying with:');
      console.log('- "YES" (for test drive)');
      console.log('- "What\'s the best price?"');
      console.log('- "Tell me about that Sierra"');
      console.log('- "Do you have financing?"');
      console.log('- Any question to test AI responses');
    } else {
      console.log('❌ Test message failed:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAdditionalNumber().catch(console.error);
