from django.db import models
from django.contrib.auth import get_user_model
# from apps.songs.models import Song

User = get_user_model()

class Playlist(models.Model):
    name = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    songs = models.ManyToManyField(
        'songs.Song',
        related_name='playlist_songs',
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def add_song(self, song):
        if not self.songs.filter(id=song.id).exists():
            self.songs.add(song)
            return True
        return False

    def remove_song(self, song):
        if self.songs.filter(id=song.id).exists():
            self.songs.remove(song)
            return True
        return False