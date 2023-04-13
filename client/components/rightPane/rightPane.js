import React, { useState } from 'react';
import { router} from 'next/router';
import Button from '../follow_button';
import { useRouter } from 'next/router';
import SearchPage from '../searchPage';

const RightPane = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const [searchKey, setSearchKey] = useState(null)
  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      setSearchKey(searchTerm.trim())
    }
  };

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
    </div>
  );
};

export default RightPane;
