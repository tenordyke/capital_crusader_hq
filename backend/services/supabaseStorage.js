const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const uploadAudioToSupabase = async (filePath, fileName) => {
  try {
    // Read the file
    const fileBuffer = fs.readFileSync(filePath);
    
    // Upload to Supabase Storage using the audio-files bucket
    const { data, error } = await supabase.storage
      .from('audio-files')
      .upload(`ava-calls/${fileName}`, fileBuffer, {
        contentType: 'audio/mpeg',
        upsert: true
      });

    if (error) {
      console.error('Upload error details:', error);
      throw error;
    }

    // Generate the public URL using the S3 endpoint
    const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/audio-files/ava-calls/${fileName}`;
    
    console.log('✅ Audio uploaded successfully to:', publicUrl);
    return publicUrl;

  } catch (error) {
    console.error('❌ Supabase upload error:', error);
    throw error;
  }
};

module.exports = { uploadAudioToSupabase };
