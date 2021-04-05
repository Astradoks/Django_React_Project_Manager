import json
import datetime
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt

from .models import Column, Project, Task, User

# Create your views here.
#@csrf_exempt
@ensure_csrf_cookie
def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return JsonResponse({
                "message": 'LoggedIn'
            })
        else:
            return JsonResponse({
                "message": 'Invalid username or password'
            })
    else:
        return JsonResponse({
            "error": "Post needed"
        })


def logout_view(request):
    logout(request)
    return JsonResponse({
        "message": 'You are logged out'
    })


#@csrf_exempt
@ensure_csrf_cookie
def register(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')

        # Ensure password matches confirmation
        password = data.get('password')
        confirmation = data.get('confirmation')
        if password != confirmation:
            return JsonResponse({
                "message": 'Password must match'
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return JsonResponse({
                "message": 'Username already taken'
            })
        return JsonResponse({
            "message": 'UserCreated'
        })
    else:
        return JsonResponse({
            "error": "Post needed"
        })


# Return all projects from the user that is logged in
def projects(request, category):
    if category == 'all':
        projects = request.user.projects.all()
    else:
        projects = request.user.projects.filter(category=category)
    return JsonResponse([project.serialize() for project in projects], safe=False)


# Create a project for the user that is logged in
#@csrf_exempt
@ensure_csrf_cookie
def create_project(request):

    # Ensure user is logged in
    if request.user.is_authenticated:

        # Ensure the method is POST
        if request.method == 'POST':

            # Get all data
            data = json.loads(request.body)
            user = request.user
            name = data.get('name')
            description = data.get('description')
            category = data.get('category')

            # Try to create a new project
            try:
                project = Project(user = user, name = name, description = description, category = category)
                project.save()
            except:
                return JsonResponse({
                    "error": "There was an error in project creation"
                })
            return JsonResponse({
                "message": "ProjectCreated",
                "id": project.id
            })
        else:
            return JsonResponse({
                "error": "Post needed"
            })
    else:
        return JsonResponse({
            "error": "Login needed"
        })


# Get project information with all columns and tasks
def project(request, id):

    # Ensure user is logged in
    if request.user.is_authenticated:
        project = Project.objects.get(id=id)
        return JsonResponse({
            "project": project.serialize(),
            "columns": [p.serialize() for p in project.columns.all()]
        })
    else:
        return JsonResponse({
            "error": "Login needed"
        })


# Create a new column in a project
#@csrf_exempt
@ensure_csrf_cookie
def create_column(request):

    # Ensure user is logged in
    if request.user.is_authenticated:

        # Ensure the method is POST
        if request.method == 'POST':

            # Get all data
            data = json.loads(request.body)
            project_id = data.get('project_id')
            project = Project.objects.get(id=project_id)
            name = data.get('name')

            # Try to create a new column in that project
            try:
                column = Column(project=project, name=name)
                column.save()
            except:
                return JsonResponse({
                    "error": "There was an error in column creation"
                })
            return JsonResponse({
                "message": "ColumnCreated"
            })
        else:
            return JsonResponse({
                "error": "Post needed"
            })
    else:
        return JsonResponse({
            "error": "Login needed"
        })


# Create new task in a column
#@csrf_exempt
@ensure_csrf_cookie
def create_task(request):

    # Ensure user is logged in
    if request.user.is_authenticated:

        # Ensure the method is POST
        if request.method == 'POST':

            # Get all data
            data = json.loads(request.body)
            column_id = data.get('column_id')
            column = Column.objects.get(id=column_id)
            name = data.get('name')
            description = data.get('description')
            color = data.get('color')

            # Try to create a new task in that column
            try:
                task = Task(column=column, name=name, description=description, color=color)
                task.save()
            except:
                return JsonResponse({
                    "error": "There was an error in task creation"
                })
            return JsonResponse({
                "message": "TaskCreated"
            })
        else:
            return JsonResponse({
                "error": "Post needed"
            })
    else:
        return JsonResponse({
            "error": "Login needed"
        })


# Change task to another column
#@csrf_exempt
@ensure_csrf_cookie
def change_task_column(request):

    # Ensure user is logged in
    if request.user.is_authenticated:

        # Ensure the method is PUT
        if request.method == 'PUT':

            # Get all data
            data = json.loads(request.body)
            column_id = data.get('column_id')
            column = Column.objects.get(id=column_id)
            task_id = data.get('task_id')
            task = Task.objects.get(id=task_id)

            # Try to change task to another column
            try:
                task.column = column
                task.save()
            except:
                return JsonResponse({
                    "error": "There was an error changing this task to another column"
                })
            return JsonResponse({
                "message": "TaskChanged"
            })
        else:
            return JsonResponse({
                "error": "Put needed"
            })
    else:
        return JsonResponse({
            "error": "Login needed"
        })


# Edit Task
#@csrf_exempt
@ensure_csrf_cookie
def edit_task(request):

    # Ensure user is logged in
    if request.user.is_authenticated:

        # Ensure the method is PUT
        if request.method == 'PUT':

            # Get all data
            data = json.loads(request.body)
            task_id = data.get('task_id')
            task = Task.objects.get(id=task_id)
            new_name = data.get('new_name')
            new_description = data.get('new_description')
            new_color = data.get('new_color')

            # Try to edit task
            try:
                task.name = new_name
                task.description = new_description
                task.color = new_color
                task.save()
            except:
                return JsonResponse({
                    "error": "There was an error editing this task"
                })
            return JsonResponse({
                "message": "TaskEdited"
            })
        else:
            return JsonResponse({
                "error": "Put needed"
            })
    else:
        return JsonResponse({
            "error": "Login needed"
        })


# Delete Task
#@csrf_exempt
@ensure_csrf_cookie
def delete_task(request):

    # Ensure user is logged in
    if request.user.is_authenticated:

        # Ensure the method is DELETE
        if request.method == 'DELETE':

            # Get all data
            data = json.loads(request.body)
            task_id = data.get('task_id')
            task = Task.objects.get(id=task_id)

            # Try to delete task
            try:
                task.delete()
            except:
                return JsonResponse({
                    "error": "There was an error deleting this task"
                })
            return JsonResponse({
                "message": "TaskDeleted"
            })
        else:
            return JsonResponse({
                "error": "Delete needed"
            })
    else:
        return JsonResponse({
            "error": "Login needed"
        })


# Edit Column
#@csrf_exempt
@ensure_csrf_cookie
def edit_column(request):

    # Ensure user is logged in
    if request.user.is_authenticated:

        # Ensure the method is PUT
        if request.method == 'PUT':

            # Get all data
            data = json.loads(request.body)
            column_id = data.get('column_id')
            column = Column.objects.get(id=column_id)
            new_name = data.get('new_name')

            # Try to edit column
            try:
                column.name = new_name
                column.save()
            except:
                return JsonResponse({
                    "error": "There was an error editing this column"
                })
            return JsonResponse({
                "message": "ColumnEdited"
            })
        else:
            return JsonResponse({
                "error": "Put needed"
            })
    else:
        return JsonResponse({
            "error": "Login needed"
        })


# Delete Column
#@csrf_exempt
@ensure_csrf_cookie
def delete_column(request):

    # Ensure user is logged in
    if request.user.is_authenticated:

        # Ensure the method is DELETE
        if request.method == 'DELETE':

            # Get all data
            data = json.loads(request.body)
            column_id = data.get('column_id')
            column = Column.objects.get(id=column_id)

            # Try to delete column
            try:
                column.delete()
            except:
                return JsonResponse({
                    "error": "There was an error deleting this column"
                })
            return JsonResponse({
                "message": "ColumnDeleted"
            })
        else:
            return JsonResponse({
                "error": "Delete needed"
            })
    else:
        return JsonResponse({
            "error": "Login needed"
        })


# Edit Project
#@csrf_exempt
@ensure_csrf_cookie
def edit_project(request):

    # Ensure user is logged in
    if request.user.is_authenticated:

        # Ensure the method is PUT
        if request.method == 'PUT':

            # Get all data
            data = json.loads(request.body)
            project_id = data.get('project_id')
            project = Project.objects.get(id=project_id)
            new_name = data.get('new_name')
            new_category = data.get('new_category')
            new_description = data.get('new_description')

            # Try to edit project
            try:
                project.name = new_name
                project.category = new_category
                project.description = new_description
                project.save()
            except:
                return JsonResponse({
                    "error": "There was an error editing this project"
                })
            return JsonResponse({
                "message": "ProjectEdited"
            })
        else:
            return JsonResponse({
                "error": "Put needed"
            })
    else:
        return JsonResponse({
            "error": "Login needed"
        })


# Delete Project
#@csrf_exempt
@ensure_csrf_cookie
def delete_project(request):

    # Ensure user is logged in
    if request.user.is_authenticated:

        # Ensure the method is DELETE
        if request.method == 'DELETE':

            # Get all data
            data = json.loads(request.body)
            project_id = data.get('project_id')
            project = Project.objects.get(id=project_id)

            # Try to delete project
            try:
                project.delete()
            except:
                return JsonResponse({
                    "error": "There was an error deleting this project"
                })
            return JsonResponse({
                "message": "ProjectDeleted"
            })
        else:
            return JsonResponse({
                "error": "Delete needed"
            })
    else:
        return JsonResponse({
            "error": "Login needed"
        })