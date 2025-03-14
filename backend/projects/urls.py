from django.urls import path
from .views import list_projects, project_detail, create_project, update_project, delete_project,assign_student

urlpatterns = [
    path('list/', list_projects, name='list_projects'),
    path('<int:project_id>/', project_detail, name='project_detail'),
    path('create/', create_project, name='create_project'),
    path('<int:project_id>/update/', update_project, name='update_project'),
    path('<int:project_id>/delete/', delete_project, name='delete_project'),
    path('<int:project_id>/assign-student/', assign_student, name='assign_student'),
]