from rest_framework.decorators import authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.routers import DefaultRouter

from utils.middlewares import AppAuthentication
from .views import AuthViewSet
from django.urls import path, include

router = DefaultRouter()
router.register('', AuthViewSet, basename='auth')


urlpatterns = [
     path('/login', AuthViewSet.as_view({'post': 'login'}, authentication_classes = [])),

     path('/register', AuthViewSet.as_view({'post': 'register'}, authentication_classes = [])),
     
     path('/logout',AuthViewSet.as_view({'post':'logout'}, authentication_classes = [AppAuthentication], permission_classes = [IsAuthenticated])),

     path('/profile', AuthViewSet.as_view({'get': 'profile'}, authentication_classes = [AppAuthentication], permission_classes = [IsAuthenticated])),
]