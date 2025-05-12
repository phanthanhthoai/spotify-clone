from rest_framework import serializers
from .models import Playlist, PlaylistSong
from apps.songs.models import Song
from apps.authentications.views import AuthViewSet
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
    title = serializers.CharField(max_length=255)
    artist = serializers.CharField(max_length=255)
    genre = serializers.CharField(max_length=255)
    release_date = serializers.DateField()
    duration = serializers.IntegerField()
    file = serializers.FileField(required=True)
    image = serializers.ImageField(required=True)
    
    class Meta:
        model = PlaylistSong
        fields = ['id','artist','genre','release_date','duration','file','image']