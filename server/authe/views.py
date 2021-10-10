from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def signup(request):
    if request.method == "POST":
        data = {"message": "success"}
        return HttpResponse(json.dumps(data), content_type="application/json")
