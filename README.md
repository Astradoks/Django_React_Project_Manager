# Django_React_Project_Manager
 **Final Project of Course CS50’s Web Programming with Python and JavaScript**

 Project manager created with Django and React JS

## Description
This is a web page created with Django to the back-end and React js to the front-end of the project. The purpose of this project is to manage all the projects that each user has. You can login and create all the projects you want. Then you can click on each project and this web will display all the project information and the possibility to create columns to organize all the task of this project. And on each column it is possible to create all the tasks that are needed to that project. Also, in each task it is possible to move it to another column in the same project. Finally, everything can be edited: the project information, the column information and each task information.
#### Why I did it?
I wanted to manage all the tasks that I needed to develop this project so I decided to develop myself a website where I could manage all my projects.
#### Why this project is distinct and more complex than other projects?
This websie is different from all other projects in the course because it has nothing to do with an e-commerce, nor an email, nor a network. This is a website that helps people organize all their projects in columns and tasks. Now, it is more complex than other projects in the course because it has more functionalities which are described in the requirements section. Also, to save all the information needed, three models were created, one for projects, one for columns, and one for tasks. As it was needed to use JavaScript to develop the front-end I used React JS to develop it and use the Django back-end as an API.


## Django
First, it was created a new app called project_manager. Here were created all the models, urls and views.

The models created were:
* Project model which saves a foreign key of a user, a name of the project, a description, a category, and a creation date.
* Column model which saves a foreign key of a project and a name of the column
* Task model which saves a foreign key of a column, a name of the task, a description, a color, and a creation date.
* All these models were added to de Django admin.

The urls created are the following:
* Login and Register:
    * `/login` _Login a user_
    * `/logout` _Logout a user_
    * `/register` _Register a user_

* Get Projects:
    * `/projects/<str:category>` _Get all the projects from that category_
    * `project/<int:id>` _Get a project by id_

* Create:
    * `/create_project` _Creates a project_
    * `/create_column` _Creates a column_
    * `/create_task` _Create a task_

* Edit:
    * `/change_task_column` _Change a task to another column_
    * `/edit_task` _Edit a task information_
    * `/edit_column` _Edit a column name_
    * `/edit_project` _Edit a project information_

* Delete:
    * `/delete_task` _Delete a task_
    * `/delete_column` _Delete a column and all the tasks in that column_
    * `/delete_project` _Delete a project and all the columns in that project_

All the vies created return a Json Response for each url:
* For login and register they return a message if the user is created, or if the user was logged in or if there was any error.
* For get routes the views return the projects from the database in JSON.
* For the create routes each view gets the information as JSON and tries to create the requested object (project, column, or task). If there is an error, the view return an error message as JSON. If there was no problem, it returns a success message as JSON.
* For the edit routes each view gets the information as JSON and tries to edit the requested object (project, column, or task) by an id. If there is an error, the view return an error message as JSON. If there was no problem, it returns a success message as JSON.
* For the delete routes each view gets the information as JSON and tries to delete the requested object (project, column, or task) by an id. If there is an error, the view return an error message as JSON. If there was no problem, it returns a success message as JSON.


## React
First, the react project was created with `npx create-react-app project_manager_front` in the main directory.
In the project_manager_front/src directory was created a Components folder, were are all the components for the website.
* The main component is `ProjectManager.jsx`. It verifies that the user is logged in to render the index or to render only the login or register using React Router.
* The `Login.jsx` component renders the form to login a user.
* The `Register.jsx` component renders the form to register a user.
* The `Index.jsx` component renders a navbar with options to go to home, to projects and to logout. Here it renders different components depending on which link the user clicks on. By default the component that is rendered is `Home.jsx`.
* The `Home.jsx` component renders a welcome message to the user that is logged in and a little information of the website and some ilustrations.
* The `Projects.jsx` component renders all the projects of the logged in user. It also has the option to filter projects by category. Here, each project can be clicked and the user is redirected to the page of that project. Finally, there is a button to create new projects in the same page, by only replacing the button with a form.
* The `Project.jsx` component renders the information of the selected project. It also renders all the columns from that project and all the tasks in each column. Here is where almost all the website works because in this page it is possible to create new columns, create new tasks, edit the project, edit each column, edit each task, and delete the project, delete each column and delete each task. To edit or delete anything it is only needed to hover the thing that the user wants to edit or delete and a form will replace it with all the fields pre-filled with the previus information.
* Finally, the `csrftoken.jsx` component helps to add the CSRF_token to each form so it is called everytime a form is needed.
* It's worth say that every action made here in React fetch the specific url in Django and everything is communictated by JSON, so the front-end send JSON with all the data needed by the back-end to get, create, edit or delete something and return a JSON response.


