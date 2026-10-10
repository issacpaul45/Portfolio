from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=120)
    summary = models.TextField()
    details = models.JSONField(default=list, blank=True)
    stack = models.JSONField(default=list, blank=True)
    featured = models.BooleanField(default=False)
    sort_order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "title"]

    def __str__(self):
        return self.title


class Experience(models.Model):
    company = models.CharField(max_length=120)
    role = models.CharField(max_length=120)
    period = models.CharField(max_length=80)
    location = models.CharField(max_length=120, blank=True)
    highlights = models.JSONField(default=list, blank=True)
    sort_order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["sort_order"]

    def __str__(self):
        return f"{self.role} at {self.company}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    message = models.TextField(max_length=4000)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Message from {self.name}"
