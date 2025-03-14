from django.urls import path
from .views import update_supervisor_profile
urlpatterns = [
  
    # Retrieve, update or delete a supervisor by ID
    path('profile/update/', update_supervisor_profile, name='update_supervisor_profile'),
]
