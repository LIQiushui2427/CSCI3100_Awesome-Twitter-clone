import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import LeftPane from '../components/leftPane/leftPane';
import RightPane from '../components/rightPane/rightPane';
import TweetContent from '../components/tweetContent/tweetContent';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="grid grid-cols-4">
          <div>
            <LeftPane />
          </div>
          <div className="col-span-2">
            <TweetContent />
          </div>
          <div>
            <RightPane />
          </div>
        </div>
      </div>
    );
  }
}

export default App;