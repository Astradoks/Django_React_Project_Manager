import React from 'react';
import Login from './Login';
import Register from './Register';
import Projects from './Projects';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default function ProjectManager() {

  if (!sessionStorage.getItem('loggedUser')) {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route exact path="/">
            <Projects />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}