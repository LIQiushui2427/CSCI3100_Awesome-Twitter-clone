import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUsername } from '../../helper/helper';
import axios 

const Avatar = ({ src, alt }) => (
  <img
    className="h-16 w-16 rounded-full"
    src={src}
    alt={alt}
  />
);

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

function CommentBox({authorid = 'someone_example', avatarpic = 'https://picsum.photos/id/1005/40/40' });
  const [username, setUsername] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commentImages, setCommentImages] = useState([]);

  useEffect(() => {
    getUsername().then((value) => {
      setUsername(value);
    });
  }, []);

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:3000/api/comments');
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author: username,
        content: commentContent,
        images: commentImages,
      }),
    });
    if (response.ok) {
      // do something
    } else {
      // handle errors
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
        <Avatar src={avatarpic} alt="Test" />
        <div className="ml-4">
          <div className="flex items-centerl">
            <textarea name="commentInput" placeholder="Tweet your reply" value={commentContent} onChange={handleContentChange} cols={60} rows={3} className="w-full resize-none bg-transparent caret-white focus:outline-none text-xlon" />
          </div>
          <div className="flex items-center">
            <div className="px-5 justify-self-end">
              <button className="bg-twitterBlue text-white py-2 px-6 rounded-full" onClick={handleSubmit}>
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CommentBox.propTypes = {
  authorid: PropTypes.string.isRequired,
  avatarpic: PropTypes.string.isRequired,
};

export default CommentBox;
