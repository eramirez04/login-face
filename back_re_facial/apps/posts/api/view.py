from rest_framework import viewsets
from apps.posts.api.serializador import PostSerilizer
from apps.posts.models import Posts

class PostViewSets(viewsets.ModelViewSet):
  queryset = Posts.objects.all()
  serializer_class: PostSerilizer
  http_method_names = ['post','get']
  
  
  def get_serializer_class(self):
    if getattr(self, 'swagger_fake_view', False):
      return PostSerilizer
    return super().get_serializer_class()