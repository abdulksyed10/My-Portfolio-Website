import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

const upcomingProjects = [
  {
    id: "ai-restaurant-website-builder",
    title: "AI Restaurant Website Builder (Upcoming)",
    description:
      "AI-driven builder that generates production-ready restaurant websites (menu, sections, SEO, accessibility-first defaults) with clean, editable output.",
    tags: ["Next.js", "AI", "SEO", "Accessibility"],
    category: "fullstack",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: "thesis-website-builders-accessibility",
    title: "Thesis: Accessibility Evaluation of Website Builders (Upcoming)",
    description:
      "Research project evaluating modern website builders for accessibility outcomes across real-world sites, with systematic auditing and comparative analysis.",
    tags: ["WCAG", "Accessibility", "Research", "Auditing"],
    category: "accessibility",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: "p1-predictions",
    title: "P1 Predictions Play-Along",
    description:
      "Formula 1 predictions platform with scoring logic, leaderboards, and a Supabase-backed data model.",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    category: "fullstack",
    demoUrl: "#",
    githubUrl: "https://github.com/abdulksyed10/P1withMattTommy-PredictionsPlayAlong",
  },
];

const projects = [
  // ===== Working on now =====
  {
    id: "my-portfolio-website",
    title: "Portfolio Website",
    description:
      "Personal portfolio site focused on clean UI, performance, and accessibility-friendly design.",
    tags: ["React", "Vite", "TailwindCSS"],
    category: "web",
    demoUrl: "https://www.abdulkalamsyed.com/",
    githubUrl: "https://github.com/abdulksyed10/My-Portfolio-Website",
  },
  // {
  //   id: "p1-predictions",
  //   title: "P1 Predictions Play-Along",
  //   description:
  //     "Formula 1 predictions platform with scoring logic, leaderboards, and a Supabase-backed data model.",
  //   tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
  //   category: "fullstack",
  //   demoUrl: "#",
  //   githubUrl: "https://github.com/abdulksyed10/P1withMattTommy-PredictionsPlayAlong",
  // },
  {
    id: "figma-plugin-tool",
    title: "Figma Accessibility Checker (Rules + AI)",
    description:
      "Figma plugin that flags WCAG issues (contrast, small text, tap targets, missing alt text) with optional AI fix suggestions.",
    tags: ["JavaScript", "Figma API", "WCAG", "Accessibility"],
    category: "accessibility",
    demoUrl: "#",
    githubUrl: "https://github.com/abdulksyed10/Figma-plugin-tool",
  },
  {
    id: "website-launch-timer",
    title: "Website Launch Timer",
    description:
      "Simple launch/countdown site for “under construction” pages and portfolio rollout.",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "web",
    demoUrl: "#",
    githubUrl: "https://github.com/abdulksyed10/Website_Launch_timer",
  },

  // ===== Showcase Projects (from your GitHub list) =====
  {
    id: "cs4800-expense-tracker",
    title: "CS4800 Expense Tracker (Full App)",
    description:
      "End-to-end expense tracker with frontend + backend in a single repo.",
    tags: ["JavaScript", "Python", "React Native", "Docker"],
    category: "fullstack",
    demoUrl: "#",
    githubUrl: "https://github.com/CS4800-expense-tracker/Project",
  },
  {
    id: "cs4200-final",
    title: "CS4200 Final Project",
    description:
      "Course final project with applied computing experimentation and implementation work.",
    tags: ["Python"],
    category: "coursework",
    demoUrl: "#",
    githubUrl: "https://github.com/abdulksyed10/CS4200FinalProject",
  },
  {
    id: "drive-thru",
    title: "Los Pollos Hermanos Drive Thru System",
    description:
      "Group project (fork) implementing drive-thru order flow and system logic.",
    tags: ["Python"],
    category: "coursework",
    demoUrl: "#",
    githubUrl:
      "https://github.com/abdulksyed10/Los-Pollos-Hermanos-Drive-Thru-System",
  },
  {
    id: "odlc",
    title: "ODLC Machine Inferencing System",
    description:
      "Object recognition + obstacle avoidance scripts repo used for collaboration and year-to-year reuse.",
    tags: ["Python", "Computer Vision"],
    category: "ml",
    demoUrl: "#",
    githubUrl: "https://github.com/MarcCruzs/ODLC_Machine_Inferencing_System",
  },
  {
    id: "berkshire-javafx",
    title: "Berkshire Hathaway Frontend Redesign (JavaFX)",
    description:
      "Team project to modernize a website as a desktop application using JavaFX.",
    tags: ["Java", "JavaFX"],
    category: "coursework",
    demoUrl: "#",
    githubUrl:
      "https://github.com/CS2450-Frontend-Redesign/Berkshire-Hathaway-Frontend-Redesign",
  },
  {
    id: "stock-ai-aws",
    title: "Stock Trading AI (AWS Hosted)",
    description: "Team/course project for a stock trading AI hosted on AWS.",
    tags: ["JavaScript", "AWS"],
    category: "ml",
    demoUrl: "#",
    githubUrl: "https://github.com/DaJoesh/CS4650-AWS-Project",
  },
  {
    id: "cs4250-group",
    title: "CS4250.01 Group Project",
    description: "Group repo with applied Python implementation work.",
    tags: ["Python"],
    category: "coursework",
    demoUrl: "#",
    githubUrl: "https://github.com/Jman316b/CS4250.01-Group-Project",
  },

  // ===== Additional active / recent (public) =====
  {
    id: "compsci273a",
    title: "CompSci273A",
    description:
      "Machine learning coursework and experiments (notebooks and supporting work).",
    tags: ["Jupyter", "Python", "ML"],
    category: "ml",
    demoUrl: "#",
    githubUrl: "https://github.com/abdulksyed10/CompSci273A",
  },
  {
    id: "cs273a-final",
    title: "CS273A Final Project",
    description: "Final project repo for ML coursework with notebooks and results.",
    tags: ["Jupyter", "Python", "ML"],
    category: "ml",
    demoUrl: "#",
    githubUrl: "https://github.com/abdulksyed10/CS273A-FinalProject",
  },
];

// Add "upcoming" as a filter, keep "all", and ensure "upcoming" appears first.
const categories = [
  "upcoming",
  "all",
  "web",
  "fullstack",
  "accessibility",
  "ml",
  "coursework",
];

export const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("upcoming");

  const allProjects = useMemo(
    () => [...upcomingProjects, ...projects],
    []
  );

  const filteredProjects = useMemo(() => {
    if (activeCategory === "upcoming") return upcomingProjects;
    if (activeCategory === "all") return allProjects;
    return allProjects.filter((p) => p.category === activeCategory);
  }, [activeCategory, allProjects]);

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Projects across full-stack engineering, accessibility tooling, and machine learning.
          Filter by category to scan quickly.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-card p-6 rounded-lg shadow-xs card-hover flex flex-col"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={`${project.id}-${tag}`}
                    className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center gap-3">
                {project.demoUrl !== "#" && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    aria-label="Open live demo"
                    title="Live demo"
                  >
                    <ExternalLink size={20} />
                  </a>
                )}

                {project.githubUrl !== "#" && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    aria-label="Open GitHub repository"
                    title="GitHub"
                  >
                    <Github size={20} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/abdulksyed10"
          >
            Check My GitHub <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
