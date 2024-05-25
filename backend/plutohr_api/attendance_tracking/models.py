from django.db import models
from employee.models import Employee

# Create your models here.

class Attendance(models.Model):
    # show employee name
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    date = models.DateField()
    time_in = models.TimeField()
    time_out = models.TimeField()
    hours_worked = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    def __str__(self):
        return self.employee.username + ' ' + str(self.date)
    
