# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-07-03 04:06
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MediaFolder',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('path', models.CharField(max_length=1000, unique=True)),
                ('media_type', models.CharField(choices=[('AUD', 'Audiobook'), ('MOV', 'Movie'), ('MUS', 'Music')], max_length=3)),
                ('name', models.CharField(max_length=30, null=True, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='MediaMetadata',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, null=True)),
                ('artist', models.CharField(max_length=200, null=True)),
                ('genre', models.CharField(max_length=200, null=True)),
                ('album', models.CharField(max_length=200, null=True)),
                ('albumartist', models.CharField(max_length=200, null=True)),
                ('filepath', models.CharField(max_length=1000, null=True)),
                ('name', models.CharField(max_length=1000, null=True)),
                ('is_dir', models.BooleanField(default=False)),
                ('tracknumber', models.CharField(max_length=10, null=True)),
                ('compilation', models.CharField(max_length=200, null=True)),
                ('composer', models.CharField(max_length=200, null=True)),
                ('length', models.IntegerField(null=True)),
                ('date', models.CharField(max_length=200, null=True)),
                ('organization', models.CharField(max_length=200, null=True)),
                ('discnumber', models.IntegerField(null=True)),
                ('language', models.CharField(max_length=200, null=True)),
                ('isrc', models.CharField(max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Whitelist',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=200)),
                ('enabled', models.BooleanField(default=True)),
                ('admin', models.BooleanField(default=False)),
            ],
        ),
    ]
