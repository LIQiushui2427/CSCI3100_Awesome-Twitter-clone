import React, { useState, useEffect } from 'react';
import axios from '../../config.js';
import { getUsername, checkLoginStatus, checkIsAdmin } from '../../helper/helper';
import Post from '../tweet/post.jsx';
import TweetText from '../tweetContent/tweetText.jsx';
import TweetList from '../tweetlist.jsx';
/*
this component is used to display the tweets of the users that the logged in user is following.
It will invde the tweetlist component and the post component.
It has a search bar that can be used to search for tweets.
And it will display the tweets that match the search result.
The post component will only be displayed if the user is logged in.
If the user is logged in, the username will be displayed on the top of the page.
*/
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