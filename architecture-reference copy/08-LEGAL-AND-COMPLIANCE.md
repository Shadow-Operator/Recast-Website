# Legal & Compliance

## Overview

The recast.gg website includes two legal pages and implements data compliance measures to meet US privacy law requirements. Recast LLC is based in Las Vegas, Nevada.

## Legal Pages

### Privacy Policy (`/privacy`)
File: `src/pages/PrivacyPage.tsx`

Covers 10 sections:
1. **Who We Are** — Recast LLC, Las Vegas, Nevada
2. **What Data We Collect** — Name, email, company, social handles, audience size, budget
3. **How We Use Your Data** — Respond to inquiries, match creators with brands, send communications
4. **Why We Process Your Data** — Service delivery and legal compliance
5. **Data Sharing** — No selling; shared with brand partners (with consent), service providers, regulators
6. **Data Retention** — 12 months for inquiries; longer for active relationships
7. **Your Rights** — Access, deletion, correction, opt-out (varies by state)
8. **Cookies** — Essential cookies only, no tracking or advertising cookies
9. **Changes to Policy** — Continued use constitutes acceptance
10. **Contact & Complaints** — sign@recast.gg; FTC complaint option

### Terms of Use (`/terms`)
File: `src/pages/TermsPage.tsx`

Covers 10 sections:
1. **Agreement to Terms** — Binding by use of website
2. **Use of the Website** — Lawful use only; no scraping, impersonation, malicious activity
3. **Applications and Submissions** — Accuracy representation; no guarantee of acceptance
4. **Intellectual Property** — All content owned by Recast LLC
5. **Third-Party Links** — Not responsible for external sites
6. **Limitation of Liability** — No indirect/consequential damages; "as is" basis
7. **Indemnification** — User indemnifies Recast LLC
8. **Governing Law** — State of Nevada; Clark County courts
9. **Changes to Terms** — Continued use constitutes acceptance
10. **Contact** — sign@recast.gg

### Footer Links
Both pages are linked in the site footer (`src/components/Footer.tsx`):
```tsx
<Link to="/privacy">Privacy Policy</Link>
<Link to="/terms">Terms of Use</Link>
```

## Data Collection

### What We Collect

| Data Point | Source | Required | Form Type |
|------------|--------|----------|-----------|
| Name | Form input | Yes | Both |
| Email | Form input | Yes | Both |
| Phone number | Form input | No | Creator |
| Company name | Form input | No | Brand |
| Social platforms | Form selection | Yes | Creator |
| Social handles | Form input | Yes (per platform) | Creator |
| Content description | Form textarea | No | Creator |
| Campaign budget | Form selection | Yes | Brand |
| Campaign timeline | Form selection | Yes | Brand |
| Campaign goals | Form textarea | No | Brand |

### What We Don't Collect
- No tracking cookies or advertising cookies
- No analytics (no Google Analytics, Mixpanel, etc.)
- No user accounts or passwords
- No payment information
- No IP logging on the frontend (edge function sees IPs for rate limiting only)

## Consent Mechanism

### Form Consent Checkbox
On the final step of every form, users must check a consent box before submitting:

```
☐ I agree to Recast's Privacy Policy and Terms of Use.
```

- Links open Privacy Policy and Terms of Use in new tabs
- Submit button is disabled until checkbox is checked
- This is a binding acceptance of both policies

### No Cookie Banner Needed
The Privacy Policy states the site uses "essential cookies only." Supabase uses `localStorage` for session persistence (not cookies), and there are no analytics or tracking cookies. A cookie consent banner is not currently required but should be added if analytics are ever implemented.

## State Privacy Laws

The Privacy Policy covers rights under:
- **CCPA** (California Consumer Privacy Act)
- **Nevada Privacy Law** (relevant as Recast LLC is Nevada-based)
- **CPA** (Colorado Privacy Act)
- **VCDPA** (Virginia Consumer Data Protection Act)

Users are directed to contact `sign@recast.gg` to exercise their rights (access, deletion, correction, opt-out).

## Data Retention

Per the Privacy Policy:
- **Inquiry data**: 12 months
- **Active relationships**: Duration of relationship + reasonable period after
- **Supabase database**: Data persists until manually deleted by admin

## Security Compliance

See [03-SECURITY.md](03-SECURITY.md) for full details. Summary:
- All data transmitted over HTTPS
- API keys stored in environment variables (never hardcoded)
- Input sanitization on client and server
- Rate limiting to prevent abuse
- CORS restricted to production domain
- HTML escaping in email templates

## Updating Legal Pages

Both legal pages use the same pattern — an array of `{ title, body }` sections rendered with Framer Motion animations:

```typescript
const sections = [
  { title: "Section Title", body: `Section content with \n\n line breaks...` },
  // ...
];
```

To update:
1. Edit the `sections` array in the respective page file
2. Update the "Last updated" date in the page header
3. Deploy via push to `main`

## Checklist

- [x] Privacy Policy page with all required sections
- [x] Terms of Use page with all required sections
- [x] Both linked in site footer
- [x] Consent checkbox on all forms before submission
- [x] Contact email provided for privacy requests
- [x] Data retention periods documented
- [x] No tracking or advertising cookies
- [x] Essential cookies only statement
- [ ] Annual review of legal pages (next: March 2027)
- [ ] Add cookie banner if analytics are ever added
- [ ] Consider GDPR compliance if expanding to EU market
