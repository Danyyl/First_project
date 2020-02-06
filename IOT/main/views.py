from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from main.models import Plot



class Inf_get(APIView):


    def get(self, request):
        plot = Plot.objects.get(id=1)
        res = "Machine {0}  questions: {1} ".format(plot.name, plot.questions)
        return Response(res)


class Iot(APIView):


    def get(self, request):
        plot = Plot.objects.get(id=1)
        plot.name = request.GET['machine']
        plot.questions = request.GET['info']
        plot.save()
        content = request.GET
        print(plot.temp)
        while plot.temp == 0:
            q = 1
            plot = Plot.objects.get(id=1)
        plot.temp = 0
        plot.save()
        print(request.GET['info'], request.GET['machine'])
        res = "Machine: {0} {1} questions: {2}".format(request.GET['machine'], plot.answer, request.GET['info'])
        return Response(res)

    def post(self, request):
        plot = Plot.objects.get(id=1)
        if request.data['status'] == 'Done':
            plot.answer = "do okey "
            plot.temp = 1
            plot.save()
        else:
            plot.answer = "have mistake with doing "
            plot.temp = 1
            plot.save()
        return Response(plot.temp)