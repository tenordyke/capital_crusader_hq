const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

// Import routes
const webhookRoutes = require('./routes/webhook');
const appointmentRoutes = require('./routes/appointments');
const elevenLabsWebhookRoutes = require('./routes/elevenlabs-webhook');
const twilioWebhookRoutes = require('./routes/twilio-webhook');

// Use routes
app.use('/webhook', webhookRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/webhook/elevenlabs', elevenLabsWebhookRoutes);
app.use('/webhook/twilio', twilioWebhookRoutes);

app.get('/', (req, res) => {
  res.send('Capital Crusader BDC server is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
