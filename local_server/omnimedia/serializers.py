from omnimedia import models
from rest_framework import serializers

from omnimedia.models import Whitelist


class WhitelistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Whitelist
        fields = ('email',)