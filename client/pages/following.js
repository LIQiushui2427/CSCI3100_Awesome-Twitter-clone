import React from 'react';
import { useRouter } from 'next/router';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import LeftPane from '../components/leftPane/leftPane';
import RightPane from '../components/rightPane/rightPane';
import Home from '../components/home/home';
import Following from '@/components/home/following';

function App() {
  const router = useRouter();

  const handleForYouClick = () => {
    router.push('/');
  };

  const handleFollowingClick = () => {
    router.push('/following');
  };

  return (
    <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
      <LeftPane />
      <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[350px]">
      <div className="flex justify-center mb-4">
      <button className="bg-blue-100 text-blue-700 font-bold py-2 px-4 rounded-lg mr-4 text-xl" onClick={handleForYouClick}>For You</button>
      <button className="bg-blue-100 text-blue-700 font-bold py-2 px-4 rounded-lg text-xl" onClick={handleFollowingClick}>Following</button>
      </div>
      {router.pathname === '/' ? <Home /> : <Following />}
    </div>
      <RightPane />
    </main>
  );
}

export default App;