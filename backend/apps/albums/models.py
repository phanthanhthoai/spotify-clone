from django.db import models

class Album(models.Model):
    title = models.CharField(max_length=255)  # Tiêu đề album
    artist = models.CharField(max_length=255, null=True, blank=True)  # Nghệ sĩ
    release_date = models.DateField(blank=True, null=True)  # Ngày phát hành
    cover_image = models.ImageField(upload_to='album_covers/', blank=True, null=True)  # Ảnh bìa album

    def __str__(self):
        return self.title
