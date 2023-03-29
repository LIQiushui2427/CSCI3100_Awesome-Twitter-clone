import React ,{Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


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

class Tweet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweet: ''
    };
  }

  postTweet = () => {
    const { author, content, picture } = this.props;
    axios.post('/api/tweets', { author, content, picture })
      .then((response) => {
        console.log('Tweet posted:', response.data);
        this.setState({ tweet: response.data });
      })
      .catch((error) => {
        console.error('Error posting tweet:', error);
      });
  };

  render() {
    const { author, content, picture, onLike, onComment } = this.props;
    const { tweet } = this.state;

    return (
      <div className="flex  w-1/4 items-start p-4">
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Test" />
        <div className="ml-4">
          <div className="flex items-center">
            <span className="font-bold text-lg">{author}</span>
            <span className="ml-2 text-gray-500">@{author}</span>
            <span className="mx-2">&middot;</span>
            <span className="text-gray-500">1h</span>
          </div>
          <p className="mt-4">{content}</p>
          <div className="mt-4">
            <img
              className="h-40 w-full object-cover rounded-lg"
              src={picture}
              alt="Test"
            />
          </div>
          <LikeButton onClick={onLike} />
          <CommentButton onClick={onComment} />
          <button onClick={this.postTweet}>Post Tweet</button>
          {tweet && <p>Tweet posted: {tweet}</p>}
        </div>
      </div>
    );
  }
}

Tweet.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  onLike: PropTypes.func.isRequired,
  onComment: PropTypes.func.isRequired,
};

Tweet.defaultProps = {
  author: 'Test',
  picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbDFi9koI1_dNL4G-ln4LJgP4RXx6jgERift0PWrSr4w&usqp=CAU&ec=48665701://via.placeholder.com/150', // or any other default image URL
  content: 'Hello world',
  onLike: () => {},
  onComment: () => {},
};

export default Tweet;
