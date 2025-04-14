from rest_framework.routers import DefaultRouter
from .views import AuthViewSet
from django.urls import path, include

router = DefaultRouter()
router.register('', AuthViewSet, basename='auth')


urlpatterns = [
     # path('', include(router.urls)),
     path('/user', AuthViewSet.as_view({'get' : 'authenticated_user'})),

     path('/login', AuthViewSet.as_view({'get': 'login'})),

     path('/register', AuthViewSet.as_view({'get': 'register'}))
]