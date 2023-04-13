import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../../hooks/fetch.hook';

const Avatar = ({ src, alt }) => (
  <img className="h-16 w-16 rounded-full" src={src} alt={alt} />
);


function CommentBox({ tweetId, username, onNewComment, avatarpic= 'https://www.w3schools.com/howto/img_avatar.png' }) {
  const [commentContent, setCommentContent] = useState('');
  const [commentImages, setCommentImages] = useState([]);
  const [resolvedUsername, setResolvedUsername] = useState('');
  const [{ isLoading, apiData, serverError }] = useFetch();

  useEffect(() => {
    username.then((result) => {
      setResolvedUsername(result);
    });
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('username', resolvedUsername);
    formData.append('content', commentContent);
    formData.append('tweetId', tweetId);
    commentImages.forEach((image) => {
      formData.append('commentImages', image);
    });
    setCommentContent("");
    const jsonData = {};
    for (const [key, value] of formData.entries()) {
      jsonData[key] = value;
    }
  
    const response = await fetch(`http://localhost:8080/api/tweet/${tweetId}/createComment?username=${resolvedUsername}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
      
    });
  
    if (response.ok) {
      // do something
      console.log('CommentBox.jsx: handleSubmit: new comment created');
      onNewComment();
    } else {
      // handle errors
      console.log('Error at handleSubmit in CommentBox.jsx');
    }
  };
  

  const handleContentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setCommentImages(files);
  };

  return (
    <div className="flex flex-col items-start p-4 border-y border-twitterBorder">
      <div className="ml-24">
        <span className="text-gray-500">Replying to this tweet </span>
      </div>
      <div className="flex items-start p-4">
        <Avatar src={apiData?.profile || avatarpic} alt="Test" />
        <div className="ml-4">
          <div className="flex items-centerl">
            <textarea
              name="commentInput"
              placeholder="Tweet your reply"
              value={commentContent}
              onChange={handleContentChange}
              cols={60}
              rows={3}
              className="w-full resize-none bg-transparent caret-white focus:outline-none text-xlon"
            />
          </div>
          <div className="flex items-center">
            <div className="px-5 justify-self-end">
              <label className="bg-twitterBlue text-white py-2 px-6 rounded-full cursor-pointer">
                <input type="file" multiple onChange={handleImageChange} className="hidden" />
                <span>Image</span>
              </label>
              <button className="ml-5 bg-twitterBlue text-white py-2 px-6 rounded-full" onClick={handleSubmit}>
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
CommentBox.propTypes = {
  tweetId: PropTypes.string.isRequired,
  username: PropTypes.object.isRequired, // Change the prop type to object
  avatarpic: PropTypes.string.isRequired,
};

export default CommentBox;
