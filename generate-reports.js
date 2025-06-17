const { generateDailySummary, generateWeeklyReport } = require('./backend/services/reportingService');

async function runReports() {
  console.log('📊 Generating reports...');
  
  try {
    // Generate daily summary
    console.log('📅 Generating daily summary...');
    await generateDailySummary();
    
    // Generate weekly report
    console.log('📈 Generating weekly report...');
    await generateWeeklyReport();
    
    console.log('✅ Reports generated successfully!');
    
  } catch (error) {
    console.error('❌ Error generating reports:', error);
  }
  
  process.exit(0);
}

// Check command line arguments
const args = process.argv.slice(2);

if (args.includes('--daily')) {
  console.log('📅 Generating daily summary only...');
  generateDailySummary().then(() => {
    console.log('✅ Daily summary sent!');
    process.exit(0);
  }).catch(console.error);
} else if (args.includes('--weekly')) {
  console.log('📈 Generating weekly report only...');
  generateWeeklyReport().then(() => {
    console.log('✅ Weekly report sent!');
    process.exit(0);
  }).catch(console.error);
} else {
  runReports();
}
