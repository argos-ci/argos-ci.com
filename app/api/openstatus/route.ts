export const dynamic = "force-dynamic";
export async function GET() {
  const res = await fetch("https://api.openstatus.dev/public/status/argos");
  const data = await res.json();
  return Response.json(
    { status: data.status },
    { status: 200, headers: { "access-control-allow-origin": "*" } },
  );
}
