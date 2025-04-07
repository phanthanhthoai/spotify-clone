import django_filters
from apps.albums.models import Album
from django_filters import rest_framework as filters

class AlbumFilter(filters.FilterSet):
    title = django_filters.CharFilter(field_name='title', lookup_expr='icontains')
    
    class Meta:
        model = Album
        fields = ['title']
