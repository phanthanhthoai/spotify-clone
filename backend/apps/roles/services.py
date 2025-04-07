from apps.roles.models import Role

class RoleService:
     def create_role(self, role_data):
          role = Role.objects.create(**role_data)
          return role