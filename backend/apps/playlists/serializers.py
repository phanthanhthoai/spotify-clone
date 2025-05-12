from rest_framework import serializers
from .models import Playlist, PlaylistSong
from apps.songs.models import Song
from apps.authentications.views import AuthViewSet
from ..songs.serializers import SongSerializer
from ..users.serializers import UserSerializer



class PlaylistSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)

    class Meta:
        model = Playlist
        fields = ['id', 'name', 'created_at', 'owner', 'code', 'image']

class PlaylistDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Playlist
        fields = ['id', 'name', 'created_at', 'code', 'image']


class PlaylistCreateRequestSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255, required=False)
    image = serializers.ImageField(required=False)


class PlaylistUpdateRequestSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255, required=False)
    image = serializers.ImageField(required=False)

class PlaylistSongSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source="song.title", required=False)
    duration = serializers.CharField(source="song.duration", required=False)
    id = serializers.IntegerField(source="song.id", required=False)
    image = serializers.ImageField(source="song.image", required=False)
    file = serializers.FileField(source="song.file", required=False)

    class Meta:
        model = PlaylistSong
        fields = ['title', 'duration', 'id', 'image', 'file']