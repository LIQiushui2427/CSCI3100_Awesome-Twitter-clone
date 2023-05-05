import React from 'react';

function Advertise({ ads }) {
  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <p className="text-white text-lg font-bold mb-4">
        Interested in Advertising? Please contact developers for more info.
      </p>
      <ul className="space-y-2">
        {ads.map((ad, index) => (
          <li key={index} className="flex items-center">
            <p className="text-white">{ad.sentence}</p>
            <p className="ml-auto text-gray-300 text-sm">{ad.sponsor}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Advertise;
