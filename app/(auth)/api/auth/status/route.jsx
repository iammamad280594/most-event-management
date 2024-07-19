export async function GET() {
  // Dummy data for demo purposes
  const loggedIn = true;  // Set to `true` to simulate that the user is logged in.
  const userType = 'creator';  // Change based on the actual user type from your authentication logic.
  return new Response(JSON.stringify({ loggedIn, userType }), { status: 200 });
}
