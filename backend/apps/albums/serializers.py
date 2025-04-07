from rest_framework import serializers
from .models import Album
from apps.songs.models import Song
from apps.songs.serializers import SongSerializer
class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = '__all__'

class AlbumSerializer(serializers.ModelSerializer):
    songs = SongSerializer(many=True, read_only=True)  # Lấy danh sách bài hát của album

    class Meta:
        model = Album
        fields = '__all__'

class AlbumCreateRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ['title', 'artist', 'release_date', 'cover_image']
class UpdateAlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ['title', 'release_date'] 