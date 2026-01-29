import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "PennyWise.money",
    description:
      "Full-stack expense tracking platform with NLP-based categorization and Plaid integration. Built with a scalable Flask REST API and deployed on AWS.",
    image: "/projects/pennywise.png",
    tags: ["Flask", "React Native", "SQLAlchemy", "AWS", "Plaid", "NLP"],
    demoUrl: "https://pennywise.money",
    githubUrl: "https://github.com/abdulksyed10",
  },
  {
    id: 2,
    title: "Figma Accessibility Checker (AI + Rules)",
    description:
      "Figma plugin that detects WCAG accessibility issues (contrast, font size, tap targets, alt text) using rule-based analysis with optional AI-powered fix suggestions.",
    image: "/projects/figma-accessibility.png",
    tags: ["JavaScript", "Figma API", "WCAG", "Accessibility", "AI"],
    demoUrl: "#",
    githubUrl: "https://github.com/abdulksyed10",
  },
  {
    id: 3,
    title: "P1 Predictions Game",
    description:
      "Interactive Formula 1 prediction platform with real-time leaderboards, race scoring logic, and Supabase-backed authentication and data tracking.",
    image: "/projects/p1-predictions.png",
    tags: ["Next.js", "Supabase", "PostgreSQL", "React"],
    demoUrl: "#",
    githubUrl: "https://github.com/abdulksyed10",
  },
  {
    id: 4,
    title: "CIFAR-10 Image Classification",
    description:
      "CNN-based image classification system achieving 75%+ accuracy with a PyQt GUI for real-time image uploads and predictions.",
    image: "/projects/cifar10.png",
    tags: ["Python", "TensorFlow", "Keras", "OpenCV", "CNN"],
    demoUrl: "#",
    githubUrl: "https://github.com/abdulksyed10",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A selection of projects spanning full-stack development, machine
          learning, and accessibility-focused software engineering.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>

                <div className="flex space-x-3">
                  {project.demoUrl !== "#" && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    className="text-foreground/80 hover:text-primary transition-colors duration-300"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/abdulksyed10"
          >
            Check My GitHub <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
