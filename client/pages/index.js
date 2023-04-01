import React from 'react';
import ReactDOM from 'react-dom'; 
import { BrowserRouter, Route, Link } from 'react-router-dom';

import LeftPane from '../components/leftPane/leftPane';
import RightPane from '../components/rightPane/rightPane';
import Home from '../components/home/home';

class App extends React.Component {
  render() {
    return (
<<<<<<< HEAD
      
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <LeftPane />
          <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
=======
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <LeftPane />
          </div>
          <div className="col-md-4">
>>>>>>> parent of d8e3213 (Home UI)
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