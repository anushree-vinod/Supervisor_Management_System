from django.db import models
from django.contrib.auth.models import AbstractUser
from uuid import uuid4
from .managers import CustomBaseUserManager

class BaseUser(AbstractUser):
    """Abstracted common fields for Student and Supervisor."""
    is_student = models.BooleanField('student status', default=False)
    is_supervisor = models.BooleanField('supervisor status', default=False)
    email = models.EmailField(unique=True)
    username = None
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
        
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomBaseUserManager()

    def __str__(self):
        return self.email


class Student(models.Model):
    user = models.OneToOneField(BaseUser, on_delete=models.CASCADE, primary_key=True)
    course_code = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} (Student)"
    
    def name(self):
        return f"{self.user.first_name} {self.user.last_name}"

class Supervisor(models.Model):
    user = models.OneToOneField(BaseUser, on_delete=models.CASCADE, primary_key=True)
    department = models.CharField(max_length=100)
    research_interests = models.TextField(blank=True, null=True) 
    publications = models.TextField(blank=True, null=True)
    available_projects = models.IntegerField(default=0)  
    
    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} (Supervisor - {self.department})"
