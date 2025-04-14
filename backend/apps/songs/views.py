from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from utils.api_response import ApiResponse
from utils.exceptions import ValidationException
from .models import Song
from .serializers import SongSerializer, SongCreateRequestSerializer, SongUpdateRequestSerializer
from rest_framework.decorators import action
from apps.songs.services import SongService
from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Song
from .serializers import SongSerializer
from .filters import SongFilter

class SongViewSet(viewsets.ViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = SongFilter
    search_fields = ['title', 'artist']

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.s_service = SongService()

    def list(self, request):
        paginated = self.s_service.list(request.GET, request)
        return ApiResponse.build(data=paginated.get_paginated_response(SongSerializer))
    
    @action(methods=['get'], detail=False, url_path='all')
    def get_list(self, request):
        songs = self.get_queryset()
        serializer = self.get_serializer(songs, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        song = self.s_service.get_song(pk);
        return ApiResponse.build(data=SongSerializer(song).data)

    def create(self, request):
        serializer = SongCreateRequestSerializer(data=request.data)

        if not serializer.is_valid():
            raise ValidationException(serializer.errors)

        return ApiResponse.build(SongSerializer(self.s_service.create_song(serializer.data)).data)
    

    @action(methods=['put'], detail=True, url_path='update')
    def update(self, request, pk=None):
        serializer = SongUpdateRequestSerializer(data=request.data)
        if not serializer.is_valid():
            raise ValidationException(serializer.errors)

        return ApiResponse.build(SongSerializer(self.s_service.update_song(pk, serializer.data)).data)

    def destroy(self, request, pk=None):
        result = self.s_service.delete_song(pk)
        return ApiResponse.build(data=result)
