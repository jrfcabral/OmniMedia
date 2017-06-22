from django.contrib import admin
from omnimedia.models import Whitelist

# Register your models here.
class WhitelistAdmin(admin.ModelAdmin):
    fields = ['email', 'enabled']

admin.site.register(Whitelist, WhitelistAdmin)
