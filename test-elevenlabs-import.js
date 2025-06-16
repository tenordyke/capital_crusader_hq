try {
  const elevenLabs = require('@elevenlabs/elevenlabs-js');
  console.log('ElevenLabs exports:', Object.keys(elevenLabs));
  console.log('Full export:', elevenLabs);
} catch (error) {
  console.error('Import error:', error.message);
}
