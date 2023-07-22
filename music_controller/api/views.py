from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .serializers import RoomSerializer
from .models import Room

# Create your views here.
class RoomView(generics.CreateAPIView): #ListAPIView gives list of room instead of post data
    queryset = Room.objects.all()
    serializer_class = RoomSerializer