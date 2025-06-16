const express = require('express');
const { notifyTroy } = require('./backend/services/notificationService');
const OpenAI = require('openai');
require('dotenv').config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to generate AI response as Lex (same as webhook)
async function generateLexResponse(customerMessage, customerInfo) {
  try {
    const systemPrompt = `You are Lex, the AI assistant for Capital GMC Buick Cadillac in Regina, Saskatchewan. You work with Troy Nordyke, the sales representative. 

Your personality:
- Friendly, helpful, and professional
- Knowledgeable about GMC, Buick, and Cadillac vehicles
- Focused on helping customers find the right vehicle
- Always mention current promotions ($500 off, 0% financing available)
- Keep responses concise for text messaging (under 160 characters when possible)

Customer context:
- Name: ${customerInfo?.name || 'Customer'}
- Interested in: ${customerInfo?.vehicle_interest || 'vehicles'}
- Phone: ${customerInfo?.phone || 'N/A'}

Guidelines:
- Always sign messages with "- Lex"
- If asked about specific vehicle details, provide helpful info but suggest calling Troy for detailed specs
- For test drives, scheduling, or complex questions, mention Troy will follow up
- Be enthusiastic about helping them save money
- If they seem ready to buy, emphasize the current promotions

Keep responses natural and conversational for text messaging.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: customerMessage }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI error:', error);
    return "Thanks for your message! Troy will get back to you shortly. For immediate help, call 306-331-4802. - Lex";
  }
}

// Simulate webhook conversation
async function simulateConversation() {
  console.log('🤖 AI Conversation Simulation\n');
  console.log('This simulates what happens when customers reply to text messages.\n');
  
  const customerInfo = {
    name: 'Test Customer',
    phone: '3065405100',
    vehicle_interest: '2024 GMC Sierra'
  };
  
  // Test different customer messages
  const testMessages = [
    "YES",
    "What's the price on that Sierra?",
    "Do you have financing options?",
    "What colors are available?",
    "Can I schedule a test drive for Saturday?",
    "Tell me about the warranty",
    "Is there a better deal available?"
  ];
  
  for (const message of testMessages) {
    console.log(`👤 Customer: "${message}"`);
    
    // Generate AI response
    const aiResponse = await generateLexResponse(message, customerInfo);
    console.log(`🤖 Lex: "${aiResponse}"`);
    
    // Notify Troy (simulate)
    console.log(`📧 Troy notified about customer message`);
    
    console.log('─'.repeat(60));
  }
  
  console.log('\n✅ Conversation simulation complete!');
  console.log('\nThis shows how Lex would respond to various customer inquiries.');
  console.log('In production, these responses would be sent as SMS replies.');
}

// Run simulation
simulateConversation().catch(console.error);
