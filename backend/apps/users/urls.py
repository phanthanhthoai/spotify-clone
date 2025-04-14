from django.urls import path, include
from apps.users.views import UserViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('', UserViewSet, basename='user')

urlpatterns = [
     path('', UserViewSet.as_view({'get': 'list'}), name='user-list'),
     path('<int:pk>', UserViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}))
]
