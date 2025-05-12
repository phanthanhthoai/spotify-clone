from rest_framework import serializers
from .models import Album
from ..songs.serializers import SongSerializer


class AlbumSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=255)
    artist = serializers.CharField(max_length=255, required=False)
    release_date = serializers.DateField(required=False)
    cover_image = serializers.ImageField(required=False)

    class Meta:
        model = Album
        fields = "__all__"
    

class AlbumCreateRequestSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    artist = serializers.IntegerField()
    release_date = serializers.DateField(required=False)
    cover_image = serializers.ImageField(required=False)
    
    
class UpdateAlbumSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255, required=False)
    artist = serializers.CharField(max_length=255, required=False)
    release_date = serializers.DateField(required=False)
    cover_image = serializers.ImageField(required=False)


class AlbumSongSerializer(serializers.Serializer):
    title = serializers.CharField(source='song.title', max_length=255)
    image = serializers.ImageField(source='song.image', required=False)
    artist = serializers.CharField(source='song.artist', required=False)
    id = serializers.IntegerField(source="song.id", required=False)


    class Meta: 
        model = Album
        fields = ['title', 'image', 'artist', 'id']