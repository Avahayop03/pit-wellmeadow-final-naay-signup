import { createClient } from "@supabase/supabase-js";

  const base_url = import.meta.env.VITE_BASE_URL;
  const key = import.meta.env.VITE_SUPABASE_KEY;

  const supabase = createClient(base_url, key);

export default supabase;