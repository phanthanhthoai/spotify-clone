from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.albums.views import AlbumViewSet
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register('', AlbumViewSet, basename='album')

urlpatterns = [
    path('', AlbumViewSet.as_view({'get': 'list', 'post': 'create'}), name='album-list'),
    path('/<int:pk>', AlbumViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    path('', include(router.urls)),
]