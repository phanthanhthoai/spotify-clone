from django.db import models

from apps.base_model import BaseModel


class Role(BaseModel):
     name = models.CharField(max_length=255, unique=True)
     
     class Meta:
          db_table = 'role'
          verbose_name = 'Role'
          verbose_name_plural = 'Roles'
     