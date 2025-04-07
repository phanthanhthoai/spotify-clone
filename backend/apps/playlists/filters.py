import django_filters
from .models import Playlist

class PlaylistFilter(django_filters.FilterSet):
     name = django_filters.CharFilter(lookup_expr='icontains')  # Tìm theo tên
     owner = django_filters.CharFilter(field_name='owner__username', lookup_expr='icontains')  # Tìm theo tên chủ sở hữu
     is_public = django_filters.BooleanFilter()  # Lọc theo trạng thái công khai

     class Meta:
          model = Playlist
          fields = ['name', 'owner', 'is_public']
