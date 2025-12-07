# backend/users/views.py
from rest_framework import generics
from rest_framework.permissions import AllowAny # <--- Import nou
from .models import CustomUser
from .serializers import CustomUserSerializer

class UserList(generics.ListCreateAPIView): # <--- Am schimbat din ListAPIView
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny] # <--- Permitem oricui să acceseze (pentru înregistrare)