export async function POST() {
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}