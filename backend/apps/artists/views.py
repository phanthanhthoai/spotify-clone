from rest_framework.viewsets import ViewSet
from apps.artists.services import ArtistService
from apps.artists.serializers import ArtistSerializer
from apps.artists.serializers import ArtistCreateRequestSerializer
from apps.artists.serializers import UpdateArtistSerializer

from apps.artists.models import Artist
from utils.api_response import ApiResponse
from utils.exceptions import NotFoundException
from rest_framework.decorators import action
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import RetrieveModelMixin
from rest_framework import status

class ArtistViewSet(RetrieveModelMixin, GenericViewSet):
     queryset = Artist.objects.all()
     serializer_class = ArtistSerializer
     def __init__(self, *args, **kwargs):
          super().__init__(*args, **kwargs)
          self.artist_service = ArtistService()
     authentication_classes = [JWTAuthentication]
     permission_classes = [AllowAny]

    # Get all artists (GET /artists/)
     @action(methods=['get'], detail=False, url_path='all')
     def get_all_artist(self, request):
          queryset = self.get_queryset()
          serializer = self.get_serializer(queryset, many=True)
          return Response({
               "message":"Artists retrieved successfully",
               "data":serializer.data},
               status=200
          )

     # Get artist by name (GET /artists/by-name/?name=ArtistName)
     @action(methods=['get'], detail=False, url_path='by-name')
     def get_artist(self, request):
          name = request.query_params.get('name')
          if not name:
               return Response({
               "message":"null"},
               status=400
          )

          artists = Artist.objects.filter(name__iexact=name)  # Changed from get() to filter()
          
          if not artists.exists():
               return Response({
               "message":"null"},
               status=400
          )

          serializer = self.get_serializer(artists, many=True)  # Add many=True for multiple results
          return Response({
               "message":"Artists retrieved successfully",
               "data":serializer.data},
               status=200
          )
     @action(methods=['post'], detail=False, url_path='create')
     def create_artist(self, request):
          serializer = ArtistCreateRequestSerializer(data=request.data)
          if not serializer.is_valid():
               return Response({"message": "Artist not created", "errors": serializer.errors}, status=400)

          artist = ArtistService().create_artist(serializer.validated_data)
          artist_serializer = ArtistSerializer(artist)  # Serialize toàn bộ dữ liệu

          return Response(artist_serializer.data, status=201)

     
     @action(methods=['patch'], detail=True, url_path='update')
     def custom_update(self, request, pk=None):
          instance = self.get_object()
          serializer = self.get_serializer(instance, data=request.data, partial=True)
          serializer.is_valid(raise_exception=True)
          serializer.save()
          return Response(
               {"message": "Artist updated successfully", "data": serializer.data},
               status=200
          )