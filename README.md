w# Capital Crusader - Auto Sales Lead Generation System

A superhero-themed automotive sales website with AI-powered lead follow-up system for Capital GMC Buick Cadillac in Regina, SK.

## 🚀 Features

- **AI-Powered Follow-up**: Automatic phone calls, texts, and emails to leads
- **Multi-Channel Contact**: ElevenLabs AI voice calls, Twilio SMS, and email with PDF guides
- **Lead Management**: All leads stored in Supabase with full tracking
- **Real-time Notifications**: Instant alerts when customers engage
- **Mobile Responsive**: Optimized for all devices
- **Superhero Theme**: Unique branding with Troy as the Capital Crusader

## 🛠️ Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- Framer Motion animations
- Supabase client

### Backend
- Node.js + Express
- ElevenLabs AI for voice calls
- Twilio for SMS
- Nodemailer for emails
- Supabase for database

## 📦 Installation

### Prerequisites
- Node.js 16+
- npm or yarn
- Supabase account
- Twilio account
- ElevenLabs account

### Setup

1. Clone the repository:
```bash
git clone [your-repo-url]
cd capital-crusader-bdc
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Configure environment variables:
```bash
# Copy the example env file
cp backend/.env.example backend/.env
# Edit with your credentials
```

4. Run development servers:
```bash
# Backend
cd backend
npm start

# Frontend (new terminal)
cd frontend
npm run dev
```

## 🚀 Deployment

### Frontend (Hostinger)
1. Build the frontend: `cd frontend && npm run build`
2. Upload `dist` contents to `public_html`
3. Ensure `.htaccess` is included

### Backend (Render/Railway/Heroku)
1. Push to GitHub
2. Connect to your hosting service
3. Set environment variables
4. Deploy

## 📱 Features Overview

### Lead Capture Forms
- Main lead form with vehicle preferences
- VIP access form
- Exit intent popup
- Contact form

### AI Follow-up System
- Automatic phone calls based on preferences
- Personalized SMS messages
- Professional emails with Car Buyer's Guide PDF
- Real-time notifications to sales team

### Customer Journey
1. Visitor fills out form
2. Lead saved to database
3. AI system initiates contact
4. Sales team receives notifications
5. Customer gets immediate, personalized follow-up

## 🔧 Configuration

### Webhook URLs
Configure these in your external services:
- ElevenLabs: `https://your-backend.com/webhook/elevenlabs/call-status`
- Twilio: `https://your-backend.com/webhook/twilio/sms`

## 📄 License

Private project for Capital GMC Buick Cadillac

## 👨‍💻 Developer

Built with ❤️ for Troy Nordyke, the Capital Crusader
