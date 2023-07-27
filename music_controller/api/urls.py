from django.urls import path
from .views import RoomView
from .views import CreateRoomView

#This is API request endpoint from api/views.py
urlpatterns = [
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
]