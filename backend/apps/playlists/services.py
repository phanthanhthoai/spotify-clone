from django.shortcuts import get_object_or_404
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

    
    def create_playlist(self,data, user):
        data['user'] = user
        playlist = Playlist.objects.create(**data)
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
            return {"message": "Bài hát đã có trong playlist!"}
        
        PlaylistSong.objects.create(playlist=playlist, song=song)
        return Response ({"message": "Bài hát đã được thêm vào playlist!"})

    def remove_song_from_playlist(self, playlist_id, song_id):
        playlist = get_object_or_404(Playlist, id=playlist_id)
        song = get_object_or_404(Song, id=song_id)
        
        playlist_song = get_object_or_404(PlaylistSong, playlist=playlist, song=song)
        playlist_song.delete()
        return Response({"message": "Bài hát đã được xóa khỏi playlist!"})
