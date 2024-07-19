'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const userType = localStorage.getItem('userType');

      setIsLoggedIn(loggedIn);
      setUserType(userType || '');
    };
    checkLoginStatus();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('userType');
    setIsLoggedIn(false);
    setUserType('');
    router.push('/');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-semibold"> MOST </Link>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              {userType === 'creator' && (
                <Link href="/create" className="text-white px-4">Create Event</Link>
              )}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events..."
                className="px-3 py-1 rounded-md border border-gray-300"
              />
              <button
                onClick={handleSearch}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Search
              </button>
              <button
                onClick={handleLogout}
                className="text-white px-4"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="text-white px-4">Sign In</Link>
              <Link href="/signup" className="text-white px-4">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
