from django.contrib import admin

# Register your models here.

from .models import Service


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "slug",
        "is_featured",
        "created_at",
    )

    prepopulated_fields = {
        "slug": ("title",)
    }
    list_filter=(
        "is_featured",
    )
    search_fields = (
        "title",
    )