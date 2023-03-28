import React from 'react';
import PropTypes from 'prop-types';

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



const CommentBox = ({ authorid='someone_example', avatarpic='https://picsum.photos/id/1005/40/40'}) => (
  <div className="flex flex-col items-start p-4 border-y border-twitterBorder">
  <div className="ml-24">
      <span className="text-gray-500">Replying to </span>
      <span className="text-blue-500">@{authorid}</span>
  </div>
  <div className="flex items-start p-4">
    <Avatar src={avatarpic} alt="Test" />
    <div className="ml-4">
      <div className="flex items-centerl">
        <textarea name="commentInput" placeholder="Tweet your reply" cols={60} rows={3} className="w-full resize-none bg-transparent caret-white focus:outline-none text-xlon  " />
      </div>
      <div className="flex items-center">
        <div className="p-2 mr-1 text-blue-500 hover:bg-blue-600/10 rounded-full items-center cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
        </svg></div>
        <div className="p-2 mr-1 text-blue-500 hover:bg-blue-600/10 rounded-full items-center cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg></div>
        <div className="px-5 justify-self-end">
            <button className="bg-twitterBlue text-white py-2 px-6 rounded-full">
                Reply
            </button>
        </div>
      </div>
    </div>
  </div>
        
  </div>
    
);

CommentBox.propTypes = {
  authorid: PropTypes.string.isRequired,
  avatarpic: PropTypes.string.isRequired,
};

export default CommentBox;