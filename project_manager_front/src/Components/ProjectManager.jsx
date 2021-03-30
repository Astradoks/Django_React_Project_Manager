import React from 'react';
import Login from './Login';
import Register from './Register';
import Index from './Index';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default function ProjectManager() {

  // If user is not logged in only login and register are allowed 
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

  // If user is logged in only index is allowed 
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Index />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}