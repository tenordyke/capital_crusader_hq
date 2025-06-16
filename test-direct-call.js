const twilio = require('twilio');
require('dotenv').config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

async function testDirectCall() {
  try {
    console.log('📞 Making direct test call to your phone...');
    
    const call = await client.calls.create({
      twiml: `
        <Response>
          <Say voice="alice">
            Hi Alex! This is Ava calling from Capital GMC Buick Cadillac. 
            I'm calling about the 2024 GMC Sierra 1500 you were interested in. 
            We have some fantastic incentives available right now including zero percent financing. 
            Troy would love to set up a quick test drive for you. 
            Thanks and have a great day!
          </Say>
        </Response>
      `,
      to: '+13063314802',
      from: process.env.TWILIO_NUMBER,
    });

    console.log('✅ Direct call created:', call.sid);
    console.log('📱 You should receive a call now!');
    
  } catch (error) {
    console.error('❌ Direct call failed:', error.message);
  }
}

testDirectCall();
