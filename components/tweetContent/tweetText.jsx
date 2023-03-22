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



const TweetText = ({ authorname='test', authorid='someone_example',time='1h', content, picture,likes='0', retweets='0', onLike, onComment, onRetweet }) => (
  <div className="flex flex-col items-start p-4">
  <div className="flex items-start p-4">
    <Avatar src="https://www.w3schools.com/howto/img_avatar.png" alt="Test" />
    <div className="ml-4">
      <div className="flex items-center">
        <span className="font-bold text-lg">{authorname}</span>
      </div>
      <div className="flex items-center">
        <span className="text-gray-500">@{authorid}</span>
        <span className="mx-2">&middot;</span>
        <span className="text-gray-500">{time}</span>
      </div>
    </div>
  </div>
        
  <div className="flex flex-col items-start p-4 divide-y divide-gray-500"> 
      <p className="text-2xl">{content}</p>
      <img
        className="my-4 w-auto"
        src="https://ksbeeper.files.wordpress.com/2020/11/samplepic.png"
        alt="Sample Picture"
      />
      <div className="text-gray-500 flex pt-2 pb-2">
        <div className="text-white font-bold"> {retweets} </div>
        <div className="pl-2">Retweets</div>
        <div className="text-white font-bold pl-5"> {likes} </div>
        <div className="pl-2">Likes</div>
      </div>
      <div className="pt-2 justify-between flex items-center">
        <div className="p-2 mr-3 hover:text-blue-600 hover:bg-blue-600/10 rounded-full items-center cursor-pointer" onClick={onComment}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg></div>
        <div className="p-2 mr-3 hover:text-green-600 hover:bg-green-600/10 rounded-full items-center cursor-pointer" onClick={onRetweet}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg></div>
        <div className="p-2 mr-3 hover:text-pink-600 hover:bg-pink-600/10 rounded-full items-center cursor-pointer" onClick={onLike}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg></div>


      </div>
    
    
  </div>
  </div>
    
);

TweetText.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  onLike: PropTypes.func.isRequired,
  onComment: PropTypes.func.isRequired,
};

export default TweetText;