
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tjoyajajskeijhujoczy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqb3lhamFqc2tlaWpodWpvY3p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4NzA2MzYsImV4cCI6MjA2NTQ0NjYzNn0.K7kYJz4mpICp8Ir4fENPjNWoVhGbxkILGLWtHLD2gJ8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
