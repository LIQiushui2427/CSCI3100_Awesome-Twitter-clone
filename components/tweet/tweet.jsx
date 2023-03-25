import React from 'react';
import PropTypes from 'prop-types';

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

const Tweet = ({ author, content, picture, onLike, onComment }) => (
  <div className="flex items-start p-4">
    <Avatar src="https://www.w3schools.com/howto/img_avatar.png" alt="Test" />
    <div className="ml-4">
      <div className="flex items-center">
        <span className="font-bold text-lg">{author}</span>
        <span className="ml-2 text-gray-500">@{author}</span>
        <span className="mx-2">&middot;</span>
        <span className="text-gray-500">1h</span>
      </div>
      <p className="mt-2">{content}</p>
      <img
        className="my-4 w-1/2"
        src="https://cdn1.picuki.com/hosted-by-instagram/q/0exhNuNYnjBcaS3SYdxKjf8fx+9wWgxSZ60STLepjSVmIR1vLHOapZA0mpCj4yRwKwVlASuRYz5h7Y0iVl1UCD1yPEfaSbKPSD9R6aubVe7N1zxi8ZVjlL40Kn0eZ3as8MElVwmYdSgIGaYDG7uo+qhT5aGuO1lQpTaEW+oR9z5G7NCnV6xhz580r7uemhqousoyIDND%7C%7CHg1JU46o9CUqTUHGsv+MfF3pLUqF+dbzPgL6NDhkyblH2YELjxcPGC1j6bgp7c8oHL9XHM9%7C%7C2z6ZpkEGR1OpHealjcQ9I8titj1edgr1vZl4fDobWAlZ3Y58EJcprurlgLcey2T3E4E0WSLxKqGc9xy88DUBt+1Ddzh5BXneb7cA%7C%7C1DWCdZVK3wcHmIdrOJCctmhYJLQaxIhAng9Q==.jpeg"
        alt="Sample Picture"
      />
      <content className="flex items-center">
        Hello there
        </content>
    <LikeButton onClick={onLike} />
    <CommentButton onClick={onComment} />
      </div>
    </div>
);

Tweet.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  onLike: PropTypes.func.isRequired,
  onComment: PropTypes.func.isRequired,
};

export default Tweet;
