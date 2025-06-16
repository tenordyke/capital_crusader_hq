const express = require('express');
const router = express.Router();
const { notifyTroy } = require('../services/notificationService');

// Route: POST /webhook/elevenlabs/call-status
router.post('/call-status', async (req, res) => {
  try {
    console.log('📞 ElevenLabs webhook received:', req.body);
    
    const { 
      call_id,
      status,
      duration,
      transcript,
      summary,
      customer_name,
      customer_phone,
      metadata
    } = req.body;
    
    // Send notification to Troy based on call status
    if (status === 'completed' || status === 'ended') {
      await notifyTroy('CALL_COMPLETED', {
        customerName: customer_name || metadata?.customer_name || 'Unknown',
        phone: customer_phone || metadata?.phone || 'Unknown',
        duration: duration ? `${Math.round(duration / 60)} minutes` : 'N/A',
        status: status,
        transcript: transcript || 'Transcript not available',
        summary: summary || 'No summary available'
      });
    }
    
    res.status(200).json({ received: true });
    
  } catch (error) {
    console.error('ElevenLabs webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Route: POST /webhook/elevenlabs/conversation-update
router.post('/conversation-update', async (req, res) => {
  try {
    console.log('💬 ElevenLabs conversation update:', req.body);
    
    // This webhook fires during the conversation for real-time updates
    // You could use this to monitor ongoing calls
    
    res.status(200).json({ received: true });
    
  } catch (error) {
    console.error('Conversation update error:', error);
    res.status(500).json({ error: 'Update processing failed' });
  }
});

module.exports = router;
