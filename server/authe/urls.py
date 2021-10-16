from django.urls import path
from . import views

urlpatterns = [path("signup/", views.signup)]
urlpatterns = [path("upload/", views.upload)] # 임시 file upload용, router
