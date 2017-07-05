import os
from rest_framework import permissions, status, mixins
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from omnimedia.auth import OmnimediaAuthentication
from omnimedia.models import Whitelist, MediaFolder, MediaMetadata
<<<<<<< Updated upstream
from omnimedia.serializers import WhitelistSerializer, MediaFolderSerializer, FileInfoSerializer
=======
from omnimedia.serializers import WhitelistSerializer, MediaFolderSerializer, FileInfoSerializer, FileSerializer
import mutagen
from mutagen.mp3 import EasyMP3, MP3
>>>>>>> Stashed changes
import json
from omnimedia.utils import *


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
    authentication_classes = ()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get(self, request, **kwargs):
        folder_id = kwargs['folder']
        flat = 'false'
        if 'flat' in request.query_params:
            flat = request.query_params['flat']
        try:
            folder = MediaFolder.objects.get(id=folder_id)
        except MediaFolder.DoesNotExist:
            return Response(status=404)
        folder_path = folder.path
        #print(exploreDirectoryList(folder_path))
        return Response(exploreDirectoryList(folder_path,flat))

class FileDownload(APIView):
    authentication_classes = ()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get(self, request, **kwargs):
        response = Response()
        folder_id = kwargs['folder']
        try:
            folder_path = MediaFolder.objects.get(id=folder_id).path
        except MediaFolder.DoesNotExist:
            return Response(status=404)

        file_path = "/".join((kwargs['path']).split('/')[1:])
        response['X-Accel-Redirect'] = '/protected_files/'+file_path
        response['X-Accel-Buffering'] = False
        response['Content-Type'] = 'audio/mpeg'
        return response
<<<<<<< Updated upstream
#mp3_metadata = ["title", "artist", "genre", "album", "albumartist", "tracknumber"]
=======

class MetadataView(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    authentication_classes = ()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = FileSerializer
    queryset = MediaMetadata.objects.all()


mp3_metadata = ["title", "artist", "genre", "album", "albumartist", "tracknumber"]
>>>>>>> Stashed changes



            



