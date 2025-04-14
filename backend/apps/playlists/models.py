from django.db import models
from django.contrib.auth import get_user_model
# from apps.songs.models import Song

User = get_user_model()

class Playlist(models.Model):
    name = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class PlaylistSong(models.Model):  # Tên mới
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    song = models.ForeignKey('songs.Song', on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ('playlist', 'song')