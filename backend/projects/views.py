from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import ResearchProject
from user_management.models import Student
from .serializers import ResearchProjectSerializer

@api_view(['GET'])
def list_projects(request):
    """List projects for the logged-in supervisor."""
    if not request.user.is_authenticated:
        return Response({"detail": "Authentication credentials were not provided."}, status=status.HTTP_401_UNAUTHORIZED)

    user = request.user
    if user.is_supervisor:  # Ensure the logged-in user is a supervisor
        projects = ResearchProject.objects.filter(supervisor__user=user)  # Get projects for the supervisor
        serializer = ResearchProjectSerializer(projects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({"detail": "You do not have permission to view projects."}, status=status.HTTP_403_FORBIDDEN)

@api_view(['GET'])
def project_detail(request, project_id):
    """Retrieve a single project's details."""
    try:
        project = ResearchProject.objects.get(id=project_id, is_active=True)
        serializer = ResearchProjectSerializer(project)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except ResearchProject.DoesNotExist:
        return Response({"detail": "Project not found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_project(request):
    """Create a new research project (Supervisor only)."""
    if not request.user.is_supervisor:
        return Response({"detail": "Only supervisors can create projects."}, status=status.HTTP_403_FORBIDDEN)

    data = request.data
    data['supervisor'] = request.user.supervisor.user_id

    serializer = ResearchProjectSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_project(request, project_id):
    """Update an existing project (Supervisor only)."""
    try:
        project = ResearchProject.objects.get(id=project_id, supervisor=request.user.supervisor)
    except ResearchProject.DoesNotExist:
        return Response({"detail": "Project not found or access denied."}, status=status.HTTP_404_NOT_FOUND)

    serializer = ResearchProjectSerializer(project, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_project(request, project_id):
    """Delete a project (Supervisor only)."""
    try:
        project = ResearchProject.objects.get(id=project_id, supervisor=request.user.supervisor)
    except ResearchProject.DoesNotExist:
        return Response({"detail": "Project not found or access denied."}, status=status.HTTP_404_NOT_FOUND)

    project.delete()
    return Response({"detail": "Project deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def assign_student(request, project_id):
    """Allows a supervisor to assign a student to a project."""
    user = request.user

    # Check if user is a supervisor
    if not user.is_supervisor:
        return Response({"detail": "Only supervisors can assign students."}, status=status.HTTP_403_FORBIDDEN)

    # Get project
    try:
        project = ResearchProject.objects.get(id=project_id, supervisor__user=user)
    except ResearchProject.DoesNotExist:
        return Response({"detail": "Project not found or unauthorized."}, status=status.HTTP_404_NOT_FOUND)

    # Assign student
    assigned_student_id = request.data.get('assigned_student_id')
    # Ensure a valid student ID is provided
    if not assigned_student_id:
        return Response({"detail": "assigned_student_id is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    if assigned_student_id:
        try:
            student = Student.objects.get(user_id=assigned_student_id)
            project.assigned_student = student
            project.save()
            return Response({"detail": "Student assigned successfully."}, status=status.HTTP_200_OK)
        except Student.DoesNotExist:
            return Response({"detail": "Student not found."}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({"detail": "Assigned student ID is required."}, status=status.HTTP_400_BAD_REQUEST)
