const express = require('express');
require('dotenv').config();

const app = express();

// Enable CORS for your frontend
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://capital-crusader-hq.vercel.app',
    'https://capitalcrusader.ca',
    'https://www.capitalcrusader.ca'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const webhookRoutes = require('./routes/webhook');
const appointmentRoutes = require('./routes/appointments');
const elevenLabsWebhookRoutes = require('./routes/elevenlabs-webhook');
const twilioWebhookRoutes = require('./routes/twilio-webhook');
const debugRoutes = require('./routes/debug-email');

// Use routes
app.use('/webhook', webhookRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/webhook/elevenlabs', elevenLabsWebhookRoutes);
app.use('/webhook/twilio', twilioWebhookRoutes);
app.use('/debug', debugRoutes);

app.get('/', (req, res) => {
  res.send('Capital Crusader BDC server is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
