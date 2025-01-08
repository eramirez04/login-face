from rest_framework.serializers import ModelSerializer
from apps.user.models import User


class UserSerializer(ModelSerializer):
  class Meta:
    model = User  
    fields = ['id','username', 'first_name', 'last_name','edad','email','fk_rol', 'imagen_registro']