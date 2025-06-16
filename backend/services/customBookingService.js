const nodemailer = require('nodemailer');
const supabase = require('../supabaseClient');
require('dotenv').config();

// Create transporter using your email account
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.EMAIL_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || 'drive@capitalcrusader.ca',
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Function to create appointment in our custom system
const createCustomAppointment = async ({ customerName, customerPhone, customerEmail, appointmentTime, vehicleInterest, notes }) => {
  try {
    console.log('📅 Creating custom appointment...');
    
    // Generate unique appointment ID
    const appointmentId = `APPT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Store appointment in Supabase
    const { data, error } = await supabase
      .from('appointments')
      .insert([
        {
          appointment_id: appointmentId,
          customer_name: customerName,
          customer_phone: customerPhone,
          customer_email: customerEmail,
          appointment_time: appointmentTime,
          vehicle_interest: vehicleInterest,
          notes: notes,
          status: 'scheduled',
          created_at: new Date().toISOString(),
          source: 'AI Assistant'
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      // Continue even if database fails - we'll still send emails
    }

    // Send calendar invite to customer
    await sendCalendarInvite({
      customerName,
      customerEmail,
      appointmentTime,
      vehicleInterest,
      appointmentId
    });

    // Send appointment notification to Troy
    await sendTroyAppointmentNotification({
      customerName,
      customerPhone,
      customerEmail,
      appointmentTime,
      vehicleInterest,
      appointmentId,
      notes
    });

    console.log('✅ Custom appointment created:', appointmentId);
    
    return {
      success: true,
      appointmentId: appointmentId,
      appointmentTime: appointmentTime,
      message: 'Appointment successfully scheduled'
    };

  } catch (error) {
    console.error('❌ Custom appointment creation failed:', error);
    return { success: false, error: error.message };
  }
};

// Function to send calendar invite to customer
const sendCalendarInvite = async ({ customerName, customerEmail, appointmentTime, vehicleInterest, appointmentId }) => {
  try {
    const appointmentDate = new Date(appointmentTime);
    const endTime = new Date(appointmentDate.getTime() + 60 * 60 * 1000); // 1 hour appointment
    
    // Create ICS calendar file content
    const icsContent = createICSContent({
      appointmentId,
      customerName,
      appointmentDate,
      endTime,
      vehicleInterest
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Troy Nordyke <drive@capitalcrusader.ca>',
      to: customerEmail,
      subject: `Test Drive Appointment Confirmation - ${vehicleInterest}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #FFD700; padding: 20px; text-align: center;">
            <h1 style="color: #000; margin: 0;">Capital GMC Buick Cadillac</h1>
            <p style="color: #000; margin: 5px 0;">Test Drive Appointment Confirmed</p>
          </div>
          
          <div style="padding: 30px; background-color: #f5f5f5;">
            <h2 style="color: #333;">Hi ${customerName}! 🚗</h2>
            
            <p style="color: #555; line-height: 1.6;">
              Your test drive appointment has been confirmed!
            </p>
            
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
                <li><strong>Vehicle:</strong> ${vehicleInterest}</li>
                <li><strong>Location:</strong> Capital GMC Buick Cadillac, Regina, SK</li>
                <li><strong>Appointment ID:</strong> ${appointmentId}</li>
              </ul>
            </div>
            
            <p style="color: #555; line-height: 1.6;">
              Troy will call you shortly to confirm details and answer any questions you may have.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #555;">
                Need to reschedule? Call us at <strong>306-331-4802</strong>
              </p>
            </div>
            
            <p style="color: #555; line-height: 1.6; margin-top: 30px;">
              Looking forward to seeing you!<br>
              <strong>Troy Nordyke</strong><br>
              Capital GMC Buick Cadillac
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: 'appointment.ics',
          content: icsContent,
          contentType: 'text/calendar'
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    console.log('📧 Calendar invite sent to customer');

  } catch (error) {
    console.error('❌ Failed to send calendar invite:', error);
  }
};

// Function to send appointment notification to Troy
const sendTroyAppointmentNotification = async ({ customerName, customerPhone, customerEmail, appointmentTime, vehicleInterest, appointmentId, notes }) => {
  try {
    const appointmentDate = new Date(appointmentTime);
    
    const mailOptions = {
      from: 'Capital Crusader System <drive@capitalcrusader.ca>',
      to: 'drive@capitalcrusader.ca',
      subject: `🗓️ New Test Drive Appointment: ${customerName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #28a745; padding: 20px; text-align: center;">
            <h2 style="color: white; margin: 0;">New Test Drive Appointment!</h2>
          </div>
          
          <div style="padding: 20px; background-color: #f5f5f5;">
            <div style="background-color: white; padding: 15px; margin: 10px 0; border-radius: 5px;">
              <h3 style="color: #333; margin-top: 0;">Customer Information:</h3>
              <p><strong>Name:</strong> ${customerName}</p>
              <p><strong>Phone:</strong> ${customerPhone}</p>
              <p><strong>Email:</strong> ${customerEmail}</p>
            </div>
            
            <div style="background-color: white; padding: 15px; margin: 10px 0; border-radius: 5px;">
              <h3 style="color: #333; margin-top: 0;">Appointment Details:</h3>
              <p><strong>Date & Time:</strong> ${appointmentDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              })}</p>
              <p><strong>Vehicle Interest:</strong> ${vehicleInterest}</p>
              <p><strong>Appointment ID:</strong> ${appointmentId}</p>
              <p><strong>Source:</strong> AI Assistant Booking</p>
              ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
            </div>
            
            <div style="background-color: #d4edda; border-left: 4px solid #28a745; padding: 10px; margin: 10px 0;">
              <p style="margin: 0;"><strong>Action Required:</strong> Call customer to confirm appointment details and prepare for test drive.</p>
            </div>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('📧 Appointment notification sent to Troy');

  } catch (error) {
    console.error('❌ Failed to send Troy notification:', error);
  }
};

// Function to create ICS calendar content
const createICSContent = ({ appointmentId, customerName, appointmentDate, endTime, vehicleInterest }) => {
  const formatDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Capital GMC Buick Cadillac//Test Drive Appointment//EN
BEGIN:VEVENT
UID:${appointmentId}@capitalcrusader.ca
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(appointmentDate)}
DTEND:${formatDate(endTime)}
SUMMARY:Test Drive - ${vehicleInterest}
DESCRIPTION:Test drive appointment for ${vehicleInterest} with ${customerName}
LOCATION:Capital GMC Buick Cadillac, Regina, SK
ORGANIZER:mailto:drive@capitalcrusader.ca
ATTENDEE:mailto:${customerName}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
};

// Function to get upcoming appointments
const getUpcomingCustomAppointments = async (daysAhead = 7) => {
  try {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + daysAhead);

    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .gte('appointment_time', startDate.toISOString())
      .lte('appointment_time', endDate.toISOString())
      .order('appointment_time', { ascending: true });

    if (error) {
      throw error;
    }

    return { success: true, appointments: data || [] };
  } catch (error) {
    console.error('❌ Error fetching appointments:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  createCustomAppointment,
  getUpcomingCustomAppointments
};
