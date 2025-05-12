from rest_framework import serializers
from .models import Album
<<<<<<< HEAD
class AlbumSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
=======
from ..songs.serializers import SongSerializer


class AlbumSerializer(serializers.ModelSerializer):
>>>>>>> 680cfb552c8514f344cfbe23cfcd3bdaefd0104c
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
<<<<<<< HEAD
    id = serializers.IntegerField(read_only=True)
    song_id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(source='song.title')
    duration = serializers.CharField(source='song.duration')
    image = serializers.CharField(source='song.image')
    file = serializers.CharField(source='song.file')
    artist = serializers.CharField(source='song.artist')
=======
    title = serializers.CharField(source='song.title', max_length=255)
    image = serializers.ImageField(source='song.image', required=False)
    artist = serializers.CharField(source='song.artist', required=False)
    id = serializers.IntegerField(source="song.id", required=False)


>>>>>>> 680cfb552c8514f344cfbe23cfcd3bdaefd0104c
    class Meta: 
        model = Album
        fields = ['title', 'image', 'artist', 'id']