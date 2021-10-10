from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseServerError
from django.views.decorators.csrf import csrf_exempt
from .models import User
import json
from django.utils import timezone

@csrf_exempt
def signup(request):
    try:
        if request.method == "POST":
            body = json.loads(request.body)
            email = body["email"]
            password = body["password"]

            is_user = User.objects.filter(email=email).exists()

            if is_user:
                data = {"status": "error", "message": "user already exists"}
                return HttpResponseBadRequest(json.dumps(data), content_type="application/json")
            else:
                user = User(email=email, password=password, created_at=timezone.now())
                user.save()
                data = {"status": "success", "message": "user signed up"}
                return HttpResponse(json.dumps(data), content_type="application/json")
    except Exception:
        data = {"status": "error", "message": "internal server error"}
        return HttpResponseServerError(json.dumps(data), content_type="application/json")
