// Static content for the technology-services side of Codeallo. In
// production this can be mirrored into the `projects`/CMS tables if you
// want services to be editable from the admin dashboard — for now it lives
// in code because service descriptions change far less often than courses
// or blog posts.

export const services = [
  {
    slug: 'web-development',
    icon: 'Globe',
    title: 'Website Development',
    short: 'Fast, well-structured websites built to represent your organization properly online.',
    summary:
      'We design and build websites for schools, institutions and businesses — from a simple institutional site to a content-managed platform with a blog, forms and an admin dashboard.',
    whoFor: ['Schools and institutions', 'Small and growing businesses', 'Founders launching a new venture'],
    included: [
      'Information architecture and page planning',
      'Custom design in your brand, not a generic template',
      'Responsive build tested across mobile, tablet and desktop',
      'Basic on-page SEO: metadata, sitemap, structured data',
      'A short handover session so your team can update content',
    ],
    process: [
      'We start by understanding who the site needs to speak to and what it needs to make happen — enrollment, enquiries, credibility.',
      'We map the pages and content before any design work begins, so the structure is right first.',
      'We design and build in stages, sharing progress as we go rather than disappearing until a big reveal.',
      'We test on real devices, fix what breaks, and hand over a site you can actually maintain.',
    ],
  },
  {
    slug: 'app-development',
    icon: 'Smartphone',
    title: 'App Development',
    short: 'Web and mobile applications built around a specific workflow, not a generic template.',
    summary:
      'When a website isn\u2019t enough — when you need accounts, dashboards, data, or a workflow specific to how your organization operates — we build a proper application around it.',
    whoFor: ['Organizations digitizing a manual process', 'Municipalities and public offices', 'Businesses that need an internal tool or client portal'],
    included: [
      'A working data model designed around your actual process',
      'User accounts, roles and permissions where relevant',
      'A dashboard or admin panel for the people who run it day to day',
      'Deployment and basic monitoring once it\u2019s live',
    ],
    process: [
      'We map the workflow as it actually happens today, including the messy parts.',
      'We design the data model and screens together, so the technical shape matches the real process.',
      'We build in working increments you can test early, not one long build in isolation.',
      'We deploy, document, and stay reachable for the first weeks of real use.',
    ],
  },
  {
    slug: 'it-services',
    icon: 'ServerCog',
    title: 'IT Services',
    short: 'Practical, ongoing technology support for organizations that don\u2019t have an in-house team.',
    summary:
      'From setting up systems correctly the first time to keeping them running, we act as a technology partner for organizations that need reliable IT support without hiring a full department.',
    whoFor: ['Schools without dedicated IT staff', 'Small offices and organizations', 'Teams outgrowing ad-hoc technology setups'],
    included: [
      'System and network setup guidance',
      'Software selection and configuration',
      'Ongoing troubleshooting and support',
      'Documentation so your team isn\u2019t dependent on any one person',
    ],
    process: [
      'We audit what\u2019s currently in place and where it\u2019s causing friction.',
      'We recommend fixes in order of impact, not just a long wish list.',
      'We implement changes with minimal disruption to day-to-day work.',
      'We stay on as a point of contact for what comes up after.',
    ],
  },
  {
    slug: 'edtech-solutions',
    icon: 'GraduationCap',
    title: 'Education Technology Solutions',
    short: 'Technology built specifically for how schools and educational institutions actually operate.',
    summary:
      'We design digital tools for the realities of a school: student records, communication with parents, learning materials, and the administrative work that surrounds teaching.',
    whoFor: ['Schools and colleges', 'Coaching centers and training institutes', 'Education-focused organizations and NGOs'],
    included: [
      'Student and academic record systems',
      'Communication tools for parents, teachers and administration',
      'Learning material organization and delivery',
      'Reporting for school leadership',
    ],
    process: [
      'We spend time understanding the school\u2019s existing routines before proposing a system.',
      'We prioritize what genuinely reduces administrative load first.',
      'We build with the people who\u2019ll use it daily, not just the people who commission it.',
      'We train staff on the system before calling the project finished.',
    ],
  },
  {
    slug: 'consulting',
    icon: 'Compass',
    title: 'Technology Consulting',
    short: 'Independent, practical guidance on the technology decisions that are hard to get right alone.',
    summary:
      'Digital auditing, technology strategy, AI adoption and cybersecurity guidance for organizations that need an outside technical perspective before committing budget or direction.',
    whoFor: ['Business owners planning a digital investment', 'Organizations evaluating AI or automation', 'Teams that need a second opinion on security or architecture'],
    included: [
      'A digital audit of your current systems and processes',
      'Clear, prioritized recommendations — not just a list of problems',
      'Guidance on AI adoption where it genuinely fits your operations',
      'A cybersecurity review of your exposure and practical next steps',
    ],
    process: [
      'We start with a structured audit of what you have and how it\u2019s actually used.',
      'We separate what\u2019s urgent from what\u2019s merely interesting.',
      'We give you a plan you could hand to any developer or team to execute.',
      'We\u2019re available to advise through implementation if you want us to stay involved.',
    ],
  },
  {
    slug: 'software-development',
    icon: 'Code2',
    title: 'Software Development',
    short: 'Custom software for a specific operational need, built and maintained properly.',
    summary:
      'Beyond websites and apps, we build the underlying software organizations need to run internal operations — from data processing tools to bespoke management systems.',
    whoFor: ['Organizations with a specific operational bottleneck', 'Businesses replacing spreadsheets with real systems'],
    included: [
      'Requirements and technical scoping',
      'Custom-built software matched to your workflow',
      'Testing and documentation',
      'Ongoing maintenance options',
    ],
    process: [
      'We scope the problem precisely before writing a line of code.',
      'We build iteratively and show working versions along the way.',
      'We test against real scenarios, not just the happy path.',
      'We hand over documentation your team can actually use.',
    ],
  },
  {
    slug: 'ui-ux-design',
    icon: 'PenTool',
    title: 'UI/UX Design',
    short: 'Interface design grounded in how people will actually use the product.',
    summary:
      'We design interfaces for websites, apps and internal tools with a focus on clarity and usability first — the visual language comes from the product\u2019s purpose, not a template.',
    whoFor: ['Teams building a new product', 'Organizations redesigning an outdated system'],
    included: [
      'User flow and information architecture',
      'Wireframes and high-fidelity design',
      'A design system your developers can build from consistently',
    ],
    process: [
      'We map how people will actually move through the product.',
      'We design low-fidelity first to get structure right before polish.',
      'We refine visual design once the flow is validated.',
      'We hand off design files and specifications developers can implement directly.',
    ],
  },
  {
    slug: 'business-automation',
    icon: 'Workflow',
    title: 'Business Automation',
    short: 'Removing repetitive manual work from your team\u2019s day with the right tools and integrations.',
    summary:
      'We identify the repetitive, error-prone parts of your operations and automate them — connecting the tools you already use or building small internal systems where nothing off-the-shelf fits.',
    whoFor: ['Growing businesses drowning in manual admin', 'Teams juggling disconnected tools'],
    included: [
      'A review of repetitive manual processes',
      'Integrations between existing tools where possible',
      'Custom internal tooling where no existing tool fits',
    ],
    process: [
      'We identify where time is actually being lost.',
      'We look for the simplest fix before building something new.',
      'We implement and test alongside the people doing the work today.',
      'We document the new process so it survives staff changes.',
    ],
  },
]

export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug)
