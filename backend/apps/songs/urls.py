from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.songs.views import SongViewSet

router = DefaultRouter()
router.register('', SongViewSet, basename='songs')

urlpatterns = [
    path('', SongViewSet.as_view({'get': 'list', 'post': 'create'}), name='song-list'),

    path('/<int:pk>', SongViewSet.as_view({'get': 'retrieve', 'delete': 'destroy', 'put': 'update'}), name='song-detail'),
    # path('', include(router.urls)),
]
