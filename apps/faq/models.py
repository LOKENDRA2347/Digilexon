from django.db import models

# Create your models here.


class FAQ(models.Model):
    question = models.CharField(max_length=255)

    answer = models.TextField()

    display_order = models.PositiveIntegerField(default=0)

    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return self.question