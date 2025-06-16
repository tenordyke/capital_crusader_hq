const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');
const twilio = require('twilio');
const { uploadAudioToSupabase } = require('./supabaseStorage');
require('dotenv').config({ path: '../../.env' });

// Handle node-fetch v3 ESM import
const fetchModule = fetch.default || fetch;

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID;

const generateAudioWithAva = async (text, filename) => {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;
  const outputPath = path.join(__dirname, '..', '..', 'frontend', `${filename}.mp3`);

  const response = await fetchModule(url, {
    method: 'POST',
    headers: {
      'xi-api-key': ELEVENLABS_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: text,
      voice_settings: { 
        stability: 0.75, 
        similarity_boost: 0.85,
        style: 0.2,
        use_speaker_boost: true
      },
      model_id: "eleven_multilingual_v2"
    }),
  });

  if (!response.ok) {
    throw new Error(`ElevenLabs error: ${response.statusText}`);
  }

  const buffer = await response.buffer();
  fs.writeFileSync(outputPath, buffer);

  return outputPath;
};

const callLeadWithAva = async ({ name, phone, vehicle }) => {
  try {
    const script = `Hi ${name}! This is Lex from Capital GMC Buick Cadillac. I'm calling about the ${vehicle} you were interested in. 

We have some fantastic incentives available right now - including zero percent financing and special Costco member pricing. 

Troy would love to set up a quick test drive for you when it's convenient. Give us a call back when you get a chance. Thanks so much, and have a great day!`;

    // Generate unique filename for this call
    const timestamp = Date.now();
    const filename = `ava-call-${timestamp}`;
    
    // Generate audio with ElevenLabs
    const audioPath = await generateAudioWithAva(script, filename);
    
    // Upload to Supabase Storage and get public URL
    const publicAudioURL = await uploadAudioToSupabase(audioPath, `${filename}.mp3`);
    
    console.log('🎵 Audio uploaded to:', publicAudioURL);

    const call = await client.calls.create({
      twiml: `
        <Response>
          <Play>${publicAudioURL}</Play>
        </Response>
      `,
      to: `+1${phone}`,
      from: process.env.TWILIO_NUMBER,
    });

    console.log('📞 Lex call started with ElevenLabs voice:', call.sid);
    
    // Clean up local file after upload
    fs.unlinkSync(audioPath);
    
    return { success: true, sid: call.sid, audioUrl: publicAudioURL };

  } catch (error) {
    console.error('❌ Lex call failed:', error);
    return { success: false, error: error.message };
  }
};

const sendTextMessage = async (context) => {
  try {
    const { name, phone, vehicle, tradeIn, timeframe, budget } = context;
    
    // Create personalized message based on context
    let message = `Hi ${name}! Thanks for your interest in ${vehicle !== 'Not specified' ? `a ${vehicle}` : 'our vehicles'} at Capital GMC Buick Cadillac. `;
    
    if (timeframe === 'immediately' || timeframe === 'within_week') {
      message += `I see you're looking to purchase soon! `;
    }
    
    if (tradeIn !== 'No trade-in') {
      message += `We'd love to evaluate your ${tradeIn.split(' (')[0]} for trade-in. `;
    }
    
    message += `Troy is available to help you save with our $500 OFF promotion. Reply YES to schedule a test drive or call 306-331-4802. - Lex`;

    const sms = await client.messages.create({
      body: message,
      to: `+1${phone}`,
      from: process.env.TWILIO_NUMBER
    });

    console.log('💬 Text message sent:', sms.sid);
    return { success: true, sid: sms.sid, message: message };

  } catch (error) {
    console.error('❌ Text message failed:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { callLeadWithAva, sendTextMessage };
