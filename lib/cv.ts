export interface CvItem {
  title: string;
  org: string;
  place: string;
  when: string;
  logos: string[];
  /** Shown when there is no logo. */
  mono?: string;
  points: string[];
}

export const education: CvItem[] = [
  {
    title: "MSc Data & AI for Finance",
    org: "Mines Paris – PSL × Albert School",
    place: "Paris",
    when: "2026 – 2028",
    logos: ["/images/logos/mines.png", "/images/logos/albert.png"],
    points: [
      "Deep learning for sequential data and NLP, generative AI, mathematics of modern machine learning",
      "Joint programme of PSL University's engineering school and Albert School, alongside an apprenticeship at Spiko",
    ],
  },
  {
    title: "BBA Big Data & Management",
    org: "Centrale Nantes × Audencia",
    place: "Nantes",
    when: "2022 – 2026",
    logos: ["/images/logos/centrale-nantes.png", "/images/logos/audencia.png"],
    points: [
      "Analysis, algebra, statistics and probability for data modelling",
      "Machine learning, Python, C++ and SQL",
      "Blockchain and fintech, accounting and financial markets",
    ],
  },
  {
    title: "Exchange semester · Finance & Big Data",
    org: "Shenzhen University",
    place: "Shenzhen, China",
    when: "Sep 2024 – Jan 2025",
    logos: ["/images/logos/shenzhen.png"],
    points: [
      "Corporate finance and investment decisions, big data and finance, financial modelling, fintech",
      "Chinese language",
    ],
  },
  {
    title: "Exchange semester · Data Science",
    org: "École Centrale Casablanca",
    place: "Casablanca, Morocco",
    when: "Feb – Jul 2024",
    logos: ["/images/logos/centrale-casablanca.png"],
    points: [
      "Machine learning and deep learning: algorithms, model development, optimisation",
      "Project: a trading strategy driven by sentiment analysis",
    ],
  },
];

export const experience: CvItem[] = [
  {
    title: "AI Engineer",
    org: "Spiko",
    place: "Apprenticeship · Paris",
    when: "Sep 2026 – now",
    logos: ["/images/logos/spiko.png"],
    points: [
      "AI-powered applications and workflows with Python, LLMs and APIs to automate internal processes",
      "Data pipelines and cloud infrastructure on GCP, with Terraform and CI/CD",
      "On-chain analysis with Dune to monitor tokenized assets and transactions",
    ],
  },
  {
    title: "Data Engineer",
    org: "Spiko",
    place: "Internship · Paris",
    when: "Feb – Aug 2026",
    logos: ["/images/logos/spiko.png"],
    points: ["Data infrastructure on Google Cloud Platform, with CI/CD"],
  },
  {
    title: "Growth / Data Analyst",
    org: "Finary",
    place: "Internship · Paris",
    when: "May – Aug 2025",
    logos: ["/images/logos/finary.png"],
    points: [
      "Python tools for quantitative asset analysis: correlation matrix, buy-versus-rent simulator",
      "Automation pipelines with Python, Zapier and the Slack API",
      "Statistics and NLP on user surveys, YouTube analytics and comments",
    ],
  },
  {
    title: "Founder",
    org: "Agence ConversIA",
    place: "Nantes",
    when: "Feb 2024 – Jan 2025",
    logos: [],
    mono: "CI",
    points: ["Conversational AI agent automating Airbnb concierge operations: guest messaging, check-in and check-out"],
  },
  {
    title: "Market Data Analyst",
    org: "ORIGIN Polska",
    place: "Internship · Poland",
    when: "May – Aug 2023",
    logos: [],
    mono: "OP",
    points: [
      "Polish healthcare market study for LNA Santé: 600+ establishments from 10+ national databases",
      "Three target locations identified; 15+ visualisations for the board, which led to the investment decision",
    ],
  },
];

export const skills = [
  "Python", "TypeScript", "SQL", "C++", "Rust (learning)",
  "Deep learning", "LLMs & agents", "scikit-learn", "XGBoost",
  "GCP", "Terraform", "CI/CD", "Docker",
  "Dune", "Solidity", "Foundry",
];

export const interests = [
  "Artificial intelligence", "Machine learning", "Deep learning", "DeFi",
  "Tokenization", "Programming", "Market microstructure",
];
