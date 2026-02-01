import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const SKILLS = [
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
  { name: "PyTorch", tier: "advanced", category: "ml" },

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
];

const CATEGORY_LABELS = {
  all: "All",
  languages: "Languages",
  frameworks: "Frameworks",
  frontend: "Frontend",
  databases: "Databases",
  cloud: "Cloud",
  ml: "ML / AI",
  tools: "Tools",
};

const CATEGORY_ORDER = [
  "all",
  "languages",
  "frameworks",
  "frontend",
  "databases",
  "cloud",
  "ml",
  "tools",
];

const TIERS = [
  {
    key: "advanced",
    title: "Advanced",
    subtitle: "High confidence, used in real projects or professional settings.",
  },
  {
    key: "intermediate",
    title: "Intermediate",
    subtitle: "Solid working knowledge, used in multiple projects.",
  },
  {
    key: "familiar",
    title: "Familiar",
    subtitle: "Explored or used lightly; comfortable ramping up quickly.",
  },
];

function SkillChip({ label }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-sm",
        "border-border/70 bg-secondary/20 text-foreground",
        "shadow-[0_1px_0_rgba(0,0,0,0.08)]",
        "transition-colors hover:bg-secondary/45"
      )}
    >
      {label}
    </span>
  );
}

function TierSection({ title, subtitle, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.10)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "w-full text-left p-6",
          "flex items-start justify-between gap-4"
        )}
        aria-expanded={open}
      >
        <div className="min-w-0">
          <h3 className="text-lg md:text-xl font-semibold tracking-tight text-foreground">
            {title}
          </h3>
          <p className="mt-1 text-sm md:text-base text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <span className="shrink-0 mt-1 text-sm text-muted-foreground select-none">
          {open ? "Hide" : "Show"}
        </span>
      </button>

      <div className={cn("px-6 pb-6", open ? "block" : "hidden")}>
        {children}
      </div>
    </div>
  );
}

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SKILLS.filter((s) => {
      const okCategory =
        activeCategory === "all" || s.category === activeCategory;
      const okQuery = !q || s.name.toLowerCase().includes(q);
      return okCategory && okQuery;
    });
  }, [activeCategory, query]);

  const byTier = useMemo(() => {
    const map = { advanced: [], intermediate: [], familiar: [] };
    for (const s of filtered) map[s.tier].push(s);

    for (const k of Object.keys(map)) {
      map[k].sort((a, b) => a.name.localeCompare(b.name));
    }
    return map;
  }, [filtered]);

  const totalCount = filtered.length;

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            My <span className="text-primary">Skills</span>
          </h2>
          <p className="mt-3 text-base md:text-lg text-muted-foreground">
            Grouped by proficiency. Filter by category or search to keep it clean.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-10 flex flex-col gap-4">
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORY_ORDER.map((key) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                type="button"
                className={cn(
                  "px-4 py-2 rounded-full transition-colors duration-200 text-sm border shadow-sm",
                  activeCategory === key
                    ? "bg-primary text-primary-foreground border-primary/30"
                    : "bg-card/50 text-foreground border-border/70 hover:bg-secondary/60"
                )}
              >
                {CATEGORY_LABELS[key]}
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-xl">
              <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/60 px-4 py-3 shadow-sm">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search skills (e.g., React, AWS, Flask)..."
                  className={cn(
                    "w-full bg-transparent outline-none text-sm md:text-base",
                    "placeholder:text-muted-foreground"
                  )}
                />
                <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                  {totalCount} shown
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tiers */}
        <div className="space-y-6">
          {TIERS.map((tier) => {
            const items = byTier[tier.key] || [];
            if (items.length === 0) return null;

            return (
              <TierSection
                key={tier.key}
                title={tier.title}
                subtitle={tier.subtitle}
                defaultOpen={true} // all open by default (including Familiar)
              >
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <SkillChip key={`${tier.key}-${s.name}`} label={s.name} />
                  ))}
                </div>
              </TierSection>
            );
          })}

          {totalCount === 0 && (
            <div className="text-center text-muted-foreground py-10">
              No skills match your filters.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
