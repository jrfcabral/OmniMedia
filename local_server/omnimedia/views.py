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
        return Response(exploreDirectoryList(folder_path))

def exploreDirectoryList(path):
    files = list()
    for i, item in enumerate(os.listdir(path)):
        if os.path.isdir(os.path.join(path, item)):
            files.append({"name": item, "is_dir": True, "contents": exploreDirectoryList(os.path.join(path, item))})
        elif os.path.isfile(os.path.join(path, item)):
            files.append({"name": item, "is_dir": False})

    return files
            
def exploreDirectoryDict(path):
    files = dict()
    for i, item in enumerate(os.listdir(path)):
        if os.path.isdir(os.path.join(path, item)):
            files[i] = {"name": item, "is_dir": True, "contents": exploreDirectoryDict(os.path.join(path, item))}
        elif os.path.isfile(os.path.join(path, item)):
            files[i] = {"name": item, "is_dir": False}

    return files





