const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const NOTIFY_EMAIL = "sign@recast.gg";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://recast.gg",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const payload = await req.json();
  const record = payload.record;

  const isCreator = record.type === "creator";

  const name = escapeHtml(record.name || "");
  const email = escapeHtml(record.email || "");
  const message = escapeHtml(record.message || "-");
  const platform = escapeHtml(record.platform || "-");
  const handle = escapeHtml(record.handle || "-");
  const contentNiche = escapeHtml(record.content_niche || "-");

  const details = isCreator
    ? `
Platform: ${platform}
Handle: ${handle}
Content niche: ${contentNiche}
`
    : "";

  const html = `
<h2>New ${isCreator ? "Creator" : "Brand"} Application</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
${details}
<p><strong>Message:</strong> ${message}</p>
<p><strong>Submitted:</strong> ${new Date(record.created_at).toLocaleString("en-GB")}</p>
`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Recast Applications <onboarding@resend.dev>",
      to: NOTIFY_EMAIL,
      subject: `New ${isCreator ? "Creator" : "Brand"} Application - ${name}`,
      html,
    }),
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: res.ok ? 200 : 500, headers: corsHeaders });
});
