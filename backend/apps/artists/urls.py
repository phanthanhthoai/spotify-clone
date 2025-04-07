from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.artists.views import ArtistViewSet

router = DefaultRouter()
router.register('', ArtistViewSet, basename='artist')

urlpatterns = [
    path('', include(router.urls)),
]
