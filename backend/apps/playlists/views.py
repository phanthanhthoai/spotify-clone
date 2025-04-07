from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from apps.playlists.models import Playlist
from apps.songs.models import Song
from .serializers import PlaylistSerializer
from apps.songs.serializers import SongSerializer

class PlaylistViewSet(viewsets.ModelViewSet):
     serializer_class = PlaylistSerializer
     permission_classes = [permissions.IsAuthenticated]

     def get_queryset(self):
          return Playlist.objects.filter(user=self.request.user)

     def perform_create(self, serializer):
          serializer.save(user=self.request.user)

     # Custom action để thêm/xóa bài hát
     @action(detail=True, methods=['post', 'delete'], url_path='songs/(?P<song_id>\d+)')
     def manage_song(self, request, pk=None, song_id=None):
          playlist = self.get_object()
          song = get_object_or_404(Song, id=song_id)

          if request.method == 'POST':
               if playlist.songs.filter(id=song.id).exists():
                    return Response(
                         {"error": "Song already in playlist"}, 
                         status=status.HTTP_400_BAD_REQUEST
                    )
               playlist.songs.add(song)
               return Response(
                    {"message": "Song added"}, 
                    status=status.HTTP_200_OK
               )

          elif request.method == 'DELETE':
               if not playlist.songs.filter(id=song.id).exists():
                    return Response(
                         {"error": "Song not in playlist"}, 
                         status=status.HTTP_400_BAD_REQUEST
                    )
               playlist.songs.remove(song)
               return Response(
                    {"message": "Song removed"}, 
                    status=status.HTTP_204_NO_CONTENT
               )
     @action(detail=True, methods=['get'], url_path='songs')
     def list_songs(self, request, pk=None):
          playlist = self.get_object()
          songs = playlist.songs.all()
          serializer = SongSerializer(songs, many=True)
          return Response(serializer.data, status=status.HTTP_200_OK)
     @action(detail=False, methods=['get'], url_path='lastlist')
     def get_last_playlist(self, request):
          # Kiểm tra user đã đăng nhập
          if not request.user.is_authenticated:
               return Response(
                    {"error": "Authentication required"},
                    status=status.HTTP_401_UNAUTHORIZED
               )

          # Lấy playlist mới nhất, trả về 404 nếu không có
          queryset = self.get_queryset().order_by('-created_at')
          last_playlist = get_object_or_404(queryset)
          
          serializer = PlaylistSerializer(last_playlist)
          return Response(serializer.data)