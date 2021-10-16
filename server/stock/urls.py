from django.urls import path
from . import views

urlpatterns = [path("korea-companies/", views.korea_companies)]
