const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function setupStorage() {
  try {
    console.log('🔧 Setting up Supabase Storage...');
    
    // Create the audio-files bucket
    const { data, error } = await supabase.storage.createBucket('audio-files', {
      public: true,
      allowedMimeTypes: ['audio/mpeg', 'audio/mp3'],
      fileSizeLimit: 10485760 // 10MB
    });

    if (error && error.message !== 'Bucket already exists') {
      throw error;
    }

    console.log('✅ Storage bucket "audio-files" is ready!');
    console.log('📁 Bucket configuration:');
    console.log('   - Public access: enabled');
    console.log('   - Allowed types: audio/mpeg, audio/mp3');
    console.log('   - Size limit: 10MB');
    
    // Test upload permissions
    console.log('\n🧪 Testing upload permissions...');
    const testBuffer = Buffer.from('test audio file');
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('audio-files')
      .upload('test/test.mp3', testBuffer, {
        contentType: 'audio/mpeg',
        upsert: true
      });

    if (uploadError) {
      throw uploadError;
    }

    console.log('✅ Upload test successful!');
    
    // Clean up test file
    await supabase.storage.from('audio-files').remove(['test/test.mp3']);
    console.log('🧹 Test file cleaned up');
    
    console.log('\n🎉 Supabase Storage setup complete!');
    console.log('🚀 Ready to generate and host Ava voice calls!');

  } catch (error) {
    console.error('❌ Storage setup error:', error.message);
    
    if (error.message.includes('Bucket already exists')) {
      console.log('✅ Storage bucket already exists - setup complete!');
    } else {
      console.log('\n💡 Manual setup required:');
      console.log('1. Go to your Supabase Dashboard');
      console.log('2. Navigate to Storage');
      console.log('3. Create a new bucket named "audio-files"');
      console.log('4. Enable public access');
      console.log('5. Set allowed MIME types: audio/mpeg, audio/mp3');
    }
  }
}

setupStorage();
