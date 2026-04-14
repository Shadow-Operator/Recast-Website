# Data Flow

## Overview

Data in recast.gg flows in one direction: from user form input to Supabase database to email notification. There is no data reading from the database on the frontend (admin access only via Supabase dashboard).

## Complete Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                             │
│                                                                 │
│  TypeformApplication.tsx                                        │
│  ┌─────────────────┐                                           │
│  │ Form Fields      │  maxLength attributes                    │
│  │ (text, email,    │  Client-side validation                  │
│  │  select, etc.)   │  Honeypot field (hidden)                 │
│  └────────┬─────────┘                                           │
│           │                                                     │
│           ▼                                                     │
│  ┌─────────────────┐                                           │
│  │ sanitize()       │  Trim + truncate all values              │
│  │ validateEmail()  │  Check email format                      │
│  │ consentChecked   │  Require privacy/terms consent           │
│  └────────┬─────────┘                                           │
│           │                                                     │
└───────────┼─────────────────────────────────────────────────────┘
            │
            │  Two parallel requests:
            │
    ┌───────┴───────────────────────────────┐
    │                                       │
    ▼                                       ▼
┌──────────────────┐            ┌──────────────────────────┐
│ SUPABASE DB      │            │ SUPABASE EDGE FUNCTION   │
│                  │            │ notify-application       │
│ applications     │            │                          │
│ table INSERT     │            │ Rate limit check (5/15m) │
│                  │            │ Payload size check (10KB)│
│ ┌──────────────┐ │            │ Schema validation        │
│ │ id (uuid)    │ │            │ Field sanitization       │
│ │ type         │ │            │ Honeypot check           │
│ │ name         │ │            │ HTML escaping            │
│ │ email        │ │            │                          │
│ │ phone        │ │            │         │                │
│ │ platform     │ │            │         ▼                │
│ │ handle       │ │            │ ┌────────────────────┐   │
│ │ content_niche│ │            │ │ Resend API          │   │
│ │ message      │ │            │ │ POST /emails        │   │
│ │ created_at   │ │            │ └────────┬───────────┘   │
│ └──────────────┘ │            │          │               │
└──────────────────┘            └──────────┼───────────────┘
                                           │
                                           ▼
                                ┌──────────────────────┐
                                │ EMAIL DELIVERY       │
                                │                      │
                                │ From: notifications@  │
                                │       recast.gg      │
                                │ To: harry@recast.gg  │
                                │                      │
                                │ HTML email with:     │
                                │ - Application type   │
                                │ - Name, email        │
                                │ - Platform details   │
                                │ - Message            │
                                │ - Timestamp          │
                                └──────────────────────┘
```

## Data at Rest

### Supabase PostgreSQL
- All form submissions stored permanently in `applications` table
- Accessible via Supabase dashboard or service role key
- RLS restricts public access to INSERT only

### No Client-Side Storage
- No cookies (beyond Supabase session persistence in localStorage)
- No analytics tracking
- No user accounts or sessions

## Data in Transit

| Path | Protocol | Protection |
|------|----------|------------|
| Browser → Supabase DB | HTTPS | TLS encryption + Supabase anon key |
| Browser → Edge Function | HTTPS | TLS encryption + CORS check |
| Edge Function → Resend API | HTTPS | TLS encryption + API key auth |
| Resend → Email recipient | SMTP/TLS | Resend handles delivery |

## Error Handling

```
Form Submit
    │
    ├─ Supabase INSERT succeeds
    │   ├─ Edge Function succeeds → Success screen
    │   └─ Edge Function fails → Success screen (fire-and-forget)
    │
    └─ Supabase INSERT fails → Error message shown
        "Something went wrong. Please try again or email us at sign@recast.gg"
```

The edge function is called with `.catch(() => {})` — its failure never blocks the user experience. The data is safely in the database regardless.

## Static Content

Blog posts, page copy, and creator/brand data are all hardcoded in source files:
- `src/data/blogPosts.ts` — Blog post content
- `src/pages/*.tsx` — Page copy (FAQs, perks, steps)
- `src/components/*.tsx` — Component copy (trust signals, etc.)

No CMS or external content source.
