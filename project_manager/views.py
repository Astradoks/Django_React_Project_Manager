import json
import datetime
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import ensure_csrf_cookie

from django.contrib.auth.models import User

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
                "message": 'LoggedIn',
                "username": username
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