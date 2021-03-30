import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import Projects from "./Projects";
import Project from "./Project";
import Home from "./Home";

export default function Index(){

    const [username, setUsername] = useState(sessionStorage.getItem('loggedUser'));
    const [projects, setProjects] = useState([]);
    const [page, setPage] = useState();
    const [projectId, setProjectId] = useState();

    // Function to logout the user and remove the item from session storage so that the projectManager component knows if the user has logged out
    async function logout() {
        await fetch('/logout');
        sessionStorage.removeItem("loggedUser");
        window.location.reload();
        setUsername('');
        return <Redirect to="/login" />
    }

    // Function to get all projects and set them in projects const, also set page in projects so projects can be rendered
    async function get_projects() {
        const response = await fetch('/projects');
        const data = await response.json();
        setProjects(data);
        setPage('projects');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">{username}</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/" onClick={() => {setPage('home')}}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/" onClick={() => get_projects()}>Projects</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/login" onClick={() => logout()}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container">
                <br/>
                {/* Switch to render different pages depending on the state */}
                {(() => {
                    switch (page) {
                    case "home":     return <Home />;
                    case "projects": return <Projects projects={projects} setPage={setPage} setProjectId={setProjectId} />;
                    case "project" : return <Project id={projectId} setPage={setPage}/>
                    default:         return <Home />;
                    }
                })()}
            </div>
        </div>
    )
}