require('dotenv').config();
const { ElevenLabsClient } = require('@elevenlabs/elevenlabs-js');

const elevenLabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

console.log('Conversations object:', elevenLabs.conversationalAi.conversations);
console.log('Conversations methods:', Object.getOwnPropertyNames(elevenLabs.conversationalAi.conversations));
console.log('Conversations prototype methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(elevenLabs.conversationalAi.conversations)));
