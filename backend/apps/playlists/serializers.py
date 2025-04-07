from rest_framework import serializers
from .models import Playlist

class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = ['id', 'name', 'songs', 'created_at', 'user']
        read_only_fields = ['user', 'created_at']  # Tự động gán user và thời gian