from django.urls import path
from . import views

urlpatterns = [path("domestic_companies/", views.domestic_companies)]
