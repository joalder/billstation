# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-03-10 17:52
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('station', '0002_auto_20180310_1838'),
    ]

    operations = [
        migrations.AddField(
            model_name='payment',
            name='for_own_bill',
            field=models.BooleanField(default=False),
        ),
    ]