from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from apps.playlists.models import Playlist
from apps.songs.models import Song
from utils.exceptions import NotFoundException
from utils.middlewares import AppAuthentication
from .serializers import PlaylistSerializer, PlaylistCreateRequestSerializer, PlaylistUpdateRequestSerializer, PlaylistSongSerializer
from rest_framework import status
from apps.songs.serializers import SongSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from utils.api_response import ApiResponse
from .services import PlaylistService

class PlaylistViewSet(viewsets.ModelViewSet):
     authentication_classes = [AppAuthentication]
     permission_classes = [permissions.IsAuthenticated]

     def __init__(self, *args, **kwargs):
          super().__init__(*args, **kwargs)
          self.playlist_service = PlaylistService()
     
     def list(self, request):
          paginated = self.playlist_service.list(request.GET, request)
          return ApiResponse.build(data=paginated.get_paginated_response(PlaylistSerializer))


     def retrieve(self, request, pk=None):
          playlist = self.playlist_service.get_playlist(pk)
          return ApiResponse.build(data=PlaylistSerializer(playlist).data)


     def update(self, request, pk=None):
          playlist = self.playlist_service.update_playlist(pk, PlaylistUpdateRequestSerializer(request.data).data)
          return ApiResponse.build(data=PlaylistSerializer(playlist).data)


     def destroy(self, request, pk=None):
          self.playlist_service.delete_playlist(pk)
          return ApiResponse.build(message='Delete playlist successfully!')


     def create(self, request):
          playlist = self.playlist_service.create_playlist(PlaylistCreateRequestSerializer(request.data).data ,request.user)
          return ApiResponse.build(data=PlaylistSerializer(playlist).data)
     
     @action(detail=True, methods=['get'], url_path='songs')
     def get_songs_in_playlist(self, request, pk=None):
          songs = self.playlist_service.get_songs_in_playlist(pk)
          return ApiResponse.build(data=PlaylistSongSerializer(songs, many=True).data)
     
     @action(detail=True, methods=['post'], url_path='add-song/(?P<song_id>\d+)')
     def add_song_to_playlist(self, request, pk=None, song_id=None):
          playlist = self.playlist_service.add_song_to_playlist(pk, song_id)
          return ApiResponse.build(data=PlaylistSerializer(playlist).data)
     
     @action(detail=True, methods=['post'], url_path='remove-song/(?P<song_id>\d+)')
     def remove_song_from_playlist(self, request, pk=None, song_id=None):
          playlist = self.playlist_service.remove_song_from_playlist(pk, song_id)
          return ApiResponse.build(data=playlist)
     
     @action(
        detail=False,
        methods=['get'],
        url_path='my-playlists',
        url_name='my_playlists'
     )
     def get_user_playlists(self, request):
          """ Endpoint lấy playlist không phân trang """
          playlists = self.playlist_service.get_user_playlists(
               user=request.user,
               query_params=request.GET
          )
          return ApiResponse.build( 
               data=PlaylistSerializer(playlists, many=True).data
          )


     def retrieve_by_code(self, request, code=None):
          playlist = self.playlist_service.get_by_code(code)

          if playlist is None:
               raise NotFoundException("Playlist not found")

          if playlist.owner is None or playlist.owner.id != request.user.id:
               raise NotFoundException("Playlist not found")

          return ApiResponse.build(data=PlaylistSerializer(playlist).data)