from django.db import models

# Create your models here.

class Whitelist(models.Model):
    email = models.CharField(max_length=200)
    enabled = models.BooleanField(default= True)
    admin = models.BooleanField(default= False)

class MediaFolder(models.Model):
    MEDIA_CHOICES = (
        ('AUD', 'Audiobook'),
        ('MOV', 'Movie'),
        ('MUS', 'Music')
    )
    path = models.CharField(max_length=1000, blank=False)
    media_type = models.CharField(max_length=3, choices=MEDIA_CHOICES, blank=False)
    name = models.CharField(max_length=30, null=True, blank=False)