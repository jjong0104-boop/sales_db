const SUPABASE_URL      = 'https://thylklnxjaztzwzwzdty.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoeWxrbG54amF6dHp3end6ZHR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMDcxMDcsImV4cCI6MjA5MTg4MzEwN30.3_fcHhjGtzy9zRghm3iVM2FCGrlS47DSPdRtBU0Dw9A';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
