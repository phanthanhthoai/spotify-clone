from apps.artists.models import Artist
from django_filters import rest_framework as filters


class ArtistFilter(filters.FilterSet):
     name = filters.CharFilter(field_name='name', lookup_expr='icontains')
     
     class Meta:
          model = Artist
          fields = ['name']