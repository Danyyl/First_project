# Generated by Django 2.2.7 on 2019-12-15 23:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Server', '0002_auto_20191127_2108'),
    ]

    operations = [
        migrations.AddField(
            model_name='service',
            name='user_name',
            field=models.CharField(max_length=20, null=True),
        ),
    ]