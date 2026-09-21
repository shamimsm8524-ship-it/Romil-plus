import { createClient } from "@supabase/supabase-js";

const url = "https://twcoaflcpllxupnwcbio.supabase.co";
const publishableKey = "sb_publishable_F0UN2n3kgDr2mPKmHrlAFg_m1nvlAaX";

export const supabase = createClient(url, publishableKey);
