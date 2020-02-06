from django.db import models
from django.contrib.auth.models import User
import datetime
from Server.BussinesLogic import BussinesLogic as bislog
# Create your models here.


class Plot(models.Model):
    place = models.CharField(max_length=30)
    type = models.CharField(max_length=30)
    field = models.BooleanField()
    culture = models.CharField(max_length=30)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def create(self, valid_data, user_input):
        plot = Plot.objects.create(
            place=valid_data['place'],
            type=valid_data['type'],
            field=valid_data['field'],
            culture=valid_data['culture'],
            user=user_input,
        )
        plot.save()
        return plot

    def update_(self, valid_data, plot):
        plot.type = valid_data['type']
        plot.field = valid_data['field']
        plot.culture = valid_data['culture']
        plot.place = valid_data['place']
        plot.save()
        return plot

    def delete_(self, plot):

        plot.delete()


class Machine(models.Model):
    name = models.CharField(max_length=30)
    type = models.CharField(max_length=30)
    User = models.ForeignKey(User, on_delete=models.CASCADE)

    def create(self, valid_data, user_input):
        machine = Machine.objects.create(
            name=valid_data['name'],
            type=valid_data['type'],
            User=user_input
        )
        machine.save()
        return machine

    def update_(self, valid_data, machine):
        machine.name = valid_data['name']
        machine.type = valid_data['type']
        machine.save()
        return machine

    def delete_(self, machine):
        machine.delete()


class Service(models.Model):
    name = models.CharField(max_length=100)
    info = models.CharField(max_length=500)
    cost = models.FloatField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    user_name = models.CharField(max_length=20, null=True)

    def create(self, valid_data, user_input):
        service = Service.objects.create(
            name=valid_data['name'],
            info=valid_data['info'],
            cost=valid_data['cost'],
            user=user_input,
            user_name=user_input.first_name
        )
        service.save()
        return service

    def update_(self, valid_data, service):
        service.name = valid_data['name']
        service.info = valid_data['info']
        service.cost = valid_data['cost']
        service.save()
        return service

    def delete_(self, service):
        service.delete()


class Operation(models.Model):
    type = models.CharField(max_length=30)
    date = models.DateField()
    info = models.CharField(max_length=500)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE, null=True)

    def create(self, valid_data, user_input):
        service_input = Service.objects.get(id=valid_data['id'])
        time = datetime.datetime.now()
        information = bislog.operation(user_input, service_input, time)
        operation = Operation.objects.create(
            type=valid_data['type'],
            date=time,
            info=information,
            user=user_input,
            service=service_input
        )
        operation.save()

    def create_mach(self, valid_data, user_input):
        operation = Operation.objects.create(
            type=valid_data['type'],
            date=valid_data['date'],
            info=valid_data['info'],
            user=user_input,
        )
        operation.save()






    def update_(self, valid_data, operation):
        operation.type = valid_data['type']
        operation.date = valid_data['date']
        operation.info = valid_data['info']
        operation.save()
        return operation

    def delete_(self, operation):
        operation.delete()

