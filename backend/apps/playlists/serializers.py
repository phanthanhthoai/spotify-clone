from rest_framework import serializers
from .models import Playlist, PlaylistSong
from apps.songs.models import Song
from apps.authentications.views import AuthViewSet

class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = ['id', 'name', 'created_at', 'user']
        read_only_fields = ['user', 'created_at']  # Tự động gán user và thời gian
class PlaylistCreateRequestSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    image = serializers.ImageField(required=False)
    
class PlaylistUpdateRequestSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255, required=False)
    image = serializers.ImageField(required=False)

class PlaylistSongSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='song.title')
    duration = serializers.CharField(source='song.duration')

    class Meta:
        model = PlaylistSong
        fields = ['id','song_id', 'title', 'duration']