from django.shortcuts import get_object_or_404
from .models import Playlist, PlaylistSong
from apps.songs.models import Song

def add_song_to_playlist(playlist_id, song_id):
    playlist = get_object_or_404(Playlist, id=playlist_id)
    song = get_object_or_404(Song, id=song_id)
    order = PlaylistSong.objects.filter(playlist=playlist).count() + 1
    PlaylistSong.objects.create(playlist=playlist, song=song, order=order)
    return {"message": "Bài hát đã được thêm vào playlist!"}

def remove_song_from_playlist(playlist_id, song_id):
    playlist = get_object_or_404(Playlist, id=playlist_id)
    playlist_song = get_object_or_404(PlaylistSong, playlist=playlist, song_id=song_id)
    playlist_song.delete()
    return {"message": "Bài hát đã được xóa khỏi playlist!"}
