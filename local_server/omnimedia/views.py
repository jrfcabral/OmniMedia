import os
from rest_framework import permissions, status, mixins
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from omnimedia.auth import OmnimediaAuthentication
from omnimedia.models import Whitelist, MediaFolder
from omnimedia.serializers import WhitelistSerializer, MediaFolderSerializer, FileInfoSerializer
import json


class ListWhitelist(APIView):
    authentication_classes = (OmnimediaAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        whitelist = Whitelist.objects.filter(enabled=True).order_by("email")
        serializer = WhitelistSerializer(whitelist, many=True)
        return Response(serializer.data)

class MediaFolderView(viewsets.ModelViewSet):
    authentication_classes = (OmnimediaAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = MediaFolderSerializer
    queryset =MediaFolder.objects.all()

class FileView(APIView):
    authentication_classes = (OmnimediaAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, **kwargs):
        folder_id = kwargs['folder']
        folder = MediaFolder.objects.get(id=folder_id)
        folder_path = folder.path

        exploreDirectory(folder_path)
        #serializer = FileInfoSerializer(files, many=True)
        #return Response(serializer.data)
        return Response(exploreDirectory(folder_path))

def exploreDirectory(path):
    files = dict()
    for i, item in enumerate(os.listdir(path)):
        if os.path.isdir(os.path.join(path, item)):
            files[i] = {"name": item, "is_dir": True, "contents": exploreDirectory(os.path.join(path, item))}
        elif os.path.isfile(os.path.join(path, item)):
            files[i] = {"name": item, "is_dir": False}

    return files
            





