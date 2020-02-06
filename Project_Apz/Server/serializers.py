from django.contrib.auth.models import User
from rest_framework import serializers
from Server import models

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'email', 'groups']



class ProfileSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=20)
    last_name = serializers.CharField(max_length=20)
    email = serializers.CharField(max_length=20)
    groups = serializers.CharField(max_length=20)

    def create(self, valid_data):
        user = User.objects.create_user(valid_data['username'], valid_data['email'], valid_data['password'])
        user.first_name = valid_data['first_name']
        user.last_name = valid_data['last_name']
        user.save()
        return user


class PlotSerializer(serializers.Serializer):


    place = serializers.CharField(max_length=30)
    type = serializers.CharField(max_length=30)
    field = serializers.BooleanField()
    culture = serializers.CharField(max_length=30)
    id = serializers.CharField(max_length=5)

    def create(self, valid_data, user):
        plot = models.Plot.create(models.Plot(), valid_data, user)
        return plot

    def update(self, valid_data):
        plot = models.Plot.objects.get(id=valid_data['id'])
        plot = models.Plot.update_(models.Plot(), valid_data, plot)
        return plot

    def delete(self, valid_data):
        plot = models.Plot.objects.get(id=valid_data['id'])
        models.Plot.delete_(models.Plot(), plot)


class MachineSerializer(serializers.Serializer):

    name = serializers.CharField(max_length=20)
    type = serializers.CharField(max_length=20)
    id = serializers.CharField(max_length=5)

    def create(self, valid_data, user):
        machine = models.Machine.create(models.Machine(), valid_data, user)
        return machine

    def update(self, valid_data):
        machine = models.Machine.objects.get(id=valid_data['id'])
        machine = models.Machine.update_(models.Machine(), valid_data, machine)
        return machine

    def delete(self, valid_data):
        machine = models.Machine.objects.get(id=valid_data['id'])
        models.Machine.delete_(models.Machine(), machine)


class ServiceSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    info = serializers.CharField(max_length=500)
    cost = serializers.FloatField()
    id = serializers.CharField(max_length=5)
    user_name = serializers.CharField(max_length=20)

    def create(self, valid_data, user):
        service = models.Service.create(models.Service(), valid_data, user)
        return service

    def update(self, valid_data):
        service = models.Service.objects.get(id=valid_data['id'])
        service = models.Service.update_(models.Service(), valid_data, service)
        return service

    def delete(self, valid_data):
        service = models.Service.objects.get(id=valid_data['id'])
        models.Service.delete_(models.Service(), service)


class OperationSerializer(serializers.Serializer):

    type = serializers.CharField(max_length=30)
    date = serializers.DateField()
    info = serializers.CharField(max_length=500)
    id = serializers.CharField(max_length=5)

    def create(self, valid_data, user):
        models.Operation.create(models.Operation(), valid_data, user)

    def update(self, valid_data):
        operation = models.Operation.objects.get(id=valid_data['id'])
        operation = models.Operation.update_(models.Operation(), valid_data, operation)
        return operation

    def delete(self, valid_data):
        operation = models.Operation.objects.get(id=valid_data['id'])
        models.Operation.delete_(models.Operation(), operation)