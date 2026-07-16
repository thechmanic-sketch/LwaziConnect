// ══ SUPABASE CLIENT ══
// URL + anon key are safe to ship client-side by design — every table is
// protected by Row Level Security (see supabase/migrations/0001_init.sql),
// so the anon key alone can't read/write anything outside what RLS allows.
const SUPABASE_URL = 'https://rewizxagngxklmdgzyon.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJld2l6eGFnbmd4a2xtZGd6eW9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMjgwOTAsImV4cCI6MjA5OTcwNDA5MH0.a0aBU1DZphPAUE9_qr-fQD9dkpj9tW5ozc-Nyhq9BGA';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
