const RESEND_API_KEY = "re_agDdz3Vr_6BoBPur6iFF7j35f8a8muoZ3";
const NOTIFY_EMAIL = "harry@recast.gg";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const payload = await req.json();
  const record = payload.record;

  const isCreator = record.type === "creator";

  const details = isCreator
    ? `
Platform: ${record.platform || "-"}
Handle: ${record.handle || "-"}
Content niche: ${record.content_niche || "-"}
`
    : "";

  const html = `
<h2>New ${record.type === "creator" ? "Creator" : "Brand"} Application</h2>
<p><strong>Name:</strong> ${record.name}</p>
<p><strong>Email:</strong> ${record.email}</p>
${details}
<p><strong>Message:</strong> ${record.message || "-"}</p>
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
      subject: `New ${record.type === "creator" ? "Creator" : "Brand"} Application - ${record.name}`,
      html,
    }),
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: res.ok ? 200 : 500, headers: corsHeaders });
});
