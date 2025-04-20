from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action
from rest_framework_simplejwt.authentication import JWTAuthentication

from apps.authentications.services import AuthService
from apps.authentications.serializers import LoginRequestSerializer, RegisterRequestSerializer, ProfileUserSerializer
from apps.users.serializers import UserSerializer
from apps.users.services import UserService
from utils.api_response import ApiResponse
from utils.exceptions import NotFoundException, ValidationException
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from utils.middlewares import AppAuthentication


class AuthViewSet(ViewSet):
     
     def __init__(self, *args, **kwargs):
          super().__init__(*args, **kwargs)
          self.auth_service = AuthService()
          self.user_service = UserService()

     def get_authenticators(self):
          if (self.request.method == "POST"):
               return []

          return super().get_authenticators()


     @action(methods=['get'], detail=False, url_path='user', authentication_classes=[AppAuthentication], permission_classes=[IsAuthenticated])
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

     def profile(self, request):
          user_id = request.user.id
          user = self.user_service.get_user(user_id)

          return ApiResponse.build(data=ProfileUserSerializer(user).data)
          
          
     