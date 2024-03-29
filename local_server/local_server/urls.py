from django.conf.urls import url
from django.contrib import admin
from omnimedia      import views
from rest_framework import routers

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^whitelist/', views.ListWhitelist.as_view()),
    url(r'^file/(?P<folder>\d+)/$', views.FileView.as_view()),
    url(r'^file_download/(?P<folder>\d+)/(?P<path>.*)/$', views.FileDownload.as_view()),
]

router = routers.SimpleRouter()
router.register(r'folders', views.MediaFolderView)
router.register(r'search', views.MetadataView)

urlpatterns += router.urls