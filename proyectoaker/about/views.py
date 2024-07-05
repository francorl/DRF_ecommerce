from django.shortcuts import render
from django.views.generic import (
        TemplateView,
        ListView,
        CreateView
)

class aboutTemplateView(TemplateView):
    template_name = "core/about.html"



