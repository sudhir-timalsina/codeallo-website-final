export const blogCategories = [
  'Education Technology',
  'Web Development',
  'Artificial Intelligence',
  'School Technology',
  'Teacher Development',
]

const wordsPerMinute = 200
const readingTime = (paragraphs) => {
  const words = paragraphs.join(' ').split(/\s+/).length
  return Math.max(1, Math.round(words / wordsPerMinute))
}

export const blogPosts = [
  {
    slug: 'why-schools-in-nepal-need-a-real-technology-plan',
    title: 'Why Schools in Nepal Need a Real Technology Plan, Not Just a Computer Lab',
    category: 'School Technology',
    tags: ['schools', 'edtech', 'nepal', 'planning'],
    author: 'Codeallo Team',
    publishedAt: '2026-03-04',
    excerpt:
      'A computer lab is not a technology strategy. Here is what actually separates schools that use technology well from schools that just own it.',
    seoDescription:
      'Why owning computers isn\u2019t the same as having a working school technology strategy, and what a realistic plan looks like for schools in Nepal.',
    body: [
      'Most schools we talk to already own some technology: a computer lab, a few laptops for staff, maybe a projector in each classroom. What\u2019s usually missing isn\u2019t hardware — it\u2019s a plan for what that hardware is actually supposed to do.',
      'A technology plan answers a few specific questions. Who is responsible for maintaining the equipment when it breaks? What software are students actually meant to learn, and in what order across grade levels? How does technology show up in lessons that aren\u2019t explicitly "computer class"? Without answers to these, a lab tends to become a room that gets used for an hour a week and otherwise sits idle.',
      'The schools that get real value out of technology usually start smaller than you\u2019d expect. Rather than trying to digitize everything at once, they pick one or two concrete goals — for example, giving every student basic digital literacy by a certain grade, or introducing programming as an elective with a clear curriculum — and build outward from there.',
      'Staff training matters as much as equipment. A lab full of computers is not useful if teachers haven\u2019t been shown how to build it into their subject, not just treated as an separate "IT period". This is one of the most common gaps we see, and one of the easiest to fix with structured training.',
      'If your school already has equipment sitting underused, the fastest path forward usually isn\u2019t buying more — it\u2019s building the plan and training around what you have.',
    ],
  },
  {
    slug: 'what-actually-happens-in-a-website-development-project',
    title: 'What Actually Happens in a Website Development Project (Beyond the Design Mockups)',
    category: 'Web Development',
    tags: ['web development', 'process', 'business'],
    author: 'Codeallo Team',
    publishedAt: '2026-04-18',
    excerpt:
      'Most delays in web projects don\u2019t come from design or code — they come from decisions nobody made early enough. Here\u2019s where that usually happens.',
    seoDescription:
      'A practical look at what actually causes delays in website development projects, and how to plan around them.',
    body: [
      'When people imagine building a website, they usually picture a designer making mockups and a developer turning them into a working site. In practice, the work that determines whether a project goes smoothly happens earlier and is far less visual.',
      'The first real decision point is content. A website can\u2019t be properly designed until someone knows roughly what\u2019s going on each page — and content is almost always the slowest part of any project, because it requires decisions from people who aren\u2019t primarily thinking about the website day to day.',
      'The second is scope. "We also want a blog" or "we\u2019ll need logins eventually" are reasonable requests, but they change the technical foundation of a site significantly. Deciding this upfront, even roughly, avoids rebuilding core pieces halfway through.',
      'The third is who owns the site after launch. A site that nobody can update without calling a developer for every small change tends to go stale within a year. Part of a proper handover is making sure whoever manages the site day-to-day can actually do that independently.',
      'None of this is meant to make a website sound complicated — most projects are genuinely straightforward once these three things are settled early. The complications we see almost always trace back to one of them being left unresolved until it became urgent.',
    ],
  },
  {
    slug: 'how-large-language-models-actually-work-a-plain-explanation',
    title: 'How Large Language Models Actually Work: A Plain Explanation',
    category: 'Artificial Intelligence',
    tags: ['ai', 'llm', 'education'],
    author: 'Codeallo Team',
    publishedAt: '2026-05-27',
    excerpt:
      'Not magic, not a search engine, not a mind. A grounded explanation of what a language model is actually doing when it responds to you.',
    seoDescription:
      'A clear, non-technical explanation of how large language models work, written for students and educators new to AI.',
    body: [
      'A large language model is, at its core, a system trained to predict the next word in a sequence of text, given everything that came before it. That description sounds too simple to explain what these systems can do — but scaled up with enormous amounts of text and computing power, that simple task produces something genuinely capable.',
      'During training, the model is shown huge amounts of text and adjusts billions of internal parameters so its predictions get closer to what actually appears in real writing. It isn\u2019t looking anything up or storing a database of facts in any direct sense — it\u2019s learning statistical patterns in how language is used, which end up encoding a surprising amount of real-world knowledge along the way.',
      'This is also why these systems can be confidently wrong. Because the model is predicting plausible text rather than checking facts against a source, a fluent, well-formed answer and an inaccurate one can look identical on the surface. Understanding this distinction is the single most useful thing to teach students before they start relying on these tools.',
      'For students learning to work with AI, the practical skill isn\u2019t memorizing how transformers work internally — it\u2019s developing the habit of verifying anything that matters, and understanding what kind of tasks these models are actually reliable for versus where they need a human check.',
    ],
  },
  {
    slug: 'teaching-programming-to-absolute-beginners',
    title: 'Teaching Programming to Absolute Beginners: What Actually Works',
    category: 'Teacher Development',
    tags: ['teaching', 'programming', 'curriculum'],
    author: 'Codeallo Team',
    publishedAt: '2026-06-30',
    excerpt:
      'Syntax is not the hard part of learning to code. Here\u2019s what beginners actually struggle with, and how to teach around it.',
    seoDescription:
      'What beginners actually struggle with when learning to program, and practical teaching approaches that address it.',
    body: [
      'When a beginner gets stuck writing their first programs, it\u2019s rarely because they can\u2019t remember the syntax for a loop. It\u2019s because they haven\u2019t yet learned to break a problem down into steps small enough for a computer to follow exactly — a skill that has nothing to do with any particular programming language.',
      'This is why starting with problem decomposition, before or alongside syntax, tends to work better than starting with syntax alone. Simple exercises — describing, in plain language, the exact steps to make a sandwich or find the largest number in a list — build the underlying skill that programming languages later give a name to.',
      'Errors are the other major sticking point. Beginners often treat an error message as a sign of failure rather than information. Teaching students to read an error message line by line, and to treat debugging as a normal, expected part of writing code rather than an exception, removes a lot of the anxiety that causes people to give up early.',
      'Finally, small, quick wins matter more than ambitious projects early on. A student who successfully builds five small, complete programs will generally stay more motivated than one stuck for three weeks on a single complex one.',
    ],
  },
  {
    slug: 'digital-transformation-for-small-organizations-where-to-start',
    title: 'Digital Transformation for Small Organizations: Where to Actually Start',
    category: 'Education Technology',
    tags: ['digital transformation', 'consulting', 'small business'],
    author: 'Codeallo Team',
    publishedAt: '2026-07-22',
    excerpt:
      '"Digital transformation" sounds big. For most small organizations, the real starting point is much smaller than the term suggests.',
    seoDescription:
      'A practical, no-hype starting point for digital transformation in small organizations and businesses.',
    body: [
      'The term "digital transformation" tends to conjure images of large-scale system overhauls, which makes it feel irrelevant or out of reach for a small school, business or office. In practice, meaningful digital transformation for a small organization usually starts with something much more modest: figuring out where information currently lives and how much of it is trapped in a format only one person can access.',
      'A good first exercise is simply mapping your core processes as they exist today — enrollment, billing, scheduling, communication — and noting where each one currently happens. If the honest answer to several of these is "a notebook" or "WhatsApp messages nobody can search later", that\u2019s usually where the highest-value first step is, not a company-wide software rollout.',
      'Sequencing also matters more than ambition. Digitizing one process properly, getting the team comfortable with it, and only then moving to the next tends to succeed far more often than attempting several changes simultaneously.',
      'This is also where an outside technical audit tends to be most useful — not to recommend the most sophisticated tools available, but to help identify, honestly, which one or two changes would actually reduce the most friction first.',
    ],
  },
]

export const getPostBySlug = (slug) => blogPosts.find((p) => p.slug === slug)
export const getPostReadingTime = (post) => readingTime(post.body)
