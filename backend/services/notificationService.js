const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

// Create transporter for notifications
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.EMAIL_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || 'drive@capitalcrusader.ca',
    pass: process.env.EMAIL_PASS || '$5438576TroyAlix$'
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Send notification to Troy about lead activities
const notifyTroy = async (type, data) => {
  try {
    let subject = '';
    let htmlContent = '';
    
    const baseStyle = `
      <style>
        body { font-family: Arial, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; }
        .header { background-color: #FFD700; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f5f5f5; }
        .info-box { background-color: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .label { font-weight: bold; color: #333; }
        .value { color: #555; }
        .action-taken { background-color: #d4edda; border-left: 4px solid #28a745; padding: 10px; margin: 10px 0; }
        .transcript { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 10px 0; }
      </style>
    `;
    
    switch(type) {
      case 'NEW_LEAD':
        subject = `🚨 New Lead: ${data.name} - ${data.vehicle || 'Vehicle Inquiry'}`;
        htmlContent = `
          ${baseStyle}
          <div class="container">
            <div class="header">
              <h2>New Lead Alert!</h2>
            </div>
            <div class="content">
              <div class="info-box">
                <p><span class="label">Name:</span> <span class="value">${data.name}</span></p>
                <p><span class="label">Email:</span> <span class="value">${data.email}</span></p>
                <p><span class="label">Phone:</span> <span class="value">${data.phone || 'Not provided'}</span></p>
                <p><span class="label">Vehicle Interest:</span> <span class="value">${data.vehicle || 'Not specified'}</span></p>
                <p><span class="label">Trade-In:</span> <span class="value">${data.tradeIn || 'None'}</span></p>
                <p><span class="label">Budget:</span> <span class="value">${data.budget || 'Not specified'}</span></p>
                <p><span class="label">Timeframe:</span> <span class="value">${data.timeframe || 'Not specified'}</span></p>
                <p><span class="label">Preferred Contact:</span> <span class="value">${data.preferred_contact_method}</span></p>
              </div>
              <div class="action-taken">
                <h3>Actions Taken:</h3>
                <ul>
                  ${data.actions ? data.actions.map(action => `<li>${action}</li>`).join('') : '<li>Processing...</li>'}
                </ul>
              </div>
            </div>
          </div>
        `;
        break;
        
      case 'CALL_COMPLETED':
        subject = `📞 AI Call Completed: ${data.customerName}`;
        htmlContent = `
          ${baseStyle}
          <div class="container">
            <div class="header">
              <h2>AI Call Summary</h2>
            </div>
            <div class="content">
              <div class="info-box">
                <p><span class="label">Customer:</span> <span class="value">${data.customerName}</span></p>
                <p><span class="label">Phone:</span> <span class="value">${data.phone}</span></p>
                <p><span class="label">Call Duration:</span> <span class="value">${data.duration || 'N/A'}</span></p>
                <p><span class="label">Call Status:</span> <span class="value">${data.status}</span></p>
              </div>
              ${data.transcript ? `
                <div class="transcript">
                  <h3>Call Transcript:</h3>
                  <pre>${data.transcript}</pre>
                </div>
              ` : ''}
              ${data.summary ? `
                <div class="info-box">
                  <h3>AI Summary:</h3>
                  <p>${data.summary}</p>
                </div>
              ` : ''}
            </div>
          </div>
        `;
        break;
        
      case 'TEXT_SENT':
        subject = `💬 Text Sent: ${data.customerName}`;
        htmlContent = `
          ${baseStyle}
          <div class="container">
            <div class="header">
              <h2>Text Message Sent</h2>
            </div>
            <div class="content">
              <div class="info-box">
                <p><span class="label">Customer:</span> <span class="value">${data.customerName}</span></p>
                <p><span class="label">Phone:</span> <span class="value">${data.phone}</span></p>
                <p><span class="label">Time:</span> <span class="value">${new Date().toLocaleString()}</span></p>
              </div>
              <div class="transcript">
                <h3>Message Content:</h3>
                <p>${data.message}</p>
              </div>
            </div>
          </div>
        `;
        break;
        
      case 'EMAIL_SENT':
        subject = `📧 Email Sent: ${data.customerName}`;
        htmlContent = `
          ${baseStyle}
          <div class="container">
            <div class="header">
              <h2>Email Sent</h2>
            </div>
            <div class="content">
              <div class="info-box">
                <p><span class="label">Customer:</span> <span class="value">${data.customerName}</span></p>
                <p><span class="label">Email:</span> <span class="value">${data.email}</span></p>
                <p><span class="label">Subject:</span> <span class="value">${data.subject}</span></p>
                <p><span class="label">Attachments:</span> <span class="value">Car Buyer's Guide PDF</span></p>
              </div>
            </div>
          </div>
        `;
        break;
        
      case 'APPOINTMENT_BOOKED':
        subject = `🗓️ Test Drive Booked: ${data.customerName}`;
        htmlContent = `
          ${baseStyle}
          <div class="container">
            <div class="header" style="background-color: #28a745;">
              <h2 style="color: white;">Test Drive Appointment!</h2>
            </div>
            <div class="content">
              <div class="info-box">
                <p><span class="label">Customer:</span> <span class="value">${data.customerName}</span></p>
                <p><span class="label">Date/Time:</span> <span class="value">${data.appointmentTime}</span></p>
                <p><span class="label">Vehicle:</span> <span class="value">${data.vehicle}</span></p>
                <p><span class="label">Contact:</span> <span class="value">${data.phone}</span></p>
              </div>
            </div>
          </div>
        `;
        break;
        
      case 'CUSTOMER_REPLY':
        subject = `💬 Customer Reply: ${data.customerName}`;
        htmlContent = `
          ${baseStyle}
          <div class="container">
            <div class="header" style="background-color: #17a2b8;">
              <h2 style="color: white;">Customer Response!</h2>
            </div>
            <div class="content">
              <div class="info-box">
                <p><span class="label">Customer:</span> <span class="value">${data.customerName}</span></p>
                <p><span class="label">Channel:</span> <span class="value">${data.channel}</span></p>
              </div>
              <div class="transcript">
                <h3>Message:</h3>
                <p>${data.message}</p>
              </div>
            </div>
          </div>
        `;
        break;
    }
    
    // Add footer to all emails
    htmlContent += `
      <div style="text-align: center; padding: 20px; color: #666;">
        <p>Capital Crusader Lead Management System</p>
        <p style="font-size: 12px;">This is an automated notification</p>
      </div>
    `;
    
    const mailOptions = {
      from: 'Capital Crusader System <drive@capitalcrusader.ca>',
      to: 'drive@capitalcrusader.ca', // Troy's email
      subject: subject,
      html: htmlContent
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`📨 Notification sent to Troy: ${type}`);
    
  } catch (error) {
    console.error('Failed to send notification:', error);
    // Don't let notification failures break the main flow
  }
};

// Log all activities to a daily summary
const logActivity = async (activity) => {
  // This could be extended to save to a database for daily/weekly reports
  console.log(`📊 Activity Log: ${JSON.stringify(activity)}`);
};

module.exports = { notifyTroy, logActivity };
