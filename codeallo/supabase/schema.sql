-- =============================================================================
-- Codeallo — Supabase schema
-- =============================================================================
-- Run this in the Supabase SQL editor (Project → SQL Editor → New query) on a
-- fresh project. It is safe to run once; re-running will error on the
-- `create table` statements because objects already exist — drop tables
-- first if you need to reset during development.
--
-- Order matters: profiles first (referenced by enrollments), then content
-- tables, then policies, then the seed/admin section at the bottom.
-- =============================================================================

-- Required for gen_random_uuid()
create extension if not exists "pgcrypto";

-- -----------------------------------------------------------------------------
-- 1. PROFILES
-- -----------------------------------------------------------------------------
-- One row per authenticated user, created automatically by the trigger below
-- whenever someone signs up through Supabase Auth.
create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text,
  email       text,
  phone       text,
  role        text not null default 'student' check (role in ('student', 'admin')),
  created_at  timestamptz not null default now()
);

-- Auto-create a profile row whenever a new auth user is created, copying
-- their name (if provided at signup) and email.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Security-definer helper so other tables' RLS policies can check
-- "is this user an admin?" without re-triggering RLS recursively on
-- `profiles` itself.
create function public.is_admin(uid uuid)
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.profiles where id = uid and role = 'admin'
  );
$$;

