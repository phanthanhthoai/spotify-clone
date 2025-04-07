from rest_framework import serializers

from apps.roles.models import Role

class RoleSerializer(serializers.Serializer):
    class Meta:
         model = Role,
         fields = ('id', 'name')
         
class RoleCreateRequestSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255, required=True)
   