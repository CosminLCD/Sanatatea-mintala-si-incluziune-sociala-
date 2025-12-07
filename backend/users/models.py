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