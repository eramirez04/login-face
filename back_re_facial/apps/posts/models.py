from django.db.models import Model, CharField, TextField, IntegerField, DateTimeField

# Create your models here.


class Posts(Model):
  title = CharField(max_length=255)
  description = TextField()
  order = IntegerField()
  created_ad  = DateTimeField(auto_now_add=True)
  
  def __str__(self):
    return self.title