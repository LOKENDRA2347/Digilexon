from django.shortcuts import render
from .models import Service
# Create your views here.
def services(request):
    services = Service.objects.filter(is_featured=True)

    context = {
        "services": services,
    }

    return render(request, "services/services.html", context)