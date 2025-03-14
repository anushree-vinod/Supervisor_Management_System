from rest_framework import serializers
from .models import DissertationDeclaration

class DissertationDeclarationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DissertationDeclaration
        fields = '__all__'
