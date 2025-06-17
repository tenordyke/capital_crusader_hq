const { google } = require('googleapis');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Google Calendar configuration
const TROY_EMAIL = 'troyelliottnordyke@gmail.com';
const CALENDAR_ID = TROY_EMAIL; // Using Troy's email as calendar ID

// Initialize Google Calendar API
const calendar = google.calendar('v3');

const createGoogleCalendarEvent = async ({ customerName, customerPhone, customerEmail, appointmentTime, vehicleInterest, notes }) => {
  try {
    console.log('📅 Creating Google Calendar appointment...');
    
    // Create OAuth2 client (you'll need to set up credentials)
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE, // Path to service account key
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const authClient = await auth.getClient();
    google.options({ auth: authClient });

    // Calculate end time (1 hour appointment)
    const startTime = new Date(appointmentTime);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    const event = {
      summary: `Test Drive - ${customerName} - ${vehicleInterest}`,
      description: `
Customer: ${customerName}
Phone: ${customerPhone}
Email: ${customerEmail}
Vehicle Interest: ${vehicleInterest}
Notes: ${notes || 'Scheduled via AI Agent call'}

This appointment was automatically scheduled by Lex (AI Agent) during a lead follow-up call.
      `.trim(),
      start: {
        dateTime: startTime.toISOString(),
        timeZone: 'America/Regina', // Saskatchewan timezone
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'America/Regina',
      },
      attendees: [
        { email: TROY_EMAIL, displayName: 'Troy Elliott Nordyke' },
        { email: customerEmail, displayName: customerName }
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 24 hours before
          { method: 'popup', minutes: 30 }, // 30 minutes before
        ],
      },
      location: 'Capital GMC Buick Cadillac',
      colorId: '2', // Green color for test drives
    };

    const response = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      resource: event,
      sendUpdates: 'all', // Send email invitations
    });

    console.log('✅ Google Calendar event created:', response.data.id);
    
    return {
      success: true,
      eventId: response.data.id,
      eventLink: response.data.htmlLink,
      startTime: response.data.start.dateTime,
      endTime: response.data.end.dateTime
    };

  } catch (error) {
    console.error('❌ Google Calendar event creation failed:', error);
    return { success: false, error: error.message };
  }
};

const getUpcomingAppointments = async (daysAhead = 7) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE,
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    const authClient = await auth.getClient();
    google.options({ auth: authClient });

    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(now.getDate() + daysAhead);

    const response = await calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: now.toISOString(),
      timeMax: futureDate.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items || [];
    
    return {
      success: true,
      appointments: events.map(event => ({
        id: event.id,
        summary: event.summary,
        start: event.start.dateTime || event.start.date,
        end: event.end.dateTime || event.end.date,
        description: event.description,
        attendees: event.attendees,
        location: event.location
      }))
    };

  } catch (error) {
    console.error('❌ Error fetching Google Calendar appointments:', error);
    return { success: false, error: error.message };
  }
};

const updateAppointmentStatus = async (eventId, status, notes) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const authClient = await auth.getClient();
    google.options({ auth: authClient });

    // Get the existing event
    const event = await calendar.events.get({
      calendarId: CALENDAR_ID,
      eventId: eventId,
    });

    // Update the description with status
    const updatedDescription = `${event.data.description}\n\nStatus: ${status}\nNotes: ${notes}`;

    const response = await calendar.events.update({
      calendarId: CALENDAR_ID,
      eventId: eventId,
      resource: {
        ...event.data,
        description: updatedDescription,
        colorId: status === 'completed' ? '10' : status === 'cancelled' ? '11' : '2'
      },
    });

    return { success: true, event: response.data };

  } catch (error) {
    console.error('❌ Error updating appointment:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  createGoogleCalendarEvent,
  getUpcomingAppointments,
  updateAppointmentStatus
};
