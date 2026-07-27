from django.shortcuts import render, redirect
from .models import Contact


def contact(request):

    if request.method == "POST":

        Contact.objects.create(
            name=request.POST.get("name"),
            email=request.POST.get("email"),
            company=request.POST.get("company"),
            budget=request.POST.get("budget"),
            message=request.POST.get("message"),
        )

        return redirect("contact")

    return render(request, "contact/contact.html")