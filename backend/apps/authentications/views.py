from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from apps.authentications.serializers import LoginRequestSerializer, RegisterRequestSerializer, ProfileUserSerializer
from apps.authentications.services import AuthService
from apps.users.serializers import UserSerializer
from apps.users.services import UserService
from utils.api_response import ApiResponse
from utils.exceptions import ValidationException
from utils.middlewares import AppAuthentication


class AuthViewSet(ViewSet):
     def __init__(self, *args, **kwargs):
          super().__init__(*args, **kwargs)
          self.auth_service = AuthService()
          self.user_service = UserService()

     def register(self, request):
          serializer = RegisterRequestSerializer(data=request.data)
          if not serializer.is_valid():
               raise ValidationException(serializer.errors)
          
          user = self.auth_service.register(serializer.validated_data)
          
          return ApiResponse.build(data=UserSerializer(user).data)

     def login(self, request):
          serializer = LoginRequestSerializer(data=request.data)
          if not serializer.is_valid():
               raise ValidationException(serializer.errors)
          
          token = self.auth_service.login(serializer.validated_data)
          return ApiResponse.build(data={'token': token})

     def profile(self, request):
          user_id = request.user.id
          user = self.user_service.get_user(user_id)

          return ApiResponse.build(data=ProfileUserSerializer(user).data)
     
     
     @action(methods=['post'], detail=False, url_path='logout')
     def logout(self, request):
          delete = self.auth_service.logout(request)
          return ApiResponse.build(message='Logout successfully!')
          
     