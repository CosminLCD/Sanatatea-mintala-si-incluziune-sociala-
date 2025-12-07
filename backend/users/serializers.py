from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        # Aici listăm câmpurile pe care React are voie să le vadă
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_patient', 'is_specialist', 'is_ong']