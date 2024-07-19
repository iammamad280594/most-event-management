'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function PaymentPage({ params }) {
  const [event, setEvent] = useState(null);
  const [amount, setAmount] = useState(0);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/events/${id}`);
        setEvent(response.data);
        setAmount(response.data.price || 0);  // Assuming price is a field in event data
      } catch (error) {
        console.error('Failed to fetch event details:', error);
      }
    };
    fetchEvent();
  }, [id]);

  const handlePayment = () => {
    alert(`Proceed to payment for $${amount}`);
    // For example, you might integrate with Stripe or another payment gateway
    // Example: window.location.href = `https://example-payment-gateway.com/pay?amount=${amount}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-extrabold text-gray-900">Pay for Event</h2>
        {event ? (
          <div>
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-gray-600">{event.date} at {event.time}</p>
            <p className="mt-2 text-gray-800">{event.description}</p>
            <p className="mt-4 text-gray-600">Location: {event.location}</p>
            <p className="mt-4 text-gray-800">Price: ${amount}</p>
            <button
              onClick={handlePayment}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Pay Now
            </button>
          </div>
        ) : (
          <p>Loading event details...</p>
        )}
      </div>
    </div>
  );
}
