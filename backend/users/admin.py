from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html # <--- Import important pentru afișare HTML
from .models import CustomUser, SpecialistProfile, ONGProfile, ONGGalleryImage

class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Roluri Platformă', {'fields': ('is_patient', 'is_specialist', 'is_ong')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Roluri Platformă', {'fields': ('is_patient', 'is_specialist', 'is_ong')}),
    )

admin.site.register(CustomUser, CustomUserAdmin)

# --- SPECIALIST ---
@admin.register(SpecialistProfile)
class SpecialistProfileAdmin(admin.ModelAdmin):
    # Funcție pentru afișarea pozei
    def miniatura(self, obj):
        if obj.profile_photo:
            return format_html('<img src="{}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%;" />', obj.profile_photo.url)
        return "Fără poză"
    
    miniatura.short_description = "Poză Profil" # Numele coloanei în admin

    list_display = ('miniatura', 'user', 'specialization', 'license_code', 'is_verified')
    list_filter = ('is_verified', 'offers_online')
    search_fields = ('user__username', 'specialization')
    readonly_fields = ('user', 'miniatura') # O adăugăm și în pagina de editare

# --- ONG ---
class ONGGalleryImageInline(admin.TabularInline):
    model = ONGGalleryImage
    extra = 1
    readonly_fields = ('preview_image',)

    def preview_image(self, obj):
        if obj.image:
             return format_html('<img src="{}" style="width: 100px; height: auto;" />', obj.image.url)
        return ""

@admin.register(ONGProfile)
class ONGProfileAdmin(admin.ModelAdmin):
    def logo_preview(self, obj):
        if obj.logo:
            return format_html('<img src="{}" style="width: 50px; height: 50px; object-fit: contain;" />', obj.logo.url)
        return "-"

    logo_preview.short_description = "Logo"

    list_display = ('logo_preview', 'organization_name', 'cui', 'is_verified')
    readonly_fields = ('user', 'logo_preview')
    inlines = [ONGGalleryImageInline]