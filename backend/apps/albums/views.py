from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from apps.albums.models import Album
from apps.albums.serializers import AlbumSerializer, AlbumCreateRequestSerializer, UpdateAlbumSerializer, AlbumSongSerializer
from apps.albums.services import AlbumService
from utils.api_response import ApiResponse
from utils.exceptions import NotFoundException
from rest_framework.viewsets import ViewSet
from apps.songs.services import SongService
class AlbumViewSet(ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.album_service = AlbumService()
        self.song_service = SongService()

    def list(self, request):
        paginated = self.album_service.list(request.GET, request)
        return ApiResponse.build(data=paginated.get_paginated_response(AlbumSerializer))
    
    
    def retrieve(self, request, pk=None):
        album = self.album_service.get_album(pk)
        return ApiResponse.build(data=AlbumSerializer(album).data)
    
    
    def update(self, request, pk=None):
        serializer = UpdateAlbumSerializer(
            data=request.data,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        album = self.album_service.update_album(pk, serializer.validated_data)
        return ApiResponse.build(data=AlbumSerializer(album).data)
    
    
    def destroy(self, request, pk=None):
        self.album_service.delete_album(pk)
        return ApiResponse.build(message='Delete album successfully!')
    
    
    def create(self, request):
        serializer = AlbumCreateRequestSerializer(
            data=request.data,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        album = self.album_service.create_album(serializer.validated_data, request.user)
        return ApiResponse.build(data=AlbumSerializer(album).data)
    
    
    @action(detail=True, methods=['get'], url_path='songs')
    def get_albums_by_artist(self, request, artist_id):
        albums = self.album_service.get_albums_by_artist(artist_id)
        return ApiResponse.build(data=AlbumSerializer(albums, many=True).data)
    
    
    @action(detail=True, methods=['post'], url_path='add-song/(?P<song_id>\d+)')
    def add_song_to_album(self, request, pk=None, song_id=None):
        try:
            album_song = self.album_service.add_song_to_album(pk, song_id)
            return album_song
        except NotFoundException as e:
            return ApiResponse.build(message=str(e), status=status.HTTP_404_NOT_FOUND)
        
        
    @action(detail=True, methods=['post'], url_path='remove-song/(?P<song_id>\d+)')
    def remove_song_from_album(self, request, pk=None, song_id=None):
        try:
            album_song = self.album_service.remove_song_from_album(pk, song_id)
            return album_song
        except NotFoundException as e:
            return ApiResponse.build(message=str(e), status=status.HTTP_404_NOT_FOUND)
    
