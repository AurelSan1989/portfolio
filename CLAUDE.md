# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page static portfolio/CV website for Aurélien Girodet (in career transition to software testing). Pure HTML/CSS, no JavaScript, no build tooling, no package manager.

## Commands

There is no build system, linter, or test suite. To preview the site, open `index.html` directly in a browser, or serve it locally, e.g.:

```
python -m http.server 8000
```

## Architecture

- `index.html` — the live site. Single page with anchor-linked sections: `#experience`, `#competences`, `#formation`, `#portfolio` (plus a hero section and header nav). All content (job history, skills, education, portfolio pieces) is hardcoded inline in French.
- `style/main.css` — stylesheet for `index.html`. Uses CSS custom properties defined in `:root` (`--color-*`, `--font-*`, `--spacing-*`) for the design system (charcoal/pearl/gold palette, Montserrat font). Responsive breakpoints at `968px` and `640px` via `@media` queries near the end of the file.
- `img/` — images referenced by `index.html` (profile photo, portfolio screenshots).
- `portfolio-modèle/` — a **reference template**, not part of the live site. Contains its own `index.html` + `style.css` with placeholder content ("Alexandre Dubois"). `index.html`/`style/main.css` were derived from this template; use it only to compare structure/styling patterns, don't link or serve it from the live site.

## Conventions

- Section IDs in `index.html` (`experience`, `competences`, `formation`, `portfolio`) are targeted both by the nav anchors and by CSS — keep them in sync if renaming.
- Class names follow a BEM-ish block pattern per section (e.g. `experience-item`, `experience-header`, `experience-title`, `experience-highlights`), mirrored across `education-*`, `portfolio-*`, `skill-*`. Follow the existing naming pattern for a section when adding new entries rather than introducing new class names.
- Content is in French; keep new copy consistent with that.
