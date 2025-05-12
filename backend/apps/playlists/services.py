from django.shortcuts import get_object_or_404

from utils.exceptions import ValidationException
from .models import Playlist, PlaylistSong
from apps.songs.models import Song
from apps.base_service import BaseService
from .filters import PlaylistFilter
from rest_framework.response import Response
class PlaylistService(BaseService):
    filter_class = PlaylistFilter
    model_class = Playlist
    model_class_song = PlaylistSong
    
    def get_playlist(self,playlist_id):
        return get_object_or_404(Playlist, id=playlist_id)

    
    def get_playlists(self):
        return Playlist.objects.all()

    def create_playlist(self, data, user):
        data['owner'] = user
        playlist = Playlist.objects.create(**data)

        playlist.name = "Danh sách phát của tôi #" + str(playlist.id)
        playlist.save()
        return playlist

    
    def update_playlist(self,playlist_id, name=None):
        playlist = get_object_or_404(Playlist, id=playlist_id)
        if name:
            playlist.name = name
        playlist.save()
        return playlist

    def get_songs_in_playlist(self, playlist_id):
        playlist = get_object_or_404(Playlist, id=playlist_id)
        songs = PlaylistSong.objects.filter(playlist=playlist).select_related('song')
        return songs
    
    def delete_playlist(self,playlist_id):
        playlist = get_object_or_404(Playlist, id=playlist_id)
        playlist.delete()
        return {"message": "Playlist đã được xóa thành công!"}
    
    
    def add_song_to_playlist(self, playlist_id, song_id):
        playlist = get_object_or_404(Playlist, id=playlist_id)
        song = get_object_or_404(Song, id=song_id)
        if PlaylistSong.objects.filter(playlist=playlist, song=song).exists():
            raise ValidationException("Bài hát đã tồn tại trong playlist")
        
        PlaylistSong.objects.create(playlist=playlist, song=song)
        return playlist


    def remove_song_from_playlist(self, playlist_id, song_id):
        playlist = get_object_or_404(Playlist, id=playlist_id)
        song = get_object_or_404(Song, id=song_id)
        
        playlist_song = get_object_or_404(PlaylistSong, playlist=playlist, song=song)
        playlist_song.delete()
        return Response({"message": "Bài hát đã được xóa khỏi playlist!"})

    def get_user_playlists(self, user, query_params):
        base_queryset = self.model_class.objects.filter(owner_id=user.id)
        filter_set = self.filter_class(query_params, queryset=base_queryset)
        return filter_set.qs.order_by('created_at')


    def get_by_code(self, code):
        playlist = Playlist.objects.filter(code=code).first()
        return playlist