// Course catalog. `status: 'upcoming'` reflects that Codeallo does not have
// a live running batch yet — pages invite people to register interest
// rather than claiming an active enrollment, in line with not inventing
// facts that aren't true yet. Update `status` to 'open' per course once a
// batch is actually scheduled, and this can migrate to the `courses` table
// in Supabase (see supabase/schema.sql) once the CMS is in active use.

export const courseCategories = [
  'Free & Certified',
  'Programming',
  'Web Development',
  'Artificial Intelligence',
  'Data & Security',
]

export const courses = [
  {
    slug: 'programming',
    title: 'Programming Fundamentals',
    category: 'Programming',
    level: 'Beginner',
    duration: '8 weeks',
    delivery: 'In-person & online',
    status: 'upcoming',
    short: 'The logic and problem-solving foundation every other course builds on.',
    description:
      'A first course in how to think like a programmer — variables, control flow, functions and problem decomposition — using small, concrete projects instead of abstract theory. Built for students and career-switchers with no prior coding background.',
    outcomes: [
      'Read and write basic programs confidently in a general-purpose language',
      'Break a problem down into steps before writing any code',
      'Debug your own code methodically instead of guessing',
      'A foundation ready for Python, JavaScript, or Web Development next',
    ],
  },
  {
    slug: 'python',
    title: 'Python',
    category: 'Programming',
    level: 'Beginner to Intermediate',
    duration: '10 weeks',
    delivery: 'In-person & online',
    status: 'upcoming',
    short: 'Practical Python for scripting, data work and a runway into AI and data science.',
    description:
      'Python taught the way it\u2019s actually used — automating small tasks, working with data, and writing clean, readable code — building toward the foundation needed for Data Science, Machine Learning or AI courses.',
    outcomes: [
      'Write clean, idiomatic Python for real tasks, not just exercises',
      'Work comfortably with files, data structures and third-party libraries',
      'Build small automation and data-processing scripts independently',
      'Be ready to move into Data Science or Machine Learning',
    ],
  },
  {
    slug: 'javascript',
    title: 'JavaScript',
    category: 'Programming',
    level: 'Beginner to Intermediate',
    duration: '10 weeks',
    delivery: 'In-person & online',
    status: 'upcoming',
    short: 'The language of the web — from browser basics to modern JavaScript.',
    description:
      'From core language fundamentals to how JavaScript actually runs in the browser, this course builds toward being able to add real interactivity to websites and prepares students for the Web Development course.',
    outcomes: [
      'Understand core JavaScript: functions, scope, arrays, objects, async code',
      'Manipulate web pages directly using the DOM',
      'Debug JavaScript using browser developer tools',
      'Be ready for React and modern frontend frameworks',
    ],
  },
  {
    slug: 'web-development',
    title: 'Web Development',
    category: 'Web Development',
    level: 'Intermediate',
    duration: '12 weeks',
    delivery: 'In-person & online',
    status: 'upcoming',
    short: 'Full-stack web development — from a static page to a deployed, database-backed site.',
    description:
      'A project-based path through HTML, CSS, JavaScript, a modern frontend framework and a backend with a real database, ending with students deploying a complete project of their own.',
    outcomes: [
      'Build responsive, accessible websites from scratch',
      'Work with a modern frontend framework (React)',
      'Connect a frontend to a real backend and database',
      'Deploy a finished project live on the internet',
    ],
  },
  {
    slug: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    category: 'Artificial Intelligence',
    level: 'Intermediate',
    duration: '10 weeks',
    delivery: 'In-person & online',
    status: 'upcoming',
    short: 'A grounded introduction to how AI systems actually work and where they fit.',
    description:
      'Covers the core ideas behind modern AI — search, reasoning, neural networks and how large language models work — with an emphasis on understanding the mechanics rather than treating AI as a black box.',
    outcomes: [
      'Explain how modern AI systems, including LLMs, actually work',
      'Distinguish where AI genuinely helps from where it\u2019s hype',
      'Build small AI-assisted projects using existing tools and APIs',
      'A foundation for further study in Machine Learning',
    ],
  },
  {
    slug: 'machine-learning',
    title: 'Machine Learning',
    category: 'Artificial Intelligence',
    level: 'Intermediate to Advanced',
    duration: '12 weeks',
    delivery: 'In-person & online',
    status: 'upcoming',
    short: 'From core ML concepts to training and evaluating your own models.',
    description:
      'Supervised and unsupervised learning, model evaluation, and the practical workflow of preparing data, training models and interpreting results — grounded in Python and real datasets throughout.',
    outcomes: [
      'Understand and apply core supervised and unsupervised learning methods',
      'Prepare and clean real-world datasets for modeling',
      'Evaluate models honestly, including their limitations',
      'Complete an end-to-end ML project from data to results',
    ],
  },
  {
    slug: 'data-science',
    title: 'Data Science',
    category: 'Data & Security',
    level: 'Intermediate',
    duration: '10 weeks',
    delivery: 'In-person & online',
    status: 'upcoming',
    short: 'Turning raw data into decisions — analysis, visualization and communication.',
    description:
      'A practical course in the full data science workflow: cleaning messy data, exploratory analysis, visualization, and communicating findings clearly to a non-technical audience.',
    outcomes: [
      'Clean and structure messy, real-world datasets',
      'Perform exploratory data analysis with Python',
      'Build clear, honest data visualizations',
      'Communicate findings in a way non-technical stakeholders can act on',
    ],
  },
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity',
    category: 'Data & Security',
    level: 'Beginner to Intermediate',
    duration: '10 weeks',
    delivery: 'In-person & online',
    status: 'upcoming',
    short: 'Practical security fundamentals for individuals and organizations.',
    description:
      'Covers the fundamentals of how systems get compromised and how to defend them — network security basics, common web vulnerabilities, and the practical hygiene that prevents most real-world incidents.',
    outcomes: [
      'Understand common attack vectors and how to defend against them',
      'Apply basic security hygiene to personal and organizational systems',
      'Recognize and respond appropriately to phishing and social engineering',
      'A foundation for further specialization in security',
    ],
  },
  {
    slug: 'robotics',
    title: 'Robotics',
    category: 'Programming',
    level: 'Beginner to Intermediate',
    duration: '8 weeks',
    delivery: 'In-person (hands-on)',
    status: 'upcoming',
    short: 'Hands-on robotics for students — sensors, motors and control logic.',
    description:
      'A hands-on, project-based introduction to robotics designed for school students: building simple robots, programming sensors and motors, and understanding the basics of control systems.',
    outcomes: [
      'Assemble and wire a basic robot from components',
      'Program sensor-driven behavior for a robot',
      'Understand core control-loop logic',
      'Complete a working robotics project independently',
    ],
  },
  {
    slug: 'iot',
    title: 'Internet of Things',
    category: 'Programming',
    level: 'Intermediate',
    duration: '8 weeks',
    delivery: 'In-person & online',
    status: 'upcoming',
    short: 'Connecting physical devices to software — sensors, microcontrollers and data.',
    description:
      'An introduction to building connected devices: reading data from sensors with a microcontroller, sending that data over a network, and building a simple dashboard to visualize it.',
    outcomes: [
      'Program a microcontroller to read sensor data',
      'Send device data over a network to a server',
      'Build a basic dashboard to visualize live device data',
      'Understand the building blocks of a real IoT system',
    ],
  },

  // ---------------------------------------------------------------------
  // FREE, SELF-PACED COURSES
  // ---------------------------------------------------------------------
  // Unlike the paid/upcoming courses above, these are live right now,
  // free, fully public (no login needed to read the lessons), and end in
  // an automatically-issued certificate. Full lesson + quiz content lives
  // in src/data/learnCourses.js — `learnSlug` below links a catalog card
  // to its actual lesson reader at /learn/:learnSlug.
  {
    slug: 'free-introduction-to-ai',
    learnSlug: 'introduction-to-ai',
    title: 'Introduction to Artificial Intelligence',
    category: 'Free & Certified',
    level: 'Beginner',
    duration: '1 hour',
    delivery: 'Free, self-paced, online',
    status: 'open',
    isFree: true,
    hasCertificate: true,
    short: 'A free, jargon-free introduction to what AI actually is — read now, no account needed.',
    description:
      'A grounded, jargon-free introduction to what AI actually is, how it developed, and where it shows up in everyday life. Five short lessons plus a quiz, free and self-paced. Pass the quiz to receive an automatically-issued Codeallo certificate.',
    outcomes: [
      'Explain what AI is (and isn\u2019t) without relying on hype or jargon',
      'Understand the real difference between narrow AI and general intelligence',
      'Recognize where AI already shows up in everyday life',
      'Understand the practical limits and risks of AI systems',
    ],
  },
  {
    slug: 'free-machine-learning-basics',
    learnSlug: 'machine-learning-basics',
    title: 'Machine Learning Basics',
    category: 'Free & Certified',
    level: 'Beginner',
    duration: '1 hour',
    delivery: 'Free, self-paced, online',
    status: 'open',
    isFree: true,
    hasCertificate: true,
    short: 'How machines actually "learn" from data — free, self-paced, with a certificate on completion.',
    description:
      'The core ideas behind supervised and unsupervised learning, explained without heavy math. Five short lessons plus a quiz, free and self-paced. Pass the quiz to receive an automatically-issued Codeallo certificate.',
    outcomes: [
      'Explain the difference between traditional programming and machine learning',
      'Distinguish supervised from unsupervised learning',
      'Understand why training data quality matters more than algorithm choice',
      'Know what to ask before trusting a model\u2019s accuracy claim',
    ],
  },
  {
    slug: 'free-practical-ai-and-prompting',
    learnSlug: 'practical-ai-and-prompting',
    title: 'Practical AI & Prompting Skills',
    category: 'Free & Certified',
    level: 'Beginner',
    duration: '1 hour',
    delivery: 'Free, self-paced, online',
    status: 'open',
    isFree: true,
    hasCertificate: true,
    short: 'How to actually use AI tools well and responsibly — free, self-paced, with a certificate on completion.',
    description:
      'How large language models work at a practical level, how to write effective prompts, and how to use AI tools responsibly and skeptically. Five short lessons plus a quiz, free and self-paced. Pass the quiz to receive an automatically-issued Codeallo certificate.',
    outcomes: [
      'Understand what a large language model is actually doing when it responds',
      'Write clear, specific prompts that get better results',
      'Use AI tools responsibly, with an awareness of privacy and bias',
      'Know when and how to fact-check AI-generated output',
    ],
  },
]

export const getCourseBySlug = (slug) => courses.find((c) => c.slug === slug)
