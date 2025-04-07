from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.albums.views import AlbumViewSet

router = DefaultRouter()
router.register('', AlbumViewSet, basename='album')

urlpatterns = [
    path('', include(router.urls)),
]
