# System Architecture & Codebase Design Guidelines

This document outlines the architectural patterns, component hierarchy, data models, and maintainability strategies implemented in Dheeraj Khakre's developer portfolio and system showcase.

---

## 1. Architectural Principles

1. **Separation of Concerns (SoC)**:
   - `src/types/`: Strongly typed TypeScript interfaces.
   - `src/data/`: Single source of truth for resume details, project metadata, and timeline events.
   - `src/services/`: Stateless business logic (e.g. PDF generation, API calls, mailer formatters).
   - `src/components/`: Modular, presentation-focused UI components.

2. **Zero-Pill Anti-Slop Discipline**:
   - Clean typographic separators (`·`, `/`, `-`) for metadata instead of arbitrary candy pill badges.
   - Strict 60-30-10 color budget (60% dark surface, 30% structural borders, 10% electric blue & violet accents).
   - Authoritative typography combining `Geist` for editorial hierarchy and `JetBrains Mono` for computational telemetry.

3. **High Reliability & Fallbacks**:
   - The contact form provides instant feedback, client-side validation, and a mailto fallback ensuring messages are never lost if external proxies are offline.
   - The PDF generator runs client-side with `jsPDF`, meaning no backend rendering servers or third-party web services can fail the download.

---

## 2. Directory Structure

```
├── .github/
│   └── workflows/
│       ├── ci.yml                 # Automated PR validation & matrix testing
│       └── deploy.yml             # Production release & deployment pipeline
├── src/
│   ├── __tests__/
│   │   └── portfolio.test.ts     # Automated unit test suite (Vitest)
│   ├── components/
│   │   ├── AboutSection.tsx      # Engineering philosophy & pillars
│   │   ├── AngularShowcaseSection.tsx # Frontend design & Angular code patterns
│   │   ├── ContactSection.tsx    # Validated message form & direct channels
│   │   ├── EducationSection.tsx  # Academic credentials & CS foundations
│   │   ├── ExperienceSection.tsx # Career timeline (ITC Infotech, Qualfon)
│   │   ├── Footer.tsx            # Navigation links, copyright & scroll-to-top
│   │   ├── HeroSection.tsx       # Bio, CTA buttons & interactive terminal sandbox
│   │   ├── LinkedInSection.tsx   # Prominent LinkedIn showcase & profile link
│   │   ├── Navbar.tsx            # Sticky header with status badge & controls
│   │   ├── ProjectSpecsModal.tsx # Deep technical architecture popup
│   │   ├── ProjectsSection.tsx   # Verified GitHub repositories showcase
│   │   ├── ResumeModal.tsx       # Full resume reading modal & print handler
│   │   └── WhatsNextSection.tsx  # Research trajectory (Spring AI, RAG, K8s)
│   ├── data/
│   │   └── portfolioData.ts      # Structured data for Dheeraj Khakre
│   ├── services/
│   │   └── resumePdfService.ts   # jsPDF client-side resume builder
│   ├── types/
│   │   └── portfolio.ts          # Core TypeScript domain models
│   ├── App.tsx                   # Main layout coordinator & modal state
│   ├── index.css                 # Tailwind CSS v4 directives & font bindings
│   └── main.tsx                  # React DOM entry point
├── package.json                  # Scripts & dependencies
├── tsconfig.json                 # TypeScript compiler configurations
└── vite.config.ts                # Vite build settings
```

---

## 3. How to Update Portfolio Content

All personal and project information is stored in `src/data/portfolioData.ts`.

- **To add or edit a GitHub project**:
  Modify the `PROJECTS_DATA` array. Update `title`, `repoName`, `repoUrl`, `description`, `challenge`, `solution`, and `specs`.

- **To update work experience**:
  Modify the `EXPERIENCE_DATA` array in `src/data/portfolioData.ts`. The resume PDF generator automatically reads from this array.

- **To add new skills**:
  Update `SKILL_CATEGORIES` in `src/data/portfolioData.ts`. Mark skills as `tested: true` (Project Tested) or `tested: false` (Active Exploration).

---

## 4. Testing Strategy

Automated tests in `src/__tests__/portfolio.test.ts` execute automatically on every pull request via GitHub Actions.
To add new tests:
```bash
npm run test
```
All unit tests run headlessly in milliseconds using Vitest.
