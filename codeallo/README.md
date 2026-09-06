# Codeallo — Company Website

The official website for **Codeallo Education and Technologies Pvt. Ltd.** — an
EdTech and technology company based in Kathmandu, Nepal, teaching programming
and digital skills and building websites, apps and software for schools,
institutions and businesses.

---

## 1. Overview

This is a React single-page application covering:

- A full marketing site (home, about, services, courses, schools, teachers,
  projects/case studies, blog, contact, legal pages)
- Supabase-backed authentication (register, login, password reset)
- A protected student dashboard
- A protected admin dashboard for managing courses, blog posts, projects,
  testimonials, contact leads, enrollments and users
- SEO metadata, JSON-LD structured data, a sitemap and robots.txt

## 2. Tech stack

| Layer      | Choice |
|------------|--------|
| Frontend   | React 19 + Vite, React Router 7 |
| Styling    | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Icons      | lucide-react |
| SEO        | react-helmet-async |
| Backend    | Supabase (Postgres, Auth, Row Level Security) |
| Deployment | Vercel (frontend) + Supabase (backend) |

## 3. Project structure

```
src/
  components/
    ui/          Generic building blocks (Button, Modal, FormField, etc.)
    layout/      Navbar, Footer, Logo
    sections/    Page-section components (Hero, CourseCard, CTASection, ...)
    admin/       Admin-only components (AdminResourceTable)
    Seo.jsx      Per-page <head> metadata via react-helmet-async
  layouts/       SiteLayout (public) and AdminLayout (dashboard)
  pages/         One file per route (see routing table below)
    auth/        Login, Register, ForgotPassword
    admin/       Admin dashboard screens
  routes/        ProtectedRoute and AdminRoute guards
  hooks/         useAuth.jsx (Supabase auth/session context)
  data/          Static content: services, courses, blog posts, projects
  lib/           supabaseClient.js, siteConfig.js (contact info, etc.)
supabase/
  schema.sql     Full database schema + Row Level Security policies
public/
  robots.txt, sitemap.xml, logo.png
```

### Why some content is in `src/data/` instead of Supabase

Services, courses, blog posts and projects currently render from static
JS files in `src/data/`. This was a deliberate choice so the site is
**fully functional and fast on day one**, without requiring content to be
entered into Supabase before launch. The `courses`, `blog_posts`,
`projects` and `testimonials` tables in `supabase/schema.sql` are ready to
receive real content and the admin dashboard already writes to them — the
one remaining step, whenever you're ready to make content fully
CMS-driven, is swapping the `import { services } from '../data/services.js'`
style imports on the public pages for a Supabase query
(`supabase.from('courses').select('*')`, etc.). Until then, admin-created
rows are stored correctly but the public site won't display them —
this is intentional and documented on the admin overview page too.

Testimonials are the exception: `src/data/testimonials.js` is
intentionally **empty**. There were no real, attributable testimonials
available at build time, and inventing quotes would be worse than
showing an honest empty state. Add real testimonials through the admin
dashboard (`/admin/testimonials`, status `approved`) and they'll need the
same data-source swap described above to appear publicly.

## 4. Getting started

```bash
npm install
cp .env.example .env
# fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env
npm run dev
```

The site runs and looks complete even without Supabase configured — only
authentication, the contact form, and admin features require it.

## 5. Environment variables

