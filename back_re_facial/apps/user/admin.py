from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


from apps.user.models import User



@admin.register(User)
class UserAdmin(BaseUserAdmin):
  
  fieldsets = (
    (None, {'fields': ('username','password') }),
    ('personal info', {'fields': ('first_name', 'last_name', 'email', 'imagen_registro')}),
  )