'use client';

import { useState } from 'react';

export default function SearchBar({ setSearchQuery }) {
  const [inputQuery, setInputQuery] = useState('');

  const handleSearch = () => {
    setSearchQuery(inputQuery);
  };

  return (
    <div className="flex items-center space-x-4 mb-6">
      <input
        type="text"
        value={inputQuery}
        onChange={(e) => setInputQuery(e.target.value)}
        placeholder="Search events..."
        className="px-3 py-1 rounded-md border border-gray-300"
      />
      <button
        onClick={handleSearch}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
      >
        Search
      </button>
    </div>
  );
}
