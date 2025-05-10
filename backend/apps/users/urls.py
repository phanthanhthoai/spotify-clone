from django.urls import path
from rest_framework.routers import DefaultRouter

from apps.users.views import UserViewSet

router = DefaultRouter()
router.register('', UserViewSet, basename='user')

urlpatterns = [
     path('', UserViewSet.as_view({'get': 'list', 'post': 'create'}, authentication_classes=[], permission_classes=[]), name='user-list'),
     path('/<int:pk>', UserViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}, authentication_classes=[], permission_classes=[]))
]
