from django.db import models
from user_management.models import Supervisor, Student

class ResearchProject(models.Model):
    supervisor = models.ForeignKey(Supervisor, on_delete=models.CASCADE, related_name="projects")
    title = models.CharField(max_length=400)
    description = models.TextField()
    requirements = models.TextField(blank=True, null=True)
    interested_students = models.ManyToManyField(Student, related_name="interested_projects", blank=True)
    assigned_student = models.OneToOneField(Student, on_delete=models.SET_NULL, null=True, blank=True, related_name="assigned_project")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} (Assigned to: {self.assigned_student.user.email if self.assigned_student else 'None'})"
