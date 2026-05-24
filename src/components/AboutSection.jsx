import { Briefcase, Code, GraduationCap, User } from "lucide-react";

export const AboutSection = () => {
  const education = [
    {
      school: "UC Irvine",
      program: "M.S. in Software Engineering (MSSE)",
      dates: "Sep 2024 – Dec 2026 (Expected)",
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
      company: "PaintFlow",
      role: "Software Engineer · Freelance",
      dates: "Apr 2026 – Present",
    },
    {
      company: "F1 Fan Engagement Platform",
      role: "Software Engineer · Indipendent Project",
      dates: "Jan 2026 – Mar 2026",
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

  return (
    <section id="about" className="py-5 px-4 relative">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-start">
          {/* Left */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Software Engineer · Full-Stack · AI & Accessibility
            </h3>

            <p className="text-muted-foreground">
              I am a Master’s student in Software Engineering at UC Irvine with
              hands-on experience building full-stack applications, backend
              systems, database-driven workflows, and AI-assisted software
              features. My work spans production support, independent product
              development, accessibility research, and freelance engineering.
            </p>

            <p className="text-muted-foreground">
              I enjoy turning complex requirements into clean, reliable systems.
              I have built applications using React, Next.js, Flask, Supabase,
              PostgreSQL, and cloud tools, while also bringing real-world
              experience from supporting enterprise healthcare systems across
              production environments.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>

              <a
                href="/Abdul-Kalam-Syed-SWE-Internship-Resume.pdf"
                download="Abdul-Kalam-Syed-SWE-Internship-Resume.pdf"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 text-center"
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* Middle: Timeline */}
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
          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Full-Stack Development
                  </h4>
                  <p className="text-muted-foreground">
                    Building modern web applications with React, Next.js, Flask,
                    SQL, Supabase, PostgreSQL, Tailwind CSS, and cloud
                    deployments.
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
                    Designing REST APIs, relational schemas, scoring systems,
                    reporting workflows, and data-driven features with a focus
                    on reliability and maintainability.
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
                  <h4 className="font-semibold text-lg">
                    Production Experience
                  </h4>
                  <p className="text-muted-foreground">
                    Supporting enterprise healthcare systems, reproducing
                    issues, validating workflows, and improving processes in
                    high-volume, real-world environments.
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
      <div className="absolute left-2.5 top-0 bottom-0 w-px bg-border" />

      <div className="space-y-6">
        {items.map((item, idx) => (
          <div key={`${type}-${idx}`} className="relative pl-10">
            <span className="absolute left-2.5 top-[0.45rem] -translate-x-1/2 h-3.5 w-3.5 rounded-full bg-background ring-2 ring-primary/50">
              <span className="absolute inset-0.5 rounded-full bg-primary/20" />
            </span>

            {type === "education" ? (
              <>
                <div className="text-sm font-semibold text-foreground">
                  {item.school}
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.program}
                </div>
                {item.minor && (
                  <div className="text-sm text-muted-foreground">
                    {item.minor}
                  </div>
                )}
                <div className="text-xs text-muted-foreground mt-1">
                  {item.dates}
                </div>
              </>
            ) : (
              <>
                <div className="text-sm font-semibold text-foreground">
                  {item.company}
                </div>

                <div className="text-sm text-muted-foreground">
                  {item.role}
                </div>

                {item.location && (
                  <div className="text-xs text-muted-foreground">
                    {item.location}
                  </div>
                )}

                {item.periods ? (
                  <div className="mt-1 space-y-1">
                    {item.periods.map((period, periodIdx) => (
                      <div
                        key={`${item.company}-${periodIdx}`}
                        className="text-xs text-muted-foreground"
                      >
                        <span className="font-medium text-foreground/80">
                          {period.label}:
                        </span>{" "}
                        {period.dates}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground mt-1">
                    {item.dates}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}