from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status, permissions
from user_management.models import Supervisor
from user_management.serializers import SupervisorSerializer
from pprint import pprint


@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def update_supervisor_profile(request):
    """
    Allows a supervisor to update specific fields in their profile.
    """
    try:
        # Ensure the logged-in user is a supervisor
        if not request.user.is_supervisor:
            return Response({"error": "Only supervisors can update their profile."}, status=status.HTTP_403_FORBIDDEN)
        
        # Get supervisor object linked to the logged-in user
        supervisor = Supervisor.objects.get(user=request.user)
        
        serializer = SupervisorSerializer(supervisor, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Supervisor.DoesNotExist:
        return Response({"error": "Supervisor profile not found."}, status=status.HTTP_404_NOT_FOUND)