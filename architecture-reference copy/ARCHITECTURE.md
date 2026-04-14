# Recast Website Architecture Reference

This folder documents the architecture patterns used in the Recast marketing website (recast.gg).
Use this as a blueprint to build similar marketing sites with form submissions, email notifications, and legal compliance.

## Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 + TypeScript + Vite | SPA marketing site |
| Styling | Tailwind CSS + shadcn/ui + Framer Motion | Design system, components, animations |
| Backend | Supabase (PostgreSQL + Edge Functions) | Database + serverless functions |
| Email | Resend | Transactional email delivery |
| Routing | React Router DOM v6 | Client-side routing |
| Hosting | Vercel | Static hosting + auto-deploy |
| Domain | recast.gg | Custom domain via Vercel |

## Key Characteristics
- **Single Page Application**: React with client-side routing, no SSR
- **No authentication**: Public marketing site — forms submit to Supabase without user accounts
- **Supabase Edge Functions**: Deno-based serverless functions for email notifications
- **Security hardened**: Rate limiting, input sanitization, honeypot bot protection, CORS restrictions

## File Structure

```
project-root/
├── src/
│   ├── App.tsx                    # Route definitions
│   ├── main.tsx                   # React entry point
│   ├── components/
│   │   ├── Navbar.tsx             # Site navigation
│   │   ├── Footer.tsx             # Site footer (legal links)
│   │   ├── Hero.tsx               # Landing hero section
│   │   ├── TypeformApplication.tsx # Multi-step form component
│   │   ├── CTA.tsx                # Call-to-action with role selection
│   │   ├── Creators.tsx           # Creator carousel
│   │   ├── Brands.tsx             # Brand logos
│   │   ├── Services.tsx           # Services section
│   │   ├── HowItWorks.tsx         # Step-by-step section
│   │   ├── Mission.tsx            # Mission statement
│   │   ├── Testimonials.tsx       # Testimonials
│   │   ├── TwoCol.tsx             # Two-column layout
│   │   ├── WobblyLines.tsx        # Background animation
│   │   ├── FloatingSuits.tsx       # Floating card animation
│   │   ├── LoopingVideo.tsx        # Video background component
│   │   ├── AnimatedUnderline.tsx   # Text animation
│   │   └── ui/                    # shadcn/ui components
│   ├── pages/
│   │   ├── Index.tsx              # Homepage
│   │   ├── BrandsPage.tsx         # Brand partnership page + form
│   │   ├── CreatorsPage.tsx       # Creator application page + form
│   │   ├── BlogPage.tsx           # Blog listing
│   │   ├── BlogPostPage.tsx       # Individual blog post
│   │   ├── PrivacyPage.tsx        # Privacy Policy
│   │   ├── TermsPage.tsx          # Terms of Use
│   │   └── NotFound.tsx           # 404 page
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts          # Supabase client init (env vars)
│   │       └── types.ts           # Database type definitions
│   ├── data/
│   │   └── blogPosts.ts           # Static blog post data
│   ├── hooks/
│   │   ├── use-mobile.tsx         # Mobile detection hook
│   │   └── use-toast.ts           # Toast notification hook
│   └── lib/
│       └── utils.ts               # Utility functions (cn helper)
├── supabase/
│   └── functions/
│       └── notify-application/
│           └── index.ts           # Edge function: email notification
├── public/                        # Static assets (images, videos)
├── .env                           # Environment variables (git-ignored)
├── package.json                   # Dependencies
├── vite.config.ts                 # Vite configuration
├── tailwind.config.ts             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
└── vercel.json                    # Vercel deployment config (if present)
```

## Routes

| Path | Page | Purpose |
|------|------|---------|
| `/` | Index | Homepage with all sections |
| `/brands` | BrandsPage | Brand partnership info + application form |
| `/creators` | CreatorsPage | Creator info + application form |
| `/blog` | BlogPage | Blog listing |
| `/blog/:slug` | BlogPostPage | Individual blog post |
| `/privacy` | PrivacyPage | Privacy Policy |
| `/terms` | TermsPage | Terms of Use |
| `*` | NotFound | 404 catch-all |

## Architecture Patterns

See individual files in this folder:
- [01-SUPABASE-BACKEND.md](01-SUPABASE-BACKEND.md) — Supabase database and client setup
- [02-EDGE-FUNCTIONS.md](02-EDGE-FUNCTIONS.md) — Deno edge functions for email notifications
- [03-SECURITY.md](03-SECURITY.md) — Rate limiting, input validation, bot protection, CORS
- [04-FRONTEND-PATTERNS.md](04-FRONTEND-PATTERNS.md) — React/Vite patterns, component architecture
- [05-FORMS-AND-VALIDATION.md](05-FORMS-AND-VALIDATION.md) — Multi-step forms, validation, consent
- [06-DATA-FLOW.md](06-DATA-FLOW.md) — How data moves between layers
- [07-DEPLOYMENT.md](07-DEPLOYMENT.md) — Vercel config, environment setup, auto-deploy
- [08-LEGAL-AND-COMPLIANCE.md](08-LEGAL-AND-COMPLIANCE.md) — Privacy Policy, Terms of Use, data compliance
