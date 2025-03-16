from django.urls import path
from . import views

urlpatterns = [
    path('register/student/', views.register_student, name='student-register'),
    path('register/supervisor/', views.register_supervisor, name='supervisor-register'),
    path('login/', views.login_user, name='user-login'),
    path('ping/', views.ping, name='ping'),
    # path('login/supervisor/', views.login_supervisor, name='supervisor-login'),
]