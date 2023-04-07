import React, { useState, useEffect } from 'react';
import axios from '../../config.js';
import Tweet from '../tweet/tweet.jsx';
import PostPanel from '../tweet/postPanel.jsx';
const AdminPage = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // handle case where token is not found in localStorage
      return;
    }
    axios.get('/tweet/loadAllTweets', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        const tweets = Object.values(response.data.tweets);
        setTweets(tweets);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <div className="w-full flex flex-col justify-center items-center mt-16">
      <div className="w-full flex justify-center items-center mb-8">
        <button className="text-lg text-white font-bold mr-4 py-2 px-6">
          Admin Page
        </button>
        <button className="text-lg text-white font-bold py-2 px-6">
          Testing
        </button>
      </div>
      <div className=" w-1/2 flex flex-col justify-center items-center">
            {tweets.map((tweet, index) => (
          <Tweet key={index} tweetId={tweet.tweetId} />
        ))}
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <PostPanel />
        </div>
    </div>
  );
};

export default AdminPage;