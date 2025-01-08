from django.db import models



class Rol(models.Model):
  
  nombre = models.CharField(max_length=50)
  descripcion = models.CharField(max_length=255)
  created_at = models.DateTimeField(auto_now_add=True)
  
  def __str__(self):
    return self.nombre
