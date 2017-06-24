import os
from rest_framework import permissions, status, mixins
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from omnimedia.auth import OmnimediaAuthentication
from omnimedia.models import Whitelist, MediaFolder
from omnimedia.serializers import WhitelistSerializer, MediaFolderSerializer, FileInfoSerializer


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
        file_names = [file for file in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, file))]
        files = []
        for id, file_name in enumerate(file_names):
            file = {'id': id+1, 'name': file_name, 'media_type': folder.media_type}
            files.append(file)
        serializer = FileInfoSerializer(files, many=True)
        return Response(serializer.data)




