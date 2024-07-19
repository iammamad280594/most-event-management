// root/app/api/events/create/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const getEventsFilePath = () => path.join(process.cwd(), 'public', 'events.json');
const readEventsFromFile = () => {
  const filePath = getEventsFilePath();
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
};
const writeEventsToFile = (events) => {
  const filePath = getEventsFilePath();
  fs.writeFileSync(filePath, JSON.stringify(events, null, 2), 'utf-8');
};

export async function POST(request) {
  const { title, description, date, time, location } = await request.json();
  try {
    const events = readEventsFromFile();
    const newEvent = { id: events.length + 1, title, description, date, time, location };
    events.push(newEvent);
    writeEventsToFile(events);
    return NextResponse.json({ message: 'Event created successfully!' });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create event' }, { status: 500 });
  }
}
