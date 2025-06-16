const { sendEmail } = require('./emailService');
const { sendTextMessage } = require('./twilioService');
const { createConversationalAgent } = require('./elevenLabsAgent');
const { notifyTroy } = require('./notificationService');
const supabase = require('../supabaseClient');

// Follow-up schedules (in hours)
const FOLLOWUP_SCHEDULES = {
  IMMEDIATE: 0.5,    // 30 minutes
  SHORT: 24,         // 1 day
  MEDIUM: 72,        // 3 days
  LONG: 168,         // 1 week
  FINAL: 336         // 2 weeks
};

// Schedule a follow-up based on customer interaction
const scheduleFollowup = async (customerId, type, delay = 'SHORT') => {
  try {
    const delayHours = FOLLOWUP_SCHEDULES[delay] || FOLLOWUP_SCHEDULES.SHORT;
    const followupTime = new Date(Date.now() + (delayHours * 60 * 60 * 1000));
    
    // Store follow-up in database (you might want to create a followups table)
    console.log(`📅 Follow-up scheduled for ${customerId} in ${delayHours} hours (${type})`);
    
    // For now, we'll use setTimeout for immediate testing
    // In production, you'd want to use a proper job queue like Bull or Agenda
    if (delayHours <= 1) {
      setTimeout(() => {
        executeFollowup(customerId, type);
      }, delayHours * 60 * 60 * 1000);
    }
    
    return { success: true, scheduledFor: followupTime };
  } catch (error) {
    console.error('Failed to schedule follow-up:', error);
    return { success: false, error: error.message };
  }
};

// Execute a follow-up action
const executeFollowup = async (customerId, type) => {
  try {
    // Get customer data (in a real app, you'd fetch from database)
    // For now, we'll use sample data
    const customerData = {
      name: 'Follow-up Customer',
      phone: '3065551234',
      email: 'followup@example.com',
      vehicle: '2024 GMC Sierra',
      tradeIn: 'No trade-in',
      timeframe: 'within_month',
      budget: '40k-50k'
    };
    
    console.log(`🔄 Executing ${type} follow-up for customer ${customerId}`);
    
    switch (type) {
      case 'NO_ANSWER_CALL':
        // Customer didn't answer the initial call
        await sendTextMessage({
          ...customerData,
          followupMessage: `Hi ${customerData.name}! I tried calling about your ${customerData.vehicle} inquiry. When's a good time to chat? Reply with your preferred time or call us at 306-331-4802. - Troy`
        });
        
        await notifyTroy('CUSTOMER_REPLY', {
          customerName: customerData.name,
          channel: 'Follow-up SMS',
          message: 'Sent follow-up text after missed call'
        });
        break;
        
      case 'NO_EMAIL_RESPONSE':
        // Customer didn't respond to email
        await createConversationalAgent({
          ...customerData,
          context: 'follow_up_call_no_email_response'
        });
        
        await notifyTroy('CALL_COMPLETED', {
          customerName: customerData.name,
          phone: customerData.phone,
          status: 'follow-up initiated',
          summary: 'Follow-up call initiated - customer did not respond to initial email'
        });
        break;
        
      case 'INTERESTED_BUT_NOT_READY':
        // Customer showed interest but wasn't ready to buy
        const followupEmailContent = {
          ...customerData,
          subject: `Still thinking about that ${customerData.vehicle}? Here's what's new!`,
          isFollowup: true
        };
        
        await sendEmail(followupEmailContent);
        
        // Schedule another follow-up in a week
        await scheduleFollowup(customerId, 'FINAL_ATTEMPT', 'LONG');
        break;
        
      case 'FINAL_ATTEMPT':
        // Last attempt to re-engage
        await sendTextMessage({
          ...customerData,
          followupMessage: `Hi ${customerData.name}! Last chance for our $500 OFF promotion on the ${customerData.vehicle}. Expires soon! Call Troy at 306-331-4802 if you're still interested. Thanks! 🚗`
        });
        break;
        
      case 'APPOINTMENT_REMINDER':
        // Remind about upcoming appointment
        await sendTextMessage({
          ...customerData,
          followupMessage: `Hi ${customerData.name}! Reminder: Your test drive appointment is tomorrow. Looking forward to seeing you! Call 306-331-4802 if you need to reschedule. - Troy`
        });
        break;
        
      case 'POST_VISIT_FOLLOWUP':
        // Follow up after dealership visit
        await sendEmail({
          ...customerData,
          subject: `Thanks for visiting Capital GMC Buick Cadillac!`,
          isPostVisit: true
        });
        break;
    }
    
    console.log(`✅ ${type} follow-up completed for customer ${customerId}`);
    return { success: true };
    
  } catch (error) {
    console.error(`Failed to execute ${type} follow-up:`, error);
    return { success: false, error: error.message };
  }
};

