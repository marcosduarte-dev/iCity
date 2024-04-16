import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://efcetfvacfenfpdxhoff.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmY2V0ZnZhY2ZlbmZwZHhob2ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4NzU3NDYsImV4cCI6MjAyODQ1MTc0Nn0.o6ElXuv_oVL0PV9NRRzf3u8osSHYpgR6b6Vn_XDyRdA";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
