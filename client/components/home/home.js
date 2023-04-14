import React, { useState, useEffect } from 'react';
import axios from '../../config.js';
import { getUsername, checkLoginStatus, checkIsAdmin } from '../../helper/helper';
import Post from '../tweet/post.jsx';
import TweetText from '../tweetContent/tweetText.jsx';
import TweetList from '../tweetlist.jsx';

function Home ()  {
  const [tweets, setTweets] = useState([]);
  const [tweetCount, setTweetCount] = useState(0);
  const [isloggedin, setIsloggedin] = useState(false);
  const [loading, setLoading] = useState(false);
  
  checkLoginStatus().then(res => setIsloggedin(res));


  useEffect(() => {
    setLoading(true);
    let url = '/tweet/searchTweets';
    axios
      .get(url)
      .then(response => {
        const tweets = Object.values(response.data.tweets);
        setTweets(tweets);
        setTweetCount(tweets.length);
        setLoading(false);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, [tweetCount]);

  const addTweet = (tweet) => {
    setTweets([tweet,...tweets]);
    setTweetCount(tweetCount + 1);
  }
  
return (
  <div>
    {isloggedin && <Post onTweet={addTweet} />}
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
      </div>
      {loading ? (
        <p>Loading...</p>
      ): (
        tweets.map((tweet) => <TweetText key={tweet.tweetId} tweetId={tweet.tweetId} />)
      )}
    </div>
  </div>
);
}

export default Home;