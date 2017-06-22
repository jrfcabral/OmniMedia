from django.shortcuts import render

# Create your views here.
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from omnimedia.auth import OmnimediaAuthentication
from omnimedia.models import Whitelist
from omnimedia.serializers import WhitelistSerializer


class ListWhitelist(APIView):
    authentication_classes = (OmnimediaAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        whitelist = Whitelist.objects.filter(enabled=True).order_by("email")
        serializer = WhitelistSerializer(whitelist, many=True)
        return Response(serializer.data)