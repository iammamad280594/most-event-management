'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function EventDetailPage({ params }) {
  const { id } = params;
  const [event, setEvent] = useState(null);
  const router = useRouter();

  useEffect(() => {
    axios.get(`http://localhost:4000/events/${id}`).then(response => {
      setEvent(response.data);
    }).catch(() => {
      router.push('/404'); // Redirect to 404 page if event not found
    });
  }, [id]);

  const handlePayment = async () => {
    try {
      await axios.post('/api/payment', { eventId: id });
      alert('Payment successful!');
    } catch (error) {
      alert('Payment failed.');
    }
  };

  return (
    <div className="container mx-auto my-8">
      {event ? (
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold">{event.title}</h1>
          <p className="text-gray-600">{event.date} at {event.time}</p>
          <p className="mt-4 text-gray-800">{event.description}</p>
          <p className="mt-2 text-gray-600">{event.location}</p>
          <p className="mt-4 text-xl font-semibold">Price: ${event.price}</p>
          <button
            onClick={handlePayment}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Pay Now
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
