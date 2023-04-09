import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import Navigate from '../Navigate';
import Cover from '../Cover';
import TweetText from './tweetText';
import CommentBox from './commentBox';
import CommentText from './commentText';

function TweetContent({ tweetId }) {
  const [tweetData, setTweetData] = useState(null);
  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {

    const fetchTweetData = async () => {
        try {
          if (tweetId) { // <-- Check if tweetId exists
            const response = await axios.get(`http://localhost:8080/api/tweet/getTweetById?tweetId=${tweetId}`);
            console.log("TweetId in tweetContent", tweetId);
            setTweetData(response.data);
            setCommentsData(response.data.comments);
            console.log("Tweetdata:", response.data);
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

          <CommentBox />
          {/* {commentsData.map((comment) => (
            <CommentText
              key={comment.commentId}
              authorname={comment.authorname}
              authorid={comment.authorid}
              content={comment.content}
              picture={comment.picture}
            />
          ))} */}
        </div>
      </div>
  );
}

export default TweetContent;