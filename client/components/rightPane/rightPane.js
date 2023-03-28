import React from 'react';

const RightPane = () => {
  const developers = [
    { name: 'John Doe', imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Jane Doe', imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { name: 'Bob Smith', imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { name: 'Sara Johnson', imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg' },
  ];

  return (
    <div className="bg-black w-72 h-screen fixed right-0 top-0 p-4">
      <h2 className="text-white font-bold text-lg mb-4">Developers to Follow</h2>
      <ul className="list-none">
        {developers.map((developer) => (
          <li key={developer.name} className="mb-4 flex items-center">
            <img src={developer.imageUrl} alt={developer.name} className="w-12 h-12 rounded-full mr-4" />
            <div className="flex-grow">
              <h3 className="text-white font-semibold">{developer.name}</h3>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full mt-2">Follow</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RightPane;
