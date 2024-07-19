export default function handler(req, res) {
  // Simulated response for login status check
  res.status(200).json({ loggedIn: true, userType: 'creator' });
}
