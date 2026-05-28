export const assistantProfile = {
  name: "Abdul's virtual assistant",
  owner: "Abdul Kalam Syed",
  intro:
    "I am Abdul's virtual assistant. Ask me about his projects, experience, education, skills, or how to contact him.",
  fallback:
    "I do not have that detail in my current knowledge file yet. You can ask about Abdul's projects, experience, education, skills, or contact info, and Abdul can add more details for me here later.",
};

export const assistantKnowledge = [
  {
    id: "summary",
    category: "about",
    title: "About Abdul",
    keywords: ["about", "summary", "who", "abdul", "software engineer"],
    answer:
      "Abdul Kalam Syed is a freelance software developer and M.S. Software Engineering student at UC Irvine. He builds full-stack applications, backend systems, database-driven workflows, AI-assisted features, and accessibility-focused software.",
  },
  {
    id: "education",
    category: "education",
    title: "Education",
    keywords: ["education", "school", "degree", "uci", "cal poly", "masters", "bachelors"],
    answer:
      "Abdul is pursuing an M.S. in Software Engineering at UC Irvine, expected December 2026. He earned a B.S. in Computer Science from Cal Poly Pomona in May 2024, with a minor in Data Science.",
  },
  {
    id: "skills",
    category: "skills",
    title: "Technical Skills",
    keywords: ["skills", "tech", "technologies", "stack", "languages", "tools"],
    answer:
      "Abdul works with JavaScript, TypeScript, Python, Java, React, Next.js, React Native, Flask, Django, Tailwind CSS, PostgreSQL, MySQL, MongoDB, Supabase, AWS, Azure, Vercel, Docker, Git, GitHub, scikit-learn, Pandas, NumPy, OpenCV, TensorFlow, and PyTorch.",
  },
  {
    id: "experience",
    category: "experience",
    title: "Professional Experience",
    keywords: ["experience", "work", "job", "professional", "prime", "paintflow"],
    answer:
      "Abdul's experience includes freelance software engineering for PaintFlow, independent software engineering work on an F1 fan engagement platform, IT Support Specialist I at Prime Healthcare, and Project Assistant at M&M Construction.",
  },
  {
    id: "paintflow",
    category: "projects",
    title: "PaintFlow",
    keywords: ["paintflow", "paint", "erp", "inventory", "billing", "invoice"],
    answer:
      "PaintFlow is a full-stack ERP-style platform for a paint shop. It manages products, inventory, billing, customer and vendor records, reports, and PDF-ready invoices through a modern dashboard workflow. It uses Next.js, TypeScript, Supabase, and ERP-style product workflows.",
  },
  {
    id: "p1-predictions",
    category: "projects",
    title: "P1 Predictions Play-Along",
    keywords: ["p1", "f1", "formula", "predictions", "leaderboard", "supabase"],
    answer:
      "P1 Predictions Play-Along is a Formula 1 predictions platform with automated scoring, live leaderboards, and a normalized Supabase data model for seasons, races, and repeatable scoring logic.",
  },
  {
    id: "accessibility",
    category: "projects",
    title: "Accessibility Work",
    keywords: ["accessibility", "wcag", "figma", "plugin", "thesis", "research"],
    answer:
      "Abdul works on accessibility through a Figma Accessibility Checker plugin and graduate research evaluating websites built with modern website builders using WCAG-based audits and cross-platform analysis.",
  },
  {
    id: "machine-learning",
    category: "projects",
    title: "Machine Learning Projects",
    keywords: ["machine learning", "ml", "ai", "nba", "computer vision", "stock"],
    answer:
      "Abdul's ML and AI work includes an NBA champion prediction project using Python, Pandas, and scikit-learn; an ODLC computer vision inferencing system; and an AWS-hosted stock trading AI team project.",
  },
  {
    id: "expense-tracker",
    category: "projects",
    title: "Expense Tracker",
    keywords: ["expense", "tracker", "pennywise", "mobile", "react native", "docker"],
    answer:
      "The Expense Tracker is a full-stack application with CRUD workflows, a multi-screen UI, and containerized development. It uses React Native, Python, and Docker.",
  },
  {
    id: "contact",
    category: "contact",
    title: "Contact",
    keywords: ["contact", "email", "phone", "linkedin", "github", "hire", "reach"],
    answer:
      "You can contact Abdul at abdulksyed10@gmail.com or through the contact form on this website. His LinkedIn is linkedin.com/in/abdul-kalam-syed and his GitHub is github.com/abdulksyed10.",
  },
];
