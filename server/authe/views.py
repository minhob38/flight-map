from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseServerError
from django.views.decorators.csrf import csrf_exempt
import jwt
from .models import User
import json
from django.utils import timezone
import os
import bcrypt

@csrf_exempt
def signup(request):
    try:
        print("FFF")
        if request.method == "POST":
            body = json.loads(request.body)
            email = body["email"]
            password = body["password"]

            is_user = User.objects.filter(email=email).exists()

            if is_user:
                data = {"status": "error", "message": "user already exists"}
                return HttpResponseBadRequest(json.dumps(data), content_type="application/json")
            else:
                salt = bcrypt.gensalt()
                hash = bcrypt.hashpw(password.encode('utf-8'), salt)
                user = User(email=email, password=hash, created_at=timezone.now())
                user.save()
                data = {"status": "success", "message": "user signed up"}
                JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
                return HttpResponse(json.dumps(data), content_type="application/json")
    except Exception as e:
        data = {"status": "error", "message": str(e)}
        return HttpResponseServerError(json.dumps(data), content_type="application/json")

# 임시 라우터 (file upload)
@csrf_exempt
def upload(request):
    if request.method == "POST":
        # body = json.loads(request.body)
        print(request.body)

    return HttpResponse("hello", content_type="text/plain")
