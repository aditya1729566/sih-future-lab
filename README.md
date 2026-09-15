# SIH Future Lab

An independent, frontend-only reimagining of Smart India Hackathon as a cinematic national innovation network. The experience is designed as a digital exhibition rather than a replacement for the official SIH portal.

## Creative direction

The visual system uses a persistent procedural **Innovation Core**: 24 engineered radial modules that assemble, respond to the pointer, tune to challenge themes, and transform with the page narrative. Dark graphite, mineral white, restrained saffron, India green and cyan create an Indian technology identity without relying on tricolour decoration.

## Stack

- **Next.js 16 + TypeScript** — statically deployable application architecture and strict content types.
- **React Three Fiber, Three.js and Drei** — procedural 3D scene, lighting and geometry helpers.
- **GSAP + ScrollTrigger** — scroll-linked narrative reveals and technical process-line choreography.
- **Framer Motion** — loader, full-screen menu and challenge-dialog transitions.
- **Lenis** — responsive smooth scrolling synchronized with ScrollTrigger.
- **Custom CSS and global tokens** — precise art direction without a component-library aesthetic.

## Content and sources

All displayed rules and challenges are labelled by edition and linked to official SIH sources. The current content uses the SIH 2024 college guidance and official finale archive. No unverified participation totals or affiliations are presented.

- [Official SIH website](https://www.sih.gov.in/)
- [SIH 2024 college guidelines](https://www.sih.gov.in/letters/Guidelines-College-SPOC.pdf)
- [SIH 2024 finale archive](https://finale.sih.gov.in/event/NC010)

## Inspiration

- [Khanh Nguyen](https://khanhnguyen.design/) — chapter-based storytelling and typographic restraint.
- [Nixtio](https://nixtio.com/) — pacing, project indexing and motion density.
- [Dario Grigoletti](https://grigoletti.ch/en/) — editorial scale and transitions.
- [Noxediem](https://noxediem.ch/en/) — cinematic image treatment and navigation rhythm.

The references were studied for principles only; the SIH identity, layouts and 3D system are original.

## AI tools, skills and plugins

- **OpenAI Codex** — research, art direction, frontend implementation and QA.
- **3d-frontend-engineer skill** — scene architecture, interaction, performance and visual comparison workflow.
- **frontend-design skill** — SIH-specific type, palette, composition and anti-template critique.
- **ui-ux-pro-max skill** — accessibility, responsive behavior, WebGL fallback and interaction checks.
- No external connector plugins were used.

## What I learned

- Coordinating one persistent R3F scene with a long editorial page.
- Synchronizing Lenis and ScrollTrigger without competing animation loops.
- Turning a procedural 3D object into narrative structure instead of decoration.
- Maintaining reduced-motion and non-WebGL equivalents for an immersive experience.

## Setup

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Links

- Live URL: https://rea-eight-silk.vercel.app
- Private repository: https://github.com/aditya1729566/sih-future-lab

## Disclaimer

This is an independent design exercise. Smart India Hackathon names, marks and factual material belong to their respective official organizations.
