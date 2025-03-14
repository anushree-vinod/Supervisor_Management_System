from django.urls import path
from .views import submit_declaration, list_declarations, view_declaration, approve_or_reject_declaration

urlpatterns = [
    path('submit/', submit_declaration, name='submit_declaration'),
    path('view/<int:declaration_id>/', view_declaration, name='view_declaration'),
    path('list/', list_declarations, name='list_declarations'),
    path('<int:declaration_id>/approve/', approve_or_reject_declaration, name='approve_or_reject_declaration'),
]
