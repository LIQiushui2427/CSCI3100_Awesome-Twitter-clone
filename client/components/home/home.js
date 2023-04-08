import React, { useState, useEffect, useRef } from 'react';
import axios from '../../config.js';
import { useFormik } from 'formik';
import Post from '../tweet/post.jsx';
import useFetch from '../../hooks/fetch.hook';
import TweetText from '../tweetContent/tweetText.jsx';
import { getUsername, checkLoginStatus, checkIsAdmin } from '../../helper/helper';

import {
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline';

const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [tweetCount, setTweetCount] = useState(0);
  const [isloggedin, setIsloggedin] = useState(false);
  checkLoginStatus().then(res => setIsloggedin(res));
  useEffect(() => {
    axios
      .get('/tweet/loadAllTweets')
      .then(response => {
        const tweets = Object.values(response.data.tweets);
        setTweets(tweets);
        setTweetCount(tweets.length);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [tweetCount]);

  const addTweet = (tweet) => {
    setTweets([tweet,...tweets]);
    setTweetCount(tweetCount + 1);
  }
  
  return (
    <div>{isloggedin?
      <Post onTweet={addTweet} />:null}
      <div >
          {tweets.map((tweet, index) => (
          <TweetText key={index} tweetId={tweet.tweetId} />
        ))}
      </div>
    </div>
  )
};

export default Home;
