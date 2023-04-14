import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigate from '../Navigate';
import TweetText from './tweetText';
import CommentBox from './commentBox';
import CommentText from './commentText';
import { getUsername } from '../../helper/helper';

function TweetContent({ tweetId }) {
  const [tweetData, setTweetData] = useState(null);
  const [commentsData, setCommentsData] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const username = getUsername();

  const handleNewComment = () => {
    setCommentCount((prevCount) => prevCount + 1); // Increment the comment count
  };

  // Fetch tweet and comments data
  useEffect(() => {
    const fetchTweetData = async () => {
      try {
        if (tweetId) {
          const tweetResponse = await axios.get(`http://localhost:8080/api/tweet/getTweetById?tweetId=${tweetId}`);
          setTweetData(tweetResponse.data);

          //const username = await getUsername(); // Wait for the promise to resolve
          const commentResponse = await axios.get(`http://localhost:8080/api/tweet/comments?tweetId=${tweetId}`);
          console.log("Comments for tweet:", commentResponse.data);
          setCommentsData(commentResponse.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTweetData();
  }, [tweetId, commentCount]); // Add commentCount as a dependency
  
  return (//layout and something before would not render somehow . Stuck rendering so i deleted.
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full justify-start items-stretch pb-10">
          <div className="px-5 pt-2">
            <Navigate title="Tweet" />
          </div>
          {tweetData && (
            <TweetText tweetId={tweetId} />
          )}

          <CommentBox tweetId={tweetId} username={username} onNewComment={handleNewComment} commentCount={commentCount}/>
          
          {commentsData.map((comment) => (
            <CommentText
              key={comment.commentId}
              avatarpic = {comment.profile}
              commentor_name={comment.nickname}
              tweetId = {tweetId}
              commentor={comment.username}
              author_username={comment.replyTo == 'Tweeter' ? tweetData.username : comment.replyTo}
              quotedText={comment.quotedText == null ? tweetData.content : comment.quotedText}
              content={comment.content}
              picture={comment.images}
              time= {comment.time}
              onNewReply={handleNewComment}
            />
          ))}
        </div>
      </div>
  );
}

export default TweetContent;