from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        # 1. Adăugăm 'password' în listă ca să fie acceptată
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'is_patient', 'is_specialist', 'is_ong']
        
        # 2. Securitate: Parola este 'write_only' (o putem scrie, dar API-ul nu o va arăta niciodată înapoi)
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # 3. Interceptăm procesul de creare pentru a cripta parola
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data) # Creăm utilizatorul cu restul datelor
        
        if password is not None:
            instance.set_password(password) # Aici se întâmplă magia (Hasing/Criptare)
        
        instance.save()
        return instance