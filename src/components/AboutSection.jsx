import { Briefcase, Code, User } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Software Engineer · Full-Stack · Problem Solver
            </h3>

            <p className="text-muted-foreground">
              I’m a Master’s student in Software Engineering at UC Irvine with
              hands-on experience building scalable, production-ready
              applications. My work spans full-stack development, backend APIs,
              and data-driven features using modern frameworks and cloud tools.
            </p>

            <p className="text-muted-foreground">
              I enjoy breaking down complex problems, designing clean systems,
              and shipping reliable software. I’ve worked across academic and
              industry environments, collaborating with cross-functional teams
              and continuously refining my engineering skills.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>

              <a
                href="\Abdul_Kalam_Syed_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Full-Stack Development</h4>
                  <p className="text-muted-foreground">
                    Building modern web applications with React, Next.js,
                    Flask, SQL, Supabase, and cloud deployments.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Backend & Data</h4>
                  <p className="text-muted-foreground">
                    Designing REST APIs, database schemas, and data-driven
                    features with a focus on performance and maintainability.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Industry Experience</h4>
                  <p className="text-muted-foreground">
                    Experience working in production environments, supporting
                    large systems, and collaborating using Agile workflows and
                    modern engineering tools.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
