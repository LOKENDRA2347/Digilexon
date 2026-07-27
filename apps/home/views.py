from django.shortcuts import render

# Create your views here.

from apps.services.models import Service


def home(request):
    featured_services = Service.objects.filter(is_featured=True)

    context = {
        "featured_services": featured_services,
    }

    return render(request, "home/index.html", context)