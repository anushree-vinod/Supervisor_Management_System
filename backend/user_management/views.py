from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
from .models import BaseUser, Student, Supervisor
from .serializers import StudentSerializer, LoginSerializer,SupervisorSerializer
from pprint import pprint

@api_view(['POST'])
def register_student(request):
    pprint(request.data)
    student_data = request.data

    student_serializer = StudentSerializer(data=student_data)
    if student_serializer.is_valid():
        student_serializer.save()
        return Response(student_serializer.validated_data, status=status.HTTP_201_CREATED)
    return Response(student_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def register_supervisor(request):
    pprint(request.data)
    student_data = request.data

    supervisor_serializer = SupervisorSerializer(data=student_data)
    if supervisor_serializer.is_valid():
        supervisor_serializer.save()
        return Response(supervisor_serializer.validated_data, status=status.HTTP_201_CREATED)
    return Response(supervisor_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_user(request):
    serializer = LoginSerializer(data=request.data)
    try:
        serializer.is_valid(raise_exception=True)
    except TokenError as e:
        raise InvalidToken(e.args[0])
    
    return Response(serializer.validated_data, status=status.HTTP_200_OK)