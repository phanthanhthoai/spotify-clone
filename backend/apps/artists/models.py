from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

class Artist(models.Model):
    name = models.CharField(max_length=255)
    birthday = models.DateField(null=True, blank=True)
    country = models.CharField(max_length=100)
    image = models.ImageField(upload_to='artists/', null=True, blank=True)

    groups = models.ManyToManyField(
        Group,
        related_name="artist_groups",  # Đổi tên liên kết
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="artist_permissions",  # Đổi tên liên kết
        blank=True
    )

    class Meta:
        ordering = ['name']
        verbose_name = "Nghệ sĩ"
        verbose_name_plural = "Danh sách nghệ sĩ"

    def __str__(self):
        return self.name
