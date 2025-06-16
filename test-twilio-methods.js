require('dotenv').config();
const { ElevenLabsClient } = require('@elevenlabs/elevenlabs-js');

const elevenLabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

console.log('Twilio object:', elevenLabs.conversationalAi.twilio);
console.log('Twilio methods:', Object.getOwnPropertyNames(elevenLabs.conversationalAi.twilio));
console.log('Twilio prototype methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(elevenLabs.conversationalAi.twilio)));
