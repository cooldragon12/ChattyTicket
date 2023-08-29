"use client"
import type { Database } from "@/types/database.types";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl ='https://cgkiswplmxildebezrev.supabase.co';
// @ts-ignore
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase_client = createClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
) 

