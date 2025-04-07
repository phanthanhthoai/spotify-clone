from rest_framework import serializers

from apps.users.models import User

class UserSerializer(serializers.ModelSerializer):
     class Meta:
          model = User
          fields = ('email', 'password')
          
class UserCreateRequestSerializer:
     email = serializers.EmailField()
     password = serializers.CharField()
     
class UpdateUserSerializer:
     email = serializers.EmailField()