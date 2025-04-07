from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import AllowAny
from rest_framework import status

from apps.albums.models import Album
from apps.albums.serializers import AlbumSerializer, AlbumCreateRequestSerializer, UpdateAlbumSerializer
from apps.albums.services import AlbumService

class AlbumViewSet(RetrieveModelMixin, GenericViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.album_service = AlbumService()

    # Lấy tất cả albums (GET /albums/all/)
    @action(methods=['get'], detail=False, url_path='all')
    def get_all_albums(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "message": "Albums retrieved successfully",
            "data": serializer.data
        }, status=200)

    # Lấy album theo tên (GET /albums/by-name/?name=AlbumName)
    @action(methods=['get'], detail=False, url_path='by-name')
    def get_album_by_name(self, request):
     name = request.query_params.get('name', '')

     if not name:
         return Response({"message": "Vui lòng nhập tên album"}, status=400)

     albums = Album.objects.filter(title__icontains=name)  # Tìm kiếm gần đúng


     if not albums.exists():
         return Response({"message": "Không tìm thấy album nào"}, status=404)

     serializer = self.get_serializer(albums, many=True)
     return Response({
         "message": "Albums retrieved successfully",
         "data": serializer.data 
     }, status=200)
    # Tạo album mới (POST /albums/create/)
    @action(methods=['post'], detail=False, url_path='create')
    def create_album(self, request):
        serializer = AlbumCreateRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({"message": "Album not created", "errors": serializer.errors}, status=400)

        album = AlbumService().create_album(serializer.validated_data)
        album_serializer = AlbumSerializer(album)

        return Response(album_serializer.data, status=201)

    # Cập nhật album (PATCH /albums/update/{id}/)
    @action(methods=['patch'], detail=True, url_path='update')
    def update_album(self, request, pk=None):
        instance = self.get_object()
        serializer = UpdateAlbumSerializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {"message": "Album updated successfully", "data": serializer.data},
            status=200
        )
