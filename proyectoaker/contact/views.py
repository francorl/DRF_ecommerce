from django.shortcuts import render
from django.views.generic import (
        TemplateView,
)

class contactTemplateView(TemplateView):
    template_name = "core/contact.html"

