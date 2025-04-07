from apps.users.models import User
from django_filters import rest_framework as filters


class UserFilter(filters.FilterSet):
     email = filters.CharFilter(field_name='email', lookup_expr='icontains')
     
     class Meta:
          model = User
          fields = ['email']