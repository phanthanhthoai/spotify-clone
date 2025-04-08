from rest_framework import serializers
from .models import Song

class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = '__all__'

class SongCreateRequestSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    artist = serializers.CharField(max_length=255)
    # album_id = serializers.CharField(max_length=255, null=True, blank=True)
    genre = serializers.CharField(max_length=255)
    release_date = serializers.DateField()
    duration = serializers.IntegerField()
    # file = serializers.FileField(upload_to='songs/')
    # image = serializers.FileField(upload_to='songs/image/', null=True)

class SongUpdateRequestSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    artist = serializers.CharField(max_length=255)