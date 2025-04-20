from apps.base_service import BaseService
from apps.songs.models import Song
from utils.exceptions import NotFoundException
from apps.songs.filters import SongFilter


class SongService(BaseService):
     model_class = Song
     filter_class = SongFilter

     def get_list_songs(self, request):
          queryset = Song.objects.all()
          filter = SongFilter(request, queryset=queryset)
          
          return filter.qs
     
     def get_song(self, pk):
          song = Song.objects.filter(pk=pk).first()
          if not song:
               raise NotFoundException('Song not found')
          
          return song
     
     def update_song(self, pk, data):
          song = self.get_song(pk)
          if not song:
               raise NotFoundException('Song not found')
          
          for key, value in data.items():
               setattr(song, key, value)
          song.save()
          
          return song
     
     def delete_song(self, pk):
          song = self.get_song(pk)
          if not song:
               raise NotFoundException('Song not found')
          
          song.delete()
          
     def create_song(self, data):
          song = Song(**data)
          song.save()
          return song
          