from rest_framework import serializers

from apps.artists.models import Artist

class ArtistSerializer(serializers.ModelSerializer):
     class Meta:
          model = Artist
          fields = "__all__"
          
class ArtistCreateRequestSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    birthday = serializers.DateField(required=False)
    country = serializers.CharField(max_length=100, required=False)
    image = serializers.ImageField(required=False)
     
class UpdateArtistSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255, required=False)
    birthday = serializers.DateField(required=False)
    country = serializers.CharField(max_length=100, required=False)
    image = serializers.ImageField(required=False)