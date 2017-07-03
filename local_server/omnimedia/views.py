import os
from rest_framework import permissions, status, mixins
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from omnimedia.auth import OmnimediaAuthentication
from omnimedia.models import Whitelist, MediaFolder, MediaMetadata
from omnimedia.serializers import WhitelistSerializer, MediaFolderSerializer, FileInfoSerializer
import mutagen
from mutagen.mp3 import EasyMP3, MP3
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
        print(exploreDirectoryList(folder_path))
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
mp3_metadata = ["title", "artist", "genre", "album", "albumartist", "tracknumber"]

def metadata(path, item):
    filepath = os.path.join(path, item)
    data = {"name": item, "is_dir": False, "filepath": filepath}

    if MediaMetadata.objects.filter(filepath=filepath).exists():
        try:
            metadata = MediaMetadata.objects.get(filepath=filepath)
            value = metadata.__dict__
            del value['_state']
            return value
        except:
            pass
        

    filetype = mutagen.File(filepath)
    if filetype != None and "audio/mp3" in filetype.mime:
        tags = EasyMP3(filepath)
        for key in tags.keys():
            data[key] = ", ".join(tags[key])
        data["length"] = MP3(filepath).info.length

    MediaMetadata(**data).save()
    return data


def exploreDirectoryList(path, flat='false'):
    files = list()
    for i, item in enumerate(os.listdir(path)):
        if os.path.isdir(os.path.join(path, item)):
            if not flat == 'true':
                files.append({"name": item, "is_dir": True, "contents": exploreDirectoryList(os.path.join(path, item))})
            else:
                files.extend(exploreDirectoryList(os.path.join(path, item), 'true'))
        elif os.path.isfile(os.path.join(path, item)):
            files.append(metadata(path, item))

    return files
            



