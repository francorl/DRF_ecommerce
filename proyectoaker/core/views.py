from django.shortcuts import render
from django.views.generic import (
    TemplateView,
    ListView
)

def index(request):
    
        return render(request, "core/index.html")



