# Deployment

## Overview

The recast.gg website is deployed on Vercel with automatic deployments from the `main` branch on GitHub. Supabase Edge Functions are deployed separately via the Supabase CLI.

## Vercel Setup

### 1. Connect GitHub Repo
- Push your project to GitHub
- Go to vercel.com → Import Project → select your repo
- Vercel auto-detects the Vite framework and configures build settings

### 2. Build Configuration

Vercel auto-detects Vite. Default settings:
- **Framework Preset**: Vite
- **Build Command**: `vite build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. Environment Variables (Vercel Dashboard → Settings → Env Vars)

| Variable | Value | Environment |
|----------|-------|-------------|
| `VITE_SUPABASE_PROJECT_ID` | Your Supabase project ID | Production, Preview |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `eyJ...` (Supabase anon key) | Production, Preview |
| `VITE_SUPABASE_URL` | `https://<project-id>.supabase.co` | Production, Preview |

Note: Variables prefixed with `VITE_` are embedded in the build output and visible to the client. Only use this prefix for public values.

### 4. Custom Domain

Configure in Vercel Dashboard → Settings → Domains:
- Primary: `recast.gg`
- Redirect: `www.recast.gg` → `recast.gg`

### 5. Optional: vercel.json

For security headers and SPA routing:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/((?!assets/).*)", "destination": "/index.html" }
  ]
}
```

## Supabase Edge Function Deployment

Edge Functions are deployed separately from the Vercel deployment:

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_ID

# Deploy the notify-application function
supabase functions deploy notify-application

# Set the Resend API key as a secret
supabase secrets set RESEND_API_KEY=re_your_key_here
```

### Edge Function Secrets

Set via CLI (not in `.env`):
```bash
supabase secrets set RESEND_API_KEY=re_your_new_key
```

To list current secrets:
```bash
supabase secrets list
```

## Auto-Deploy Flow

```
Developer pushes to main
        │
        ▼
GitHub webhook triggers Vercel
        │
        ▼
Vercel runs: npm install → vite build
        │
        ▼
Vercel serves dist/ as static SPA
        │
        ▼
Live at recast.gg
```

Edge functions are deployed separately:
```
Developer runs: supabase functions deploy notify-application
        │
        ▼
Function deployed to Supabase infrastructure
        │
        ▼
Live at <project-id>.supabase.co/functions/v1/notify-application
```

## Preview Deployments

Every push to a non-main branch creates a Vercel preview deployment:
- URL format: `recast-website-<hash>.vercel.app`
- Uses the same environment variables as production
- Useful for testing before merging to main

**Note**: Preview deployments will still call the production Supabase edge function (same URL). Be aware of this when testing form submissions.

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# or
npx vite --port 8081

# The site is available at http://localhost:8081
```

### Local Edge Function Testing

```bash
# Start Supabase locally (requires Docker)
supabase start

# Serve edge function locally
supabase functions serve notify-application --env-file .env.local

# Function available at http://localhost:54321/functions/v1/notify-application
```

## Monitoring

- **Vercel Dashboard → Deployments**: Build logs, deployment status
- **Vercel Dashboard → Analytics**: Web vitals, page views (if enabled)
- **Supabase Dashboard → Edge Functions**: Invocation logs, errors, latency
- **Supabase Dashboard → Table Editor**: View application submissions
- **Resend Dashboard**: Email delivery status, bounces, opens

## Common Issues

| Issue | Solution |
|-------|----------|
| Form submissions fail | Check Supabase RLS policies allow INSERT for anon key |
| Email notifications not sent | Check `RESEND_API_KEY` is set in Supabase secrets |
| Edge function returns 429 | Rate limit hit — wait 15 minutes or check for bot abuse |
| CORS error on edge function | Ensure origin matches `https://recast.gg` in corsHeaders |
| Preview deploy form submissions | They go to production Supabase — use test data |
| Environment variables not working | Ensure `VITE_` prefix for client-side vars |
| Build fails on Vercel | Check `npm run build` works locally first |
| Stale content after deploy | Hard refresh (Ctrl+Shift+R) or clear Vercel cache |
