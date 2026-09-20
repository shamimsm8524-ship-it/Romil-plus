import { createClient } from "@supabase/supabase-js";

const url = "https://onvdcaohnftrjunwdvjp.supabase.co";
const publishableKey = "sb_publishable_bz2z5uglf_EALJezqv4rCw_S73GMNrh";

export const supabase = createClient(url, publishableKey);
