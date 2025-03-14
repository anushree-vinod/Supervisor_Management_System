from rest_framework import serializers
from .models import ResearchProject
from user_management.models import Student

class ResearchProjectSerializer(serializers.ModelSerializer):
    supervisor_email = serializers.EmailField(source='supervisor.user.email', read_only=True)
    assigned_student = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all(), required=False, allow_null=True)

    class Meta:
        model = ResearchProject
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']
