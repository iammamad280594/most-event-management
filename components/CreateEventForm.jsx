'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';  // Ensure axios is correctly imported

export default function CreateEventForm() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [pricingChecked, setPricingChecked] = useState(false);
  const [ticketTiers, setTicketTiers] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const router = useRouter();

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddTicketTier = () => {
    setTicketTiers([...ticketTiers, { type: '', price: '', quantity: '' }]);
  };

  const handleRemoveTicketTier = (index) => {
    const newTiers = ticketTiers.filter((_, i) => i !== index);
    setTicketTiers(newTiers);
  };

  const handleTicketTierChange = (index, field, value) => {
    const newTiers = ticketTiers.map((tier, i) => (i === index ? { ...tier, [field]: value } : tier));
    setTicketTiers(newTiers);
  };

  const handleAddPromotion = () => {
    setPromotions([...promotions, { name: '', discount: '', startDate: '', endDate: '' }]);
  };

  const handleRemovePromotion = (index) => {
    const newPromotions = promotions.filter((_, i) => i !== index);
    setPromotions(newPromotions);
  };

  const handlePromotionChange = (index, field, value) => {
    const newPromotions = promotions.map((promo, i) => (i === index ? { ...promo, [field]: value } : promo));
    setPromotions(newPromotions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    formData.append('location', location);
    formData.append('isOnline', isOnline);
    formData.append('category', category);
    if (image) {
      formData.append('image', image);
    }
    formData.append('ticketTiers', JSON.stringify(ticketTiers));
    formData.append('promotions', JSON.stringify(promotions));

    try {
      await axios.post('/api/events/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push('/');
    } catch (error) {
      console.error('Event creation failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#1a1a2e] text-white p-8 rounded-lg shadow-lg space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center text-[#f5f5f5]">Create New Event</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-lg font-medium mb-2">Event Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-[#4a4a7b] bg-[#2c2c3e] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6a6aff]"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Date</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="border border-[#4a4a7b] bg-[#2c2c3e] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6a6aff]"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="border border-[#4a4a7b] bg-[#2c2c3e] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6a6aff]"
          />
          <label className="flex items-center mt-2 text-sm">
            <input
              type="checkbox"
              checked={isOnline}
              onChange={(e) => setIsOnline(e.target.checked)}
              className="mr-2"
            />
            Online Event
          </label>
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="border border-[#4a4a7b] bg-[#2c2c3e] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6a6aff]"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Upload Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="border border-[#4a4a7b] bg-[#2c2c3e] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6a6aff]"
          />
        </div>
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            checked={pricingChecked}
            onChange={(e) => setPricingChecked(e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm">Add Event Pricing</label>
        </div>
        {pricingChecked && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-2">Ticket Tiers</h3>
            {ticketTiers.map((tier, index) => (
              <div key={index} className="space-y-4 p-4 border border-[#4a4a7b] bg-[#2c2c3e] rounded-lg">
                <div>
                  <label className="block text-sm mb-1">Type</label>
                  <input
                    type="text"
                    value={tier.type}
                    onChange={(e) => handleTicketTierChange(index, 'type', e.target.value)}
                    required
                    className="border border-[#6a6aff] bg-[#1e1e3f] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6a6aff]"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Price</label>
                  <input
                    type="number"
                    value={tier.price}
                    onChange={(e) => handleTicketTierChange(index, 'price', e.target.value)}
                    required
                    className="border border-[#6a6aff] bg-[#1e1e3f] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6a6aff]"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Quantity</label>
                  <input
                    type="number"
                    value={tier.quantity}
                    onChange={(e) => handleTicketTierChange(index, 'quantity', e.target.value)}
                    required
                    className="border border-[#6a6aff] bg-[#1e1e3f] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6a6aff]"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveTicketTier(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddTicketTier}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Add Ticket Tier
            </button>
          </div>
        )}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-2">Promotions</h3>
          {promotions.map((promo, index) => (
            <div key={index} className="space-y-4 p-4 border border-[#4a4a7b] bg-[#2c2c3e] rounded-lg">
              <div>
                <label className="block text-sm mb-1">Promotion Name</label>
                <input
                  type="text"
                  value={promo.name}
                  onChange={(e) => handlePromotionChange(index, 'name', e.target.value)}
                  required
                  className="border border-[#6a6aff] bg-[#1e1e3f] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6a6aff]"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Discount (%)</label>
                <input
                  type="number"
                  value={promo.discount}
                  onChange={(e) => handlePromotionChange(index, 'discount', e.target.value)}
                  required
                  className="border border-[#6a6aff] bg-[#1e1e3f] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6a6aff]"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Start Date</label>
                <input
                  type="date"
                  value={promo.startDate}
                  onChange={(e) => handlePromotionChange(index, 'startDate', e.target.value)}
                  required
                  className="border border-[#6a6aff] bg-[#1e1e3f] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6a6aff]"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">End Date</label>
                <input
                  type="date"
                  value={promo.endDate}
                  onChange={(e) => handlePromotionChange(index, 'endDate', e.target.value)}
                  required
                  className="border border-[#6a6aff] bg-[#1e1e3f] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6a6aff]"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemovePromotion(index)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddPromotion}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Add Promotion
          </button>
        </div>
      </div>
      <button type="submit" className="bg-[#6a6aff] text-white px-6 py-3 rounded-lg hover:bg-[#5a5aff]">
        Create Event
      </button>
    </form>
  );
}
