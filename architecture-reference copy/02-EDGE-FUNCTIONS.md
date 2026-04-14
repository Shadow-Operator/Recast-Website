# Supabase Edge Functions

## Overview

Edge Functions are Deno-based serverless functions deployed to Supabase. The recast.gg site uses one edge function: `notify-application`, which sends email notifications via Resend when a new application is submitted.

## File Structure

```
supabase/
└── functions/
    └── notify-application/
        └── index.ts          # Email notification handler
```

## notify-application Function

### Purpose
Receives form submission data via POST, validates it, and sends an HTML email notification to the team.

### Endpoint
```
POST https://<project-id>.supabase.co/functions/v1/notify-application
```

The URL is constructed dynamically in the frontend from the `VITE_SUPABASE_URL` environment variable:
```typescript
const NOTIFY_URL = import.meta.env.VITE_SUPABASE_URL
  ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/notify-application`
  : "https://fallback-project-id.supabase.co/functions/v1/notify-application";
```

### Request Format

```json
{
  "record": {
    "type": "creator",
    "name": "John Doe",
    "email": "john@example.com",
    "platform": "TikTok, YouTube",
    "handle": "TikTok: @johndoe, YouTube: @johndoe",
    "content_niche": "Gaming content",
    "message": null,
    "created_at": "2026-04-14T12:00:00.000Z",
    "_website": ""
  }
}
```

### Security Features

The edge function includes multiple security layers:

1. **Rate Limiting** — 5 requests per 15 minutes per IP
2. **Payload Size Validation** — 10KB maximum
3. **Schema Validation** — Validates required fields and types
4. **Input Sanitization** — All strings truncated to max lengths
5. **HTML Escaping** — Prevents XSS in email content
6. **CORS Restriction** — Only accepts requests from `https://recast.gg`
7. **Honeypot Check** — Silently drops bot submissions
8. **Method Check** — Only accepts POST requests

### Environment Variables (Supabase Dashboard)

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Resend API key for sending emails |

### Email Delivery

Uses the [Resend](https://resend.com) API:
- **From**: `Recast Applications <notifications@recast.gg>`
- **To**: `harry@recast.gg`
- **Subject**: `New Creator/Brand Application - {Name}`

### Deploying Edge Functions

```bash
# Login to Supabase CLI
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_ID

# Deploy the function
supabase functions deploy notify-application

# Set environment variables
supabase secrets set RESEND_API_KEY=re_your_key_here
```

### Testing Locally

```bash
supabase functions serve notify-application --env-file .env.local
```

Then POST to `http://localhost:54321/functions/v1/notify-application`.

### Error Responses

| Status | Meaning |
|--------|---------|
| 200 | Success — email sent |
| 400 | Invalid JSON, missing fields, or invalid type |
| 405 | Method not allowed (not POST) |
| 413 | Payload too large (>10KB) |
| 429 | Rate limited (>5 requests per 15 min from same IP) |
| 500 | Resend API error |
