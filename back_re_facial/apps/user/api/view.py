from rest_framework.viewsets import ModelViewSet
from apps.user.models import User
from apps.user.api.serializer import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import cv2 as cv
import numpy as np


class UserModelViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    http_method_names = ['get', 'patch']


class UserRegister(APIView):
    def post(self, request):
        verficar = Reconocimient()

        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            image = serializer.validated_data.get('imagen_registro')
            if not verficar.verificar_cara(image):
                return Response({"message": "No se detectó ninguna cara en la imagen."},
                                status=status.HTTP_400_BAD_REQUEST)

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginCara(APIView):
    def post(self, request):
        username = request.data.get('username')

        # imagen que entra del login
        img_face = request.data.get('img_face')
        print(img_face)

        # verificamos que la imagen contenga una cara

        verificar = Reconocimient()
        if not verificar.verificar_cara(img_face):
            return Response({"mensaje": "No se detecto la cara"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(username=username)

            serializador = UserSerializer(user)
            user_serializador = serializador.data

            if user_serializador is not None:
                image_recuperada = user_serializador['imagen_registro']
                # aqui se maneja toda la logica para compara las caras

                print(verificar.comparar_facial(image_recuperada, img_face))


                # si esta funcionando
                # print(image_recuperada)
                return Response(user_serializador, status=status.HTTP_200_OK)

            # imagen con la que sede compara

            return Response(username, status=status.HTTP_400_BAD_REQUEST)

        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND,
                            data={'mensaje': 'no se encontro el usuario con username: {}'.format(username)})


class Reconocimient:

    def verificar_cara(self, imagen):
        print("Imagen recibida:", imagen)
        image_array = np.frombuffer(imagen.read(), np.uint8)
        img = cv.imdecode(image_array, cv.IMREAD_GRAYSCALE)
        gray_imagen = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
        face_classifier = cv.CascadeClassifier(
            cv.data.haarcascades + "haarcascade_frontalface_default.xml"
        )

        face = face_classifier.detectMultiScale(
            gray_imagen, scaleFactor=1.1, minNeighbors=5, minSize=(40, 40))

        if len(face) == 0:
            print("no hay una cara en la imagen")
            return False

        for (x, y, w, h) in face:
            cv.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 4)


        return True

    def comparar_facial(self, rostro1, rostro2):
        image1 = cv.imread(rostro1)
        image2 = cv.imread(rostro2)

        print(image1, image2)


    def escala_gris(self, imagen):
        img = cv.imdecode(imagen, cv.COLOR_BGR2GRAY)
        return cv.cvtColor(img, cv.COLOR_BGR2GRAY)


