from django.urls import path
from . import views

urlpatterns = [
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("projects", views.projects, name="projects"),
    path("create_project", views.create_project, name="create_project"),
    path("project/<int:id>", views.project, name="project"),
    path("create_column", views.create_column, name="create_column"),
    path("create_task", views.create_task, name="create_task")
]