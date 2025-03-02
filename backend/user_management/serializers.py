from rest_framework import serializers
from .models import BaseUser, Student, Supervisor
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class BaseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseUser
        fields = ['id', 'first_name', 'last_name',
                  'email', 'is_supervisor', 'is_student',
                  'password'
                  ]
        read_only_fields = ['created_at, updated_at']


class StudentSerializer(serializers.ModelSerializer):
    user = BaseUserSerializer()

    class Meta:
        model = Student
        fields = ['user', 'course_code']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_data['is_student'] = True
        # Create the BaseUser instance
        user = BaseUser.objects.create_user(**user_data)
        
        # Create the Student instance and link the user
        student = Student.objects.create(user=user, **validated_data)

        return student
    
class SupervisorSerializer(serializers.ModelSerializer):
    user = BaseUserSerializer()

    class Meta:
        model = Supervisor
        fields = ['user', 'department']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_data['is_supervisor'] = True
        # Create the BaseUser instance
        user = BaseUser.objects.create_user(**user_data)
        
        # Create the Student instance and link the user
        supervisor = Supervisor.objects.create(user=user, **validated_data)

        return supervisor
    
class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['first_name'] = self.user.first_name
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        return data