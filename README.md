# Abdul Kalam Syed — portfolio

A responsive React/Vite portfolio with an animated introduction, a horizontal selected-work sequence, a searchable project index, and a local interactive assistant.

## Run locally

```bash
npm install
npm start
```

`npm run dev` does the same thing. Open the localhost URL printed by Vite.

```bash
npm test
npm run build
npm run preview
```

## Content and artwork

- `src/data/portfolio.js` is the shared source for career information, education, skills, project details, and links.
- `src/lib/assistantEngine.js` routes questions and contextual follow-ups against portfolio facts. It does not use an LLM, require a model API key, or send chat messages to a server.
- `src/data/assistantKnowledge.js` contains project aliases and assistant copy.
- `src/components/portfolio/` contains the active page sections; `src/styles/portfolio.css` and `src/styles/assistant.css` define the design.
- `public/images/projects/` contains original SVG interface illustrations. These are visual concepts, not screenshots of the live products. Replace them with your own captures by updating the `art` values or image paths in the components. The editable artwork generator is `scripts/create-project-art.py`.
- Earlier prototype components remain in the source tree but are not imported by the active home page.

## Motion and small screens

The header's motion control remembers the visitor's preference. Full motion uses GSAP for the intro and, on sufficiently wide and tall screens, a pinned horizontal project sequence. Smaller viewports use native horizontal swiping with previous/next controls. Turning motion off presents featured projects in a grid. The initial preference respects the device's reduced-motion setting.

## Contact delivery

The contact form calls the existing `/api/contact` Vercel function. Production delivery needs `RESEND_API_KEY` and `TO_EMAIL` configured on the deployment. A plain Vite development server does not run that serverless function; the form displays a truthful error and a direct email link when delivery is unavailable. No messages are claimed as delivered without the backend's `{ ok: true }` response.

The three existing résumé PDFs remain in `public/`. Change `profile.resume` in the shared data file to select another version.

## Design and implementation notes

The design brief, implementation plan, and progress notes are in `docs/superpowers/`. This redesign was implemented without launching a browser preview, as requested. Production builds and Node behavior tests provide the automated checks; visual inspection across devices remains a separate local review.

## Readability and visual signature refinement

The active design now uses an `aks` monogram consistently in the header, assistant, and favicon. The hero includes an interactive engineering map: choose Interface, Logic, or Data to explore a linked project. Pointer movement adds restrained depth when full motion is enabled; touch and keyboard use the same layer buttons without requiring hover. A desktop chapter rail tracks location through the page. Featured project art gains scroll-linked angle changes and a page-sweep treatment.

The type scale has been increased throughout the page and chat. Short desktop viewports retain native gallery scrolling instead of squeezing the larger text into a pinned frame.
