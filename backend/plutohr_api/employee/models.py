from django.db import models
from authentication.models import User


class Employee(User):
    employee_id = models.CharField(max_length=255, unique=True, blank=True, null=True)
