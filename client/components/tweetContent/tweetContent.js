import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import Navigate from '../Navigate';
import Cover from '../Cover';
import TweetText from './tweetText';
import CommentBox from './commentBox';
import CommentText from './commentText';
import { getUsername } from '../../helper/helper';

function TweetContent({ tweetId }) {
  const [tweetData, setTweetData] = useState(null);
  const [commentsData, setCommentsData] = useState([]);
  const username = getUsername();

  useEffect(() => {
    const fetchTweetData = async () => {
      try {
        if (tweetId) {
          const tweetResponse = await axios.get(`http://localhost:8080/api/tweet/getTweetById?tweetId=${tweetId}`);
          console.log("TweetId in tweetContent", tweetId);
          setTweetData(tweetResponse.data);
          console.log("Tweetdata:", tweetResponse.data);
          
          const username = await getUsername(); // Wait for the promise to resolve
          const commentResponse = await axios.get(`http://localhost:8080/api/tweet/${tweetId}/comments?username=${username}&tweetId=${tweetId}`);
          console.log("Comments for tweet:", commentResponse.data);
          setCommentsData(commentResponse.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTweetData();
  }, [tweetId]);  
  
  return (//layout and something before would not render somehow . Stuck rendering so i deleted.
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full justify-start items-stretch pb-10">
          <div className="px-5 pt-2">
            <Navigate title="Tweet" />
          </div>
          {tweetData && (
            <TweetText tweetId={tweetId} />
          )}

          <CommentBox tweetId={tweetId} username={username} />
          {commentsData.map((comment) => (
            <CommentText
              key={comment.commentId}
              authorname={comment.username}
              content={comment.content}
              picture={comment.picture}
            />
          ))}
        </div>
      </div>
  );
}

export default TweetContent;