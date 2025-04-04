from rest_framework import viewsets
from apps.posts.api.serializador import PostSerilizer
from apps.posts.models import Posts

class PostViewSets(viewsets.ModelViewSet):
  queryset = Posts.objects.all()
  serializer_class= PostSerilizer
  http_method_names = ['post','get']
  
  
