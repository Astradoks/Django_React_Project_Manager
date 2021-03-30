from project_manager.models import Column, Project, Task, User
from django.contrib import admin

class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "email")

class ProjectAdmin(admin.ModelAdmin):
    list_display = ("user", "name", "category", "creation_date")

class ColumnAdmin(admin.ModelAdmin):
    list_display = ("project", "name")

class TaskAdmin(admin.ModelAdmin):
    list_display = ("column", "name", "color", "creation_date")

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Column, ColumnAdmin)
admin.site.register(Task, TaskAdmin)