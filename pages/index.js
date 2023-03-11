import React from 'react';
import ReactDOM from 'react-dom';

import LeftPane from '../components/leftPane/leftPane';
import RightPane from '../components/rightPane/rightPane';
import Home from '../components/home/home';

class App extends React.Component {
  render() {
    return (
      <div className="flex">
        <div className="w-1/5">
          <LeftPane />
        </div>
        <div className="w-3/5">
          <Home />
        </div>
        <div className="w-1/5">
          <RightPane />
        </div>
      </div>
    );
  }
}


export default App;