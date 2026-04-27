-- Digital Chef MVP Schema
-- Paste this script into the Supabase SQL Editor and click "Run"

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  role text not null default 'customer', -- 'customer', 'chef', 'admin'
  full_name text,
  avatar_url text,
  bio text,
  hourly_rate numeric,
  is_verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
  id uuid default gen_random_uuid() primary key,
  customer_id uuid references public.profiles(id) not null,
  chef_id uuid references public.profiles(id) not null,
  event_date timestamp with time zone not null,
  guest_count integer not null,
  status text not null default 'pending_chef_approval', -- 'pending_chef_approval', 'confirmed', 'completed', 'cancelled'
  total_price numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own bookings" ON public.bookings FOR SELECT USING (auth.uid() = customer_id OR auth.uid() = chef_id);
CREATE POLICY "Customers can insert bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Chefs can update booking statuses" ON public.bookings FOR UPDATE USING (auth.uid() = chef_id OR auth.uid() = customer_id);

-- 3. Verifications Table
CREATE TABLE IF NOT EXISTS public.verifications (
  id uuid default gen_random_uuid() primary key,
  chef_id uuid references public.profiles(id) not null,
  status text not null default 'pending', -- 'pending', 'approved', 'rejected'
  type text not null, -- 'id_check', 'certificate'
  submitted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Verifications
ALTER TABLE public.verifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Chefs can view and insert own verifications" ON public.verifications FOR ALL USING (auth.uid() = chef_id);
-- Admins will bypass RLS or use a secure admin role to approve verifications.