See `.env.example`. Only two variables are required:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY` (the **public anon key**, never the service-role key)

**Never** put the Supabase service-role key in this project. It must never
reach the browser bundle. If you need service-role access (e.g. for a
future server-side script), keep it in a separate, server-only environment.

## 6. Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor → New query**, paste the entire contents of
   `supabase/schema.sql`, and run it. This creates all tables, the
   `handle_new_user` trigger (auto-creates a profile row on signup), and
   every Row Level Security policy.
3. Copy your project's URL and anon key into `.env` (Project Settings → API).
4. (Optional) Go to **Authentication → URL Configuration** and set your
   site URL so password-reset emails link back correctly.

### Database tables

| Table | Purpose |
|---|---|
| `profiles` | One row per user, auto-created on signup. Holds `role` (`student` / `admin`). |
| `courses` | Course catalog. |
| `enrollments` | Links a user to a course with a status. |
| `blog_categories` | Fixed list of blog categories. |
| `blog_posts` | Blog content, references a category. |
| `projects` | Case studies. |
| `testimonials` | Client/student testimonials, gated by `status = 'approved'`. |
| `contact_submissions` | Leads from the contact form and course/service interest forms. |

## 7. Authentication & admin setup

Authentication uses Supabase Auth directly (no custom backend).

**To create your first admin accounts:**

1. Have each person sign up normally at `/register` with their real email.
   A row is created for them automatically in `profiles` with `role = 'student'`.
2. In the Supabase SQL editor, run:

   ```sql
   update public.profiles set role = 'admin'
     where email in (
       'sudhirtimalsina419@gmail.com',
       'bhattaraihrithik38@gmail.com',
       'sampannathapa182@gmail.com',
       'utkristaadhikari500@gmail.com'
     );
   ```

3. Those accounts can now log in at `/login` and will land in `/admin`
   instead of the student `/dashboard`.

The `AdminRoute` guard in `src/routes/AdminRoute.jsx` only controls what
the browser *renders*. The actual security boundary is the Row Level
Security policies in `supabase/schema.sql` — never rely on frontend
checks alone for authorization.

## 8. Adding content

### Adding a course
Either:
- Add an entry to the `courses` array in `src/data/courses.js` (shows up
  immediately, no Supabase needed), **or**
- Add a row via `/admin/courses` in the dashboard (stored in Supabase,
  requires the data-source swap described in section 3 to appear publicly).

### Adding a blog post
Same two options — `src/data/blogPosts.js`, or `/admin/blog`.

### Adding a project / case study
Same pattern — `src/data/projects.js`, or `/admin/projects`. Keep results
honest and specific; avoid invented statistics.

## 9. Development & production build

```bash
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## 10. Deployment

**Frontend (Vercel):**
1. Push this project to a Git repository.
2. Import it into Vercel.
3. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment
   variables in the Vercel project settings.
4. Deploy. Vite's default build command and output directory (`dist`)
   work with Vercel's auto-detection.

**Backend:** Supabase is already hosted — no separate deployment step
beyond running `supabase/schema.sql` once (section 6).

Once you have a live domain, update `url` in `src/lib/siteConfig.js` and
regenerate `public/sitemap.xml` (`robots.txt` already points at
`/sitemap.xml` on whatever domain it's served from).

## 11. SEO

- Every page sets its own title, meta description and canonical URL via
  `src/components/Seo.jsx` (react-helmet-async).
- JSON-LD structured data is included for the Organization (homepage),
  Course (course pages), Service (service pages), Article (blog posts)
  and BreadcrumbList (every page with breadcrumbs).
- `public/sitemap.xml` lists all static and current dynamic routes.
  Regenerate it (or replace with a build-time script) whenever you add
  new courses, services, projects or blog posts.
- `public/robots.txt` disallows crawling of `/admin`, `/dashboard` and
  the auth pages.

## 12. Security considerations

- The Supabase **anon key** is safe to expose in the frontend by design —
  it only grants access allowed by Row Level Security policies. The
  **service-role key** is never used or stored in this project.
- All write access to `courses`, `blog_posts`, `projects` and
  `testimonials` requires `profiles.role = 'admin'`, enforced at the
  database level via RLS — not just hidden in the UI.
- Anyone can `insert` into `contact_submissions` (so the public contact
  form works without login), but only admins can `select` from it.
- `AdminRoute` and `ProtectedRoute` (in `src/routes/`) are UX
  conveniences only. Treat Row Level Security as the actual boundary.

## 13. Accessibility & performance notes

- Semantic landmarks, a "skip to content" link, visible focus states,
  and `prefers-reduced-motion` support are built into `src/index.css`.
- Admin and dashboard routes are code-split with `React.lazy` so
  logged-out visitors never download that code.
- Icons are imported individually (not via a wildcard `import *`) to
  keep the bundle lean.

## 14. What's intentionally left as a placeholder

- `src/lib/siteConfig.js` → `url` is a placeholder domain
  (`https://codeallo.com.np`) pending a confirmed domain purchase.
  Update it there (and in `public/sitemap.xml`) once confirmed.
- Social media links in `siteConfig.js` are empty and simply don't
  render in the footer until filled in.
- No client testimonials are included (see section 3).
