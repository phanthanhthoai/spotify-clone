from rest_framework.viewsets import ViewSet
from apps.users.services import UserService
from apps.users.serializers import UserSerializer
from utils.api_response import ApiResponse
from utils.exceptions import NotFoundException
from rest_framework.decorators import action
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

class UserViewSet(ViewSet):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user_service = UserService()
        
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def list(self, request):
        list_user = self.user_service.get_list_user(request=request.GET)
        
        return ApiResponse.build(data=UserSerializer(list_user, many=True).data)
    
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def retrieve(self, request, pk=None):
        user = self.user_service.get_user(pk)
        
        return ApiResponse.build(data=UserSerializer(user).data)
    
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def update(self, request, pk=None):
        user = self.user_service.update_user(pk, request.data)
        
        return ApiResponse.build(data=UserSerializer(user).data)
    
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def destroy(self, request, pk=None):
        self.user_service.delete_user(pk)
        
        return ApiResponse.build(message='Delete user successfully!')
    
    
    