// pages/api/signup.ts

import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, password, role, referralCode } = req.body;

    try {
      // Example: Validate inputs (add your own validation logic)
      if (!name || !email || !password || !role) {
        throw new Error('Missing required fields');
      }

      // Example: Make request to external API or database
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role, referralCode }),
      });

      // Ensure response.ok is properly awaited and checked
      if (!response.ok) {
        throw new Error('Sign up failed');
      }

      // Parse response JSON
      const data = await response.json();

      // Check success flag in response
      if (data.success) {
        res.status(200).json({ success: true });
      } else {
        res.status(401).json({ success: false });
      }
    } catch (error: any) {
      console.error('Error during sign-up:', error.message);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
