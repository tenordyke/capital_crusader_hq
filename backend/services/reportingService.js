const { notifyTroy } = require('./notificationService');
const supabase = require('../supabaseClient');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Generate daily summary report
const generateDailySummary = async () => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // Get today's leads from Supabase
    const { data: leads, error } = await supabase
      .from('leads')
      .select('*')
      .gte('created_at', `${today}T00:00:00`)
      .lt('created_at', `${today}T23:59:59`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching leads:', error);
      return;
    }

    const totalLeads = leads?.length || 0;
    const callsInitiated = leads?.filter(lead => lead.call_status).length || 0;
    const emailsSent = leads?.filter(lead => lead.email_sent).length || 0;
    const textsSent = leads?.filter(lead => lead.sms_sent).length || 0;
    const appointments = leads?.filter(lead => lead.appointment_booked).length || 0;

    // Generate summary email
    await notifyTroy('DAILY_SUMMARY', {
      date: today,
      totalLeads,
      callsInitiated,
      emailsSent,
      textsSent,
      appointments,
      leads: leads || []
    });

    console.log(`📊 Daily summary sent for ${today}`);
    
  } catch (error) {
    console.error('Error generating daily summary:', error);
  }
};

// Generate weekly performance report
const generateWeeklyReport = async () => {
  try {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const { data: leads, error } = await supabase
      .from('leads')
      .select('*')
      .gte('created_at', weekAgo.toISOString())
      .lt('created_at', today.toISOString())
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching weekly leads:', error);
      return;
    }

    const stats = {
      totalLeads: leads?.length || 0,
      callsCompleted: leads?.filter(lead => lead.call_status === 'completed').length || 0,
      appointmentsBooked: leads?.filter(lead => lead.appointment_booked).length || 0,
      customerReplies: leads?.filter(lead => lead.customer_replied).length || 0,
      conversionRate: 0
    };

    if (stats.totalLeads > 0) {
      stats.conversionRate = ((stats.appointmentsBooked / stats.totalLeads) * 100).toFixed(1);
    }

    await notifyTroy('WEEKLY_REPORT', {
      weekStart: weekAgo.toISOString().split('T')[0],
      weekEnd: today.toISOString().split('T')[0],
      ...stats,
      leads: leads || []
    });

    console.log('📈 Weekly report sent');
    
  } catch (error) {
    console.error('Error generating weekly report:', error);
  }
};

// Real-time activity tracker
const trackActivity = async (activityType, customerData, details = {}) => {
  try {
    // Log to database
    const activityLog = {
      activity_type: activityType,
      customer_name: customerData.name,
      customer_phone: customerData.phone,
      customer_email: customerData.email,
      details: JSON.stringify(details),
      timestamp: new Date().toISOString()
    };

    const { error } = await supabase
      .from('activity_logs')
      .insert([activityLog]);

    if (error) {
      console.error('Error logging activity:', error);
    }

    // Send immediate notification to Troy
    await notifyTroy(activityType, {
      customerName: customerData.name,
      ...customerData,
      ...details
    });

    console.log(`📊 Activity tracked: ${activityType} for ${customerData.name}`);
    
  } catch (error) {
    console.error('Error tracking activity:', error);
  }
};

// Get real-time dashboard data
const getDashboardData = async () => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // Today's stats
    const { data: todayLeads } = await supabase
      .from('leads')
      .select('*')
      .gte('created_at', `${today}T00:00:00`);

    // This week's stats
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    
    const { data: weekLeads } = await supabase
      .from('leads')
      .select('*')
      .gte('created_at', weekStart.toISOString());

    // Recent activities
    const { data: recentActivities } = await supabase
      .from('activity_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(10);

    return {
      today: {
        leads: todayLeads?.length || 0,
        calls: todayLeads?.filter(l => l.call_status).length || 0,
        appointments: todayLeads?.filter(l => l.appointment_booked).length || 0
      },
      thisWeek: {
        leads: weekLeads?.length || 0,
        calls: weekLeads?.filter(l => l.call_status).length || 0,
        appointments: weekLeads?.filter(l => l.appointment_booked).length || 0
      },
      recentActivities: recentActivities || []
    };
    
  } catch (error) {
    console.error('Error getting dashboard data:', error);
    return null;
  }
};

module.exports = {
  generateDailySummary,
  generateWeeklyReport,
  trackActivity,
  getDashboardData
};