## Prerequisites
To start this project it is necessary to have Python, Django and Node installed.
Depending on the OS of each computer the following commands change between py, python or python3.
After cloning this project you need to excecute the following commands in the main directory to create the database:
* `python3 manage.py makemigrations`
* `python3 manage.py migrate`

To create a super user to login to the Django admin at `localhost:8000/admin` excecute the following command:
* `python3 manage.py createsuperuser`

After this, you have to excecute the next command in the same directory to start Django server:
* `python3 manage.py runserver`

Then it is needed to install all the dependencies of the react project. To do this you need to excecute the following command in the project_manager_front directory:
* `npm i`

After all the dependencies have been installed you have to excecute the following command to start the React server:
* `npm start`

Finally, go to `localhost:3000` and the project will be working.
If here Django send an error of CSRF cookie not set, it could be a problem of the browser. Try reloading the server and the browser, but if it doesn't work, please uncomment all the `@csrf_exempt` and comment all the `@ensure_csrf_cookie` in views


## Requirements
* **Back-end, Front-end, and Models**
    * All the urls and views should be created in Django to be used as an API.
    * The models should be created in Django and should be able to save all the user information, all the projects, the columns for each project, and the tasks for each column.
    * All the user interfaces should be created using React js.
    * The page should be responsive.
    * All the information should be fetched from Django and used in React.

* **Login and Register**
    * There should be a page to register with four inputs (username, email, password, confirmation).
    * There should be a page to login with two inputs (username, password).
    * After logging in, the user should be redirected to a home page.
    * After registration the user should be redirected to login page.

* **Home Page**
    * This page should only render some information about the web site and should have a navbar.
    * In the navbar there should be displayed the username of the user that is logged in, a link to the home page, a link to see all projects, and a link to logout.

* **Projects Page**
    * This page should display the title of projects, buttons with all the categories created (including a button which display all the projects), and all the projects of the user who is logged in.
    * When a button of a category is clicked, only the projects of that category should be displayed.
    * Each project should be displayed in its own container with it's name, description, category and creation date.
    * When a project is clicked, the user should be redirected to the page of that project.
    * At the end of all projects it should be a button to create a new project.
    * When the button is clicked, in the same page, a form should be displayed there to create a new project. This form should have three inputs (name, description, category).
    * After creating a project, the user should be redirected to the page of that project.

* **Project Page**
    * This page should display the title of the project selected, and it's description.
    * Below that, it should display all the columns created, and at the end a button to create a new column.
    * There should be a limit of 6 columns per project. If the project has 6 columns, the button to create a new column should not be displayed.
    * When the button to create a new column is clicked, it should be displayed a form with only one input: the name of the column. If the user moves the mouse out of the form, the button should be rendered again.
    * After creating a column, the user should not be redirected and the column should appear there.
    * In each column should be displayed all the tasks of that column. At the end of all the tasks there should be a button to create a new task.
    * When the button to create a new task is clicked a form should be displayed. This form should have a select to pick a color for the task, an input to enter the name, and a textarea to enter the description.
    * When the user create a new task it should appear in that column.
    * The user should be able to edit and delete everything of each project.
        * When the user hovers the project name or description, a form should be displayed with an input pre-filled with the name of the project, an input pre-filled with the category of the project, a textarea pre-filled with the project description, an edit button to save the changes, and a checkbox that enable a delete button to delete all the project and all the columns and tasks in it.
        * When the user hovers a column name, a form should be displayed with an input pre-filled with the name of the column, an edit button to save the changes and a checkbox that enable a delete button to delete the column and all the tasks in it.
        * When the user hovers a task, a form should be displayed with an input pre-filled with the name of the task, a textarea pre-filled with the task description, a select to pick a new color for the task, an edit button to save the changes, and a checkbox that enable a delete button to delete the task. Below this form it should appear the date of creation and buttons with the names of the other columns in the project. When the button is clicked, the task should be changed to that new column.