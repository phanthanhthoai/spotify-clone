from rest_framework import serializers
from .models import Song

class SongSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=255)
    artist = serializers.CharField(max_length=255)
    # album_id = serializers.CharField(max_length=255, null=True, blank=True)
    genre = serializers.CharField(max_length=255)
    release_date = serializers.DateField()
    duration = serializers.IntegerField()
    file = serializers.FileField(required=True)
    image = serializers.ImageField(required=True)

class SongCreateRequestSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    artist = serializers.CharField(max_length=255)
    # album_id = serializers.CharField(max_length=255, null=True, blank=True)
    genre = serializers.CharField(max_length=255)
    release_date = serializers.DateField()
    file = serializers.FileField(required=True)
    image = serializers.ImageField(required=True)

class SongUpdateRequestSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    artist = serializers.CharField(max_length=255)