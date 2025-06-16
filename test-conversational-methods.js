require('dotenv').config();
const { ElevenLabsClient } = require('@elevenlabs/elevenlabs-js');

const elevenLabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

console.log('ElevenLabs client methods:');
console.log('conversationalAi:', elevenLabs.conversationalAi);
console.log('conversationalAi methods:', elevenLabs.conversationalAi ? Object.getOwnPropertyNames(elevenLabs.conversationalAi) : 'undefined');

if (elevenLabs.conversationalAi) {
  console.log('Available methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(elevenLabs.conversationalAi)));
}
