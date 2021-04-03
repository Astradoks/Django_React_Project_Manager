from django.urls import path
from . import views

urlpatterns = [
    # User routes
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    
    # Get routes
    path("projects/<str:category>", views.projects, name="projects"),
    path("project/<int:id>", views.project, name="project"),

    # Create routes
    path("create_project", views.create_project, name="create_project"),
    path("create_column", views.create_column, name="create_column"),
    path("create_task", views.create_task, name="create_task"),

    # Edit routes
    path("change_task_column", views.change_task_column, name="change_task_column"),
    path("edit_task", views.edit_task, name="edit_task"),
    path("edit_column", views.edit_column, name="edit_column"),
    path("edit_project", views.edit_project, name="edit_project"),

    # Delete routes
    path("delete_task", views.delete_task, name="delete_task"),
    path("delete_column", views.delete_column, name="delete_column"),
    path("delete_project", views.delete_project, name="delete_project")
]