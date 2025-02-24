from django.contrib.auth.models import AbstractUser
from django.db import models

# ✅ Custom User Model (Admin, Teacher, Student, Parent)
class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ("admin", "Admin"),
        ("teacher", "Teacher"),
        ("student", "Student"),
        ("parent", "Parent"),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="student")

    def __str__(self):
        return f"{self.username} ({self.role})"

# ✅ Student Model
class Student(models.Model):
    full_name = models.CharField(max_length=255)
    grade = models.CharField(max_length=50)
    parent = models.ForeignKey(
        CustomUser, 
        on_delete=models.CASCADE, 
        limit_choices_to={"role": "parent"},
        null=True, blank=True,
        related_name="students"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} (Grade {self.grade})"

# ✅ Teacher Model
class Teacher(models.Model):
    full_name = models.CharField(max_length=255)
    subject = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name
