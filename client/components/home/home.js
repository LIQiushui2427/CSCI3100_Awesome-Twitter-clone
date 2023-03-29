import React from 'react';
import Tweet from '../tweet/tweet';
import PostButton from '../postButton';

const Home = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center mt-16">
      <div className="w-full flex justify-center items-center mb-8">
        <button className="text-lg text-white font-bold mr-4 py-2 px-6">
          For You
        </button>
        <button className="text-lg text-white font-bold py-2 px-6">
          Following
        </button>
      </div>
      <div className=" w-1/2 flex flex-col justify-center items-center">
        <Tweet />
      </div>
      <div className="w-full flex justify-center items-center mt-8">
        <PostButton />
      </div>
    </div>
  );
};

export default Home;
