from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import BaseUser, Student, Supervisor

# Register custom BaseUser model with custom UserAdmin class
class CustomBaseUserAdmin(UserAdmin):
    model = BaseUser
    list_display = ('email', 'first_name', 'last_name', 'is_student', 'is_supervisor', 'is_active', 'created_at', 'updated_at')
    list_filter = ('is_student', 'is_supervisor', 'is_active', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('-created_at',)
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_supervisor', 'is_student')}),
        ('Important Dates', {'fields': ('last_login', 'created_at', 'updated_at')}),
    )
    add_fieldsets = (
        (None, {'fields': ('email', 'password1', 'password2')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'is_student', 'is_supervisor')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_supervisor', 'is_student')}),
    )
    readonly_fields = ('created_at', 'updated_at', 'last_login')

class StudentAdmin(admin.ModelAdmin):
    list_display = ('user', 'course_code')
    search_fields = ('user__first_name', 'user__last_name', 'course_code')
    list_filter = ('course_code',)


class SupervisorAdmin(admin.ModelAdmin):
    list_display = ('user', 'department', 'available_projects')
    search_fields = ('user__first_name', 'user__last_name', 'department')
    list_filter = ('department',)

admin.site.register(BaseUser, CustomBaseUserAdmin)
admin.site.register(Student, StudentAdmin)
admin.site.register(Supervisor, SupervisorAdmin)
