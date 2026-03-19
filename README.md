# Cybersecurity Portfolio Workspace

This repository now serves two jobs:
1. It contains the live Next.js portfolio implementation.
2. It contains a Cursor-native operating system for redesigning, auditing, and evolving the portfolio without drifting from factual truth.

## Objective

Build the strongest possible cybersecurity portfolio for Pablo using the current site as the factual baseline. Improve positioning, information architecture, copy, visual system, UX, performance, and recruiter conversion without inventing achievements or changing the substance of the profile.

## Guiding Principles

- Truth over hype.
- Content before decoration.
- Premium and technical, not flashy.
- Recruiter clarity before novelty.
- Offensive and defensive credibility must both be visible.
- Mobile, accessibility, SEO, and performance are first-class constraints.

## Workspace Map

```text
.
|-- .cursor/
|   |-- rules/
|   `-- skills/
|-- agents/
|   |-- subagents.md
|   `-- *.md
|-- app/
|-- components/
|-- content/
|   `-- source-of-truth.md
|-- design/
|   `-- creative-direction.md
|-- docs/
|   `-- *.md
|-- lib/
|-- prompts/
|   `-- *.md
|-- references/
|   `-- current-portfolio-baseline.md
|-- skills/
|   `-- README.md
|-- tasks/
|   `-- templates.md
`-- workflows/
    `-- portfolio-operating-system.md
```

## How To Use This Workspace In Cursor

1. Start with `references/current-portfolio-baseline.md` and `content/source-of-truth.md`.
2. Read `docs/vision.md`, `docs/brand-strategy.md`, and `docs/information-architecture.md` before changing copy or UI.
3. Let the `Portfolio-Orchestrator` coordinate work and hand off to specialist agents.
4. Apply the project skills in `.cursor/skills/` for section redesign, audits, and recruiter checks.
5. Follow `.cursor/rules/` on every content, design, and engineering change.
6. Use `tasks/templates.md` and `prompts/` for repeatable section-level work.
7. Ship only after `docs/definition-of-done.md` is satisfied.

## Current Positioning Baseline

The current portfolio already establishes these core signals:
- Cybersecurity and IAM engineering background.
- Blue Team to Red Team transition.
- Pentesting focus with Active Directory depth.
- HTB practice and OSCP-oriented preparation.
- Security automation in Python, PowerShell, and Bash.
- Professional projects, certifications, case studies, and contact pathways.

These remain the factual backbone of the site.

## Immediate Next Build Phases

- Normalize portfolio content into reusable structured content.
- Redesign information architecture and homepage hierarchy.
- Define the premium visual system and design tokens.
- Rebuild sections with stronger recruiter readability and cleaner components.
- Run recruiter, accessibility, SEO, and performance audits.
