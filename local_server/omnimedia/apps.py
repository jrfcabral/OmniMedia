from django.apps import AppConfig
import requests
import json

class OmnimediaConfig(AppConfig):
    name = 'omnimedia'

    def ready(self):
        payload = {'url', 'http://localhost:8000'}
        res = requests.post("http://localhost:8080/local_server", )
