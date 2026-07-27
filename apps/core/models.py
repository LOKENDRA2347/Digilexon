from django.db import models
# create your models here

class SiteSettings(models.Model):
    company_name = models.CharField(max_length=100)
    tagline = models.CharField(max_length=200, blank=True)

    email = models.EmailField()
    phone = models.CharField(max_length=20)

    address = models.TextField(blank=True)

    logo = models.ImageField(
        upload_to="site/",
        blank=True,
        null=True
    )

    favicon = models.ImageField(
        upload_to="site/",
        blank=True,
        null=True
    )

    facebook = models.URLField(blank=True)
    instagram = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    youtube = models.URLField(blank=True)

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"

    def __str__(self):
        return self.company_name