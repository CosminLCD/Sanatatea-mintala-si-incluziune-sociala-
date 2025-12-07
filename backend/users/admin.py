# backend/users/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    # Definim structura paginii de editare utilizator
    # Păstrăm tot ce are Django standard (UserAdmin.fieldsets) și adăugăm secțiunea noastră
    fieldsets = UserAdmin.fieldsets + (
        ('Roluri Platformă', {'fields': ('is_patient', 'is_specialist', 'is_ong')}),
    )
    
    # Facem același lucru și pentru pagina de creare utilizator nou
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Roluri Platformă', {'fields': ('is_patient', 'is_specialist', 'is_ong')}),
    )

# Înregistrăm modelul folosind configurația noastră personalizată
admin.site.register(CustomUser, CustomUserAdmin)