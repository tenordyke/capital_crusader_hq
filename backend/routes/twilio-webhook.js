const express = require('express');
const router = express.Router();
const { notifyTroy } = require('../services/notificationService');
const supabase = require('../supabaseClient');

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
    
    // Check if customer replied "YES" for test drive
    if (messageBody.toUpperCase().includes('YES')) {
      // Could trigger appointment booking flow here
      console.log('🗓️ Customer wants to book test drive!');
      
      // Send auto-response
      const twiml = `
        <Response>
          <Message>
            Great! Troy will call you within the hour to schedule your test drive. 
            You can also book directly at: https://troyatcapital.setmore.com/troy
            - Capital GMC
          </Message>
        </Response>
      `;
      
      res.type('text/xml');
      res.send(twiml);
    } else {
      // Send acknowledgment
      const twiml = `
        <Response>
          <Message>
            Thanks for your message! Troy will respond shortly. 
            For immediate assistance, call 306-331-4802.
            - Capital GMC
          </Message>
        </Response>
      `;
      
      res.type('text/xml');
      res.send(twiml);
    }
    
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
