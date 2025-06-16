const express = require('express');
const router = express.Router();
const { notifyTroy } = require('../services/notificationService');
const supabase = require('../supabaseClient');
const OpenAI = require('openai');
require('dotenv').config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to generate AI response as Lex with appointment booking capability
async function generateLexResponse(customerMessage, customerInfo) {
  try {
    // Check if customer is trying to book a specific time
    const timePattern = /(tomorrow|today|monday|tuesday|wednesday|thursday|friday|saturday|sunday).*(10|11|12|1|2|3|4|5|6|7|8|9)(\s*am|\s*pm|:00|:30)?/i;
    const isBookingRequest = customerMessage.toLowerCase().includes('tomorrow at') || 
                           customerMessage.toLowerCase().includes('book') ||
                           customerMessage.toLowerCase().includes('schedule') ||
                           timePattern.test(customerMessage.toLowerCase());

    if (isBookingRequest) {
      // Extract time information and book appointment
      const appointmentResult = await handleAppointmentBooking(customerMessage, customerInfo);
      if (appointmentResult.success) {
        return appointmentResult.message;
      }
    }

    const systemPrompt = `You are Lex, the AI assistant for Capital GMC Buick Cadillac in Regina, Saskatchewan. You work with Troy Nordyke, the sales representative. 

Your personality:
- Friendly, helpful, and professional
- Knowledgeable about GMC, Buick, and Cadillac vehicles
- Focused on helping customers find the right vehicle
- Always mention current promotions ($500 off, 0% financing available)
- Keep responses concise for text messaging (under 160 characters when possible)
- Can help schedule test drive appointments

Customer context:
- Name: ${customerInfo?.name || 'Customer'}
- Interested in: ${customerInfo?.vehicle_interest || 'vehicles'}
- Phone: ${customerInfo?.phone || 'N/A'}

Appointment Booking Guidelines:
- If customer says "YES" or wants to schedule a test drive, offer specific time slots
- Suggest available times: "Tomorrow at 10am, 2pm, or 4pm" or "This weekend - Saturday 11am or Sunday 1pm"
- When customer chooses a specific time, tell them you'll book it and Troy will confirm

Guidelines:
- Always sign messages with "- Lex"
- If asked about specific vehicle details, provide helpful info but suggest calling Troy for detailed specs
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
    // Fallback response if AI fails
    return "Thanks for your message! Troy will get back to you shortly. For immediate help, call 306-331-4802. - Lex";
  }
}

// Function to handle appointment booking
async function handleAppointmentBooking(customerMessage, customerInfo) {
  try {
    console.log('📅 Processing appointment booking request...');
    
    // Parse the appointment time from the message
    let appointmentTime = parseAppointmentTime(customerMessage);
    
    if (!appointmentTime) {
      return {
        success: false,
        message: "I'd love to schedule that for you! What time works best? Tomorrow at 10am, 2pm, or 4pm? - Lex"
      };
    }

    // Use custom booking system
    const { createCustomAppointment } = require('../services/customBookingService');
    
    const appointmentResult = await createCustomAppointment({
      customerName: customerInfo?.name || 'Customer',
      customerPhone: customerInfo?.phone || 'Unknown',
      customerEmail: customerInfo?.email || 'noemail@provided.com',
      appointmentTime: appointmentTime,
      vehicleInterest: customerInfo?.vehicle_interest || 'Vehicle inquiry',
      notes: `Scheduled via AI Assistant. Customer message: "${customerMessage}"`
    });
    
    if (appointmentResult.success) {
      console.log('✅ Custom appointment created:', appointmentResult.appointmentId);
      
      return {
        success: true,
        message: `Perfect! I've scheduled your test drive for ${formatAppointmentTime(appointmentTime)}. You'll receive a calendar invite shortly. Troy will call to confirm details. See you soon! - Lex`
      };
    } else {
      console.log('❌ Custom appointment failed:', appointmentResult.error);
      
      return {
        success: false,
        message: "I'd love to schedule that for you! Please call Troy at 306-331-4802 to confirm your preferred time. - Lex"
      };
    }

  } catch (error) {
    console.error('❌ Appointment booking error:', error);
    return {
      success: false,
      message: "I'd love to schedule that for you! Please call Troy at 306-331-4802 to confirm your preferred time. - Lex"
    };
  }
}

// Function to parse appointment time from customer message
function parseAppointmentTime(message) {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  
  const msg = message.toLowerCase();
  
  // Parse specific times
  if (msg.includes('tomorrow at 10') || msg.includes('10am') || msg.includes('10 am')) {
    tomorrow.setHours(10, 0, 0, 0);
    return tomorrow.toISOString();
  }
  if (msg.includes('tomorrow at 11') || msg.includes('11am') || msg.includes('11 am')) {
    tomorrow.setHours(11, 0, 0, 0);
    return tomorrow.toISOString();
  }
  if (msg.includes('tomorrow at 12') || msg.includes('12pm') || msg.includes('12 pm') || msg.includes('noon')) {
    tomorrow.setHours(12, 0, 0, 0);
    return tomorrow.toISOString();
  }
  if (msg.includes('tomorrow at 1') || msg.includes('1pm') || msg.includes('1 pm')) {
    tomorrow.setHours(13, 0, 0, 0);
    return tomorrow.toISOString();
  }
  if (msg.includes('tomorrow at 2') || msg.includes('2pm') || msg.includes('2 pm')) {
    tomorrow.setHours(14, 0, 0, 0);
    return tomorrow.toISOString();
  }
  if (msg.includes('tomorrow at 3') || msg.includes('3pm') || msg.includes('3 pm')) {
    tomorrow.setHours(15, 0, 0, 0);
    return tomorrow.toISOString();
  }
  if (msg.includes('tomorrow at 4') || msg.includes('4pm') || msg.includes('4 pm')) {
    tomorrow.setHours(16, 0, 0, 0);
    return tomorrow.toISOString();
  }
  if (msg.includes('tomorrow at 5') || msg.includes('5pm') || msg.includes('5 pm')) {
    tomorrow.setHours(17, 0, 0, 0);
    return tomorrow.toISOString();
  }
  
  // Default to tomorrow at 10am if time mentioned but not specific
  if (msg.includes('tomorrow')) {
    tomorrow.setHours(10, 0, 0, 0);
    return tomorrow.toISOString();
  }
  
  return null;
}

// Function to format appointment time for display
function formatAppointmentTime(isoString) {
  const date = new Date(isoString);
  const options = { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  };
  return date.toLocaleDateString('en-US', options);
}

// Function to schedule appointment using Setmore
async function scheduleAppointment(appointmentData, customerInfo) {
  try {
    const { createSetmoreAppointment } = require('../services/setmoreService');
    
    const result = await createSetmoreAppointment({
      customerName: appointmentData.customer_name || customerInfo?.name,
      customerPhone: appointmentData.customer_phone || customerInfo?.phone,
      customerEmail: appointmentData.customer_email || customerInfo?.email || 'noemail@provided.com',
      appointmentTime: appointmentData.appointment_time,
      serviceType: 'Test Drive',
      notes: `Vehicle interest: ${appointmentData.vehicle_interest || customerInfo?.vehicle_interest}. Scheduled via AI assistant.`
    });

    if (result.success) {
      // Notify Troy about the scheduled appointment
      await notifyTroy('APPOINTMENT_BOOKED', {
        customerName: appointmentData.customer_name || customerInfo?.name,
        phone: appointmentData.customer_phone || customerInfo?.phone,
        appointmentTime: appointmentData.appointment_time,
        vehicle: appointmentData.vehicle_interest || customerInfo?.vehicle_interest,
        appointmentId: result.appointmentId
      });
    }

    return result;
  } catch (error) {
    console.error('Appointment scheduling error:', error);
    return { success: false, error: error.message };
  }
}

// Route: POST /webhook/twilio/sms
router.post('/sms', async (req, res) => {
  try {
    console.log('💬 Twilio SMS webhook received:', req.body);
    
    const { 
      From: fromNumber,
      To: toNumber,
      Body: messageBody,
      MessageSid: messageSid
    } = req.body;
    
    // Clean up phone number (remove +1)
    const cleanPhone = fromNumber.replace('+1', '');
    
    // Try to find the customer in the database
    const { data: customer } = await supabase
      .from('leads')
      .select('name, email, vehicle_interest')
      .eq('phone', cleanPhone)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    // Notify Troy about the customer reply
    await notifyTroy('CUSTOMER_REPLY', {
      customerName: customer?.name || 'Unknown Customer',
      phone: cleanPhone,
      channel: 'SMS',
      message: messageBody
    });
    
    // Generate AI-powered response from Lex
    console.log('🤖 Generating AI response from Lex...');
    const aiResponse = await generateLexResponse(messageBody, customer);
    console.log('💬 Lex response:', aiResponse);
    
    // Send AI-generated response
    const twiml = `
      <Response>
        <Message>${aiResponse}</Message>
      </Response>
    `;
    
    res.type('text/xml');
    res.send(twiml);
    
  } catch (error) {
    console.error('Twilio webhook error:', error);
    res.status(500).send('Error processing webhook');
  }
});

// Route: POST /webhook/twilio/voice-status
router.post('/voice-status', async (req, res) => {
  try {
    console.log('📞 Twilio voice status webhook:', req.body);
    
    const {
      CallSid: callSid,
      CallStatus: callStatus,
      CallDuration: duration,
      To: toNumber,
      From: fromNumber
    } = req.body;
    
    // Log call completion status
    if (callStatus === 'completed') {
      console.log(`✅ Call completed: ${callSid}, Duration: ${duration}s`);
    }
    
    res.status(200).send('OK');
    
  } catch (error) {
    console.error('Voice status webhook error:', error);
    res.status(500).send('Error processing webhook');
  }
});

module.exports = router;
