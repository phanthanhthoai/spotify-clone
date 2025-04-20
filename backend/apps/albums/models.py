from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Album(models.Model):
    title = models.CharField(max_length=255)  # Tiêu đề album
    artist = models.CharField(max_length=255, null=True, blank=True)  # Nghệ sĩ
    release_date = models.DateField(blank=True, null=True)  # Ngày phát hành
    cover_image = models.ImageField(upload_to='albumcovers/', blank=True, null=True)  # Ảnh bìa album
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True, blank=True)  # Người dùng sở hữu album

    def __str__(self):
        return self.title

class AlbumSong(models.Model):
    album = models.ForeignKey(Album, related_name='songs', on_delete=models.CASCADE)
    song = models.ForeignKey('songs.Song', related_name='albums', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('album', 'song')