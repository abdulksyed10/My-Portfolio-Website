# Creative portfolio redesign

## Intent
Create a distinctive, polished portfolio for Abdul Kalam Syed that makes his engineering work and experience easy to explore. The owner has delegated visual decisions and requests implementation in the current session without browser previews. Work on new-creative-design; leave the redesign uncommitted for review.

## Direction
An editorial engineering portfolio: charcoal / ivory foundation, electric chartreuse identity, expressive red, blue, lavender and mint work panels. Large geometric type, precise small labels, thin rules, purposeful asymmetry, layered interface illustrations. The introduction presents Abdul's name and software-engineering role directly; avoid slogans, exaggerated claims, filler and forced hobbies. Retire the minifigure and the previous design from the active page.

## Experience
1. Fixed compact navigation with motion setting and mobile menu.
2. Intro: name fragments and engineering disciplines assemble from different directions; floating project fragments and a live scroll indicator support the composition.
3. Selected work: four large illustrated project panels, a slightly angled comic-inspired composition with halftone and offset edges. Desktop scrolling pins the section and traverses horizontally; phones use native swipe and visible previous/next controls. Reduced motion uses a conventional grid.
4. Profile: concise introduction, complete education and experience timeline, downloadable existing resume.
5. Stack: filterable skill index retaining every existing skill and proficiency.
6. Project index: searchable/filterable archive of all 13 projects, detail dialog, actual demo/source links. No placeholder links.
7. Contact: bold invitation, email/phone/social links, working submission through existing /api/contact with visible errors and local email fallback.
8. Assistant: a restrained launcher and polished conversation panel; source-grounded local answers, topic memory, suggestions, useful links, typing indicator and conversation reset. No LLM/API dependency or claims of training.

## Data and media
Centralize all existing jobs, dates, degrees, GPAs, projects, URLs and skills. Correct typographic errors only. Do not invent availability, clients, performance numbers, qualifications or project outcomes. Create editable SVG interface illustrations for the four featured projects, explicitly presented as illustrations. Preserve all existing PDF resumes.

## Constraints
React/Vite, existing GSAP. Responsive at 360px through 1920px and larger; no fixed heights that clip content on small/short screens. No browser launch, preview server, deployment or commit. Support mouse, touch and keyboard where straightforward. Keep motion reversible and clean up GSAP contexts/listeners on unmount. Static content must remain visible if animation setup fails.

## Approaches
Chosen: React components + GSAP + CSS/SVG artwork, using existing dependencies. This supports deliberate art direction, native mobile scrolling and editable media without a GPU-dependent scene. Retaining the old 3D companion was rejected because the new brief replaces the prior visual direction. External LLM service is deferred explicitly by the owner.

## Validation
Node behavior tests for assistant matching, follow-up context, unknown answers, archive filters, and data/link integrity; production build; source review of responsive rules, GSAP lifecycle, dialog and contact state. Browser checks are intentionally omitted at the owner's request.
