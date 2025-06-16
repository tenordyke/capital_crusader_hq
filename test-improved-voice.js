const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config();

// Handle node-fetch v3 ESM import
const fetchModule = fetch.default || fetch;

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID;

async function testImprovedVoice() {
  try {
    console.log('🎤 Testing improved ElevenLabs voice settings...');
    
    const testScript = `Hi Alex! This is Ava from Capital GMC Buick Cadillac. I'm calling about the 2024 Buick Enclave you were interested in. 

We have some fantastic incentives available right now - including zero percent financing and special Costco member pricing. 

Troy would love to set up a quick test drive for you when it's convenient. Give us a call back when you get a chance. Thanks so much, and have a great day!`;

    const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;
    
    console.log('🔊 Generating audio with improved settings...');
    
    const response = await fetchModule(url, {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: testScript,
        voice_settings: { 
          stability: 0.75, 
          similarity_boost: 0.85,
          style: 0.2,
          use_speaker_boost: true
        },
        model_id: "eleven_multilingual_v2"
      }),
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ElevenLabs error: ${response.status} - ${errorText}`);
    }
    
    const buffer = await response.arrayBuffer();
    const outputPath = path.join(__dirname, 'frontend', 'improved-ava-voice.mp3');
    
    // Ensure frontend directory exists
    if (!fs.existsSync('frontend')) {
      fs.mkdirSync('frontend');
    }
    
    fs.writeFileSync(outputPath, Buffer.from(buffer));
    
    console.log('✅ Improved audio generated successfully!');
    console.log('📁 File saved to:', outputPath);
    console.log('📏 File size:', buffer.byteLength, 'bytes');
    
    return outputPath;
    
  } catch (error) {
    console.error('❌ Improved voice test failed:', error.message);
    throw error;
  }
}

testImprovedVoice();
