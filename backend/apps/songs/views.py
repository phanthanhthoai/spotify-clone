from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Song
from .serializers import SongSerializer
from rest_framework.decorators import action
from apps.songs.services import SongService
from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Song
from .serializers import SongSerializer
from .filters import SongFilter

class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = SongFilter
    search_fields = ['title', 'artist']
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.s_service = SongService()
    
    @action(methods=['get'], detail=False, url_path='all')
    def get_list(self, request):
        songs = self.get_queryset()
        serializer = self.get_serializer(songs, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            song = self.get_queryset().get(pk=pk)
            serializer = self.get_serializer(song)
            return Response(serializer.data)
        except Song.DoesNotExist:
            return Response({"error": "Bài hát không tồn tại"}, status=status.HTTP_404_NOT_FOUND)
    @action(methods=['post'], detail=False, url_path='create')
    def create_song(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    

    @action(methods=['patch'], detail=True, url_path='update')
    def update_song(self, request, pk=None):
        try:
            song = self.get_queryset().get(pk=pk)
            serializer = self.get_serializer(song, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Song.DoesNotExist:
            return Response({"error": "Bài hát không tồn tại"}, status=status.HTTP_404_NOT_FOUND)

    def get_song(request, id):
        # Lấy bài hát theo ID hoặc trả lỗi 404
        song = get_object_or_404(Song, id=id)

        # Trả về JSON chứa thông tin bài hát
        return JsonResponse({
            "id": song.id,
            "title": song.title,
            "artist": song.artist,  # Giả sử có model Artist
            "image": song.image.url if song.image else None,
            "audio_url": song.file,  # Đường dẫn file nhạc
            "duration": song.duration,  # Thời lượng bài hát (giả sử có field này)
        })

    def destroy(self, request, pk=None):
        try:
            song = self.get_queryset().get(pk=pk)
            song.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Song.DoesNotExist:
            return Response({"error": "Bài hát không tồn tại"}, status=status.HTTP_404_NOT_FOUND)
