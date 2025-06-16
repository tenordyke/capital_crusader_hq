-- Storage Policy for audio-files bucket
-- This allows public access to upload and read audio files

-- Policy to allow INSERT (upload) operations
CREATE POLICY "Allow public uploads to audio-files bucket" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'audio-files');

-- Policy to allow SELECT (read) operations  
CREATE POLICY "Allow public reads from audio-files bucket" ON storage.objects
FOR SELECT USING (bucket_id = 'audio-files');

-- Policy to allow UPDATE operations (for upsert functionality)
CREATE POLICY "Allow public updates to audio-files bucket" ON storage.objects
FOR UPDATE USING (bucket_id = 'audio-files');

-- Policy to allow DELETE operations (for cleanup)
CREATE POLICY "Allow public deletes from audio-files bucket" ON storage.objects
FOR DELETE USING (bucket_id = 'audio-files');
