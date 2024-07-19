import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = req.cookies.get('auth-token');

  if (!token) {
    return NextResponse.redirect(new URL('/signIn', req.url));
  }

  // Optionally, validate the token with the backend here.

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/create-event/:path*'], // Protect these routes
};
