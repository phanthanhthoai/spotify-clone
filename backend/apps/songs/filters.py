import django_filters
from .models import Song

class SongFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(lookup_expr='icontains')  # Lọc theo tên bài hát
    artist = django_filters.CharFilter(lookup_expr='icontains')  # Lọc theo tên nghệ sĩ
    # album_id = django_filters.CharFilter(lookup_expr='icontains')  # Lọc theo album
    min_duration = django_filters.NumberFilter(field_name="duration", lookup_expr="gte")  # Lọc thời lượng tối thiểu
    max_duration = django_filters.NumberFilter(field_name="duration", lookup_expr="lte")  # Lọc thời lượng tối đa
    release_date = django_filters.DateFilter()  # Lọc theo ngày phát hành

    class Meta:
        model = Song
        fields = ['title', 'artist', 'min_duration', 'max_duration', 'release_date']
