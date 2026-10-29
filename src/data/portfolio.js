export const profile = {
  name: "Abdul Kalam Syed", shortName: "Abdul", role: "Software Engineer",
  email: "abdulksyed10@gmail.com", phone: "+1 (951) 407-7430", phoneHref: "tel:+19514077430",
  location: "Ontario, California", github: "https://github.com/abdulksyed10",
  linkedin: "https://www.linkedin.com/in/abdul-kalam-syed/",
  resume: "/Abdul-Kalam-Syed-SWE-Resume.pdf",
  introduction: "I build full-stack applications, backend systems, and AI-assisted tools. Currently pursuing an M.S. in Software Engineering at UC Irvine, with experience across freelance engineering, independent products, and enterprise healthcare IT.",
};

export const education = [
    {
      school: "UC Irvine",
      program: "M.S. in Software Engineering (MSSE)",
      dates: "Sep 2024 – Dec 2026 (Expected)",
      gpa: "GPA: 3.84"
    },
    {
      school: "Cal Poly Pomona",
      program: "B.S. in Computer Science (CS)",
      minor: "Minor in Data Science",
      dates: "Aug 2020 – May 2024",
      gpa: "GPA: 3.82"
    },
  ];

export const experience = [
    {
      company: "Collectibles",
      role: "Full-Stack Developer · Independent Project",
      dates: "Sep 2026 – Present",
    },
    {
      company: "PaintFlow",
      role: "Software Engineer · Freelance",
      dates: "Jul 2026 – Present",
    },
    {
      company: "F1 Fan Engagement Platform",
      role: "Software Engineer · Independent Project",
      periods: [
        {
          label: "Moderation",
          dates: "Mar 2026  – Present",
        },
        {
          label: "Development",
          dates: "Jan 2026 – Mar 2026",
        },
      ],
    },
    {
      company: "Prime Healthcare",
      role: "IT Support Specialist I",
      periods: [
        {
          label: "Full-time",
          dates: "Sep 2024 – Present",
        },
        {
          label: "Part-time",
          dates: "Jun 2023 – Sep 2024",
        },
      ],
    },
    {
      company: "M&M Construction",
      role: "Project Assistant",
      dates: "Mar 2022 – Jun 2023",
    },
  ];

export const skills = [
  // Advanced
  { name: "Python", tier: "advanced", category: "languages" },
  { name: "Java", tier: "advanced", category: "languages" },
  { name: "JavaScript", tier: "advanced", category: "languages" },
  { name: "React", tier: "advanced", category: "frameworks" },

  { name: "HTML5", tier: "advanced", category: "frontend" },
  { name: "CSS3", tier: "advanced", category: "frontend" },
  { name: "Tailwind CSS", tier: "advanced", category: "frontend" },

  { name: "Flask", tier: "advanced", category: "frameworks" },
  { name: "PyQt", tier: "advanced", category: "frameworks" },

  { name: "PostgreSQL", tier: "advanced", category: "databases" },
  { name: "MongoDB", tier: "advanced", category: "databases" },
  { name: "MySQL", tier: "advanced", category: "databases" },

  { name: "TensorFlow", tier: "intermediate", category: "ml" },
  { name: "PyTorch", tier: "intermediate", category: "ml" },

  { name: "Git", tier: "advanced", category: "tools" },
  { name: "GitHub", tier: "advanced", category: "tools" },
  { name: "Jira", tier: "advanced", category: "tools" },

  // Intermediate
  { name: "TypeScript", tier: "intermediate", category: "languages" },
  { name: "C", tier: "familiar", category: "languages" },
  { name: "C++", tier: "familiar", category: "languages" },
  { name: "Kotlin", tier: "intermediate", category: "languages" },

  { name: "Next.js", tier: "advanced", category: "frameworks" },
  { name: "React Native", tier: "intermediate", category: "frameworks" },
  { name: "JavaFX", tier: "intermediate", category: "frameworks" },
  { name: ".NET", tier: "familiar", category: "frameworks" },
  { name: "Django", tier: "intermediate", category: "frameworks" },
  { name: "Angular", tier: "familiar", category: "frameworks" },
  { name: "Three.js", tier: "familiar", category: "frontend" },

  { name: "Microsoft SQL Server", tier: "intermediate", category: "databases" },
  { name: "Amazon DynamoDB", tier: "familiar", category: "databases" },

  { name: "AWS", tier: "intermediate", category: "cloud" },
  { name: "Azure", tier: "familiar", category: "cloud" },
  { name: "Vercel", tier: "intermediate", category: "cloud" },
  { name: "GitHub Pages", tier: "familiar", category: "cloud" },

  { name: "Keras", tier: "familiar", category: "ml" },
  { name: "OpenCV", tier: "intermediate", category: "ml" },
  { name: "scikit-learn", tier: "intermediate", category: "ml" },
  { name: "NumPy", tier: "intermediate", category: "ml" },
  { name: "Pandas", tier: "intermediate", category: "ml" },
  { name: "Matplotlib", tier: "intermediate", category: "ml" },

  { name: "Insomnia", tier: "intermediate", category: "tools" },
  { name: "Anaconda", tier: "familiar", category: "tools" },

  // Familiar
  // (You didn’t provide additional “familiar” items beyond the main list—keeping these here.)
  { name: "Docker", tier: "familiar", category: "cloud" },
  { name: "Canva", tier: "familiar", category: "tools" },
  { name: "Figma", tier: "familiar", category: "tools" },

  { name: "Communication", tier: null, category: "soft" },
  { name: "Stakeholder Management", tier: null, category: "soft" },
  { name: "Cross-Functional Collaboration", tier: null, category: "soft" },
  { name: "Incident Triage & Troubleshooting", tier: null, category: "soft" },
  { name: "Customer Support & Empathy", tier: null, category: "soft" },
  { name: "Documentation & Knowledge Sharing", tier: null, category: "soft" },
  { name: "Problem Decomposition", tier: null, category: "soft" },
  { name: "Ownership & Reliability", tier: null, category: "soft" },
  { name: "Time Management", tier: null, category: "soft" },
  { name: "Agile / Scrum Collaboration", tier: null, category: "soft" },
];

