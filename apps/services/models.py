from django.db import models

# Create your models here.


class Service(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    short_description = models.TextField()

    icon = models.CharField(
        max_length=50,
        blank=True,
        help_text="Example: 🚀 or fa-solid fa-chart-line"
    )

    display_order = models.PositiveIntegerField(default=0)

    is_featured = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["display_order","title"]

    def __str__(self):
        return self.title