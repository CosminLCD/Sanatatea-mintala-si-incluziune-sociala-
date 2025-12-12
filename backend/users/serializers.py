from rest_framework import serializers
from .models import CustomUser, SpecialistProfile, ONGProfile, ONGGalleryImage

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

# backend/users/serializers.py

# ... (Codul vechi rămâne sus)

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Parola veche este incorectă.")
        return value

class SpecialistProfileSerializer(serializers.ModelSerializer):
    # Aici "furăm" datele din tabela User
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    class Meta:
        model = SpecialistProfile
        fields = '__all__'
        # Aceste câmpuri nu le cerem în formular, le completăm noi automat
        read_only_fields = ['user', 'is_verified']

class ONGProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ONGProfile
        fields = '__all__'
        read_only_fields = ['user', 'is_verified']

class ONGGalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ONGGalleryImage
        fields = ['id', 'image', 'caption', 'ong_profile']