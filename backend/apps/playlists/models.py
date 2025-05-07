from django.db import models
from django.contrib.auth import get_user_model

from apps.base_model import BaseModel
import secrets
# from apps.songs.models import Song
def generate_unique_song_code():
    return secrets.token_urlsafe(16)[:22]

User = get_user_model()

class Playlist(BaseModel):
    name = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=22, unique=True, default=generate_unique_song_code)

    def __str__(self):
        return self.name


class PlaylistSong(models.Model):  # Tên mới
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    song = models.ForeignKey('songs.Song', on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ('playlist', 'song')