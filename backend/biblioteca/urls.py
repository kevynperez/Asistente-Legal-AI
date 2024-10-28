from django.urls import path
from . import views
from .views import Prueba, Responder

urlpatterns = [
    path('biblioteca/prueba/', Prueba.as_view(), name='biblioteca-prueba'),
    path('responder/', Responder.as_view(), name='responder'),
]