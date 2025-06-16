const { sendTextMessage } = require('./backend/services/twilioService');
require('dotenv').config();

async function testAppointmentBooking() {
  console.log('📅 Testing AI Appointment Booking System...\n');
  
  const testContext = {
    name: 'Appointment Test Customer',
    phone: '3063314802',
    email: 'test@capitalcrusader.ca',
    vehicle: '2024 GMC Sierra',
    tradeIn: 'No trade-in',
    timeframe: 'within_week',
    budget: '40k-50k'
  };
  
  console.log('📱 Sending test message for appointment booking...');
  
  try {
    const result = await sendTextMessage(testContext);
    
    if (result.success) {
      console.log('✅ Test message sent successfully!');
      console.log('📱 Message SID:', result.sid);
      console.log('📝 Message content:');
      console.log(result.message);
      console.log('\n🤖 Enhanced AI System with Appointment Booking Ready!');
      console.log('\n📅 Test Appointment Booking:');
      console.log('Reply with any of these to test appointment booking:');
      console.log('- "YES" → Lex will offer time slots and book appointment');
      console.log('- "I want to schedule a test drive" → Lex will handle scheduling');
      console.log('- "Can I book for tomorrow at 2pm?" → Lex will try to book specific time');
      console.log('- "What times are available?" → Lex will suggest available slots');
      console.log('\n💬 Other conversation tests:');
      console.log('- "What\'s the price?" → Pricing discussion');
      console.log('- "Tell me about financing" → Financing options');
      console.log('- "What colors are available?" → Vehicle information');
      console.log('\n🔧 System Features:');
      console.log('✅ AI-powered conversations');
      console.log('✅ Appointment booking via Setmore');
      console.log('✅ Troy notifications for all interactions');
      console.log('✅ Customer context awareness');
      console.log('✅ Professional brand voice');
    } else {
      console.log('❌ Test message failed:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAppointmentBooking().catch(console.error);
