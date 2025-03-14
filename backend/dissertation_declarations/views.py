from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.utils.timezone import now
from .models import DissertationDeclaration
from .serializers import DissertationDeclarationSerializer
from rest_framework.permissions import IsAuthenticated


# Submit a declaration (Student only)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_declaration(request):
    if not hasattr(request.user, 'student'):
        return Response({"detail": "Only students can submit declarations."}, status=status.HTTP_403_FORBIDDEN)

    data = request.data
    data['student'] = request.user.student.user_id  # Automatically set the student

    serializer = DissertationDeclarationSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_declaration(request, declaration_id):
    try:
        # Fetch declaration by ID
        declaration = DissertationDeclaration.objects.get(id=declaration_id)
    except DissertationDeclaration.DoesNotExist:
        return Response({"detail": "Declaration not found."}, status=status.HTTP_404_NOT_FOUND)

    # Allow student or their supervisor to view the declaration
    if declaration.student.user == request.user or declaration.supervisor.user == request.user:
        serializer = DissertationDeclarationSerializer(declaration)
        return Response(serializer.data)

    return Response({"detail": "Not authorized to view this declaration."}, status=status.HTTP_403_FORBIDDEN)


# View all dissertation declarations (for supervisors and students)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_declarations(request):
    print(request)
    if hasattr(request.user, 'student'):
        # Student can only see their own declaration
        declarations = DissertationDeclaration.objects.filter(student=request.user.student)
    elif hasattr(request.user, 'supervisor'):
        # Supervisor can see all declarations assigned to them
        declarations = DissertationDeclaration.objects.filter(supervisor=request.user.supervisor)
    else:
        return Response({"detail": "User is neither a student nor a supervisor."}, status=status.HTTP_403_FORBIDDEN)

    serializer = DissertationDeclarationSerializer(declarations, many=True)
    return Response(serializer.data)

# Approve or Reject a Declaration (Supervisor only)
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def approve_or_reject_declaration(request, declaration_id):
    try:
        declaration = DissertationDeclaration.objects.get(id=declaration_id)
    except DissertationDeclaration.DoesNotExist:
        return Response({"detail": "Declaration not found."}, status=status.HTTP_404_NOT_FOUND)

    # Only the assigned supervisor can approve/reject
    if declaration.supervisor.user != request.user:
        return Response({"detail": "Only the assigned supervisor can approve/reject."}, status=status.HTTP_403_FORBIDDEN)

    new_status = request.data.get('status')
    if new_status not in ['approved', 'rejected']:
        return Response({"detail": "Invalid status. Must be 'approved' or 'rejected'."}, status=status.HTTP_400_BAD_REQUEST)

    declaration.status = new_status
    declaration.approved_date = now().date() if new_status == 'approved' else None
    declaration.supervisor_signature = declaration.supervisor.user.first_name  # Example of simple signature
    declaration.save()

    serializer = DissertationDeclarationSerializer(declaration)
    return Response(serializer.data)
