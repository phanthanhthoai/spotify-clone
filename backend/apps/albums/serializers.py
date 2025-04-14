from rest_framework import serializers
from .models import Album
class AlbumSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    artist = serializers.CharField(max_length=255, required=False)
    release_date = serializers.DateField(required=False)
    cover_image = serializers.ImageField(required=False)
    

class AlbumCreateRequestSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    artist = serializers.CharField(max_length=255, required=False)
    release_date = serializers.DateField(required=False)
    cover_image = serializers.ImageField(required=False)
    
    
class UpdateAlbumSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255, required=False)
    artist = serializers.CharField(max_length=255, required=False)
    release_date = serializers.DateField(required=False)
    cover_image = serializers.ImageField(required=False)


class AlbumSongSerializer(serializers.Serializer):
    class Meta: 
        model = Album
        fields = ['album', 'song']