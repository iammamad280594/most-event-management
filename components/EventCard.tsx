import React from 'react';

interface EventCardProps {
  event: {
    title: string;
    description: string;
    location: string;
    date: string;
    time: string;
    category: string;
    lowestPrice: string;
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white max-w-sm mx-auto mb-4 md:mb-6 lg:mb-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-2">{event.title}</h2>
      <p className="text-gray-700 mb-2">{event.description}</p>
      <p className="text-gray-600 mb-2"><span className="font-semibold">Location:</span> {event.location}</p>
      <p className="text-gray-600 mb-2"><span className="font-semibold">Date & Time:</span> {event.date} at {event.time}</p>
      <p className="text-gray-600 mb-2"><span className="font-semibold">Category:</span> {event.category}</p>
      <p className="text-gray-600"><span className="font-semibold">Price:</span> {event.lowestPrice}</p>
    </div>
  );
};

export default EventCard;
