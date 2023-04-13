import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import axios from 'axios';
import { getUsername } from '../../helper/helper.js';
import useFetch from '../../hooks/fetch.hook';

const Avatar = ({ src, alt }) => (
  <img
    className="h-16 w-16 rounded-full"
    src={src}
    alt={alt}
  />
);


function CommentText({ commentor = 'test_commentor', author_username = 'Tweeter', time = '1h', content = 'hello world',
  avatarpic = 'https://www.w3schools.com/howto/img_avatar.png', picture = 'https://ksbeeper.files.wordpress.com/2020/11/samplepic.png',
  nopic = "true", likes = '0', quotedText, onLike, tweetId, onNewReply }) {

  const [replying, setReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [showQuotedText, setShowQuotedText] = useState(false);
  const [{ isLoading, apiData, serverError }] = useFetch();

  const handleReplyClick = () => {
    setReplying(true);
  };

  const handleSendReply = async (e) => {
    e.preventDefault();

    const username = await getUsername();

    const data = {
      tweetId: tweetId,
      username: username,
      replyTo: commentor,
      quotedText: content,
      content: replyContent,
    };

    console.log('CommentText.jsx: handleSubmit: data: ', data);

    const url = `http://localhost:8080/api/tweet/${tweetId}/createComment?username=${username}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      // do something if the request was successful
      onNewReply();
      console.log('CommentText.jsx: handleSubmit: new comment created');
    } else {
      // handle the error if the request failed
      console.log('Error at handleSubmit in CommentText.jsx');
    }


    setReplying(false);
    setReplyContent('');
  };

  const handleCancelReply = () => {
    setReplying(false);
    setReplyContent('');
  }

  const handleViewQuotedText = () => {
    setShowQuotedText(!showQuotedText);
  };
  return (
    <div className="flex flex-col items-start p-2 border-y border-twitterBorder">
      <div className="flex items-start p-4">
        <Avatar src={avatarpic} alt="Test" />
        <div className="ml-4">
          <div className="flex items-center">
            <span className="font-bold text-lg">{commentor}</span>
            <span className="ml-2 text-gray-500">@{commentor}</span>
            <span className="text-gray-500 mx-2">&middot;</span>
            <span className="text-gray-500">{time}</span>
          </div>
          <div>
            <span className="text-gray-500">Replying to </span>
            <span className="text-blue-500">@{author_username}</span>
          </div>
          <p className="mt-2 mb-2">{content}</p>
          <img className={"w-auto rounded-xl " + (nopic == "true" ? 'hidden' : '')} src={picture} alt="Sample Picture" />
          <div className="text-sm text-gray-500 mt-2 cursor-pointer" onClick={handleViewQuotedText}>
            Show quoted text
          </div>
          <div className="mt-2 justify-start flex items-center">
            <div className="p-1 mr-2 hover:text-blue-600 hover:bg-blue-600/10 rounded-full items-center cursor-pointer" onClick={handleReplyClick}><Image src="/reply.svg" width={20} height={20} alt="reply" /></div>
            <div className="p-1 mr-2 hover:text-pink-600 hover:bg-pink-600/10 rounded-full items-center cursor-pointer" onClick={onLike}><Image src="/like.svg" width={20} height={20} alt="like" /></div>
          </div>
        </div>
      </div>
      {replying && (
        <div className="mt-4 flex justify-between w-full">
          <textarea
            className="block w-full border-gray-300 rounded-lg p-2 mb-4 bg-black text-white"
            placeholder="Type your reply here"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <div className="flex justify-between">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 h-16 rounded-lg" onClick={handleCancelReply}>Cancel</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 h-16 rounded-lg ml-2" onClick={handleSendReply}>Send</button>
          </div>
        </div>
      )}
      {showQuotedText && (
        <div className="mt-4 flex justify-between w-full">
          <div className="block w-full border-gray-300 rounded-lg p-2 mb-4 bg-black text-white">
            <div className="text-lg font-medium mb-4">Quoted Text</div>
            <div className="bg-black rounded-lg p-4 text-white mb-4">{quotedText}</div>
          </div>
          <button
            className="bottom-4 right-4 px-4 bg-gray-300 text-black rounded-lg hover:bg-gray-700"
            onClick={() => setShowQuotedText(false)}
          >Done</button>
        </div>
      )}

    </div>

  );
};

export default CommentText;