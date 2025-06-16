require('dotenv').config();
const { createConversationalAgent } = require('./backend/services/elevenLabsAgent');

async function testAIAgent() {
  try {
    console.log('🧪 Testing ElevenLabs AI Agent...');
    
    const result = await createConversationalAgent({
      name: 'Alex',
      phone: '3063314802',
      vehicle: '2024 Cadillac Escalade'
    });
    
    console.log('✅ Test result:', result);
    
    if (result.success) {
      console.log('🎉 AI Agent call initiated successfully!');
      console.log('📞 Call SID:', result.sid);
      console.log('🤖 Conversation ID:', result.conversationId);
      console.log('📱 Ava should be calling now with conversational AI!');
    } else {
      console.log('❌ AI Agent test failed:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
}

testAIAgent();
