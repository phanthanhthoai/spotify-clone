from apps.users.models import User
from apps.users.filters import UserFilter
from utils.exceptions import NotFoundException

class UserService:
     def get_list_user(self, request):
         queryset = User.objects.all()
         filter = UserFilter(request, queryset=queryset)
         
         return filter.qs
    
     def get_user(self, pk):
          user = User.objects.filter(pk=pk).first()
          if not user:
              raise NotFoundException('User not found')
         
          return user
     
     def update_user(self, pk, data):
          user = self.get_user(pk)
          if not user:
              raise NotFoundException('User not found')
          
          for key, value in data.items():
              setattr(user, key, value)
          user.save()
          
          return user
     
     def delete_user(self, pk):
          user = self.get_user(pk)
          if not user:
              raise NotFoundException('User not found')
         
          user.delete()
          
      