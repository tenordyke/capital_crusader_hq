# Capital Crusader - Hostinger Deployment Guide

## 📦 What's Included

### Frontend Package: `capital-crusader-frontend.zip`
This contains your optimized website files ready for Hostinger.

## 🚀 Deployment Steps

### 1. Upload Frontend to Hostinger

1. **Login to Hostinger Control Panel**
2. **Go to File Manager**
3. **Navigate to `public_html`** (or your domain folder)
4. **Delete existing files** (backup first if needed)
5. **Upload and Extract**:
   - Upload `capital-crusader-frontend.zip`
   - Extract all files directly into `public_html`
   - Make sure `.htaccess` file is present (it's included)

### 2. Backend Deployment Options

Since Hostinger shared hosting has limited Node.js support, you have these options:

#### Option A: Deploy Backend to Free Services
- **Render.com** (Recommended - Free tier available)
- **Railway.app**
- **Vercel** (for serverless)
- **Netlify Functions**

#### Option B: Upgrade to Hostinger VPS
If you have VPS hosting, deploy the backend there.

### 3. Update Configuration

Before uploading, update these files:

#### In Frontend (if backend is on different domain):
Edit `frontend/src/lib/webhookService.js`:
```javascript
const WEBHOOK_URL = 'https://your-backend-url.com/webhook/lead';
```

### 4. Environment Variables for Backend

Create `.env` file with:
```
# Twilio
TWILIO_SID=your_twilio_sid
TWILIO_AUTH=your_twilio_auth
TWILIO_NUMBER=your_twilio_number

# ElevenLabs
ELEVENLABS_API_KEY=your_elevenlabs_api_key
ELEVENLABS_VOICE_ID=your_elevenlabs_voice_id
ELEVENLABS_AGENT_ID=your_elevenlabs_agent_id
ELEVENLABS_PHONE_NUMBER_ID=your_elevenlabs_phone_number_id

# Email (Already configured)
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=465
EMAIL_USER=drive@capitalcrusader.ca
EMAIL_PASS=$5438576TroyAlix$
EMAIL_FROM=Troy Nordyke <drive@capitalcrusader.ca>

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Configure Webhooks

In your external services, set these webhook URLs:
- **ElevenLabs**: `https://your-backend-url.com/webhook/elevenlabs/call-status`
- **Twilio SMS**: `https://your-backend-url.com/webhook/twilio/sms`

## 📱 Testing After Deployment

1. Visit your website
2. Submit a test lead form
3. Check if lead appears in Supabase
4. Verify webhook triggers (check backend logs)
5. Confirm AI calls/texts/emails are sent

## 🆘 Troubleshooting

- **404 Errors**: Make sure `.htaccess` is present
- **Forms not working**: Check webhook URL is correct
- **No AI follow-up**: Verify backend is running and environment variables are set

## 🎯 Quick Backend Deploy to Render.com

1. Create account at render.com
2. New > Web Service
3. Connect your GitHub repo (or upload backend folder)
4. Set environment variables
5. Deploy!

Your backend URL will be: `https://your-app.onrender.com`

---

**Need help?** The frontend is ready to go! Just upload the zip contents to Hostinger's public_html folder.
