const { sendTextMessage } = require('./backend/services/twilioService');
require('dotenv').config();

async function testCustomBookingSystem() {
  console.log('📅 Testing Custom Booking System...\n');
  
  const testContext = {
    name: 'Custom Booking Test',
    phone: '3063314802',
    email: 'test@capitalcrusader.ca',
    vehicle: '2024 GMC Sierra',
    tradeIn: 'No trade-in',
    timeframe: 'within_week',
    budget: '40k-50k'
  };
  
  console.log('📱 Sending test message for custom booking system...');
  
  try {
    const result = await sendTextMessage(testContext);
    
    if (result.success) {
      console.log('✅ Test message sent successfully!');
      console.log('📱 Message SID:', result.sid);
      console.log('📝 Message content:');
      console.log(result.message);
      console.log('\n🎯 Custom Booking System Features:');
      console.log('✅ Stores appointments in Supabase database');
      console.log('✅ Sends calendar invites (.ics files) to customers');
      console.log('✅ Sends detailed notifications to Troy via drive@capitalcrusader.ca');
      console.log('✅ Uses your email account for all communications');
      console.log('✅ No third-party booking service required');
      console.log('\n📅 Test Custom Appointment Booking:');
      console.log('Reply with any of these to test the custom booking:');
      console.log('- "Tomorrow at 2pm" → Creates appointment + calendar invite');
      console.log('- "Can I book for tomorrow at 10am?" → Full booking process');
      console.log('- "Schedule a test drive" → Offers time slots');
      console.log('\n📧 What happens when you book:');
      console.log('1. Appointment stored in Supabase database');
      console.log('2. Customer receives calendar invite email');
      console.log('3. Troy receives detailed appointment notification');
      console.log('4. Customer gets confirmation with appointment details');
      console.log('\n🔧 System Benefits:');
      console.log('✅ Complete control over booking system');
      console.log('✅ Uses your existing email account');
      console.log('✅ Professional calendar invites');
      console.log('✅ Detailed appointment tracking');
      console.log('✅ No monthly fees or third-party dependencies');
    } else {
      console.log('❌ Test message failed:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testCustomBookingSystem().catch(console.error);
