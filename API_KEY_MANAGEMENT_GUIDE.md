# API Key Management Guide for Capital Crusader Projects

## 🔐 Secure Storage Location

Your API keys are now stored in **two locations** for maximum accessibility:

### Primary Location:
- **File**: `.env` (root directory)
- **Path**: `/home/user/capital_crusader_hq/.env`
- **Purpose**: Main configuration file for all projects

### Backend Location:
- **File**: `backend/.env` 
- **Path**: `/home/user/capital_crusader_hq/backend/.env`
- **Purpose**: Specific to backend services

## 📋 Current API Keys Setup

### ✅ Immediate Needs (Fill these first):
```env
# ElevenLabs (for AI phone calls)
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
ELEVENLABS_AGENT_ID=your_elevenlabs_agent_id_here
ELEVENLABS_PHONE_NUMBER_ID=your_elevenlabs_phone_number_id_here

# Twilio (for SMS)
TWILIO_SID=your_twilio_account_sid_here
TWILIO_AUTH=your_twilio_auth_token_here
TWILIO_NUMBER=your_twilio_phone_number_here

# Email (your Hostinger email password)
EMAIL_PASS=your_email_password_here

# Supabase (your database)
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 🚀 Future Project Keys (Pre-configured):
- **OpenAI** - For advanced AI features
- **Google APIs** - Calendar, Maps, Analytics
- **Stripe** - Payment processing
- **Facebook/Meta** - Social media integration
- **SendGrid** - Alternative email service
- **Zapier** - Automation workflows

## 🛡️ Security Best Practices

### DO:
- ✅ Keep `.env` files in `.gitignore` (already configured)
- ✅ Use different keys for development vs production
- ✅ Rotate keys regularly (every 3-6 months)
- ✅ Use environment-specific keys when possible
- ✅ Back up your `.env` file securely

### DON'T:
- ❌ Never commit `.env` files to version control
- ❌ Don't share keys in chat/email
- ❌ Don't use production keys for testing
- ❌ Don't store keys in code comments
- ❌ Don't use the same key across multiple projects

## 📁 File Structure for Future Projects

For any new project, copy this structure:

```
your-new-project/
├── .env                 # Main environment file
├── .env.example         # Template (safe to commit)
├── .gitignore          # Must include .env
├── backend/
│   └── .env            # Backend-specific copy
└── frontend/
    └── .env.local      # Frontend environment (if needed)
```

## 🔄 How to Use for Future Projects

### Step 1: Copy Template
```bash
cp /home/user/capital_crusader_hq/.env /path/to/new-project/.env
```

### Step 2: Update Project-Specific Values
- Change `WEBHOOK_BASE_URL` to new domain
- Update `DOMAIN_NAME` 
- Add any new API keys needed

### Step 3: Secure the File
```bash
chmod 600 .env  # Only you can read/write
```

## 🌐 Environment-Specific Configurations

### Development (.env.development)
```env
NODE_ENV=development
WEBHOOK_BASE_URL=http://localhost:3000
# Use test/sandbox API keys
```

### Production (.env.production)
```env
NODE_ENV=production
WEBHOOK_BASE_URL=https://capitalcrusader.ca
# Use live API keys
```

### Testing (.env.test)
```env
NODE_ENV=test
# Use test-specific keys or mocks
```

## 📊 API Key Sources & Documentation

### ElevenLabs
- **Dashboard**: https://elevenlabs.io/app/settings
- **Docs**: https://elevenlabs.io/docs
- **Keys Needed**: API Key, Agent ID, Phone Number ID

### Twilio
- **Console**: https://console.twilio.com
- **Docs**: https://www.twilio.com/docs
- **Keys Needed**: Account SID, Auth Token, Phone Number

### Supabase
- **Dashboard**: https://supabase.com/dashboard
- **Docs**: https://supabase.com/docs
- **Keys Needed**: Project URL, Anon Key, Service Role Key

### Future Services
- **OpenAI**: https://platform.openai.com/api-keys
- **Google Cloud**: https://console.cloud.google.com/apis/credentials
- **Stripe**: https://dashboard.stripe.com/apikeys
- **Facebook**: https://developers.facebook.com/apps

## 🔧 Quick Commands

### View Current Keys (safely)
```bash
# Show which keys are set (without revealing values)
grep -E "^[A-Z_]+=" .env | sed 's/=.*/=***HIDDEN***/'
```

### Test Environment Loading
```bash
# Test if environment loads correctly
node -e "require('dotenv').config(); console.log('Keys loaded:', Object.keys(process.env).filter(k => k.includes('API')).length)"
```

### Backup Your Keys
```bash
# Create encrypted backup
cp .env .env.backup.$(date +%Y%m%d)
```

## 🚨 Emergency Key Rotation

If keys are compromised:

1. **Immediately revoke** old keys in respective dashboards
2. **Generate new keys** 
3. **Update .env files**
4. **Restart all services**
5. **Update webhook URLs** if needed

## 📞 Support Contacts

- **ElevenLabs**: support@elevenlabs.io
- **Twilio**: help@twilio.com  
- **Supabase**: support@supabase.io
- **Hostinger**: support@hostinger.com

---

## 🎯 Next Steps

1. **Fill in your actual API keys** in the `.env` file
2. **Test the system** with `node test-complete-system.js`
3. **Deploy to production** server
4. **Set up monitoring** for key usage and limits

Your API keys are now organized and ready for this project and all future Capital Crusader developments!
