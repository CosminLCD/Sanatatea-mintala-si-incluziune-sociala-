# backend/users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # Toți utilizatorii sunt implicit pacienți/vizitatori
    is_patient = models.BooleanField(default=True)
    
    # Acestea vor fi activate (True) doar după aprobarea cererii
    is_specialist = models.BooleanField(default=False)
    is_ong = models.BooleanField(default=False)

    # Putem adăuga aici și alte câmpuri comune, de ex: număr telefon
# ... codul existent (CustomUser) rămâne sus

class SpecialistProfile(models.Model):
    # Legătura cu utilizatorul (OneToOne înseamnă că un user poate avea un singur profil de specialist)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='specialist_profile')
    
    # Detalii Profesionale
    profile_photo = models.ImageField(upload_to='specialists_photos/', blank=True, null=True)
    specialization = models.CharField(max_length=100) # Ex: Psiholog Clinician
    license_code = models.CharField(max_length=50) # Codul de Parafă (pentru validare)
    experience_years = models.IntegerField(default=0) # Vechimea
    description = models.TextField() # Descrierea lungă
    
    # Mod de lucru
    offers_online = models.BooleanField(default=False)
    offers_physical = models.BooleanField(default=False)
    address = models.CharField(max_length=255, blank=True, null=True) # Adresa fizică
    
    # Date de Contact
    phone_number = models.CharField(max_length=20)
    email_public = models.EmailField(blank=True, null=True) # Poate fi diferit de cel de login
    website = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    facebook = models.URLField(blank=True, null=True)
    whatsapp = models.CharField(max_length=20, blank=True, null=True)
    tiktok = models.URLField(blank=True, null=True)

    # Validare (Doar adminul o bifează după verificare)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"Specialist: {self.user.username} - {self.specialization}"

class ONGProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='ong_profile')
    
    # Detalii Organizație
    organization_name = models.CharField(max_length=255)
    cui = models.CharField(max_length=50) # Codul de Identificare Fiscală
    description = models.TextField() # Misiunea și obiectivele
    address = models.CharField(max_length=255)
    website = models.URLField(blank=True, null=True)
    
    # Date de Contact (similare cu specialistul)
    phone_number = models.CharField(max_length=20)
    email_public = models.EmailField(blank=True, null=True)
    facebook = models.URLField(blank=True, null=True)
    instagram = models.URLField(blank=True, null=True) # ONG-urile sunt active des pe Insta
    tiktok = models.URLField(blank=True, null=True)

    logo = models.ImageField(upload_to='ong_logos/', blank=True, null=True)
    
    # Validare
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.organization_name

class ONGGalleryImage(models.Model):
    # Cheia Străină (ForeignKey) face legătura: Multe poze -> Un singur ONG
    ong_profile = models.ForeignKey(ONGProfile, on_delete=models.CASCADE, related_name='gallery_images')
    
    image = models.ImageField(upload_to='ong_gallery/')
    caption = models.CharField(max_length=255, blank=True, null=True) # Descrierea de sub poză
    
    def __str__(self):
        return f"Image for {self.ong_profile.organization_name}"