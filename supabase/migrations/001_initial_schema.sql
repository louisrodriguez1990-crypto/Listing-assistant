-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES (one per auth user / agent)
-- ============================================================
create table if not exists profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  full_name     text,
  phone         text,
  brokerage     text,
  created_at    timestamptz default now()
);

alter table profiles enable row level security;

create policy "profiles: owner" on profiles
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ============================================================
-- SUBSCRIPTIONS (Stripe subscription state)
-- ============================================================
create table if not exists subscriptions (
  id                    uuid primary key default uuid_generate_v4(),
  user_id               uuid not null references auth.users(id) on delete cascade,
  stripe_customer_id    text unique,
  stripe_subscription_id text unique,
  status                text not null default 'inactive',  -- active | inactive | past_due | canceled
  current_period_end    timestamptz,
  created_at            timestamptz default now(),
  updated_at            timestamptz default now()
);

alter table subscriptions enable row level security;

create policy "subscriptions: owner read" on subscriptions
  for select using (auth.uid() = user_id);

-- ============================================================
-- LEADS
-- ============================================================
create table if not exists leads (
  id                  uuid primary key default uuid_generate_v4(),
  agent_id            uuid not null references auth.users(id) on delete cascade,
  name                text not null,
  email               text,
  phone               text,
  property_interest   text,
  source              text default 'webhook',
  status              text not null default 'new',   -- new | contacted | reminder_sent | closed
  email_sent          boolean default false,
  sms_sent            boolean default false,
  reminder_sent       boolean default false,
  notes               text,
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

alter table leads enable row level security;

create policy "leads: owner" on leads
  using (auth.uid() = agent_id)
  with check (auth.uid() = agent_id);

-- Service-role bypass (used by webhook + cron API routes)
-- These routes authenticate via SUPABASE_SERVICE_ROLE_KEY, not JWT

-- ============================================================
-- WEBHOOK TOKENS (per-agent secret for the lead intake URL)
-- ============================================================
create table if not exists webhook_tokens (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade unique,
  token       text not null unique default encode(gen_random_bytes(32), 'hex'),
  created_at  timestamptz default now()
);

alter table webhook_tokens enable row level security;

create policy "webhook_tokens: owner" on webhook_tokens
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Auto-create profile and subscription rows on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, full_name)
    values (new.id, new.raw_user_meta_data->>'full_name');

  insert into subscriptions (user_id)
    values (new.id);

  insert into webhook_tokens (user_id)
    values (new.id);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Timestamp updater
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger leads_updated_at before update on leads
  for each row execute procedure update_updated_at();

create trigger subscriptions_updated_at before update on subscriptions
  for each row execute procedure update_updated_at();
