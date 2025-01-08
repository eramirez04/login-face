from rest_framework.serializers import ModelSerializer
from apps.posts.models import  Posts


class PostSerilizer(ModelSerializer):
  class Meta:
    model= Posts
    fields = '__all__'