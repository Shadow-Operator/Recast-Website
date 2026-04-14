# Forms & Input Validation

## Overview

The recast.gg site uses a custom multi-step form component (`TypeformApplication`) for both creator and brand applications. The form mimics a Typeform-style experience with one question per screen, keyboard navigation, and animated transitions.

## TypeformApplication Component

Located at `src/components/TypeformApplication.tsx`. Used in three places:
- `CTA.tsx` — Homepage form with role selection (brand vs creator)
- `CreatorsPage.tsx` — Creator-specific form
- `BrandsPage.tsx` — Brand-specific form

### Props

```typescript
interface TypeformApplicationProps {
  title: string;           // Left panel heading
  subtitle: string;        // Left panel description
  questions: Question[];   // Array of form questions
  defaultType?: string;    // "creator" or "brand" (when no role selection)
  roleSelection?: {        // Optional role picker as first step
    label: string;
    options: { value: string; label: string; questions: Question[] }[];
  };
}
```

### Question Types

```typescript
interface Question {
  id: string;
  label: string;
  type: "text" | "email" | "textarea" | "select" | "multi-select" | "group";
  placeholder: string;
  options?: string[];      // For select and multi-select
  required?: boolean;
  fields?: Question[];     // For group type (multiple inputs on one screen)
}
```

| Type | Behavior |
|------|----------|
| `text` | Single text input |
| `email` | Email input with validation |
| `textarea` | Multi-line text area |
| `select` | Single-choice list (A/B/C keyboard shortcuts) |
| `multi-select` | Multi-choice with per-option handle inputs |
| `group` | Multiple inputs on one screen (e.g., name + email + phone) |

## Form Flow

1. **Role Selection** (optional) — Brand or Creator
2. **Questions** — One per screen, animated transitions
3. **Consent Checkbox** — Shown on final step before submit
4. **Submit** — Sends to Supabase, then notifies via edge function
5. **Success Screen** — Animated confirmation with holographic card

### Navigation
- **Next/Back buttons** for mouse users
- **Enter key** advances to next question
- **A/B/C/D keys** select options in select fields (auto-advances after 300ms)

## Input Validation

### Client-Side Validation

| Validation | Where | Rule |
|------------|-------|------|
| Required fields | `canProceed()` | Checks `.trim()` is non-empty |
| Email format | `validateEmail()` | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| Multi-select handles | `canProceed()` | Each selected platform must have a handle |
| Max length | `maxLength` attribute | Per-field limits (see Security docs) |
| Consent | Submit button disabled | Must check checkbox on final step |

### Field Max Lengths

```typescript
const FIELD_MAX_LENGTHS: Record<string, number> = {
  name: 200,
  email: 254,
  company: 200,
  phone: 30,
  about: 2000,
  goals: 2000,
};
const DEFAULT_MAX_LENGTH = 500;
const HANDLE_MAX_LENGTH = 200;
```

### Pre-Submit Sanitization

All values are sanitized before Supabase insert:

```typescript
const sanitize = (value: string | undefined, maxLen: number): string | null => {
  if (!value) return null;
  return value.trim().slice(0, maxLen) || null;
};
```

## Consent Checkbox

Shown only on the final step. Must be checked before submit button becomes active:

```tsx
{questionIndex === activeQuestions.length - 1 && (
  <label className="flex items-start gap-3 mt-6 cursor-pointer">
    <input type="checkbox" checked={consentChecked} onChange={...} />
    <span>
      I agree to Recast's <Link to="/privacy">Privacy Policy</Link> and{" "}
      <Link to="/terms">Terms of Use</Link>.
    </span>
  </label>
)}
```

The submit button is disabled when `!consentChecked` on the final step.

## Honeypot Bot Protection

A hidden field catches automated form fillers:

```tsx
<div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0 }}>
  <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
</div>
```

If filled, the client fakes a successful submission without sending data.

## Form Questions

### Brand Application

| Step | ID | Type | Required |
|------|----|------|----------|
| 1 | brand-contact (group) | group | Yes |
| — | company | text | No |
| — | name | text | Yes |
| — | email | email | Yes |
| 2 | budget | select | Yes |
| 3 | timeline | select | Yes |
| 4 | goals | textarea | No |

### Creator Application

| Step | ID | Type | Required |
|------|----|------|----------|
| 1 | creator-contact (group) | group | Yes |
| — | name | text | Yes |
| — | email | email | Yes |
| — | phone | text | No |
| 2 | platforms | multi-select | Yes |
| 3 | about | textarea | No |

## Submission Flow

```
User fills form
    │
    ▼
Client validates (required, email format, max length)
    │
    ▼
Honeypot check (if filled → fake success, stop)
    │
    ▼
Sanitize all values (trim, truncate)
    │
    ▼
Insert into Supabase `applications` table
    │
    ▼
Fire-and-forget: POST to edge function for email notification
    │
    ▼
Show success screen
```

The edge function call is non-blocking — if it fails, the submission still succeeds because data is already in the database.
