from django.db.models import Avg
from django.core.paginator import Paginator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from ..models import Cliente, Amigo, solicitud_alquiler, Calificacion 
from ..serializers.solicitud_alquiler_serializer import solicitud_alquiler, SolicitudAlquilerSerializer
from rest_framework import viewsets
from ..models.solicitud_alquilerDB import solicitud_alquiler
from ..serializers.solicitud_alquiler_serializer import SolicitudAlquilerSerializer
from ..serializers.login_serializer import LoginSerializer

from datetime import date

class LoginView(APIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            try:
                user = Cliente.objects.get(usuario=serializer.data['usuario'])
                if user.contrasena == serializer.data['contrasena']:
                    return Response({"id": user.cliente_id}, status=status.HTTP_200_OK)
                else:
                    return Response({"id": "0"}, status=status.HTTP_404_NOT_FOUND)
            except Cliente.DoesNotExist:
                return Response({"id": "0"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"errors":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
