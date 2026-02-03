import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

/**
 * Content-only updates:
 * - Categories cleaned up to reflect actual project themes
 * - Descriptions improved
 * - No design / layout / styling changes
 */

const upcomingProjects = [
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
    id: "thesis-website-builders-accessibility",
    title: "Thesis: Accessibility Evaluation of Website Builders",
    description:
      "Graduate research evaluating real-world websites built with modern site builders, comparing accessibility outcomes through systematic WCAG-based audits and cross-platform analysis.",
    tags: ["WCAG", "Accessibility", "Research", "Auditing"],
    category: "accessibility",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: "p1-predictions",
    title: "P1 Predictions Play-Along",
    description:
      "Formula 1 predictions platform featuring automated scoring, live leaderboards, and a normalized Supabase data model supporting seasons, races, and repeatable scoring logic.",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    category: "fullstack",
    demoUrl: "#",
    githubUrl: "https://github.com/abdulksyed10/P1withMattTommy-PredictionsPlayAlong",
  },
];

const projects = [
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
    id: "cs4800-expense-tracker",
    title: "Expense Tracker (Full App)",
    description:
      "Full-stack expense tracking application with end-to-end CRUD workflows, a multi-screen UI, and containerized development for consistent local setup.",
    tags: ["React Native", "Python", "Docker"],
    category: "fullstack",
    demoUrl: "#",
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
    demoUrl: "#",
    githubUrl:
      "https://github.com/CS-3560-02-5/Los-Pollos-Hermanos-Drive-Thru-System",
  },
];

/**
 * Updated categories:
 * - Removed unused / misleading categories
 * - Aligned directly with your strongest themes
 */
const categories = [
  "upcoming",
  "all",
  "fullstack",
  "accessibility",
  "ml",
  "coursework",
];

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
