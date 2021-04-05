# Django_React_Project_Manager
 Project manager created with Django and React JS

## Description
This is a web page created with Django to the backend and React js to the frontend of the project. The purpose of this project is to manage all the projects that each user has. You can login and create all the projects you want. Then you can click on each project and this web will display all the project information and the possibility to create columns to organice all the task of this project. And on each column it is possible to create all the tasks that are needed to that project. Also, in each task it is possible to move it to another column in the same project.

## Prerequisites
To start this project it is necessary to have Python, Django and Node installed.
After cloning this project you need to excecute the following commands in the main directory to create the database:
* `python3 manage.py makemigrations`
* `python3 manage.py migrate`

After this, you have to excecute the next command in the same directory to start Django server:
* `python3 manage.py runserver`

Then it is needed to install all the dependencies of the react project. To do this you need to excecute the following command in the project_manager_front directory:
* `npm i`

After all the dependencies have been installed you have to excecute the following command to start the React server:
* `npm start`

## Requirements
* **Backend, Frontend, and Models**
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
