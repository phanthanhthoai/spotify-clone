from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlaylistViewSet

router = DefaultRouter()
router.register('', PlaylistViewSet, basename='playlists')

urlpatterns = [
    path('', PlaylistViewSet.as_view({'get': 'list','post':'create'}), name='playlist-list'),
    path('<int:pk>', PlaylistViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    path('', include(router.urls)),
]