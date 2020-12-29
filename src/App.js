import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

import Home from './pages/Home';
import Create from './pages/Create';
import Login from './pages/Login';
import SinglePost from './pages/SinglePost';

import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
      <h1>App</h1>
      <Router>
        <Nav />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/create" exact component={Create} />
          <Route path="/login" exact component={Login} />
          <Route path="/:id" exact component={SinglePost} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
