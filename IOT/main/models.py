from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Plot(models.Model):
    answer = models.CharField(max_length=30)
    temp = models.BooleanField()
    name = models.CharField(max_length=30)
    questions = models.CharField(max_length=30)

    def update(self, valid_data, plot):
        plot.answer = valid_data['answer']
        plot.temp = valid_data['temp']
        plot.save()
        return plot
