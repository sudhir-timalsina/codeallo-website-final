// Real projects built by Codeallo. Descriptions are kept deliberately
// modest and specific rather than inflated with invented metrics — replace
// `resultNote` with a client-approved quote or number if one is ever
// available, but don't add figures that weren't actually measured.

export const projectCategories = ['Civic Technology', 'EdTech', 'Utility Software']

export const projects = [
  {
    slug: 'tarakeshwor-municipality-digital-portfolio',
    title: 'Digital Portfolio for the Mayor of Tarakeshwor Municipality',
    category: 'Civic Technology',
    clientType: 'Municipal government',
    technologies: ['Next.js', 'Supabase', 'Leaflet'],
    short: 'A trilingual public portfolio and re-election site for a sitting municipal mayor.',
    problem:
      'Tarakeshwor Municipality needed a way to communicate the mayor\u2019s work directly to residents — in a country where local government communication is often limited to physical notices — and to do it in the languages residents actually use.',
    solution:
      'We built a public-facing site presenting the mayor\u2019s work and priorities in English, Nepali and Newari, with an interactive map (built on Leaflet) showing ward-level information and a Supabase-backed contact form so residents could reach the office directly online.',
    result:
      'Delivered as a live, trilingual public site with working contact and mapping functionality, iterated across several versions as requirements developed.',
  },
  {
    slug: 'tarakeshwor-municipal-complaint-portal',
    title: 'Municipal Complaint Portal — Tarakeshwor Municipality',
    category: 'Civic Technology',
    clientType: 'Municipal government',
    technologies: ['Next.js 14', 'Supabase', 'Leaflet'],
    short: 'A digital channel for residents to file and track municipal complaints by location.',
    problem:
      'Residents had no structured digital way to report local issues — road damage, drainage, waste collection — to the municipal office, and the office had no organized way to track what had been reported or resolved.',
    solution:
      'We built an MVP complaint portal where residents submit issues with a location pinned on a map, and municipal staff can view, prioritize and update the status of each complaint from a simple backend, built on Supabase for data storage and authentication.',
    result:
      'Delivered as a working MVP demonstrating the full complaint-to-resolution flow, providing the municipality a foundation to expand into a full production system.',
  },
  {
    slug: 'firta-lost-and-found',
    title: 'Firta — QR-Code Based Lost & Found Platform',
    category: 'Utility Software',
    clientType: 'Independent product',
    technologies: ['React', 'Vite', 'Express', 'Supabase'],
    short: 'A QR-code system letting lost items be reunited with their owners without exchanging contact details directly.',
    problem:
      'When someone loses a personal item — a bag, a laptop, a set of keys — the person who finds it usually has no safe, immediate way to return it without publicly sharing either party\u2019s contact information.',
    solution:
      'Firta lets an owner register an item and attach a unique QR code to it. If the item is lost and found, scanning the code opens a page connecting the finder to the owner through the platform, without ever exposing personal phone numbers or addresses directly.',
    result:
      'Built and deployed as a working full-stack product (React/Vite frontend, Express backend, Supabase database), including resolving real deployment issues around CORS and environment configuration across Vercel and Railway.',
  },
  {
    slug: 'nepal-billing-system',
    title: 'Nepal Billing System with Bikram Sambat Support',
    category: 'Utility Software',
    clientType: 'Independent product',
    technologies: ['Next.js 15', 'Supabase'],
    short: 'A billing and invoicing tool built around Nepal-specific conventions that most generic software ignores.',
    problem:
      'Most billing software available to small Nepali businesses is built around the Gregorian calendar and international invoice formats, which don\u2019t match how invoicing and record-keeping actually work under Nepali tax practice — including PAN-based invoices and the Bikram Sambat calendar.',
    solution:
      'We built a billing system that generates PAN-compliant tax invoices, supports Bikram Sambat dates natively, and reflects local conventions like Lakh/Crore numbering and common local payment methods, backed by Supabase.',
    result:
      'Delivered as a working billing tool with PAN invoice generation and native Bikram Sambat date handling, addressing a gap generic international billing tools don\u2019t cover.',
  },
  {
    slug: 'trail-volunteer-registration',
    title: 'Volunteer Registration Platform — TRAIL Program',
    category: 'EdTech',
    clientType: 'Civic education program',
    technologies: ['Next.js', 'Supabase', 'Row Level Security'],
    short: 'A registration system for a joint Codeallo and Tarakeshwor Municipality volunteer program.',
    problem:
      'The TRAIL program needed a straightforward, secure way for volunteers to register, with appropriate data access controls between applicants, program staff and administrators.',
    solution:
      'We built a registration platform on Supabase with Row Level Security policies enforcing exactly who can see and edit which records, replacing manual, form-based registration with a proper database-backed system.',
    result:
      'Delivered as the registration system used for the program, with access control enforced at the database level rather than only in the application code.',
  },
]

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug)
