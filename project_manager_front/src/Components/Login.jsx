import React, { useState } from 'react';
import CSRFToken from './csrftoken';
import Cookies from 'js-cookie';
import { Link, Redirect } from "react-router-dom";

// Get the csrf_token so that post can be made 
const csrftoken = Cookies.get('csrftoken');

// Login function that post to login url and return a message from the backend
async function login(username, password) {
  return fetch('/login', {
    method: 'POST',
    headers: {
      'X-CSRFToken': csrftoken
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
  .then(response => response.json())
}

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState('');

  // Calls the login function and set the message from the backend
  const handleSubmit = async e => {
      e.preventDefault();
      const data = await login(username, password);
      setMessage(data.message);
  }

  // Depending of the message redirect to index or stay in login
  if (message === "LoggedIn"){
    sessionStorage.setItem('loggedUser', username);
    window.location.reload();
    return <Redirect to="/" />
  }

  return(
    <div className="container text-center">
      <br/>
      <h1>Log In</h1>
      <br/><br/>
      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-12 shadow p-3 bg-white rounded">
          { message !== '' &&
            <div className="alert alert-danger">
                <strong>{message}</strong>
            </div>
          }
          <form onSubmit={handleSubmit}>
            <CSRFToken />
            <input type="text" className="form-control" placeholder="Username" required onChange={e => setUsername(e.target.value)}/>
            <br/>
            <input type="password" className="form-control" placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
            <br/>
            <div>
              <button type="submit" className="btn btn-outline-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
      <br/><br/>
      Don't have an account? <Link to="/register">Register here.</Link>
    </div>
  )
}