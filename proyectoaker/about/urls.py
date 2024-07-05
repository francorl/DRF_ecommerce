from django.contrib import admin
from django.urls import path

from . import views


urlpatterns = [
    path("about", views.aboutTemplateView.as_view(), name="about"),
]

