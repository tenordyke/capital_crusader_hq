const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config();

// Handle node-fetch v3 ESM import
const fetchModule = fetch.default || fetch;

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID;

async function testElevenLabs() {
  try {
    console.log('🎤 Testing ElevenLabs integration...');
    console.log('API Key:', ELEVENLABS_API_KEY ? 'Present' : 'Missing');
    console.log('Voice ID:', VOICE_ID ? VOICE_ID : 'Missing');
    
    if (!ELEVENLABS_API_KEY || !VOICE_ID) {
      throw new Error('Missing ElevenLabs credentials');
    }
    
    const testScript = "Hi there, this is Ava from Capital GMC Buick Cadillac. This is a test of our voice system.";
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;
    
    console.log('🔊 Generating test audio...');
    console.log('URL:', url);
    
    const response = await fetchModule(url, {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: testScript,
        voice_settings: { stability: 0.4, similarity_boost: 1.0 },
      }),
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers));
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ElevenLabs error: ${response.status} - ${errorText}`);
    }
    
    const buffer = await response.buffer();
    const outputPath = path.join(__dirname, 'frontend', 'test-ava-voice.mp3');
    
    // Ensure frontend directory exists
    if (!fs.existsSync('frontend')) {
      fs.mkdirSync('frontend');
    }
    
    fs.writeFileSync(outputPath, buffer);
    
    console.log('✅ Test audio generated successfully!');
    console.log('📁 File saved to:', outputPath);
    console.log('📏 File size:', buffer.length, 'bytes');
    
    return outputPath;
    
  } catch (error) {
    console.error('❌ ElevenLabs test failed:', error.message);
    throw error;
  }
}

testElevenLabs();
