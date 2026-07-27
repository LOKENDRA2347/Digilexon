from django.shortcuts import render

# Create your views here.
from .models import FAQ


def faq(request):
    faqs = FAQ.objects.filter(is_active=True)

    return render(
        request,
        "faq/faq.html",
        {
            "faqs": faqs,
        }
    )