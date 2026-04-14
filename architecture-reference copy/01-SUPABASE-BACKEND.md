# Supabase Backend

## Overview

Supabase provides the backend for recast.gg: a PostgreSQL database for storing form submissions, and Edge Functions for server-side logic (email notifications).

## Client Setup

The Supabase client is initialized in `src/integrations/supabase/client.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
```

Key points:
- Uses **anon/publishable key** (safe for client-side, designed to be public)
- URL and key come from environment variables (`VITE_` prefix makes them available to Vite)
- The `Database` type is imported from `types.ts` for type safety

## Environment Variables

Stored in `.env` (git-ignored):

```env
VITE_SUPABASE_PROJECT_ID="your-project-id"
VITE_SUPABASE_PUBLISHABLE_KEY="eyJ..."
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
```

These are also set in the Vercel dashboard for production deployments.

## Database Schema

### `applications` table

Stores all form submissions (both creator and brand applications):

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | Primary key, auto-generated |
| `type` | text | `"creator"` or `"brand"` |
| `name` | text | Applicant's name |
| `email` | text | Applicant's email |
| `phone` | text | Phone number (optional, creators only) |
| `platform` | text | Comma-separated platforms (creators only) |
| `handle` | text | Platform handles (creators only) |
| `content_niche` | text | Content description (creators only) |
| `message` | text | Brand campaign details or notes |
| `created_at` | timestamptz | Auto-generated timestamp |

### Row Level Security (RLS)

Supabase RLS should be configured to:
- **Allow inserts** from the anon key (public form submissions)
- **Deny reads/updates/deletes** from the anon key (admin access only via Supabase dashboard or service role key)

Example RLS policy:
```sql
-- Allow anonymous inserts to applications table
CREATE POLICY "Allow public inserts" ON applications
  FOR INSERT
  WITH CHECK (true);

-- Deny all other operations for anon users
-- (no SELECT/UPDATE/DELETE policies = denied by default)
```

## Inserting Data

Form submissions are inserted directly from the client:

```typescript
const { error } = await supabase
  .from("applications" as never)
  .insert(insertData as never);
```

Note: `as never` is used because the database types in `types.ts` don't have the `applications` table schema exported. To fix this properly, regenerate types with `supabase gen types typescript`.

## Edge Functions

Supabase Edge Functions run on Deno and are deployed separately. See [02-EDGE-FUNCTIONS.md](02-EDGE-FUNCTIONS.md) for details.

Edge functions have their own environment variables set in the Supabase dashboard (not in `.env`):
- `RESEND_API_KEY` — API key for the Resend email service

## Supabase Dashboard

Access at: `https://supabase.com/dashboard/project/YOUR_PROJECT_ID`

Key sections:
- **Table Editor** — View/edit application submissions
- **Edge Functions** — Deploy and monitor serverless functions
- **Settings → API** — Find your project URL and anon key
- **Settings → Edge Functions** — Set edge function environment variables
