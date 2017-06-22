from django.db import models

# Create your models here.

class Whitelist(models.Model):
    email = models.CharField(max_length=200)
    enabled = models.BooleanField(default= True)