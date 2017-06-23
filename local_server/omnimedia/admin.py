from django.contrib import admin
from omnimedia.models import Whitelist, MediaFolder

@admin.register(Whitelist)
class WhitelistAdmin(admin.ModelAdmin):
    fields = ['email', ('enabled', 'admin')]
    list_display = ('email', 'enabled', 'admin')

@admin.register(MediaFolder)
class MediaFolderAdmin(admin.ModelAdmin):
    fields = ('path', 'media_type', 'name')
    list_display = ('name', 'media_type')
