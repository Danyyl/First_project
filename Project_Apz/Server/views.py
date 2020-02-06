from django.shortcuts import render
from django.db import models
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from Server import models
from django.contrib.auth.models import User
from rest_framework import viewsets
from Server import serializers
from Server.BussinesLogic import BussinesLogic as bislog
import datetime
from django.http import FileResponse


class HelloView(APIView):
    

    def get(self, request):
        content = "Hello Baby) i am django"
        print(request.data)
        return Response(content)


class Register(APIView):

    def post(self, request):
        user = serializers.ProfileSerializer.create(serializers.ProfileSerializer(), request.data)
        serializer = serializers.ProfileSerializer(user)
        return Response("Done")


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

            user = request.user
            content = {'first_name': user.first_name, 'last_name': user.last_name, 'email': user.email, 'groups': user.groups}
            serializer = serializers.ProfileSerializer(content)
            return Response(serializer.data)


    def put(self, request):
        user = request.user
        user.first_name = request.data['first_name']
        user.last_name = request.data['last_name']
        user.email = request.data['email']
        user.save()
        serializer = serializers.ProfileSerializer(user)
        return Response(serializer.data)

    def delete(self, request):
        user = request.user
        user.delete()
        return Response("Done")


class PlotView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        plots = models.Plot.objects.filter(user=user)
        serializer = serializers.PlotSerializer(plots, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user
        plot = serializers.PlotSerializer.create(serializers.PlotSerializer(), request.data, user)
        serializer = serializers.PlotSerializer(plot)
        return Response(serializer.data)

    def put(self, request):
        plot = serializers.PlotSerializer.update(serializers.PlotSerializer(), request.data)
        serializer = serializers.PlotSerializer(plot)
        return Response(serializer.data)

    def delete(self, request):
        serializers.PlotSerializer.delete(serializers.PlotSerializer(), request.data)
        return Response("Done")


class MachineView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        machines = models.Machine.objects.filter(User=user)
        serializer = serializers.MachineSerializer(machines, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user
        machine = serializers.MachineSerializer.create(serializers.MachineSerializer(), request.data, user)
        serializer = serializers.MachineSerializer(machine)
        return Response(serializer.data)

    def put(self, request):
        machine = serializers.MachineSerializer.update(serializers.MachineSerializer(), request.data)
        serializer = serializers.MachineSerializer(machine)
        return Response(serializer.data)

    def delete(self, request):
        serializers.MachineSerializer.delete(serializers.MachineSerializer(), request.data)
        return Response("Done")


class ServiceView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        services = models.Service.objects.filter(user=user)
        serializer = serializers.ServiceSerializer(services, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user
        service = serializers.ServiceSerializer.create(serializers.ServiceSerializer(), request.data, user)
        serializer = serializers.ServiceSerializer(service)
        return Response(serializer.data)

    def put(self, request):
        service = serializers.ServiceSerializer.update(serializers.ServiceSerializer(), request.data)
        serializer = serializers.ServiceSerializer(service)
        return Response(serializer.data)

    def delete(self, request):
        serializers.ServiceSerializer.delete(serializers.ServiceSerializer(), request.data)
        return Response("Done")


class OperationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        operation = models.Operation.objects.filter(user=user)
        serializer = serializers.OperationSerializer(operation, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user
        operation = serializers.OperationSerializer.create(serializers.OperationSerializer(), request.data, user)
        serializer = serializers.OperationSerializer(operation)
        return Response(serializer.data)

    def put(self, request):
        operation = serializers.OperationSerializer.update(serializers.OperationSerializer(), request.data)
        serializer = serializers.OperationSerializer(operation)
        return Response(serializer.data)

    def delete(self, request):
        serializers.OperationSerializer.delete(serializers.OperationSerializer(), request.data)
        return Response("Done")


class Service_allView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        services = models.Service.objects.exclude(user=user)
        serializer = serializers.ServiceSerializer(services, many=True)
        return Response(serializer.data)


class OperationDo(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        print(request.data)
        serializers.OperationSerializer.create(serializers.OperationSerializer(), request.data, user)
        return Response("Done")

    def get(self, request):
        user = request.user
        return bislog.get_report(user, request.GET['date'])


class MachineDo(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        info = bislog.DoMachine(request.data, user)
        print(info.json())
        return Response(info.json())
