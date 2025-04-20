from django.contrib.auth.models import AbstractUser
from django.db import models

from apps.roles.models import Role


class User(AbstractUser):
     role = models.ForeignKey(Role, on_delete=models.CASCADE, related_name='user_with_role', null=True)
     
     class Meta:
          db_table = 'user'
          verbose_name = 'User'
          verbose_name_plural = 'Users'
          
     def __str__(self):
          return self.username
