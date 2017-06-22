from django.contrib.auth.models import User
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework import exceptions
from omnimedia.models import Whitelist
from django.contrib.auth import get_user_model

class OmnimediaAuthentication(JSONWebTokenAuthentication):
    def authenticate_credentials(self, payload):
        whitelist = Whitelist.objects
        user_model = get_user_model()
        email = payload.get('email')

        if not email:
            msg = ('Invalid payload')
            raise exceptions.AuthenticationFailed(msg)
        try:
            user = whitelist.get(email=email)
        except Whitelist.DoesNotExist:
            msg = ('User does not exist')
            raise exceptions.AuthenticationFailed(msg)

        if not user.enabled:
            msg = ('User access has been disabled by admin')

            raise exceptions.AuthenticationFailed(msg)

        try:
            user_object = User.objects.get(email=email)
        except User.DoesNotExist:
            msg = ('Whitelist does not have corresponding user entrance')
            raise exceptions.AuthenticationFailed(msg)
        return user_object



