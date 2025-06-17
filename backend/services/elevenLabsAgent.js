const { ElevenLabsClient } = require('@elevenlabs/elevenlabs-js');
const twilio = require('twilio');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

const elevenLabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

const createConversationalAgent = async (context) => {
  try {
    console.log('🤖 Creating ElevenLabs Conversational AI Agent with enhanced context...');
    
    // Extract all the context information
    const { name, phone, vehicle, tradeIn, timeframe, budget } = context;
    
    // Create an outbound call using the ElevenLabs AI Agent with full context
    const call = await elevenLabs.conversationalAi.twilio.outboundCall({
      agentId: process.env.ELEVENLABS_AGENT_ID,
      agentPhoneNumberId: process.env.ELEVENLABS_PHONE_NUMBER_ID,
      toNumber: `+1${phone}`,
      context: {
        customer_name: name,
        vehicle_interest: vehicle,
        trade_in_info: tradeIn,
        purchase_timeframe: timeframe,
        budget_range: budget,
        dealership: "Capital GMC Buick Cadillac",
        sales_rep: "Troy",
        agent_name: "Lex",
        // Add conversation starters based on the context
        conversation_notes: generateConversationNotes(context)
      }
    });

    console.log('✅ AI Agent call created:', call);
    console.log('📞 Lex is calling with full customer context!');
    console.log('📋 Context provided:', {
      customer: name,
      interested_in: vehicle,
      trade_in: tradeIn,
      timeframe: timeframe,
      budget: budget
    });
    
    return { 
      success: true, 
      callId: call.callId || call.id,
      agentType: 'conversational_ai',
      message: 'AI Agent call initiated with full context'
    };

  } catch (error) {
    console.error('❌ AI Agent call failed:', error);
    return { success: false, error: error.message };
  }
};

// Helper function to generate conversation notes based on lead data
function generateConversationNotes(context) {
  const { name, vehicle, tradeIn, timeframe, budget } = context;
  let notes = `Customer ${name} submitted a lead form. `;
  
  if (vehicle && vehicle !== 'Not specified') {
    notes += `They're interested in a ${vehicle}. `;
  }
  
  if (tradeIn && tradeIn !== 'No trade-in') {
    notes += `They have a ${tradeIn} to trade in. `;
  }
  
  if (timeframe && timeframe !== 'Not specified') {
    const timeframeMap = {
      'immediately': 'They want to purchase immediately',
      'within_week': 'They want to purchase within a week',
      'within_month': 'They want to purchase within a month',
      '2-3_months': 'They are looking to purchase in 2-3 months',
      'just_browsing': 'They are currently just browsing'
    };
    notes += `${timeframeMap[timeframe] || 'Purchase timeframe: ' + timeframe}. `;
  }
  
  if (budget && budget !== 'Not specified') {
    const budgetMap = {
      'under_20k': 'under $20,000',
      '20k-30k': '$20,000 to $30,000',
      '30k-40k': '$30,000 to $40,000',
      '40k-50k': '$40,000 to $50,000',
      '50k-70k': '$50,000 to $70,000',
      'over_70k': 'over $70,000'
    };
    notes += `Their budget is ${budgetMap[budget] || budget}. `;
  }
  
  notes += `Remember to mention the $500 off promotion and ask if they have any questions about financing options.`;
  
  return notes;
}

module.exports = { createConversationalAgent };
