from apps.base_model import BaseModel
from django.db import models

#Phien dang nhap cua user
class UserSession(BaseModel):
     user = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name='sessions')
     token = models.CharField(max_length=255)
     expired_at = models.DateTimeField(null=True, blank=True)
     
     class Meta:
          db_table = 'user_session'
          verbose_name = 'User Session'
          verbose_name_plural = 'User Sessions'