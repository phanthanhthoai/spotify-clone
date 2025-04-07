from apps.albums.models import Album
from utils.exceptions import NotFoundException
from apps.albums.filters import AlbumFilter

class AlbumService:
    def get_list_albums(self, request):
        queryset = Album.objects.all()
        filtered_queryset = AlbumFilter(request.GET, queryset=queryset).qs
        return filtered_queryset

    def get_album_by_name(self, name):
        albums = Album.objects.filter(title__icontains=name)
        if not albums.exists():
            raise NotFoundException("Album not found")
        return albums

    def get_album(self, pk):
        album = Album.objects.filter(pk=pk).first()
        if not album:
            raise NotFoundException("Album not found")
        return album

    def update_album(self, pk, data):
        album = self.get_album(pk)
        for key, value in data.items():
            setattr(album, key, value)
        album.save()
        return album

    def delete_album(self, pk):
        album = self.get_album(pk)
        album.delete()

    def create_album(self, data):
        return Album.objects.create(**data)
   
    def get_album_by_id(self, pk):
        album = Album.objects.filter(pk=pk).first()
        if not album:
            raise NotFoundException("Album not found")
        return album