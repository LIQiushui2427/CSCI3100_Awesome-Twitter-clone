import React, { useState, useEffect, useRef } from 'react';
import axios from '../../config.js';
import { useFormik } from 'formik';
import Post from '../tweet/post.jsx';
import useFetch from '../../hooks/fetch.hook';
import Tweet from '../tweet/tweet';
import TweetText from '../tweetContent/tweetText.jsx';
import {
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline';

const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [tweetCount, setTweetCount] = useState(0);

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
  console.log(tweetCount)
  return (
    <div>
      <Post onTweet={addTweet} />
      <div >
          {tweets.map((tweet, index) => (
          <TweetText key={index} tweetId={tweet.tweetId} />
        ))}
      </div>
    </div>
  )
};

export default Home;
