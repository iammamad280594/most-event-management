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
    <div className="p-4 border rounded-md shadow-sm">
      <h2 className="text-xl font-bold mb-2">{event.title}</h2>
      <p className="text-gray-700 mb-2">{event.description}</p>
      <p className="text-gray-600 mb-2">{event.location}</p>
      <p className="text-gray-600 mb-2">{event.date} at {event.time}</p>
      <p className="text-gray-600 mb-2">Category: {event.category}</p>
      <p className="text-gray-600">Price: {event.lowestPrice}</p>
    </div>
  );
};

export default EventCard;
