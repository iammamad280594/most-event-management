'use client';

import { useEffect, useState } from 'react';
import EventCard from './EventCard';

const EventList = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Define an async function to fetch events
  const fetchEvents = async () => {
    setLoading(true); // Set loading to true before starting the fetch
    try {
      const response = await fetch('/api/events'); // Fetch from the API route

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`); // Throw an error if response is not ok
      }

      const data = await response.json(); // Parse JSON data from the response
      setEvents(data || []); // Set events data from response
    } catch (err) {
      setError((err as any).message || 'An error occurred'); // Set error message if fetch fails
    } finally {
      setLoading(false); // Set loading to false after fetch completes
    }
  };

  // Call fetchEvents when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle loading state
  if (loading) return <p>Loading...</p>;

  // Handle error state
  if (error) return <p>Error: {error}</p>;

  // Render the events
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {events.length > 0 ? (
        events.map(event => (
          <EventCard key={event.id} event={event} />
        ))
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
};

export default EventList;
