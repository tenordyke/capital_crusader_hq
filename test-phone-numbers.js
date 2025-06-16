require('dotenv').config();
const { ElevenLabsClient } = require('@elevenlabs/elevenlabs-js');

const elevenLabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

async function listPhoneNumbers() {
  try {
    console.log('📞 Checking ElevenLabs phone numbers...');
    
    const phoneNumbers = await elevenLabs.conversationalAi.phoneNumbers.list();
    console.log('Available phone numbers:', phoneNumbers);
    
  } catch (error) {
    console.error('❌ Error listing phone numbers:', error.message);
  }
}

listPhoneNumbers();
