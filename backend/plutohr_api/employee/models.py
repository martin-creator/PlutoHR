from django.db import models
from authentication.models import User
from manager.models import Manager


class Employee(User):
    employee_id = models.CharField(max_length=255, unique=True, blank=True, null=True)
    manager = models.ForeignKey(Manager, on_delete=models.CASCADE, blank=True, null=True)

    # The manager is a foreign key to the Manager model. This means that the manager field in the Employee model will contain a reference to a Manager object. The on_delete=models.CASCADE argument specifies that if a Manager object is deleted, all the Employee objects that reference that Manager object will also be deleted.
    # It is a one to many relationship between the Manager and Employee models. A manager can have many employees, but an employee can only have one manager.

