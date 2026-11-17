-- =====================================================================
-- TRAVELVERSE DATABASE SCHEMA & POLICIES (Supabase PostgreSQL)
-- =====================================================================

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. ENUMS
do $$ begin
  create type booking_status as enum ('confirmed', 'pending', 'cancelled', 'completed', 'refunded');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type item_type as enum ('flight', 'hotel', 'package', 'car');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type user_role as enum ('customer', 'admin', 'agent');
exception
  when duplicate_object then null;
end $$;

-- 3. PROFILES TABLE
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  phone text,
  role user_role default 'customer',
  avatar_url text,
  preferred_currency text default 'PKR',
  passport_number text,
  nationality text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. BOOKINGS TABLE
create table if not exists public.bookings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  booking_reference text not null unique,
  item_type item_type not null,
  item_id text not null,
  item_title text not null,
  item_details jsonb not null default '{}'::jsonb,
  passengers jsonb not null default '[]'::jsonb,
  contact_info jsonb not null default '{}'::jsonb,
  supplier_currency text not null default 'USD',
  supplier_price numeric(12, 2) not null,
  charged_currency text not null default 'PKR',
  charged_price numeric(14, 2) not null,
  exchange_rate numeric(10, 4) not null default 1.0,
  exchange_timestamp timestamp with time zone default timezone('utc'::text, now()),
  status booking_status not null default 'confirmed',
  is_demo boolean not null default true,
  payment_method text not null default 'credit_card',
  payment_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. WISHLIST TABLE
create table if not exists public.wishlist (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  item_type item_type not null,
  item_id text not null,
  item_data jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, item_type, item_id)
);

-- 6. DESTINATIONS TABLE
create table if not exists public.destinations (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  name text not null,
  country text not null,
  continent text not null,
  hero_image text not null,
  gallery text[] default '{}',
  description text not null,
  top_attractions jsonb default '[]'::jsonb,
  best_time_to_visit text,
  visa_info text,
  currency text,
  average_cost_pkr numeric(12, 2),
  rating numeric(3, 1) default 4.8,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. REVIEWS TABLE
create table if not exists public.reviews (
  id uuid default gen_random_uuid() primary key,
  item_type item_type not null,
  item_id text not null,
  user_name text not null,
  user_avatar text,
  rating numeric(2, 1) not null check (rating >= 1 and rating <= 5),
  title text,
  comment text not null,
  verified boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. ROW LEVEL SECURITY (RLS) POLICIES
alter table public.profiles enable row level security;
alter table public.bookings enable row level security;
alter table public.wishlist enable row level security;
alter table public.destinations enable row level security;
alter table public.reviews enable row level security;

-- Profiles: Users can read and update their own profiles
create policy "Public profiles are viewable by owner" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Bookings: Users can view their own bookings; Admins can view all
create policy "Users can view own bookings" on public.bookings
  for select using (auth.uid() = user_id or auth.jwt()->>'role' = 'admin');

create policy "Users can create own bookings" on public.bookings
  for insert with check (auth.uid() = user_id or user_id is null);

-- Wishlist: Users can view and manage their own wishlist
create policy "Users can view own wishlist" on public.wishlist
  for select using (auth.uid() = user_id);

create policy "Users can insert to wishlist" on public.wishlist
  for insert with check (auth.uid() = user_id);

create policy "Users can delete from wishlist" on public.wishlist
  for delete using (auth.uid() = user_id);

-- Destinations & Reviews are publicly readable
create policy "Destinations are publicly readable" on public.destinations
  for select using (true);

create policy "Reviews are publicly readable" on public.reviews
  for select using (true);

