from rest_framework.viewsets import ViewSet
from apps.users.services import UserService
from apps.users.serializers import UserSerializer, UserCreateRequestSerializer
from utils.api_response import ApiResponse
from utils.exceptions import NotFoundException, ValidationException
from rest_framework.decorators import action
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

from utils.middlewares import AppAuthentication


class UserViewSet(ViewSet):
    authentication_classes = [AppAuthentication]
    permission_classes = [IsAuthenticated]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user_service = UserService()


    def list(self, request):
        paginated = self.user_service.list(request.GET, request)
        return ApiResponse.build(data=paginated.get_paginated_response(UserSerializer))


    def retrieve(self, request, pk=None):
        user = self.user_service.get_user(pk)
        return ApiResponse.build(data=UserSerializer(user).data)


    def update(self, request, pk=None):
        user = self.user_service.update_user(pk, request.data)
        return ApiResponse.build(data=UserSerializer(user).data)


    def destroy(self, request, pk=None):
        self.user_service.delete_user(pk)
        
        return ApiResponse.build(message='Delete user successfully!')

    def create(self, request):
        serializer = UserCreateRequestSerializer(data=request.data)

        if not serializer.is_valid():
            raise ValidationException(serializer.errors)

        user = self.user_service.create_user(serializer.validated_data)

        return ApiResponse.build(data=UserSerializer(user).data)





    
    
    