'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function PaymentPage({ params }) {
  const { id } = params;
  const [event, setEvent] = useState(null);
  const [amount, setAmount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/events/${id}`);
        setEvent(response.data);
        setAmount(response.data.price);
      } catch {
        router.push('/404'); // Redirect to 404 page if event not found
      }
    };

    fetchEvent();
  }, [id, router]);

  const handlePayment = async () => {
    try {
      await axios.post('/api/payment', { eventId: id, amount });
      alert('Payment successful!');
      router.push('/'); // Redirect to homepage after successful payment
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
          <p className="mt-4 text-xl font-semibold">Price: ${amount}</p>
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
