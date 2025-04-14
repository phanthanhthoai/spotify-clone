from rest_framework.viewsets import ViewSet
from apps.artists.services import ArtistService
from apps.artists.serializers import ArtistSerializer
from apps.artists.serializers import ArtistCreateRequestSerializer
from apps.artists.serializers import UpdateArtistSerializer
from utils.api_response import ApiResponse
from utils.exceptions import NotFoundException
from rest_framework.decorators import action
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny

class ArtistViewSet(ViewSet):
     authentication_classes = [JWTAuthentication]
     permission_classes = [IsAuthenticated]
     
     def __init__(self, *args, **kwargs):
          super().__init__(*args, **kwargs)
          self.artist_service = ArtistService()
     
     def list(self, request):
          paginated = self.artist_service.list(request.GET, request)
          return ApiResponse.build(data=paginated.get_paginated_response(ArtistSerializer))
     
     def retrieve(self, request, pk=None):
          artist = self.artist_service.get_artist(pk)
          return ApiResponse.build(data=ArtistSerializer(artist).data)
     
     def update(self, request, pk=None):
          serializer = UpdateArtistSerializer(
               data=request.data,
               context={'request': request}
          )
          serializer.is_valid(raise_exception=True)
          
          artist = self.artist_service.update_artist(pk, serializer.validated_data)
          return ApiResponse.build(data=ArtistSerializer(artist).data)
     def destroy(self, request, pk=None):
          self.artist_service.delete_artist(pk)
          return ApiResponse.build(message='Delete artist successfully!')
     
     def create(self, request):
          serializer = ArtistCreateRequestSerializer(
          data=request.data,
          context={'request': request}
          )
          serializer.is_valid(raise_exception=True)
          
          artist = self.artist_service.create_artist(serializer.validated_data)
          return ApiResponse.build(data=ArtistSerializer(artist).data)