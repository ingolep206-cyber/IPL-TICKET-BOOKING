import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vkqomgkcvwogivuehmlw.supabase.co";
const supabaseKey = "sb_publishable_uT5EfbXmYNLNbWgOHq3w4w_iV_tCeSD";

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);
