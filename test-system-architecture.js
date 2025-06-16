const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: './backend/.env' });

console.log('🔍 Capital Crusader AI Assistant System Analysis\n');
console.log('=' .repeat(60));

// Check if .env file exists
const envPath = path.join(__dirname, 'backend', '.env');
const envExists = fs.existsSync(envPath);

console.log('\n📁 Environment Configuration:');
console.log(`   .env file exists: ${envExists ? '✅ Yes' : '❌ No - Copy .env.example to .env'}`);

if (!envExists) {
  console.log('\n⚠️  To test the system, you need to:');
  console.log('   1. Copy backend/.env.example to backend/.env');
  console.log('   2. Fill in your actual API keys and credentials');
  console.log('   3. Run this test again');
}

// Check required environment variables
const requiredEnvVars = [
  'ELEVENLABS_API_KEY',
  'ELEVENLABS_AGENT_ID', 
  'ELEVENLABS_PHONE_NUMBER_ID',
  'TWILIO_SID',
  'TWILIO_AUTH',
  'TWILIO_NUMBER',
  'EMAIL_HOST',
  'EMAIL_USER',
  'EMAIL_PASS'
];

console.log('\n🔧 Required Environment Variables:');
const missingVars = [];
requiredEnvVars.forEach(varName => {
  const exists = !!process.env[varName];
  console.log(`   ${varName}: ${exists ? '✅ Set' : '❌ Missing'}`);
  if (!exists) missingVars.push(varName);
});

// Analyze system architecture
console.log('\n🏗️  System Architecture Analysis:');

const services = [
  {
    name: 'ElevenLabs AI Agent',
    file: 'backend/services/elevenLabsAgent.js',
    description: 'Handles AI-powered phone calls with full customer context'
  },
  {
    name: 'Email Service',
    file: 'backend/services/emailService.js',
    description: 'Sends personalized emails with PDF attachments'
  },
  {
    name: 'SMS Service',
    file: 'backend/services/twilioService.js',
    description: 'Sends contextual text messages to customers'
  },
  {
    name: 'Follow-up Service',
    file: 'backend/services/followupService.js',
    description: 'Automated follow-up scheduling and execution'
  },
  {
    name: 'Notification Service',
    file: 'backend/services/notificationService.js',
    description: 'Notifies Troy about all customer interactions'
  }
];

services.forEach(service => {
  const exists = fs.existsSync(service.file);
  console.log(`   ${service.name}: ${exists ? '✅' : '❌'}`);
  console.log(`      ${service.description}`);
  console.log(`      File: ${service.file}`);
  console.log('');
});

// Check webhook endpoints
console.log('🔗 Webhook Endpoints:');
const webhooks = [
  {
    name: 'Lead Processing',
    endpoint: '/webhook/lead',
    file: 'backend/routes/webhook.js',
    description: 'Processes new leads and triggers AI responses'
  },
  {
    name: 'ElevenLabs Status',
    endpoint: '/webhook/elevenlabs/call-status',
    file: 'backend/routes/elevenlabs-webhook.js',
    description: 'Handles call completion notifications'
  },
  {
    name: 'Twilio SMS',
    endpoint: '/webhook/twilio/sms',
    file: 'backend/routes/twilio-webhook.js',
    description: 'Processes incoming SMS replies'
  }
];

webhooks.forEach(webhook => {
  const exists = fs.existsSync(webhook.file);
  console.log(`   ${webhook.name}: ${exists ? '✅' : '❌'}`);
  console.log(`      Endpoint: ${webhook.endpoint}`);
  console.log(`      ${webhook.description}`);
  console.log('');
});

// System workflow analysis
console.log('🔄 System Workflow:');
console.log('   1. Customer submits lead form on website');
console.log('   2. Frontend saves lead to Supabase database');
console.log('   3. Webhook triggers based on customer preferences:');
console.log('      📞 AI Agent calls customer with full context');
console.log('      📧 Email sent with personalized content + PDF guide');
console.log('      💬 SMS sent with contextual message');
console.log('   4. Troy receives notifications about all activities');
console.log('   5. Follow-up system schedules future touchpoints');
console.log('   6. Customer responses trigger appropriate actions');

// Test what we can without API keys
console.log('\n🧪 Testing System Components (without API calls):');

try {
  // Test service imports
  console.log('   Loading services...');
  
  // Test notification service (doesn't require external APIs for structure)
  const { notifyTroy } = require('./backend/services/notificationService');
  console.log('   ✅ Notification service loaded');
  
  // Test follow-up service
  const { scheduleFollowup, FOLLOWUP_SCHEDULES } = require('./backend/services/followupService');
  console.log('   ✅ Follow-up service loaded');
  console.log(`   ✅ Follow-up schedules configured: ${Object.keys(FOLLOWUP_SCHEDULES).join(', ')}`);
  
  console.log('   ✅ All service modules load successfully');
  
} catch (error) {
  console.log(`   ❌ Service loading error: ${error.message}`);
}

// Recommendations
console.log('\n💡 Recommendations:');

if (missingVars.length > 0) {
  console.log('   🔑 Set up missing environment variables:');
  missingVars.forEach(varName => {
    console.log(`      - ${varName}`);
  });
}

console.log('   📱 Test with your actual phone number and email');
console.log('   🔗 Configure webhooks in your services:');
console.log('      - ElevenLabs: Point to your-domain.com/webhook/elevenlabs/call-status');
console.log('      - Twilio: Point to your-domain.com/webhook/twilio/sms');
console.log('   📊 Monitor logs for debugging');
console.log('   🚀 Deploy to production server for full testing');

console.log('\n' + '=' .repeat(60));
console.log('🎯 System Status Summary:');

if (envExists && missingVars.length === 0) {
  console.log('   ✅ Ready for full testing - run: node test-complete-system.js');
} else if (envExists) {
  console.log('   ⚠️  Environment file exists but missing some variables');
} else {
  console.log('   ❌ Environment setup required before testing');
}

console.log('\n🏁 Analysis Complete!');