// Handle customer responses and trigger appropriate follow-ups
const handleCustomerResponse = async (customerData, responseType, responseContent) => {
  try {
    const { name, phone, email } = customerData;
    
    switch (responseType) {
      case 'SMS_REPLY':
        const message = responseContent.toLowerCase();
        
        if (message.includes('yes') || message.includes('interested') || message.includes('schedule')) {
          // Customer is interested - notify Troy immediately
          await notifyTroy('CUSTOMER_REPLY', {
            customerName: name,
            channel: 'SMS',
            message: `INTERESTED: ${responseContent}`
          });
          
          // Send appointment booking link
          await sendTextMessage({
            ...customerData,
            followupMessage: `Great! Book your test drive here: https://troyatcapital.setmore.com/troy or call Troy directly at 306-331-4802. Looking forward to meeting you! 🚗`
          });
          
        } else if (message.includes('no') || message.includes('not interested')) {
          // Customer not interested - schedule long-term follow-up
          await scheduleFollowup(phone, 'FINAL_ATTEMPT', 'LONG');
          
        } else if (message.includes('later') || message.includes('busy')) {
          // Customer wants to be contacted later
          await scheduleFollowup(phone, 'INTERESTED_BUT_NOT_READY', 'MEDIUM');
        }
        break;
        
      case 'EMAIL_CLICK':
        // Customer clicked email link - they're engaged
        await notifyTroy('CUSTOMER_REPLY', {
          customerName: name,
          channel: 'Email',
          message: `Customer clicked: ${responseContent}`
        });
        
        // Schedule a quick follow-up call
        await scheduleFollowup(phone, 'NO_EMAIL_RESPONSE', 'IMMEDIATE');
        break;
        
      case 'CALL_COMPLETED':
        const callOutcome = responseContent.outcome;
        
        if (callOutcome === 'appointment_scheduled') {
          // Schedule appointment reminder
          await scheduleFollowup(phone, 'APPOINTMENT_REMINDER', 'SHORT');
          
        } else if (callOutcome === 'interested_but_not_ready') {
          // Schedule follow-up for later
          await scheduleFollowup(phone, 'INTERESTED_BUT_NOT_READY', 'MEDIUM');
          
        } else if (callOutcome === 'no_answer') {
          // Schedule text follow-up
          await scheduleFollowup(phone, 'NO_ANSWER_CALL', 'IMMEDIATE');
        }
        break;
    }
    
    return { success: true };
    
  } catch (error) {
    console.error('Failed to handle customer response:', error);
    return { success: false, error: error.message };
  }
};

// Get follow-up statistics
const getFollowupStats = async () => {
  try {
    // In a real app, you'd query your database for follow-up statistics
    const stats = {
      totalFollowups: 0,
      completedFollowups: 0,
      pendingFollowups: 0,
      conversionRate: 0,
      responseRate: 0
    };
    
    return stats;
  } catch (error) {
    console.error('Failed to get follow-up stats:', error);
    return null;
  }
};

module.exports = {
  scheduleFollowup,
  executeFollowup,
  handleCustomerResponse,
  getFollowupStats,
  FOLLOWUP_SCHEDULES
};
