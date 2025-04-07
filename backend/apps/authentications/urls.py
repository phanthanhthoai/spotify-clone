from rest_framework.routers import DefaultRouter
from .views import AuthViewSet
from django.urls import path, include

router = DefaultRouter()
router.register('', AuthViewSet, basename='auth')


urlpatterns = [
     path('/', include(router.urls)),
]