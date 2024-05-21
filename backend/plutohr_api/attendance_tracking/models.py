from django.db import models
from employee.models import Employee

# Create your models here.

class Attendance(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    date = models.DateField()
    time_in = models.TimeField()
    time_out = models.TimeField()
    def __str__(self):
        return self.employee.username + ' ' + str(self.date)
    
