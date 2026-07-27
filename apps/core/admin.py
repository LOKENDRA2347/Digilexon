from django.contrib import admin

# Register your models here.

from .models import SiteSettings


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):

    def has_add_permission(self, request):
        return SiteSettings.objects.count() == 0