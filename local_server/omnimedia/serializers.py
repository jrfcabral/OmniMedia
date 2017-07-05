from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from omnimedia.models import Whitelist, MediaFolder, MediaMetadata
from os import path


class WhitelistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Whitelist
        fields = ('email',)

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaMetadata
        fields = '__all__'

class MediaFolderSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=30, validators=[UniqueValidator(queryset=MediaFolder.objects.all())])
    media_type = serializers.ChoiceField(choices=MediaFolder.MEDIA_CHOICES)
    path = serializers.CharField(max_length=1000, validators=[UniqueValidator(queryset=MediaFolder.objects.all())])

    def create(self, validated_data):
        return MediaFolder.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name,)
        instance.media_type = validated_data.get('mediaType', instance.media_type)
        instance.path = validated_data.get('created', instance.path)
        instance.save()
        return instance

    def validate_path(self, value):
        if path.exists(value):
            return value
        else:
            raise serializers.ValidationError('Path does not exist')

class FileInfoSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(read_only=True)
    media_type = serializers.ChoiceField(choices=MediaFolder.MEDIA_CHOICES, read_only=True)
    is_dir = serializers.BooleanField(read_only=True)
    artist = serializers.CharField(required=False, read_only=True)
    album = serializers.CharField(required=False, read_only=True)



