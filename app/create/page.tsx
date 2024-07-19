// pages/create-event.jsx

'use client';

import CreateEventForm from '@/components/CreateEventForm'; // Adjust the path if necessary

export default function CreateEvent() {
  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Create Event</h1>
      <CreateEventForm />
    </div>
  );
}
