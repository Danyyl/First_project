from django.contrib import admin
from Server import models
# Register your models here.
admin.site.register(models.Machine)
admin.site.register(models.Operation)
admin.site.register(models.Plot)
admin.site.register(models.Service)