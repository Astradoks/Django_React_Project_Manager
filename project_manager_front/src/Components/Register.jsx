import React, { useState } from 'react';
import CSRFToken from './csrftoken';
import Cookies from 'js-cookie';
import { Link, Redirect } from "react-router-dom";

// Get the csrf_token so that post can be made 
const csrftoken = Cookies.get('csrftoken');

// Register function that post to register url and return a message from the backend
async function register(username, email, password, confirmation) {
  return fetch('/register', {
    method: 'POST',
    headers: {
      'X-CSRFToken': csrftoken
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
      confirmation: confirmation
    })
  })
  .then(response => response.json())
}

export default function Register() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmation, setConfirmation] = useState();
  const [message, setMessage] = useState('');

  // Calls the register function and set the message from the backend
  const handleSubmit = async e => {
      e.preventDefault();
      const msg = await register(username, email, password, confirmation);
      setMessage(msg.message);
  }

  // Depending of the message redirect to login or stay in register
  if (message === "UserCreated"){
    return <Redirect to="/login" />
  }

  return(
    <div className="container text-center">
      <br/>
      <h1>Register</h1>
      <br/><br/>
      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-12 shadow p-3 bg-white rounded">
          { message !== '' &&
            <div className="alert alert-info">
                <strong>{message}</strong>
            </div>
          }
          <form onSubmit={handleSubmit}>
            <CSRFToken />
            <input type="text" className="form-control" placeholder="Username" required onChange={e => setUsername(e.target.value)}/>
            <br/>
            <input type="email" className="form-control" placeholder="Email" required onChange={e => setEmail(e.target.value)}/>
            <br/>
            <input type="password" className="form-control" placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
            <br/>
            <input type="password" className="form-control" placeholder="Confirmation" required onChange={e => setConfirmation(e.target.value)}/>
            <br/>
            <div>
              <button type="submit" className="btn btn-outline-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
      <br/><br/>
      Already have an account? <Link to="/login">Log In here.</Link>
    </div>
  )
}