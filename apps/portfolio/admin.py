from django.contrib import admin

# Register your models here.

from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "client",
        "category",
        "display_order",
        "is_featured",
    )

    prepopulated_fields = {
        "slug": ("title",)
    }

    search_fields = (
        "title",
        "client",
    )