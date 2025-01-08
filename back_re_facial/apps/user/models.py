from django.contrib.auth.models import AbstractUser
from django.db.models import ForeignKey, PositiveIntegerField, DateTimeField, EmailField, ImageField
from django.db.models import SET_NULL

#modelo de rol
from apps.roles.models import Rol


class User(AbstractUser):
  edad =  PositiveIntegerField(null=True, blank=True)
  fk_rol = PositiveIntegerField(null=True, blank=True)
  fecha_registro = DateTimeField(auto_now_add=True)
  imagen_registro = ImageField(null=True, blank=True, upload_to='user/registro')
  email = EmailField(unique=True)

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = []

  class Meta:
    ordering = ['-fecha_registro']