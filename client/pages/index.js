import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import LeftPane from '../components/leftPane/leftPane';
import RightPane from '../components/rightPane/rightPane';
import Home from '../components/home/home';
import App from "./App";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
class App extends React.Component {
  ReactDOM.render() {
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