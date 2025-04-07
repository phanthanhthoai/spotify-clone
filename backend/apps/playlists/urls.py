from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlaylistViewSet

router = DefaultRouter()
router.register('', PlaylistViewSet, basename='playlists/')

urlpatterns = [
    path('', include(router.urls)),
]