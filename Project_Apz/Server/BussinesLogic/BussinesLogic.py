from django.db import models
from django.contrib.auth.models import User
from datetime import datetime, timedelta
from Server import models
import time
from reportlab.pdfgen import canvas
from django.http import FileResponse
import io
import requests



def operation(user_input, service_input, time):
    res = ""
    res = "{0} {1} email: {2}, {7} use service {3}  cost {4} from user {5}  {6}"\
        .format(user_input.first_name,user_input.last_name, user_input.email,
                service_input.info, service_input.cost,service_input.user.first_name,
                service_input.user.last_name,time.date())
    return res


def DoMachine(valid_data, user_input):
    res_ret = ""
    machine = models.Machine.objects.get(id=valid_data['id'])
    time_temp = datetime.now()
    res = ""
    res = "{0} {1} email: {2}  use machine:  {3}  type: {4}, for {5}, date: {6}" \
        .format(user_input.first_name, user_input.last_name, user_input.email,
                machine.name, machine.type, valid_data['questions'], time_temp.date())
    models.Operation.create_mach(models.Operation(), {'info': res, 'type': 'machine', 'date': datetime.now()},
                                 user_input)
    res_ret = requests.get('http://localhost:8080/iot/', params={"info": valid_data['questions'], "machine": machine.name})
    return res_ret



def get_report(user_input, date):

    buffer = io.BytesIO()


    p = canvas.Canvas(buffer)
    x = 10
    x_max = 400
    y = 800
    arr = models.Operation.objects.filter(user=user_input)
    temp = datetime.strptime(date, '%Y-%m-%d').date()
    while temp <= datetime.now().date():
        if len(arr.filter(date=temp)) > 0:
            p.drawString(x, y, str(temp))
            y -= 40
            for temp_op in arr.filter(date=temp):
                temp_x = x+20
                for temp_pr in temp_op.info.split():
                    p.drawString(temp_x, y, str(temp_pr))
                    temp_x += 8*len(temp_pr)
                    if temp_x >= x_max:
                        y -= 15
                        temp_x = x+20
                if y <= 60:
                    p.showPage()
                    y = 800
                    x_temp = x + 20
                y -= 30
        temp = temp + timedelta(days=1)
        print(temp)

    p.showPage()
    p.save()

    # FileResponse sets the Content-Disposition header so that browsers
    # present the option to save the file.
    buffer.seek(0)
    return FileResponse(buffer, as_attachment=True, filename='hello.pdf')
