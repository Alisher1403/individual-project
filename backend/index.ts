import { createClient } from "@supabase/supabase-js";
import backend from "./api";

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const imagesBucket =
  "https://kjsfqgfzntyeblrnbjpi.supabase.co/storage/v1/object/public/images/";

export { supabase, imagesBucket };
export default backend;
