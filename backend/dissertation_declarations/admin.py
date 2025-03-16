from django.contrib import admin
from .models import DissertationDeclaration
# Register your models here.

class DissertationDeclarationAdmin(admin.ModelAdmin):
    list_display = ('topic', 'student', 'supervisor', 'status', 'submission_date')
    list_filter = ('status', 'supervisor')
    search_fields = ('topic', 'student__user__first_name', 'student__user__last_name')
    ordering = ('-submission_date',)


admin.site.register(DissertationDeclaration, DissertationDeclarationAdmin)