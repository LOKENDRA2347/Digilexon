from django.shortcuts import render

# Create your views here.

from .models import Project


def work(request):
    projects = Project.objects.filter(is_featured=True)

    return render(
        request,
        "portfolio/work.html",
        {
            "projects": projects,
        }
    )