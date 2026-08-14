# Legacy Group Title, LLC — Website

Modern, Apple-inspired rebuild of [legacygrouptitle.com](https://www.legacygrouptitle.com/).
Static site — no build step, no dependencies. Preserves the original brand colors,
logo, and photography while adding floating dynamic cards, glassmorphism, smooth
scroll animations, and an interactive rate calculator.

## Brand
| Token | Value |
| --- | --- |
| Deep teal (primary) | `#0B4251` |
| Gold (accent) | `#F2C864` |
| Mist gray | `#C2D0D4` |
| Font | System / SF Pro / Inter stack |

## Pages
- `index.html` — Home (hero, why-choose cards, WFG partner, services teaser, rate calculator, contact)
- `services.html` — Residential & Land, Closing Services, Commercial Title
- `homeowners.html` — Buyers, Sellers, What is title insurance, coverage accordions

## Structure
```
├── index.html
├── services.html
├── homeowners.html
├── css/styles.css      # design system
├── js/main.js          # nav, reveal, parallax, calculator, accordions
└── assets/img/         # logo + optimized photography
```

## Deploy
It's fully static — deploy the folder as-is:
- **Vercel:** import the repo, framework preset = "Other", output dir = root.
- **Cloudflare Pages:** connect the repo, build command = none, output = `/`.
- **GitHub Pages:** Settings → Pages → deploy from `main` / root.

## Contact
orders@legacytitle.com · 704-467-3031 · All counties in NC & SC · Available nights & weekends

---
*Rate calculator provides ballpark estimates only (ALTA rule of thumb). Underwritten by WFG National Title Insurance Company.*
