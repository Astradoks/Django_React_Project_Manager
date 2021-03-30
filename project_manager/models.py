from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class User(AbstractUser):
    pass

class Project(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="projects")
    name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=255)
    creation_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def serialize(self):
        return {
            "id": self.id,
            "user": self.user.username,
            "name": self.name,
            "description": self.description,
            "category": self.category,
            "creation_date": self.creation_date.strftime("%b %d %Y, %I:%M %p")
        }

class Column(models.Model):
    project = models.ForeignKey("Project", on_delete=models.CASCADE, related_name="columns")
    name = models.CharField(max_length=255)

    def __str__(self):
        return f'Project: {self.project}: {self.name}'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "tasks": [{"id": t.id, "name": t.name,  "description": t.description, "color": t.color, "creation_date": t.creation_date.strftime("%b %d %Y, %I:%M %p")} for t in self.tasks.all()]
        }

class Task(models.Model):
    column = models.ForeignKey("Column", on_delete=models.CASCADE, related_name="tasks")
    name = models.CharField(max_length=255)
    description = models.TextField()
    color = models.CharField(max_length=50)
    creation_date = models.DateTimeField(auto_now_add=True)
