# backend/users/urls.py
from django.urls import path
from .views import (
     UserList, 
     CurrentUserView,
     ChangePasswordView,
     SpecialistApplicationView,
     ONGApplicationView,
     ApprovedSpecialistList,
     ApprovedONGList,
     SpecialistDetailView
)

urlpatterns = [
    path('users/', UserList.as_view(), name='user-list'),
    path('users/me/', CurrentUserView.as_view(), name='current-user'),
    path('users/change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('apply-specialist/', SpecialistApplicationView.as_view(), name='apply-specialist'),
    path('apply-ong/', ONGApplicationView.as_view(), name='apply-ong'),
    path('specialists/public/', ApprovedSpecialistList.as_view(), name='public-specialists'),
    path('specialists/public/<int:pk>/', SpecialistDetailView.as_view(), name='specialist-detail'),
    path('ongs/public/', ApprovedONGList.as_view(), name='public-ongs'),
]