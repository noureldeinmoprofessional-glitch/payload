# The Knowledge Club™ — Payload CMS Website

A **Next.js 15 + Payload 3 (MongoDB)** rebuild of the Knowledge Club landing page.
Every section is editable from the admin panel — no code changes needed to update
content. The frontend is a server component that renders live CMS data, with all
GSAP/ScrollTrigger motion preserved from the original design.

---

## Requirements

- **Node** 18.20.2+ or 20.9.0+
- **pnpm** 9/10 (or npm — swap the commands below)
- **MongoDB** — a local `mongod`, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

---

## Quick start

```bash
# 1. Install
pnpm install

# 2. Configure environment
cp .env.example .env
#   then edit .env:
#   - PAYLOAD_SECRET       → any long random string
#   - DATABASE_URI         → your Mongo connection string
#   - NEXT_PUBLIC_SERVER_URL → http://localhost:3000 for local dev

# 3. Seed the real content (events, articles, testimonials, sponsors, FAQs + admin user)
pnpm seed

# 4. Run
pnpm dev
```

Then open:

- **Site**  → http://localhost:3000
- **Admin** → http://localhost:3000/admin
  Default login (created by the seed): `admin@knowledgeclub.com` / `ChangeMe123!`
  **Change this immediately.** If you skip the seed, the first visit to `/admin`
  prompts you to create the first user.

---

## How the content maps to the CMS

| Section | Where to edit in admin |
| --- | --- |
| Hero, Stats, About, Why Choose Us, Member Journey, Final CTA | **Globals → Home Page** (tabbed) |
| Nav, brand, Trusted-By label, Footer, social, newsletter | **Globals → Site Settings** |
| Event cards + filter | **Collections → Events** |
| Latest Articles | **Collections → Articles** (tick `featured` for the big one) |
| Success Stories | **Collections → Testimonials** (tick `featured` for the large panel) |
| Trusted-By marquee logos | **Collections → Sponsors** |
| FAQ accordion | **Collections → FAQs** |
| Uploaded imagery | **Collections → Media** |

Ordering across list collections is controlled by the numeric **`order`** field
(lower = first); Events also sort by date.

### Images
Each media-bearing field has both an **upload** relation (`image`) and an
**externalImage** URL fallback. The seed uses Unsplash URLs so the site looks
complete out of the box — upload real photography through **Media** and attach it
to each item, then clear the external URLs. (Per the brand guide: authentic event
photography, no staged stock.)

### Icons
Icon fields take a **key** (e.g. `mission`, `network`, `grow`). The full list is
shown in each field's admin description and defined in
`src/app/(frontend)/icons.tsx`.

---

## ⚠️ Placeholder data to replace before launch

- **Stat / counter numbers** (Home → Stats) — currently 120+/85+/12K+/200+
- **Testimonials** — entire collection is placeholder copy & portraits
- **Sponsor logos** — text placeholders; upload real logo SVG/PNGs
- **Imagery** — Unsplash URLs throughout

---

## Project structure

```
src/
├── payload.config.ts          # Collections, globals, Mongo adapter
├── collections/               # Events, Articles, Testimonials, Sponsors, Faqs, Media, Users
├── globals/                   # HomePage (tabbed), SiteSettings (tabbed)
├── seed/index.ts              # `pnpm seed` — real content + admin user
└── app/
    ├── (payload)/             # Admin panel + REST/GraphQL API (Payload boilerplate)
    └── (frontend)/            # Public site
        ├── layout.tsx         # Cairo font + global CSS
        ├── page.tsx           # Server component — fetches CMS data, renders all 12 sections
        ├── Motion.tsx         # Client — GSAP reveals, counters, pinned journey, filter, FAQ, magnetic btns
        ├── styles.css         # Full design-system stylesheet
        ├── icons.tsx          # Keyed SVG icon set
        └── media.ts           # Upload-vs-URL image resolver
```

## Useful scripts

```bash
pnpm dev                 # dev server
pnpm build && pnpm start # production
pnpm generate:types      # regenerate src/payload-types.ts after schema changes
pnpm seed                # (re)seed collections (skips ones that already have data)
```

## Deploy notes

- Set the same env vars on your host (Vercel, Railway, etc.); point `DATABASE_URI`
  at a hosted Mongo (Atlas) and `NEXT_PUBLIC_SERVER_URL` at your domain.
- Uploaded media is written to `/media` on disk by default. For serverless hosts
  (e.g. Vercel), switch the `Media` collection to a cloud storage adapter
  (`@payloadcms/storage-s3`, `-vercel-blob`, etc.) since the filesystem is ephemeral.
