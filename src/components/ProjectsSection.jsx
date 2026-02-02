import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

const upcomingProjects = [
  {
    id: "ai-restaurant-website-builder",
    title: "AI Restaurant Website Builder (Upcoming)",
    description:
      "Generates production-ready restaurant sites from minimal inputs—menu pages, section layouts, SEO basics, and accessibility-first defaults—with clean, editable code output.",
    tags: ["Next.js", "AI", "SEO", "Accessibility"],
    category: "fullstack",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: "thesis-website-builders-accessibility",
    title: "Thesis: Accessibility Evaluation of Website Builders (Upcoming)",
    description:
      "Comparative study of real-world websites built with modern builders, measuring accessibility outcomes (WCAG-focused audits) and identifying patterns that lead to failures or better defaults.",
    tags: ["WCAG", "Accessibility", "Research", "Auditing"],
    category: "accessibility",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: "p1-predictions",
    title: "P1 Predictions Play-Along",
    description:
      "Formula 1 predictions game with automated scoring, leaderboards, and a Supabase-backed data model designed for seasons, races, and repeatable scoring runs.",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    category: "fullstack",
    demoUrl: "#",
    githubUrl: "https://github.com/abdulksyed10/P1withMattTommy-PredictionsPlayAlong",
  },
];

const projects = [
  // ===== High-signal, actively relevant =====
  {
    id: "figma-plugin-tool",
    title: "Figma Accessibility Checker (Rules + AI)",
    description:
      "Figma plugin that detects common WCAG issues—color contrast, small text, tap targets, and missing alt text—and generates actionable fix suggestions (with optional AI support).",
    tags: ["JavaScript", "Figma API", "WCAG", "Accessibility"],
    category: "accessibility",
    demoUrl: "#",
    githubUrl: "https://github.com/abdulksyed10/Figma-plugin-tool",
  },

  {
    id: "cs4800-expense-tracker",
    title: "Expense Tracker (Full-Stack App)",
    description:
      "End-to-end expense tracking app with a full CRUD workflow, multi-surface UI, and containerized development to keep setup repeatable across machines.",
    tags: ["React Native", "Python", "Docker", "APIs"],
    category: "fullstack",
    demoUrl: "#",
    githubUrl: "https://github.com/CS4800-expense-tracker/Project",
  },

  {
    id: "berkshire-javafx",
    title: "Berkshire Hathaway Redesign (JavaFX Desktop App)",
    description:
      "Team redesign that re-implemented a legacy website experience as a JavaFX desktop application, focusing on cleaner structure, navigation, and UI modernization.",
    tags: ["Java", "JavaFX", "UI Engineering"],
    category: "coursework",
    demoUrl: "#",
    githubUrl:
      "https://github.com/CS2450-Frontend-Redesign/Berkshire-Hathaway-Frontend-Redesign",
  },

  // ===== ML / CV (kept the ones that communicate a concrete theme) =====
  {
    id: "odlc",
    title: "ODLC Machine Inferencing System",
    description:
      "Computer vision repo for object recognition workflows used across iterations—structured to support collaboration, reuse, and rapid experimentation on detection pipelines.",
    tags: ["Python", "Computer Vision"],
    category: "ml",
    demoUrl: "#",
    githubUrl: "https://github.com/MarcCruzs/ODLC_Machine_Inferencing_System",
  },
  {
    id: "compsci273a",
    title: "ML Coursework & Experiments (CompSci273A)",
    description:
      "Collection of machine learning experiments and notebooks covering model training, evaluation, and iteration—kept as a single curated ML bucket instead of many small repos.",
    tags: ["Python", "Jupyter", "Machine Learning"],
    category: "ml",
    demoUrl: "#",
    githubUrl: "https://github.com/abdulksyed10/CompSci273A",
  },

  // ===== Optional: keep only if you want a “fun/extra” systems project =====
  {
    id: "drive-thru",
    title: "Drive-Thru Order System (Los Pollos Hermanos)",
    description:
      "Order-flow and system-logic implementation that models a drive-thru workflow end-to-end, focusing on state transitions and correctness in the ordering pipeline.",
    tags: ["Python"],
    category: "coursework",
    demoUrl: "#",
    githubUrl:
      "https://github.com/abdulksyed10/Los-Pollos-Hermanos-Drive-Thru-System",
  },
];

const categories = ["upcoming", "all", "fullstack", "accessibility", "ml", "coursework"];

export const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("upcoming");

  const allProjects = useMemo(() => [...upcomingProjects, ...projects], []);

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
          Focused, high-signal work across full-stack engineering, accessibility tooling, and ML.
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
