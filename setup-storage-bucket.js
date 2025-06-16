const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_KEY,
  {
    auth: {
      persistSession: false
    }
  }
);

async function setupStorageBucket() {
  try {
    console.log('🔧 Setting up Supabase Storage bucket...');
    console.log('📍 Supabase URL:', process.env.SUPABASE_URL);
    
    // First, let's check if the bucket already exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('❌ Error listing buckets:', listError.message);
      throw listError;
    }
    
    console.log('📋 Existing buckets:', buckets.map(b => b.name));
    
    const bucketExists = buckets.some(bucket => bucket.name === 'audio-files');
    
    if (bucketExists) {
      console.log('✅ Bucket "audio-files" already exists!');
    } else {
      console.log('🆕 Creating new bucket "audio-files"...');
      
      // Create the bucket
      const { data: createData, error: createError } = await supabase.storage.createBucket('audio-files', {
        public: true,
        allowedMimeTypes: ['audio/mpeg', 'audio/mp3', 'audio/wav'],
        fileSizeLimit: 10485760 // 10MB
      });
      
      if (createError) {
        console.error('❌ Error creating bucket:', createError.message);
        throw createError;
      }
      
      console.log('✅ Bucket created successfully!', createData);
    }
    
    // Test upload to verify permissions
    console.log('🧪 Testing upload permissions...');
    const testContent = 'This is a test audio file';
    const testBuffer = Buffer.from(testContent);
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('audio-files')
      .upload('test/test-upload.txt', testBuffer, {
        contentType: 'text/plain',
        upsert: true
      });
    
    if (uploadError) {
      console.error('❌ Upload test failed:', uploadError.message);
      console.log('💡 This might be due to RLS policies. The bucket exists but may need manual policy setup.');
      console.log('📝 Manual steps:');
      console.log('1. Go to your Supabase Dashboard');
      console.log('2. Navigate to Storage > Policies');
      console.log('3. Create a policy for the "audio-files" bucket');
      console.log('4. Allow INSERT and SELECT operations for authenticated users');
      return;
    }
    
    console.log('✅ Upload test successful!');
    
    // Get public URL to verify
    const { data: urlData } = supabase.storage
      .from('audio-files')
      .getPublicUrl('test/test-upload.txt');
    
    console.log('🌐 Public URL test:', urlData.publicUrl);
    
    // Clean up test file
    const { error: deleteError } = await supabase.storage
      .from('audio-files')
      .remove(['test/test-upload.txt']);
    
    if (!deleteError) {
      console.log('🧹 Test file cleaned up');
    }
    
    console.log('\n🎉 Storage setup complete!');
    console.log('📁 Bucket: audio-files');
    console.log('🔓 Public access: enabled');
    console.log('📝 Allowed types: audio/mpeg, audio/mp3, audio/wav');
    console.log('📏 Size limit: 10MB');
    console.log('\n🚀 Ready for Ava voice calls!');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\n🛠️ Manual setup instructions:');
    console.log('1. Open your Supabase Dashboard');
    console.log('2. Go to Storage section');
    console.log('3. Create a new bucket named "audio-files"');
    console.log('4. Enable "Public bucket" option');
    console.log('5. Set allowed MIME types: audio/mpeg, audio/mp3, audio/wav');
    console.log('6. Set file size limit to 10MB');
  }
}

setupStorageBucket();
