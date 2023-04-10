import React from 'react';
import UserList from './userlist';
import TweetList from './tweetlist';
import { useRouter } from 'next/router';

function SearchPage({searchKey}) {
  console.log('SearchPage component: searchKey: ', searchKey);
  return (
    <div className="w-1/2 mx-auto mt-10 flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Search: {searchKey}</h2>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-bold mb-4">Users</h3>
          <UserList searchKey={searchKey} />
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Tweets</h3>
          <TweetList searchKey={searchKey} />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
