from rest_framework.viewsets import ViewSet
from apps.roles.services import RoleService
from apps.roles.serializers import RoleCreateRequestSerializer, RoleSerializer
from utils.api_response import ApiResponse
from utils.exceptions import ValidationException

class RoleViewSet(ViewSet):
     def __init__(self, *args, **kwargs):
          super().__init__(*args, **kwargs)
          self.role_service = RoleService()
          
     def list(self, request):
          pass
     
     def create(self, request):
          serializer = RoleCreateRequestSerializer(data=request.data)
          
          if not serializer.is_valid():
               raise ValidationException(serializer.errors)
          
          role = self.role_service.create_role(serializer.validated_data)
          return ApiResponse.build(data=RoleSerializer(role).data)