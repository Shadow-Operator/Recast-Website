# Security

## Overview

The recast.gg website implements multiple layers of security across the frontend form component and the backend edge function. Since this is a public marketing site with no user authentication, security focuses on protecting form submissions from abuse.

## Rate Limiting

### Edge Function Rate Limiting
Located in `supabase/functions/notify-application/index.ts`:

```typescript
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5; // max 5 requests per window per IP

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}
```

- In-memory store (resets on cold start, acceptable for edge functions)
- Automatic cleanup when map exceeds 1000 entries
- IP extracted from `x-forwarded-for` or `cf-connecting-ip` headers
- Returns 429 status with message when limit exceeded

### Supabase-Level Protection
Additionally, Supabase has built-in rate limiting on its API. Configure in the Supabase dashboard under Settings.

## Input Sanitization

### Client-Side (TypeformApplication.tsx)

All form inputs have `maxLength` attributes:

| Field | Max Length |
|-------|-----------|
| name | 200 |
| email | 254 |
| phone | 30 |
| company | 200 |
| about / goals (textarea) | 2,000 |
| handles | 200 per platform |
| default (all other fields) | 500 |

Before database insert, all values are sanitized:
```typescript
const sanitize = (value: string | undefined, maxLen: number): string | null => {
  if (!value) return null;
  return value.trim().slice(0, maxLen) || null;
};
```

### Server-Side (Edge Function)

The edge function applies its own sanitization independent of the client:

```typescript
function sanitizeString(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}
```

This ensures safety even if someone bypasses the frontend and calls the API directly.

### HTML Escaping

All user content is escaped before inclusion in email HTML:

```typescript
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
```

## Payload Validation

### Size Limits
The edge function rejects payloads larger than 10KB:
```typescript
const MAX_PAYLOAD_SIZE = 10_000;
// Checks both Content-Length header AND actual body size
```

### Schema Validation
The edge function validates the request body structure:
- `payload.record` must exist and be an object
- `record.type` must be `"creator"` or `"brand"`
- `record.name` and `record.email` are required
- Email must pass regex validation with 2+ char TLD

## Bot Protection

### Honeypot Field
A hidden form field catches automated submissions:

```tsx
{/* Hidden from real users, visible to bots */}
<div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0 }}>
  <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
</div>
```

- Real users never see or fill this field
- Bots that auto-fill all fields will populate it
- Client-side: if honeypot is filled, fake a successful submission without sending data
- Server-side: edge function also checks `_website` field and silently drops the request

### Why Not CAPTCHA?
Honeypot is preferred because:
- Zero friction for real users
- No third-party dependencies
- No accessibility concerns
- Catches most automated bots

Consider adding CAPTCHA (e.g., Cloudflare Turnstile) if bot spam becomes a problem.

## CORS

The edge function restricts cross-origin requests:

```typescript
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://recast.gg",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
```

Only requests from `https://recast.gg` are accepted. All other origins are rejected.

## Email Validation

Two levels of email validation:

1. **Client-side** (TypeformApplication.tsx):
   ```typescript
   const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
   ```

2. **Server-side** (Edge Function):
   ```typescript
   function isValidEmail(email: string): boolean {
     return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254;
   }
   ```
   Server-side is stricter: requires 2+ char TLD and enforces 254 char max.

## Secrets Management

| Secret | Storage | Access |
|--------|---------|--------|
| Supabase anon key | `.env` file (git-ignored) + Vercel env vars | Client-side (designed to be public) |
| Supabase URL | `.env` file (git-ignored) + Vercel env vars | Client-side (public) |
| Resend API key | Supabase Edge Function secrets | Server-side only |

- `.env` is in `.gitignore` — never committed to git
- Resend API key is set via `supabase secrets set` — never exposed to the client
- The Supabase anon key is a publishable key, safe for client-side use

## Security Checklist

- [x] Rate limiting on edge function (5 req / 15 min / IP)
- [x] Payload size validation (10KB max)
- [x] Schema validation on edge function
- [x] Input length limits on all form fields
- [x] Server-side input sanitization
- [x] HTML escaping in email templates
- [x] CORS restricted to production domain
- [x] Honeypot bot protection
- [x] Secrets in environment variables (not hardcoded)
- [x] `.env` in `.gitignore`
- [x] Consent checkbox with Privacy Policy + Terms of Use
- [ ] CSP headers (recommended future addition via vercel.json)
- [ ] CAPTCHA (add if bot spam increases)
