from django.db import models

# Create your models here.

class Project(models.Model):
    title = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)

    client = models.CharField(max_length=100)

    category = models.CharField(max_length=100)

    short_description = models.TextField()

    image = models.ImageField(upload_to="portfolio/")

    result_one = models.CharField(max_length=30)
    result_one_title = models.CharField(max_length=50)

    result_two = models.CharField(max_length=30)
    result_two_title = models.CharField(max_length=50)

    display_order = models.PositiveIntegerField(default=0)

    is_featured = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return self.title