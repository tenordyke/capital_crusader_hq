const supabase = require('./backend/supabaseClient');

async function showAppointments() {
  console.log('📅 Current Appointments in Database:');
  console.log('='.repeat(50));
  
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('appointment_time', { ascending: true });
    
    if (error) {
      console.log('❌ Database error:', error.message);
      console.log('Note: appointments table may not exist yet');
      console.log('You need to run the SQL script: create-appointments-table.sql');
      return;
    }
    
    if (!data || data.length === 0) {
      console.log('📭 No appointments found in database');
      console.log('This means the appointments table exists but is empty');
      return;
    }
    
    console.log(`Found ${data.length} appointment(s):`);
    console.log('');
    
    data.forEach((apt, index) => {
      const date = new Date(apt.appointment_time);
      console.log(`${index + 1}. ${apt.customer_name}`);
      console.log(`   📅 ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`);
      console.log(`   🚗 ${apt.vehicle_interest}`);
      console.log(`   📞 ${apt.customer_phone}`);
      console.log(`   📧 ${apt.customer_email}`);
      console.log(`   🆔 ${apt.appointment_id}`);
      console.log(`   📝 Status: ${apt.status}`);
      console.log(`   📍 Source: ${apt.source}`);
      if (apt.notes) {
        console.log(`   💬 Notes: ${apt.notes}`);
      }
      console.log('   ' + '-'.repeat(40));
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

showAppointments().catch(console.error);
