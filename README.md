<h1 align="center">Silent-Havoc</h1>
<p align="center">Welcome to the official website of Silent-Havoc, an Airsoft Organization.</p>

<p align="center">
  <a href="https://silent-havoc.com" title="Visit Silent-Havoc">🌐 Website</a>
</p>

## Installation

Requires [Node.js](https://nodejs.org/en/download/package-manager) 20.9 or newer.

```
git clone https://github.com/keremketenci/silent-havoc-website.git
cd silent-havoc-website

npm install
cp .env.example .env.local   # then fill in the values
```

## Usage

| Command             | Description                        |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Start the development server       |
| `npm run build`     | Production build                   |
| `npm run start`     | Serve the production build         |
| `npm run lint`      | ESLint                             |
| `npm run typecheck` | Generate route types and run `tsc` |
| `npm run format`    | Format the code with Prettier      |

## Environment variables

See [`.env.example`](.env.example). Forms need the `SMTP_*` values and the home
page Instagram feed needs `INSTAGRAM_ACCESS_TOKEN`.

## Project structure

```
messages/                 Translations (en, tr) + blog/ post contents
public/                   Static files (icons, team photos)
src/
  app/
    [locale]/             Pages (home, team, join-us, contact, rules, blog)
    api/                  Form endpoints (contact, join-us, subscribe)
    robots.ts, sitemap.ts SEO
  components/
    layout/               Navbar, footer, loading screen, language/noise toggles
    sections/             Page sections, one folder per page
    effects/              Visual effects (cursor, sparks, noise, circular text...)
    ui/                   Custom UI pieces (buttons, cards, labels, Icon)
    shadcn/ui/            shadcn/ui components (generated, avoid hand edits)
  data/                   Static data: team members, navigation, icons
  hooks/                  React hooks
  i18n/                   next-intl routing and request config
  lib/                    Helpers: site config/SEO, blog, mail, utils
  proxy.ts                Locale routing (next-intl)
```

### Conventions

- Pages and sections are **server components**. Put `"use client"` only on the
  smallest component that actually needs state, effects or browser APIs.
- Components use **named exports**; only Next.js files (`page`, `layout`, ...) use default exports.
- New blog post: add the slug to `src/lib/blog.ts` and its content under
  `Posts.<slug>` in `messages/blog/en.json` and `messages/blog/tr.json`.
- New icon: add the SVG to `public/icons/` and register it in `src/data/icons.ts`.
