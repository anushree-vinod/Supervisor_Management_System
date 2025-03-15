from rest_framework import serializers
from .models import ResearchProject
from user_management.models import Student

class ResearchProjectSerializer(serializers.ModelSerializer):
    supervisor_email = serializers.EmailField(source='supervisor.user.email', read_only=True)
    assigned_student = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all(), required=False, allow_null=True)

    assigned_student_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = ResearchProject
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

    def to_representation(self, instance):
        # Get the original representation
        representation = super().to_representation(instance)
        
        # Modify the 'assigned_student' field to return the student's name instead of the ID
        if instance.assigned_student:
            representation['assigned_student'] = instance.assigned_student.name()  # or any field you prefer
        
        return representation
