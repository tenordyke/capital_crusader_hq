const express = require('express');
const router = express.Router();
const { createGoogleCalendarEvent, getUpcomingAppointments } = require('../services/googleCalendarService');

// Route: POST /appointments/schedule
router.post('/schedule', async (req, res) => {
  const { customerName, customerPhone, customerEmail, appointmentTime, vehicleInterest, notes } = req.body;

  if (!customerName || !customerPhone || !customerEmail || !appointmentTime) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    console.log('📅 Scheduling appointment via API...');
    
    const result = await createGoogleCalendarEvent({
      customerName,
      customerPhone,
      customerEmail,
      appointmentTime,
      vehicleInterest,
      notes
    });

    if (result.success) {
      res.status(200).json({
        message: 'Appointment scheduled successfully',
        appointment: result
      });
    } else {
      res.status(500).json({
        error: 'Failed to schedule appointment',
        details: result.error
      });
    }

  } catch (err) {
    console.error('Appointment scheduling error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route: GET /appointments/upcoming
router.get('/upcoming', async (req, res) => {
  try {
    const daysAhead = parseInt(req.query.days) || 7;
    const result = await getUpcomingAppointments(daysAhead);

    if (result.success) {
      res.status(200).json({
        message: 'Upcoming appointments retrieved',
        appointments: result.appointments
      });
    } else {
      res.status(500).json({
        error: 'Failed to retrieve appointments',
        details: result.error
      });
    }

  } catch (err) {
    console.error('Error retrieving appointments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route: POST /appointments/ai-scheduled
// This endpoint will be called when the AI Agent schedules an appointment
router.post('/ai-scheduled', async (req, res) => {
  const { leadData, appointmentDetails, conversationId } = req.body;

  try {
    console.log('🤖 AI Agent scheduled appointment:', appointmentDetails);
    
    // Extract appointment time from AI Agent response
    // This would typically come from parsing the conversation or AI Agent webhook
    const appointmentTime = appointmentDetails.scheduledTime || appointmentDetails.time;
    
    if (appointmentTime) {
      const result = await createGoogleCalendarEvent({
        customerName: leadData.name,
        customerPhone: leadData.phone,
        customerEmail: leadData.email,
        appointmentTime: appointmentTime,
        vehicleInterest: leadData.vehicle_interest,
        notes: `Automatically scheduled by AI Agent. Conversation ID: ${conversationId}`
      });

      if (result.success) {
        console.log('✅ AI-scheduled appointment added to Google Calendar');
        res.status(200).json({
          message: 'AI-scheduled appointment processed',
          calendarEvent: result
        });
      } else {
        console.error('❌ Failed to add AI-scheduled appointment to calendar');
        res.status(500).json({ error: 'Failed to create calendar event' });
      }
    } else {
      res.status(400).json({ error: 'No appointment time provided' });
    }

  } catch (err) {
    console.error('AI appointment processing error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
