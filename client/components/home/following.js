import React, { useState, useEffect } from 'react';
import axios from '../../config.js';
import { getUsername, checkLoginStatus, checkIsAdmin } from '../../helper/helper';
import TweetText from '../tweetContent/tweetText.jsx';
import TweetList from '../tweetlist.jsx';
import Post from '../tweet/post.jsx';
/*
this component is used to display the tweets of the users that the logged in user is following.
It will invde the tweetlist component and the post component.
The post component will only be displayed if the user is logged in.
If the user is logged in, the username will be displayed on the top of the page.
*/
function Following () {
  const [tweets, setTweets] = useState([]);
  const [username, setUsername] = useState('');
  const [isloggedin, setIsloggedin] = useState(false);

  checkLoginStatus().then(res => setIsloggedin(res));


  useEffect(() => {
    const getUsernameAsync = async () => {
      const username = await getUsername();
      setUsername(username);
    };
    getUsernameAsync();
  }, []);

  const addTweet = (tweet) => {
    setTweets([tweet, ...tweets]);
  }

  return (
    <div>
      {isloggedin && <Post onTweet={addTweet} />}
      <div>
          <TweetList username={username} />
      </div>
    </div>
  );
}

export default Following;