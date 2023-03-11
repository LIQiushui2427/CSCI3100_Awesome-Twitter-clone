import React from 'react';

const Home = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center mt-16">
      <div className="w-full flex justify-center items-center mb-8">
        <button className="text-lg text-gray-900 font-bold mr-4 py-2 px-6 bg-white rounded-md border border-gray-300 focus:outline-none">
          For You
        </button>
        <button className="text-lg text-gray-600 font-bold py-2 px-6 bg-gray-200 rounded-md border border-gray-300 focus:outline-none">
          Following
        </button>
      </div>
      <div className="w-full bg-black rounded-md border border-gray-300 p-4">
        <div className="flex items-center mb-4">
          <img
            src="https://randomuser.me/api/portraits/men/2.jpg"
            alt="User Profile"
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <h2 className="text-gray-800 font-bold text-lg">Jane Doe</h2>
            <p className="text-gray-600 text-sm">@janedoe</p>
          </div>
        </div>
        <p className="text-gray-800 text-lg mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2 text-gray-400">
              {/* The 'd' attribute of the SVG path goes here */}
            </svg>
            <span className="text-gray-500 text-sm">1.5K</span>
          </div>
          <div className="flex items-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2 text-gray-400">
              {/* The 'd' attribute of the SVG path goes here */}
            </svg>
            <span className="text-gray-500 text-sm">512</span>
          </div>
          <div className="flex items-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2 text-gray-400">
              {/* The 'd' attribute of the SVG path goes here */}
            </svg>
          </div>
          <div className="flex items-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2 text-gray-400">
              {/* The 'd' attribute of the SVG path goes here */}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
