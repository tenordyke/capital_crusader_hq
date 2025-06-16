const nodemailer = require('nodemailer');
require('dotenv').config();

async function createOutlookAppointment() {
  console.log('📅 Creating test appointment for Outlook calendar...\n');
  
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.EMAIL_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER || 'drive@capitalcrusader.ca',
      pass: process.env.EMAIL_PASS
    },
    tls: { rejectUnauthorized: false }
  });

  // Create appointment for tomorrow at 3:00 PM
  const appointmentDate = new Date();
  appointmentDate.setDate(appointmentDate.getDate() + 1);
  appointmentDate.setHours(15, 0, 0, 0); // 3:00 PM
  
  const endTime = new Date(appointmentDate.getTime() + 60 * 60 * 1000); // 1 hour later
  
  // Create ICS calendar content
  const icsContent = createICSContent(appointmentDate, endTime);
  
  console.log('📧 Sending calendar invite to drive@capitalcrusader.ca...');
  
  try {
    const result = await transporter.sendMail({
      from: 'Capital GMC Test Drive <drive@capitalcrusader.ca>',
      to: 'drive@capitalcrusader.ca',
      subject: '📅 Test Drive Appointment - 2024 GMC Sierra',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #FFD700; padding: 20px; text-align: center;">
            <h1 style="color: #000; margin: 0;">Capital GMC Buick Cadillac</h1>
            <p style="color: #000; margin: 5px 0;">Test Drive Appointment Confirmed</p>
          </div>
          
          <div style="padding: 30px; background-color: #f5f5f5;">
            <h2 style="color: #333;">Test Appointment Created! 🚗</h2>
            
            <div style="background-color: #fff; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="color: #d32f2f;">📅 Appointment Details:</h3>
              <ul style="color: #555; line-height: 1.8;">
                <li><strong>Date & Time:</strong> ${appointmentDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}</li>
                <li><strong>Vehicle:</strong> 2024 GMC Sierra</li>
                <li><strong>Customer:</strong> Test Customer</li>
                <li><strong>Location:</strong> Capital GMC Buick Cadillac, Regina, SK</li>
                <li><strong>Duration:</strong> 1 hour</li>
              </ul>
            </div>
            
            <div style="background-color: #d4edda; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0;">
              <p style="margin: 0;"><strong>📎 Calendar Invite Attached</strong></p>
              <p style="margin: 5px 0 0 0;">Click the .ics attachment to add this appointment to your Outlook calendar.</p>
            </div>
            
            <p style="color: #555; line-height: 1.6;">
              This is a test of the appointment booking system. The calendar invite should appear in your Outlook calendar when you click the attachment.
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: 'test-appointment.ics',
          content: icsContent,
          contentType: 'text/calendar; charset=utf-8; method=REQUEST'
        }
      ]
    });

    console.log('✅ Calendar invite sent successfully!');
    console.log('📧 Message ID:', result.messageId);
    console.log('📧 Response:', result.response);
    console.log('\n📋 Appointment Details:');
    console.log('📅 Date:', appointmentDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }));
    console.log('🚗 Vehicle: 2024 GMC Sierra');
    console.log('👤 Customer: Test Customer');
    console.log('\n📧 Check your email at drive@capitalcrusader.ca');
    console.log('📎 Click the .ics attachment to add to Outlook');
    console.log('📁 Also check spam/junk folder if not in inbox');

  } catch (error) {
    console.error('❌ Failed to send calendar invite:', error);
  }
}

function createICSContent(startDate, endDate) {
  const formatDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const appointmentId = `TEST-${Date.now()}@capitalcrusader.ca`;

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Capital GMC Buick Cadillac//Test Drive Appointment//EN
METHOD:REQUEST
BEGIN:VEVENT
UID:${appointmentId}
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:Test Drive - 2024 GMC Sierra
DESCRIPTION:Test drive appointment for 2024 GMC Sierra with Test Customer. This is a test of the booking system.
LOCATION:Capital GMC Buick Cadillac, Regina, SK
ORGANIZER;CN=Troy Nordyke:mailto:drive@capitalcrusader.ca
ATTENDEE;CN=Troy Nordyke;RSVP=TRUE:mailto:drive@capitalcrusader.ca
STATUS:CONFIRMED
SEQUENCE:0
PRIORITY:5
CLASS:PUBLIC
TRANSP:OPAQUE
BEGIN:VALARM
TRIGGER:-PT15M
ACTION:DISPLAY
DESCRIPTION:Test Drive Appointment in 15 minutes
END:VALARM
END:VEVENT
END:VCALENDAR`;
}

createOutlookAppointment().catch(console.error);
