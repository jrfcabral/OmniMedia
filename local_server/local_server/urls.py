from django.conf.urls import url
from django.contrib import admin
from omnimedia      import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^whitelist/', views.ListWhitelist.as_view()),
]
