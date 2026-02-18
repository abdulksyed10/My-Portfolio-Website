import { Briefcase, Code, GraduationCap, User } from "lucide-react";

export const AboutSection = () => {
  const education = [
    {
      school: "UC Irvine",
      program: "M.S. in Software Engineering (MSSE)",
      dates: "Sep 2024 – Aug 2026",
    },
    {
      school: "Cal Poly Pomona",
      program: "B.S. in Computer Science (CS)",
      minor: "Minor in Data Science",
      dates: "Aug 2020 – May 2024",
    },
  ];

  const experience = [
    {
      company: "Prime Healthcare",
      role: "IT Support Specialist I",
      dates: "Jun 2023 – Present",
    },
    {
      company: "M&M Construction",
      role: "Project Assistant",
      dates: "Mar 2022 – Jun 2023",
    },
  ];

  return (
    <section id="about" className="py-5 px-4 relative">
      {/* Wider container so we use the side space */}
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        {/* Use 3 columns and let the right column be slightly wider */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-start">
          {/* Left */}
          <div className="space-y-6 lg">
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

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>

              <a
                href="\\Abdul-Kalam-Syed-SWE-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* Middle: Timeline (fixed alignment) */}
          <div className="space-y-6">
            <div className="gradient-border p-6 card-hover">
              <div className="text-left">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Education
                </h4>

                <Timeline items={education} type="education" />
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="text-left">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Experience
                </h4>

                <Timeline items={experience} type="experience" />
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="grid grid-cols-1 gap-6 lg">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Full-Stack Development</h4>
                  <p className="text-muted-foreground">
                    Building modern web applications with React, Next.js, Flask,
                    SQL, Supabase, and cloud deployments.
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
                    Experience supporting production systems, resolving
                    real-world incidents, and collaborating in Agile workflows.
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

function Timeline({ items, type }) {
  return (
    <div className="mt-5 relative">
      {/* Line: aligned to the center of the dots */}
      <div className="absolute left-2.5 top-0 bottom-0 w-px bg-border" />

      <div className="space-y-6">
        {items.map((item, idx) => (
          <div key={`${type}-${idx}`} className="relative pl-10">
            {/* Dot: perfectly centered over the line */}
            <span className="absolute left-2.5 top-[0.45rem] -translate-x-1/2 h-3.5 w-3.5 rounded-full bg-background ring-2 ring-primary/50">
              <span className="absolute inset-0.5 rounded-full bg-primary/20" />
            </span>

            {type === "education" ? (
              <>
                <div className="text-sm font-semibold text-foreground">
                  {item.school}
                </div>
                <div className="text-sm text-muted-foreground">{item.program}</div>
                <div className="text-sm text-muted-foreground">{item.minor}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {item.dates}
                </div>
              </>
            ) : (
              <>
                <div className="text-sm font-semibold text-foreground">
                  {item.company}
                </div>
                <div className="text-sm text-muted-foreground">{item.role}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {item.dates}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}