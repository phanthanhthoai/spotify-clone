from apps.albums.models import Album, AlbumSong
from utils.exceptions import NotFoundException
from apps.albums.filters import AlbumFilter
from apps.base_service  import BaseService
from apps.songs.models import Song
from rest_framework.response import Response

class AlbumService(BaseService):
    
    model_class = Album
    filter_class = AlbumFilter
    model_AlbumSong_class = AlbumSong
    model_Song_class = Song
    
    def get_album(self, pk):
        album = Album.objects.filter(pk=pk).first()
        if not album:
            raise NotFoundException('Album not found')
        
        return album
    def update_album(self, pk, data):
        album = self.get_album(pk)
        if not album:
            raise NotFoundException('Album not found')
        
        for key, value in data.items():
            setattr(album, key, value)
        album.save()
        
        return album
    def delete_album(self, pk):
        album = self.get_album(pk)
        if not album:
            raise NotFoundException('Album not found')
        
        album.delete()
    def create_album(self, data):
        album = Album.objects.create(**data)
        return album
    def get_albums_by_artist(self, artist_id):
        albums = Album.objects.filter(artist_id=artist_id)
        if not albums:
            raise NotFoundException('No albums found for this artist')
        
        return albums
    def add_song_to_album(self, album_id, song_id):
        album = self.get_album(album_id)
        if not album:
            raise NotFoundException('Album not found')
        
        song = self.model_Song_class.objects.filter(id=song_id).first()
        if not song:
            raise NotFoundException('Song not found')
        if self.model_AlbumSong_class.objects.filter(album=album, song=song).exists():
            raise NotFoundException('Bài hát đã có trong album!')
        album_song = self.model_AlbumSong_class.objects.create(album=album, song=song)
        return Response ({'message':'Bài hát đã được thêm vào album!'})

    def remove_song_from_album(self, album_id, song_id):
        album = self.get_album(album_id)
        if not album:
            raise NotFoundException('Album not found')
        
        song = self.model_Song_class.objects.filter(id=song_id).first()
        if not song:
            raise NotFoundException('Song not found')
        
        album_song = self.model_AlbumSong_class.objects.filter(album=album, song=song).first()
        if not album_song:
            raise NotFoundException('Song not found in this album')
        
        album_song.delete()
        return Response({'message': 'Bài hát đã được xóa khỏi album!'})
    def get_song_in_album(self, album_id):
        album = self.get_album(album_id)
        if not album:
            raise NotFoundException('Album not found')
        
        songs = self.model_AlbumSong_class.objects.filter(album=album).select_related('song')
        return songs
    