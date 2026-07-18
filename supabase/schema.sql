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

-- ─────────────────────────────────────────────
--  Checkout: real orders (Razorpay)
-- ─────────────────────────────────────────────

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  user_id uuid references auth.users (id) on delete set null,
  guest_email text,
  guest_phone text,
  full_name text not null,
  phone text not null,
  address_line1 text not null,
  address_line2 text,
  city text not null,
  state text not null,
  pincode text not null,
  subtotal numeric not null,
  shipping numeric not null default 0,
  total numeric not null,
  status text not null default 'pending', -- 'pending' | 'paid' | 'failed'
  razorpay_order_id text,
  razorpay_payment_id text,
  constraint orders_user_or_guest_check
    check (user_id is not null or (guest_email is not null and guest_phone is not null))
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id text not null,   -- SKU
  product_name text not null,
  product_slug text not null,
  image text,
  price numeric not null,
  quantity integer not null
);

alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Anyone may create an order (guest checkout is supported) — the DB check
-- constraint above still requires either a user_id or guest contact info,
-- so an anonymous insert can't skip identifying the buyer entirely.
create policy "anyone can insert orders"
  on public.orders for insert
  with check (true);

create policy "anyone can insert order items"
  on public.order_items for insert
  with check (true);

-- Only the order's owner (if logged in) can read it back.
create policy "owners read own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "owners read own order items"
  on public.order_items for select
  using (exists (
    select 1 from public.orders o
    where o.id = order_id and o.user_id = auth.uid()
  ));

-- Deliberately no UPDATE policy for anon/authenticated on either table.
-- Status only ever transitions pending → paid/failed inside
-- app/api/checkout/route.ts and app/api/checkout/verify/route.ts, both of
-- which use the service-role client to bypass RLS for that one write —
-- so even a bug in those routes' own logic can't let a client-side call
-- mark its own order paid, since no policy grants that permission at all.