const upcoming = [
  {
    id: "ai-restaurant-website-builder",
    title: "AI Restaurant Website Builder",
    description:
      "AI-powered tool that generates production-ready restaurant websites from minimal input, including menus, structured sections, SEO-friendly markup, and accessibility-first defaults with clean, editable code.",
    tags: ["Next.js", "AI", "SEO", "Accessibility"],
    category: "fullstack",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: "paintflow",
    title: "PaintFlow",
    description:
      "Full-stack ERP-style platform for a paint shop, designed to manage products, inventory, billing, customer and vendor records, reports, and PDF-ready invoices through a modern dashboard workflow.",
    tags: ["Next.js", "TypeScript", "Supabase", "ERP"],
    category: "fullstack",
    demoUrl: "https://paint-flow-flax.vercel.app/",
    githubUrl: "https://github.com/abdulksyed10/PaintFlow",
  },
  {
    id: "thesis-website-builders-accessibility",
    title: "Thesis: Accessibility Evaluation of Website Builders",
    description:
      "Graduate research evaluating real-world websites built with modern site builders, comparing accessibility outcomes through systematic WCAG-based audits and cross-platform analysis.",
    tags: ["WCAG", "Accessibility", "Research", "Auditing"],
    category: "accessibility",
    demoUrl: "#",
    githubUrl: "#",
  },
];