-- -----------------------------------------------------------------------------
-- 2. COURSES
-- -----------------------------------------------------------------------------
create table public.courses (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  description text not null,
  category    text not null,
  level       text not null,
  duration    text,
  delivery    text,
  image       text,
  status      text not null default 'upcoming' check (status in ('upcoming', 'open', 'closed')),
  instructor  text,
  created_at  timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- 3. ENROLLMENTS
-- -----------------------------------------------------------------------------
create table public.enrollments (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles (id) on delete cascade,
  course_id   uuid not null references public.courses (id) on delete cascade,
  status      text not null default 'interested'
              check (status in ('interested', 'confirmed', 'active', 'completed', 'cancelled')),
  created_at  timestamptz not null default now(),
  unique (user_id, course_id)
);

-- -----------------------------------------------------------------------------
-- 4. BLOG
-- -----------------------------------------------------------------------------
create table public.blog_categories (
  name text primary key,
  slug text not null unique
);

insert into public.blog_categories (name, slug) values
  ('Technology', 'technology'),
  ('Web Development', 'web-development'),
  ('App Development', 'app-development'),
  ('Artificial Intelligence', 'artificial-intelligence'),
  ('Machine Learning', 'machine-learning'),
  ('Data Science', 'data-science'),
  ('Cybersecurity', 'cybersecurity'),
  ('Robotics', 'robotics'),
  ('IoT', 'iot'),
  ('Education Technology', 'education-technology'),
  ('Teacher Development', 'teacher-development'),
  ('School Technology', 'school-technology'),
  ('Programming', 'programming'),
  ('Digital Transformation', 'digital-transformation');

create table public.blog_posts (
  id               uuid primary key default gen_random_uuid(),
  title            text not null,
  slug             text not null unique,
  content          text not null,
  excerpt          text,
  cover_image      text,
  author           text not null default 'Codeallo Team',
  category         text references public.blog_categories (name) on update cascade,
  tags             text[] not null default '{}',
  status           text not null default 'draft' check (status in ('draft', 'published')),
  seo_title        text,
  seo_description  text,
  published_at     timestamptz,
  updated_at       timestamptz not null default now(),
  created_at       timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- 5. PROJECTS
-- -----------------------------------------------------------------------------
create table public.projects (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  slug          text not null unique,
  description   text not null,
  category      text not null,
  technologies  text[] not null default '{}',
  images        text[] not null default '{}',
  client_type   text,
  case_study    text,
  status        text not null default 'draft' check (status in ('draft', 'published')),
  created_at    timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- 6. TESTIMONIALS
-- -----------------------------------------------------------------------------
create table public.testimonials (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  role          text,
  organization  text,
  testimonial   text not null,
  image         text,
  status        text not null default 'pending' check (status in ('pending', 'approved', 'hidden')),
  created_at    timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- 7. CONTACT SUBMISSIONS (leads)
-- -----------------------------------------------------------------------------
create table public.contact_submissions (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null,
  phone         text,
  organization  text,
  service       text,
  message       text not null,
  status        text not null default 'new' check (status in ('new', 'in_progress', 'closed')),
  created_at    timestamptz not null default now()
);

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================

alter table public.profiles              enable row level security;
alter table public.courses               enable row level security;
alter table public.enrollments           enable row level security;
alter table public.blog_categories       enable row level security;
alter table public.blog_posts            enable row level security;
alter table public.projects              enable row level security;
alter table public.testimonials          enable row level security;
alter table public.contact_submissions   enable row level security;

-- --- profiles -----------------------------------------------------------
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin(auth.uid()));

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id or public.is_admin(auth.uid()));

-- Note: there is intentionally no public INSERT policy on profiles — rows
-- are only ever created by the handle_new_user() trigger, which runs as
-- SECURITY DEFINER and bypasses RLS.

-- --- courses --------------------------------------------------------------
create policy "Anyone can view courses"
  on public.courses for select
  using (true);

create policy "Admins can manage courses"
  on public.courses for all
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- --- enrollments ------------------------------------------------------------
create policy "Users can view their own enrollments"
  on public.enrollments for select
  using (auth.uid() = user_id or public.is_admin(auth.uid()));

create policy "Users can enroll themselves"
  on public.enrollments for insert
  with check (auth.uid() = user_id);

create policy "Admins can manage all enrollments"
  on public.enrollments for update
  using (public.is_admin(auth.uid()));

create policy "Admins can delete enrollments"
  on public.enrollments for delete
  using (public.is_admin(auth.uid()));

-- --- blog_categories --------------------------------------------------------
create policy "Anyone can view blog categories"
  on public.blog_categories for select
  using (true);

create policy "Admins can manage blog categories"
  on public.blog_categories for all
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- --- blog_posts ---------------------------------------------------------
create policy "Anyone can view published posts"
  on public.blog_posts for select
  using (status = 'published' or public.is_admin(auth.uid()));

create policy "Admins can manage blog posts"
  on public.blog_posts for all
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- --- projects -------------------------------------------------------------
create policy "Anyone can view published projects"
  on public.projects for select
  using (status = 'published' or public.is_admin(auth.uid()));

create policy "Admins can manage projects"
  on public.projects for all
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- --- testimonials ---------------------------------------------------------
create policy "Anyone can view approved testimonials"
  on public.testimonials for select
  using (status = 'approved' or public.is_admin(auth.uid()));

create policy "Admins can manage testimonials"
  on public.testimonials for all
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- --- contact_submissions ---------------------------------------------------
-- Anyone (including anonymous visitors) can submit the contact form, but
-- only admins can ever read the submissions back.
create policy "Anyone can submit a contact form"
  on public.contact_submissions for insert
  with check (true);

create policy "Admins can view contact submissions"
  on public.contact_submissions for select
  using (public.is_admin(auth.uid()));

create policy "Admins can update contact submissions"
  on public.contact_submissions for update
  using (public.is_admin(auth.uid()));

-- =============================================================================
-- SEEDING ADMIN ACCOUNTS
-- =============================================================================
-- Supabase Auth users cannot be created directly with plain SQL inserts (the
-- password needs to go through Supabase's own auth flow). Instead:
--
--   1. Have each person sign up normally at /register with their real email.
--   2. Once each account exists (check the `profiles` table — a row is
--      created automatically), run the following to promote them to admin:
--
-- update public.profiles set role = 'admin'
--   where email in (
--     'sudhirtimalsina419@gmail.com',
--     'bhattaraihrithik38@gmail.com',
--     'sampannathapa182@gmail.com',
--     'utkristaadhikari500@gmail.com'
--   );
--
-- After this runs, those four accounts can log in normally and will be
-- redirected into /admin instead of the student /dashboard.
