-- ─────────────────────────────────────────────
--  B & B Appliances: initial Supabase schema
--  Run in the SQL editor of your Supabase project
--  (Dashboard → SQL Editor → New query → paste → Run)
-- ─────────────────────────────────────────────

-- Quote requests: future home of the RFQ flow (today the quote form
-- opens WhatsApp; logging submissions here is the next step).
create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid references auth.users (id) on delete set null,
  name text not null,
  company text,
  phone text not null,
  message text,
  items jsonb not null default '[]'::jsonb
);

alter table public.quote_requests enable row level security;

-- Anyone (including anonymous visitors) may submit a quote request…
create policy "anon can insert quote requests"
  on public.quote_requests for insert
  with check (true);

-- …but only the signed-in owner can read their own submissions.
create policy "owners read own quote requests"
  on public.quote_requests for select
  using (auth.uid() = user_id);

-- B2B enquiries, same shape of policy.
create table if not exists public.b2b_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid references auth.users (id) on delete set null,
  name text not null,
  company text not null,
  email text not null,
  phone text,
  requirement text not null
);

alter table public.b2b_enquiries enable row level security;

create policy "anon can insert b2b enquiries"
  on public.b2b_enquiries for insert
  with check (true);

create policy "owners read own b2b enquiries"
  on public.b2b_enquiries for select
  using (auth.uid() = user_id);