const existing = [
  {
    id: "share-collectibles",
    title: "ShareCollectibles.com",
    description:
      "Cross-platform collectibles platform for organizing and selectively sharing personal collections, featuring secure media storage, public discovery, moderation workflows, and row-level access controls.",
    tags: ["React Native", "Expo", "TypeScript", "Supabase", "PostgreSQL", "Cloudflare R2"],
    category: "fullstack",
    featured: true,
    demoUrl: "https://sharecollectibles.com/",
    githubUrl: "https://github.com/abdulksyed10/Collectibles",
  },
  {
    id: "p1-predictions",
    title: "P1 Predictions Play-Along",
    description:
      "Formula 1 predictions platform featuring automated scoring, live leaderboards, and a normalized Supabase data model supporting seasons, races, and repeatable scoring logic.",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    category: "fullstack",
    featured: true,
    demoUrl: "https://www.p1withmattandtommyfanpredictions.com/",
    githubUrl: "https://github.com/abdulksyed10/P1withMattTommy-PredictionsPlayAlong",
  },
  {
    id: "figma-plugin-tool",
    title: "Figma Accessibility Checker (Rules + AI)",
    description:
      "Figma plugin that detects common WCAG accessibility issues—color contrast, small text, tap targets, and missing alt text—with rule-based flags and optional AI-generated fix suggestions.",
    tags: ["JavaScript", "Figma API", "WCAG", "Accessibility"],
    category: "accessibility",
    demoUrl: "#",
    githubUrl: "https://github.com/abdulksyed10/Figma-plugin-tool",
  },
  {
    id: "nba-champion-prediction",
    title: "NBA Champion Prediction (Data Science + ML)",
    description:
      "End-to-end machine learning project that analyzes historical NBA team statistics to predict championship outcomes. Includes feature engineering (net rating, win %, efficiency metrics), model comparison (Logistic Regression, Random Forest), and evaluation using cross-validation and feature importance analysis.",
    tags: ["Python", "Pandas", "Scikit-learn", "Machine Learning", "Data Science"],
    category: "ml",
    demoUrl: "#",
    githubUrl: "https://github.com/abdulksyed10/CS2410FinalProject",
  },
  {
    id: "cs4800-expense-tracker",
    title: "Expense Tracker (Full App)",
    description:
      "Full-stack expense tracking application with end-to-end CRUD workflows, a multi-screen UI, and containerized development for consistent local setup.",
    tags: ["React Native", "Python", "Docker"],
    category: "fullstack",
    featured: true,
    demoUrl: "https://pennywise.money/",
    githubUrl: "https://github.com/CS4800-expense-tracker/Project",
  },
  {
    id: "odlc",
    title: "ODLC Machine Inferencing System",
    description:
      "Computer vision system for object recognition and obstacle detection, structured to support collaboration, reuse, and rapid experimentation across project iterations.",
    tags: ["Python", "Computer Vision"],
    category: "ml",
    demoUrl: "#",
    githubUrl: "https://github.com/MarcCruzs/ODLC_Machine_Inferencing_System",
  },
  {
    id: "stock-ai-aws",
    title: "Stock Trading AI (AWS Hosted)",
    description:
      "Team project deploying a stock-trading AI workflow on AWS, with emphasis on cloud hosting, integration, and an end-to-end project pipeline.",
    tags: ["JavaScript", "AWS"],
    category: "ml",
    demoUrl: "#",
    githubUrl: "https://github.com/DaJoesh/CS4650-AWS-Project",
  },
  {
    id: "compsci273a",
    title: "CompSci273A",
    description:
      "Machine learning coursework repository containing experiments and notebooks covering model training, evaluation, and comparative analysis.",
    tags: ["Python", "Jupyter", "Machine Learning"],
    category: "ml",
    demoUrl: "#",
    githubUrl: "https://github.com/abdulksyed10/CompSci273A",
  },
  {
    id: "berkshire-javafx",
    title: "Berkshire Hathaway Frontend Redesign (JavaFX)",
    description:
      "Team project that reimagines a legacy website as a JavaFX desktop application, focusing on layout structure, navigation flow, and UI modernization.",
    tags: ["Java", "JavaFX"],
    category: "coursework",
    demoUrl: "#",
    githubUrl:
      "https://github.com/CS2450-Frontend-Redesign/Berkshire-Hathaway-Frontend-Redesign",
  },
  {
    id: "drive-thru",
    title: "Los Pollos Hermanos Drive Thru System",
    description:
      "System design project modeling a drive-thru ordering workflow, emphasizing order state transitions, correctness, and end-to-end logic.",
    tags: ["Python"],
    category: "fullstack",
    featured: true,
    demoUrl: "#",
    githubUrl:
      "https://github.com/CS-3560-02-5/Los-Pollos-Hermanos-Drive-Thru-System",
  },
];

const artwork = {
  "share-collectibles": { art: "collectibles", shortTitle: "ShareCollectibles", accent: "violet", discipline: "Cross-platform product", summary: "A place for collections to become connections.", details: ["Organize and selectively share personal collections.", "Secure media storage with row-level access controls.", "Public discovery and moderation workflows." ] },
  "p1-predictions": { art: "p1", shortTitle: "P1 Predictions", accent: "orange", discipline: "Fan engagement platform", summary: "Race predictions. Automated scoring. A shared leaderboard.", details: ["A normalized data model for seasons, races, and predictions.", "Repeatable automated scoring logic.", "Live leaderboards for the fan community." ] },
  "paintflow": { art: "paintflow", shortTitle: "PaintFlow", accent: "mint", discipline: "Freelance engineering", summary: "The moving parts of a paint shop, brought together.", details: ["Products, inventory, billing, and customer/vendor records.", "Reporting and PDF-ready invoice workflows.", "A modern dashboard backed by Supabase." ] },
  "figma-plugin-tool": { art: "accessibility", shortTitle: "Figma Accessibility Checker", accent: "blue", discipline: "Design tooling", summary: "Catch accessibility issues while the design is still a design.", details: ["Checks contrast, small text, tap targets, and missing alt text.", "Rule-based flags for common WCAG issues.", "Optional AI-generated suggestions for fixes." ] },
};
export const projects = [...upcoming.map(project => ({ ...project, status: "In development" })), ...existing.map(project => ({ ...project, status: "Project" }))].map(project => ({
  ...project, demoUrl: project.demoUrl === "#" ? null : project.demoUrl,
  githubUrl: project.githubUrl === "#" ? null : project.githubUrl,
  ...(artwork[project.id] || {}),
}));
export const featuredProjects = ["share-collectibles", "p1-predictions", "paintflow", "figma-plugin-tool"].map(id => projects.find(project => project.id === id));
export const projectCategories = [
  { value: "all", label: "All work" }, { value: "fullstack", label: "Full stack" },
  { value: "ml", label: "AI / ML" }, { value: "accessibility", label: "Accessibility" },
  { value: "coursework", label: "Coursework" }, { value: "upcoming", label: "In development" },
];
export const skillCategories = [
  ["all", "Everything"], ["languages", "Languages"], ["frameworks", "Frameworks"],
  ["frontend", "Frontend"], ["databases", "Data"], ["cloud", "Cloud"],
  ["ml", "AI / ML"], ["tools", "Tools"], ["soft", "Collaboration"],
];
