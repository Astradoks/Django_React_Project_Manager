import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";

async function logout() {
    fetch('/logout')
    .then(response => response.json());
}

export default function Projects(){

    const [username, setUsername] = useState(sessionStorage.getItem("loggedUser"));

    const logoutHandler = async () => {
        await logout();
        sessionStorage.removeItem("loggedUser");
        setUsername('');
        return <Redirect to="/login" />
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <Link className="navbar-brand" to="/">{username}</Link>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/login" onClick={logoutHandler}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container">
                <br/>
                <h1>Projects</h1>
            </div>
        </div>
    )
}