from django.db import models
from user_management.models import Student, Supervisor

class DissertationDeclaration(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    student = models.OneToOneField(Student, on_delete=models.CASCADE)
    supervisor = models.ForeignKey(Supervisor, on_delete=models.CASCADE)
    topic = models.CharField(max_length=255)
    description = models.TextField()
    submission_date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    student_signature = models.CharField(max_length=100)  # Can be student's name or a digital signature path
    supervisor_signature = models.CharField(max_length=100, blank=True, null=True)  # For supervisor approval
    approved_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.student.user.first_name}'s Declaration - {self.topic}"

