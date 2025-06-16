const express = require('express');
const router = express.Router();
const { notifyTroy } = require('../services/notificationService');

// Debug endpoint to test email notifications
router.get('/test-notification', async (req, res) => {
  try {
    console.log('Testing email notification...');
    console.log('Email config:', {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      user: process.env.EMAIL_USER,
      passExists: !!process.env.EMAIL_PASS
    });
    
    // Send test notification
    await notifyTroy('NEW_LEAD', {
      name: 'Test Customer',
      email: 'test@example.com',
      phone: '306-555-1234',
      vehicle: 'Test Vehicle',
      budget: '$30k-40k',
      timeframe: 'Immediately',
      preferred_contact_method: 'Email, Text',
      actions: ['Test notification sent']
    });
    
    res.json({ 
      success: true, 
      message: 'Test notification sent to drive@capitalcrusader.ca',
      config: {
        host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
        port: process.env.EMAIL_PORT || 465,
        user: process.env.EMAIL_USER || 'drive@capitalcrusader.ca'
      }
    });
  } catch (error) {
    console.error('Test notification error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      details: error.toString()
    });
  }
});

module.exports = router;
