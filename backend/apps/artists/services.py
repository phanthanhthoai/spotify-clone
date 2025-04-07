from apps.artists.models import Artist
from utils.exceptions import NotFoundException
from apps.artists.filters import ArtistFilter
from apps.artists.models import Artist



class ArtistService:
     def get_list_artist(self, request):
          queryset = Artist.objects.all()
          filter = ArtistFilter(request, queryset=queryset)
          
          return filter.qs
     
     def get_artist(self, pk):
          artist = Artist.objects.filter(pk=pk).first()
          if not artist:
               raise NotFoundException('Artist not found')
          
          return artist
     
     def update_artist(self, pk, data):
          artist = self.get_artist(pk)
          if not artist:
               raise NotFoundException('Artist not found')
          
          for key, value in data.items():
               setattr(artist, key, value)
          artist.save()
          
          return artist
     
     def delete_artist(self, pk):
          artist = self.get_artist(pk)
          if not artist:
               raise NotFoundException('Artist not found')
          
          artist.delete()
          
     def create_artist(self, data):
          artist = Artist.objects.create(**data)
          return artist