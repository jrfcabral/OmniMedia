from django.db import models

# Create your models here.

class Whitelist(models.Model):
    email = models.CharField(max_length=200)
    enabled = models.BooleanField(default= True)
    admin = models.BooleanField(default= False)

class MediaMetadata(models.Model):
    title = models.CharField(max_length=200, null=True)
    artist = models.CharField(max_length=200, null=True)
    genre = models.CharField(max_length=200, null=True)
    album = models.CharField(max_length=200, null=True)
    albumartist = models.CharField(max_length=200, null=True)
    filepath = models.CharField(max_length=1000, null=True, blank=False, db_index=True)
    name = models.CharField(max_length=1000, null=True, blank=False)
    is_dir = models.BooleanField(default=False)
    tracknumber = models.CharField(max_length=10, null=True)
    compilation= models.CharField(max_length=200, null=True)
    composer= models.CharField(max_length=200, null=True)
    length = models.IntegerField(null=True)
    date = models.CharField(max_length=200, null=True)
    organization = models.CharField(max_length=200, null=True)
    discnumber = models.CharField(max_length=200, null=True)
    language = models.CharField(max_length=200, null=True)
    isrc = models.CharField(max_length=200, null=True)


class MediaFolder(models.Model):
    MEDIA_CHOICES = (
        ('AUD', 'Audiobook'),
        ('MOV', 'Movie'),
        ('MUS', 'Music')
    )
    path = models.CharField(max_length=1000, blank=False, unique=True)
    media_type = models.CharField(max_length=3, choices=MEDIA_CHOICES, blank=False)
    name = models.CharField(max_length=30, null=True, blank=False, unique=True)