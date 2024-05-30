# Generated by Django 5.0.6 on 2024-05-22 19:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0002_employee_employee_id'),
        ('manager', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='managers',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='manager.manager'),
        ),
    ]
