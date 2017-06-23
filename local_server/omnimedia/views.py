from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from omnimedia.auth import OmnimediaAuthentication
from omnimedia.models import Whitelist, MediaFolder
from omnimedia.serializers import WhitelistSerializer, MediaFolderSerializer


class ListWhitelist(APIView):
    authentication_classes = (OmnimediaAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        whitelist = Whitelist.objects.filter(enabled=True).order_by("email")
        serializer = WhitelistSerializer(whitelist, many=True)
        return Response(serializer.data)

class MediaFolderView(APIView):
    authentication_classes = (OmnimediaAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        mediaFolders = MediaFolder.objects.all()
        serializer = MediaFolderSerializer(mediaFolders, many=True)
        return Response(serializer.data)
    def post(self, request, format=None):
        serializer = MediaFolderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
