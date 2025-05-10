from rest_framework import serializers

from apps.users.models import User

class UserSerializer(serializers.ModelSerializer):
     class Meta:
          model = User
          fields = ('email', 'username', 'id', 'first_name', 'last_name')
          
class UserCreateRequestSerializer(serializers.Serializer):
     email = serializers.EmailField()
     first_name = serializers.CharField()
     last_name = serializers.CharField()
     
class UpdateUserSerializer:
     email = serializers.EmailField()
     first_name = serializers.CharField()
     last_name = serializers.CharField()