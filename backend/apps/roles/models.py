from django.db import models

from utils.models import BaseModel

class Role(BaseModel):
     name = models.CharField(max_length=255, unique=True)
     
     class Meta:
          db_table = 'role'
          verbose_name = 'Role'
          verbose_name_plural = 'Roles'
     