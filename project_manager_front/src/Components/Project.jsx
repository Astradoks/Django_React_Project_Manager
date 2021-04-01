import React, { useState, useEffect } from 'react';
import CSRFToken from './csrftoken';
import Cookies from 'js-cookie';

const csrftoken = Cookies.get('csrftoken');

// Fetch create column
async function create_column(name, id) {
    return fetch('/create_column', {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({
            name: name,
            project_id: id
        })
      })
      .then(response => response.json());
}

// Fetch create task
async function create_task(column_id, name, description, color) {
    return fetch('/create_task', {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({
            column_id: column_id,
            name: name,
            description: description,
            color: color
        })
      })
      .then(response => response.json());
}

// Fetch change task to another column
async function change_task_column(column_id, task_id) {
    return fetch('/change_task_column', {
        method: 'PUT',
        headers: {
          'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({
            column_id: column_id,
            task_id: task_id
        })
      })
      .then(response => response.json());
}

export default function Project(props){

    // Display project information
    const [projectName, setProjectName] = useState();
    const [projectDescription, setProjectDescription] = useState();
    const [projectColumns, setProjectColumns] = useState([]);
    // Render form, render number of columns, and create a new column
    const [addColumn, setAddColumn] = useState(true);
    const [columnNum, setColumnNum] = useState(3);
    const [columnForm, setColumnForm] = useState(false);
    const [columnName, setColumnName] = useState();
    // Render form and create a new task
    const [taskForm, setTaskForm] = useState(false);
    const [taskColumn, setTaskColumn] = useState();
    const [taskName, setTaskName] = useState();
    const [taskDescription, setTaskDescription] = useState();
    const [taskColor, setTaskColor] = useState();
    // Change task to another column
    const [newColumnTask, setNewColumnTask] = useState();
    const [taskId, setTaskId] = useState();
    // Render task change form
    const [changeTaskColumnForm, setChangeTaskColumnForm] = useState();

    // Needed to get all projects
    useEffect(() => {
        fetchProject();
    }, [])

    const fetchProject = async () => {
        const id = props.id;
        const response = await fetch(`/project/${id}`);
        const data = await response.json();
        console.log(data);
        setProjectName(data.project.name);
        setProjectDescription(data.project.description);
        setProjectColumns(data.columns);
        // Change layout depending on number of columns
        // Max number of columns accepted is 6
        if (data.columns.length <= 3) {
            setColumnNum(3);
            setAddColumn(true);
        } else if (data.columns.length === 4 || data.columns.length === 5 ) {
            setColumnNum(2);
            setAddColumn(true);
        } else {
            setColumnNum(2);
            setAddColumn(false);
        }
    }

    // Create a new column in this project
    const handleCreateColumn = async e => {
        e.preventDefault();
        const data = await create_column(columnName, props.id);
        console.log(data);
        setColumnForm(false);
        props.setPage('projects');
        props.setPage('project');
    }

    // Create a new column in this project
    const handleCreateTask = async e => {
        e.preventDefault();
        const data = await create_task(taskColumn, taskName, taskDescription, taskColor);
        console.log(data);
        setTaskForm(false);
        props.setPage('projects');
        props.setPage('project');
    }

    // Display form to create task in the correct column
    function displayTaskForm(column_id) {
        setTaskColumn(column_id);
        setTaskForm(true);
    }

    // Change task to another column
    const handleChangeTask = async e => {
        e.preventDefault();
        const data = await change_task_column(newColumnTask, taskId);
        console.log(data);
        props.setPage('projects');
        props.setPage('project');
    }

    return (
        <div>
            <h1>{projectName}</h1>
            <p className="fs-4 m-3">{projectDescription}</p>
            <div className="row">
                {/* Map all the columns from the project and render them */}
                {projectColumns.map(column => (
                    <div key={column.id} id={column.id} className={`col-lg-${columnNum}`} onMouseLeave={() => setChangeTaskColumnForm('')}>
                        <div className="card-body shadow p-4 bg-white rounded">
                            <h5 className="card-title">{column.name}</h5>
                            <br/>
                            {/* Map all tasks in this column and render them */}
                            {column.tasks.map(task => (
                                <div key={task.id} id={task.id} className={`card border-${task.color} card-body mb-3`} onMouseEnter={() => setChangeTaskColumnForm(task.id)} >
                                    <h6 className="card-title">{task.name}</h6>
                                    <p className="card-text fw-light">{task.description}</p>
                                    <p className="fw-light fst-italic">{task.creation_date}</p>
                                    {/* Show change task to another column form */}
                                    { changeTaskColumnForm === task.id && 
                                        <form onSubmit={handleChangeTask}>
                                            <CSRFToken />
                                            <div className="row">
                                                {/* Map all column names to show buttons */}
                                                {projectColumns.map(col => (
                                                    // Only show buttons that move task to other columns
                                                    column.id !== col.id &&
                                                        <div className="col-auto mb-2">
                                                            <div className="d-grid gap-2">
                                                                <button type="submit" className="btn btn-outline-primary" onClick={() => {
                                                                    setNewColumnTask(col.id);
                                                                    setTaskId(task.id);
                                                                }}>{col.name}</button>
                                                            </div>
                                                        </div>
                                                ))}
                                            </div>
                                        </form>
                                    }
                                </div>
                            ))}
                            {/* Ask if it is needed to render a button to display the form or to render the form to add a task */}
                            {taskForm && taskColumn === column.id ?
                                /* Render form to add task */
                                <div className="card-body shadow p-4 bg-light rounded">
                                    <form onSubmit={handleCreateTask}>
                                        <CSRFToken />
                                        <input type="text" className="form-control" placeholder="Name" required onChange={e => setTaskName(e.target.value)}/>
                                        <br/>
                                        <textarea rows="5" className="form-control" placeholder="Description" required onChange={e => setTaskDescription(e.target.value)}></textarea>
                                        <br/>
                                        <select className="form-select" required onChange={e => setTaskColor(e.target.value)}>
                                            <option>Select a color</option>
                                            <option value="primary" className="bg-primary text-white">Blue</option>
                                            <option value="secondary" className="bg-secondary text-white">Grey</option>
                                            <option value="success" className="bg-success text-white">Green</option>
                                            <option value="danger" className="bg-danger text-white">Red</option>
                                            <option value="warning" className="bg-warning text-white">Yellow</option>
                                            <option value="info" className="bg-info text-white">Sky Blue</option>
                                            <option value="light" className="bg-light">Light Grey</option>
                                            <option value="dark" className="bg-dark text-white">Black</option>
                                        </select>
                                        <br/>
                                        <div className="d-grid gap-2">
                                            <input type="submit" className="btn btn-outline-primary" value="Create Task" />
                                        </div>
                                    </form>
                                </div>
                                :
                                /* Render button to display the form */
                                <div className="d-grid gap-2">
                                    <button className="btn" onClick={() => displayTaskForm(column.id)}>
                                        <div className="card-body shadow-sm p-4 bg-light rounded text-center">
                                            <p className="fs-6 m-1">Add new Task</p>
                                        </div>
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                ))}
                {/* Ask if a column can be added */}
                {addColumn &&
                    <div className={`col-lg-${columnNum}`}>
                        {/* Ask if it is needed to render a button to display the form or to render the form to add a column */}
                        {columnForm ?
                            /* Render form to add column */
                            <div className="card-body shadow p-4 bg-light rounded">
                                <form onSubmit={handleCreateColumn}>
                                    <CSRFToken />
                                    <input type="text" className="form-control" placeholder="Name" required onChange={e => setColumnName(e.target.value)}/>
                                    <br/>
                                    <div className="d-grid gap-2">
                                        <input type="submit" className="btn btn-outline-primary" value="Create Column"/>
                                    </div>
                                </form>
                            </div>
                            :
                            /* Render button to display form */
                            <div className="d-grid gap-2">
                                <button className="btn" onClick={() => setColumnForm(true)}>
                                    <div className="card-body shadow-sm p-4 bg-light rounded d-flex">
                                        <p className="fs-1 m-3">+</p>
                                        <p className="fs-5 m-3">Add new Column</p>
                                    </div>
                                </button>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}