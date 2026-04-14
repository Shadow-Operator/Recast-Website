# Frontend Patterns

## Overview

The recast.gg frontend is a React 18 SPA built with Vite and TypeScript. It uses Tailwind CSS for styling, shadcn/ui for base components, and Framer Motion for animations. There is no server-side rendering — the site is fully client-rendered.

## Tech Stack

| Library | Version | Purpose |
|---------|---------|---------|
| React | 18.3.1 | UI framework |
| TypeScript | — | Type safety |
| Vite | — | Build tool + dev server (HMR) |
| React Router DOM | 6.30.1 | Client-side routing |
| Tailwind CSS | — | Utility-first CSS |
| shadcn/ui + Radix UI | — | Accessible component primitives |
| Framer Motion | — | Animation library |
| React Helmet Async | — | SEO metadata per page |
| @tanstack/react-query | — | Data fetching (available but minimal use) |
| Supabase JS | — | Database client |

## Component Architecture

### Page Components (`src/pages/`)
Each page is a full-page component that includes `<Navbar />` and `<Footer />`:

```tsx
const CreatorsPage = () => {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <Helmet>
        <title>For Creators - Recast</title>
        <meta name="description" content="..." />
        <link rel="canonical" href="https://recast.gg/creators" />
      </Helmet>
      <Navbar />
      {/* Page sections */}
      <Footer />
    </main>
  );
};
```

Pattern:
- Every page has `<Helmet>` for SEO (title, description, canonical URL)
- Skip-link for accessibility: `<a href="#main-content" className="skip-link">`
- Sections stacked vertically with consistent padding

### Section Components (`src/components/`)
Reusable sections that compose into pages:
- `Hero.tsx` — Landing hero with video background
- `Brands.tsx` — Brand logo carousel
- `Creators.tsx` — Creator photo carousel
- `Services.tsx` — Services grid
- `HowItWorks.tsx` — Numbered steps
- `Mission.tsx` — Mission statement
- `Testimonials.tsx` — Testimonial cards
- `CTA.tsx` — Call-to-action with role selection form
- `TwoCol.tsx` — Two-column content layout

### UI Components (`src/components/ui/`)
shadcn/ui components installed via CLI. These are "owned" — you can modify them directly.

## Design System

### Typography
- **Display font**: `font-display` (set in Tailwind config) — used for headings
- **Body font**: Default sans — used for body text
- Headings: `font-extrabold tracking-[-0.03em] uppercase`
- Labels: `text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground`
- Body: `text-muted-foreground font-light leading-relaxed`

### Color Tokens
Uses CSS custom properties via Tailwind:
- `background` / `foreground` — Base colors
- `muted-foreground` — Secondary text
- `border` — Border color
- `blue-accent` — Primary accent (Recast blue)
- `blue-glow` — Hover state for accent
- `card` — Card background

### Section Pattern
Every section follows this structure:
```tsx
<section className="py-16 md:py-32 px-5 md:px-12 border-b border-border">
  <div className="max-w-[1400px] mx-auto">
    {/* Section label */}
    <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-6">
      . Section Name
    </p>
    {/* Section heading */}
    <h2 className="text-3xl md:text-6xl font-display font-extrabold tracking-[-0.03em] uppercase mb-16">
      Title <span className="text-blue-accent">Accent</span>
    </h2>
    {/* Section content */}
  </div>
</section>
```

## Animation Patterns

### Scroll-triggered animations (Framer Motion)
Most sections use `whileInView` for entrance animations:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: i * 0.1 }}
>
```

- `viewport={{ once: true }}` — animate only on first view
- Staggered delays: `delay: i * 0.1` for list items

### Page-level animations
Hero sections use `animate` (not `whileInView`) for immediate entrance:

```tsx
<motion.span
  initial={{ y: "110%" }}
  animate={{ y: 0 }}
  transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
>
```

Custom ease curve `[0.16, 1, 0.3, 1]` is used throughout for smooth entrances.

## Routing

Defined in `src/App.tsx`:

```tsx
<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
  <ScrollToTop />
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/brands" element={<BrandsPage />} />
    <Route path="/creators" element={<CreatorsPage />} />
    <Route path="/blog" element={<BlogPage />} />
    <Route path="/blog/:slug" element={<BlogPostPage />} />
    <Route path="/privacy" element={<PrivacyPage />} />
    <Route path="/terms" element={<TermsPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

### ScrollToTop Component
Scrolls to top on route change, or smooth-scrolls to hash targets:

```tsx
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};
```

## Responsive Design

- Mobile-first approach with `md:` breakpoint for desktop
- Consistent padding: `px-5 md:px-12`
- Section padding: `py-16 md:py-32`
- Typography scales: `text-3xl md:text-6xl`
- Grid layouts: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- Mobile menu toggle in `Navbar.tsx`

## Blog System

Blog posts are stored as static data in `src/data/blogPosts.ts`:
- No CMS — blog content is hardcoded as TypeScript objects
- Each post has: slug, title, excerpt, content, date, author, image
- `BlogPage.tsx` renders a listing; `BlogPostPage.tsx` renders individual posts by `:slug`
