import React, { useState } from 'react';
import { router} from 'next/router';
import Button from '../follow_button';
import { useRouter } from 'next/router';

const RightPane = () => {
  const developers = [
    { name: 'Carlos', imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg', site: 'https://github.com/CarlosCUHK' },
    { name: 'ZHANG Xue', imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg', site: 'https://github.com/c-beeper' },
    { name: 'liqiushui', imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg' , site: 'https://github.com/LIQiushui2427'},
    { name: 'Angel', imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg', site: 'https://github.com/Angel-lyt' },
    { name: 'ZHENG Xinhao', imageUrl: 'https://randomuser.me/api/portraits/men/4.jpg', site: 'https://github.com/jzxheremy' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      router.push(`/search?searchKey=${searchTerm.trim()}`);
    }
  };

  return (
    <div className="hidden lg:inline ml-8 xl:w-[450px] py-1 space-y-5">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search for user/tweet..."
          className="text-black text-sm w-full py-2 px-3 rounded-full outline-none focus:ring focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white text-sm py-2 px-4 ml-2 rounded-full"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <h2 className="text-white font-bold text-lg mb-4">Developers to Follow</h2>
      <ul className="list-none">
        {developers.map((developer) => (
          <li key={developer.name} className="mb-4 flex items-center">
            <img src={developer.imageUrl} alt={developer.name} className="w-12 h-12 rounded-full mr-4" />
            <div className="flex-grow">
              <h3 className="text-white font-semibold">{developer.name}</h3>
              <button onClick={() => window.open(developer.site, '_blank')} className="text-blue-500 text-sm">Visit Site</button>
              <Button text="Follow" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RightPane;
