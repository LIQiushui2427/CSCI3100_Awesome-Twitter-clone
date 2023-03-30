import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import LeftPane from '../components/leftPane/leftPane';
import RightPane from '../components/rightPane/rightPane';
import Home from '../components/home/home';
import { getThings } from '@/helper/testService';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <LeftPane />
          </div>
          <div className="col-md-4">
            <Home />
          </div>
          <div className="col-md-8">
            <RightPane />
          </div>
        </div>
      </div>
    );
  }
}

export default App;