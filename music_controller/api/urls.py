from django.urls import path
from .views import CreateRoomView, getRoom, RoomView, JoinRoom

#This is API request endpoint from api/views.py
urlpatterns = [
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', getRoom.as_view()),
    path('join-room', JoinRoom.as_view()),
]