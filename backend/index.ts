import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kjsfqgfzntyeblrnbjpi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtqc2ZxZ2Z6bnR5ZWJscm5ianBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4ODIwNTAsImV4cCI6MjAxNTQ1ODA1MH0.9Q0T-_T8Yu9hnRXCeGvlYF-yNHT4EX-qKXQoJea1wvo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
