import { createClient } from "@supabase/supabase-js";
import backend from "./api";

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
export default backend;
