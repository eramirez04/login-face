from rest_framework.routers import DefaultRouter
from apps.posts.api.view import PostViewSets


post_router = DefaultRouter()
post_router.register(prefix='posts', basename='posts',viewset=PostViewSets)