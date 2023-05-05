// Import React and useState hooks
import React, { useState } from 'react';

// Import the useRouter hook from next/router
import { useRouter } from 'next/router';

// Import the SearchPage component
import SearchPage from '../searchPage';
import Advertise from '../advertise';

// Define a functional component called RightPane
const RightPane = () => {
  
  // Declare a state variable called searchTerm, and a function called setSearchTerm to update it
  const [searchTerm, setSearchTerm] = useState('');

  // Access the useRouter hook and store it in a variable called router
  const router = useRouter();

  // Declare a state variable called searchKey, and a function called setSearchKey to update it
  const [searchKey, setSearchKey] = useState(null)

  // Define a function called handleSearch to handle search events
  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      setSearchKey(searchTerm.trim())
    }
  };

  const ads = [
    {
      sentence: 'Get $200-$600 off a new iPhone 14 when you trade in an iPhone 11 or higher.',
      sponsor: 'Apple',
    },
    {
      sentence: 'Follow me on Twitter!',
      sponsor: 'lqs',
    },
    // Add more ads as needed
  ];

  return (
    <div className="hidden lg:inline ml-8 xl:w-[450px] py-1 space-y-5">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search for user/tweet..."
          className="text-black text-sm w-full py-2 px-3 bg-gray-700 text-white rounded-full outline-none focus:ring focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white text-sm py-2 px-4 ml-2 rounded-full disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
          onClick={handleSearch}
          disabled={!searchTerm}
        >
          Search
        </button>
      </div>
      <SearchPage searchKey={searchKey} />
      <Advertise ads={ads} />
    </div>
  );
};

export default RightPane;
