from rest_framework.viewsets import ModelViewSet
from apps.user.models import User
from apps.user.api.serializer import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import cv2
import numpy as np

class UserModelViewSet(ModelViewSet):
  serializer_class = UserSerializer
  queryset= User.objects.all()
  http_method_names = ['get', 'patch']
  
  

class UserRegister(APIView):
  def post(self, request):
    verficar = Reconocimient()
    
    serializer = UserSerializer(data= request.data)
    
    if serializer.is_valid():
      image = serializer.validated_data.get('imagen_registro')
      if not verficar.verificar_cara(image):
        return Response({"message": "No se detectó ninguna cara en la imagen."}, status=status.HTTP_400_BAD_REQUEST)

      serializer.save()      
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  

class LoginCara(APIView):  
  def post(self, request):    
    username = request.data.get('username')
    
    #imagen que entra del login
    imagen_rostro = request.data.get('imagen_rostro')
    
    try:
      user = User.objects.get(username= username)
      
      serializador = UserSerializer(user)
      user_serializador = serializador.data  
      
      #imagen con la que sede compara
      image_recuperada =  user_serializador['imagen_registro']
      
      return Response(username, status=status.HTTP_200_OK)
      
    except User.DoesNotExist:
      return Response(status=status.HTTP_404_NOT_FOUND, data={'mensaje': 'no se encontro el usuario con username: {}'.format(username)})
    
      

class Reconocimient:
  
  def verificar_cara(self, imagen):
    print("Imagen recibida:", imagen)
    
    image_array = np.frombuffer(imagen.read(), np.uint8)
    
    img = cv2.imdecode(image_array, cv2.COLOR_BGR2GRAY)
    
    gray_imagen = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    face_classifier = cv2.CascadeClassifier(
      cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
    )
    
    face = face_classifier.detectMultiScale(
      gray_imagen, scaleFactor=1.1, minNeighbors=5, minSize=(40, 40))
    
    
    if len(face) == 0:
      print("no hay una cara en la imagen")
      return False
    
    for(x, y, w, h) in face:
      cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 4)
    
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    return True
  
  
  def comparar_facial(self, rostro1, rostro2):
    pass
    