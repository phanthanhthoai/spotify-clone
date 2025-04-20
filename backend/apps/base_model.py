from django.db import models
from utils.middlewares import get_current_user

class BaseModel(models.Model):
     id = models.AutoField(primary_key=True)
     created_at = models.DateTimeField(auto_now_add=True, null=True)
     updated_at = models.DateTimeField(auto_now=True, null=True)
     created_by = models.ForeignKey("users.User", on_delete=models.SET_NULL, null=True, related_name='created_%(class)s' , name='created_by')
     
     class Meta:
          abstract = True

     def save(self, *args, **kwargs):
          user = get_current_user()
          if user:
               self.created_by = user

          super().save(*args, **kwargs)