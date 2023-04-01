import React from 'react';
import axios from '../../config'
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import baseUrl from '../../config'
const Avatar = ({ src, alt }) => (
  <img
    className="h-10 w-10 rounded-full"
    src={src}
    alt={alt}
  />
);

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

const LikeButton = ({ onClick }) => (
  <button
    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:shadow-outline-blue active:bg-gray-400"
    onClick={onClick}
  >
    Like
  </button>
);

LikeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const CommentButton = ({ onClick }) => (
  <button
    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:shadow-outline-blue active:bg-gray-400 ml-4"
    onClick={onClick}
  >
    Comment
  </button>
);

CommentButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const Tweet = ({ tweetId }) => {
  const [tweetData, setTweetData] = useState(null);
  //console.log(tweetId);
  useEffect(() => {
    const fetchTweetData = async () => {
      try {
        const response = await axios.get(`/tweet/getTweetById?tweetId=${tweetId}`);///tweet:tweetId
        const data = response.data;
        setTweetData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTweetData();
  }, [tweetId]);

  if (!tweetData) {
    return <div>Loading tweet...</div>;
  }
  //console.log(tweetData);
  const { username, content, images } = tweetData;

  return (
    <div className="flex items-start p-4">
      <Avatar src="https://www.w3schools.com/howto/img_avatar.png" alt="Test" />
      <div className="ml-4">
        <div className="flex items-center">
          <span className="font-bold text-lg">{username}</span>
          <span className="ml-2 text-gray-500">@{username}</span>
          <span className="mx-2">&middot;</span>
          <span className="text-gray-500">1h</span>
        </div>
        <p className="mt-2">{content}</p>
        <div className="mt-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={`http://localhost:8080/${image.path}`} //`${baseUrl}/${image.path}`}, not elegant
            alt={`Image ${index}`}
            width="100"
            height="100"
          />
        ))}

        </div>
        <LikeButton onClick={() => console.log("Liked tweet", tweetId)} />
        <CommentButton onClick={() => console.log("Commented on tweet", tweetId)} />
      </div>
    </div>
  );
};

export default Tweet;
