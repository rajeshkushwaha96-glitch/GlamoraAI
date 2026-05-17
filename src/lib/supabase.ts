import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fail-safe initialization to prevent crashing the app if environment variables are missing.
// Requests will naturally fail if these are placeholders, which is handled in the UI/Services.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

/*
  SQL Setup for Supabase:
  
  1. Create the 'users' table:
     create table users (
       id text primary key,
       email text unique not null,
       credits integer default 5,
       is_premium boolean default false,
       created_at timestamp with time zone default now()
     );

  2. Create the 'use_credit' RPC function:
     create or replace function use_credit(user_id text)
     returns void as $$
     begin
       update users
       set credits = credits - 1
       where id = user_id and credits > 0;
     end;
     $$ language plpgsql;
*/
