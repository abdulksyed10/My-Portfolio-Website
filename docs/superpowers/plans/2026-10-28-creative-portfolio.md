# Creative Portfolio Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement task-by-task. Track completion below and in the progress notes. The user requested direct implementation, so continue without a review handoff.

**Goal:** Replace the active portfolio design and assistant with a cohesive, animated, responsive engineering portfolio.
**Architecture:** A central portfolio dataset feeds modular React sections and a deterministic assistant engine. GSAP owns desktop intro/reveal/horizontal motion, while CSS and native scrolling provide mobile and reduced-motion layouts. SVG illustrations are local editable project assets.
**Tech Stack:** React 19, Vite, GSAP/ScrollTrigger/ScrollToPlugin, Lucide, CSS, SVG, Node test runner.
**Spec:** docs/superpowers/specs/2026-10-28-creative-portfolio-design.md

## Global constraints
- Work on new-creative-design. No commits or publication in this request.
- Do not open a browser or start a preview server.
- Preserve every existing career fact, project, skill and working URL; do not invent achievements or availability.
- No active minifigure or old layout. No LLM service. Preserve the existing contact backend and resumes.
- Provide responsive behavior from 360px to wide desktop; useful static content without animation.

## Review focus
- Short mobile viewports: no clipped contact form or chat composer; internal chat scrolling.
- Mode changes/resizing: remove pin spacers, transforms, listeners and stale scroll positions.
- Broad/ambiguous assistant questions and follow-ups: grounded answers with explicit uncertainty.
- Project filters and empty searches: correct results, no broken modal state or placeholder links.
- Local contact submission: truthful error state and a useful mailto action, never pretend delivery.

### Task 1 — Consolidate data and media
**Files:** src/data/portfolio.js; public/images/projects/*.svg; scripts/create-project-art.py.
**Interfaces:** profile, education, experience, skills, projects, featuredProjects; projects use id/title/description/tags/category/status/demoUrl/githubUrl/art.
- [x] Extract and preserve source facts from existing sections before replacing active imports.
- [x] Add four original interface illustrations with accessible project descriptions and explicit illustration caption.
- [x] Add meaningful integrity tests for uniqueness, valid links and complete filter results.

### Task 2 — Local assistant behavior
**Files:** src/lib/assistantEngine.js; src/data/assistantKnowledge.js; tests/assistant-engine.test.js.
**Interface:** answerQuestion(question, previousTopic?) -> { text, topic, links: [{label,url}], suggestions: string[] }.
- [x] Write tests for exact project aliases, job/degree questions, contextual tech follow-up, project recommendations, greetings and unknown questions; observe failure.
- [x] Implement token/phrase scoring, intent routing, safe fallback and shared-data answers.
- [x] Run tests and record results.

### Task 3 — New page and motion system
**Files:** src/pages/Home.jsx; src/components/portfolio/{Navigation,Hero,WorkShowcase,Profile,Skills,ProjectArchive,Contact}.jsx; src/hooks/usePortfolioMotion.js; src/styles/portfolio.css; src/index.css.
- [x] Implement new identity, intro assembly, featured panels and desktop GSAP horizontal gallery.
- [x] Implement complete profile timeline, filterable skills, searchable archive and dialog.
- [x] Implement contact request states and email fallback.
- [x] Add motion persistence, responsive CSS and complete GSAP cleanup; retain ordinary mobile scrolling.
- [x] Verify archive behavior with Node tests; inspect motion lifecycle and mobile sizing in source.

### Task 4 — Assistant interface and finishing
**Files:** src/components/ChatAssistant.jsx; src/styles/assistant.css; src/pages/NotFound.jsx; index.html; README.md; package.json.
- [x] Build conversation panel, typing indicator, useful link cards, suggestions, topic memory and reset.
- [x] Prevent duplicate sends, clean up timers, scroll new replies into view, close with Escape.
- [x] Add brand favicon/metadata, start/test scripts and local instructions.
- [x] Run all tests and production build. Request one bounded independent code review per executing-plans guidance, then address material findings.
- [x] Record validation and remaining limits. Leave work uncommitted and provide local run command.

## Progress / execution notes
- Plan created from source inspection. Existing React/Vite and GSAP are sufficient.
- User explicitly authorized creative choices, direct execution and skipping browser previews. No design-approval pause applies.


## Completion record
- Task 1: complete. Preserved 13 projects, original education/experience records and the complete skills dataset. Four local SVG concept illustrations pass XML parsing.
- Task 2: complete. Deterministic assistant includes project aliases, source links, proficiency-aware answers, context and explicit unknown/availability handling. Assistant regressions observed RED then GREEN.
- Task 3: complete. Active home page rebuilt from modular sections. Desktop GSAP gallery and mobile native swipe/grid alternatives, search/filter/detail interactions, profile and contact implemented.
- Task 4: complete. Assistant interface, metadata, favicon, start/test scripts and local documentation implemented.
- Final independent review: five actionable findings addressed in one focused pass: StrictMode dialog lifecycle, gallery native scroll offset at breakpoints, longest skill-name matching, project recommendation routing, and short-height chat composer layout.
- Verification: npm test -> 19/19 passing; git diff --check -> clean. Production build passes (recorded in session).
- Ruling: retained inactive prototype components rather than deleting unrelated historical source. They are not imported into the active portfolio or production bundle.
- Ruling: browser and visual interaction checks omitted because the owner explicitly requested no browser work. Responsive dimensions and lifecycle handling reviewed in source; device visual review remains for the owner.
- Ruling: project artwork is explicitly labeled interface illustration, not represented as real product screenshots. Replace those assets with owner-provided captures when available.
- No commits, push, deployment or preview server were created for this redesign.
