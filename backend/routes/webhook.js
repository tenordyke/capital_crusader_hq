const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');
const { callLeadWithAva, sendTextMessage } = require('../services/twilioService');
const { createConversationalAgent } = require('../services/elevenLabsAgent');
const { sendEmail } = require('../services/emailService');
const { notifyTroy } = require('../services/notificationService');

// Route: POST /webhook/lead
router.post('/lead', async (req, res) => {
  const { 
    name, 
    phone, 
    email, 
    vehicle_interest,
    trade_in,
    trade_in_year,
    trade_in_mileage,
    purchase_timeframe,
    budget,
    preferred_contact_method,
    source 
  } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Note: Supabase insert is already handled in the frontend
    // This webhook is just for triggering the AI call
    
    console.log('✅ Lead webhook received:', {
      name,
      phone,
      email,
      vehicle_interest,
      trade_in,
      purchase_timeframe,
      budget
    });
    
    res.status(200).json({ message: 'Lead received and processing' });

    // Prepare context for all communication methods
    const context = {
      name,
      phone,
      email,
      vehicle: vehicle_interest || 'Not specified',
      tradeIn: trade_in ? `${trade_in} (${trade_in_year}, ${trade_in_mileage})` : 'No trade-in',
      timeframe: purchase_timeframe || 'Not specified',
      budget: budget || 'Not specified'
    };

    // Track actions taken
    const actionsTaken = [];
    
    // Handle different contact preferences
    if (preferred_contact_method) {
      const methods = preferred_contact_method.split(', ');
      
      // Phone Call
      if (phone && methods.includes('Call')) {
        console.log('📞 Initiating AI call to:', name);
        const callResult = await createConversationalAgent(context);
        if (callResult.success) {
          actionsTaken.push('AI phone call initiated');
        }
      }
      
      // Text Message
      if (phone && methods.includes('Text')) {
        console.log('💬 Sending text message to:', name);
        const textResult = await sendTextMessage(context);
        if (textResult.success) {
          actionsTaken.push('Text message sent');
          
          // Notify Troy about the text
          await notifyTroy('TEXT_SENT', {
            customerName: name,
            phone: phone,
            message: textResult.message || 'Standard follow-up message'
          });
        }
      }
      
      // Email
      if (email && methods.includes('Email')) {
        console.log('📧 Sending email to:', name);
        const emailResult = await sendEmail(context);
        if (emailResult.success) {
          actionsTaken.push('Email sent with Car Buyer\'s Guide');
          
          // Notify Troy about the email
          await notifyTroy('EMAIL_SENT', {
            customerName: name,
            email: email,
            subject: `Welcome to Capital GMC Buick Cadillac, ${name}! 🚗`
          });
        }
      }
    }
    
    // Send new lead notification to Troy with all details
    await notifyTroy('NEW_LEAD', {
      name,
      email,
      phone,
      vehicle: vehicle_interest,
      tradeIn: trade_in ? `${trade_in} (${trade_in_year}, ${trade_in_mileage})` : 'None',
      budget,
      timeframe: purchase_timeframe,
      preferred_contact_method,
      actions: actionsTaken
    });

  } catch (err) {
    console.error('Webhook error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
