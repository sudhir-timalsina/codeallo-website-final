// Free, public "Learn" track content. Unlike src/data/courses.js (the
// marketing catalog of paid/upcoming courses), everything here is meant to
// be read by anyone without an account — the quiz and certificate at the
// end are the only parts that require login (see src/pages/learn/).
//
// `hours` is used verbatim on the generated certificate ("has completed
// {hours} of basic AI knowledge training") — keep it honest relative to
// the actual lesson + quiz time below if you edit content.

export const learnCourses = [
  {
    slug: 'introduction-to-ai',
    title: 'Introduction to Artificial Intelligence',
    level: 'Beginner',
    hours: '1 hour',
    summary:
      'A grounded, jargon-free introduction to what AI actually is, how it developed, and where it shows up in everyday life.',
    lessons: [
      {
        slug: 'what-is-ai',
        title: 'What Is Artificial Intelligence?',
        minutes: 10,
        body: [
          'Artificial Intelligence, at its broadest, means getting a computer to do something that would normally require human intelligence — recognizing a face in a photo, translating a sentence, recommending a movie, or answering a question in plain language.',
          'That definition is intentionally broad, because AI isn\u2019t one single technology. A simple spam filter, a chess-playing program, and a system that generates human-like text are all "AI" in different senses, built with very different techniques and very different levels of capability.',
          'A useful way to think about it: AI is not one thing that either exists or doesn\u2019t in a system — it\u2019s a spectrum. On one end are simple rule-based programs (if this happens, do that). On the other end are systems that learn patterns from huge amounts of data and generalize to situations they were never explicitly programmed for.',
          'Most of what people mean by "AI" today — recommendation systems, voice assistants, image recognition, and large language models like the ones behind modern chatbots — sits on the "learns from data" end of that spectrum. That distinction matters, and it\u2019s the thread that runs through the rest of this course.',
        ],
      },
      {
        slug: 'a-brief-history-of-ai',
        title: 'A Brief History of AI',
        minutes: 10,
        body: [
          'The term "artificial intelligence" was coined in 1956, at a summer workshop at Dartmouth College, where researchers optimistically predicted that machines capable of human-level reasoning were only a couple of decades away. That prediction was wrong — but the field it launched has had a much longer, more interesting story than that early optimism suggested.',
          'The following decades saw repeated cycles of excitement followed by disappointment, often called "AI winters" — periods when funding and interest collapsed because the technology of the time couldn\u2019t deliver on inflated promises. Early AI research focused heavily on hand-coded rules and logic: systems where humans explicitly wrote out the knowledge and reasoning steps.',
          'The shift that led to today\u2019s AI happened gradually from the 1990s onward, as researchers moved from hand-coded rules toward statistical methods — systems that learn patterns directly from data rather than being told the rules explicitly. This approach, refined over decades, is what we now call machine learning.',
          'The more recent explosion of interest — roughly from the early 2010s onward — came from a combination of three things arriving together: much larger datasets (thanks to the internet), much more powerful and affordable computing hardware, and refinements to a family of techniques called neural networks. Understanding that this is a decades-long, gradual story — not an overnight invention — helps put today\u2019s AI systems in perspective.',
        ],
      },
      {
        slug: 'types-of-ai',
        title: 'Types of AI: Narrow vs. General',
        minutes: 12,
        body: [
          'Almost every AI system that exists today, including the most impressive ones, is what\u2019s called Narrow AI (or "weak AI"): a system built and trained to do one type of task well, without genuine understanding beyond that task. A system that recognizes cancer in medical scans with impressive accuracy has no idea what a cat is, and a system that plays chess at a superhuman level cannot hold a conversation.',
          'Artificial General Intelligence (AGI) — a hypothetical system with human-like, flexible intelligence across virtually any domain — does not currently exist. It remains a subject of active research, debate and speculation, and reasonable experts disagree significantly about whether, or when, it might be achieved. Being clear on this distinction is one of the most useful things you can take from this course, because a lot of AI hype in the media blurs the two together.',
          'Another useful distinction is between rule-based systems and learning-based systems. A rule-based system follows logic explicitly written by humans ("if the temperature is below zero, show a frost warning"). A learning-based system is instead shown many examples and adjusts itself to recognize patterns in that data — it isn\u2019t told the rule for identifying a cat in a photo, it learns a representation of "cat-ness" from thousands of labeled photos.',
          'Most modern, headline-grabbing AI — image generators, recommendation engines, and large language models — are learning-based and narrow: extremely capable within their trained domain, but without general understanding outside of it.',
        ],
      },
      {
        slug: 'ai-in-everyday-life',
        title: 'Where AI Already Shows Up in Everyday Life',
        minutes: 10,
        body: [
          'AI is often discussed as a futuristic technology, but narrow AI systems are already embedded in tools most people use daily, usually without being labeled as "AI" at all.',
          'Email spam filters, the autocomplete on your phone keyboard, product recommendations on shopping sites, the ordering of posts on social media feeds, voice assistants, photo organization apps that group pictures by the people in them, fraud detection on bank transactions, and traffic-time predictions in map apps are all, in some form, applications of machine learning.',
          'In education and civic contexts specifically — relevant to a lot of Codeallo\u2019s own work — AI shows up in plagiarism detection tools, automated grading assistance for multiple-choice or short-answer content, chatbots that answer common student questions, and translation tools that help bridge language gaps in multilingual classrooms.',
          'Recognizing how much AI already surrounds you, quietly, in mostly narrow and specific forms, is a healthier starting point than the more dramatic framing you\u2019ll often see online — and it sets up the next course in this track, Machine Learning Basics, where we look at how these systems actually learn.',
        ],
      },
      {
        slug: 'limits-and-risks-of-ai',
        title: 'The Limits and Risks of AI',
        minutes: 10,
        body: [
          'Understanding what AI can\u2019t reliably do is at least as important as understanding what it can. Learning-based AI systems are pattern matchers trained on past data — they can fail in surprising ways when faced with situations that differ meaningfully from their training data, and they generally cannot explain their own reasoning the way a human expert can.',
          'A well-documented risk is bias: if the data a system was trained on reflects existing human biases — in hiring records, loan approvals, or policing data, for example — the trained system will typically reproduce and can even amplify those biases, often in ways that aren\u2019t obvious until real harm has already occurred.',
          'Another practical risk, especially relevant to modern language-generating AI, is confident-sounding inaccuracy. These systems can produce fluent, well-structured text that is factually wrong, because they are optimized to produce plausible-sounding language, not to verify truth against a source. Treating AI output the way you\u2019d treat an unverified claim from a stranger — worth considering, but requiring a check before you rely on it — is a healthy default.',
          'None of this means AI isn\u2019t useful — clearly, it is, for an enormous range of tasks. It means AI is a tool with real limitations, best used with an understanding of what those limitations are, which is exactly the mindset this course is meant to build.',
        ],
      },
    ],
    quiz: [
      {
        id: 'ai101-q1',
        prompt: 'Which of these best describes most AI systems in use today?',
        options: [
          { id: 'a', text: 'General intelligence, able to reason about any topic like a human' },
          { id: 'b', text: 'Narrow AI, built and trained to perform one specific type of task well' },
          { id: 'c', text: 'Systems that are fully conscious and self-aware' },
          { id: 'd', text: 'Purely random guessing dressed up with technical language' },
        ],
        correctOptionId: 'b',
        explanation:
          'Almost all AI systems in real use today are Narrow AI — highly capable at one specific task, without general understanding beyond it.',
      },
      {
        id: 'ai101-q2',
        prompt: 'What is the key difference between a rule-based system and a learning-based system?',
        options: [
          { id: 'a', text: 'Rule-based systems are always more accurate' },
          { id: 'b', text: 'Learning-based systems follow logic explicitly written by a programmer' },
          { id: 'c', text: 'Rule-based systems follow explicit human-written logic; learning-based systems find patterns from data' },
          { id: 'd', text: 'There is no meaningful difference between the two' },
        ],
        correctOptionId: 'c',
        explanation:
          'Rule-based systems follow explicit logic written by humans. Learning-based systems are instead shown examples and learn patterns from that data.',
      },
      {
        id: 'ai101-q3',
        prompt: 'What does AGI (Artificial General Intelligence) refer to?',
        options: [
          { id: 'a', text: 'Any AI system currently used in a smartphone' },
          { id: 'b', text: 'A hypothetical system with flexible, human-like intelligence across virtually any domain' },
          { id: 'c', text: 'A type of spam filter' },
          { id: 'd', text: 'The original name for machine learning in the 1950s' },
        ],
        correctOptionId: 'b',
        explanation:
          'AGI describes a hypothetical, not-yet-achieved system with general, flexible intelligence — distinct from the narrow AI systems that exist today.',
      },
      {
        id: 'ai101-q4',
        prompt: 'What combination of factors is most associated with the recent surge in AI capability since the early 2010s?',
        options: [
          { id: 'a', text: 'A single breakthrough discovery made in one year' },
          { id: 'b', text: 'Larger datasets, more powerful computing hardware, and refined neural network techniques arriving together' },
          { id: 'c', text: 'The invention of the term "artificial intelligence"' },
          { id: 'd', text: 'A government mandate requiring AI development' },
        ],
        correctOptionId: 'b',
        explanation:
          'The recent leap in AI capability came from larger datasets, better hardware, and refined neural network methods converging — not one single breakthrough.',
      },
      {
        id: 'ai101-q5',
        prompt: 'Why should confident-sounding text generated by an AI system still be fact-checked?',
        options: [
          { id: 'a', text: 'AI systems are always trying to deceive people' },
          { id: 'b', text: 'These systems are optimized to produce plausible-sounding language, not to verify truth' },
          { id: 'c', text: 'AI-generated text is illegal to use without a fact-check' },
          { id: 'd', text: 'It never needs to be fact-checked once it sounds confident' },
        ],
        correctOptionId: 'b',
        explanation:
          'Language-generating AI is optimized for fluent, plausible text — not for verifying accuracy — so confident tone is not evidence of correctness.',
      },
      {
        id: 'ai101-q6',
        prompt: 'Where does bias in an AI system most commonly come from?',
        options: [
          { id: 'a', text: 'The computer hardware running the model' },
          { id: 'b', text: 'Biases already present in the data the system was trained on' },
          { id: 'c', text: 'Random chance, unrelated to training data' },
          { id: 'd', text: 'The electricity used to power the servers' },
        ],
        correctOptionId: 'b',
        explanation:
          'AI systems typically reproduce and can amplify biases that already exist in their training data.',
      },
    ],
  },

  {
    slug: 'machine-learning-basics',
    title: 'Machine Learning Basics',
    level: 'Beginner',
    hours: '1 hour',
    summary:
      'How machines actually "learn" from data — the core ideas behind supervised and unsupervised learning, explained without heavy math.',
    lessons: [
      {
        slug: 'what-is-machine-learning',
        title: 'What Is Machine Learning?',
        minutes: 10,
        body: [
          'Machine Learning (ML) is the branch of AI concerned with building systems that improve at a task by being shown examples, rather than being explicitly programmed with step-by-step rules for that task.',
          'A traditional program to detect spam email might be written as a long list of hand-coded rules: if the email contains certain words, or comes from certain domains, mark it as spam. This approach is brittle — spammers change tactics, and the rule list needs constant manual updates.',
          'A machine learning approach instead shows the system thousands of emails, each labeled "spam" or "not spam", and lets an algorithm find the statistical patterns that distinguish the two categories on its own. The resulting model can often generalize to new spam patterns it was never explicitly told about.',
          'The core shift is this: instead of a human writing the rules, the human provides examples (data) and a learning algorithm, and the system derives its own internal rules — usually expressed as numerical parameters — from that data.',
        ],
      },
      {
        slug: 'supervised-vs-unsupervised',
        title: 'Supervised vs. Unsupervised Learning',
        minutes: 12,
        body: [
          'Supervised learning is the most common and easiest to understand category: the training data comes with labels showing the correct answer, and the algorithm learns to map inputs to those known outputs. Our spam example is supervised learning — each email in the training data is labeled correctly in advance.',
          'Within supervised learning, there are two common types of problems: classification (predicting a category, like "spam" or "not spam") and regression (predicting a number, like the price a house might sell for based on its size and location).',
          'Unsupervised learning works differently: the data has no labels at all, and the algorithm\u2019s job is to find structure or patterns on its own. A common example is clustering — grouping customers into segments based on purchasing behavior, without being told in advance what the segments should be.',
          'There\u2019s a third category worth knowing by name, even briefly: reinforcement learning, where a system learns by trial and error, receiving rewards or penalties for actions it takes — the approach behind many game-playing AI systems. Most practical business and educational applications, though, are built on supervised learning.',
        ],
      },
      {
        slug: 'training-data-and-models',
        title: 'Training Data and Models',
        minutes: 10,
        body: [
          'In machine learning, a "model" is the end result of training — a mathematical structure that has learned to map inputs to outputs based on the patterns found in the training data. Training is the process of adjusting that structure\u2019s internal numbers until its predictions on the training data are as accurate as possible.',
          'The quality and quantity of training data usually matters more than the sophistication of the algorithm. A famous phrase in the field is "garbage in, garbage out" — a model trained on biased, incomplete, or poorly labeled data will produce biased, unreliable predictions, no matter how advanced the underlying algorithm is.',
          'It\u2019s standard practice to split available data into at least two parts: a training set, used to teach the model, and a test set, held back and used only to check how well the model performs on examples it has never seen. This distinction matters because a model can appear to perform perfectly on data it was trained on while still failing badly on new, real-world data — a problem covered in the next lesson.',
        ],
      },
      {
        slug: 'common-ml-approaches',
        title: 'A Few Common ML Approaches, in Plain Terms',
        minutes: 10,
        body: [
          'You don\u2019t need to memorize algorithm names to understand machine learning conceptually, but recognizing a few common terms helps when reading about AI elsewhere.',
          'Decision trees work like a flowchart of yes/no questions learned from data, arriving at a prediction by following a branching path. They\u2019re valued for being relatively easy for humans to interpret compared to more complex approaches.',
          'Neural networks are loosely inspired by how neurons connect in the brain — layers of simple mathematical units that combine to represent very complex patterns. "Deep learning" refers to neural networks with many layers, and it\u2019s the approach behind most of today\u2019s most capable AI systems, including image recognition and large language models.',
          'None of these approaches is universally "best" — the right choice depends on the type of data, the amount of data available, how important it is to explain the model\u2019s reasoning, and the computing resources available.',
        ],
      },
      {
        slug: 'evaluating-a-model',
        title: 'How Do You Know If a Model Is Actually Good?',
        minutes: 10,
        body: [
          'A model that performs impressively on its own training data can still fail badly in the real world — a problem called overfitting, where the model has effectively memorized the training examples rather than learning patterns that generalize to new data.',
          'This is why the test set (data the model never saw during training) matters so much. A trustworthy evaluation always checks performance on data the model hasn\u2019t already seen.',
          'Accuracy — the percentage of correct predictions — is the most intuitive metric, but it can be misleading. If a rare disease affects 1% of patients, a model that simply always predicts "no disease" would be 99% accurate while being completely useless. This is why fields working with imbalanced data use additional metrics, like precision and recall, that account for how well a model performs specifically on the rarer, more important cases.',
          'The practical takeaway: whenever you hear a claim like "this AI system is 95% accurate," a reasonable next question is "accurate on what data, measured how, and compared to what baseline?" — healthy skepticism, not cynicism, is the right response to any single accuracy number presented without context.',
        ],
      },
    ],
    quiz: [
      {
        id: 'ml101-q1',
        prompt: 'What is the key difference between traditional programming and machine learning?',
        options: [
          { id: 'a', text: 'Machine learning does not use computers' },
          { id: 'b', text: 'In machine learning, a system learns patterns from data instead of following explicitly hand-coded rules' },
          { id: 'c', text: 'Traditional programming is always more accurate' },
          { id: 'd', text: 'There is no real difference between them' },
        ],
        correctOptionId: 'b',
        explanation:
          'Machine learning systems derive their own patterns from labeled examples, rather than following rules a human explicitly wrote.',
      },
      {
        id: 'ml101-q2',
        prompt: 'A spam filter trained on emails labeled "spam" or "not spam" is an example of which type of learning?',
        options: [
          { id: 'a', text: 'Unsupervised learning' },
          { id: 'b', text: 'Reinforcement learning' },
          { id: 'c', text: 'Supervised learning' },
          { id: 'd', text: 'No learning at all' },
        ],
        correctOptionId: 'c',
        explanation:
          'Because the training data comes with correct labels ("spam"/"not spam"), this is a classic supervised learning problem.',
      },
      {
        id: 'ml101-q3',
        prompt: 'What does "unsupervised learning" mean?',
        options: [
          { id: 'a', text: 'The algorithm finds structure or patterns in data that has no labels' },
          { id: 'b', text: 'A human manually checks every single prediction' },
          { id: 'c', text: 'The model is trained without any data at all' },
          { id: 'd', text: 'It refers only to robotics' },
        ],
        correctOptionId: 'a',
        explanation:
          'Unsupervised learning works with unlabeled data, with the algorithm finding structure (like clusters) on its own.',
      },
      {
        id: 'ml101-q4',
        prompt: 'Why is a separate "test set" used when evaluating a model?',
        options: [
          { id: 'a', text: 'To make the model train faster' },
          { id: 'b', text: 'To check performance on data the model has never seen, revealing whether it actually generalizes' },
          { id: 'c', text: 'Test sets are only used for unsupervised learning' },
          { id: 'd', text: 'It is a legal requirement in most countries' },
        ],
        correctOptionId: 'b',
        explanation:
          'A held-out test set reveals whether a model generalizes to new data, rather than having just memorized the training examples.',
      },
      {
        id: 'ml101-q5',
        prompt: 'Why can "95% accuracy" be a misleading claim on its own?',
        options: [
          { id: 'a', text: 'Accuracy numbers are always fabricated' },
          { id: 'b', text: 'On imbalanced data, a model can score high accuracy while still failing badly on the rare, important cases' },
          { id: 'c', text: 'Accuracy can only be measured for image data' },
          { id: 'd', text: 'It isn\u2019t misleading — accuracy alone always tells the full story' },
        ],
        correctOptionId: 'b',
        explanation:
          'On imbalanced data, always predicting the majority outcome can produce high accuracy while being practically useless for the rare cases that matter most.',
      },
      {
        id: 'ml101-q6',
        prompt: 'What best describes "deep learning"?',
        options: [
          { id: 'a', text: 'A synonym for artificial intelligence in general' },
          { id: 'b', text: 'Neural networks with many layers, behind most of today\u2019s most capable AI systems' },
          { id: 'c', text: 'A type of decision tree' },
          { id: 'd', text: 'A method used only in unsupervised learning' },
        ],
        correctOptionId: 'b',
        explanation:
          'Deep learning refers to neural networks with many layers — the approach behind most modern high-capability AI systems.',
      },
    ],
  },

  {
    slug: 'practical-ai-and-prompting',
    title: 'Practical AI & Prompting Skills',
    level: 'Beginner',
    hours: '1 hour',
    summary:
      'How large language models work at a practical level, and how to use AI tools effectively, responsibly and skeptically.',
    lessons: [
      {
        slug: 'what-are-llms',
        title: 'What Are Large Language Models?',
        minutes: 10,
        body: [
          'A Large Language Model (LLM) is a type of AI system trained to predict the next word (or piece of a word) in a sequence of text, given everything that came before it. Trained on enormous amounts of text and refined through a huge amount of computation, this simple-sounding task turns out to produce systems capable of writing, summarizing, translating, and answering questions in fluent, natural language.',
          'It\u2019s worth being precise about what this means: an LLM isn\u2019t looking up facts in a database when it responds to you. It generates each part of its response based on learned statistical patterns in language, which happens to encode a great deal of real-world knowledge absorbed during training — but with no built-in mechanism to verify that what it generates is actually true.',
          'This is why LLMs can produce what\u2019s sometimes called a "hallucination" — a fluent, confident-sounding statement that is simply incorrect. The model isn\u2019t "lying" in any intentional sense; it\u2019s generating plausible-sounding text, and plausible is not the same as true.',
          'Understanding this single distinction — plausible-sounding versus verified-true — is the most practically useful thing anyone can learn before relying on an LLM for real work.',
        ],
      },
      {
        slug: 'writing-a-good-prompt',
        title: 'How to Write a Good Prompt',
        minutes: 12,
        body: [
          'A "prompt" is simply the instruction or question you give an AI system. Because these systems respond to the specific wording and context you provide, the quality of your prompt has a real, noticeable effect on the quality of the response.',
          'Being specific outperforms being vague. "Write about dogs" invites a generic response; "Write three sentences comparing the exercise needs of a Labrador and a Chihuahua for a first-time dog owner" gives the system a clear target to aim for.',
          'Providing context matters. If you want help rewriting an email, giving the AI the actual email, who it\u2019s going to, and what tone you want, produces a far more useful result than a bare instruction with no material to work from.',
          'Asking for a specific format helps too — a numbered list, a table, a particular length, or a specific structure ("start with a one-sentence summary, then three bullet points") tends to produce more usable output than an open-ended request.',
          'Finally, treating a first response as a draft rather than a final answer — and following up with corrections or refinements — usually produces a much better result than expecting a perfect answer on the first try.',
        ],
      },
      {
        slug: 'common-ai-tools-overview',
        title: 'A Quick Overview of Common AI Tools',
        minutes: 8,
        body: [
          'AI tools available today generally fall into a few broad categories, and understanding the category helps set the right expectations for each one.',
          'Conversational assistants (chatbots built on LLMs) are general-purpose tools for writing, explaining, brainstorming and answering questions in natural language. They are broad but not specialized, and their knowledge has a cutoff date beyond which they may not know recent events unless connected to live search.',
          'Image-generation tools create original images from text descriptions. These are creative tools, not photographic recorders of reality, and they raise separate questions around copyright and misuse that are worth being aware of.',
          'Specialized AI tools are built for one narrow task — grammar checking, code completion, transcription, translation — and tend to be more reliable within their specific domain than a general conversational assistant asked to do the same task.',
          'Knowing which category a tool falls into is often more useful than knowing its brand name, because it tells you what kind of task it was actually built and evaluated for.',
        ],
      },
      {
        slug: 'using-ai-responsibly',
        title: 'Using AI Responsibly',
        minutes: 10,
        body: [
          'Responsible AI use starts with disclosure where it matters — in academic, professional or creative contexts where the expectation is that the work is your own, using an undisclosed AI tool to produce it can cross into dishonesty, even if the tool itself is legitimate.',
          'Privacy is another practical concern: information typed into many AI tools may be stored or used to improve the service, so avoid entering sensitive personal, financial or confidential organizational information into a general-purpose AI tool unless you\u2019ve specifically checked its privacy terms.',
          'AI-generated content can also reflect and amplify biases present in its training data, as covered in the AI Fundamentals course — this is worth remembering especially when using AI for anything involving people, such as summarizing candidates, describing groups, or making recommendations about individuals.',
          'A simple, durable habit covers most of this: use AI as a fast first draft or a thinking partner, not as a final, unquestioned authority — and be upfront when you\u2019ve used it in a context where that matters.',
        ],
      },
      {
        slug: 'fact-checking-ai-output',
        title: 'Fact-Checking AI Output',
        minutes: 10,
        body: [
          'Because LLMs generate plausible text rather than verified facts, developing a habit of fact-checking specific, checkable claims — names, dates, statistics, quotes, citations, and technical specifics — is the single most valuable practical skill covered in this course.',
          'A useful test: does the claim matter if it\u2019s wrong? A rough paraphrase of a general concept for casual understanding carries low risk if slightly imprecise. A specific statistic you plan to cite publicly, a legal or medical claim, or a fact you\u2019ll rely on to make a real decision deserves independent verification before you use it.',
          'Watch particularly for confidently stated citations, sources, or quotes — LLMs can generate references that look completely legitimate in format but do not actually exist. Never treat a citation from an AI response as real without checking that the source actually exists and says what it\u2019s claimed to say.',
          'This habit — treating fluent, confident AI output as a helpful starting point rather than a verified conclusion — is what separates someone who uses AI tools well from someone who gets occasionally, sometimes seriously, misled by them.',
        ],
      },
    ],
    quiz: [
      {
        id: 'prompt101-q1',
        prompt: 'What is a large language model fundamentally trained to do?',
        options: [
          { id: 'a', text: 'Look up verified facts in a curated database' },
          { id: 'b', text: 'Predict the next word or piece of text, given everything that came before it' },
          { id: 'c', text: 'Run mathematical calculations exclusively' },
          { id: 'd', text: 'Translate binary code into text' },
        ],
        correctOptionId: 'b',
        explanation:
          'LLMs are trained to predict the next piece of text based on patterns learned from huge amounts of training data — not to look up verified facts.',
      },
      {
        id: 'prompt101-q2',
        prompt: 'What is an AI "hallucination"?',
        options: [
          { id: 'a', text: 'A visual glitch in an AI-generated image' },
          { id: 'b', text: 'A confident-sounding but factually incorrect statement generated by an AI system' },
          { id: 'c', text: 'A type of computer virus' },
          { id: 'd', text: 'A required step in training a model' },
        ],
        correctOptionId: 'b',
        explanation:
          'A hallucination is fluent, plausible-sounding text that is factually wrong — a known limitation of LLMs.',
      },
      {
        id: 'prompt101-q3',
        prompt: 'Which of these is most likely to produce a better AI response?',
        options: [
          { id: 'a', text: 'A vague, one-word prompt with no context' },
          { id: 'b', text: 'A specific prompt that includes context and a desired format' },
          { id: 'c', text: 'Never following up on the first response' },
          { id: 'd', text: 'Typing in all capital letters' },
        ],
        correctOptionId: 'b',
        explanation:
          'Specific prompts with context and a desired format consistently produce more useful, targeted responses.',
      },
      {
        id: 'prompt101-q4',
        prompt: 'Why should you be cautious about entering sensitive information into a general-purpose AI tool?',
        options: [
          { id: 'a', text: 'It has no bearing on privacy at all' },
          { id: 'b', text: 'Information entered may be stored or used to improve the service, depending on the tool\u2019s terms' },
          { id: 'c', text: 'AI tools automatically delete all input immediately, so there is no need for caution' },
          { id: 'd', text: 'It will always make the AI\u2019s answers less accurate' },
        ],
        correctOptionId: 'b',
        explanation:
          'Many AI tools may store or use input data depending on their specific terms, so sensitive information deserves caution.',
      },
      {
        id: 'prompt101-q5',
        prompt: 'What should you do with an AI-generated citation or source before relying on it?',
        options: [
          { id: 'a', text: 'Trust it automatically, since it looks properly formatted' },
          { id: 'b', text: 'Verify that the source actually exists and says what it\u2019s claimed to say' },
          { id: 'c', text: 'Ignore citations entirely, since they are always fake' },
          { id: 'd', text: 'Only check citations that are longer than one sentence' },
        ],
        correctOptionId: 'b',
        explanation:
          'AI systems can generate citations that look legitimate but don\u2019t actually exist — always verify before relying on one.',
      },
      {
        id: 'prompt101-q6',
        prompt: 'What is the healthiest overall mindset for using AI tools, based on this course?',
        options: [
          { id: 'a', text: 'Treat every AI response as a guaranteed, final authority' },
          { id: 'b', text: 'Use AI as a fast first draft or thinking partner, and verify anything that matters before relying on it' },
          { id: 'c', text: 'Avoid using AI tools under any circumstances' },
          { id: 'd', text: 'Only use AI tools for entertainment, never for real work' },
        ],
        correctOptionId: 'b',
        explanation:
          'The recommended mindset is using AI as a helpful starting point while independently verifying anything that actually matters.',
      },
    ],
  },
]

export const getLearnCourseBySlug = (slug) => learnCourses.find((c) => c.slug === slug)

export const getLessonBySlug = (course, lessonSlug) =>
  course?.lessons.find((l) => l.slug === lessonSlug)

export const getTotalLessonMinutes = (course) =>
  course.lessons.reduce((sum, l) => sum + l.minutes, 0)
