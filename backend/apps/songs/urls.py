from django.urls import path
from rest_framework.permissions import IsAuthenticated
from rest_framework.routers import DefaultRouter

from apps.songs.views import SongViewSet
from utils.middlewares import AppAuthentication

router = DefaultRouter()
router.register('', SongViewSet, basename='song')

urlpatterns = [
    path('', SongViewSet.as_view({'post': 'create', 'get': 'list'}, permission_classes=[], authentication_classes=[])),

    path('<int:pk>', SongViewSet.as_view({'get': 'retrieve', 'delete': 'destroy', 'put': 'update'}), name='song-detail'),
    # path('', include(router.urls)),
]