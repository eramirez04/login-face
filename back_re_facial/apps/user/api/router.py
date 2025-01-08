from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)
from apps.user.api.view import UserModelViewSet, UserRegister, LoginCara


router_usuario = DefaultRouter()
router_usuario.register('user',UserModelViewSet)


urlpatterns = [
  path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('', include(router_usuario.urls)),
  path('user/register', UserRegister.as_view()),
  path('login/cara/', LoginCara.as_view())
]