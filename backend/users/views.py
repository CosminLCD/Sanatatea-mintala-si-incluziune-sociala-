# backend/users/views.py
from rest_framework import generics
from rest_framework.permissions import AllowAny # <--- Import nou
from rest_framework.permissions import IsAuthenticated 
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CustomUser
from .serializers import CustomUserSerializer
from .serializers import ChangePasswordSerializer
from .models import SpecialistProfile, ONGProfile
from .serializers import SpecialistProfileSerializer, ONGProfileSerializer

class UserList(generics.ListCreateAPIView): # <--- Am schimbat din ListAPIView
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny] # <--- Permitem oricui să acceseze (pentru înregistrare)

class CurrentUserView(generics.RetrieveAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated] # Doar cei logați au acces

    def get_object(self):
        # Această funcție magică îi spune lui Django:
        # "Nu căuta în bază după un ID, dă-mi direct utilizatorul care a făcut cererea"
        return self.request.user
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            # Setăm noua parolă
            request.user.set_password(serializer.validated_data['new_password'])
            request.user.save()
            return Response({"detail": "Parola a fost schimbată cu succes!"}, status=status.HTTP_200_OK)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SpecialistApplicationView(generics.CreateAPIView):
    queryset = SpecialistProfile.objects.all()
    serializer_class = SpecialistProfileSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Aici facem legătura magică: Profilul creat aparține utilizatorului logat
        serializer.save(user=self.request.user)

class ONGApplicationView(generics.CreateAPIView):
    queryset = ONGProfile.objects.all()
    serializer_class = ONGProfileSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
class ApprovedSpecialistList(generics.ListAPIView):
    serializer_class = SpecialistProfileSerializer
    permission_classes = [AllowAny] # Oricine poate vedea lista (public)

    def get_queryset(self):
        # AICI trebuie să scriem filtrarea
        return SpecialistProfile.objects.filter(is_verified=True) 

class ApprovedONGList(generics.ListAPIView):
    serializer_class = ONGProfileSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return ONGProfile.objects.filter(is_verified=True)
    
class SpecialistDetailView(generics.RetrieveAPIView):
    queryset = SpecialistProfile.objects.all()
    serializer_class = SpecialistProfileSerializer
    permission_classes = [AllowAny] # Oricine poate vedea detaliile