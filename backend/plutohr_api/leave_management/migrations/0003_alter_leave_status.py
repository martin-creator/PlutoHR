# Generated by Django 5.0.6 on 2024-05-22 20:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leave_management', '0002_remove_leave_user_leave_employee_leave_leave_balance_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='leave',
            name='status',
            field=models.CharField(blank=True, choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Rejected', 'Rejected'), ('Requested', 'Requested'), ('Not Requested', 'Not Requested')], default='Requested', max_length=455),
        ),
    ]
