from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlaylistViewSet

router = DefaultRouter()
router.register('', PlaylistViewSet, basename='playlist')

urlpatterns = [
    path('', PlaylistViewSet.as_view({'get': 'list', 'post': 'create'}), name='playlist-list'),
    path('/<str:code>', PlaylistViewSet.as_view({'get': 'retrieve_by_code'}), name='playlist-get'),
    path('/<int:pk>', PlaylistViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    path('<int:pk>/remove-song/<int:song_id>', PlaylistViewSet.as_view({'post': 'remove_song_from_playlist'})),
    path('/<int:pk>/add-song/<int:song_id>', PlaylistViewSet.as_view({'post': 'add_song_to_playlist'})),
    path('/<int:pk>/songs', PlaylistViewSet.as_view({'get': 'get_songs_in_playlist'}))
]