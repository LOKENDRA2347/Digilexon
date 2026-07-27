from django.contrib import admin

# Register your models here.

from .models import FAQ


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = (
        "question",
        "display_order",
        "is_active",
    )

    search_fields = (
        "question",
    )