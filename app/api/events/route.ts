import { NextResponse } from 'next/server';

// This function should be replaced with your actual data-fetching logic
async function fetchEventsFromDatabase() {
  // Example fetch from an external API or database
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/events`);
  const data = await response.json();
  return data;
  
}
console.log (fetchEventsFromDatabase);

export async function GET() {
  try {
    const events = await fetchEventsFromDatabase();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}