# Generated by Django 2.2.7 on 2019-12-16 00:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Server', '0003_service_user_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='operation',
            name='service',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='Server.Service'),
        ),
    ]