from apps.users.models import User
from utils.models import BaseModel
from django.db import models

#Phien dang nhap cua user
class UserSession(BaseModel):
     user = models.ForeignKey(User, on_delete=models.CASCADE)
     token = models.CharField(max_length=255)
     expired_at = models.DateTimeField(null=True, blank=True)
     
     class Meta:
          db_table = 'user_session'
          verbose_name = 'User Session'
          verbose_name_plural = 'User Sessions'