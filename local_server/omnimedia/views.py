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
    authentication_classes = ()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = MediaFolderSerializer
    queryset =MediaFolder.objects.all()

class FileView(APIView):
    authentication_classes = (OmnimediaAuthentication,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get(self, request, **kwargs):
        folder_id = kwargs['folder']
        folder = MediaFolder.objects.get(id=folder_id)
        folder_path = folder.path
        return Response(exploreDirectoryList(folder_path))

class FileDownload(APIView):
    authentication_classes = ()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get(self, request, **kwargs):
        response = Response()
        folder_id = kwargs['folder']
        folder_path = MediaFolder.objects.get(id=folder_id).path
        file_path = "/".join((folder_path + "/"+ kwargs['path']).split('/')[1:])
        response['X-Accel-Redirect'] = '/protected_files/'+file_path
        response['X-Accel-Buffering'] = False
        response['Content-Type'] = 'audio/mpeg'
        return response

def exploreDirectoryList(path):
    files = list()
    for i, item in enumerate(os.listdir(path)):
        if os.path.isdir(os.path.join(path, item)):
            files.append({"name": item, "is_dir": True, "contents": exploreDirectoryList(os.path.join(path, item))})
        elif os.path.isfile(os.path.join(path, item)):
            files.append({"name": item, "is_dir": False})

    return files
            





