-- Users table: stores name, surname, email, picture from login (e.g. Google OAuth)
-- Run this in Supabase Dashboard → SQL Editor, or via Supabase CLI.

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  surname text,
  picture text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for lookups by email (used on upsert)
create index if not exists users_email_idx on public.users (email);

-- Optional: updated_at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists users_updated_at on public.users;
create trigger users_updated_at
  before update on public.users
  for each row execute function public.set_updated_at();

-- Optional: allow service role full access (your API uses service role key)
-- No RLS needed if you only access via service role; uncomment to enable RLS and policies:
-- alter table public.users enable row level security;
-- create policy "Service role can do anything" on public.users
--   for all using (true) with check (true);

comment on table public.users is 'Users synced from login (e.g. Google OAuth): name, surname, email, picture.';
