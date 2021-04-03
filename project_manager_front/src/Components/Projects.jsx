import React, { useState } from 'react';
import CSRFToken from './csrftoken';
import Cookies from 'js-cookie';

// Get the csrf_token so that post can be made 
const csrftoken = Cookies.get('csrftoken');

// Login function that post to create_project url and return a message from the backend
async function create_project(name, description, category) {
    return fetch('/create_project', {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({
          name: name,
          description: description,
          category: category
        })
      })
      .then(response => response.json());
}

export default function Projects(props){

    const [projectForm, setProjectForm] = useState(false);
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();

    // Calls the create_project function and set projectId and page to render the page of the new project
    const handleCreateProject = async e => {
        e.preventDefault();
        const data = await create_project(name, description, category);
        setProjectForm(false);
        console.log(data.message);
        console.log(data.id);
        props.setProjectId(data.id);
        props.setPage('project');
    }

    return (
        <div>
            <h1>Projects</h1>
            <br/>
            <div className="row container">
                <h5>Select a Category</h5>
                <div className="col-md-3 d-grid gap-2 mb-2">
                    <button className="btn btn-outline-primary" onClick={() => {
                        props.setCategoryFilter('all');
                    }}>All</button>
                </div>
                {props.categories.map(category => (
                    <div key={category} className="col-md-3 d-grid gap-2 mb-2">
                        <button className="btn btn-outline-primary" onClick={() => {
                            props.setCategoryFilter(category);
                        }}>{category}</button>
                    </div>
                ))}
            </div>
            <br/>
            <div className="row">
                {/* Map all the projects from this user and render them */}
                {props.projects.map(project => (
                    <div key={project.id} id={project.id} className="col-lg-3 col-md-4">
                        <div className="d-grid gap-2">
                            <button className="btn" onClick={() => {
                                    props.setPage('project');
                                    props.setProjectId(project.id);
                                }}>
                                <div className="card-body shadow p-4 bg-white rounded">
                                    <h5 className="card-title">{project.name}</h5>
                                    <p className="card-text">{project.description}</p>
                                    <p className="card-text fw-light">Category: {project.category}</p>
                                    <p className="fw-light fst-italic">{project.creation_date}</p>
                                </div>
                            </button>
                        </div>
                        <br/>
                    </div>
                ))}
                <div className="col-md-3">
                    {/* Ask if it is needed to render a button to display the form or to render the form to add a project */}
                    {projectForm ?
                        /* Render form to add project */
                        <div className="card-body shadow p-4 bg-light rounded">
                            <form onSubmit={handleCreateProject}>
                                <CSRFToken />
                                <input type="text" className="form-control" placeholder="Name" required onChange={e => setName(e.target.value)}/>
                                <br/>
                                <textarea rows="5" className="form-control" placeholder="Description" required onChange={e => setDescription(e.target.value)}></textarea>
                                <br/>
                                <input type="text" className="form-control" placeholder="Category" required onChange={e => setCategory(e.target.value)}/>
                                <br/>
                                <div className="d-grid gap-2">
                                    <input type="submit" className="btn btn-outline-primary" value="Create Project"/>
                                </div>
                            </form>
                        </div>
                        :
                        /* Render button to display form */
                        <div className="d-grid gap-2">
                            <button className="btn" onClick={() => setProjectForm(true)}>
                                <div className="card-body shadow-sm p-4 bg-light rounded d-flex">
                                    <p className="fs-1 m-3">+</p>
                                    <p className="fs-5 m-3">Click here to add a new project!</p>
                                </div>
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}