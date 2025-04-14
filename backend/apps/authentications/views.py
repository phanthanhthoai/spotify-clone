from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action

from apps.authentications.services import AuthService
from apps.authentications.serializers import LoginRequestSerializer, RegisterRequestSerializer
from apps.users.serializers import UserSerializer
from utils.api_response import ApiResponse
from utils.exceptions import NotFoundException, ValidationException
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response



class AuthViewSet(ViewSet):
     
     def __init__(self, *args, **kwargs):
          super().__init__(*args, **kwargs)
          self.auth_service = AuthService()
          
     @action(methods=['get'], detail=False, url_path='user', permission_classes=[IsAuthenticated])
     def authenticated_user(self, request):
          user = request.user
          return Response({"id":user.id,"username": user.username, "email": user.email})
     @action(methods=['post'], detail=False, url_path='register')
     def register(self, request):
          serializer = RegisterRequestSerializer(data=request.data)
          if not serializer.is_valid():
               raise ValidationException(serializer.errors)
          
          user = self.auth_service.register(serializer.validated_data)
          
          return ApiResponse.build(data=UserSerializer(user).data)
     
     @action(methods=['post'], detail=False, url_path='login')
     def login(self, request):
          serializer = LoginRequestSerializer(data=request.data)
          if not serializer.is_valid():
               raise ValidationException(serializer.errors)
          
          token = self.auth_service.login(serializer.validated_data)
          return ApiResponse.build(data={'token': token})
          
          
     