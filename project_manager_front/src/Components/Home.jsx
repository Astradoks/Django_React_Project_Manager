import React from 'react';

export default function Projects(props){
    return (
        <div>
            <h1>The Best Project Manager</h1>
            <div className="m-5">
                <p className="fs-3">Welcome {sessionStorage.getItem('loggedUser')}!</p>
                <p className="fs-3">To see all your projects click Projects in the navigation bar</p>
            </div>
            <div className="row">
                <div className="col-md-7 col-sm-12 shadow-lg p-3 bg-white rounded-pill">
                    <img className="img-fluid rounded-pill" src="https://sleekbundle.com/wp-content/uploads/2020/01/18-Site-under-construction-1250x835.png" alt="project_managment"/>
                </div>
                <div className="col-md-5 col-sm-12 d-flex align-items-center justify-content-center">
                    <p className="m-5 fs-4">You can manage all your projects here! From the beginning</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5 col-sm-12 d-flex align-items-center justify-content-center">
                    <p className="m-5 fs-4">To the end!</p>
                </div>
                <div className="col-md-7 col-sm-12 shadow-lg p-3 bg-white rounded-pill">
                    <img className="img-fluid rounded-pill" src="https://sleekbundle.com/wp-content/uploads/2020/01/12-Devices-1250x835.png" alt="project_managment"/>
                </div>
            </div>
            <br/>
        </div>
    )
}