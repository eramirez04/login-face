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

## "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTczNzc4Mjc5MiwiaWF0IjoxNzM3MTc3OTkyLCJqdGkiOiI5ZjQ2YTAxM2RkYzc0NzMxOTY5M2FiMjAzYWM2NWY0ZSIsInVzZXJfaWQiOjJ9.Zh5A3bLXMd54aCfXXeQruliyMUPqdlUnBNWUWHURQFM",
 ##   "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM3MjY0MzkyLCJpYXQiOjE3MzcxNzc5OTIsImp0aSI6ImE5OWJlNmQwMTliYjQ2OGZiZDRiZDliZWRiYjcwZjQxIiwidXNlcl9pZCI6Mn0.QvN_LRUcLoA0Tosmg5YUZ20QlsBP-kcDN3WSgTc49z4"
####