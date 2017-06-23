from rest_framework import serializers

from omnimedia.models import Whitelist, MediaFolder
from os import path


class WhitelistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Whitelist
        fields = ('email',)

class MediaFolderSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=30)
    media_type = serializers.ChoiceField(choices=MediaFolder.MEDIA_CHOICES)
    path = serializers.CharField(max_length=1000)

    def create(self, validated_data):
        return MediaFolder(**validated_data)

    def update(selfs, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.media_type = validated_data.get('mediaType', instance.media_type)
        instance.path = validated_data.get('created', instance.path)

    def validate_path(self, value):
        if path.exists(value):
            return value
        else:
            raise serializers.ValidationError('Path does not exist')

