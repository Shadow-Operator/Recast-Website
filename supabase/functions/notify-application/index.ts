const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const NOTIFY_EMAIL = "harry@recast.gg";
const MAX_PAYLOAD_SIZE = 10_000; // 10KB max
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5; // max 5 requests per window per IP

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://recast.gg",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// In-memory rate limiter (resets on cold start, which is acceptable for edge functions)
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

// Cleanup stale entries periodically to prevent memory leaks
function cleanupRateLimitMap() {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeString(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254;
}

function isValidType(type: unknown): type is "creator" | "brand" {
  return type === "creator" || type === "brand";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: corsHeaders,
    });
  }

  // Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      { status: 429, headers: corsHeaders }
    );
  }

  // Periodically clean up stale rate limit entries
  if (rateLimitMap.size > 1000) cleanupRateLimitMap();

  // Payload size check
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength) > MAX_PAYLOAD_SIZE) {
    return new Response(
      JSON.stringify({ error: "Payload too large" }),
      { status: 413, headers: corsHeaders }
    );
  }

  let payload: unknown;
  try {
    const body = await req.text();
    if (body.length > MAX_PAYLOAD_SIZE) {
      return new Response(
        JSON.stringify({ error: "Payload too large" }),
        { status: 413, headers: corsHeaders }
      );
    }
    payload = JSON.parse(body);
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON" }),
      { status: 400, headers: corsHeaders }
    );
  }

  // Schema validation
  if (
    !payload ||
    typeof payload !== "object" ||
    !("record" in payload) ||
    !payload.record ||
    typeof payload.record !== "object"
  ) {
    return new Response(
      JSON.stringify({ error: "Invalid request format" }),
      { status: 400, headers: corsHeaders }
    );
  }

  const record = payload.record as Record<string, unknown>;

  // Validate type field
  if (!isValidType(record.type)) {
    return new Response(
      JSON.stringify({ error: "Invalid application type" }),
      { status: 400, headers: corsHeaders }
    );
  }

  // Validate and sanitize required fields
  const name = sanitizeString(record.name, 200);
  const email = sanitizeString(record.email, 254);

  if (!name || !email) {
    return new Response(
      JSON.stringify({ error: "Name and email are required" }),
      { status: 400, headers: corsHeaders }
    );
  }

  if (!isValidEmail(email)) {
    return new Response(
      JSON.stringify({ error: "Invalid email address" }),
      { status: 400, headers: corsHeaders }
    );
  }

  // Honeypot check - reject if filled
  if (record._website && typeof record._website === "string" && record._website.trim() !== "") {
    // Silently accept but don't process (looks successful to bots)
    return new Response(JSON.stringify({ id: "ok" }), { status: 200, headers: corsHeaders });
  }

  const isCreator = record.type === "creator";

  // Sanitize optional fields
  const message = escapeHtml(sanitizeString(record.message, 2000) || "-");
  const platform = escapeHtml(sanitizeString(record.platform, 500) || "-");
  const handle = escapeHtml(sanitizeString(record.handle, 500) || "-");
  const contentNiche = escapeHtml(sanitizeString(record.content_niche, 1000) || "-");

  const escapedName = escapeHtml(name);
  const escapedEmail = escapeHtml(email);

  const details = isCreator
    ? `
Platform: ${platform}
Handle: ${handle}
Content niche: ${contentNiche}
`
    : "";

  const html = `
<h2>New ${isCreator ? "Creator" : "Brand"} Application</h2>
<p><strong>Name:</strong> ${escapedName}</p>
<p><strong>Email:</strong> ${escapedEmail}</p>
${details}
<p><strong>Message:</strong> ${message}</p>
<p><strong>Submitted:</strong> ${new Date(typeof record.created_at === "string" ? record.created_at : Date.now()).toLocaleString("en-GB")}</p>
`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Recast Applications <notifications@recast.gg>",
      to: NOTIFY_EMAIL,
      subject: `New ${isCreator ? "Creator" : "Brand"} Application - ${escapedName}`,
      html,
    }),
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: res.ok ? 200 : 500, headers: corsHeaders });
});
