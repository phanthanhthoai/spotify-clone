from apps.albums.models import Album
from utils.models import BaseModel
from django.db import models
# from apps.playlists.models import Playlist

class Song(BaseModel):
     title = models.CharField(max_length=255)
     artist = models.CharField(max_length=255)
     album_id = models.CharField(max_length=255, null=True, blank=True)
     genre = models.CharField(max_length=255)
     release_date = models.DateField()
     duration = models.PositiveIntegerField()
     file = models.FileField(upload_to='songs/')
     image = models.ImageField(upload_to='songs/image/',null=True)
     
     class Meta:
          db_table = 'song'
          verbose_name = 'Song'
          verbose_name_plural = 'Songs'
     
     def __str__(self):
          return self.title