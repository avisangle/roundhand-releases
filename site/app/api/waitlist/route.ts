import { addToWaitlist } from "@/lib/waitlist";

// JSON endpoint for signups from outside this page. The on-page form uses the
// Server Action in app/actions/waitlist.ts instead.
export async function POST(request: Request) {
  let body: { email?: unknown; company?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Send a JSON body with an email field." }, { status: 400 });
  }

  const result = await addToWaitlist(body.email, body.company);
  return Response.json(result, { status: result.ok ? 200 : 400 });
}
