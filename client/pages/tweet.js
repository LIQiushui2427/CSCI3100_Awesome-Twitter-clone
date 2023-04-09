import React from 'react';
import { useRouter } from 'next/router';

import LeftPane from '../components/leftPane/leftPane';
import RightPane from '../components/rightPane/rightPane';
import TweetContent from '../components/tweetContent/tweetContent';

function Tweets() {
  const router = useRouter();
  const { tweetId } = router.query;
  
  // If tweetId is not available, return null
  if (!tweetId) {
    return null;
  }
  console.log('tweetId: in tweet.js: ', tweetId);
  // Render TweetContent component when tweetId is available
  return (
    <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
      <LeftPane />
      <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
        <TweetContent tweetId={tweetId} />
      </div>
      <RightPane />
    </main>
  );
}
export default Tweets;

