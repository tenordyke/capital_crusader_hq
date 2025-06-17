const { createConversationalAgent } = require('./backend/services/elevenLabsAgent');
const { sendEmail } = require('./backend/services/emailService');
const { sendTextMessage } = require('./backend/services/twilioService');
const { notifyTroy } = require('./backend/services/notificationService');
const supabase = require('./backend/supabaseClient');

// Manual lead submission script
async function sendLead(leadData) {
  const {
    name,
    phone,
    email,
    vehicle_interest = 'Not specified',
    trade_in = 'No trade-in',
    trade_in_year = '',
    trade_in_mileage = '',
    purchase_timeframe = 'Not specified',
    budget = 'Not specified',
    preferred_contact_method = 'Call, Text, Email',
    source = 'Manual Entry'
  } = leadData;

  if (!name || !email) {
    console.error('❌ Missing required fields: name and email are required');
    return;
  }

  try {
    console.log('🚀 Processing new lead:', name);

    // Save to Supabase database
    const { data, error } = await supabase
      .from('leads')
      .insert([{
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
        source,
        created_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Database error:', error);
    } else {
      console.log('✅ Lead saved to database');
    }

    // Prepare context for all communication methods
    const context = {
      name,
      phone,
      email,
      vehicle: vehicle_interest,
      tradeIn: trade_in_year ? `${trade_in} (${trade_in_year}, ${trade_in_mileage})` : trade_in,
      timeframe: purchase_timeframe,
      budget: budget
    };

    // Track actions taken
    const actionsTaken = [];
    
    // Handle different contact preferences
    const methods = preferred_contact_method.split(', ');
    
    // Phone Call
    if (phone && methods.includes('Call')) {
      console.log('📞 Initiating AI call to:', name);
      const callResult = await createConversationalAgent(context);
      if (callResult.success) {
        actionsTaken.push('AI phone call initiated by Lex');
        console.log('✅ AI call initiated successfully');
      } else {
        console.log('❌ AI call failed:', callResult.error);
      }
    }
    
    // Text Message
    if (phone && methods.includes('Text')) {
      console.log('💬 Sending text message to:', name);
      const textResult = await sendTextMessage(context);
      if (textResult.success) {
        actionsTaken.push('Text message sent with $500 OFF promotion');
        console.log('✅ Text message sent successfully');
        
        // Notify Troy about the text
        await notifyTroy('TEXT_SENT', {
          customerName: name,
          phone: phone,
          message: textResult.message
        });
      } else {
        console.log('❌ Text message failed:', textResult.error);
      }
    }
    
    // Email
    if (email && methods.includes('Email')) {
      console.log('📧 Sending email to:', name);
      const emailResult = await sendEmail(context);
      if (emailResult.success) {
        actionsTaken.push('Welcome email sent with Car Buyer\'s Guide PDF');
        console.log('✅ Email sent successfully');
        
        // Notify Troy about the email
        await notifyTroy('EMAIL_SENT', {
          customerName: name,
          email: email,
          subject: `Welcome to Capital GMC Buick Cadillac, ${name}! 🚗`
        });
      } else {
        console.log('❌ Email failed:', emailResult.error);
      }
    }
    
    // Send new lead notification to Troy with all details
    await notifyTroy('NEW_LEAD', {
      name,
      email,
      phone,
      vehicle: vehicle_interest,
      tradeIn: trade_in_year ? `${trade_in} (${trade_in_year}, ${trade_in_mileage})` : trade_in,
      budget,
      timeframe: purchase_timeframe,
      preferred_contact_method,
      actions: actionsTaken
    });

    console.log('🎉 Lead processing complete!');
    console.log('📧 Check your Gmail for notifications');

  } catch (error) {
    console.error('❌ Error processing lead:', error);
  }
}

// Example usage - you can modify this data
const exampleLead = {
  name: 'John Smith',
  phone: '3065551234',
  email: 'john.smith@example.com',
  vehicle_interest: '2024 GMC Sierra',
  trade_in: '2019 Ford F-150',
  trade_in_year: '2019',
  trade_in_mileage: '85,000 km',
  purchase_timeframe: 'within_week',
  budget: '40k-50k',
  preferred_contact_method: 'Call, Text, Email',
  source: 'Manual Entry'
};

// Check if this script is being run directly
if (require.main === module) {
  // Get lead data from command line arguments or use example
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('📝 No lead data provided, using example lead...');
    console.log('💡 To send a custom lead, edit the exampleLead object in this file');
    sendLead(exampleLead);
  } else {
    console.log('💡 For custom leads, edit the exampleLead object in this file and run: node send-lead.js');
    sendLead(exampleLead);
  }
}

module.exports = { sendLead };
