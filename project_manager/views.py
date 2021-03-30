import json
import datetime
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie

from .models import Column, Project, Task, User

# Create your views here.

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
def projects(request):
    projects = request.user.projects.all()
    return JsonResponse([project.serialize() for project in projects], safe=False)


# Create a project for the user that is logged in
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