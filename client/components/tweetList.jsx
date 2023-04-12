import React, { useEffect, useState } from "react";
import Button from "./follow_button";
import TweetText from "./tweetContent/tweetText";
import { data } from "autoprefixer";

const TweetList = ({ searchKey }) => {
  const [tweets, setTweets] = useState([]);
  console.log("TweetList component: key: ", searchKey);
  useEffect(() => {
    // make request to backend API to get tweets based on key
    if (searchKey) {
    fetch(`http://localhost:8080/api/tweet/searchTweets?key=${searchKey}`)
      .then((res) => res.json())
      .then((data) => setTweets(data.tweets))
      .catch((err) => console.error(err));
    }
  }, [searchKey]);
  console.log("TweetList: tweets: ", data.tweets);
  if (!tweets || tweets.length == 0) {
    return <div>No tweet found</div>;
  }
  console.log("TweetList: tweets: ", data.tweets);
    return (
    <div className="rounded-lg shadow-md p-6">
      <ul>
        {tweets.map((tweet) => (
          <li key={tweet.tweetId} className="flex items-center space-x-4 py-4">
            <TweetText tweetId={tweet.tweetId} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TweetList;